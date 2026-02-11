import { prisma } from '@/lib/prisma';
import { requireTeamAccess } from '@/lib/auth';
import { notFound } from 'next/navigation';
import TeamDetailClient from '@/components/admin/TeamDetailClient';

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ teamId: string }>;
}) {
  const { teamId } = await params;

  try {
    await requireTeamAccess(teamId);
  } catch {
    notFound();
  }

  const team = await prisma.team.findUnique({
    where: { id: teamId },
    include: {
      portfolios: {
        orderBy: { sortOrder: 'asc' },
        include: { subpage: true },
      },
      teamTabs: {
        orderBy: { sortOrder: 'asc' },
        include: { diagramLinks: { orderBy: { sortOrder: 'asc' } } },
      },
      trelloBoards: { orderBy: { sortOrder: 'asc' } },
      teamMembers: { orderBy: { sortOrder: 'asc' } },
      serviceAreas: { orderBy: { sortOrder: 'asc' } },
      accordionGroups: {
        orderBy: { sortOrder: 'asc' },
        include: { links: { orderBy: { sortOrder: 'asc' } } },
      },
    },
  });

  if (!team) notFound();

  return <TeamDetailClient team={team} />;
}
