import { prisma } from '@/lib/prisma';
import { requireSuperAdmin } from '@/lib/auth';
import TrashClient from './TrashClient';

export const dynamic = 'force-dynamic';

export default async function TrashPage() {
  await requireSuperAdmin();

  const archivedTeams = await prisma.team.findMany({
    where: { archivedAt: { not: null } },
    orderBy: { archivedAt: 'desc' },
    select: {
      id: true,
      teamName: true,
      slug: true,
      pageTemplate: true,
      archivedAt: true,
      parentId: true,
      parent: { select: { teamName: true } },
      _count: { select: { children: true } },
    },
  });

  return <TrashClient teams={archivedTeams} />;
}
