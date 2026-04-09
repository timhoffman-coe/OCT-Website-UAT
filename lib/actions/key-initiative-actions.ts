'use server';

import { prisma } from '@/lib/prisma';
import { requireTeamAccess } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function createKeyInitiativeSlide(
  teamId: string,
  data: {
    title: string;
    description: string;
    imageUrl?: string;
    imageAlt?: string;
  }
) {
  const user = await requireTeamAccess(teamId);
  const count = await prisma.keyInitiativeSlide.count({ where: { teamId } });

  const slide = await prisma.keyInitiativeSlide.create({
    data: { ...data, teamId, sortOrder: count },
  });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'CREATE', entity: 'KeyInitiativeSlide', entityId: slide.id, description: `Created key initiative '${data.title}'`, changes: data },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: teamId } });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${teamId}`);
  return slide;
}

export async function updateKeyInitiativeSlide(
  slideId: string,
  data: {
    title?: string;
    description?: string;
    imageUrl?: string;
    imageAlt?: string;
    sortOrder?: number;
  }
) {
  const before = await prisma.keyInitiativeSlide.findUniqueOrThrow({ where: { id: slideId } });
  const user = await requireTeamAccess(before.teamId);

  const updated = await prisma.keyInitiativeSlide.update({ where: { id: slideId }, data });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'UPDATE', entity: 'KeyInitiativeSlide', entityId: slideId, description: `Updated key initiative '${before.title}'`, changes: { before, after: updated } },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: before.teamId } });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${before.teamId}`);
  return updated;
}

export async function deleteKeyInitiativeSlide(slideId: string) {
  const slide = await prisma.keyInitiativeSlide.findUniqueOrThrow({ where: { id: slideId } });
  const user = await requireTeamAccess(slide.teamId);

  await prisma.keyInitiativeSlide.delete({ where: { id: slideId } });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'DELETE', entity: 'KeyInitiativeSlide', entityId: slideId, description: `Deleted key initiative '${slide.title}'`, changes: slide },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: slide.teamId } });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${slide.teamId}`);
}
