import { prisma } from '@/lib/prisma';
import { resolveIcon } from '@/lib/icon-resolver';

export async function fetchPortfolioSubpage(portfolioHref: string) {
  try {
    const portfolio = await prisma.portfolio.findFirst({
      where: { href: portfolioHref },
      include: {
        subpage: {
          include: {
            services: { orderBy: { sortOrder: 'asc' } },
            initiatives: { orderBy: { sortOrder: 'asc' } },
            contacts: { orderBy: { sortOrder: 'asc' } },
            quickLinks: { orderBy: { sortOrder: 'asc' } },
          },
        },
      },
    });

    const subpage = portfolio?.subpage;
    if (!subpage) return null;

    return {
      parentTeam: subpage.parentTeam,
      parentTeamHref: subpage.parentTeamHref,
      title: subpage.title,
      description: subpage.description,
      icon: resolveIcon(subpage.iconName),
      services: subpage.services.map((s) => ({
        title: s.title,
        items: s.items,
      })),
      initiatives: subpage.initiatives.map((i) => ({
        title: i.title,
        description: i.description,
        href: i.href,
      })),
      contacts: subpage.contacts.map((c) => ({
        name: c.name,
        role: c.role,
        email: c.email,
      })),
      quickLinks: subpage.quickLinks.map((q) => ({
        label: q.label,
        description: q.description,
        href: q.href,
        isSecure: q.isSecure,
      })),
      showStatus: subpage.showStatus,
    };
  } catch {
    return null;
  }
}
