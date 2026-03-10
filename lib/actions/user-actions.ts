'use server';

import { prisma } from '@/lib/prisma';
import { requireUser, requireSuperAdmin, getManageableTeamIds } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import type { Role } from '@prisma/client';

// Validate that a TEAM_ADMIN is only assigning teams within their manageable scope
async function validateTeamAdminScope(admin: { id: string; role: string; teamPermissions: { teamId: string }[] }, teamIds: string[], role?: Role) {
  if (admin.role === 'SUPER_ADMIN') return;

  if (role === 'SUPER_ADMIN') {
    throw new Error('Forbidden: Cannot assign Super Admin role');
  }

  if (teamIds.length > 0) {
    const userTeamIds = admin.teamPermissions.map((p) => p.teamId);
    const manageable = await getManageableTeamIds(userTeamIds);
    const unauthorized = teamIds.filter((id) => !manageable.includes(id));
    if (unauthorized.length > 0) {
      throw new Error('Forbidden: Cannot assign teams outside your scope');
    }
  }
}

export async function createUser(data: {
  email: string;
  name: string;
  role: Role;
  teamIds?: string[];
}) {
  const admin = await requireUser();
  if (admin.role !== 'SUPER_ADMIN' && admin.role !== 'TEAM_ADMIN') {
    throw new Error('Forbidden: Insufficient role');
  }

  await validateTeamAdminScope(admin, data.teamIds || [], data.role);

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
  const admin = await requireUser();
  if (admin.role !== 'SUPER_ADMIN' && admin.role !== 'TEAM_ADMIN') {
    throw new Error('Forbidden: Insufficient role');
  }

  const { teamIds, ...userData } = data;

  if (admin.role === 'SUPER_ADMIN') {
    // SUPER_ADMIN: full control (existing behavior)
    const updated = await prisma.user.update({
      where: { id: userId },
      data: userData,
    });

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

  // TEAM_ADMIN: scoped control
  if (data.role === 'SUPER_ADMIN') {
    throw new Error('Forbidden: Cannot assign Super Admin role');
  }

  // TEAM_ADMINs can only update name (not role) unless the target is not a SUPER_ADMIN
  const targetUser = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    include: { teamPermissions: true },
  });
  if (targetUser.role === 'SUPER_ADMIN') {
    throw new Error('Forbidden: Cannot modify a Super Admin');
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: userData,
  });

  // Merge permissions: replace only manageable teams, preserve the rest
  if (teamIds !== undefined) {
    const userTeamIds = admin.teamPermissions.map((p) => p.teamId);
    const manageable = await getManageableTeamIds(userTeamIds);

    // Validate new teamIds are all within scope
    const unauthorized = teamIds.filter((id) => !manageable.includes(id));
    if (unauthorized.length > 0) {
      throw new Error('Forbidden: Cannot assign teams outside your scope');
    }

    // Keep permissions outside admin's scope, replace the ones within scope
    const currentPerms = targetUser.teamPermissions;
    const unmanagedTeamIds = currentPerms
      .filter((p) => !manageable.includes(p.teamId))
      .map((p) => p.teamId);
    const finalTeamIds = [...new Set([...unmanagedTeamIds, ...teamIds])];

    await prisma.teamPermission.deleteMany({ where: { userId } });
    if (finalTeamIds.length > 0) {
      await prisma.teamPermission.createMany({
        data: finalTeamIds.map((teamId) => ({ userId, teamId })),
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
