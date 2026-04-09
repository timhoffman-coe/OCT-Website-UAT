'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FolderKanban, Search } from 'lucide-react';
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

interface Project {
  id: string;
  slug: string;
  title: string;
  projectCode: string | null;
  status: ProjectStatus;
  isPublished: boolean;
  updatedAt: Date;
  tags: { tag: { name: string; slug: string } }[];
}

export default function ProjectListClient({ projects }: { projects: Project[] }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const filtered = projects.filter((p) => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.projectCode?.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (statusFilter && p.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm font-sans focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-sans focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        >
          <option value="">All Statuses</option>
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <h2 className="font-sans text-sm font-semibold text-gray-700 flex items-center gap-2">
            <FolderKanban size={16} className="text-[#005087]" />
            Projects ({filtered.length})
          </h2>
        </div>

        {filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-500 font-sans text-sm">
            No projects found.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filtered.map((project) => (
              <Link
                key={project.id}
                href={`/admin/projects/${project.id}`}
                className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-sans text-sm font-medium text-gray-900 truncate">
                      {project.title}
                    </p>
                    {!project.isPublished && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded font-medium uppercase">
                        Draft
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    {project.projectCode && (
                      <span className="font-sans text-xs text-gray-400">{project.projectCode}</span>
                    )}
                    {project.tags.length > 0 && (
                      <span className="font-sans text-xs text-gray-400">
                        {project.tags.map(t => t.tag.name).join(', ')}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] px-2 py-0.5 rounded-sm font-bold tracking-wider uppercase ${STATUS_COLORS[project.status]}`}>
                    {STATUS_LABELS[project.status]}
                  </span>
                  <span className="text-xs text-gray-400 font-sans whitespace-nowrap">
                    {new Date(project.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
