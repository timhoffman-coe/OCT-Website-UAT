'use server';

import { prisma } from '@/lib/prisma';
import { requireSuperAdmin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function addOctWebDevViewer(email: string) {
  const admin = await requireSuperAdmin();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('User not found. Add them via User Management first.');
  }

  const existing = await prisma.octWebDevPermission.findUnique({
    where: { userId: user.id },
  });
  if (existing) {
    throw new Error('User already has OCT-Web-Dev view access.');
  }

  const permission = await prisma.octWebDevPermission.create({
    data: { userId: user.id },
  });

  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: 'CREATE',
      entity: 'OctWebDevPermission',
      entityId: permission.id,
      changes: { email, userName: user.name },
    },
  });

  revalidatePath('/admin/oct-web-dev-viewers');
  return permission;
}

export async function removeOctWebDevViewer(permissionId: string) {
  const admin = await requireSuperAdmin();

  const permission = await prisma.octWebDevPermission.findUniqueOrThrow({
    where: { id: permissionId },
    include: { user: { select: { email: true, name: true } } },
  });

  await prisma.octWebDevPermission.delete({
    where: { id: permissionId },
  });

  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: 'DELETE',
      entity: 'OctWebDevPermission',
      entityId: permissionId,
      changes: { email: permission.user.email, name: permission.user.name },
    },
  });

  revalidatePath('/admin/oct-web-dev-viewers');
}
