'use client';

import { useState, useTransition } from 'react';
import { updateProject } from '@/lib/actions/project-actions';
import { Save } from 'lucide-react';
import type { ProjectStatus } from '@prisma/client';

interface Props {
  projectId: string;
  title: string;
  description: string | null;
  status: string;
  projectCode: string | null;
}

export default function ProjectHeaderEditor({ projectId, title, description, status, projectCode }: Props) {
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    title,
    description: description || '',
    status,
    projectCode: projectCode || '',
  });

  function handleSave() {
    startTransition(async () => {
      await updateProject(projectId, { ...form, status: form.status as ProjectStatus });
    });
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input type="text" value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea value={form.description} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))} rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Project Code</label>
          <input type="text" value={form.projectCode} onChange={(e) => setForm(p => ({ ...p, projectCode: e.target.value }))}
            placeholder="PRJ-2024-0892"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select value={form.status} onChange={(e) => setForm(p => ({ ...p, status: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
            <option value="PLANNING">Planning</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="ON_HOLD">On Hold</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>
      <button onClick={handleSave} disabled={isPending}
        className="flex items-center gap-1.5 px-4 py-2 bg-[#005087] text-white rounded-lg text-sm font-medium hover:bg-[#193A5A] transition-colors disabled:opacity-50">
        <Save size={14} /> {isPending ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
}
