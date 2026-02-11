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

export async function deleteTeam(teamId: string) {
  const user = await requireSuperAdmin();
  const team = await prisma.team.findUniqueOrThrow({ where: { id: teamId } });

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
}
