'use server';

import { prisma } from '@/lib/prisma';
import { requireSuperAdmin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function addProjectEditor(email: string) {
  const admin = await requireSuperAdmin();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('User not found. Add them via User Management first.');
  }

  const existing = await prisma.projectPermission.findUnique({
    where: { userId: user.id },
  });
  if (existing) {
    throw new Error('User already has project edit access.');
  }

  const permission = await prisma.projectPermission.create({
    data: { userId: user.id },
  });

  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: 'CREATE',
      entity: 'ProjectPermission',
      entityId: permission.id,
      description: `Granted project permission to '${email}'`,
      changes: { email, userName: user.name },
    },
  });

  revalidatePath('/admin/project-editors');
  return permission;
}

export async function removeProjectEditor(permissionId: string) {
  const admin = await requireSuperAdmin();

  const permission = await prisma.projectPermission.findUniqueOrThrow({
    where: { id: permissionId },
    include: { user: { select: { email: true, name: true } } },
  });

  await prisma.projectPermission.delete({
    where: { id: permissionId },
  });

  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: 'DELETE',
      entity: 'ProjectPermission',
      entityId: permissionId,
      description: `Revoked project permission from '${permission.user.email}'`,
      changes: { email: permission.user.email, name: permission.user.name },
    },
  });

  revalidatePath('/admin/project-editors');
}
