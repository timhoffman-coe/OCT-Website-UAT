'use server';

import { prisma } from '@/lib/prisma';
import { requireSuperAdmin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function addNewsEditor(email: string) {
  const admin = await requireSuperAdmin();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('User not found. Add them via User Management first.');
  }

  const existing = await prisma.newsPermission.findUnique({
    where: { userId: user.id },
  });
  if (existing) {
    throw new Error('User already has news edit access.');
  }

  const permission = await prisma.newsPermission.create({
    data: { userId: user.id },
  });

  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: 'CREATE',
      entity: 'NewsPermission',
      entityId: permission.id,
      description: `Granted news permission to '${email}'`,
      changes: { email, userName: user.name },
    },
  });

  revalidatePath('/admin/news-editors');
  return permission;
}

export async function removeNewsEditor(permissionId: string) {
  const admin = await requireSuperAdmin();

  const permission = await prisma.newsPermission.findUniqueOrThrow({
    where: { id: permissionId },
    include: { user: { select: { email: true, name: true } } },
  });

  await prisma.newsPermission.delete({
    where: { id: permissionId },
  });

  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: 'DELETE',
      entity: 'NewsPermission',
      entityId: permissionId,
      description: `Revoked news permission from '${permission.user.email}'`,
      changes: { email: permission.user.email, name: permission.user.name },
    },
  });

  revalidatePath('/admin/news-editors');
}
