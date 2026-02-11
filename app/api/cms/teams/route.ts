import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const user = await requireUser();

    const teamWhere = user.role === 'SUPER_ADMIN'
      ? {}
      : { id: { in: user.teamPermissions.map((p: { teamId: string }) => p.teamId) } };
    const teams = await prisma.team.findMany({
      where: teamWhere,
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: { portfolios: true, teamMembers: true, serviceAreas: true },
        },
      },
    });

    return NextResponse.json(teams);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal error';
    const status = message.includes('Unauthorized') ? 401 : message.includes('Forbidden') ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
