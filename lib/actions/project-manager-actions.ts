'use server';

import { prisma } from '@/lib/prisma';
import { requireProjectAccess } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function assignProjectManager(projectId: string, email: string) {
  const admin = await requireProjectAccess();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('User not found. Add them via User Management first.');
  }

  const existing = await prisma.projectManagerAssignment.findUnique({
    where: { userId_projectId: { userId: user.id, projectId } },
  });
  if (existing) {
    throw new Error('User is already assigned as a manager for this project.');
  }

  const assignment = await prisma.projectManagerAssignment.create({
    data: { userId: user.id, projectId },
  });

  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: 'CREATE',
      entity: 'ProjectManagerAssignment',
      entityId: assignment.id,
      description: `Assigned '${email}' as project manager`,
      changes: { email, userName: user.name, projectId },
    },
  });

  revalidatePath(`/admin/projects/${projectId}`);
  return assignment;
}

export async function removeProjectManager(assignmentId: string) {
  const admin = await requireProjectAccess();

  const assignment = await prisma.projectManagerAssignment.findUniqueOrThrow({
    where: { id: assignmentId },
    include: { user: { select: { email: true, name: true } } },
  });

  await prisma.projectManagerAssignment.delete({
    where: { id: assignmentId },
  });

  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: 'DELETE',
      entity: 'ProjectManagerAssignment',
      entityId: assignmentId,
      description: `Removed '${assignment.user.email}' as project manager`,
      changes: { email: assignment.user.email, name: assignment.user.name, projectId: assignment.projectId },
    },
  });

  revalidatePath(`/admin/projects/${assignment.projectId}`);
}
