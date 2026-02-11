import { prisma } from '@/lib/prisma';
import { resolveIcon } from '@/lib/icon-resolver';
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
      },
    });
    if (!team) return null;

    return {
      teamName: team.teamName,
      teamShortName: team.teamShortName,
      portfolios: team.portfolios.map((p) => ({
        icon: resolveIcon(p.iconName),
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
