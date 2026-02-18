'use client';

import { useState, useTransition, useRef, useEffect, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  GripVertical,
  Plus,
  Trash2,
  Eye,
  X,
  ExternalLink,
  Loader2,
  CheckCircle2,
  Settings,
  Save,
} from 'lucide-react';
import { resolveIcon } from '@/lib/icon-resolver';
import {
  addWidgetToTeam,
  removeWidgetFromTeam,
  reorderWidgets,
  updateWidgetConfig,
} from '@/lib/actions/widget-actions';

// ── Types ──────────────────────────────────────────────

type WidgetInstanceData = {
  id: string;
  sortOrder: number;
  config: unknown;
  widgetDefinition: {
    id: string;
    widgetType: string;
    label: string;
    icon: string;
  };
};

type WidgetDefinitionData = {
  id: string;
  widgetType: string;
  label: string;
  description: string | null;
  icon: string;
};

interface LayoutEditorProps {
  teamId: string;
  teamSlug: string;
  instances: WidgetInstanceData[];
  definitions: WidgetDefinitionData[];
}

// ── Widget Preview Data ────────────────────────────────

type WidgetPreviewInfo = {
  description: string;
  layoutType: string;
  contents: string[];
  schematic: 'full-width' | '3-col' | '2-col' | 'tabs' | 'accordion' | 'card';
};

const WIDGET_PREVIEWS: Record<string, WidgetPreviewInfo> = {
  page_header: {
    description:
      'A bold full-width banner displaying the team name with a blue bottom border, department subtitle, and a "Submit a Support Request" button.',
    layoutType: 'Full-width banner',
    contents: [
      'Team name in large bold text',
      '"Integrated Technology Services (ITS)" subtitle',
      '"Submit a Support Request" button',
      'Urgent incident phone number',
    ],
    schematic: 'full-width',
  },
  portfolios: {
    description:
      'A responsive 3-column grid of portfolio cards, each with a colored icon, title, short description, and link to the portfolio subpage.',
    layoutType: '3-column card grid',
    contents: [
      '"Our Portfolios" section heading',
      'Cards with icon, title, and description',
      'Each card links to its portfolio subpage',
    ],
    schematic: '3-col',
  },
  team_tabs: {
    description:
      'A tabbed interface where each tab shows a video embed and a list of diagram links for that team area.',
    layoutType: 'Tabbed panel',
    contents: [
      '"Team Overviews" section heading',
      'Clickable tab bar to switch views',
      'Embedded video player',
      'List of diagram links below the video',
    ],
    schematic: 'tabs',
  },
  accordion_links: {
    description:
      'Collapsible accordion panels grouping important links by category. Click a heading to expand or collapse its link list.',
    layoutType: 'Stacked accordion panels',
    contents: [
      '"Important Links" section heading',
      'Collapsible category groups (e.g. Incident Management, Change Management)',
      'Organized links within each group',
    ],
    schematic: 'accordion',
  },
  work_tracking: {
    description:
      'A 3-column grid of cards linking to external work tracking boards (Trello, etc.) with title and description.',
    layoutType: '3-column card grid',
    contents: [
      '"Work Tracking Boards" section heading',
      'Cards with board title and description',
      'External links to Trello or other tools',
    ],
    schematic: '3-col',
  },
  ongoing_projects: {
    description:
      'A two-column hero section with a blue banner, project description text, and a "View Project List" call-to-action button.',
    layoutType: 'Two-column hero',
    contents: [
      '"ONGOING PROJECTS" blue banner heading',
      'Description text about current projects',
      '"View Project List" button',
      'Placeholder image area',
    ],
    schematic: '2-col',
  },
  budget_spend: {
    description:
      'A centered card on a light gray background showing budget information with a link to open the full budget report.',
    layoutType: 'Centered card',
    contents: [
      '"Budget & Spend" heading',
      'Budget overview description text',
      '"Open Budget Report" link button',
    ],
    schematic: 'card',
  },
  team_members: {
    description:
      'A 3-column grid of team member cards showing name, job title, and email contact information.',
    layoutType: '3-column card grid',
    contents: [
      '"Who We Are" section heading',
      'Intro text about the team',
      'Member cards with name, title, and email',
    ],
    schematic: '3-col',
  },
  service_areas: {
    description:
      'A 3-column grid of service area cards. Clicking a card opens a modal with the full description, feature list, and links.',
    layoutType: '3-column card grid',
    contents: [
      '"Our Service Areas" section heading',
      'Cards with title and short description',
      'Click to open detail modal with features and links',
    ],
    schematic: '3-col',
  },
};

