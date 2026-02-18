'use client';

import { useState, useTransition } from 'react';
import {
  createAccordionGroup,
  updateAccordionGroup,
  deleteAccordionGroup,
  createAccordionLink,
  updateAccordionLink,
  deleteAccordionLink,
} from '@/lib/actions/accordion-actions';
import { Pencil, Trash2, Plus, Save, X, ChevronDown, ChevronRight, Link as LinkIcon } from 'lucide-react';

interface AccordionLinkData {
  id: string;
  label: string;
  href: string;
  sortOrder: number;
}

interface AccordionGroupData {
  id: string;
  groupId: string;
  title: string;
  sortOrder: number;
  links: AccordionLinkData[];
}

export default function AccordionLinksEditor({
  teamId,
  groups,
}: {
  teamId: string;
  groups: AccordionGroupData[];
}) {
  const [editingGroup, setEditingGroup] = useState<string | null>(null);
  const [editingLink, setEditingLink] = useState<string | null>(null);
  const [addingGroup, setAddingGroup] = useState(false);
  const [addingLinkTo, setAddingLinkTo] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();

  const [groupForm, setGroupForm] = useState({ groupId: '', title: '' });
  const [linkForm, setLinkForm] = useState({ label: '', href: '' });

  function toggleExpand(groupId: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) next.delete(groupId);
      else next.add(groupId);
      return next;
    });
  }

  // ── Group operations ──────────────────────────────────

  function startEditGroup(g: AccordionGroupData) {
    setEditingGroup(g.id);
    setGroupForm({ groupId: g.groupId, title: g.title });
  }

  function handleSaveGroup(id: string) {
    startTransition(async () => {
      await updateAccordionGroup(id, { title: groupForm.title });
      setEditingGroup(null);
    });
  }

  function handleCreateGroup() {
    startTransition(async () => {
      await createAccordionGroup(teamId, {
        groupId: groupForm.groupId,
        title: groupForm.title,
      });
      setAddingGroup(false);
      setGroupForm({ groupId: '', title: '' });
    });
  }

  function handleDeleteGroup(id: string) {
    if (!confirm('Delete this group and all its links?')) return;
    startTransition(async () => {
      await deleteAccordionGroup(id);
    });
  }

  // ── Link operations ───────────────────────────────────

  function startEditLink(l: AccordionLinkData) {
    setEditingLink(l.id);
    setLinkForm({ label: l.label, href: l.href });
  }

  function handleSaveLink(id: string) {
    startTransition(async () => {
      await updateAccordionLink(id, { label: linkForm.label, href: linkForm.href });
      setEditingLink(null);
    });
  }

  function handleCreateLink(accordionGroupId: string) {
    startTransition(async () => {
      await createAccordionLink(accordionGroupId, {
        label: linkForm.label,
        href: linkForm.href,
      });
      setAddingLinkTo(null);
      setLinkForm({ label: '', href: '' });
    });
  }

  function handleDeleteLink(id: string) {
    if (!confirm('Delete this link?')) return;
    startTransition(async () => {
      await deleteAccordionLink(id);
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-sans text-lg font-semibold text-gray-900">
          Accordion Link Groups ({groups.length})
        </h2>
        <button
          onClick={() => {
            setAddingGroup(true);
            setGroupForm({ groupId: '', title: '' });
          }}
          className="flex items-center gap-1 bg-primary-blue text-white text-sm font-sans px-3 py-1.5 rounded hover:bg-dark-blue transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Group
        </button>
      </div>

      <div className="space-y-3">
        {groups.map((g) => (
          <div key={g.id} className="bg-white border border-gray-200 rounded-lg">
            {/* Group header */}
            {editingGroup === g.id ? (
              <div className="p-4 space-y-3">
                <div>
                  <label className="block font-sans text-xs text-gray-500 mb-1">Title</label>
                  <input
                    value={groupForm.title}
                    onChange={(e) => setGroupForm({ ...groupForm, title: e.target.value })}
                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSaveGroup(g.id)}
                    disabled={isPending}
                    className="flex items-center gap-1 bg-primary-blue text-white text-sm px-3 py-1.5 rounded hover:bg-dark-blue disabled:opacity-50"
                  >
                    <Save className="w-3 h-3" /> Save
                  </button>
                  <button
                    onClick={() => setEditingGroup(null)}
                    className="flex items-center gap-1 text-gray-600 text-sm px-3 py-1.5 rounded hover:bg-gray-100"
                  >
                    <X className="w-3 h-3" /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 flex items-center justify-between">
                <button
                  onClick={() => toggleExpand(g.id)}
                  className="flex items-center gap-2 text-left flex-1 min-w-0"
                >
                  {expanded.has(g.id) ? (
                    <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  )}
                  <span className="font-sans font-semibold text-gray-900">{g.title}</span>
                  <span className="font-sans text-xs text-gray-400">({g.groupId})</span>
                  <span className="font-sans text-xs text-gray-400 ml-1">
                    {g.links.length} {g.links.length === 1 ? 'link' : 'links'}
                  </span>
                </button>
                <div className="flex gap-1 flex-shrink-0">
                  <button
                    onClick={() => startEditGroup(g)}
                    className="p-1.5 text-gray-400 hover:text-primary-blue rounded hover:bg-gray-100"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteGroup(g.id)}
                    disabled={isPending}
                    className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-gray-100 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Expanded links */}
            {expanded.has(g.id) && (
              <div className="border-t border-gray-100 px-4 pb-4">
                <div className="ml-6 mt-3 space-y-2">
                  {g.links.map((l) => (
                    <div key={l.id} className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                      {editingLink === l.id ? (
                        <div className="space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block font-sans text-xs text-gray-500 mb-1">Label</label>
                              <input
                                value={linkForm.label}
                                onChange={(e) => setLinkForm({ ...linkForm, label: e.target.value })}
                                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                              />
                            </div>
                            <div>
                              <label className="block font-sans text-xs text-gray-500 mb-1">URL</label>
                              <input
                                value={linkForm.href}
                                onChange={(e) => setLinkForm({ ...linkForm, href: e.target.value })}
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
                            <span className="font-sans text-sm text-gray-900">{l.label}</span>
                            <span className="font-sans text-xs text-gray-400 truncate">{l.href}</span>
                          </div>
                          <div className="flex gap-1 flex-shrink-0">
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
                  {addingLinkTo === g.id ? (
                    <div className="bg-white border-2 border-dashed border-primary-blue rounded-lg p-3 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block font-sans text-xs text-gray-500 mb-1">Label</label>
                          <input
                            value={linkForm.label}
                            onChange={(e) => setLinkForm({ ...linkForm, label: e.target.value })}
                            placeholder="e.g. Incident Management"
                            className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                          />
                        </div>
                        <div>
                          <label className="block font-sans text-xs text-gray-500 mb-1">URL</label>
                          <input
                            value={linkForm.href}
                            onChange={(e) => setLinkForm({ ...linkForm, href: e.target.value })}
                            placeholder="https://..."
                            className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCreateLink(g.id)}
                          disabled={isPending || !linkForm.label || !linkForm.href}
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
                        setAddingLinkTo(g.id);
                        setLinkForm({ label: '', href: '' });
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

        {/* Add group form */}
        {addingGroup && (
          <div className="bg-white border-2 border-dashed border-primary-blue rounded-lg p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-sans text-xs text-gray-500 mb-1">Group ID</label>
                <input
                  value={groupForm.groupId}
                  onChange={(e) => setGroupForm({ ...groupForm, groupId: e.target.value })}
                  placeholder="e.g. incident-management"
                  className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                />
              </div>
              <div>
                <label className="block font-sans text-xs text-gray-500 mb-1">Title</label>
                <input
                  value={groupForm.title}
                  onChange={(e) => setGroupForm({ ...groupForm, title: e.target.value })}
                  placeholder="e.g. Incident Management"
                  className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCreateGroup}
                disabled={isPending || !groupForm.groupId || !groupForm.title}
                className="flex items-center gap-1 bg-primary-blue text-white text-sm px-3 py-1.5 rounded hover:bg-dark-blue disabled:opacity-50"
              >
                <Plus className="w-3 h-3" /> Create Group
              </button>
              <button
                onClick={() => setAddingGroup(false)}
                className="flex items-center gap-1 text-gray-600 text-sm px-3 py-1.5 rounded hover:bg-gray-100"
              >
                <X className="w-3 h-3" /> Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
