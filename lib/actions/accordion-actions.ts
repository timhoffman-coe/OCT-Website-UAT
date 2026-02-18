'use server';

import { prisma } from '@/lib/prisma';
import { requireTeamAccess } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

// ── AccordionGroup CRUD ─────────────────────────────────

export async function createAccordionGroup(
  teamId: string,
  data: { groupId: string; title: string }
) {
  const user = await requireTeamAccess(teamId);
  const count = await prisma.accordionGroup.count({ where: { teamId } });

  const group = await prisma.accordionGroup.create({
    data: { ...data, teamId, sortOrder: count },
  });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'CREATE', entity: 'AccordionGroup', entityId: group.id, changes: data },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: teamId } });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${teamId}`);
  return group;
}

export async function updateAccordionGroup(
  groupId: string,
  data: { title?: string; sortOrder?: number }
) {
  const before = await prisma.accordionGroup.findUniqueOrThrow({ where: { id: groupId } });
  if (!before.teamId) throw new Error('Group has no team');
  const user = await requireTeamAccess(before.teamId);

  const updated = await prisma.accordionGroup.update({ where: { id: groupId }, data });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'UPDATE', entity: 'AccordionGroup', entityId: groupId, changes: { before, after: updated } },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: before.teamId } });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${before.teamId}`);
  return updated;
}

export async function deleteAccordionGroup(groupId: string) {
  const group = await prisma.accordionGroup.findUniqueOrThrow({ where: { id: groupId } });
  if (!group.teamId) throw new Error('Group has no team');
  const user = await requireTeamAccess(group.teamId);

  await prisma.accordionGroup.delete({ where: { id: groupId } });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'DELETE', entity: 'AccordionGroup', entityId: groupId, changes: group },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: group.teamId } });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${group.teamId}`);
}

// ── AccordionLink CRUD ──────────────────────────────────

export async function createAccordionLink(
  accordionGroupId: string,
  data: { label: string; href: string }
) {
  const group = await prisma.accordionGroup.findUniqueOrThrow({ where: { id: accordionGroupId } });
  if (!group.teamId) throw new Error('Group has no team');
  const user = await requireTeamAccess(group.teamId);
  const count = await prisma.accordionLink.count({ where: { groupId: accordionGroupId } });

  const link = await prisma.accordionLink.create({
    data: { ...data, groupId: accordionGroupId, sortOrder: count },
  });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'CREATE', entity: 'AccordionLink', entityId: link.id, changes: data },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: group.teamId } });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${group.teamId}`);
  return link;
}

export async function updateAccordionLink(
  linkId: string,
  data: { label?: string; href?: string; sortOrder?: number }
) {
  const before = await prisma.accordionLink.findUniqueOrThrow({ where: { id: linkId } });
  const group = await prisma.accordionGroup.findUniqueOrThrow({ where: { id: before.groupId } });
  if (!group.teamId) throw new Error('Group has no team');
  const user = await requireTeamAccess(group.teamId);

  const updated = await prisma.accordionLink.update({ where: { id: linkId }, data });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'UPDATE', entity: 'AccordionLink', entityId: linkId, changes: { before, after: updated } },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: group.teamId } });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${group.teamId}`);
  return updated;
}

export async function deleteAccordionLink(linkId: string) {
  const link = await prisma.accordionLink.findUniqueOrThrow({ where: { id: linkId } });
  const group = await prisma.accordionGroup.findUniqueOrThrow({ where: { id: link.groupId } });
  if (!group.teamId) throw new Error('Group has no team');
  const user = await requireTeamAccess(group.teamId);

  await prisma.accordionLink.delete({ where: { id: linkId } });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'DELETE', entity: 'AccordionLink', entityId: linkId, changes: link },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: group.teamId } });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${group.teamId}`);
}
