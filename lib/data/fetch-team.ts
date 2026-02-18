import { prisma } from '@/lib/prisma';
import type { ITSTeamPageData } from './its-shared';
import type { ServiceArea } from '@/components/SectionTemplate';

export async function fetchITSTeamData(
  slug: string
): Promise<ITSTeamPageData | null> {
  try {
    const team = await prisma.team.findUnique({
      where: { slug, isPublished: true },
      include: {
        portfolios: { orderBy: { sortOrder: 'asc' } },
        teamTabs: {
          orderBy: { sortOrder: 'asc' },
          include: { diagramLinks: { orderBy: { sortOrder: 'asc' } } },
        },
        trelloBoards: { orderBy: { sortOrder: 'asc' } },
        teamMembers: { orderBy: { sortOrder: 'asc' } },
        accordionGroups: {
          orderBy: { sortOrder: 'asc' },
          include: { links: { orderBy: { sortOrder: 'asc' } } },
        },
        widgetInstances: {
          select: {
            config: true,
            widgetDefinition: { select: { widgetType: true } },
          },
        },
      },
    });
    if (!team) return null;

    return {
      teamName: team.teamName,
      teamShortName: team.teamShortName,
      portfolios: team.portfolios.map((p) => ({
        icon: p.iconName,
        title: p.title,
        description: p.description,
        href: p.href,
      })),
      teamTabs: team.teamTabs.map((t) => ({
        id: t.tabId,
        label: t.label,
        videoTitle: t.videoTitle,
        videoDescription: t.videoDescription,
        videoUrl: t.videoUrl,
        diagramsTitle: t.diagramsTitle,
        diagramsDescription: t.diagramsDescription,
        diagramLinks: t.diagramLinks.map((d) => ({
          label: d.label,
          href: d.href,
        })),
      })),
      trelloBoards: team.trelloBoards.map((b) => ({
        title: b.title,
        description: b.description,
        href: b.href,
      })),
      teamMembers: team.teamMembers.map((m) => ({
        name: m.name,
        title: m.title,
        email: m.email,
      })),
      accordionItems: team.accordionGroups.length > 0
        ? team.accordionGroups.map((g) => ({
            id: g.groupId,
            title: g.title,
            links: g.links.map((l) => ({ label: l.label, href: l.href })),
          }))
        : undefined,
      widgetConfigs: Object.fromEntries(
        team.widgetInstances
          .filter((wi) => wi.config && typeof wi.config === 'object' && Object.keys(wi.config as object).length > 0)
          .map((wi) => [wi.widgetDefinition.widgetType, wi.config as Record<string, string>])
      ),
    };
  } catch {
    return null;
  }
}

export async function fetchSectionData(slug: string): Promise<{
  pageTitle: string;
  pageDescription: string;
  serviceAreas: ServiceArea[];
} | null> {
  try {
    const team = await prisma.team.findUnique({
      where: { slug, isPublished: true },
      include: {
        serviceAreas: { orderBy: { sortOrder: 'asc' } },
      },
    });
    if (!team || !team.pageTitle) return null;

    return {
      pageTitle: team.pageTitle,
      pageDescription: team.pageDescription || '',
      serviceAreas: team.serviceAreas.map((sa) => ({
        id: sa.serviceAreaId,
        title: sa.title,
        icon: sa.icon || undefined,
        shortDescription: sa.shortDescription,
        fullDescription: sa.fullDescription,
        features: sa.features,
        link: sa.link || undefined,
      })),
    };
  } catch {
    return null;
  }
}
