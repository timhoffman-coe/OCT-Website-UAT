'use client';

import { useState, useTransition } from 'react';
import { addProjectEditor, removeProjectEditor } from '@/lib/actions/project-permission-actions';
import { Plus, Trash2, FolderKanban, ShieldCheck } from 'lucide-react';

interface Editor {
  id: string;
  createdAt: Date;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export default function ProjectEditorsClient({
  editors: initialEditors,
  users,
}: {
  editors: Editor[];
  users: User[];
}) {
  const [editors, setEditors] = useState(initialEditors);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  const editorUserIds = new Set(editors.map(e => e.user.id));
  const availableUsers = users.filter(
    u => !editorUserIds.has(u.id) && u.role !== 'SUPER_ADMIN'
  );

  const handleAdd = () => {
    const user = users.find(u => u.id === selectedUserId);
    if (!user) return;
    setError('');

    startTransition(async () => {
      try {
        const permission = await addProjectEditor(user.email);
        setEditors(prev => [
          {
            id: permission.id,
            createdAt: new Date(),
            user: { id: user.id, email: user.email, name: user.name, role: user.role },
          },
          ...prev,
        ]);
        setSelectedUserId('');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to add editor');
      }
    });
  };

  const handleRemove = (permissionId: string) => {
    if (!confirm('Remove this user\'s project edit access?')) return;
    setError('');

    startTransition(async () => {
      try {
        await removeProjectEditor(permissionId);
        setEditors(prev => prev.filter(e => e.id !== permissionId));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to remove editor');
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h2 className="font-sans text-sm font-semibold text-gray-700 mb-3">Add Editor</h2>
        <div className="flex gap-3">
          <select
            value={selectedUserId}
            onChange={e => setSelectedUserId(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-sans focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="">Select a user...</option>
            {availableUsers.map(u => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.email})
              </option>
            ))}
          </select>
          <button
            onClick={handleAdd}
            disabled={!selectedUserId || isPending}
            className="flex items-center gap-2 px-4 py-2 bg-[#005087] text-white rounded-lg text-sm font-sans font-medium hover:bg-[#193A5A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={16} />
            Add
          </button>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600 font-sans">{error}</p>
        )}
      </div>

      <div className="flex items-start gap-3 bg-purple-50 border border-purple-200 rounded-lg p-4">
        <ShieldCheck className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-purple-800 font-sans">
          Super Admins automatically have project edit access and do not need to be added here.
          Individual project managers can also be assigned per-project from the project edit page.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h2 className="font-sans text-sm font-semibold text-gray-700 flex items-center gap-2">
            <FolderKanban size={16} className="text-[#005087]" />
            Project Editors ({editors.length})
          </h2>
        </div>

        {editors.length === 0 ? (
          <div className="p-8 text-center text-gray-500 font-sans text-sm">
            No editors added yet. Only Super Admins can currently manage projects.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {editors.map(editor => (
              <div
                key={editor.id}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="font-sans text-sm font-medium text-gray-900">
                    {editor.user.name}
                  </p>
                  <p className="font-sans text-xs text-gray-500">
                    {editor.user.email}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 font-sans">
                    {new Date(editor.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => handleRemove(editor.id)}
                    disabled={isPending}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                    title="Remove editor"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
