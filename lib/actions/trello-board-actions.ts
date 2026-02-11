'use server';

import { prisma } from '@/lib/prisma';
import { requireTeamAccess } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function createTrelloBoard(
  teamId: string,
  data: { title: string; description: string; href: string }
) {
  const user = await requireTeamAccess(teamId);
  const count = await prisma.trelloBoard.count({ where: { teamId } });

  const board = await prisma.trelloBoard.create({
    data: { ...data, teamId, sortOrder: count },
  });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'CREATE', entity: 'TrelloBoard', entityId: board.id, changes: data },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: teamId } });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${teamId}`);
  return board;
}

export async function updateTrelloBoard(
  boardId: string,
  data: { title?: string; description?: string; href?: string; sortOrder?: number }
) {
  const before = await prisma.trelloBoard.findUniqueOrThrow({ where: { id: boardId } });
  const user = await requireTeamAccess(before.teamId);

  const updated = await prisma.trelloBoard.update({ where: { id: boardId }, data });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'UPDATE', entity: 'TrelloBoard', entityId: boardId, changes: { before, after: updated } },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: before.teamId } });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${before.teamId}`);
  return updated;
}

export async function deleteTrelloBoard(boardId: string) {
  const board = await prisma.trelloBoard.findUniqueOrThrow({ where: { id: boardId } });
  const user = await requireTeamAccess(board.teamId);

  await prisma.trelloBoard.delete({ where: { id: boardId } });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'DELETE', entity: 'TrelloBoard', entityId: boardId, changes: board },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: board.teamId } });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${board.teamId}`);
}
