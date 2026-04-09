'use server';

import { prisma } from '@/lib/prisma';
import { requireProjectAccess, requireProjectEditAccess } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import type { ProjectStatus } from '@prisma/client';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// ============================================================
// PROJECT CRUD
// ============================================================

export interface CreateProjectData {
  title: string;
  description?: string;
  projectCode?: string;
  status?: ProjectStatus;
}

export async function createProject(data: CreateProjectData) {
  const user = await requireProjectAccess();

  let slug = generateSlug(data.title);
  const existing = await prisma.project.findUnique({ where: { slug } });
  if (existing) {
    slug = `${slug}-${Date.now()}`;
  }

  const project = await prisma.project.create({
    data: {
      slug,
      title: data.title,
      description: data.description || '',
      projectCode: data.projectCode || '',
      status: data.status || 'PLANNING',
    },
  });

  // Create default widget instances
  const PROJECT_DEFAULT_WIDGETS = [
    'project_header', 'project_governance', 'project_objectives',
    'project_financial', 'project_timeline', 'project_status_updates',
  ];
  const defs = await prisma.widgetDefinition.findMany({
    where: { widgetType: { in: PROJECT_DEFAULT_WIDGETS } },
  });
  const defMap = new Map(defs.map((d) => [d.widgetType, d]));
  for (let i = 0; i < PROJECT_DEFAULT_WIDGETS.length; i++) {
    const def = defMap.get(PROJECT_DEFAULT_WIDGETS[i]);
    if (def) {
      await prisma.widgetInstance.create({
        data: { projectId: project.id, widgetDefinitionId: def.id, sortOrder: i },
      });
    }
  }

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'CREATE',
      entity: 'Project',
      entityId: project.id,
      description: `Created project '${data.title}'`,
      changes: { title: data.title, slug },
    },
  });

  revalidatePath('/projects');
  revalidatePath('/admin/projects');
  return project;
}

export interface UpdateProjectData {
  title?: string;
  description?: string;
  projectCode?: string;
  status?: ProjectStatus;
  department?: string;
  branch?: string;
  projectSponsor?: string;
  projectManager?: string;
  octProgramManager?: string;
  octltRepresentative?: string;
  programManagerBusiness?: string;
  totalBudget?: string;
  fundingSources?: string;
  expenditureAuthority?: string;
  startDate?: string | null;
  endDate?: string | null;
  progress?: number;
}

export async function updateProject(projectId: string, data: UpdateProjectData) {
  const user = await requireProjectEditAccess(projectId);

  const updateData: Record<string, unknown> = { ...data };

  if (data.startDate !== undefined) {
    updateData.startDate = data.startDate ? new Date(data.startDate) : null;
  }
  if (data.endDate !== undefined) {
    updateData.endDate = data.endDate ? new Date(data.endDate) : null;
  }

  const project = await prisma.project.update({
    where: { id: projectId },
    data: updateData,
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'UPDATE',
      entity: 'Project',
      entityId: projectId,
      description: `Updated project '${project.title}'`,
      changes: JSON.parse(JSON.stringify(data)),
    },
  });

  revalidatePath('/projects');
  revalidatePath(`/projects/${project.slug}`);
  revalidatePath('/admin/projects');
  revalidatePath(`/admin/projects/${projectId}`);
  return project;
}

export async function publishProject(projectId: string) {
  const user = await requireProjectEditAccess(projectId);

  const project = await prisma.project.update({
    where: { id: projectId },
    data: { isPublished: true },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'UPDATE',
      entity: 'Project',
      entityId: projectId,
      description: `Published project '${project.title}'`,
      changes: { isPublished: true },
    },
  });

  revalidatePath('/projects');
  revalidatePath(`/projects/${project.slug}`);
  revalidatePath('/admin/projects');
}

export async function unpublishProject(projectId: string) {
  const user = await requireProjectEditAccess(projectId);

  const project = await prisma.project.update({
    where: { id: projectId },
    data: { isPublished: false },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'UPDATE',
      entity: 'Project',
      entityId: projectId,
      description: `Unpublished project '${project.title}'`,
      changes: { isPublished: false },
    },
  });

  revalidatePath('/projects');
  revalidatePath(`/projects/${project.slug}`);
  revalidatePath('/admin/projects');
}

export async function archiveProject(projectId: string) {
  const user = await requireProjectAccess();

  const project = await prisma.project.update({
    where: { id: projectId },
    data: { archivedAt: new Date(), isPublished: false },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'DELETE',
      entity: 'Project',
      entityId: projectId,
      description: `Archived project '${project.title}'`,
      changes: { archivedAt: new Date().toISOString() },
    },
  });

  revalidatePath('/projects');
  revalidatePath('/admin/projects');
}

// ============================================================
// MILESTONES
// ============================================================

export interface MilestoneData {
  name: string;
  date?: string | null;
  status?: string;
  sortOrder?: number;
}

