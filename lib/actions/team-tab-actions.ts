'use server';

import { prisma } from '@/lib/prisma';
import { requireTeamAccess } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function createTeamTab(
  teamId: string,
  data: {
    tabId: string;
    label: string;
    videoTitle: string;
    videoDescription: string;
    videoUrl: string;
    diagramsTitle: string;
    diagramsDescription: string;
    diagramLinks?: { label: string; href: string }[];
  }
) {
  const user = await requireTeamAccess(teamId);
  const count = await prisma.teamTab.count({ where: { teamId } });

  const { diagramLinks, ...tabData } = data;
  const tab = await prisma.teamTab.create({
    data: {
      ...tabData,
      teamId,
      sortOrder: count,
      diagramLinks: diagramLinks
        ? { create: diagramLinks.map((d, i) => ({ ...d, sortOrder: i })) }
        : undefined,
    },
    include: { diagramLinks: true },
  });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'CREATE', entity: 'TeamTab', entityId: tab.id, changes: data },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: teamId } });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${teamId}`);
  return tab;
}

export async function updateTeamTab(
  tabId: string,
  data: {
    label?: string;
    videoTitle?: string;
    videoDescription?: string;
    videoUrl?: string;
    diagramsTitle?: string;
    diagramsDescription?: string;
    sortOrder?: number;
  }
) {
  const before = await prisma.teamTab.findUniqueOrThrow({ where: { id: tabId } });
  const user = await requireTeamAccess(before.teamId);

  const updated = await prisma.teamTab.update({ where: { id: tabId }, data });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'UPDATE', entity: 'TeamTab', entityId: tabId, changes: { before, after: updated } },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: before.teamId } });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${before.teamId}`);
  return updated;
}

export async function deleteTeamTab(tabId: string) {
  const tab = await prisma.teamTab.findUniqueOrThrow({ where: { id: tabId } });
  const user = await requireTeamAccess(tab.teamId);

  await prisma.teamTab.delete({ where: { id: tabId } });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'DELETE', entity: 'TeamTab', entityId: tabId, changes: tab },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: tab.teamId } });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${tab.teamId}`);
}

export async function updateDiagramLinks(
  tabId: string,
  links: { label: string; href: string }[]
) {
  const tab = await prisma.teamTab.findUniqueOrThrow({ where: { id: tabId } });
  const user = await requireTeamAccess(tab.teamId);

  // Delete existing and recreate
  await prisma.diagramLink.deleteMany({ where: { teamTabId: tabId } });
  await prisma.diagramLink.createMany({
    data: links.map((l, i) => ({ ...l, teamTabId: tabId, sortOrder: i })),
  });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'UPDATE', entity: 'DiagramLinks', entityId: tabId, changes: { links } },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: tab.teamId } });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${tab.teamId}`);
}
