import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';

export async function getCurrentUser() {
  const headerList = await headers();
  const email = headerList.get('x-user-email');
  if (!email) return null;

  const user = await prisma.user.findUnique({
    where: { email },
    include: { teamPermissions: true, roadmapPermission: true, octWebDevPermission: true, newsPermission: true },
  });

  return user;
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) throw new Error('Unauthorized');
  return user;
}

async function getTeamAncestorIds(teamId: string): Promise<string[]> {
  const ids: string[] = [teamId];
  let currentId: string | null = teamId;
  while (currentId) {
    const team: { parentId: string | null } | null = await prisma.team.findUnique({
      where: { id: currentId },
      select: { parentId: true },
    });
    if (team?.parentId) {
      ids.push(team.parentId);
      currentId = team.parentId;
    } else {
      break;
    }
  }
  return ids;
}

export async function requireTeamAccess(teamId: string) {
  const user = await requireUser();
  if (user.role === 'SUPER_ADMIN') return user;
  if (user.role === 'TEAM_ADMIN') {
    const ancestorIds = await getTeamAncestorIds(teamId);
    const hasAccess = user.teamPermissions.some(
      (p) => ancestorIds.includes(p.teamId)
    );
    if (!hasAccess) throw new Error('Forbidden: No access to this team');
    return user;
  }
  throw new Error('Forbidden: Insufficient role');
}

export async function requireTeamViewAccess(teamId: string) {
  const user = await requireUser();
  if (user.role === 'SUPER_ADMIN') return user;
  const ancestorIds = await getTeamAncestorIds(teamId);
  const hasAccess = user.teamPermissions.some(
    (p) => ancestorIds.includes(p.teamId)
  );
  if (!hasAccess) throw new Error('Forbidden: No access to this team');
  return user;
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

export async function canViewOctWebDev(): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;
  if (user.role === 'SUPER_ADMIN') return true;
  return !!user.octWebDevPermission;
}

export async function requireOctWebDevAccess() {
  const user = await requireUser();
  if (user.role === 'SUPER_ADMIN') return user;
  if (!user.octWebDevPermission) throw new Error('Forbidden: No OCT-Web-Dev view access');
  return user;
}

export async function canEditNews(): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;
  if (user.role === 'SUPER_ADMIN') return true;
  return !!user.newsPermission;
}

export async function requireNewsAccess() {
  const user = await requireUser();
  if (user.role === 'SUPER_ADMIN') return user;
  if (!user.newsPermission) throw new Error('Forbidden: No news edit access');
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