export async function addMilestone(projectId: string, data: MilestoneData) {
  const user = await requireProjectEditAccess(projectId);

  const milestone = await prisma.projectMilestone.create({
    data: {
      projectId,
      name: data.name,
      date: data.date ? new Date(data.date) : null,
      status: data.status || 'upcoming',
      sortOrder: data.sortOrder ?? 0,
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'CREATE',
      entity: 'ProjectMilestone',
      entityId: milestone.id,
      description: `Added milestone '${data.name}'`,
      changes: { projectId, ...data },
    },
  });

  revalidatePath(`/admin/projects/${projectId}`);
  return milestone;
}

export async function updateMilestone(milestoneId: string, projectId: string, data: MilestoneData) {
  const user = await requireProjectEditAccess(projectId);

  const milestone = await prisma.projectMilestone.update({
    where: { id: milestoneId },
    data: {
      name: data.name,
      date: data.date ? new Date(data.date) : null,
      status: data.status,
      sortOrder: data.sortOrder,
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'UPDATE',
      entity: 'ProjectMilestone',
      entityId: milestoneId,
      description: `Updated milestone '${data.name}'`,
      changes: JSON.parse(JSON.stringify(data)),
    },
  });

  revalidatePath(`/admin/projects/${projectId}`);
  return milestone;
}

export async function deleteMilestone(milestoneId: string, projectId: string) {
  const user = await requireProjectEditAccess(projectId);

  const milestone = await prisma.projectMilestone.delete({
    where: { id: milestoneId },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'DELETE',
      entity: 'ProjectMilestone',
      entityId: milestoneId,
      description: `Deleted milestone '${milestone.name}'`,
      changes: { projectId },
    },
  });

  revalidatePath(`/admin/projects/${projectId}`);
}

// ============================================================
// OBJECTIVES
// ============================================================

export interface ObjectiveData {
  title: string;
  description: string;
  iconName?: string;
  sortOrder?: number;
}

export async function addObjective(projectId: string, data: ObjectiveData) {
  const user = await requireProjectEditAccess(projectId);

  const objective = await prisma.projectObjective.create({
    data: {
      projectId,
      title: data.title,
      description: data.description,
      iconName: data.iconName || null,
      sortOrder: data.sortOrder ?? 0,
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'CREATE',
      entity: 'ProjectObjective',
      entityId: objective.id,
      description: `Added objective '${data.title}'`,
      changes: { projectId, ...data },
    },
  });

  revalidatePath(`/admin/projects/${projectId}`);
  return objective;
}

export async function updateObjective(objectiveId: string, projectId: string, data: ObjectiveData) {
  const user = await requireProjectEditAccess(projectId);

  const objective = await prisma.projectObjective.update({
    where: { id: objectiveId },
    data: {
      title: data.title,
      description: data.description,
      iconName: data.iconName || null,
      sortOrder: data.sortOrder,
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'UPDATE',
      entity: 'ProjectObjective',
      entityId: objectiveId,
      description: `Updated objective '${data.title}'`,
      changes: JSON.parse(JSON.stringify(data)),
    },
  });

  revalidatePath(`/admin/projects/${projectId}`);
  return objective;
}

export async function deleteObjective(objectiveId: string, projectId: string) {
  const user = await requireProjectEditAccess(projectId);

  const objective = await prisma.projectObjective.delete({
    where: { id: objectiveId },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'DELETE',
      entity: 'ProjectObjective',
      entityId: objectiveId,
      description: `Deleted objective '${objective.title}'`,
      changes: { projectId },
    },
  });

  revalidatePath(`/admin/projects/${projectId}`);
}

// ============================================================
// STATUS UPDATES
// ============================================================

export async function addStatusUpdate(projectId: string, content: string) {
  const user = await requireProjectEditAccess(projectId);

  const update = await prisma.projectStatusUpdate.create({
    data: { projectId, content },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'CREATE',
      entity: 'ProjectStatusUpdate',
      entityId: update.id,
      description: `Added status update to project`,
      changes: { projectId, content: content.substring(0, 100) },
    },
  });

  const project = await prisma.project.findUnique({ where: { id: projectId }, select: { slug: true } });
  revalidatePath(`/admin/projects/${projectId}`);
  if (project) revalidatePath(`/projects/${project.slug}`);
  return update;
}

export async function deleteStatusUpdate(updateId: string, projectId: string) {
  const user = await requireProjectEditAccess(projectId);

  await prisma.projectStatusUpdate.delete({
    where: { id: updateId },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'DELETE',
      entity: 'ProjectStatusUpdate',
      entityId: updateId,
      description: `Deleted status update`,
      changes: { projectId },
    },
  });

  revalidatePath(`/admin/projects/${projectId}`);
}

// ============================================================
// TAGS
// ============================================================

export async function updateProjectTags(projectId: string, tagIds: string[]) {
  const user = await requireProjectEditAccess(projectId);

  await prisma.projectTagAssignment.deleteMany({ where: { projectId } });

  if (tagIds.length > 0) {
    await prisma.projectTagAssignment.createMany({
      data: tagIds.map((tagId) => ({ projectId, tagId })),
    });
  }

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'UPDATE',
      entity: 'Project',
      entityId: projectId,
      description: `Updated project tags`,
      changes: { tagIds },
    },
  });

  const project = await prisma.project.findUnique({ where: { id: projectId }, select: { slug: true } });
  revalidatePath(`/admin/projects/${projectId}`);
  if (project) revalidatePath(`/projects/${project.slug}`);
}
