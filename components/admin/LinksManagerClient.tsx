'use client';

import { useState, useTransition } from 'react';
import {
  createLinkCategory,
  updateLinkCategory,
  deleteLinkCategory,
  reorderLinkCategories,
  createLinkItem,
  updateLinkItem,
  deleteLinkItem,
  reorderLinkItems,
} from '@/lib/actions/links-actions';
import {
  Pencil, Trash2, Plus, Save, X, ChevronDown, ChevronRight,
  ChevronUp, Link as LinkIcon, ArrowUp, ArrowDown, Grid2x2,
} from 'lucide-react';

interface LinkItemData {
  id: string;
  name: string;
  url: string;
  sortOrder: number;
}

interface CategoryData {
  id: string;
  title: string;
  subtitle: string;
  iconBg: string;
  iconColor: string;
  isTeamGrid: boolean;
  sortOrder: number;
  links: LinkItemData[];
}

const ICON_BG_OPTIONS = [
  { value: 'bg-red-50', label: 'Red' },
  { value: 'bg-blue-50', label: 'Blue' },
  { value: 'bg-amber-50', label: 'Amber' },
  { value: 'bg-purple-50', label: 'Purple' },
  { value: 'bg-green-50', label: 'Green' },
  { value: 'bg-orange-50', label: 'Orange' },
  { value: 'bg-teal-50', label: 'Teal' },
];

const ICON_COLOR_OPTIONS = [
  { value: 'text-edmonton-error', label: 'Red' },
  { value: 'text-process-blue', label: 'Blue' },
  { value: 'text-edmonton-warning', label: 'Amber' },
  { value: 'text-purple-600', label: 'Purple' },
  { value: 'text-green-600', label: 'Green' },
  { value: 'text-orange-600', label: 'Orange' },
  { value: 'text-teal-600', label: 'Teal' },
];

