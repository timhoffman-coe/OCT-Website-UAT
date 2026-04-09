import { requireSuperAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import ProjectEditorsClient from '@/components/admin/ProjectEditorsClient';

export default async function ProjectEditorsPage() {
  await requireSuperAdmin();

  const [editors, users] = await Promise.all([
    prisma.projectPermission.findMany({
      include: {
        user: { select: { id: true, email: true, name: true, role: true } },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true },
      orderBy: { name: 'asc' },
    }),
  ]);

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="font-sans text-2xl font-bold text-gray-900 mb-1">Project Editors</h1>
      <p className="font-sans text-sm text-gray-500 mb-6">Manage who can create, edit, and manage all projects.</p>
      <ProjectEditorsClient editors={editors} users={users} />
    </div>
  );
}
