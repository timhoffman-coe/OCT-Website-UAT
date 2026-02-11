'use client';

import { useState, useTransition } from 'react';
import { createUser, updateUser, deleteUser } from '@/lib/actions/user-actions';
import { Pencil, Trash2, Plus, Save, X } from 'lucide-react';

type Role = 'SUPER_ADMIN' | 'TEAM_ADMIN' | 'VIEWER';

interface UserWithPermissions {
  id: string;
  email: string;
  name: string;
  role: Role;
  teamPermissions: Array<{
    team: { id: string; teamName: string };
  }>;
}

interface Team {
  id: string;
  teamName: string;
}

export default function UserManagementClient({
  users,
  teams,
}: {
  users: UserWithPermissions[];
  teams: Team[];
}) {
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    email: '',
    name: '',
    role: 'VIEWER' as Role,
    teamIds: [] as string[],
  });

  function startEdit(u: UserWithPermissions) {
    setEditing(u.id);
    setForm({
      email: u.email,
      name: u.name,
      role: u.role,
      teamIds: u.teamPermissions.map((p) => p.team.id),
    });
  }

  function handleSave(userId: string) {
    startTransition(async () => {
      await updateUser(userId, {
        name: form.name,
        role: form.role,
        teamIds: form.teamIds,
      });
      setEditing(null);
    });
  }

  function handleCreate() {
    startTransition(async () => {
      await createUser({
        email: form.email,
        name: form.name,
        role: form.role,
        teamIds: form.teamIds,
      });
      setAdding(false);
      setForm({ email: '', name: '', role: 'VIEWER', teamIds: [] });
    });
  }

  function handleDelete(userId: string) {
    if (!confirm('Delete this user?')) return;
    startTransition(async () => {
      await deleteUser(userId);
    });
  }

  function toggleTeam(teamId: string) {
    setForm((prev) => ({
      ...prev,
      teamIds: prev.teamIds.includes(teamId)
        ? prev.teamIds.filter((id) => id !== teamId)
        : [...prev.teamIds, teamId],
    }));
  }

  function renderForm(isNew: boolean) {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-sans text-xs text-gray-500 mb-1">Email</label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              disabled={!isNew}
              className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block font-sans text-xs text-gray-500 mb-1">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
            />
          </div>
        </div>
        <div>
          <label className="block font-sans text-xs text-gray-500 mb-1">Role</label>
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value as Role })}
            className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
          >
            <option value="SUPER_ADMIN">Super Admin</option>
            <option value="TEAM_ADMIN">Team Admin</option>
            <option value="VIEWER">Viewer</option>
          </select>
        </div>
        {form.role === 'TEAM_ADMIN' && (
          <div>
            <label className="block font-sans text-xs text-gray-500 mb-1">
              Team Access
            </label>
            <div className="flex flex-wrap gap-2">
              {teams.map((team) => (
                <button
                  key={team.id}
                  type="button"
                  onClick={() => toggleTeam(team.id)}
                  className={`text-xs font-sans px-2 py-1 rounded border transition-colors ${
                    form.teamIds.includes(team.id)
                      ? 'bg-primary-blue text-white border-primary-blue'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-primary-blue'
                  }`}
                >
                  {team.teamName}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="flex gap-2">
          <button
            onClick={isNew ? handleCreate : () => handleSave(editing!)}
            disabled={isPending || !form.name || (isNew && !form.email)}
            className="flex items-center gap-1 bg-primary-blue text-white text-sm px-3 py-1.5 rounded hover:bg-dark-blue disabled:opacity-50"
          >
            {isNew ? <><Plus className="w-3 h-3" /> Create</> : <><Save className="w-3 h-3" /> Save</>}
          </button>
          <button
            onClick={() => { setEditing(null); setAdding(false); }}
            className="flex items-center gap-1 text-gray-600 text-sm px-3 py-1.5 rounded hover:bg-gray-100"
          >
            <X className="w-3 h-3" /> Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-sans text-3xl font-bold text-primary-blue">
            User Management
          </h1>
          <p className="font-sans text-sm text-gray-500 mt-1">
            Manage CMS users and their team access permissions
          </p>
        </div>
        <button
          onClick={() => {
            setAdding(true);
            setForm({ email: '', name: '', role: 'VIEWER', teamIds: [] });
          }}
          className="flex items-center gap-1 bg-primary-blue text-white text-sm font-sans px-3 py-1.5 rounded hover:bg-dark-blue transition-colors"
        >
          <Plus className="w-4 h-4" /> Add User
        </button>
      </div>

      <div className="space-y-3">
        {adding && (
          <div className="bg-white border-2 border-dashed border-primary-blue rounded-lg p-4">
            {renderForm(true)}
          </div>
        )}

        {users.map((u) => (
          <div key={u.id} className="bg-white border border-gray-200 rounded-lg p-4">
            {editing === u.id ? (
              renderForm(false)
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-sans font-semibold text-gray-900">
                      {u.name}
                    </span>
                    <span
                      className={`text-xs font-sans px-1.5 py-0.5 rounded ${
                        u.role === 'SUPER_ADMIN'
                          ? 'bg-purple-100 text-purple-800'
                          : u.role === 'TEAM_ADMIN'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {u.role.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="font-sans text-sm text-gray-500">{u.email}</p>
                  {u.teamPermissions.length > 0 && (
                    <div className="flex gap-1 mt-1">
                      {u.teamPermissions.map((p) => (
                        <span
                          key={p.team.id}
                          className="text-xs font-sans bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded"
                        >
                          {p.team.teamName}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button
                    onClick={() => startEdit(u)}
                    className="p-1.5 text-gray-400 hover:text-primary-blue rounded hover:bg-gray-100"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(u.id)}
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
      </div>
    </div>
  );
}
