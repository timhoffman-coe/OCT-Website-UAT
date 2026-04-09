'use server';

import { prisma } from '@/lib/prisma';
import { requireTeamAccess } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { isWidgetAllowedForTemplate } from '@/lib/widget-template-map';

export async function addWidgetToTeam(
  teamId: string,
  widgetDefinitionId: string
) {
  const user = await requireTeamAccess(teamId);

  const [team, widgetDef] = await Promise.all([
    prisma.team.findUniqueOrThrow({
      where: { id: teamId },
      select: { pageTemplate: true, slug: true, teamName: true },
    }),
    prisma.widgetDefinition.findUniqueOrThrow({
      where: { id: widgetDefinitionId },
      select: { widgetType: true },
    }),
  ]);

  if (!isWidgetAllowedForTemplate(widgetDef.widgetType, team.pageTemplate)) {
    throw new Error(
      `Widget "${widgetDef.widgetType}" is not allowed on ${team.pageTemplate} pages`
    );
  }

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
      description: `Added widget '${widgetDef.widgetType}' to '${team.teamName}'`,
      changes: { widgetDefinitionId },
    },
  });

  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${teamId}`);
  return instance;
}

export async function removeWidgetFromTeam(instanceId: string) {
  const instance = await prisma.widgetInstance.findUniqueOrThrow({
    where: { id: instanceId },
    include: {
      widgetDefinition: { select: { widgetType: true } },
    },
  });
  if (!instance.teamId) throw new Error('Widget is not on a team');
  const user = await requireTeamAccess(instance.teamId);

  const team = await prisma.team.findUniqueOrThrow({ where: { id: instance.teamId } });

  await prisma.widgetInstance.delete({ where: { id: instanceId } });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'REMOVE_WIDGET',
      entity: 'WidgetInstance',
      entityId: instanceId,
      description: `Removed widget '${instance.widgetDefinition.widgetType}' from '${team.teamName}'`,
      changes: JSON.parse(JSON.stringify(instance)),
    },
  });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${instance.teamId}`);
}

export async function reorderWidgets(
  teamId: string,
  orderedInstanceIds: string[]
) {
  const user = await requireTeamAccess(teamId);
  const team = await prisma.team.findUniqueOrThrow({ where: { id: teamId } });

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
      description: `Reordered widgets on '${team.teamName}'`,
      changes: { order: orderedInstanceIds },
    },
  });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${teamId}`);
}

const ITS_TEAM_DEFAULT_WIDGETS = [
  'page_header',
  'portfolios',
  'team_tabs',
  'ongoing_projects',
  'team_members',
];

const SECTION_DEFAULT_WIDGETS = ['service_areas'];

const SUB_TEAM_DEFAULT_WIDGETS = [
  'subteam_header',
  'subteam_services',
  'subteam_initiatives',
  'subteam_contacts',
  'subteam_quick_links',
];

export async function resetWidgetsToDefault(teamId: string) {
  const user = await requireTeamAccess(teamId);

  const team = await prisma.team.findUniqueOrThrow({ where: { id: teamId } });
  const defaults = team.pageTemplate === 'SECTION'
    ? SECTION_DEFAULT_WIDGETS
    : team.pageTemplate === 'SUB_TEAM'
      ? SUB_TEAM_DEFAULT_WIDGETS
      : ITS_TEAM_DEFAULT_WIDGETS;

  // Delete all existing instances
  await prisma.widgetInstance.deleteMany({ where: { teamId } });

  // Look up definitions for the defaults
  const defs = await prisma.widgetDefinition.findMany({
    where: { widgetType: { in: defaults } },
  });
  const defMap = new Map(defs.map((d) => [d.widgetType, d]));

  // Create in order
  const instances = [];
  for (let i = 0; i < defaults.length; i++) {
    const def = defMap.get(defaults[i]);
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
      description: `Reset widgets to defaults on '${team.teamName}'`,
      changes: { resetTo: defaults },
    },
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
    include: {
      widgetDefinition: { select: { widgetType: true } },
    },
  });
  if (!instance.teamId) throw new Error('Widget is not on a team');
  const user = await requireTeamAccess(instance.teamId);

  const team = await prisma.team.findUniqueOrThrow({ where: { id: instance.teamId } });

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
      description: `Updated config for widget '${instance.widgetDefinition.widgetType}' on '${team.teamName}'`,
      changes: { before: instance.config, after: config },
    },
  });
  revalidatePath(`/${team.slug}`);
  revalidatePath(`/admin/teams/${instance.teamId}`);
  return updated;
}
