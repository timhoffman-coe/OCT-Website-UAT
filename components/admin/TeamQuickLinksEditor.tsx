'use client';

import { useState, useTransition } from 'react';
import { createTeamQuickLink, updateTeamQuickLink, deleteTeamQuickLink } from '@/lib/actions/subteam-actions';
import { Pencil, Trash2, Plus, Save, X, Lock, ExternalLink } from 'lucide-react';

interface TeamQuickLink {
  id: string;
  label: string;
  description: string;
  href: string;
  isSecure: boolean;
  sortOrder: number;
}

export default function TeamQuickLinksEditor({
  teamId,
  quickLinks,
}: {
  teamId: string;
  quickLinks: TeamQuickLink[];
}) {
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState({ label: '', description: '', href: '#', isSecure: false });

  function startEdit(ql: TeamQuickLink) {
    setEditing(ql.id);
    setForm({ label: ql.label, description: ql.description, href: ql.href, isSecure: ql.isSecure });
  }

  function handleSave(linkId: string) {
    startTransition(async () => {
      await updateTeamQuickLink(linkId, form);
      setEditing(null);
    });
  }

  function handleCreate() {
    startTransition(async () => {
      await createTeamQuickLink(teamId, form);
      setAdding(false);
      setForm({ label: '', description: '', href: '#', isSecure: false });
    });
  }

  function handleDelete(linkId: string) {
    if (!confirm('Delete this quick link?')) return;
    startTransition(async () => {
      await deleteTeamQuickLink(linkId);
    });
  }

  const formFields = (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block font-sans text-xs text-gray-500 mb-1">Label</label>
          <input
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
            className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
          />
        </div>
        <div>
          <label className="block font-sans text-xs text-gray-500 mb-1">Link (href)</label>
          <input
            value={form.href}
            onChange={(e) => setForm({ ...form, href: e.target.value })}
            className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
          />
        </div>
      </div>
      <div>
        <label className="block font-sans text-xs text-gray-500 mb-1">Description</label>
        <input
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
        />
      </div>
      <label className="flex items-center gap-2 font-sans text-sm text-gray-700">
        <input
          type="checkbox"
          checked={form.isSecure}
          onChange={(e) => setForm({ ...form, isSecure: e.target.checked })}
          className="rounded border-gray-300"
        />
        Secure link (shows lock icon)
      </label>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-sans text-lg font-semibold text-gray-900">
          Quick Links ({quickLinks.length})
        </h2>
        <button
          onClick={() => { setAdding(true); setForm({ label: '', description: '', href: '#', isSecure: false }); }}
          className="flex items-center gap-1 bg-primary-blue text-white text-sm font-sans px-3 py-1.5 rounded hover:bg-dark-blue transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Quick Link
        </button>
      </div>

      <div className="space-y-3">
        {quickLinks.map((ql) => (
          <div key={ql.id} className="bg-white border border-gray-200 rounded-lg p-4">
            {editing === ql.id ? (
              <div>
                {formFields}
                <div className="flex gap-2 mt-3">
                  <button onClick={() => handleSave(ql.id)} disabled={isPending} className="flex items-center gap-1 bg-primary-blue text-white text-sm px-3 py-1.5 rounded hover:bg-dark-blue disabled:opacity-50">
                    <Save className="w-3 h-3" /> Save
                  </button>
                  <button onClick={() => setEditing(null)} className="flex items-center gap-1 text-gray-600 text-sm px-3 py-1.5 rounded hover:bg-gray-100">
                    <X className="w-3 h-3" /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-sans font-semibold text-gray-900">{ql.label}</span>
                    {ql.isSecure ? <Lock className="w-3 h-3 text-gray-400" /> : <ExternalLink className="w-3 h-3 text-gray-400" />}
                  </div>
                  <p className="font-sans text-sm text-gray-500 mt-0.5">{ql.description}</p>
                  <p className="font-sans text-xs text-gray-400 mt-0.5">{ql.href}</p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button onClick={() => startEdit(ql)} className="p-1.5 text-gray-400 hover:text-primary-blue rounded hover:bg-gray-100">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(ql.id)} disabled={isPending} className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-gray-100 disabled:opacity-50">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {adding && (
          <div className="bg-white border-2 border-dashed border-primary-blue rounded-lg p-4">
            {formFields}
            <div className="flex gap-2 mt-3">
              <button onClick={handleCreate} disabled={isPending || !form.label} className="flex items-center gap-1 bg-primary-blue text-white text-sm px-3 py-1.5 rounded hover:bg-dark-blue disabled:opacity-50">
                <Plus className="w-3 h-3" /> Create
              </button>
              <button onClick={() => setAdding(false)} className="flex items-center gap-1 text-gray-600 text-sm px-3 py-1.5 rounded hover:bg-gray-100">
                <X className="w-3 h-3" /> Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
