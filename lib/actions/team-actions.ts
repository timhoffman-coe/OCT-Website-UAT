'use server';

import { prisma } from '@/lib/prisma';
import { requireTeamAccess, requireSuperAdmin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { slugify } from '@/lib/slugify';

export async function updateTeam(
  teamId: string,
  data: {
    teamName?: string;
    teamShortName?: string;
    pageTitle?: string;
    pageDescription?: string;
    isPublished?: boolean;
  }
) {
  const user = await requireTeamAccess(teamId);
  const before = await prisma.team.findUniqueOrThrow({ where: { id: teamId } });

  const updated = await prisma.team.update({
    where: { id: teamId },
    data,
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'UPDATE',
      entity: 'Team',
      entityId: teamId,
      changes: { before, after: updated },
    },
  });

  revalidatePath(`/${updated.slug}`);
  revalidatePath(`/admin/teams/${teamId}`);
  return updated;
}

export async function createTeam(data: {
  slug: string;
  teamName: string;
  teamShortName: string;
  pageTemplate: 'ITS_TEAM' | 'SECTION' | 'CUSTOM';
  pageTitle?: string;
  pageDescription?: string;
}) {
  const user = await requireSuperAdmin();

  const team = await prisma.team.create({ data });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'CREATE',
      entity: 'Team',
      entityId: team.id,
      changes: data,
    },
  });

  revalidatePath('/admin');
  return team;
}

export async function createChildTeam(
  parentId: string,
  data: {
    teamName: string;
    teamShortName: string;
  }
) {
  const user = await requireTeamAccess(parentId);

  const parent = await prisma.team.findUniqueOrThrow({ where: { id: parentId } });
  const childCount = await prisma.team.count({ where: { parentId } });

  // Auto-generate a unique slug from the team name
  let slug = slugify(data.teamName);
  if (!slug) throw new Error('Team name must contain at least one alphanumeric character.');
  let suffix = 2;
  while (await prisma.team.findUnique({ where: { slug } })) {
    slug = `${slugify(data.teamName)}-${suffix}`;
    suffix++;
  }

  // Create the child team as a draft ITS_TEAM
  const team = await prisma.team.create({
    data: {
      slug,
      teamName: data.teamName,
      teamShortName: data.teamShortName,
      pageTemplate: 'ITS_TEAM',
      sortOrder: childCount,
      isPublished: false,
      parentId,
    },
  });

  // Create default widget instances
  const defaultTypes = [
    'page_header', 'portfolios', 'team_tabs', 'accordion_links',
    'work_tracking', 'ongoing_projects', 'budget_spend', 'team_members',
  ];
  const defs = await prisma.widgetDefinition.findMany({
    where: { widgetType: { in: defaultTypes } },
  });
  const defMap = new Map(defs.map((d) => [d.widgetType, d]));
  for (let i = 0; i < defaultTypes.length; i++) {
    const def = defMap.get(defaultTypes[i]);
    if (!def) continue;
    await prisma.widgetInstance.create({
      data: { teamId: team.id, widgetDefinitionId: def.id, sortOrder: i },
    });
  }

  // Auto-create a ServiceArea card on the parent section linking to this team
  const saCount = await prisma.serviceArea.count({ where: { teamId: parentId } });
  await prisma.serviceArea.create({
    data: {
      teamId: parentId,
      serviceAreaId: slug,
      title: data.teamName,
      shortDescription: '',
      fullDescription: '',
      features: [],
      link: `/${slug}`,
      sortOrder: saCount,
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'CREATE_CHILD_TEAM',
      entity: 'Team',
      entityId: team.id,
      changes: { parentId, ...data },
    },
  });

  revalidatePath('/admin');
  revalidatePath(`/${parent.slug}`);
  revalidatePath(`/admin/teams/${parentId}`);
  return team;
}

