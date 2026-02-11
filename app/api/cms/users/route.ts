import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireSuperAdmin } from '@/lib/auth';

export async function GET() {
  try {
    await requireSuperAdmin();

    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        teamPermissions: {
          include: { team: { select: { id: true, teamName: true, slug: true } } },
        },
      },
    });

    return NextResponse.json(users);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal error';
    const status = message.includes('Unauthorized') ? 401 : message.includes('Forbidden') ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
