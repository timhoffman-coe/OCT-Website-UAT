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

  const [users, teams] = await Promise.all([
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

  // Filter out SUPER_ADMINs from the list
  const filteredUsers = users.filter((u) => u.role !== 'SUPER_ADMIN' && u.id !== user.id);

  return <UserManagementClient users={filteredUsers} teams={teams} currentUserRole="TEAM_ADMIN" />;
}
