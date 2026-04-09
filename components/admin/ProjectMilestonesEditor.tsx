'use client';

import { useState, useTransition } from 'react';
import { addMilestone, updateMilestone, deleteMilestone, updateProject } from '@/lib/actions/project-actions';
import { Plus, X, Save } from 'lucide-react';

interface Milestone {
  id: string;
  name: string;
  date: Date | null;
  status: string;
  sortOrder: number;
}

interface Props {
  projectId: string;
  milestones: Milestone[];
  startDate: Date | null;
  endDate: Date | null;
  progress: number;
}

export default function ProjectMilestonesEditor({ projectId, milestones, startDate, endDate, progress }: Props) {
  const [isPending, startTransition] = useTransition();
  const [dates, setDates] = useState({
    startDate: startDate ? new Date(startDate).toISOString().split('T')[0] : '',
    endDate: endDate ? new Date(endDate).toISOString().split('T')[0] : '',
    progress,
  });
  const [newMs, setNewMs] = useState({ name: '', date: '', status: 'upcoming' });

  function handleSaveDates() {
    startTransition(async () => {
      await updateProject(projectId, {
        startDate: dates.startDate || null,
        endDate: dates.endDate || null,
        progress: dates.progress,
      });
    });
  }

  function handleAddMilestone() {
    startTransition(async () => {
      await addMilestone(projectId, {
        name: newMs.name,
        date: newMs.date || null,
        status: newMs.status,
        sortOrder: milestones.length,
      });
      setNewMs({ name: '', date: '', status: 'upcoming' });
    });
  }

  function handleDeleteMilestone(id: string) {
    startTransition(async () => {
      await deleteMilestone(id, projectId);
    });
  }

  function handleUpdateStatus(ms: Milestone, newStatus: string) {
    startTransition(async () => {
      await updateMilestone(ms.id, projectId, {
        name: ms.name,
        date: ms.date ? new Date(ms.date).toISOString() : null,
        status: newStatus,
        sortOrder: ms.sortOrder,
      });
    });
  }

  return (
    <div className="space-y-6">
      {/* Timeline dates + progress */}
      <div className="space-y-4">
        <p className="text-sm font-medium text-gray-700">Timeline</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Start Date</label>
            <input type="date" value={dates.startDate} onChange={(e) => setDates(p => ({ ...p, startDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">End Date</label>
            <input type="date" value={dates.endDate} onChange={(e) => setDates(p => ({ ...p, endDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Progress ({dates.progress}%)</label>
          <input type="range" min="0" max="100" value={dates.progress}
            onChange={(e) => setDates(p => ({ ...p, progress: parseInt(e.target.value) }))}
            className="w-full" />
        </div>
        <button onClick={handleSaveDates} disabled={isPending}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#005087] text-white rounded-lg text-sm font-medium disabled:opacity-50">
          <Save size={14} /> Save Timeline
        </button>
      </div>

      <hr />

      {/* Milestones */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-700">Milestones</p>
        {milestones.map((ms) => (
          <div key={ms.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <select value={ms.status} onChange={(e) => handleUpdateStatus(ms, e.target.value)}
              className="text-xs px-2 py-1 border border-gray-300 rounded">
              <option value="completed">Completed</option>
              <option value="current">Current</option>
              <option value="upcoming">Upcoming</option>
            </select>
            <span className="flex-1 text-sm font-medium">{ms.name}</span>
            {ms.date && <span className="text-xs text-gray-400">{new Date(ms.date).toLocaleDateString()}</span>}
            <button onClick={() => handleDeleteMilestone(ms.id)} disabled={isPending}
              className="p-1 text-gray-400 hover:text-red-600">
              <X size={14} />
            </button>
          </div>
        ))}
        <div className="flex gap-2">
          <input type="text" value={newMs.name} onChange={(e) => setNewMs(p => ({ ...p, name: e.target.value }))}
            placeholder="Milestone name" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none" />
          <input type="date" value={newMs.date} onChange={(e) => setNewMs(p => ({ ...p, date: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none" />
          <select value={newMs.status} onChange={(e) => setNewMs(p => ({ ...p, status: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none">
            <option value="upcoming">Upcoming</option>
            <option value="current">Current</option>
            <option value="completed">Completed</option>
          </select>
          <button onClick={handleAddMilestone} disabled={isPending || !newMs.name}
            className="flex items-center gap-1 px-3 py-2 bg-[#005087] text-white rounded-lg text-sm disabled:opacity-50">
            <Plus size={14} /> Add
          </button>
        </div>
      </div>
    </div>
  );
}
