'use client';

import { useState, useTransition } from 'react';
import { addObjective, deleteObjective } from '@/lib/actions/project-actions';
import { Plus, Trash2 } from 'lucide-react';

interface Objective {
  id: string;
  iconName: string | null;
  title: string;
  description: string;
  sortOrder: number;
}

export default function ProjectObjectivesEditor({
  projectId,
  objectives,
}: {
  projectId: string;
  objectives: Objective[];
}) {
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({ title: '', description: '', iconName: '' });

  function handleCreate() {
    startTransition(async () => {
      await addObjective(projectId, {
        title: form.title,
        description: form.description,
        iconName: form.iconName || undefined,
        sortOrder: objectives.length,
      });
      setForm({ title: '', description: '', iconName: '' });
    });
  }

  function handleDelete(id: string) {
    if (!confirm('Delete this objective?')) return;
    startTransition(async () => {
      await deleteObjective(id, projectId);
    });
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {objectives.map((obj) => (
          <div key={obj.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{obj.title}</p>
              <p className="text-xs text-gray-500">{obj.description}</p>
              {obj.iconName && <p className="text-[10px] text-gray-400 mt-1">Icon: {obj.iconName}</p>}
            </div>
            <button onClick={() => handleDelete(obj.id)} disabled={isPending}
              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-2">
        <p className="text-sm font-medium text-gray-700">Add Objective</p>
        <div className="grid grid-cols-2 gap-2">
          <input type="text" value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))}
            placeholder="Objective title"
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none" />
          <input type="text" value={form.iconName} onChange={(e) => setForm(p => ({ ...p, iconName: e.target.value }))}
            placeholder="Icon name (e.g., directions_walk)"
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none" />
        </div>
        <textarea value={form.description} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))}
          placeholder="Description" rows={2}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none" />
        <button onClick={handleCreate} disabled={isPending || !form.title || !form.description}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#005087] text-white rounded-lg text-sm disabled:opacity-50">
          <Plus size={14} /> Add Objective
        </button>
      </div>
    </div>
  );
}
