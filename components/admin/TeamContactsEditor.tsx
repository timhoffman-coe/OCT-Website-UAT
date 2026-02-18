'use client';

import { useState, useTransition } from 'react';
import { createTeamContact, updateTeamContact, deleteTeamContact } from '@/lib/actions/subteam-actions';
import { Pencil, Trash2, Plus, Save, X } from 'lucide-react';

interface TeamContact {
  id: string;
  name: string;
  role: string;
  email: string;
  sortOrder: number;
}

export default function TeamContactsEditor({
  teamId,
  contacts,
}: {
  teamId: string;
  contacts: TeamContact[];
}) {
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState({ name: '', role: '', email: '' });

  function startEdit(c: TeamContact) {
    setEditing(c.id);
    setForm({ name: c.name, role: c.role, email: c.email });
  }

  function handleSave(contactId: string) {
    startTransition(async () => {
      await updateTeamContact(contactId, form);
      setEditing(null);
    });
  }

  function handleCreate() {
    startTransition(async () => {
      await createTeamContact(teamId, form);
      setAdding(false);
      setForm({ name: '', role: '', email: '' });
    });
  }

  function handleDelete(contactId: string) {
    if (!confirm('Delete this contact?')) return;
    startTransition(async () => {
      await deleteTeamContact(contactId);
    });
  }

  const formFields = (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div>
        <label className="block font-sans text-xs text-gray-500 mb-1">Name</label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
        />
      </div>
      <div>
        <label className="block font-sans text-xs text-gray-500 mb-1">Role</label>
        <input
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
        />
      </div>
      <div>
        <label className="block font-sans text-xs text-gray-500 mb-1">Email</label>
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
        />
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-sans text-lg font-semibold text-gray-900">
          Contacts ({contacts.length})
        </h2>
        <button
          onClick={() => { setAdding(true); setForm({ name: '', role: '', email: '' }); }}
          className="flex items-center gap-1 bg-primary-blue text-white text-sm font-sans px-3 py-1.5 rounded hover:bg-dark-blue transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Contact
        </button>
      </div>

      <div className="space-y-3">
        {contacts.map((c) => (
          <div key={c.id} className="bg-white border border-gray-200 rounded-lg p-4">
            {editing === c.id ? (
              <div>
                {formFields}
                <div className="flex gap-2 mt-3">
                  <button onClick={() => handleSave(c.id)} disabled={isPending} className="flex items-center gap-1 bg-primary-blue text-white text-sm px-3 py-1.5 rounded hover:bg-dark-blue disabled:opacity-50">
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
                  <span className="font-sans font-semibold text-gray-900">{c.name}</span>
                  <span className="font-sans text-sm text-gray-500 ml-2">{c.role}</span>
                  <p className="font-sans text-xs text-gray-400 mt-0.5">{c.email}</p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button onClick={() => startEdit(c)} className="p-1.5 text-gray-400 hover:text-primary-blue rounded hover:bg-gray-100">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(c.id)} disabled={isPending} className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-gray-100 disabled:opacity-50">
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
              <button onClick={handleCreate} disabled={isPending || !form.name} className="flex items-center gap-1 bg-primary-blue text-white text-sm px-3 py-1.5 rounded hover:bg-dark-blue disabled:opacity-50">
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
