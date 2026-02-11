'use server';

import { prisma } from '@/lib/prisma';
import { requireTeamAccess } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function createServiceArea(
  teamId: string,
  data: {
    serviceAreaId: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    features: string[];
    icon?: string;
    link?: string;
  }
) {
  const user = await requireTeamAccess(teamId);
  const count = await prisma.serviceArea.count({ where: { teamId } });

  const area = await prisma.serviceArea.create({
    data: { ...data, teamId, sortOrder: count },
  });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'CREATE', entity: 'ServiceArea', entityId: area.id, changes: data },
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
    link?: string;
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

  await prisma.serviceArea.delete({ where: { id: areaId } });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'DELETE', entity: 'ServiceArea', entityId: areaId, changes: area },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: area.teamId } });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${area.teamId}`);
}
