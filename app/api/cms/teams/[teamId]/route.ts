import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireTeamAccess } from '@/lib/auth';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ teamId: string }> }
) {
  try {
    const { teamId } = await params;
    await requireTeamAccess(teamId);

    const team = await prisma.team.findUniqueOrThrow({
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

    return NextResponse.json(team);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal error';
    const status = message.includes('Unauthorized') ? 401 : message.includes('Forbidden') ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
