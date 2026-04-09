'use client';

import { useState, useTransition } from 'react';
import { updateProject } from '@/lib/actions/project-actions';
import { Save } from 'lucide-react';

interface Props {
  projectId: string;
  totalBudget: string | null;
  fundingSources: string | null;
  expenditureAuthority: string | null;
}

export default function ProjectFinancialEditor({ projectId, totalBudget, fundingSources, expenditureAuthority }: Props) {
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    totalBudget: totalBudget || '',
    fundingSources: fundingSources || '',
    expenditureAuthority: expenditureAuthority || '',
  });

  function handleSave() {
    startTransition(async () => {
      await updateProject(projectId, form);
    });
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Total Budget</label>
        <input type="text" value={form.totalBudget} onChange={(e) => setForm(p => ({ ...p, totalBudget: e.target.value }))}
          placeholder="$18.4M"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Funding Sources</label>
        <input type="text" value={form.fundingSources} onChange={(e) => setForm(p => ({ ...p, fundingSources: e.target.value }))}
          placeholder="Capital Budget 2023-26, Provincial Urban Grant"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Expenditure Authority</label>
        <input type="text" value={form.expenditureAuthority} onChange={(e) => setForm(p => ({ ...p, expenditureAuthority: e.target.value }))}
          placeholder="Branch Manager, Infrastructure Delivery"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
      </div>
      <button onClick={handleSave} disabled={isPending}
        className="flex items-center gap-1.5 px-4 py-2 bg-[#005087] text-white rounded-lg text-sm font-medium hover:bg-[#193A5A] transition-colors disabled:opacity-50">
        <Save size={14} /> {isPending ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
}
