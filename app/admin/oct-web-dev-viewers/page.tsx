import { requireSuperAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import OctWebDevViewersClient from '@/components/admin/OctWebDevViewersClient';

export default async function OctWebDevViewersPage() {
  await requireSuperAdmin();

  const [viewers, users] = await Promise.all([
    prisma.octWebDevPermission.findMany({
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
      <h1 className="font-sans text-2xl font-bold text-gray-900 mb-1">OCT-Web-Dev Viewers</h1>
      <p className="font-sans text-sm text-gray-500 mb-6">
        Manage who can view the OCT-Web-Dev page. Super Admins always have access automatically.
      </p>
      <OctWebDevViewersClient viewers={viewers} users={users} />
    </div>
  );
}
