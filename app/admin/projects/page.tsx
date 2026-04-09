import Link from 'next/link';
import { requireUser } from '@/lib/auth';
import { fetchAllProjectsForAdmin, fetchProjectsAssignedToUser } from '@/lib/data/fetch-project';
import ProjectListClient from '@/components/admin/ProjectListClient';

export default async function AdminProjectsPage() {
  const user = await requireUser();

  const canManageAll = user.role === 'SUPER_ADMIN' || !!user.projectPermission;

  let projects;
  if (canManageAll) {
    projects = await fetchAllProjectsForAdmin();
  } else {
    projects = await fetchProjectsAssignedToUser(user.id);
  }

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-sans text-2xl font-bold text-gray-900 mb-1">Projects</h1>
          <p className="font-sans text-sm text-gray-500">
            {canManageAll ? 'Manage all projects and initiatives.' : 'Manage your assigned projects.'}
          </p>
        </div>
        {canManageAll && (
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-2 px-4 py-2 bg-[#005087] text-white rounded-lg text-sm font-sans font-medium hover:bg-[#193A5A] transition-colors"
          >
            New Project
          </Link>
        )}
      </div>
      <ProjectListClient projects={projects} />
    </div>
  );
}
