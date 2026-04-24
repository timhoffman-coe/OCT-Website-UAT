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
      where: { archivedAt: null },
      orderBy: { sortOrder: 'asc' },
      select: { id: true, teamName: true, slug: true, pageTemplate: true, parentId: true },
    });
  } else {
    const teamIds = user.teamPermissions.map((p) => p.teamId);
    const selectFields = { id: true, teamName: true, slug: true, pageTemplate: true, parentId: true } as const;
    const assignedTeams = await prisma.team.findMany({
      where: { id: { in: teamIds }, archivedAt: null },
      orderBy: { sortOrder: 'asc' },
      select: selectFields,
    });

    // Fetch all descendant teams (children + grandchildren) of assigned teams
    const assignedIds = assignedTeams.map((t) => t.id);
    const allKnownIds = new Set(assignedIds);
    let descendantTeams: typeof assignedTeams = [];
    let currentParentIds = assignedIds;
    for (let depth = 0; depth < 2 && currentParentIds.length > 0; depth++) {
      const children = await prisma.team.findMany({
        where: { parentId: { in: currentParentIds }, archivedAt: null, id: { notIn: [...allKnownIds] } },
        orderBy: { sortOrder: 'asc' },
        select: selectFields,
      });
      descendantTeams = [...descendantTeams, ...children];
      children.forEach((c) => allKnownIds.add(c.id));
      currentParentIds = children.map((t) => t.id);
    }

    // Fetch ancestor teams up to section level for sidebar grouping
    const allFetched = [...assignedTeams, ...descendantTeams];
    const parentIds = [...new Set(
      allFetched.map((t) => t.parentId).filter((id): id is string => !!id && !allKnownIds.has(id))
    )];
    let ancestorTeams = parentIds.length > 0
      ? await prisma.team.findMany({
          where: { id: { in: parentIds }, archivedAt: null },
          orderBy: { sortOrder: 'asc' },
          select: selectFields,
        })
      : [];
    // Walk one more level up for grandparent sections
    const grandparentIds = ancestorTeams
      .map((t) => t.parentId)
      .filter((id): id is string => !!id && !allKnownIds.has(id) && !parentIds.includes(id));
    if (grandparentIds.length > 0) {
      const grandparents = await prisma.team.findMany({
        where: { id: { in: grandparentIds }, archivedAt: null },
        orderBy: { sortOrder: 'asc' },
        select: selectFields,
      });
      ancestorTeams = [...ancestorTeams, ...grandparents];
    }

    teams = [...ancestorTeams, ...assignedTeams, ...descendantTeams];
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar
        teams={teams}
        userRole={user.role}
        userName={user.name}
        canEditNews={user.role === 'SUPER_ADMIN' || !!user.newsPermission}
        canEditProjects={user.role === 'SUPER_ADMIN' || !!user.projectPermission || user.projectManagerAssignments.length > 0}
        canEditLinks={user.role === 'SUPER_ADMIN' || !!user.linksPermission}
        canEditPolicies={user.role === 'SUPER_ADMIN' || !!user.policiesPermission}
      />
      <main id="main-content" className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
