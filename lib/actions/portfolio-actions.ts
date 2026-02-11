'use server';

import { prisma } from '@/lib/prisma';
import { requireTeamAccess } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function createPortfolio(
  teamId: string,
  data: {
    iconName: string;
    title: string;
    description: string;
    href: string;
  }
) {
  const user = await requireTeamAccess(teamId);
  const count = await prisma.portfolio.count({ where: { teamId } });

  const portfolio = await prisma.portfolio.create({
    data: { ...data, teamId, sortOrder: count },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'CREATE',
      entity: 'Portfolio',
      entityId: portfolio.id,
      changes: data,
    },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: teamId } });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${teamId}`);
  return portfolio;
}

export async function updatePortfolio(
  portfolioId: string,
  data: {
    iconName?: string;
    title?: string;
    description?: string;
    href?: string;
    sortOrder?: number;
  }
) {
  const before = await prisma.portfolio.findUniqueOrThrow({
    where: { id: portfolioId },
  });
  const user = await requireTeamAccess(before.teamId);

  const updated = await prisma.portfolio.update({
    where: { id: portfolioId },
    data,
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'UPDATE',
      entity: 'Portfolio',
      entityId: portfolioId,
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

export async function deletePortfolio(portfolioId: string) {
  const portfolio = await prisma.portfolio.findUniqueOrThrow({
    where: { id: portfolioId },
  });
  const user = await requireTeamAccess(portfolio.teamId);

  await prisma.portfolio.delete({ where: { id: portfolioId } });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'DELETE',
      entity: 'Portfolio',
      entityId: portfolioId,
      changes: portfolio,
    },
  });

  const team = await prisma.team.findUniqueOrThrow({
    where: { id: portfolio.teamId },
  });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${portfolio.teamId}`);
}
