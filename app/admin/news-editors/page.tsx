import { requireSuperAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import NewsEditorsClient from '@/components/admin/NewsEditorsClient';

export default async function NewsEditorsPage() {
  await requireSuperAdmin();

  const [editors, users] = await Promise.all([
    prisma.newsPermission.findMany({
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
      <h1 className="font-sans text-2xl font-bold text-gray-900 mb-1">News Editors</h1>
      <p className="font-sans text-sm text-gray-500 mb-6">Manage who can create, edit, and publish news posts.</p>
      <NewsEditorsClient editors={editors} users={users} />
    </div>
  );
}
