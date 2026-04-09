import { prisma } from '@/lib/prisma';
import { requireUser, getManageableTeamIds } from '@/lib/auth';
import UserManagementClient from '@/components/admin/UserManagementClient';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  const user = await requireUser();
  if (user.role !== 'SUPER_ADMIN' && user.role !== 'TEAM_ADMIN') {
    redirect('/admin');
  }

  if (user.role === 'SUPER_ADMIN') {
    const [users, teams] = await Promise.all([
      prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          teamPermissions: {
            include: { team: { select: { id: true, teamName: true } } },
          },
          roadmapPermission: { select: { id: true } },
          newsPermission: { select: { id: true } },
          octWebDevPermission: { select: { id: true } },
        },
      }),
      prisma.team.findMany({
        where: { archivedAt: null },
        orderBy: { sortOrder: 'asc' },
        select: { id: true, teamName: true, parentId: true },
      }),
    ]);

    return <UserManagementClient users={users} teams={teams} currentUserRole="SUPER_ADMIN" />;
  }

  // TEAM_ADMIN: show only manageable teams and relevant users
  const userTeamIds = user.teamPermissions.map((p) => p.teamId);
  const manageableIds = await getManageableTeamIds(userTeamIds);

  const [users, manageableTeams] = await Promise.all([
    prisma.user.findMany({
      where: {
        OR: [
          { teamPermissions: { some: { teamId: { in: manageableIds } } } },
          { teamPermissions: { none: {} }, role: { not: 'SUPER_ADMIN' } },
        ],
      },
      orderBy: { createdAt: 'desc' },
      include: {
        teamPermissions: {
          include: { team: { select: { id: true, teamName: true } } },
        },
        roadmapPermission: { select: { id: true } },
        newsPermission: { select: { id: true } },
        octWebDevPermission: { select: { id: true } },
      },
    }),
    prisma.team.findMany({
      where: { id: { in: manageableIds }, archivedAt: null },
      orderBy: { sortOrder: 'asc' },
      select: { id: true, teamName: true, parentId: true },
    }),
  ]);

  // Fetch ancestor teams for UI grouping (so topLevel filter works in the client)
  const manageableIdSet = new Set(manageableIds);
  const parentIds = [...new Set(
    manageableTeams.map((t) => t.parentId).filter((id): id is string => !!id && !manageableIdSet.has(id))
  )];
  let ancestorTeams = parentIds.length > 0
    ? await prisma.team.findMany({
        where: { id: { in: parentIds }, archivedAt: null },
        orderBy: { sortOrder: 'asc' },
        select: { id: true, teamName: true, parentId: true },
      })
    : [];
  // Walk one more level up for grandparent sections
  const grandparentIds = ancestorTeams
    .map((t) => t.parentId)
    .filter((id): id is string => !!id && !manageableIdSet.has(id) && !parentIds.includes(id));
  if (grandparentIds.length > 0) {
    const grandparents = await prisma.team.findMany({
      where: { id: { in: grandparentIds }, archivedAt: null },
      orderBy: { sortOrder: 'asc' },
      select: { id: true, teamName: true, parentId: true },
    });
    ancestorTeams = [...ancestorTeams, ...grandparents];
  }
  const teams = [...ancestorTeams, ...manageableTeams];

  // Filter out SUPER_ADMINs from the list
  const filteredUsers = users.filter((u) => u.role !== 'SUPER_ADMIN' && u.id !== user.id);

  return <UserManagementClient users={filteredUsers} teams={teams} currentUserRole="TEAM_ADMIN" />;
}
