import { prisma } from '@/lib/prisma';
import type { ProjectStatus } from '@prisma/client';

const fullProjectInclude = {
  milestones: { orderBy: { sortOrder: 'asc' as const } },
  objectives: { orderBy: { sortOrder: 'asc' as const } },
  statusUpdates: { orderBy: { createdAt: 'desc' as const }, take: 5 },
  tags: { include: { tag: true } },
  managerAssignments: { include: { user: { select: { id: true, email: true, name: true } } } },
};

export async function fetchProjectBySlug(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
    include: fullProjectInclude,
  });
}

export async function fetchProjectById(id: string) {
  return prisma.project.findUnique({
    where: { id },
    include: fullProjectInclude,
  });
}

export interface ProjectListFilters {
  status?: ProjectStatus;
  tagSlug?: string;
  search?: string;
  includeUnpublished?: boolean;
}

export async function fetchProjectsList(filters?: ProjectListFilters) {
  const where: Record<string, unknown> = {
    archivedAt: null,
  };

  if (!filters?.includeUnpublished) {
    where.isPublished = true;
  }

  if (filters?.status) {
    where.status = filters.status;
  }

  if (filters?.tagSlug) {
    where.tags = { some: { tag: { slug: filters.tagSlug } } };
  }

  if (filters?.search) {
    where.OR = [
      { title: { contains: filters.search, mode: 'insensitive' } },
      { description: { contains: filters.search, mode: 'insensitive' } },
      { projectCode: { contains: filters.search, mode: 'insensitive' } },
    ];
  }

  return prisma.project.findMany({
    where,
    include: {
      tags: { include: { tag: true } },
    },
    orderBy: { updatedAt: 'desc' },
  });
}

export interface WidgetProjectConfig {
  mode?: 'manual' | 'tag';
  projectIds?: string[];
  tagSlug?: string;
  maxProjects?: number;
}

export async function fetchProjectsForWidget(config: WidgetProjectConfig) {
  const limit = config.maxProjects || 6;

  if (config.mode === 'manual' && config.projectIds?.length) {
    return prisma.project.findMany({
      where: {
        id: { in: config.projectIds },
        isPublished: true,
        archivedAt: null,
      },
      include: { tags: { include: { tag: true } } },
      take: limit,
    });
  }

  if (config.mode === 'tag' && config.tagSlug) {
    return prisma.project.findMany({
      where: {
        isPublished: true,
        archivedAt: null,
        tags: { some: { tag: { slug: config.tagSlug } } },
      },
      include: { tags: { include: { tag: true } } },
      orderBy: { updatedAt: 'desc' },
      take: limit,
    });
  }

  return [];
}

export async function fetchAllProjectsForAdmin() {
  return prisma.project.findMany({
    where: { archivedAt: null },
    include: {
      tags: { include: { tag: true } },
      managerAssignments: { include: { user: { select: { id: true, email: true, name: true } } } },
    },
    orderBy: { updatedAt: 'desc' },
  });
}

export async function fetchProjectsAssignedToUser(userId: string) {
  return prisma.project.findMany({
    where: {
      archivedAt: null,
      managerAssignments: { some: { userId } },
    },
    include: {
      tags: { include: { tag: true } },
    },
    orderBy: { updatedAt: 'desc' },
  });
}
