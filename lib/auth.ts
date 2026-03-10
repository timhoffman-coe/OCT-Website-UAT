import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function getCurrentUser() {
  const headerList = await headers();
  const email = headerList.get('x-user-email');
  if (!email) return null;

  const user = await prisma.user.findUnique({
    where: { email },
    include: { teamPermissions: true, roadmapPermission: true },
  });

  return user;
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');
  return user;
}

export async function requireTeamAccess(teamId: string) {
  const user = await requireUser();
  if (user.role === 'SUPER_ADMIN') return user;
  if (user.role === 'TEAM_ADMIN') {
    const hasAccess = user.teamPermissions.some(
      (p) => p.teamId === teamId
    );
    if (!hasAccess) throw new Error('Forbidden: No access to this team');
    return user;
  }
  throw new Error('Forbidden: Insufficient role');
}

export async function requireSuperAdmin() {
  const user = await requireUser();
  if (user.role !== 'SUPER_ADMIN') {
    throw new Error('Forbidden: Super admin required');
  }
  return user;
}

export async function canEditRoadmap(): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;
  if (user.role === 'SUPER_ADMIN') return true;
  return !!user.roadmapPermission;
}

export async function requireRoadmapAccess() {
  const user = await requireUser();
  if (user.role === 'SUPER_ADMIN') return user;
  if (!user.roadmapPermission) throw new Error('Forbidden: No roadmap edit access');
  return user;
}

// Get team IDs that a TEAM_ADMIN can delegate (children of their assigned teams)
export async function getManageableTeamIds(userTeamIds: string[]): Promise<string[]> {
  const childTeams = await prisma.team.findMany({
    where: { parentId: { in: userTeamIds } },
    select: { id: true },
  });
  return childTeams.map((t) => t.id);
}
