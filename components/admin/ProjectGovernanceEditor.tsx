'use client';

import { useState, useTransition } from 'react';
import { updateProject } from '@/lib/actions/project-actions';
import { Save } from 'lucide-react';

interface Props {
  projectId: string;
  department: string | null;
  branch: string | null;
  projectSponsor: string | null;
  projectManager: string | null;
  octProgramManager: string | null;
  octltRepresentative: string | null;
  programManagerBusiness: string | null;
}

const FIELDS = [
  { key: 'department', label: 'Department' },
  { key: 'branch', label: 'Branch' },
  { key: 'projectSponsor', label: 'Project Sponsor' },
  { key: 'projectManager', label: 'Project Manager' },
  { key: 'octProgramManager', label: 'OCT Program Manager (MRP)' },
  { key: 'octltRepresentative', label: 'OCTLT Representative' },
  { key: 'programManagerBusiness', label: 'Program Manager (Business)' },
] as const;

export default function ProjectGovernanceEditor(props: Props) {
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState(
    Object.fromEntries(FIELDS.map(f => [f.key, (props as unknown as Record<string, string | null>)[f.key] || '']))
  );

  function handleSave() {
    startTransition(async () => {
      await updateProject(props.projectId, form);
    });
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {FIELDS.map(({ key, label }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input type="text" value={form[key] || ''} onChange={(e) => setForm(p => ({ ...p, [key]: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
          </div>
        ))}
      </div>
      <button onClick={handleSave} disabled={isPending}
        className="flex items-center gap-1.5 px-4 py-2 bg-[#005087] text-white rounded-lg text-sm font-medium hover:bg-[#193A5A] transition-colors disabled:opacity-50">
        <Save size={14} /> {isPending ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
}
