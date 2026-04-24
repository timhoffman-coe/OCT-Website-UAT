'use client';

import type { ProjectStatus } from '@prisma/client';

const STATUS_LABELS: Record<ProjectStatus, string> = {
  PLANNING: 'Planning',
  IN_PROGRESS: 'In Progress',
  ON_HOLD: 'On Hold',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

const STATUS_COLORS: Record<ProjectStatus, string> = {
  PLANNING: 'bg-blue-100 text-blue-800',
  IN_PROGRESS: 'bg-emerald-100 text-emerald-800',
  ON_HOLD: 'bg-amber-100 text-amber-800',
  COMPLETED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

interface ProjectHeaderProps {
  title: string;
  description?: string | null;
  status: ProjectStatus;
  projectCode?: string | null;
  canEdit?: boolean;
  projectId?: string;
}

export default function ProjectHeader({ title, description, status, projectCode, canEdit, projectId }: ProjectHeaderProps) {
  return (
    <section className="bg-gradient-to-br from-[#003962] to-[#005087] px-8 py-12 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-[10px] px-2 py-0.5 rounded-sm font-bold tracking-widest uppercase ${STATUS_COLORS[status]}`}>
                {STATUS_LABELS[status]}
              </span>
              {projectCode && (
                <span className="text-blue-200 text-sm font-medium opacity-80">{projectCode}</span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight mb-2 font-[family-name:var(--font-public-sans)]">
              {title}
            </h1>
            {description && (
              <p className="text-blue-100/90 max-w-2xl text-lg leading-relaxed">
                {description}
              </p>
            )}
          </div>
          {canEdit && projectId && (
            <div className="flex gap-3">
              <a
                href={`/admin/projects/${projectId}`}
                className="bg-white text-[#003962] px-6 py-3 rounded-md font-bold shadow-lg transition-all hover:bg-[#006493] hover:text-white flex items-center gap-2"
              >
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
                Edit Details
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
