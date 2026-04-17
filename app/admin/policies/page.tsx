import { requirePoliciesAccess } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import PoliciesManagerClient from '@/components/admin/PoliciesManagerClient';

export default async function AdminPoliciesPage() {
  await requirePoliciesAccess();

  const policies = await prisma.policy.findMany({
    orderBy: { sortOrder: 'asc' },
  });

  return (
    <div className="p-6 max-w-6xl">
      <h1 className="font-sans text-2xl font-bold text-gray-900 mb-1">Policies Manager</h1>
      <p className="font-sans text-sm text-gray-500 mb-6">
        Manage policies and procedures displayed on the public Policies &amp; Procedures page.
      </p>
      <PoliciesManagerClient policies={policies} />
    </div>
  );
}
