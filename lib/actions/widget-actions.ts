'use server';

import { prisma } from '@/lib/prisma';
import { requireTeamAccess } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function addWidgetToTeam(
  teamId: string,
  widgetDefinitionId: string
) {
  const user = await requireTeamAccess(teamId);
  const count = await prisma.widgetInstance.count({ where: { teamId } });

  const instance = await prisma.widgetInstance.create({
    data: {
      teamId,
      widgetDefinitionId,
      sortOrder: count,
    },
    include: {
      widgetDefinition: { select: { id: true, widgetType: true, label: true, icon: true } },
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'ADD_WIDGET',
      entity: 'WidgetInstance',
      entityId: instance.id,
      changes: { widgetDefinitionId },
    },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: teamId } });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${teamId}`);
  return instance;
}

export async function removeWidgetFromTeam(instanceId: string) {
  const instance = await prisma.widgetInstance.findUniqueOrThrow({
    where: { id: instanceId },
  });
  const user = await requireTeamAccess(instance.teamId);

  await prisma.widgetInstance.delete({ where: { id: instanceId } });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'REMOVE_WIDGET',
      entity: 'WidgetInstance',
      entityId: instanceId,
      changes: instance,
    },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: instance.teamId } });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${instance.teamId}`);
}

export async function reorderWidgets(
  teamId: string,
  orderedInstanceIds: string[]
) {
  const user = await requireTeamAccess(teamId);

  await prisma.$transaction(
    orderedInstanceIds.map((id, index) =>
      prisma.widgetInstance.update({
        where: { id },
        data: { sortOrder: index },
      })
    )
  );

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'REORDER_WIDGETS',
      entity: 'Team',
      entityId: teamId,
      changes: { order: orderedInstanceIds },
    },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: teamId } });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${teamId}`);
}

const DEFAULT_WIDGET_TYPES = [
  'page_header',
  'portfolios',
  'team_tabs',
  'ongoing_projects',
  'team_members',
];

export async function resetWidgetsToDefault(teamId: string) {
  const user = await requireTeamAccess(teamId);

  // Delete all existing instances
  await prisma.widgetInstance.deleteMany({ where: { teamId } });

  // Look up definitions for the defaults
  const defs = await prisma.widgetDefinition.findMany({
    where: { widgetType: { in: DEFAULT_WIDGET_TYPES } },
  });
  const defMap = new Map(defs.map((d) => [d.widgetType, d]));

  // Create in order
  const instances = [];
  for (let i = 0; i < DEFAULT_WIDGET_TYPES.length; i++) {
    const def = defMap.get(DEFAULT_WIDGET_TYPES[i]);
    if (!def) continue;
    const inst = await prisma.widgetInstance.create({
      data: { teamId, widgetDefinitionId: def.id, sortOrder: i },
      include: {
        widgetDefinition: {
          select: { id: true, widgetType: true, label: true, icon: true },
        },
      },
    });
    instances.push(inst);
  }

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'RESET_WIDGETS',
      entity: 'Team',
      entityId: teamId,
      changes: { resetTo: DEFAULT_WIDGET_TYPES },
    },
  });

  const team = await prisma.team.findUniqueOrThrow({
    where: { id: teamId },
  });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${teamId}`);
  return instances;
}

export async function updateWidgetConfig(
  instanceId: string,
  config: Record<string, string>
) {
  const instance = await prisma.widgetInstance.findUniqueOrThrow({
    where: { id: instanceId },
  });
  const user = await requireTeamAccess(instance.teamId);

  const updated = await prisma.widgetInstance.update({
    where: { id: instanceId },
    data: { config },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'UPDATE_WIDGET_CONFIG',
      entity: 'WidgetInstance',
      entityId: instanceId,
      changes: { before: instance.config, after: config },
    },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: instance.teamId } });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${instance.teamId}`);
  return updated;
}
