'use client';

import { useState, useTransition } from 'react';
import { createTeamMember, updateTeamMember, deleteTeamMember } from '@/lib/actions/team-member-actions';
import { Pencil, Trash2, Plus, Save, X } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  title: string;
  email: string;
  sortOrder: number;
}

export default function TeamMemberEditor({
  teamId,
  members,
}: {
  teamId: string;
  members: TeamMember[];
}) {
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState({
    name: '',
    title: '',
    email: '',
  });

  function startEdit(m: TeamMember) {
    setEditing(m.id);
    setForm({ name: m.name, title: m.title, email: m.email });
  }

  function handleSave(memberId: string) {
    startTransition(async () => {
      await updateTeamMember(memberId, form);
      setEditing(null);
    });
  }

  function handleCreate() {
    startTransition(async () => {
      await createTeamMember(teamId, form);
      setAdding(false);
      setForm({ name: '', title: '', email: '' });
    });
  }

  function handleDelete(memberId: string) {
    if (!confirm('Delete this team member?')) return;
    startTransition(async () => {
      await deleteTeamMember(memberId);
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-sans text-lg font-semibold text-gray-900">
          Team Members ({members.length})
        </h2>
        <button
          onClick={() => {
            setAdding(true);
            setForm({ name: '', title: '', email: '' });
          }}
          className="flex items-center gap-1 bg-primary-blue text-white text-sm font-sans px-3 py-1.5 rounded hover:bg-dark-blue transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      <div className="space-y-3">
        {members.map((m) => (
          <div key={m.id} className="bg-white border border-gray-200 rounded-lg p-4">
            {editing === m.id ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-sans text-xs text-gray-500 mb-1">Name</label>
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-xs text-gray-500 mb-1">Job Title</label>
                    <input
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-sans text-xs text-gray-500 mb-1">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave(m.id)}
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
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-sans font-semibold text-gray-900">{m.name}</span>
                  <p className="font-sans text-sm text-gray-500 mt-1">{m.title}</p>
                  <p className="font-sans text-xs text-gray-400 mt-1">{m.email}</p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button
                    onClick={() => startEdit(m)}
                    className="p-1.5 text-gray-400 hover:text-primary-blue rounded hover:bg-gray-100"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
                    disabled={isPending}
                    className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-gray-100 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add Form */}
        {adding && (
          <div className="bg-white border-2 border-dashed border-primary-blue rounded-lg p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-sans text-xs text-gray-500 mb-1">Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                />
              </div>
              <div>
                <label className="block font-sans text-xs text-gray-500 mb-1">Job Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                />
              </div>
            </div>
            <div>
              <label className="block font-sans text-xs text-gray-500 mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCreate}
                disabled={isPending || !form.name}
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
