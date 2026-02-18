import { prisma } from '@/lib/prisma';

export async function fetchWidgetOrder(slug: string): Promise<string[] | null> {
  try {
    const team = await prisma.team.findUnique({
      where: { slug },
      select: {
        widgetInstances: {
          orderBy: { sortOrder: 'asc' },
          select: {
            widgetDefinition: {
              select: { widgetType: true },
            },
          },
        },
      },
    });

    if (!team || team.widgetInstances.length === 0) return null;
    return team.widgetInstances.map((wi) => wi.widgetDefinition.widgetType);
  } catch {
    return null;
  }
}
