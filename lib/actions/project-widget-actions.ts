'use server';

import { prisma } from '@/lib/prisma';
import { requireProjectEditAccess } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { isWidgetAllowedForTemplate } from '@/lib/widget-template-map';

const PROJECT_DEFAULT_WIDGETS = [
  'project_header',
  'project_governance',
  'project_objectives',
  'project_financial',
  'project_timeline',
  'project_status_updates',
];

export async function addWidgetToProject(
  projectId: string,
  widgetDefinitionId: string
) {
  const user = await requireProjectEditAccess(projectId);

  const [project, widgetDef] = await Promise.all([
    prisma.project.findUniqueOrThrow({
      where: { id: projectId },
      select: { slug: true, title: true },
    }),
    prisma.widgetDefinition.findUniqueOrThrow({
      where: { id: widgetDefinitionId },
      select: { widgetType: true },
    }),
  ]);

  if (!isWidgetAllowedForTemplate(widgetDef.widgetType, 'PROJECT')) {
    throw new Error(
      `Widget "${widgetDef.widgetType}" is not allowed on PROJECT pages`
    );
  }

  const count = await prisma.widgetInstance.count({ where: { projectId } });

  const instance = await prisma.widgetInstance.create({
    data: {
      projectId,
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
      description: `Added widget '${widgetDef.widgetType}' to project '${project.title}'`,
      changes: { widgetDefinitionId },
    },
  });

  revalidatePath(`/projects/${project.slug}`);
  revalidatePath(`/admin/projects/${projectId}`);
  return instance;
}

export async function removeWidgetFromProject(instanceId: string) {
  const instance = await prisma.widgetInstance.findUniqueOrThrow({
    where: { id: instanceId },
    include: {
      widgetDefinition: { select: { widgetType: true } },
    },
  });
  if (!instance.projectId) throw new Error('Widget is not on a project');
  const user = await requireProjectEditAccess(instance.projectId);

  const project = await prisma.project.findUniqueOrThrow({ where: { id: instance.projectId } });

  await prisma.widgetInstance.delete({ where: { id: instanceId } });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'REMOVE_WIDGET',
      entity: 'WidgetInstance',
      entityId: instanceId,
      description: `Removed widget '${instance.widgetDefinition.widgetType}' from project '${project.title}'`,
      changes: JSON.parse(JSON.stringify(instance)),
    },
  });
  revalidatePath(`/projects/${project.slug}`);
  revalidatePath(`/admin/projects/${instance.projectId}`);
}

export async function reorderProjectWidgets(
  projectId: string,
  orderedInstanceIds: string[]
) {
  const user = await requireProjectEditAccess(projectId);
  const project = await prisma.project.findUniqueOrThrow({ where: { id: projectId } });

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
      entity: 'Project',
      entityId: projectId,
      description: `Reordered widgets on project '${project.title}'`,
      changes: { order: orderedInstanceIds },
    },
  });
  revalidatePath(`/projects/${project.slug}`);
  revalidatePath(`/admin/projects/${projectId}`);
}

export async function resetProjectWidgetsToDefault(projectId: string) {
  const user = await requireProjectEditAccess(projectId);
  const project = await prisma.project.findUniqueOrThrow({ where: { id: projectId } });

  await prisma.widgetInstance.deleteMany({ where: { projectId } });

  const defs = await prisma.widgetDefinition.findMany({
    where: { widgetType: { in: PROJECT_DEFAULT_WIDGETS } },
  });
  const defMap = new Map(defs.map((d) => [d.widgetType, d]));

  const instances = [];
  for (let i = 0; i < PROJECT_DEFAULT_WIDGETS.length; i++) {
    const def = defMap.get(PROJECT_DEFAULT_WIDGETS[i]);
    if (!def) continue;
    const inst = await prisma.widgetInstance.create({
      data: { projectId, widgetDefinitionId: def.id, sortOrder: i },
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
      entity: 'Project',
      entityId: projectId,
      description: `Reset widgets to defaults on project '${project.title}'`,
      changes: { resetTo: PROJECT_DEFAULT_WIDGETS },
    },
  });

  revalidatePath(`/projects/${project.slug}`);
  revalidatePath(`/admin/projects/${projectId}`);
  return instances;
}

export async function updateProjectWidgetConfig(
  instanceId: string,
  config: Record<string, string>
) {
  const instance = await prisma.widgetInstance.findUniqueOrThrow({
    where: { id: instanceId },
    include: {
      widgetDefinition: { select: { widgetType: true } },
    },
  });
  if (!instance.projectId) throw new Error('Widget is not on a project');
  const user = await requireProjectEditAccess(instance.projectId);

  const project = await prisma.project.findUniqueOrThrow({ where: { id: instance.projectId } });

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
      description: `Updated config for widget '${instance.widgetDefinition.widgetType}' on project '${project.title}'`,
      changes: { before: instance.config, after: config },
    },
  });
  revalidatePath(`/projects/${project.slug}`);
  revalidatePath(`/admin/projects/${instance.projectId}`);
  return updated;
}

export { PROJECT_DEFAULT_WIDGETS };
