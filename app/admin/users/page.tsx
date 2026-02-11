import { prisma } from '@/lib/prisma';
import { requireSuperAdmin } from '@/lib/auth';
import UserManagementClient from '@/components/admin/UserManagementClient';

export default async function UsersPage() {
  await requireSuperAdmin();

  const [users, teams] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        teamPermissions: {
          include: { team: { select: { id: true, teamName: true } } },
        },
      },
    }),
    prisma.team.findMany({
      orderBy: { sortOrder: 'asc' },
      select: { id: true, teamName: true },
    }),
  ]);

  return <UserManagementClient users={users} teams={teams} />;
}