export default function LinksManagerClient({
  categories: initialCategories,
}: {
  categories: CategoryData[];
}) {
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingLink, setEditingLink] = useState<string | null>(null);
  const [addingCategory, setAddingCategory] = useState(false);
  const [addingLinkTo, setAddingLinkTo] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();

  const [categoryForm, setCategoryForm] = useState({
    title: '',
    subtitle: '',
    iconBg: 'bg-blue-50',
    iconColor: 'text-process-blue',
    isTeamGrid: false,
  });
  const [linkForm, setLinkForm] = useState({ name: '', url: '' });

  function toggleExpand(categoryId: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) next.delete(categoryId);
      else next.add(categoryId);
      return next;
    });
  }

  // ── Category operations ──────────────────────────────

  function startEditCategory(c: CategoryData) {
    setEditingCategory(c.id);
    setCategoryForm({
      title: c.title,
      subtitle: c.subtitle,
      iconBg: c.iconBg,
      iconColor: c.iconColor,
      isTeamGrid: c.isTeamGrid,
    });
  }

  function handleSaveCategory(id: string) {
    startTransition(async () => {
      await updateLinkCategory(id, categoryForm);
      setEditingCategory(null);
    });
  }

  function handleCreateCategory() {
    startTransition(async () => {
      await createLinkCategory(categoryForm);
      setAddingCategory(false);
      setCategoryForm({
        title: '',
        subtitle: '',
        iconBg: 'bg-blue-50',
        iconColor: 'text-process-blue',
        isTeamGrid: false,
      });
    });
  }

  function handleDeleteCategory(id: string) {
    if (!confirm('Delete this category and all its links?')) return;
    startTransition(async () => {
      await deleteLinkCategory(id);
    });
  }

  function handleMoveCategory(index: number, direction: 'up' | 'down') {
    const cats = initialCategories;
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= cats.length) return;

    const reordered = [...cats];
    [reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]];

    startTransition(async () => {
      await reorderLinkCategories(reordered.map((c) => c.id));
    });
  }

  // ── Link operations ──────────────────────────────────

  function startEditLink(l: LinkItemData) {
    setEditingLink(l.id);
    setLinkForm({ name: l.name, url: l.url });
  }

  function handleSaveLink(id: string) {
    startTransition(async () => {
      await updateLinkItem(id, { name: linkForm.name, url: linkForm.url });
      setEditingLink(null);
    });
  }

  function handleCreateLink(categoryId: string) {
    startTransition(async () => {
      await createLinkItem(categoryId, { name: linkForm.name, url: linkForm.url });
      setAddingLinkTo(null);
      setLinkForm({ name: '', url: '' });
    });
  }

  function handleDeleteLink(id: string) {
    if (!confirm('Delete this link?')) return;
    startTransition(async () => {
      await deleteLinkItem(id);
    });
  }

  function handleMoveLink(category: CategoryData, linkIndex: number, direction: 'up' | 'down') {
    const links = category.links;
    const newIndex = direction === 'up' ? linkIndex - 1 : linkIndex + 1;
    if (newIndex < 0 || newIndex >= links.length) return;

    const reordered = [...links];
    [reordered[linkIndex], reordered[newIndex]] = [reordered[newIndex], reordered[linkIndex]];

    startTransition(async () => {
      await reorderLinkItems(category.id, reordered.map((l) => l.id));
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-sans text-lg font-semibold text-gray-900">
          Link Categories ({initialCategories.length})
        </h2>
        <button
          onClick={() => {
            setAddingCategory(true);
            setCategoryForm({
              title: '',
              subtitle: '',
              iconBg: 'bg-blue-50',
              iconColor: 'text-process-blue',
              isTeamGrid: false,
            });
          }}
          className="flex items-center gap-1 bg-primary-blue text-white text-sm font-sans px-3 py-1.5 rounded hover:bg-dark-blue transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="space-y-3">
        {initialCategories.map((c, catIndex) => (
          <div key={c.id} className="bg-white border border-gray-200 rounded-lg">
            {/* Category header */}
            {editingCategory === c.id ? (
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-sans text-xs text-gray-500 mb-1">Title</label>
                    <input
                      value={categoryForm.title}
                      onChange={(e) => setCategoryForm({ ...categoryForm, title: e.target.value })}
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-xs text-gray-500 mb-1">Subtitle</label>
                    <input
                      value={categoryForm.subtitle}
                      onChange={(e) => setCategoryForm({ ...categoryForm, subtitle: e.target.value })}
                      placeholder="e.g. 7 resources"
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-sans text-xs text-gray-500 mb-1">Icon Background</label>
                    <select
                      value={categoryForm.iconBg}
                      onChange={(e) => setCategoryForm({ ...categoryForm, iconBg: e.target.value })}
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                    >
                      {ICON_BG_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-sans text-xs text-gray-500 mb-1">Icon Color</label>
                    <select
                      value={categoryForm.iconColor}
                      onChange={(e) => setCategoryForm({ ...categoryForm, iconColor: e.target.value })}
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                    >
                      {ICON_COLOR_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-end pb-1">
                    <label className="flex items-center gap-2 font-sans text-sm text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={categoryForm.isTeamGrid}
                        onChange={(e) => setCategoryForm({ ...categoryForm, isTeamGrid: e.target.checked })}
                        className="rounded border-gray-300"
                      />
                      Grid layout
                    </label>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSaveCategory(c.id)}
                    disabled={isPending}
                    className="flex items-center gap-1 bg-primary-blue text-white text-sm px-3 py-1.5 rounded hover:bg-dark-blue disabled:opacity-50"
                  >
                    <Save className="w-3 h-3" /> Save
                  </button>
                  <button
                    onClick={() => setEditingCategory(null)}
                    className="flex items-center gap-1 text-gray-600 text-sm px-3 py-1.5 rounded hover:bg-gray-100"
                  >
                    <X className="w-3 h-3" /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 flex items-center justify-between">
                <button
                  onClick={() => toggleExpand(c.id)}
                  className="flex items-center gap-2 text-left flex-1 min-w-0"
                >
                  {expanded.has(c.id) ? (
                    <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  )}
                  <div className={`w-8 h-8 rounded-lg ${c.iconBg} flex items-center justify-center flex-shrink-0`}>
                    {c.isTeamGrid ? (
                      <Grid2x2 className={`w-4 h-4 ${c.iconColor}`} />
                    ) : (
                      <LinkIcon className={`w-4 h-4 ${c.iconColor}`} />
                    )}
                  </div>
                  <span className="font-sans font-semibold text-gray-900">{c.title}</span>
                  <span className="font-sans text-xs text-gray-400">{c.subtitle}</span>
                  <span className="font-sans text-xs text-gray-400 ml-1">
                    ({c.links.length} {c.links.length === 1 ? 'link' : 'links'})
                  </span>
                </button>
                <div className="flex gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleMoveCategory(catIndex, 'up')}
                    disabled={isPending || catIndex === 0}
                    className="p-1.5 text-gray-400 hover:text-primary-blue rounded hover:bg-gray-100 disabled:opacity-30"
                    title="Move up"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleMoveCategory(catIndex, 'down')}
                    disabled={isPending || catIndex === initialCategories.length - 1}
                    className="p-1.5 text-gray-400 hover:text-primary-blue rounded hover:bg-gray-100 disabled:opacity-30"
                    title="Move down"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => startEditCategory(c)}
                    className="p-1.5 text-gray-400 hover:text-primary-blue rounded hover:bg-gray-100"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(c.id)}
                    disabled={isPending}
                    className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-gray-100 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Expanded links */}
            {expanded.has(c.id) && (
              <div className="border-t border-gray-100 px-4 pb-4">
                <div className="ml-6 mt-3 space-y-2">
                  {c.links.map((l, linkIndex) => (
                    <div key={l.id} className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                      {editingLink === l.id ? (
                        <div className="space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block font-sans text-xs text-gray-500 mb-1">Name</label>
                              <input
                                value={linkForm.name}
                                onChange={(e) => setLinkForm({ ...linkForm, name: e.target.value })}
                                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                              />
                            </div>
                            <div>
                              <label className="block font-sans text-xs text-gray-500 mb-1">URL</label>
                              <input
                                value={linkForm.url}
                                onChange={(e) => setLinkForm({ ...linkForm, url: e.target.value })}
                                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                              />
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSaveLink(l.id)}
                              disabled={isPending}
                              className="flex items-center gap-1 bg-primary-blue text-white text-sm px-3 py-1.5 rounded hover:bg-dark-blue disabled:opacity-50"
                            >
                              <Save className="w-3 h-3" /> Save
                            </button>
                            <button
                              onClick={() => setEditingLink(null)}
                              className="flex items-center gap-1 text-gray-600 text-sm px-3 py-1.5 rounded hover:bg-gray-100"
                            >
                              <X className="w-3 h-3" /> Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 min-w-0">
                            <LinkIcon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                            <span className="font-sans text-sm text-gray-900">{l.name}</span>
                            <span className="font-sans text-xs text-gray-400 truncate">{l.url}</span>
                          </div>
                          <div className="flex gap-1 flex-shrink-0">
                            <button
                              onClick={() => handleMoveLink(c, linkIndex, 'up')}
                              disabled={isPending || linkIndex === 0}
                              className="p-1 text-gray-400 hover:text-primary-blue rounded hover:bg-gray-100 disabled:opacity-30"
                              title="Move up"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleMoveLink(c, linkIndex, 'down')}
                              disabled={isPending || linkIndex === c.links.length - 1}
                              className="p-1 text-gray-400 hover:text-primary-blue rounded hover:bg-gray-100 disabled:opacity-30"
                              title="Move down"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => startEditLink(l)}
                              className="p-1 text-gray-400 hover:text-primary-blue rounded hover:bg-gray-100"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteLink(l.id)}
                              disabled={isPending}
                              className="p-1 text-gray-400 hover:text-red-600 rounded hover:bg-gray-100 disabled:opacity-50"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Add link form */}
                  {addingLinkTo === c.id ? (
                    <div className="bg-white border-2 border-dashed border-primary-blue rounded-lg p-3 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block font-sans text-xs text-gray-500 mb-1">Name</label>
                          <input
                            value={linkForm.name}
                            onChange={(e) => setLinkForm({ ...linkForm, name: e.target.value })}
                            placeholder="e.g. Helix (Remedy) SmartIT"
                            className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                          />
                        </div>
                        <div>
                          <label className="block font-sans text-xs text-gray-500 mb-1">URL</label>
                          <input
                            value={linkForm.url}
                            onChange={(e) => setLinkForm({ ...linkForm, url: e.target.value })}
                            placeholder="https://..."
                            className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCreateLink(c.id)}
                          disabled={isPending || !linkForm.name || !linkForm.url}
                          className="flex items-center gap-1 bg-primary-blue text-white text-sm px-3 py-1.5 rounded hover:bg-dark-blue disabled:opacity-50"
                        >
                          <Plus className="w-3 h-3" /> Add Link
                        </button>
                        <button
                          onClick={() => setAddingLinkTo(null)}
                          className="flex items-center gap-1 text-gray-600 text-sm px-3 py-1.5 rounded hover:bg-gray-100"
                        >
                          <X className="w-3 h-3" /> Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setAddingLinkTo(c.id);
                        setLinkForm({ name: '', url: '' });
                      }}
                      className="flex items-center gap-1 text-primary-blue text-sm font-sans hover:underline"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add link
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add category form */}
        {addingCategory && (
          <div className="bg-white border-2 border-dashed border-primary-blue rounded-lg p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-sans text-xs text-gray-500 mb-1">Title</label>
                <input
                  value={categoryForm.title}
                  onChange={(e) => setCategoryForm({ ...categoryForm, title: e.target.value })}
                  placeholder="e.g. Incident & Problem Management"
                  className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                />
              </div>
              <div>
                <label className="block font-sans text-xs text-gray-500 mb-1">Subtitle</label>
                <input
                  value={categoryForm.subtitle}
                  onChange={(e) => setCategoryForm({ ...categoryForm, subtitle: e.target.value })}
                  placeholder="e.g. 7 resources"
                  className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-sans text-xs text-gray-500 mb-1">Icon Background</label>
                <select
                  value={categoryForm.iconBg}
                  onChange={(e) => setCategoryForm({ ...categoryForm, iconBg: e.target.value })}
                  className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                >
                  {ICON_BG_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-sans text-xs text-gray-500 mb-1">Icon Color</label>
                <select
                  value={categoryForm.iconColor}
                  onChange={(e) => setCategoryForm({ ...categoryForm, iconColor: e.target.value })}
                  className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                >
                  {ICON_COLOR_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end pb-1">
                <label className="flex items-center gap-2 font-sans text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={categoryForm.isTeamGrid}
                    onChange={(e) => setCategoryForm({ ...categoryForm, isTeamGrid: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  Grid layout
                </label>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCreateCategory}
                disabled={isPending || !categoryForm.title || !categoryForm.subtitle}
                className="flex items-center gap-1 bg-primary-blue text-white text-sm px-3 py-1.5 rounded hover:bg-dark-blue disabled:opacity-50"
              >
                <Plus className="w-3 h-3" /> Create Category
              </button>
              <button
                onClick={() => setAddingCategory(false)}
                className="flex items-center gap-1 text-gray-600 text-sm px-3 py-1.5 rounded hover:bg-gray-100"
              >
                <X className="w-3 h-3" /> Cancel
              </button>
            </div>
          </div>
        )}

        {initialCategories.length === 0 && !addingCategory && (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500 font-sans text-sm">
            No link categories yet. Click &quot;Add Category&quot; to create your first one.
          </div>
        )}
      </div>
    </div>
  );
}
