import { requireLinksAccess } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import LinksManagerClient from '@/components/admin/LinksManagerClient';

export default async function AdminLinksPage() {
  await requireLinksAccess();

  const categories = await prisma.linkCategory.findMany({
    include: { links: { orderBy: { sortOrder: 'asc' } } },
    orderBy: { sortOrder: 'asc' },
  });

  return (
    <div className="p-6 max-w-6xl">
      <h1 className="font-sans text-2xl font-bold text-gray-900 mb-1">Links Manager</h1>
      <p className="font-sans text-sm text-gray-500 mb-6">
        Manage link categories and links displayed on the Links page.
      </p>
      <LinksManagerClient categories={categories} />
    </div>
  );
}
