import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireSuperAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

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

    const response = NextResponse.json(users);
    response.headers.set('Cache-Control', 'private, no-store');
    return response;
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal error';
    const status = message.includes('Unauthorized') ? 401 : message.includes('Forbidden') ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