// ── Configurable Widget Definitions ─────────────────────

type ConfigField = { key: string; label: string; type: 'text' | 'textarea'; placeholder: string };

const WIDGET_CONFIG_FIELDS: Record<string, ConfigField[]> = {
  page_header: [
    { key: 'subtitle', label: 'Subtitle', type: 'text', placeholder: 'Integrated Technology Services (ITS) · Open City & Technology (OCT)' },
    { key: 'buttonText', label: 'Button Text', type: 'text', placeholder: 'Submit a Support Request' },
    { key: 'buttonLink', label: 'Button Link', type: 'text', placeholder: 'https://...' },
    { key: 'phoneText', label: 'Phone Text', type: 'text', placeholder: 'For urgent incidents, call 780-123-4567' },
  ],
  ongoing_projects: [
    { key: 'bannerText', label: 'Banner Text', type: 'text', placeholder: 'ONGOING PROJECTS' },
    { key: 'heading', label: 'Heading', type: 'text', placeholder: 'Projects' },
    { key: 'description', label: 'Description', type: 'textarea', placeholder: 'See the list of all current Projects for the Team...' },
    { key: 'buttonText', label: 'Button Text', type: 'text', placeholder: 'View Project List' },
    { key: 'buttonLink', label: 'Button Link', type: 'text', placeholder: 'https://...' },
  ],
  budget_spend: [
    { key: 'heading', label: 'Heading', type: 'text', placeholder: 'Budget & Spend' },
    { key: 'description', label: 'Description', type: 'textarea', placeholder: 'View current-year approved budget, YTD spend...' },
    { key: 'buttonText', label: 'Button Text', type: 'text', placeholder: 'Open Budget Report' },
    { key: 'buttonLink', label: 'Button Link', type: 'text', placeholder: 'https://...' },
  ],
};

// ── Widget Config Form ──────────────────────────────────

function WidgetConfigForm({
  instanceId,
  widgetType,
  currentConfig,
  onSaved,
  onCancel,
}: {
  instanceId: string;
  widgetType: string;
  currentConfig: Record<string, string>;
  onSaved: (config: Record<string, string>) => void;
  onCancel: () => void;
}) {
  const fields = WIDGET_CONFIG_FIELDS[widgetType];
  const [form, setForm] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const f of fields) {
      initial[f.key] = currentConfig[f.key] || '';
    }
    return initial;
  });
  const [saving, startSaving] = useTransition();

  function handleSave() {
    const cleanConfig: Record<string, string> = {};
    for (const [k, v] of Object.entries(form) as [string, string][]) {
      if (v.trim()) cleanConfig[k] = v.trim();
    }
    startSaving(async () => {
      await updateWidgetConfig(instanceId, cleanConfig);
      onSaved(cleanConfig);
    });
  }

  if (!fields) return null;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-2 space-y-3">
      <p className="font-sans text-xs font-semibold text-gray-500 uppercase tracking-wider">
        Widget Settings
      </p>
      {fields.map((f) => (
        <div key={f.key}>
          <label className="block font-sans text-xs text-gray-500 mb-1">{f.label}</label>
          {f.type === 'textarea' ? (
            <textarea
              value={form[f.key]}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              placeholder={f.placeholder}
              rows={3}
              className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
            />
          ) : (
            <input
              value={form[f.key]}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              placeholder={f.placeholder}
              className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
            />
          )}
        </div>
      ))}
      <p className="font-sans text-xs text-gray-400">
        Leave fields empty to use the default value shown in the placeholder.
      </p>
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-1 bg-primary-blue text-white text-sm px-3 py-1.5 rounded hover:bg-dark-blue disabled:opacity-50"
        >
          <Save className="w-3 h-3" /> Save Settings
        </button>
        <button
          onClick={onCancel}
          className="flex items-center gap-1 text-gray-600 text-sm px-3 py-1.5 rounded hover:bg-gray-100"
        >
          <X className="w-3 h-3" /> Cancel
        </button>
      </div>
    </div>
  );
}

