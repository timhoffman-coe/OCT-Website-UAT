import type { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://oct.edmonton.ca';

  const staticPages = [
    '', '/about', '/leadership', '/services', '/contact',
    '/roadmap', '/dashboards', '/budget', '/org-chart',
    '/service-health', '/ai-resources', '/technology-strategies',
    '/application-technology-services', '/technology-planning',
    '/integrated-technology-solutions', '/project-management-office',
    '/corporate-information-security',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1.0 : 0.8,
  }));

  const teams = await prisma.team.findMany({
    where: { isPublished: true, archivedAt: null },
    select: { slug: true, updatedAt: true },
  });

  const teamPages = teams.map((team) => ({
    url: `${baseUrl}/${team.slug}`,
    lastModified: team.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const projects = await prisma.project.findMany({
    where: { isPublished: true, archivedAt: null },
    select: { slug: true, updatedAt: true },
  });

  const projectPages = [
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: project.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  return [...staticPages, ...teamPages, ...projectPages];
}
