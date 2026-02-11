'use server';

import { prisma } from '@/lib/prisma';
import { requireTeamAccess } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function createTeamMember(
  teamId: string,
  data: { name: string; title: string; email: string }
) {
  const user = await requireTeamAccess(teamId);
  const count = await prisma.teamMember.count({ where: { teamId } });

  const member = await prisma.teamMember.create({
    data: { ...data, teamId, sortOrder: count },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'CREATE',
      entity: 'TeamMember',
      entityId: member.id,
      changes: data,
    },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: teamId } });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${teamId}`);
  return member;
}

export async function updateTeamMember(
  memberId: string,
  data: { name?: string; title?: string; email?: string; sortOrder?: number }
) {
  const before = await prisma.teamMember.findUniqueOrThrow({
    where: { id: memberId },
  });
  const user = await requireTeamAccess(before.teamId);

  const updated = await prisma.teamMember.update({
    where: { id: memberId },
    data,
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'UPDATE',
      entity: 'TeamMember',
      entityId: memberId,
      changes: { before, after: updated },
    },
  });

  const team = await prisma.team.findUniqueOrThrow({
    where: { id: before.teamId },
  });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${before.teamId}`);
  return updated;
}

export async function deleteTeamMember(memberId: string) {
  const member = await prisma.teamMember.findUniqueOrThrow({
    where: { id: memberId },
  });
  const user = await requireTeamAccess(member.teamId);

  await prisma.teamMember.delete({ where: { id: memberId } });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'DELETE',
      entity: 'TeamMember',
      entityId: memberId,
      changes: member,
    },
  });

  const team = await prisma.team.findUniqueOrThrow({
    where: { id: member.teamId },
  });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${member.teamId}`);
}
