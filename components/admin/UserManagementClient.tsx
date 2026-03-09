'use client';

import { useState, useTransition } from 'react';
import { createUser, updateUser, deleteUser } from '@/lib/actions/user-actions';
import { Pencil, Trash2, Plus, Save, X, Shield, ShieldCheck, Eye } from 'lucide-react';

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
  parentId: string | null;
}

const ROLE_INFO: Record<Role, { label: string; description: string; color: string; icon: typeof Shield }> = {
  SUPER_ADMIN: {
    label: 'Super Admin',
    description: 'Full access to all teams, user management, and audit logs',
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    icon: ShieldCheck,
  },
  TEAM_ADMIN: {
    label: 'Team Editor',
    description: 'Can edit content on assigned teams only',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: Shield,
  },
  VIEWER: {
    label: 'Viewer',
    description: 'Read-only access to the admin dashboard',
    color: 'bg-gray-100 text-gray-600 border-gray-200',
    icon: Eye,
  },
};

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

  // Build team hierarchy
  const topLevel = teams.filter((t) => !t.parentId);
  const childrenOf = (parentId: string) =>
    teams.filter((t) => t.parentId === parentId);

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
    setForm((prev) => {
      const newTeamIds = prev.teamIds.includes(teamId)
        ? prev.teamIds.filter((id) => id !== teamId)
        : [...prev.teamIds, teamId];

      // Auto-upgrade role to TEAM_ADMIN if teams are selected and role is VIEWER
      const newRole = newTeamIds.length > 0 && prev.role === 'VIEWER' ? 'TEAM_ADMIN' : prev.role;

      return { ...prev, teamIds: newTeamIds, role: newRole };
    });
  }

  function toggleSection(parentId: string) {
    const children = childrenOf(parentId);
    const allChildIds = [parentId, ...children.map((c) => c.id)];
    const allSelected = allChildIds.every((id) => form.teamIds.includes(id));

    setForm((prev) => {
      let newTeamIds: string[];
      if (allSelected) {
        newTeamIds = prev.teamIds.filter((id) => !allChildIds.includes(id));
      } else {
        newTeamIds = [...new Set([...prev.teamIds, ...allChildIds])];
      }
      const newRole = newTeamIds.length > 0 && prev.role === 'VIEWER' ? 'TEAM_ADMIN' : prev.role;
      return { ...prev, teamIds: newTeamIds, role: newRole };
    });
  }

  function renderForm(isNew: boolean) {
    return (
      <div className="space-y-4">
        {/* Name & Email */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-sans text-xs font-medium text-gray-700 mb-1">Email</label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              disabled={!isNew}
              placeholder="user@edmonton.ca"
              className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans disabled:bg-gray-100 focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none"
            />
          </div>
          <div>
            <label className="block font-sans text-xs font-medium text-gray-700 mb-1">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Full name"
              className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans focus:border-primary-blue focus:ring-1 focus:ring-primary-blue outline-none"
            />
          </div>
        </div>

        {/* Role Selection - Card Style */}
        <div>
          <label className="block font-sans text-xs font-medium text-gray-700 mb-2">Role</label>
          <div className="grid grid-cols-3 gap-2">
            {(Object.entries(ROLE_INFO) as [Role, typeof ROLE_INFO[Role]][]).map(([role, info]) => {
              const Icon = info.icon;
              const isSelected = form.role === role;
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => {
                    const newForm = { ...form, role: role };
                    // Clear teams if switching to Super Admin
                    if (role === 'SUPER_ADMIN') newForm.teamIds = [];
                    setForm(newForm);
                  }}
                  className={`text-left p-3 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-primary-blue bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-primary-blue' : 'text-gray-400'}`} />
                    <span className={`text-xs font-sans font-semibold ${isSelected ? 'text-primary-blue' : 'text-gray-700'}`}>
                      {info.label}
                    </span>
                  </div>
                  <p className="text-[10px] font-sans text-gray-500 leading-tight">
                    {info.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Team Permissions */}
        {form.role !== 'SUPER_ADMIN' ? (
          <div>
            <label className="block font-sans text-xs font-medium text-gray-700 mb-1">
              Team Access
            </label>
            <p className="font-sans text-[11px] text-gray-400 mb-2">
              Select which teams this user can {form.role === 'TEAM_ADMIN' ? 'edit' : 'view'}. Click a section header to select all teams within it.
            </p>
            <div className="border border-gray-200 rounded-lg divide-y divide-gray-100 max-h-64 overflow-y-auto">
              {topLevel.map((section) => {
                const children = childrenOf(section.id);
                const allIds = [section.id, ...children.map((c) => c.id)];
                const selectedCount = allIds.filter((id) => form.teamIds.includes(id)).length;
                const allSelected = selectedCount === allIds.length;
                const someSelected = selectedCount > 0 && !allSelected;

                return (
                  <div key={section.id}>
                    {/* Section header */}
                    <button
                      type="button"
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 transition-colors"
                    >
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                        allSelected
                          ? 'bg-primary-blue border-primary-blue'
                          : someSelected
                          ? 'bg-white border-primary-blue'
                          : 'bg-white border-gray-300'
                      }`}>
                        {allSelected && (
                          <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                        {someSelected && !allSelected && (
                          <div className="w-2 h-0.5 bg-primary-blue rounded" />
                        )}
                      </div>
                      <span className="font-sans text-sm font-semibold text-gray-800 flex-1 text-left">
                        {section.teamName}
                      </span>
                      {selectedCount > 0 && (
                        <span className="text-[10px] font-sans text-primary-blue bg-blue-50 px-1.5 py-0.5 rounded">
                          {selectedCount}/{allIds.length}
                        </span>
                      )}
                    </button>

                    {/* Child teams */}
                    {children.length > 0 && (
                      <div className="pl-6 pb-1">
                        {children.map((child) => (
                          <button
                            key={child.id}
                            type="button"
                            onClick={() => toggleTeam(child.id)}
                            className="w-full flex items-center gap-2 px-3 py-1 hover:bg-gray-50 transition-colors"
                          >
                            <div className={`w-3.5 h-3.5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                              form.teamIds.includes(child.id)
                                ? 'bg-primary-blue border-primary-blue'
                                : 'bg-white border-gray-300'
                            }`}>
                              {form.teamIds.includes(child.id) && (
                                <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
                                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              )}
                            </div>
                            <span className="font-sans text-xs text-gray-600 text-left">
                              {child.teamName}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {form.role === 'TEAM_ADMIN' && form.teamIds.length === 0 && (
              <p className="font-sans text-[11px] text-amber-600 mt-1">
                No teams selected. This user won&apos;t be able to edit any content.
              </p>
            )}
          </div>
        ) : (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
            <p className="font-sans text-xs text-purple-800">
              Super Admins have full access to all teams and settings. No team selection needed.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={isNew ? handleCreate : () => handleSave(editing!)}
            disabled={isPending || !form.name || (isNew && !form.email)}
            className="flex items-center gap-1 bg-primary-blue text-white text-sm font-sans px-4 py-1.5 rounded hover:bg-dark-blue disabled:opacity-50 transition-colors"
          >
            {isNew ? <><Plus className="w-3 h-3" /> Create User</> : <><Save className="w-3 h-3" /> Save Changes</>}
          </button>
          <button
            onClick={() => { setEditing(null); setAdding(false); }}
            className="flex items-center gap-1 text-gray-600 text-sm font-sans px-3 py-1.5 rounded hover:bg-gray-100 transition-colors"
          >
            <X className="w-3 h-3" /> Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl">
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
          <div className="bg-white border-2 border-dashed border-primary-blue rounded-lg p-5">
            {renderForm(true)}
          </div>
        )}

        {users.map((u) => (
          <div key={u.id} className="bg-white border border-gray-200 rounded-lg p-4">
            {editing === u.id ? (
              renderForm(false)
            ) : (
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-sans font-semibold text-gray-900">
                      {u.name}
                    </span>
                    <span
                      className={`text-[10px] font-sans font-medium px-1.5 py-0.5 rounded border ${
                        ROLE_INFO[u.role].color
                      }`}
                    >
                      {ROLE_INFO[u.role].label}
                    </span>
                  </div>
                  <p className="font-sans text-sm text-gray-500">{u.email}</p>
                  {u.teamPermissions.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {u.teamPermissions.map((p) => (
                        <span
                          key={p.team.id}
                          className="text-[10px] font-sans bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded"
                        >
                          {p.team.teamName}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-1 flex-shrink-0 ml-4">
                  <button
                    onClick={() => startEdit(u)}
                    className="p-1.5 text-gray-400 hover:text-primary-blue rounded hover:bg-gray-100 transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(u.id)}
                    disabled={isPending}
                    className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-gray-100 disabled:opacity-50 transition-colors"
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
