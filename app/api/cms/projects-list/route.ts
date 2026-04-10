import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await requireUser();

    const projects = await prisma.project.findMany({
      where: { archivedAt: null },
      select: {
        id: true,
        title: true,
        projectCode: true,
        slug: true,
        isPublished: true,
      },
      orderBy: { title: 'asc' },
    });

    return NextResponse.json(projects);
  } catch {
    return NextResponse.json([], { status: 401 });
  }
}