// ── Wireframe Schematic Component ──────────────────────

function WireframeSchematic({ type }: { type: WidgetPreviewInfo['schematic'] }) {
  const boxClass = 'bg-gray-200 rounded';

  switch (type) {
    case 'full-width':
      return (
        <div className="space-y-1.5">
          <div className={`${boxClass} h-4 w-3/4`} />
          <div className={`${boxClass} h-2.5 w-1/2`} />
          <div className="flex justify-end">
            <div className="bg-primary-blue/20 rounded h-3 w-24" />
          </div>
        </div>
      );
    case '3-col':
      return (
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`${boxClass} h-12 flex flex-col items-center justify-center gap-1 p-1`}>
              <div className="bg-gray-300 rounded-full w-3 h-3" />
              <div className="bg-gray-300 rounded h-1 w-3/4" />
            </div>
          ))}
        </div>
      );
    case '2-col':
      return (
        <div className="grid grid-cols-5 gap-2">
          <div className={`${boxClass} col-span-3 h-12 flex flex-col justify-center gap-1 p-2`}>
            <div className="bg-gray-300 rounded h-1.5 w-3/4" />
            <div className="bg-gray-300 rounded h-1 w-1/2" />
            <div className="bg-primary-blue/20 rounded h-2 w-16 mt-1" />
          </div>
          <div className={`${boxClass} col-span-2 h-12`} />
        </div>
      );
    case 'tabs':
      return (
        <div className="space-y-1.5">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`rounded-t h-2.5 w-12 ${i === 0 ? 'bg-primary-blue/30' : 'bg-gray-200'}`}
              />
            ))}
          </div>
          <div className={`${boxClass} h-10`} />
        </div>
      );
    case 'accordion':
      return (
        <div className="space-y-1">
          {[0, 1, 2].map((i) => (
            <div key={i} className={`${boxClass} h-3 flex items-center px-1.5`}>
              <div className="bg-gray-300 rounded h-1 w-2/3" />
            </div>
          ))}
        </div>
      );
    case 'card':
      return (
        <div className="flex justify-center">
          <div className={`${boxClass} h-10 w-3/4 flex flex-col items-center justify-center gap-1 p-1`}>
            <div className="bg-gray-300 rounded h-1.5 w-1/2" />
            <div className="bg-gray-300 rounded h-1 w-2/3" />
            <div className="bg-primary-blue/20 rounded h-2 w-16" />
          </div>
        </div>
      );
  }
}

// ── Widget Preview Modal ───────────────────────────────

