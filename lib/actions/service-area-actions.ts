'use server';

import { prisma } from '@/lib/prisma';
import { requireTeamAccess } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { slugify } from '@/lib/slugify';

export async function createServiceArea(
  teamId: string,
  data: {
    title: string;
    shortDescription: string;
    fullDescription: string;
    features: string[];
    icon?: string;
  }
) {
  const user = await requireTeamAccess(teamId);
  const count = await prisma.serviceArea.count({ where: { teamId } });

  const serviceAreaId = slugify(data.title);
  if (!serviceAreaId) throw new Error('Title must contain at least one alphanumeric character.');

  // Auto-generate a unique slug for the linked child team
  let slug = serviceAreaId;
  let suffix = 2;
  while (await prisma.team.findUnique({ where: { slug } })) {
    slug = `${serviceAreaId}-${suffix}`;
    suffix++;
  }

  // Create linked child team as a draft
  const childTeam = await prisma.team.create({
    data: {
      slug,
      teamName: data.title,
      teamShortName: data.title,
      pageTemplate: 'ITS_TEAM',
      sortOrder: count,
      isPublished: false,
      parentId: teamId,
    },
  });

  // Create default widget instances for the child team
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
      data: { teamId: childTeam.id, widgetDefinitionId: def.id, sortOrder: i },
    });
  }

  // Create the service area card linked to the child team
  const area = await prisma.serviceArea.create({
    data: {
      ...data,
      serviceAreaId,
      teamId,
      sortOrder: count,
      link: `/${slug}`,
      linkedTeamId: childTeam.id,
    },
  });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'CREATE', entity: 'ServiceArea', entityId: area.id, changes: { ...data, linkedTeamId: childTeam.id } },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: teamId } });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${teamId}`);
  return area;
}

export async function updateServiceArea(
  areaId: string,
  data: {
    title?: string;
    shortDescription?: string;
    fullDescription?: string;
    features?: string[];
    icon?: string;
    sortOrder?: number;
  }
) {
  const before = await prisma.serviceArea.findUniqueOrThrow({ where: { id: areaId } });
  const user = await requireTeamAccess(before.teamId);

  const updated = await prisma.serviceArea.update({ where: { id: areaId }, data });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'UPDATE', entity: 'ServiceArea', entityId: areaId, changes: { before, after: updated } },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: before.teamId } });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${before.teamId}`);
  return updated;
}

export async function deleteServiceArea(areaId: string) {
  const area = await prisma.serviceArea.findUniqueOrThrow({ where: { id: areaId } });
  const user = await requireTeamAccess(area.teamId);

  // Cascade delete the linked child team (widget instances cascade from Team)
  if (area.linkedTeamId) {
    await prisma.team.delete({ where: { id: area.linkedTeamId } });
  }

  await prisma.serviceArea.delete({ where: { id: areaId } });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'DELETE', entity: 'ServiceArea', entityId: areaId, changes: area },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: area.teamId } });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${area.teamId}`);
}
