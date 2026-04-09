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
  }
) {
  const user = await requireTeamAccess(teamId);
  const team = await prisma.team.findUniqueOrThrow({ where: { id: teamId } });
  const count = await prisma.portfolio.count({ where: { teamId } });

  // Auto-generate slug from title
  const slug = data.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const href = `/${team.slug}/${slug}`;

  // Create linked sub-team
  const subTeam = await prisma.team.create({
    data: {
      slug,
      teamName: data.title,
      teamShortName: data.title,
      pageTemplate: 'SUB_TEAM',
      iconName: data.iconName,
      pageDescription: data.description,
      parentId: teamId,
      isPublished: false,
      sortOrder: count,
    },
  });

  // Create default widget instances for the sub-team
  const SUB_TEAM_DEFAULTS = ['subteam_header', 'subteam_services', 'subteam_initiatives', 'subteam_contacts', 'subteam_quick_links'];
  const widgetDefs = await prisma.widgetDefinition.findMany({
    where: { widgetType: { in: SUB_TEAM_DEFAULTS } },
  });
  const defByType = Object.fromEntries(widgetDefs.map((d) => [d.widgetType, d]));
  for (let i = 0; i < SUB_TEAM_DEFAULTS.length; i++) {
    const def = defByType[SUB_TEAM_DEFAULTS[i]];
    if (def) {
      await prisma.widgetInstance.create({
        data: { teamId: subTeam.id, widgetDefinitionId: def.id, sortOrder: i },
      });
    }
  }

  // Create the portfolio card linked to the sub-team
  const portfolio = await prisma.portfolio.create({
    data: {
      iconName: data.iconName,
      title: data.title,
      description: data.description,
      href,
      teamId,
      sortOrder: count,
      linkedTeamId: subTeam.id,
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'CREATE',
      entity: 'Portfolio',
      entityId: portfolio.id,
      description: `Created portfolio '${data.title}'`,
      changes: { ...data, linkedTeamId: subTeam.id },
    },
  });

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
      description: `Updated portfolio '${before.title}'`,
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

  // Delete linked sub-team if it exists (cascades to its content + widgets)
  if (portfolio.linkedTeamId) {
    await prisma.team.delete({ where: { id: portfolio.linkedTeamId } });
  }

  await prisma.portfolio.delete({ where: { id: portfolioId } });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'DELETE',
      entity: 'Portfolio',
      entityId: portfolioId,
      description: `Deleted portfolio '${portfolio.title}'`,
      changes: portfolio,
    },
  });

  const team = await prisma.team.findUniqueOrThrow({
    where: { id: portfolio.teamId },
  });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${portfolio.teamId}`);
}
