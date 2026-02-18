'use server';

import { prisma } from '@/lib/prisma';
import { requireTeamAccess, requireSuperAdmin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

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
    slug: string;
    teamName: string;
    teamShortName: string;
  }
) {
  const user = await requireTeamAccess(parentId);

  const parent = await prisma.team.findUniqueOrThrow({ where: { id: parentId } });
  const childCount = await prisma.team.count({ where: { parentId } });

  // Create the child team as a draft ITS_TEAM
  const team = await prisma.team.create({
    data: {
      slug: data.slug,
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
      serviceAreaId: data.slug,
      title: data.teamName,
      shortDescription: '',
      fullDescription: '',
      features: [],
      link: `/${data.slug}`,
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

export async function deleteTeam(teamId: string) {
  const user = await requireSuperAdmin();
  const team = await prisma.team.findUniqueOrThrow({ where: { id: teamId } });

  // If this team has a parent, clean up the auto-created ServiceArea on the parent
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
  revalidatePath(`/${team.slug}`);
  if (team.parentId) {
    const parent = await prisma.team.findUnique({ where: { id: team.parentId } });
    if (parent) revalidatePath(`/${parent.slug}`);
  }
}
