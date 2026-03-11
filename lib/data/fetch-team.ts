import { prisma } from '@/lib/prisma';
import type { ITSTeamPageData } from './its-shared';
import type { ServiceArea } from '@/components/SectionTemplate';
import type { SubTeamPageData } from '@/components/its-shared/SubTeamPageTemplate';
import type { WidgetDataBag } from '@/components/widgets/WidgetRenderer';

export async function fetchITSTeamData(
  slug: string
): Promise<ITSTeamPageData | null> {
  try {
    const team = await prisma.team.findUnique({
      where: { slug, isPublished: true, archivedAt: null },
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

export async function fetchSubTeamData(
  slug: string
): Promise<SubTeamPageData | null> {
  try {
    const team = await prisma.team.findUnique({
      where: { slug, isPublished: true, archivedAt: null },
      include: {
        parent: { select: { teamName: true, slug: true } },
        teamServices: { orderBy: { sortOrder: 'asc' } },
        teamInitiatives: { orderBy: { sortOrder: 'asc' } },
        teamContacts: { orderBy: { sortOrder: 'asc' } },
        teamQuickLinks: { orderBy: { sortOrder: 'asc' } },
      },
    });
    if (!team || !team.parent) return null;

    return {
      teamName: team.teamName,
      description: team.pageDescription || '',
      iconName: team.iconName || 'Server',
      showStatus: team.showStatus,
      parentTeam: team.parent.teamName,
      parentTeamHref: `/${team.parent.slug}`,
      services: team.teamServices.map((s) => ({
        title: s.title,
        items: s.items,
      })),
      initiatives: team.teamInitiatives.map((i) => ({
        title: i.title,
        description: i.description,
        href: i.href,
      })),
      contacts: team.teamContacts.map((c) => ({
        name: c.name,
        role: c.role,
        email: c.email,
      })),
      quickLinks: team.teamQuickLinks.map((ql) => ({
        label: ql.label,
        description: ql.description,
        href: ql.href,
        isSecure: ql.isSecure,
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
  whoWeAreItems: { title: string; description: string; linkText: string; linkUrl: string }[];
  keyInitiativeSlides: { title: string; description: string; imageUrl?: string; imageAlt: string }[];
} | null> {
  try {
    const team = await prisma.team.findUnique({
      where: { slug, isPublished: true, archivedAt: null },
      include: {
        serviceAreas: { orderBy: { sortOrder: 'asc' } },
        whoWeAreItems: { orderBy: { sortOrder: 'asc' } },
        keyInitiativeSlides: { orderBy: { sortOrder: 'asc' } },
      },
    });
    if (!team || !team.pageTitle) return null;

    // Collect slugs from service area links (e.g. "/some-slug" → "some-slug")
    const linkedSlugs = team.serviceAreas
      .map((sa) => sa.link?.replace(/^\//, ''))
      .filter((s): s is string => !!s);

    // Find which of those linked teams are actually published
    const publishedTeams = linkedSlugs.length > 0
      ? await prisma.team.findMany({
          where: { slug: { in: linkedSlugs }, isPublished: true, archivedAt: null },
          select: { slug: true },
        })
      : [];
    const publishedSlugs = new Set(publishedTeams.map((t) => t.slug));

    return {
      pageTitle: team.pageTitle,
      pageDescription: team.pageDescription || '',
      serviceAreas: team.serviceAreas.map((sa) => {
        const linkedSlug = sa.link?.replace(/^\//, '');
        // Only include the link if the target team is published
        const isLinkPublished = linkedSlug ? publishedSlugs.has(linkedSlug) : false;
        return {
          id: sa.serviceAreaId,
          title: sa.title,
          icon: sa.icon || undefined,
          shortDescription: sa.shortDescription,
          fullDescription: sa.fullDescription,
          features: sa.features,
          link: isLinkPublished ? sa.link || undefined : undefined,
        };
      }),
      whoWeAreItems: team.whoWeAreItems.map((item) => ({
        title: item.title,
        description: item.description,
        linkText: item.linkText,
        linkUrl: item.linkUrl,
      })),
      keyInitiativeSlides: team.keyInitiativeSlides.map((slide) => ({
        title: slide.title,
        description: slide.description,
        imageUrl: slide.imageUrl || undefined,
        imageAlt: slide.imageAlt,
      })),
    };
  } catch {
    return null;
  }
}

export async function fetchUnifiedTeamData(
  slug: string
): Promise<{ dataBag: WidgetDataBag; pageTitle: string; pageDescription: string; pageTemplate: string } | null> {
  try {
    const team = await prisma.team.findUnique({
      where: { slug, isPublished: true, archivedAt: null },
      include: {
        parent: { select: { teamName: true, slug: true } },
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
        serviceAreas: { orderBy: { sortOrder: 'asc' } },
        whoWeAreItems: { orderBy: { sortOrder: 'asc' } },
        keyInitiativeSlides: { orderBy: { sortOrder: 'asc' } },
        teamServices: { orderBy: { sortOrder: 'asc' } },
        teamInitiatives: { orderBy: { sortOrder: 'asc' } },
        teamContacts: { orderBy: { sortOrder: 'asc' } },
        teamQuickLinks: { orderBy: { sortOrder: 'asc' } },
        widgetInstances: {
          select: {
            config: true,
            widgetDefinition: { select: { widgetType: true } },
          },
        },
      },
    });
    if (!team) return null;

    const linkedSlugs = team.serviceAreas
      .map((sa) => sa.link?.replace(/^\//, ''))
      .filter((s): s is string => !!s);

    const publishedTeams = linkedSlugs.length > 0
      ? await prisma.team.findMany({
          where: { slug: { in: linkedSlugs }, isPublished: true, archivedAt: null },
          select: { slug: true },
        })
      : [];
    const publishedSlugs = new Set(publishedTeams.map((t) => t.slug));

    const widgetConfigs = Object.fromEntries(
      team.widgetInstances
        .filter((wi) => wi.config && typeof wi.config === 'object' && Object.keys(wi.config as object).length > 0)
        .map((wi) => [wi.widgetDefinition.widgetType, wi.config as Record<string, string>])
    );

    const dataBag: WidgetDataBag = {
      teamName: team.teamName,
      teamShortName: team.teamShortName,
      pageTitle: team.pageTitle || undefined,
      pageDescription: team.pageDescription || undefined,
      widgetConfigs,
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
        diagramLinks: t.diagramLinks.map((d) => ({ label: d.label, href: d.href })),
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
      serviceAreas: team.serviceAreas.map((sa) => {
        const linkedSlug = sa.link?.replace(/^\//, '');
        const isLinkPublished = linkedSlug ? publishedSlugs.has(linkedSlug) : false;
        return {
          id: sa.serviceAreaId,
          title: sa.title,
          icon: sa.icon || undefined,
          shortDescription: sa.shortDescription,
          fullDescription: sa.fullDescription,
          features: sa.features,
          link: isLinkPublished ? sa.link || undefined : undefined,
        };
      }),
      whoWeAreItems: team.whoWeAreItems.map((item) => ({
        title: item.title,
        description: item.description,
        linkText: item.linkText,
        linkUrl: item.linkUrl,
      })),
      keyInitiativeSlides: team.keyInitiativeSlides.map((slide) => ({
        title: slide.title,
        description: slide.description,
        imageUrl: slide.imageUrl || undefined,
        imageAlt: slide.imageAlt,
      })),
      parentTeam: team.parent?.teamName,
      parentTeamHref: team.parent ? `/${team.parent.slug}` : undefined,
      iconName: team.iconName || undefined,
      showStatus: team.showStatus,
      services: team.teamServices.map((s) => ({ title: s.title, items: s.items })),
      initiatives: team.teamInitiatives.map((i) => ({ title: i.title, description: i.description, href: i.href })),
      contacts: team.teamContacts.map((c) => ({ name: c.name, role: c.role, email: c.email })),
      quickLinks: team.teamQuickLinks.map((ql) => ({ label: ql.label, description: ql.description, href: ql.href, isSecure: ql.isSecure })),
    };

    return {
      dataBag,
      pageTitle: team.pageTitle || team.teamName,
      pageDescription: team.pageDescription || '',
      pageTemplate: team.pageTemplate,
    };
  } catch {
    return null;
  }
}
