'use client';

import { resolveIcon } from '@/lib/icon-resolver';
import { CheckCircle2 } from 'lucide-react';

interface Objective {
  id: string;
  iconName?: string | null;
  title: string;
  description: string;
}

interface ProjectObjectivesProps {
  objectives: Objective[];
}

export default function ProjectObjectives({ objectives }: ProjectObjectivesProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <h2 className="text-[#173858] font-black uppercase text-xs tracking-widest mb-6 flex items-center gap-2">
        <span className="w-1 h-4 bg-[#003962] rounded-full"></span>
        Project Objectives
      </h2>
      {objectives.length > 0 ? (
        <div className="space-y-4">
          {objectives.map((obj) => {
            const Icon = obj.iconName ? resolveIcon(obj.iconName) : CheckCircle2;
            return (
              <div
                key={obj.id}
                className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 transition-colors hover:bg-gray-100"
              >
                <div className="bg-blue-50 w-10 h-10 rounded flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#003962]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#173858]">{obj.title}</h3>
                  <p className="text-sm text-gray-600">{obj.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-gray-300 italic text-center py-4">No objectives added yet</p>
      )}
    </div>
  );
}
