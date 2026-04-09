import { prisma } from '@/lib/prisma';
import { requireTeamViewAccess } from '@/lib/auth';
import { notFound } from 'next/navigation';
import TeamDetailClient from '@/components/admin/TeamDetailClient';

export const dynamic = 'force-dynamic';

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ teamId: string }>;
}) {
  const { teamId } = await params;

  let user;
  try {
    user = await requireTeamViewAccess(teamId);
  } catch {
    notFound();
  }

  const readOnly = user.role === 'VIEWER' || user.ancestorOnly;

  const [team, widgetDefinitions] = await Promise.all([
    prisma.team.findUnique({
      where: { id: teamId },
      include: {
        portfolios: {
          orderBy: { sortOrder: 'asc' },
          include: {
            subpage: true,
            linkedTeam: {
              select: { id: true, teamName: true, isPublished: true },
            },
          },
        },
        teamTabs: {
          orderBy: { sortOrder: 'asc' },
          include: { diagramLinks: { orderBy: { sortOrder: 'asc' } } },
        },
        trelloBoards: { orderBy: { sortOrder: 'asc' } },
        teamMembers: { orderBy: { sortOrder: 'asc' } },
        serviceAreas: {
          orderBy: { sortOrder: 'asc' },
          include: { linkedTeam: { select: { id: true, teamName: true, isPublished: true } } },
        },
        whoWeAreItems: { orderBy: { sortOrder: 'asc' } },
        keyInitiativeSlides: { orderBy: { sortOrder: 'asc' } },
        accordionGroups: {
          orderBy: { sortOrder: 'asc' },
          include: { links: { orderBy: { sortOrder: 'asc' } } },
        },
        widgetInstances: {
          orderBy: { sortOrder: 'asc' },
          include: { widgetDefinition: true },
        },
        teamServices: { orderBy: { sortOrder: 'asc' } },
        teamInitiatives: { orderBy: { sortOrder: 'asc' } },
        teamContacts: { orderBy: { sortOrder: 'asc' } },
        teamQuickLinks: { orderBy: { sortOrder: 'asc' } },
        children: {
          orderBy: { sortOrder: 'asc' },
          select: { id: true, slug: true, teamName: true, teamShortName: true, isPublished: true, sortOrder: true },
        },
        parent: {
          select: { id: true, teamName: true, slug: true },
        },
      },
    }),
    prisma.widgetDefinition.findMany({
      where: { isEnabled: true },
      orderBy: { label: 'asc' },
    }),
  ]);

  if (!team) notFound();

  return <TeamDetailClient team={team} widgetDefinitions={widgetDefinitions} readOnly={readOnly} />;
}
