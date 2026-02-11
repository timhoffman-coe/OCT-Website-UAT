'use server';

import { prisma } from '@/lib/prisma';
import { requireSuperAdmin } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import type { Role } from '@prisma/client';

export async function createUser(data: {
  email: string;
  name: string;
  role: Role;
  teamIds?: string[];
}) {
  const admin = await requireSuperAdmin();
  const { teamIds, ...userData } = data;

  const user = await prisma.user.create({
    data: {
      ...userData,
      teamPermissions: teamIds
        ? { create: teamIds.map((teamId) => ({ teamId })) }
        : undefined,
    },
    include: { teamPermissions: true },
  });

  await prisma.auditLog.create({
    data: { userId: admin.id, action: 'CREATE', entity: 'User', entityId: user.id, changes: data },
  });

  revalidatePath('/admin/users');
  return user;
}

export async function updateUser(
  userId: string,
  data: {
    name?: string;
    role?: Role;
    teamIds?: string[];
  }
) {
  const admin = await requireSuperAdmin();
  const { teamIds, ...userData } = data;

  // Update user fields
  const updated = await prisma.user.update({
    where: { id: userId },
    data: userData,
  });

  // If teamIds provided, replace permissions
  if (teamIds !== undefined) {
    await prisma.teamPermission.deleteMany({ where: { userId } });
    if (teamIds.length > 0) {
      await prisma.teamPermission.createMany({
        data: teamIds.map((teamId) => ({ userId, teamId })),
      });
    }
  }

  await prisma.auditLog.create({
    data: { userId: admin.id, action: 'UPDATE', entity: 'User', entityId: userId, changes: data },
  });

  revalidatePath('/admin/users');
  return updated;
}

export async function deleteUser(userId: string) {
  const admin = await requireSuperAdmin();
  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });

  await prisma.user.delete({ where: { id: userId } });

  await prisma.auditLog.create({
    data: { userId: admin.id, action: 'DELETE', entity: 'User', entityId: userId, changes: user },
  });

  revalidatePath('/admin/users');
}
