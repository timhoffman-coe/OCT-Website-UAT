'use server';

import { prisma } from '@/lib/prisma';
import { requireSuperAdmin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function getLinksEditors() {
  await requireSuperAdmin();

  return prisma.linksPermission.findMany({
    include: {
      user: { select: { id: true, email: true, name: true, role: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function addLinksEditor(email: string) {
  const admin = await requireSuperAdmin();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('User not found. Add them via User Management first.');
  }

  const existing = await prisma.linksPermission.findUnique({
    where: { userId: user.id },
  });
  if (existing) {
    throw new Error('User already has links edit access.');
  }

  const permission = await prisma.linksPermission.create({
    data: { userId: user.id },
  });

  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: 'CREATE',
      entity: 'LinksPermission',
      entityId: permission.id,
      description: `Granted links permission to '${email}'`,
      changes: { email, userName: user.name },
    },
  });

  revalidatePath('/admin/links-editors');
  return permission;
}

export async function removeLinksEditor(permissionId: string) {
  const admin = await requireSuperAdmin();

  const permission = await prisma.linksPermission.findUniqueOrThrow({
    where: { id: permissionId },
    include: { user: { select: { email: true, name: true } } },
  });

  await prisma.linksPermission.delete({
    where: { id: permissionId },
  });

  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: 'DELETE',
      entity: 'LinksPermission',
      entityId: permissionId,
      description: `Revoked links permission from '${permission.user.email}'`,
      changes: { email: permission.user.email, name: permission.user.name },
    },
  });

  revalidatePath('/admin/links-editors');
}
