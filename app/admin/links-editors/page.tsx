import { requireSuperAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import LinksEditorsClient from '@/components/admin/LinksEditorsClient';

export default async function LinksEditorsPage() {
  await requireSuperAdmin();

  const [editors, users] = await Promise.all([
    prisma.linksPermission.findMany({
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
      <h1 className="font-sans text-2xl font-bold text-gray-900 mb-1">Links Editors</h1>
      <p className="font-sans text-sm text-gray-500 mb-6">
        Manage who can add, edit, and delete link categories and links on the Links page.
        Super Admins always have access automatically.
      </p>
      <LinksEditorsClient editors={editors} users={users} />
    </div>
  );
}
