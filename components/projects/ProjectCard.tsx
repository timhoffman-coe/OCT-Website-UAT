import Link from 'next/link';
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

interface ProjectCardProps {
  slug: string;
  title: string;
  description?: string | null;
  status: ProjectStatus;
  progress: number;
  tags?: { tag: { name: string; slug: string } }[];
}

export default function ProjectCard({ slug, title, description, status, progress, tags }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="block bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-[10px] px-2 py-0.5 rounded-sm font-bold tracking-widest uppercase ${STATUS_COLORS[status]}`}>
          {STATUS_LABELS[status]}
        </span>
      </div>
      <h3 className="font-bold text-[#173858] text-lg mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{description}</p>
      )}
      <div className="mt-3">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-[#003962] transition-all" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {tags.map(({ tag }) => (
            <span key={tag.slug} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">
              {tag.name}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
