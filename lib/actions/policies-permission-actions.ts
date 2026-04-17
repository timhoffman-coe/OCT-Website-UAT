'use server';

import { prisma } from '@/lib/prisma';
import { requireSuperAdmin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function getPoliciesEditors() {
  await requireSuperAdmin();

  return prisma.policiesPermission.findMany({
    include: {
      user: { select: { id: true, email: true, name: true, role: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function addPoliciesEditor(email: string) {
  const admin = await requireSuperAdmin();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('User not found. Add them via User Management first.');
  }

  const existing = await prisma.policiesPermission.findUnique({
    where: { userId: user.id },
  });
  if (existing) {
    throw new Error('User already has policies edit access.');
  }

  const permission = await prisma.policiesPermission.create({
    data: { userId: user.id },
  });

  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: 'CREATE',
      entity: 'PoliciesPermission',
      entityId: permission.id,
      description: `Granted policies permission to '${email}'`,
      changes: { email, userName: user.name },
    },
  });

  revalidatePath('/admin/policies-editors');
  return permission;
}

export async function removePoliciesEditor(permissionId: string) {
  const admin = await requireSuperAdmin();

  const permission = await prisma.policiesPermission.findUniqueOrThrow({
    where: { id: permissionId },
    include: { user: { select: { email: true, name: true } } },
  });

  await prisma.policiesPermission.delete({
    where: { id: permissionId },
  });

  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: 'DELETE',
      entity: 'PoliciesPermission',
      entityId: permissionId,
      description: `Revoked policies permission from '${permission.user.email}'`,
      changes: { email: permission.user.email, name: permission.user.name },
    },
  });

  revalidatePath('/admin/policies-editors');
}
