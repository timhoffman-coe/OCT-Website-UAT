import { requireSuperAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import RoadmapEditorsClient from '@/components/admin/RoadmapEditorsClient';

export default async function RoadmapEditorsPage() {
  await requireSuperAdmin();

  const [editors, users] = await Promise.all([
    prisma.roadmapPermission.findMany({
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
      <h1 className="font-sans text-2xl font-bold text-gray-900 mb-1">Roadmap Editors</h1>
      <p className="font-sans text-sm text-gray-500 mb-6">
        Manage who can add, edit, and delete initiatives on the Technology Roadmap page.
        Super Admins always have access automatically.
      </p>
      <RoadmapEditorsClient editors={editors} users={users} />
    </div>
  );
}