// Soft-delete: archive a team and all its descendants
export async function archiveTeam(teamId: string) {
  const user = await requireSuperAdmin();
  const team = await prisma.team.findUniqueOrThrow({
    where: { id: teamId },
    include: { children: { select: { id: true } } },
  });

  const now = new Date();

  // Collect all descendant IDs recursively
  async function getDescendantIds(parentId: string): Promise<string[]> {
    const children = await prisma.team.findMany({
      where: { parentId },
      select: { id: true },
    });
    const ids = children.map((c) => c.id);
    for (const child of children) {
      ids.push(...(await getDescendantIds(child.id)));
    }
    return ids;
  }

  const descendantIds = await getDescendantIds(teamId);
  const allIds = [teamId, ...descendantIds];

  // Archive all teams in one query
  await prisma.team.updateMany({
    where: { id: { in: allIds } },
    data: { archivedAt: now },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'ARCHIVE',
      entity: 'Team',
      entityId: teamId,
      changes: { teamName: team.teamName, slug: team.slug, descendantCount: descendantIds.length },
    },
  });

  revalidatePath('/admin');
  revalidatePath(`/${team.slug}`);
  if (team.parentId) {
    const parent = await prisma.team.findUnique({ where: { id: team.parentId } });
    if (parent) revalidatePath(`/${parent.slug}`);
  }
}

// Restore an archived team and its descendants
export async function restoreTeam(teamId: string) {
  const user = await requireSuperAdmin();
  const team = await prisma.team.findUniqueOrThrow({ where: { id: teamId } });

  if (!team.archivedAt) {
    throw new Error('Team is not archived.');
  }

  // If parent is archived, refuse
  if (team.parentId) {
    const parent = await prisma.team.findUnique({ where: { id: team.parentId } });
    if (parent?.archivedAt) {
      throw new Error('Cannot restore: parent team is archived. Restore the parent first.');
    }
  }

  // Collect all descendant IDs
  async function getDescendantIds(parentId: string): Promise<string[]> {
    const children = await prisma.team.findMany({
      where: { parentId },
      select: { id: true },
    });
    const ids = children.map((c) => c.id);
    for (const child of children) {
      ids.push(...(await getDescendantIds(child.id)));
    }
    return ids;
  }

  const descendantIds = await getDescendantIds(teamId);
  const allIds = [teamId, ...descendantIds];

  await prisma.team.updateMany({
    where: { id: { in: allIds } },
    data: { archivedAt: null },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'RESTORE',
      entity: 'Team',
      entityId: teamId,
      changes: { teamName: team.teamName, slug: team.slug, descendantCount: descendantIds.length },
    },
  });

  revalidatePath('/admin');
  revalidatePath(`/${team.slug}`);
}

// Permanent delete — only for teams archived 7+ days
export async function permanentlyDeleteTeam(teamId: string) {
  const user = await requireSuperAdmin();
  const team = await prisma.team.findUniqueOrThrow({ where: { id: teamId } });

  if (!team.archivedAt) {
    throw new Error('Team must be archived before permanent deletion.');
  }

  const daysSinceArchived = (Date.now() - team.archivedAt.getTime()) / (1000 * 60 * 60 * 24);
  if (daysSinceArchived < 7) {
    throw new Error(`Team must be archived for at least 7 days before permanent deletion. Archived ${Math.floor(daysSinceArchived)} days ago.`);
  }

  // Clean up parent's ServiceArea link
  if (team.parentId) {
    await prisma.serviceArea.deleteMany({
      where: { teamId: team.parentId, link: `/${team.slug}` },
    });
  }

  await prisma.team.delete({ where: { id: teamId } });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'DELETE',
      entity: 'Team',
      entityId: teamId,
      changes: team,
    },
  });

  revalidatePath('/admin');
}

// Legacy deleteTeam now redirects to archiveTeam for safety
export async function deleteTeam(teamId: string) {
  return archiveTeam(teamId);
}

// Get archive impact summary (for confirmation dialog)
export async function getArchiveImpact(teamId: string) {
  await requireSuperAdmin();
  const team = await prisma.team.findUniqueOrThrow({
    where: { id: teamId },
    select: {
      teamName: true,
      slug: true,
      _count: {
        select: {
          children: true,
          portfolios: true,
          serviceAreas: true,
          teamMembers: true,
          teamServices: true,
          teamContacts: true,
          widgetInstances: true,
        },
      },
    },
  });

  // Count all descendants recursively
  async function countDescendants(parentId: string): Promise<number> {
    const children = await prisma.team.findMany({
      where: { parentId },
      select: { id: true },
    });
    let count = children.length;
    for (const child of children) {
      count += await countDescendants(child.id);
    }
    return count;
  }

  const totalDescendants = await countDescendants(teamId);

  return {
    teamName: team.teamName,
    slug: team.slug,
    childTeams: totalDescendants,
    portfolios: team._count.portfolios,
    serviceAreas: team._count.serviceAreas,
    teamMembers: team._count.teamMembers,
    services: team._count.teamServices,
    contacts: team._count.teamContacts,
    widgets: team._count.widgetInstances,
  };
}
