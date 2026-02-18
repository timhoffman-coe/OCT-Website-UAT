'use client';

import { useState, useTransition } from 'react';
import { createTeamService, updateTeamService, deleteTeamService } from '@/lib/actions/subteam-actions';
import { Pencil, Trash2, Plus, Save, X } from 'lucide-react';

interface TeamService {
  id: string;
  title: string;
  items: string[];
  sortOrder: number;
}

export default function TeamServicesEditor({
  teamId,
  services,
}: {
  teamId: string;
  services: TeamService[];
}) {
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState({ title: '', items: '' });

  function startEdit(s: TeamService) {
    setEditing(s.id);
    setForm({ title: s.title, items: s.items.join('\n') });
  }

  function handleSave(serviceId: string) {
    startTransition(async () => {
      await updateTeamService(serviceId, {
        title: form.title,
        items: form.items.split('\n').map((s) => s.trim()).filter(Boolean),
      });
      setEditing(null);
    });
  }

  function handleCreate() {
    startTransition(async () => {
      await createTeamService(teamId, {
        title: form.title,
        items: form.items.split('\n').map((s) => s.trim()).filter(Boolean),
      });
      setAdding(false);
      setForm({ title: '', items: '' });
    });
  }

  function handleDelete(serviceId: string) {
    if (!confirm('Delete this service?')) return;
    startTransition(async () => {
      await deleteTeamService(serviceId);
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
          placeholder="e.g. Connectivity (LAN/WAN)"
        />
      </div>
      <div>
        <label className="block font-sans text-xs text-gray-500 mb-1">Items (one per line)</label>
        <textarea
          value={form.items}
          onChange={(e) => setForm({ ...form, items: e.target.value })}
          rows={4}
          className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans font-mono"
          placeholder="Wired office connectivity&#10;Fibre optic backbone&#10;Site-to-site switching"
        />
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-sans text-lg font-semibold text-gray-900">
          Services ({services.length})
        </h2>
        <button
          onClick={() => { setAdding(true); setForm({ title: '', items: '' }); }}
          className="flex items-center gap-1 bg-primary-blue text-white text-sm font-sans px-3 py-1.5 rounded hover:bg-dark-blue transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      <div className="space-y-3">
        {services.map((s) => (
          <div key={s.id} className="bg-white border border-gray-200 rounded-lg p-4">
            {editing === s.id ? (
              <div>
                {formFields}
                <div className="flex gap-2 mt-3">
                  <button onClick={() => handleSave(s.id)} disabled={isPending} className="flex items-center gap-1 bg-primary-blue text-white text-sm px-3 py-1.5 rounded hover:bg-dark-blue disabled:opacity-50">
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
                  <span className="font-sans font-semibold text-gray-900">{s.title}</span>
                  <ul className="font-sans text-sm text-gray-500 mt-1 list-disc list-inside">
                    {s.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button onClick={() => startEdit(s)} className="p-1.5 text-gray-400 hover:text-primary-blue rounded hover:bg-gray-100">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(s.id)} disabled={isPending} className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-gray-100 disabled:opacity-50">
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
