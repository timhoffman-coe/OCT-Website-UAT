import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await requireUser();

    let teams;
    if (user.role === 'SUPER_ADMIN') {
      teams = await prisma.team.findMany({
        orderBy: { sortOrder: 'asc' },
        include: {
          _count: {
            select: { portfolios: true, teamMembers: true, serviceAreas: true },
          },
        },
      });
    } else {
      const teamIds = user.teamPermissions.map((p) => p.teamId);
      teams = await prisma.team.findMany({
        where: { id: { in: teamIds } },
        orderBy: { sortOrder: 'asc' },
        include: {
          _count: {
            select: { portfolios: true, teamMembers: true, serviceAreas: true },
          },
        },
      });
    }

    return NextResponse.json(teams);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal error';
    const status = message.includes('Unauthorized') ? 401 : message.includes('Forbidden') ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
