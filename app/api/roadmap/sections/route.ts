import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const sections = await prisma.roadmapSection.findMany({
      include: {
        projects: {
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy: { sortOrder: 'asc' },
    });

    return NextResponse.json(sections);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
