'use server';

import { prisma } from '@/lib/prisma';
import { requireRoadmapAccess } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

interface ProjectData {
  name: string;
  owner: string;
  startYear: number;
  endYear: number;
  startQuarter: number;
  endQuarter: number;
  progress?: number;
  description?: string;
}

export async function createRoadmapProject(sectionId: string, data: ProjectData) {
  const user = await requireRoadmapAccess();

  const maxSort = await prisma.roadmapProject.aggregate({
    where: { sectionId },
    _max: { sortOrder: true },
  });

  const project = await prisma.roadmapProject.create({
    data: {
      sectionId,
      name: data.name,
      owner: data.owner,
      startYear: data.startYear,
      endYear: data.endYear,
      startQuarter: data.startQuarter,
      endQuarter: data.endQuarter,
      progress: data.progress ?? 0,
      description: data.description || null,
      sortOrder: (maxSort._max.sortOrder ?? 0) + 1,
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'CREATE',
      entity: 'RoadmapProject',
      entityId: project.id,
      changes: { sectionId, ...data },
    },
  });

  revalidatePath('/roadmap');
  return project;
}

export async function updateRoadmapProject(projectId: string, data: Partial<ProjectData>) {
  const user = await requireRoadmapAccess();

  const before = await prisma.roadmapProject.findUniqueOrThrow({
    where: { id: projectId },
  });

  const updated = await prisma.roadmapProject.update({
    where: { id: projectId },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.owner !== undefined && { owner: data.owner }),
      ...(data.startYear !== undefined && { startYear: data.startYear }),
      ...(data.endYear !== undefined && { endYear: data.endYear }),
      ...(data.startQuarter !== undefined && { startQuarter: data.startQuarter }),
      ...(data.endQuarter !== undefined && { endQuarter: data.endQuarter }),
      ...(data.progress !== undefined && { progress: data.progress }),
      ...(data.description !== undefined && { description: data.description || null }),
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'UPDATE',
      entity: 'RoadmapProject',
      entityId: projectId,
      changes: { before, after: updated },
    },
  });

  revalidatePath('/roadmap');
  return updated;
}

export async function deleteRoadmapProject(projectId: string) {
  const user = await requireRoadmapAccess();

  const project = await prisma.roadmapProject.findUniqueOrThrow({
    where: { id: projectId },
  });

  await prisma.roadmapProject.delete({
    where: { id: projectId },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'DELETE',
      entity: 'RoadmapProject',
      entityId: projectId,
      changes: project,
    },
  });

  revalidatePath('/roadmap');
}
