'use server';

import { prisma } from '@/lib/prisma';
import { requireTeamAccess } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function createWhoWeAreItem(
  teamId: string,
  data: {
    title: string;
    description: string;
    linkText?: string;
    linkUrl: string;
  }
) {
  const user = await requireTeamAccess(teamId);
  const count = await prisma.whoWeAreItem.count({ where: { teamId } });

  const item = await prisma.whoWeAreItem.create({
    data: { ...data, teamId, sortOrder: count },
  });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'CREATE', entity: 'WhoWeAreItem', entityId: item.id, description: `Created who we are item '${data.title}'`, changes: data },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: teamId } });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${teamId}`);
  return item;
}

export async function updateWhoWeAreItem(
  itemId: string,
  data: {
    title?: string;
    description?: string;
    linkText?: string;
    linkUrl?: string;
    sortOrder?: number;
  }
) {
  const before = await prisma.whoWeAreItem.findUniqueOrThrow({ where: { id: itemId } });
  const user = await requireTeamAccess(before.teamId);

  const updated = await prisma.whoWeAreItem.update({ where: { id: itemId }, data });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'UPDATE', entity: 'WhoWeAreItem', entityId: itemId, description: `Updated who we are item '${before.title}'`, changes: { before, after: updated } },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: before.teamId } });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${before.teamId}`);
  return updated;
}

export async function deleteWhoWeAreItem(itemId: string) {
  const item = await prisma.whoWeAreItem.findUniqueOrThrow({ where: { id: itemId } });
  const user = await requireTeamAccess(item.teamId);

  await prisma.whoWeAreItem.delete({ where: { id: itemId } });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'DELETE', entity: 'WhoWeAreItem', entityId: itemId, description: `Deleted who we are item '${item.title}'`, changes: item },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: item.teamId } });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${item.teamId}`);
}
