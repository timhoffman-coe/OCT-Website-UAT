import { prisma } from '@/lib/prisma';
import PoliciesClient from '@/components/PoliciesClient';

export const dynamic = 'force-dynamic';

export default async function PoliciesPage() {
  const policies = await prisma.policy.findMany({
    orderBy: { sortOrder: 'asc' },
  });

  return <PoliciesClient policies={policies} />;
}