function WidgetPreviewModal({
  widgetType,
  icon,
  label,
  onClose,
}: {
  widgetType: string;
  icon: string;
  label: string;
  onClose: () => void;
}) {
  const preview = WIDGET_PREVIEWS[widgetType];
  const IconComponent = resolveIcon(icon);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!preview) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-xl shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-5 border-b border-gray-100">
          <div className="w-10 h-10 rounded-lg bg-[#D3ECEF] flex items-center justify-center flex-shrink-0">
            <IconComponent className="w-5 h-5 text-primary-blue" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-sans font-semibold text-gray-900">{label}</h3>
            <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full bg-gray-100 text-xs font-medium text-gray-600">
              {preview.layoutType}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Wireframe */}
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
            <p className="font-sans text-[10px] uppercase tracking-wider text-gray-400 mb-2">
              Layout Preview
            </p>
            <WireframeSchematic type={preview.schematic} />
          </div>

          {/* Description */}
          <p className="font-sans text-sm text-gray-600 leading-relaxed">
            {preview.description}
          </p>

          {/* Contents list */}
          <div>
            <p className="font-sans text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              What&apos;s included
            </p>
            <ul className="space-y-1.5">
              {preview.contents.map((item, i) => (
                <li key={i} className="font-sans text-sm text-gray-600 flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-blue flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sortable Widget Item ───────────────────────────────

function SortableWidgetItem({
  instance,
  onRemove,
  onPreview,
  onToggleConfig,
  isConfigOpen,
  isPending,
}: {
  instance: WidgetInstanceData;
  onRemove: (id: string) => void;
  onPreview: (widgetType: string, icon: string, label: string) => void;
  onToggleConfig: (id: string) => void;
  isConfigOpen: boolean;
  isPending: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: instance.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const IconComponent = resolveIcon(instance.widgetDefinition.icon);
  const hasConfig = instance.widgetDefinition.widgetType in WIDGET_CONFIG_FIELDS;

  return (
    <div ref={setNodeRef} style={style}>
      <div
        className={`bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3 shadow-sm ${isConfigOpen ? 'rounded-b-none border-b-0' : ''}`}
      >
        <button
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 touch-none"
          aria-label="Drag to reorder"
        >
          <GripVertical className="w-5 h-5" />
        </button>
        <div className="w-8 h-8 rounded bg-[#D3ECEF] flex items-center justify-center flex-shrink-0">
          <IconComponent className="w-4 h-4 text-primary-blue" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="font-sans font-semibold text-gray-900 text-sm">
            {instance.widgetDefinition.label}
          </span>
          <span className="font-sans text-xs text-gray-400 ml-2">
            {instance.widgetDefinition.widgetType}
          </span>
        </div>
        {hasConfig && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleConfig(instance.id);
            }}
            className={`p-1.5 rounded hover:bg-gray-100 transition-colors ${isConfigOpen ? 'text-primary-blue bg-gray-100' : 'text-gray-400 hover:text-primary-blue'}`}
            aria-label={`Settings for ${instance.widgetDefinition.label}`}
          >
            <Settings className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPreview(
              instance.widgetDefinition.widgetType,
              instance.widgetDefinition.icon,
              instance.widgetDefinition.label
            );
          }}
          className="p-1.5 text-gray-400 hover:text-primary-blue rounded hover:bg-gray-100 transition-colors"
          aria-label={`Preview ${instance.widgetDefinition.label}`}
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          onClick={() => onRemove(instance.id)}
          disabled={isPending}
          className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-gray-100 disabled:opacity-50 transition-colors"
          aria-label={`Remove ${instance.widgetDefinition.label}`}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ── Main Layout Editor ─────────────────────────────────

export default function LayoutEditor({
  teamId,
  teamSlug,
  instances: initialInstances,
  definitions,
}: LayoutEditorProps) {
  const [instances, setInstances] = useState(initialInstances);
  const [isPending, startTransition] = useTransition();
  const [previewWidget, setPreviewWidget] = useState<{
    widgetType: string;
    icon: string;
    label: string;
  } | null>(null);
  const [editingConfigId, setEditingConfigId] = useState<string | null>(null);

  // Save state indicator
  const [showSaved, setShowSaved] = useState(false);
  const prevPendingRef = useRef(false);

  useEffect(() => {
    if (prevPendingRef.current && !isPending) {
      setShowSaved(true);
      const timer = setTimeout(() => setShowSaved(false), 3000);
      return () => clearTimeout(timer);
    }
    prevPendingRef.current = isPending;
  }, [isPending]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const activeDefinitionIds = new Set(
    instances.map((i) => i.widgetDefinition.id)
  );
  const availableDefinitions = definitions.filter(
    (d) => !activeDefinitionIds.has(d.id)
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = instances.findIndex((i) => i.id === active.id);
    const newIndex = instances.findIndex((i) => i.id === over.id);
    const reordered = arrayMove(instances, oldIndex, newIndex);
    setInstances(reordered);

    startTransition(async () => {
      await reorderWidgets(
        teamId,
        reordered.map((i) => i.id)
      );
    });
  }

  function handleAdd(definition: WidgetDefinitionData) {
    startTransition(async () => {
      const instance = await addWidgetToTeam(teamId, definition.id);
      setInstances((prev) => [
        ...prev,
        {
          ...instance,
          config: instance.config,
          widgetDefinition: {
            id: definition.id,
            widgetType: definition.widgetType,
            label: definition.label,
            icon: definition.icon,
          },
        },
      ]);
    });
  }

  function handleRemove(instanceId: string) {
    if (!confirm('Remove this widget from the page layout?')) return;

    setInstances((prev) => prev.filter((i) => i.id !== instanceId));
    startTransition(async () => {
      await removeWidgetFromTeam(instanceId);
    });
  }

  const handlePreview = useCallback(
    (widgetType: string, icon: string, label: string) => {
      setPreviewWidget({ widgetType, icon, label });
    },
    []
  );

  return (
    <div className="space-y-8">
      {/* Header with Preview Page button and save indicator */}
      <div>
        <div className="flex items-start justify-between gap-4 mb-1">
          <h3 className="font-sans text-lg font-semibold text-gray-900">
            Page Layout
          </h3>
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Save indicator */}
            <div className="h-6 flex items-center">
              {isPending && (
                <span className="font-sans text-sm text-gray-500 flex items-center gap-1.5 animate-pulse">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Saving...
                </span>
              )}
              {!isPending && showSaved && (
                <span className="font-sans text-sm text-green-600 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Saved
                </span>
              )}
            </div>
            {/* Preview Page button */}
            <a
              href={`/${teamSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-primary-blue hover:text-primary-blue transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Preview Page
            </a>
          </div>
        </div>
        <p className="font-sans text-sm text-gray-500 mb-4">
          Drag to reorder sections. Changes save automatically.
        </p>

        {instances.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="font-sans text-gray-500">
              No widgets added yet. Add widgets from the picker below.
            </p>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={instances.map((i) => i.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {instances.map((instance) => (
                  <div key={instance.id}>
                    <SortableWidgetItem
                      instance={instance}
                      onRemove={handleRemove}
                      onPreview={handlePreview}
                      onToggleConfig={(id) =>
                        setEditingConfigId((prev) => (prev === id ? null : id))
                      }
                      isConfigOpen={editingConfigId === instance.id}
                      isPending={isPending}
                    />
                    {editingConfigId === instance.id &&
                      instance.widgetDefinition.widgetType in WIDGET_CONFIG_FIELDS && (
                        <div className="bg-white border border-gray-200 border-t-0 rounded-b-lg px-4 pb-4">
                          <WidgetConfigForm
                            instanceId={instance.id}
                            widgetType={instance.widgetDefinition.widgetType}
                            currentConfig={
                              (instance.config as Record<string, string>) || {}
                            }
                            onSaved={(config) => {
                              setInstances((prev) =>
                                prev.map((i) =>
                                  i.id === instance.id ? { ...i, config } : i
                                )
                              );
                              setEditingConfigId(null);
                            }}
                            onCancel={() => setEditingConfigId(null)}
                          />
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* Widget Picker */}
      {availableDefinitions.length > 0 && (
        <div>
          <h3 className="font-sans text-lg font-semibold text-gray-900 mb-1">
            Available Widgets
          </h3>
          <p className="font-sans text-sm text-gray-500 mb-4">
            Click to add a widget to the page layout.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {availableDefinitions.map((def) => {
              const IconComponent = resolveIcon(def.icon);
              return (
                <div
                  key={def.id}
                  className="relative border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-blue hover:bg-blue-50 transition-colors group"
                >
                  <button
                    onClick={() => handleAdd(def)}
                    disabled={isPending}
                    className="flex items-start gap-3 p-4 w-full text-left disabled:opacity-50"
                  >
                    <div className="w-8 h-8 rounded bg-gray-100 group-hover:bg-[#D3ECEF] flex items-center justify-center flex-shrink-0 transition-colors">
                      <IconComponent className="w-4 h-4 text-gray-500 group-hover:text-primary-blue transition-colors" />
                    </div>
                    <div className="min-w-0 pr-6">
                      <div className="font-sans font-semibold text-sm text-gray-900 flex items-center gap-1.5">
                        {def.label}
                        <Plus className="w-3.5 h-3.5 text-gray-400 group-hover:text-primary-blue transition-colors" />
                      </div>
                      {def.description && (
                        <p className="font-sans text-xs text-gray-500 mt-0.5">
                          {def.description}
                        </p>
                      )}
                    </div>
                  </button>
                  {/* Preview button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePreview(def.widgetType, def.icon, def.label);
                    }}
                    className="absolute top-3 right-3 p-1 text-gray-300 hover:text-primary-blue rounded hover:bg-white/80 transition-colors"
                    aria-label={`Preview ${def.label}`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Widget Preview Modal */}
      {previewWidget && (
        <WidgetPreviewModal
          widgetType={previewWidget.widgetType}
          icon={previewWidget.icon}
          label={previewWidget.label}
          onClose={() => setPreviewWidget(null)}
        />
      )}
    </div>
  );
}
