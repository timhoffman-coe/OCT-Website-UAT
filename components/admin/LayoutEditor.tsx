'use client';

import { useState, useTransition, useRef, useEffect, useCallback, useId } from 'react';
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
  Pencil,
  X,
  ExternalLink,
  Loader2,
  CheckCircle2,
  Save,
  RotateCcw,
  Globe,
  Archive,
} from 'lucide-react';
import { resolveIcon } from '@/lib/icon-resolver';
import {
  addWidgetToTeam,
  removeWidgetFromTeam,
  reorderWidgets,
  updateWidgetConfig,
  resetWidgetsToDefault,
} from '@/lib/actions/widget-actions';
import { updateTeam } from '@/lib/actions/team-actions';
import PortfolioEditor from './PortfolioEditor';
import TeamTabEditor from './TeamTabEditor';
import TrelloBoardEditor from './TrelloBoardEditor';
import TeamMemberEditor from './TeamMemberEditor';
import ServiceAreaEditor from './ServiceAreaEditor';
import WhoWeAreEditor from './WhoWeAreEditor';
import KeyInitiativesEditor from './KeyInitiativesEditor';
import AccordionLinksEditor from './AccordionLinksEditor';
import TeamServicesEditor from './TeamServicesEditor';
import TeamInitiativesEditor from './TeamInitiativesEditor';
import TeamContactsEditor from './TeamContactsEditor';
import TeamQuickLinksEditor from './TeamQuickLinksEditor';
import ArchiveConfirmDialog from './ArchiveConfirmDialog';
import PageHeaderWidget from '@/components/widgets/PageHeaderWidget';
import PortfoliosWidget from '@/components/widgets/PortfoliosWidget';
import TeamTabsWidget from '@/components/widgets/TeamTabsWidget';
import AccordionLinksWidget from '@/components/widgets/AccordionLinksWidget';
import WorkTrackingWidget from '@/components/widgets/WorkTrackingWidget';
import OngoingProjectsWidget from '@/components/widgets/OngoingProjectsWidget';
import BudgetSpendWidget from '@/components/widgets/BudgetSpendWidget';
import TeamMembersWidget from '@/components/widgets/TeamMembersWidget';
import ServiceAreasWidget from '@/components/widgets/ServiceAreasWidget';
import WhoWeAreWidget from '@/components/widgets/WhoWeAreWidget';
import KeyInitiativesWidget from '@/components/widgets/KeyInitiativesWidget';
import SubTeamHeaderWidget from '@/components/widgets/SubTeamHeaderWidget';
import SubTeamServicesWidget from '@/components/widgets/SubTeamServicesWidget';
import SubTeamInitiativesWidget from '@/components/widgets/SubTeamInitiativesWidget';
import SubTeamContactsWidget from '@/components/widgets/SubTeamContactsWidget';
import SubTeamQuickLinksWidget from '@/components/widgets/SubTeamQuickLinksWidget';

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
  teamName: string;
  teamShortName: string;
  isPublished: boolean;
  instances: WidgetInstanceData[];
  definitions: WidgetDefinitionData[];
  portfolios: Array<{
    id: string;
    iconName: string;
    title: string;
    description: string;
    href: string;
    sortOrder: number;
    linkedTeamId: string | null;
    linkedTeam: { id: string; teamName: string; isPublished: boolean } | null;
    subpage: { id: string } | null;
  }>;
  teamTabs: Array<{
    id: string;
    tabId: string;
    label: string;
    videoTitle: string;
    videoDescription: string;
    videoUrl: string;
    diagramsTitle: string;
    diagramsDescription: string;
    sortOrder: number;
    diagramLinks: Array<{ id: string; label: string; href: string; sortOrder: number }>;
  }>;
  trelloBoards: Array<{
    id: string;
    title: string;
    description: string;
    href: string;
    sortOrder: number;
  }>;
  teamMembers: Array<{
    id: string;
    name: string;
    title: string;
    email: string;
    sortOrder: number;
  }>;
  serviceAreas: Array<{
    id: string;
    serviceAreaId: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    features: string[];
    icon: string | null;
    link: string | null;
    sortOrder: number;
    linkedTeamId: string | null;
    linkedTeam: { id: string; teamName: string; isPublished: boolean } | null;
  }>;
  accordionGroups: Array<{
    id: string;
    groupId: string;
    title: string;
    sortOrder: number;
    links: Array<{ id: string; label: string; href: string; sortOrder: number }>;
  }>;
  // Sub-team data
  teamDescription: string | null;
  teamIconName: string | null;
  parentTeamName: string | null;
  parentTeamSlug: string | null;
  teamServices: Array<{
    id: string;
    title: string;
    items: string[];
    sortOrder: number;
  }>;
  teamInitiatives: Array<{
    id: string;
    title: string;
    description: string;
    href: string;
    sortOrder: number;
  }>;
  teamContacts: Array<{
    id: string;
    name: string;
    role: string;
    email: string;
    sortOrder: number;
  }>;
  teamQuickLinks: Array<{
    id: string;
    label: string;
    description: string;
    href: string;
    isSecure: boolean;
    sortOrder: number;
  }>;
  pageTitle: string | null;
  pageDescription: string | null;
  whoWeAreItems: Array<{
    id: string;
    title: string;
    description: string;
    linkText: string;
    linkUrl: string;
    sortOrder: number;
  }>;
  keyInitiativeSlides: Array<{
    id: string;
    title: string;
    description: string;
    imageUrl: string | null;
    imageAlt: string;
    sortOrder: number;
  }>;
  hasChildren: boolean;
  isArchived: boolean;
  readOnly?: boolean;
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
  who_we_are: {
    description:
      'A two-column layout with a video placeholder on the left and an accordion of information items on the right.',
    layoutType: 'Two-column with accordion',
    contents: [
      '"Who We Are" section heading',
      'Video placeholder area',
      'Expandable accordion items with descriptions and links',
    ],
    schematic: '2-col',
  },
  key_initiatives: {
    description:
      'A carousel spotlight showcasing key initiatives with images, titles, and descriptions. Includes navigation dots and prev/next buttons.',
    layoutType: 'Carousel slider',
    contents: [
      '"Key Initiatives Spotlight" heading',
      'Slide images with overlay text',
      'Previous/Next navigation buttons',
      'Dot indicators for slide navigation',
    ],
    schematic: 'full-width',
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

// ── Widget Config Form (for config-based widgets) ───────

function WidgetConfigForm({
  instanceId,
  widgetType,
  currentConfig,
  onSaved,
}: {
  instanceId: string;
  widgetType: string;
  currentConfig: Record<string, string>;
  onSaved: (config: Record<string, string>) => void;
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
    <div className="space-y-3">
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
  // eslint-disable-next-line react-hooks/static-components -- resolveIcon returns a stable reference from a static map
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
        <div className="flex items-center gap-3 p-5 border-b border-gray-100">
          <div className="w-10 h-10 rounded-lg bg-[#D3ECEF] flex items-center justify-center flex-shrink-0">
            {/* eslint-disable-next-line react-hooks/static-components -- resolveIcon returns a stable reference from a static map */}
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
        <div className="p-5 space-y-4">
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-4">
            <p className="font-sans text-[10px] uppercase tracking-wider text-gray-400 mb-2">
              Layout Preview
            </p>
            <WireframeSchematic type={preview.schematic} />
          </div>
          <p className="font-sans text-sm text-gray-600 leading-relaxed">
            {preview.description}
          </p>
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

// ── Widget Editor Modal ────────────────────────────────

function WidgetEditorModal({
  instance,
  teamId,
  onClose,
  onConfigSaved,
  portfolios,
  teamTabs,
  trelloBoards,
  teamMembers,
  serviceAreas,
  accordionGroups,
  whoWeAreItems,
  keyInitiativeSlides,
  teamServices,
  teamInitiatives,
  teamContacts,
  teamQuickLinks,
}: {
  instance: WidgetInstanceData;
  teamId: string;
  onClose: () => void;
  onConfigSaved: (instanceId: string, config: Record<string, string>) => void;
  portfolios: LayoutEditorProps['portfolios'];
  teamTabs: LayoutEditorProps['teamTabs'];
  trelloBoards: LayoutEditorProps['trelloBoards'];
  teamMembers: LayoutEditorProps['teamMembers'];
  serviceAreas: LayoutEditorProps['serviceAreas'];
  accordionGroups: LayoutEditorProps['accordionGroups'];
  whoWeAreItems: LayoutEditorProps['whoWeAreItems'];
  keyInitiativeSlides: LayoutEditorProps['keyInitiativeSlides'];
  teamServices: LayoutEditorProps['teamServices'];
  teamInitiatives: LayoutEditorProps['teamInitiatives'];
  teamContacts: LayoutEditorProps['teamContacts'];
  teamQuickLinks: LayoutEditorProps['teamQuickLinks'];
}) {
  // eslint-disable-next-line react-hooks/static-components -- resolveIcon returns a stable reference from a static map
  const IconComponent = resolveIcon(instance.widgetDefinition.icon);
  const widgetType = instance.widgetDefinition.widgetType;
  const isConfigWidget = widgetType in WIDGET_CONFIG_FIELDS;

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

  function renderEditor() {
    if (isConfigWidget) {
      return (
        <WidgetConfigForm
          instanceId={instance.id}
          widgetType={widgetType}
          currentConfig={(instance.config as Record<string, string>) || {}}
          onSaved={(config) => {
            onConfigSaved(instance.id, config);
            onClose();
          }}
        />
      );
    }

    switch (widgetType) {
      case 'portfolios':
        return <PortfolioEditor teamId={teamId} portfolios={portfolios} />;
      case 'team_tabs':
        return <TeamTabEditor teamId={teamId} tabs={teamTabs} />;
      case 'work_tracking':
        return <TrelloBoardEditor teamId={teamId} boards={trelloBoards} />;
      case 'team_members':
        return <TeamMemberEditor teamId={teamId} members={teamMembers} />;
      case 'service_areas':
        return <ServiceAreaEditor teamId={teamId} areas={serviceAreas} />;
      case 'who_we_are':
        return <WhoWeAreEditor teamId={teamId} items={whoWeAreItems} />;
      case 'key_initiatives':
        return <KeyInitiativesEditor teamId={teamId} slides={keyInitiativeSlides} />;
      case 'accordion_links':
        return <AccordionLinksEditor teamId={teamId} groups={accordionGroups} />;
      case 'subteam_services':
        return <TeamServicesEditor teamId={teamId} services={teamServices} />;
      case 'subteam_initiatives':
        return <TeamInitiativesEditor teamId={teamId} initiatives={teamInitiatives} />;
      case 'subteam_contacts':
        return <TeamContactsEditor teamId={teamId} contacts={teamContacts} />;
      case 'subteam_quick_links':
        return <TeamQuickLinksEditor teamId={teamId} quickLinks={teamQuickLinks} />;
      default:
        return (
          <p className="font-sans text-sm text-gray-500">
            No editor available for this widget type.
          </p>
        );
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-5 border-b border-gray-100 flex-shrink-0">
          <div className="w-10 h-10 rounded-lg bg-[#D3ECEF] flex items-center justify-center flex-shrink-0">
            {/* eslint-disable-next-line react-hooks/static-components -- resolveIcon returns a stable reference from a static map */}
            <IconComponent className="w-5 h-5 text-primary-blue" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-sans font-semibold text-gray-900">
              Edit: {instance.widgetDefinition.label}
            </h3>
            <span className="font-sans text-xs text-gray-400">
              {widgetType}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto p-5">
          {renderEditor()}
        </div>
      </div>
    </div>
  );
}

// ── Widget Inline Preview ──────────────────────────────

function EmptyWidgetPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <p className="font-sans text-sm text-gray-400">
        Nothing configured yet. Click the pencil icon to set up this widget.
      </p>
    </div>
  );
}

function WidgetInlinePreview({
  widgetType,
  config,
  teamName,
  teamShortName,
  portfolios,
  teamTabs,
  trelloBoards,
  teamMembers,
  serviceAreas,
  accordionGroups,
  teamDescription,
  teamIconName,
  parentTeamName,
  parentTeamSlug,
  teamServices,
  teamInitiatives,
  teamContacts,
  teamQuickLinks,
  whoWeAreItems,
  keyInitiativeSlides,
}: {
  widgetType: string;
  config: unknown;
  teamName: string;
  teamShortName: string;
  portfolios: LayoutEditorProps['portfolios'];
  teamTabs: LayoutEditorProps['teamTabs'];
  trelloBoards: LayoutEditorProps['trelloBoards'];
  teamMembers: LayoutEditorProps['teamMembers'];
  serviceAreas: LayoutEditorProps['serviceAreas'];
  accordionGroups: LayoutEditorProps['accordionGroups'];
  teamDescription: string | null;
  teamIconName: string | null;
  parentTeamName: string | null;
  parentTeamSlug: string | null;
  teamServices: LayoutEditorProps['teamServices'];
  teamInitiatives: LayoutEditorProps['teamInitiatives'];
  teamContacts: LayoutEditorProps['teamContacts'];
  teamQuickLinks: LayoutEditorProps['teamQuickLinks'];
  whoWeAreItems: LayoutEditorProps['whoWeAreItems'];
  keyInitiativeSlides: LayoutEditorProps['keyInitiativeSlides'];
}) {
  const cfg = (config as Record<string, string>) || {};

  switch (widgetType) {
    case 'page_header':
      return <PageHeaderWidget teamName={teamName} config={cfg} />;
    case 'portfolios':
      return portfolios.length > 0 ? (
        <PortfoliosWidget
          portfolios={portfolios.map((p) => ({
            icon: p.iconName,
            title: p.title,
            description: p.description,
            href: p.href,
            isPublished: p.linkedTeam?.isPublished ?? true,
          }))}
        />
      ) : <EmptyWidgetPlaceholder />;
    case 'team_tabs':
      return teamTabs.length > 0 ? (
        <TeamTabsWidget
          teamTabs={teamTabs.map((t) => ({
            id: t.tabId,
            label: t.label,
            videoTitle: t.videoTitle,
            videoDescription: t.videoDescription,
            videoUrl: t.videoUrl,
            diagramsTitle: t.diagramsTitle,
            diagramsDescription: t.diagramsDescription,
            diagramLinks: t.diagramLinks.map((d) => ({
              label: d.label,
              href: d.href,
            })),
          }))}
        />
      ) : <EmptyWidgetPlaceholder />;
    case 'accordion_links':
      return accordionGroups.length > 0 ? (
        <AccordionLinksWidget
          items={accordionGroups.map((g) => ({
            id: g.groupId,
            title: g.title,
            links: g.links.map((l) => ({ label: l.label, href: l.href })),
          }))}
        />
      ) : <EmptyWidgetPlaceholder />;
    case 'work_tracking':
      return trelloBoards.length > 0 ? (
        <WorkTrackingWidget
          trelloBoards={trelloBoards.map((b) => ({
            title: b.title,
            description: b.description,
            href: b.href,
          }))}
        />
      ) : <EmptyWidgetPlaceholder />;
    case 'ongoing_projects':
      return (
        <OngoingProjectsWidget
          teamName={teamName}
          teamShortName={teamShortName}
          config={cfg}
        />
      );
    case 'budget_spend':
      return <BudgetSpendWidget teamName={teamName} config={cfg} />;
    case 'team_members':
      return teamMembers.length > 0 ? (
        <TeamMembersWidget
          teamMembers={teamMembers.map((m) => ({
            name: m.name,
            title: m.title,
            email: m.email,
          }))}
        />
      ) : <EmptyWidgetPlaceholder />;
    case 'service_areas':
      return serviceAreas.length > 0 ? (
        <ServiceAreasWidget
          serviceAreas={serviceAreas.map((sa) => {
            const isPublished = sa.linkedTeam?.isPublished ?? true;
            return {
              id: sa.serviceAreaId,
              title: sa.title,
              icon: sa.icon || undefined,
              shortDescription: sa.shortDescription,
              fullDescription: sa.fullDescription,
              features: sa.features,
              link: isPublished ? sa.link || undefined : undefined,
              isPublished,
            };
          })}
        />
      ) : <EmptyWidgetPlaceholder />;
    case 'who_we_are':
      return whoWeAreItems.length > 0 ? (
        <WhoWeAreWidget
          items={whoWeAreItems.map((i) => ({
            title: i.title,
            description: i.description,
            linkText: i.linkText,
            linkUrl: i.linkUrl,
          }))}
        />
      ) : <EmptyWidgetPlaceholder />;
    case 'key_initiatives':
      return keyInitiativeSlides.length > 0 ? (
        <KeyInitiativesWidget
          slides={keyInitiativeSlides.map((s) => ({
            title: s.title,
            description: s.description,
            imageUrl: s.imageUrl || undefined,
            imageAlt: s.imageAlt,
          }))}
        />
      ) : <EmptyWidgetPlaceholder />;
    case 'subteam_header':
      return (teamIconName && teamDescription) ? (
        <SubTeamHeaderWidget
          teamName={teamName}
          description={teamDescription}
          iconName={teamIconName}
          parentTeam={parentTeamName || ''}
          parentTeamHref={parentTeamSlug ? `/${parentTeamSlug}` : '#'}
        />
      ) : <EmptyWidgetPlaceholder />;
    case 'subteam_services':
      return teamServices.length > 0 ? (
        <SubTeamServicesWidget
          services={teamServices.map(s => ({ title: s.title, items: s.items }))}
        />
      ) : <EmptyWidgetPlaceholder />;
    case 'subteam_initiatives':
      return teamInitiatives.length > 0 ? (
        <SubTeamInitiativesWidget
          initiatives={teamInitiatives.map(i => ({ title: i.title, description: i.description, href: i.href }))}
        />
      ) : <EmptyWidgetPlaceholder />;
    case 'subteam_contacts':
      return teamContacts.length > 0 ? (
        <SubTeamContactsWidget
          contacts={teamContacts.map(c => ({ name: c.name, role: c.role, email: c.email }))}
        />
      ) : <EmptyWidgetPlaceholder />;
    case 'subteam_quick_links':
      return teamQuickLinks.length > 0 ? (
        <SubTeamQuickLinksWidget
          quickLinks={teamQuickLinks.map(ql => ({ label: ql.label, description: ql.description, href: ql.href, isSecure: ql.isSecure }))}
        />
      ) : <EmptyWidgetPlaceholder />;
    default:
      return null;
  }
}

// ── Sortable Widget Item ───────────────────────────────

function SortableWidgetItem({
  instance,
  onRemove,
  onPreview,
  onEdit,
  isPending,
  teamName,
  teamShortName,
  portfolios,
  teamTabs,
  trelloBoards,
  teamMembers,
  serviceAreas,
  accordionGroups,
  teamDescription,
  teamIconName,
  parentTeamName,
  parentTeamSlug,
  teamServices,
  teamInitiatives,
  teamContacts,
  teamQuickLinks,
  whoWeAreItems,
  keyInitiativeSlides,
  readOnly,
}: {
  instance: WidgetInstanceData;
  onRemove: (id: string) => void;
  onPreview: (widgetType: string, icon: string, label: string) => void;
  onEdit: (instance: WidgetInstanceData) => void;
  isPending: boolean;
  teamName: string;
  teamShortName: string;
  portfolios: LayoutEditorProps['portfolios'];
  teamTabs: LayoutEditorProps['teamTabs'];
  trelloBoards: LayoutEditorProps['trelloBoards'];
  teamMembers: LayoutEditorProps['teamMembers'];
  serviceAreas: LayoutEditorProps['serviceAreas'];
  accordionGroups: LayoutEditorProps['accordionGroups'];
  teamDescription: string | null;
  teamIconName: string | null;
  parentTeamName: string | null;
  parentTeamSlug: string | null;
  teamServices: LayoutEditorProps['teamServices'];
  teamInitiatives: LayoutEditorProps['teamInitiatives'];
  teamContacts: LayoutEditorProps['teamContacts'];
  teamQuickLinks: LayoutEditorProps['teamQuickLinks'];
  whoWeAreItems: LayoutEditorProps['whoWeAreItems'];
  keyInitiativeSlides: LayoutEditorProps['keyInitiativeSlides'];
  readOnly?: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: instance.id, disabled: readOnly });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  // eslint-disable-next-line react-hooks/static-components -- resolveIcon returns a stable reference from a static map
  const IconComponent = resolveIcon(instance.widgetDefinition.icon);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
    >
      {/* Header bar */}
      <div className="flex items-center gap-3 p-3 border-b border-primary-blue bg-primary-blue">
        {!readOnly && (
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-white/60 hover:text-white touch-none"
            aria-label="Drag to reorder"
          >
            <GripVertical className="w-5 h-5" />
          </button>
        )}
        <div className="w-7 h-7 rounded bg-white/20 flex items-center justify-center flex-shrink-0">
          {/* eslint-disable-next-line react-hooks/static-components -- resolveIcon returns a stable reference from a static map */}
          <IconComponent className="w-3.5 h-3.5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <span className="font-sans font-semibold text-white text-sm">
            {instance.widgetDefinition.label}
          </span>
          <span className="font-sans text-xs text-white/50 ml-2">
            {instance.widgetDefinition.widgetType}
          </span>
        </div>
        {!readOnly && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(instance);
            }}
            className="p-1.5 text-white/60 hover:text-white rounded hover:bg-white/20 transition-colors"
            aria-label={`Edit ${instance.widgetDefinition.label}`}
          >
            <Pencil className="w-4 h-4" />
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
          className="p-1.5 text-white/60 hover:text-white rounded hover:bg-white/20 transition-colors"
          aria-label={`Preview ${instance.widgetDefinition.label}`}
        >
          <Eye className="w-4 h-4" />
        </button>
        {!readOnly && (
          <button
            onClick={() => onRemove(instance.id)}
            disabled={isPending}
            className="p-1.5 text-white/60 hover:text-red-300 rounded hover:bg-white/20 disabled:opacity-50 transition-colors"
            aria-label={`Remove ${instance.widgetDefinition.label}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
      {/* Inline widget preview */}
      <div className="pointer-events-none select-none opacity-50">
        <WidgetInlinePreview
          widgetType={instance.widgetDefinition.widgetType}
          config={instance.config}
          teamName={teamName}
          teamShortName={teamShortName}
          portfolios={portfolios}
          teamTabs={teamTabs}
          trelloBoards={trelloBoards}
          teamMembers={teamMembers}
          serviceAreas={serviceAreas}
          accordionGroups={accordionGroups}
          teamDescription={teamDescription}
          teamIconName={teamIconName}
          parentTeamName={parentTeamName}
          parentTeamSlug={parentTeamSlug}
          teamServices={teamServices}
          teamInitiatives={teamInitiatives}
          teamContacts={teamContacts}
          teamQuickLinks={teamQuickLinks}
          whoWeAreItems={whoWeAreItems}
          keyInitiativeSlides={keyInitiativeSlides}
        />
      </div>
    </div>
  );
}

// ── Main Layout Editor ─────────────────────────────────

export default function LayoutEditor({
  teamId,
  teamSlug,
  teamName,
  teamShortName,
  isPublished: initialIsPublished,
  instances: initialInstances,
  definitions,
  portfolios,
  teamTabs,
  trelloBoards,
  teamMembers,
  serviceAreas,
  accordionGroups,
  pageTitle: initialPageTitle,
  pageDescription: initialPageDescription,
  teamDescription,
  teamIconName,
  parentTeamName,
  parentTeamSlug,
  teamServices,
  teamInitiatives,
  teamContacts,
  teamQuickLinks,
  whoWeAreItems,
  keyInitiativeSlides,
  hasChildren,
  isArchived,
  readOnly = false,
}: LayoutEditorProps) {
  const dndId = useId();
  const [instances, setInstances] = useState(initialInstances);
  const [isPending, startTransition] = useTransition();
  const [previewWidget, setPreviewWidget] = useState<{
    widgetType: string;
    icon: string;
    label: string;
  } | null>(null);
  const [editingWidget, setEditingWidget] = useState<WidgetInstanceData | null>(null);
  const [isPublished, setIsPublished] = useState(initialIsPublished);
  const [publishPending, startPublishTransition] = useTransition();
  const [showArchiveDialog, setShowArchiveDialog] = useState(false);
  const [pageTitle, setPageTitle] = useState(initialPageTitle || '');
  const [pageDescription, setPageDescription] = useState(initialPageDescription || '');
  const [editingPageText, setEditingPageText] = useState(false);
  const [pageTextPending, startPageTextTransition] = useTransition();

  function handleTogglePublish() {
    const newValue = !isPublished;
    startPublishTransition(async () => {
      await updateTeam(teamId, { isPublished: newValue });
      setIsPublished(newValue);
    });
  }

  function handleSavePageText() {
    startPageTextTransition(async () => {
      await updateTeam(teamId, {
        pageTitle: pageTitle || undefined,
        pageDescription: pageDescription || undefined,
      });
      setEditingPageText(false);
    });
  }

  // Save state indicator
  const [showSaved, setShowSaved] = useState(false);
  const prevPendingRef = useRef(false);

  useEffect(() => {
    if (prevPendingRef.current && !isPending) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: show saved indicator after async transition completes
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

  const handleEdit = useCallback(
    (instance: WidgetInstanceData) => {
      setEditingWidget(instance);
    },
    []
  );

  function handleConfigSaved(instanceId: string, config: Record<string, string>) {
    setInstances((prev) =>
      prev.map((i) =>
        i.id === instanceId ? { ...i, config } : i
      )
    );
  }

  function handleReset() {
    if (!confirm('Are you sure you want to reset to the default layout? This will remove all current widgets and replace them with the default set.')) return;

    startTransition(async () => {
      const newInstances = await resetWidgetsToDefault(teamId);
      setInstances(
        newInstances.map((inst) => ({
          ...inst,
          config: inst.config as unknown,
        }))
      );
    });
  }

  return (
    <div className="space-y-8">
      {/* Header with Preview Page button and save indicator */}
      <div>
        <div className="flex items-start justify-between gap-4 mb-1">
          <h3 className="font-sans text-lg font-semibold text-gray-900">
            Page Layout
          </h3>
          <div className="flex items-center gap-3 flex-shrink-0">
            {!readOnly && (
              <>
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
                {/* Reset to Default button */}
                <button
                  onClick={handleReset}
                  disabled={isPending}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-primary-blue hover:text-primary-blue transition-colors disabled:opacity-50"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset to Default
                </button>
              </>
            )}
            {/* Preview Page button */}
            <a
              href={parentTeamSlug ? `/${parentTeamSlug}/${teamSlug}` : `/${teamSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-primary-blue hover:text-primary-blue transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Preview Page
            </a>
            {!readOnly && (
              <>
                {/* Publish / Unpublish button */}
                <button
                  onClick={handleTogglePublish}
                  disabled={publishPending}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${
                    isPublished
                      ? 'bg-white border border-gray-300 text-gray-700 hover:bg-red-50 hover:border-red-300 hover:text-red-700'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  {publishPending
                    ? (isPublished ? 'Unpublishing...' : 'Publishing...')
                    : (isPublished ? 'Unpublish' : 'Publish')}
                </button>
                {/* Archive button */}
                {!isArchived && (
                  <button
                    onClick={() => setShowArchiveDialog(true)}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-colors"
                  >
                    <Archive className="w-3.5 h-3.5" />
                    Archive
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Archive Confirmation Dialog */}
        <ArchiveConfirmDialog
          isOpen={showArchiveDialog}
          onClose={() => setShowArchiveDialog(false)}
          teamId={teamId}
          teamName={teamName}
          hasChildren={hasChildren}
        />
        {/* Page Text Editor */}
        {(initialPageTitle !== null || initialPageDescription !== null) && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-sans text-sm font-semibold text-gray-900">Page Header Text</h4>
              {!editingPageText ? (
                !readOnly && (
                  <button
                    onClick={() => setEditingPageText(true)}
                    className="p-1.5 text-gray-400 hover:text-primary-blue rounded hover:bg-gray-100"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                )
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSavePageText}
                    disabled={pageTextPending}
                    className="flex items-center gap-1 bg-primary-blue text-white text-sm px-3 py-1.5 rounded hover:bg-dark-blue disabled:opacity-50"
                  >
                    <Save className="w-3 h-3" /> Save
                  </button>
                  <button
                    onClick={() => {
                      setPageTitle(initialPageTitle || '');
                      setPageDescription(initialPageDescription || '');
                      setEditingPageText(false);
                    }}
                    className="flex items-center gap-1 text-gray-600 text-sm px-3 py-1.5 rounded hover:bg-gray-100"
                  >
                    <X className="w-3 h-3" /> Cancel
                  </button>
                </div>
              )}
            </div>
            {editingPageText ? (
              <div className="space-y-3">
                <div>
                  <label className="block font-sans text-xs text-gray-500 mb-1">Page Title</label>
                  <input
                    value={pageTitle}
                    onChange={(e) => setPageTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                    placeholder="e.g. Infrastructure Technology"
                  />
                </div>
                <div>
                  <label className="block font-sans text-xs text-gray-500 mb-1">Page Description</label>
                  <textarea
                    value={pageDescription}
                    onChange={(e) => setPageDescription(e.target.value)}
                    rows={3}
                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                    placeholder="A short description of the section..."
                  />
                </div>
              </div>
            ) : (
              <div>
                <p className="font-sans font-semibold text-gray-900">{pageTitle || <span className="text-gray-400 italic">No title set</span>}</p>
                <p className="font-sans text-sm text-gray-500 mt-1">{pageDescription || <span className="text-gray-400 italic">No description set</span>}</p>
              </div>
            )}
          </div>
        )}

        <p className="font-sans text-sm text-gray-500 mb-4">
          {readOnly
            ? 'You have view-only access to this page.'
            : 'Drag to reorder sections. Click the pencil to edit widget content.'}
        </p>

        {instances.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <p className="font-sans text-gray-500">
              No widgets added yet. Add widgets from the picker below.
            </p>
          </div>
        ) : (
          <DndContext
            id={dndId}
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={instances.map((i) => i.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {instances.map((instance) => (
                  <SortableWidgetItem
                    key={instance.id}
                    instance={instance}
                    onRemove={handleRemove}
                    onPreview={handlePreview}
                    onEdit={handleEdit}
                    isPending={isPending}
                    teamName={teamName}
                    teamShortName={teamShortName}
                    portfolios={portfolios}
                    teamTabs={teamTabs}
                    trelloBoards={trelloBoards}
                    teamMembers={teamMembers}
                    serviceAreas={serviceAreas}
                    accordionGroups={accordionGroups}
                    teamDescription={teamDescription}
                    teamIconName={teamIconName}
                    parentTeamName={parentTeamName}
                    parentTeamSlug={parentTeamSlug}
                    teamServices={teamServices}
                    teamInitiatives={teamInitiatives}
                    teamContacts={teamContacts}
                    teamQuickLinks={teamQuickLinks}
                    whoWeAreItems={whoWeAreItems}
                    keyInitiativeSlides={keyInitiativeSlides}
                    readOnly={readOnly}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* Widget Picker */}
      {!readOnly && availableDefinitions.length > 0 && (
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

      {/* Widget Editor Modal */}
      {editingWidget && (
        <WidgetEditorModal
          instance={editingWidget}
          teamId={teamId}
          onClose={() => setEditingWidget(null)}
          onConfigSaved={handleConfigSaved}
          portfolios={portfolios}
          teamTabs={teamTabs}
          trelloBoards={trelloBoards}
          teamMembers={teamMembers}
          serviceAreas={serviceAreas}
          accordionGroups={accordionGroups}
          whoWeAreItems={whoWeAreItems}
          keyInitiativeSlides={keyInitiativeSlides}
          teamServices={teamServices}
          teamInitiatives={teamInitiatives}
          teamContacts={teamContacts}
          teamQuickLinks={teamQuickLinks}
        />
      )}
    </div>
  );
}
