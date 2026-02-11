'use client';

import { useState, useTransition } from 'react';
import { createTeamTab, updateTeamTab, deleteTeamTab } from '@/lib/actions/team-tab-actions';
import { Pencil, Trash2, Plus, Save, X, Link } from 'lucide-react';

interface DiagramLink {
  id: string;
  label: string;
  href: string;
  sortOrder: number;
}

interface TeamTab {
  id: string;
  tabId: string;
  label: string;
  videoTitle: string;
  videoDescription: string;
  videoUrl: string;
  diagramsTitle: string;
  diagramsDescription: string;
  sortOrder: number;
  diagramLinks: DiagramLink[];
}

const emptyForm = {
  tabId: '',
  label: '',
  videoTitle: '',
  videoDescription: '',
  videoUrl: '',
  diagramsTitle: '',
  diagramsDescription: '',
};

export default function TeamTabEditor({
  teamId,
  tabs,
}: {
  teamId: string;
  tabs: TeamTab[];
}) {
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState({ ...emptyForm });

  function startEdit(tab: TeamTab) {
    setEditing(tab.id);
    setForm({
      tabId: tab.tabId,
      label: tab.label,
      videoTitle: tab.videoTitle,
      videoDescription: tab.videoDescription,
      videoUrl: tab.videoUrl,
      diagramsTitle: tab.diagramsTitle,
      diagramsDescription: tab.diagramsDescription,
    });
  }

  function handleSave(tabId: string) {
    startTransition(async () => {
      await updateTeamTab(tabId, form);
      setEditing(null);
    });
  }

  function handleCreate() {
    startTransition(async () => {
      await createTeamTab(teamId, form);
      setAdding(false);
      setForm({ ...emptyForm });
    });
  }

  function handleDelete(tabId: string) {
    if (!confirm('Delete this tab?')) return;
    startTransition(async () => {
      await deleteTeamTab(tabId);
    });
  }

  function renderFormFields() {
    return (
      <>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-sans text-xs text-gray-500 mb-1">Tab ID (slug)</label>
            <input
              value={form.tabId}
              onChange={(e) => setForm({ ...form, tabId: e.target.value })}
              placeholder="e.g. overview"
              className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
            />
          </div>
          <div>
            <label className="block font-sans text-xs text-gray-500 mb-1">Label</label>
            <input
              value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
              placeholder="e.g. Overview"
              className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-sans text-xs text-gray-500 mb-1">Video Title</label>
            <input
              value={form.videoTitle}
              onChange={(e) => setForm({ ...form, videoTitle: e.target.value })}
              className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
            />
          </div>
          <div>
            <label className="block font-sans text-xs text-gray-500 mb-1">Video URL</label>
            <input
              value={form.videoUrl}
              onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
              className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
            />
          </div>
        </div>
        <div>
          <label className="block font-sans text-xs text-gray-500 mb-1">Video Description</label>
          <textarea
            value={form.videoDescription}
            onChange={(e) => setForm({ ...form, videoDescription: e.target.value })}
            rows={2}
            className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-sans text-xs text-gray-500 mb-1">Diagrams Title</label>
            <input
              value={form.diagramsTitle}
              onChange={(e) => setForm({ ...form, diagramsTitle: e.target.value })}
              className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
            />
          </div>
          <div>
            <label className="block font-sans text-xs text-gray-500 mb-1">Diagrams Description</label>
            <input
              value={form.diagramsDescription}
              onChange={(e) => setForm({ ...form, diagramsDescription: e.target.value })}
              className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-sans text-lg font-semibold text-gray-900">
          Tabs ({tabs.length})
        </h2>
        <button
          onClick={() => {
            setAdding(true);
            setForm({ ...emptyForm });
          }}
          className="flex items-center gap-1 bg-primary-blue text-white text-sm font-sans px-3 py-1.5 rounded hover:bg-dark-blue transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Tab
        </button>
      </div>

      <div className="space-y-3">
        {tabs.map((tab) => (
          <div key={tab.id} className="bg-white border border-gray-200 rounded-lg p-4">
            {editing === tab.id ? (
              <div className="space-y-3">
                {renderFormFields()}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave(tab.id)}
                    disabled={isPending}
                    className="flex items-center gap-1 bg-primary-blue text-white text-sm px-3 py-1.5 rounded hover:bg-dark-blue disabled:opacity-50"
                  >
                    <Save className="w-3 h-3" /> Save
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="flex items-center gap-1 text-gray-600 text-sm px-3 py-1.5 rounded hover:bg-gray-100"
                  >
                    <X className="w-3 h-3" /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                        {tab.tabId}
                      </span>
                      <span className="font-sans font-semibold text-gray-900">{tab.label}</span>
                    </div>
                    <p className="font-sans text-sm text-gray-500 mt-1">
                      {tab.videoTitle && <>Video: {tab.videoTitle}</>}
                      {tab.videoTitle && tab.diagramsTitle && <> &middot; </>}
                      {tab.diagramsTitle && <>Diagrams: {tab.diagramsTitle}</>}
                    </p>
                    {tab.videoUrl && (
                      <p className="font-sans text-xs text-gray-400 mt-1 truncate max-w-md">{tab.videoUrl}</p>
                    )}
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      onClick={() => startEdit(tab)}
                      className="p-1.5 text-gray-400 hover:text-primary-blue rounded hover:bg-gray-100"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(tab.id)}
                      disabled={isPending}
                      className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-gray-100 disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Diagram Links display */}
                {tab.diagramLinks.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="font-sans text-xs font-medium text-gray-500 mb-1.5">
                      Diagram Links ({tab.diagramLinks.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {tab.diagramLinks
                        .sort((a, b) => a.sortOrder - b.sortOrder)
                        .map((link) => (
                          <a
                            key={link.id}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-sans text-xs text-primary-blue bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition-colors"
                          >
                            <Link className="w-3 h-3" />
                            {link.label}
                          </a>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Add Form */}
        {adding && (
          <div className="bg-white border-2 border-dashed border-primary-blue rounded-lg p-4 space-y-3">
            {renderFormFields()}
            <div className="flex gap-2">
              <button
                onClick={handleCreate}
                disabled={isPending || !form.label || !form.tabId}
                className="flex items-center gap-1 bg-primary-blue text-white text-sm px-3 py-1.5 rounded hover:bg-dark-blue disabled:opacity-50"
              >
                <Plus className="w-3 h-3" /> Create
              </button>
              <button
                onClick={() => setAdding(false)}
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
