'use server';

import { prisma } from '@/lib/prisma';
import { requireSuperAdmin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function getRoadmapEditors() {
  await requireSuperAdmin();

  return prisma.roadmapPermission.findMany({
    include: {
      user: { select: { id: true, email: true, name: true, role: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function addRoadmapEditor(email: string) {
  const admin = await requireSuperAdmin();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('User not found. Add them via User Management first.');
  }

  const existing = await prisma.roadmapPermission.findUnique({
    where: { userId: user.id },
  });
  if (existing) {
    throw new Error('User already has roadmap edit access.');
  }

  const permission = await prisma.roadmapPermission.create({
    data: { userId: user.id },
  });

  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: 'CREATE',
      entity: 'RoadmapPermission',
      entityId: permission.id,
      changes: { email, userName: user.name },
    },
  });

  revalidatePath('/admin/roadmap-editors');
  return permission;
}

export async function removeRoadmapEditor(permissionId: string) {
  const admin = await requireSuperAdmin();

  const permission = await prisma.roadmapPermission.findUniqueOrThrow({
    where: { id: permissionId },
    include: { user: { select: { email: true, name: true } } },
  });

  await prisma.roadmapPermission.delete({
    where: { id: permissionId },
  });

  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: 'DELETE',
      entity: 'RoadmapPermission',
      entityId: permissionId,
      changes: { email: permission.user.email, name: permission.user.name },
    },
  });

  revalidatePath('/admin/roadmap-editors');
}
