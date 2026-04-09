'use client';

import { useState, useTransition } from 'react';
import { addStatusUpdate, deleteStatusUpdate } from '@/lib/actions/project-actions';
import { Plus, X } from 'lucide-react';

interface StatusUpdate {
  id: string;
  content: string;
  createdAt: Date;
}

export default function ProjectStatusUpdatesEditor({
  projectId,
  updates,
}: {
  projectId: string;
  updates: StatusUpdate[];
}) {
  const [isPending, startTransition] = useTransition();
  const [newContent, setNewContent] = useState('');

  function handleCreate() {
    startTransition(async () => {
      await addStatusUpdate(projectId, newContent);
      setNewContent('');
    });
  }

  function handleDelete(id: string) {
    if (!confirm('Delete this status update?')) return;
    startTransition(async () => {
      await deleteStatusUpdate(id, projectId);
    });
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <textarea value={newContent} onChange={(e) => setNewContent(e.target.value)}
          placeholder="Add a status update..." rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none" />
        <button onClick={handleCreate} disabled={isPending || !newContent.trim()}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#005087] text-white rounded-lg text-sm disabled:opacity-50">
          <Plus size={14} /> Add Update
        </button>
      </div>

      <div className="space-y-2">
        {updates.map((u) => (
          <div key={u.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <p className="text-xs text-gray-400 mb-1">{new Date(u.createdAt).toLocaleString()}</p>
              <p className="text-sm text-gray-700">{u.content}</p>
            </div>
            <button onClick={() => handleDelete(u.id)} disabled={isPending}
              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50">
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
