import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminSidebar from '@/components/admin/AdminSidebar';

export const metadata = {
  title: 'CMS Admin | Open City & Technology',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect('/');

  // Fetch teams based on user role
  let teams;
  if (user.role === 'SUPER_ADMIN') {
    teams = await prisma.team.findMany({
      orderBy: { sortOrder: 'asc' },
      select: { id: true, teamName: true, slug: true, pageTemplate: true, parentId: true },
    });
  } else {
    const teamIds = user.teamPermissions.map((p) => p.teamId);
    teams = await prisma.team.findMany({
      where: { id: { in: teamIds } },
      orderBy: { sortOrder: 'asc' },
      select: { id: true, teamName: true, slug: true, pageTemplate: true, parentId: true },
    });
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar
        teams={teams}
        userRole={user.role}
        userName={user.name}
      />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
