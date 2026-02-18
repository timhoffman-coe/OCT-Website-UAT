'use client';

import { useState, useTransition } from 'react';
import { createTeamInitiative, updateTeamInitiative, deleteTeamInitiative } from '@/lib/actions/subteam-actions';
import { Pencil, Trash2, Plus, Save, X } from 'lucide-react';

interface TeamInitiative {
  id: string;
  title: string;
  description: string;
  href: string;
  sortOrder: number;
}

export default function TeamInitiativesEditor({
  teamId,
  initiatives,
}: {
  teamId: string;
  initiatives: TeamInitiative[];
}) {
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState({ title: '', description: '', href: '#' });

  function startEdit(i: TeamInitiative) {
    setEditing(i.id);
    setForm({ title: i.title, description: i.description, href: i.href });
  }

  function handleSave(initiativeId: string) {
    startTransition(async () => {
      await updateTeamInitiative(initiativeId, form);
      setEditing(null);
    });
  }

  function handleCreate() {
    startTransition(async () => {
      await createTeamInitiative(teamId, form);
      setAdding(false);
      setForm({ title: '', description: '', href: '#' });
    });
  }

  function handleDelete(initiativeId: string) {
    if (!confirm('Delete this initiative?')) return;
    startTransition(async () => {
      await deleteTeamInitiative(initiativeId);
    });
  }

  const formFields = (
    <div className="space-y-3">
      <div>
        <label className="block font-sans text-xs text-gray-500 mb-1">Title</label>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
        />
      </div>
      <div>
        <label className="block font-sans text-xs text-gray-500 mb-1">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={2}
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
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-sans text-lg font-semibold text-gray-900">
          Initiatives ({initiatives.length})
        </h2>
        <button
          onClick={() => { setAdding(true); setForm({ title: '', description: '', href: '#' }); }}
          className="flex items-center gap-1 bg-primary-blue text-white text-sm font-sans px-3 py-1.5 rounded hover:bg-dark-blue transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Initiative
        </button>
      </div>

      <div className="space-y-3">
        {initiatives.map((i) => (
          <div key={i.id} className="bg-white border border-gray-200 rounded-lg p-4">
            {editing === i.id ? (
              <div>
                {formFields}
                <div className="flex gap-2 mt-3">
                  <button onClick={() => handleSave(i.id)} disabled={isPending} className="flex items-center gap-1 bg-primary-blue text-white text-sm px-3 py-1.5 rounded hover:bg-dark-blue disabled:opacity-50">
                    <Save className="w-3 h-3" /> Save
                  </button>
                  <button onClick={() => setEditing(null)} className="flex items-center gap-1 text-gray-600 text-sm px-3 py-1.5 rounded hover:bg-gray-100">
                    <X className="w-3 h-3" /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-sans font-semibold text-gray-900">{i.title}</span>
                  <p className="font-sans text-sm text-gray-500 mt-1">{i.description}</p>
                  <p className="font-sans text-xs text-gray-400 mt-1">{i.href}</p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button onClick={() => startEdit(i)} className="p-1.5 text-gray-400 hover:text-primary-blue rounded hover:bg-gray-100">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(i.id)} disabled={isPending} className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-gray-100 disabled:opacity-50">
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
              <button onClick={handleCreate} disabled={isPending || !form.title} className="flex items-center gap-1 bg-primary-blue text-white text-sm px-3 py-1.5 rounded hover:bg-dark-blue disabled:opacity-50">
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
