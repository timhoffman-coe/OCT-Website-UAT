import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth';
import Link from 'next/link';
import KPICard from '@/components/budget-dashboard/KPICard';
import DashboardActivityChart from '@/components/admin/DashboardActivityChart';
import DashboardActivityFeed from '@/components/admin/DashboardActivityFeed';
import {
  Building2,
  Users,
  FileText,
  Activity,
  ChevronRight,
  UserCog,
  ClipboardList,
  Rocket,
  Trash2,
  Pencil,
  Eye,
  Layers,
  FolderTree,
  UsersRound,
  Briefcase,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

const ROLE_BADGE: Record<string, { label: string; bg: string }> = {
  SUPER_ADMIN: { label: 'Super Admin', bg: 'bg-purple-600' },
  TEAM_ADMIN: { label: 'Team Admin', bg: 'bg-process-blue' },
  VIEWER: { label: 'Viewer', bg: 'bg-complement-grey-flannel' },
};

const TEMPLATE_COLORS: Record<string, string> = {
  SECTION: 'border-t-primary-blue',
  ITS_TEAM: 'border-t-process-blue',
  SUB_TEAM: 'border-t-complement-sea-green',
  CUSTOM: 'border-t-complement-sunrise',
};

const TEMPLATE_LABELS: Record<string, string> = {
  SECTION: 'Section',
  ITS_TEAM: 'ITS Team',
  SUB_TEAM: 'Sub-Team',
  CUSTOM: 'Custom',
};

const TEMPLATE_BADGE_COLORS: Record<string, string> = {
  SECTION: 'bg-primary-blue/10 text-primary-blue',
  ITS_TEAM: 'bg-process-blue/10 text-process-blue',
  SUB_TEAM: 'bg-complement-sea-green/10 text-complement-sea-green',
  CUSTOM: 'bg-complement-sunrise/10 text-complement-sunrise',
};

export default async function AdminDashboard() {
  const user = await requireUser();
  const isSuperAdmin = user.role === 'SUPER_ADMIN';
  const isAdmin = user.role === 'SUPER_ADMIN' || user.role === 'TEAM_ADMIN';
  const userTeamIds = user.teamPermissions.map((p: { teamId: string }) => p.teamId);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  let accessibleTeamIds = userTeamIds;
  if (!isSuperAdmin && userTeamIds.length > 0) {
    const childTeams = await prisma.team.findMany({
      where: { parentId: { in: userTeamIds }, archivedAt: null },
      select: { id: true },
    });
    accessibleTeamIds = [...userTeamIds, ...childTeams.map((t: { id: string }) => t.id)];
  }

  const teamWhere = isSuperAdmin
    ? { archivedAt: null }
    : { id: { in: accessibleTeamIds }, archivedAt: null };

  const contentWhere = isSuperAdmin ? {} : { teamId: { in: accessibleTeamIds } };

  // Run all queries in parallel
  const [
    teams,
    totalUsers,
    usersByRole,
    portfolioCount,
    memberCount,
    serviceAreaCount,
    recentChangesCount,
    activityDates,
    recentLogs,
    archivedCount,
    teamsByTemplate,
  ] = await Promise.all([
    // 1. Teams with counts
    prisma.team.findMany({
      where: teamWhere,
      orderBy: { sortOrder: 'asc' },
      include: {
        _count: {
          select: { portfolios: true, teamMembers: true, serviceAreas: true, children: true },
        },
      },
    }),
    // 2. Total users (SUPER_ADMIN only)
    isSuperAdmin ? prisma.user.count() : Promise.resolve(0),
    // 3. Users by role (SUPER_ADMIN only)
    isSuperAdmin
      ? prisma.user.groupBy({ by: ['role'], _count: true })
      : Promise.resolve([]),
    // 4. Content counts
    prisma.portfolio.count({ where: contentWhere }),
    prisma.teamMember.count({ where: contentWhere }),
    prisma.serviceArea.count({ where: contentWhere }),
    // 5. Recent changes (7 days)
    prisma.auditLog.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    // 6. Activity dates for chart (30 days)
    prisma.auditLog.findMany({
      where: { createdAt: { gte: thirtyDaysAgo } },
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' },
    }),
    // 7. Recent audit logs
    prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 15,
      include: { user: { select: { name: true, email: true } } },
    }),
    // 8. Archived count (SUPER_ADMIN only)
    isSuperAdmin
      ? prisma.team.count({ where: { archivedAt: { not: null } } })
      : Promise.resolve(0),
    // 9. Teams by template (SUPER_ADMIN only)
    isSuperAdmin
      ? prisma.team.groupBy({ by: ['pageTemplate'], _count: true, where: { archivedAt: null } })
      : Promise.resolve([]),
  ]);

  // Aggregate chart data by day
  const chartMap = new Map<string, number>();
  for (const entry of activityDates) {
    const day = entry.createdAt.toISOString().slice(5, 10); // "MM-DD"
    chartMap.set(day, (chartMap.get(day) || 0) + 1);
  }
  const chartData = Array.from(chartMap.entries()).map(([date, count]) => ({
    date: `${parseInt(date.split('-')[0])}/${date.split('-')[1]}`,
    count,
  }));

  // Serialize logs for client component
  const serializedLogs = recentLogs.map((log) => ({
    id: log.id,
    action: log.action,
    entity: log.entity,
    entityId: log.entityId,
    createdAt: log.createdAt.toISOString(),
    user: log.user,
  }));

  // Compute KPI values
  const totalContentItems = portfolioCount + memberCount + serviceAreaCount;
  const topLevelTeams = teams.filter((t) => !t.parentId);

  // Role breakdown for SUPER_ADMIN
  const adminCount = (usersByRole as Array<{ role: string; _count: number }>).find(
    (r) => r.role === 'SUPER_ADMIN'
  )?._count || 0;
  const teamAdminCount = (usersByRole as Array<{ role: string; _count: number }>).find(
    (r) => r.role === 'TEAM_ADMIN'
  )?._count || 0;
  const viewerCount = (usersByRole as Array<{ role: string; _count: number }>).find(
    (r) => r.role === 'VIEWER'
  )?._count || 0;

  const roleBadge = ROLE_BADGE[user.role] || ROLE_BADGE.VIEWER;
  const greeting = getGreeting();
  const dateString = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Quick actions based on role
  const quickActions: Array<{
    label: string;
    href: string;
    icon: typeof Building2;
    description: string;
  }> = [];

  if (isSuperAdmin) {
    quickActions.push(
      { label: 'Manage Users', href: '/admin/users', icon: UserCog, description: 'Add or edit user roles' },
      { label: 'Audit Log', href: '/admin/audit-log', icon: ClipboardList, description: 'Review all changes' },
      { label: 'Roadmap Editors', href: '/admin/roadmap-editors', icon: Rocket, description: 'Manage roadmap access' },
      { label: 'Trash', href: '/admin/trash', icon: Trash2, description: 'Recover deleted items' },
    );
  } else if (user.role === 'TEAM_ADMIN') {
    quickActions.push(
      { label: 'Manage Users', href: '/admin/users', icon: UserCog, description: 'View and manage team users' },
    );
    topLevelTeams.slice(0, 3).forEach((team) => {
      quickActions.push({
        label: `Edit ${team.teamShortName || team.teamName}`,
        href: `/admin/teams/${team.id}`,
        icon: Pencil,
        description: team.pageTemplate === 'SECTION' ? 'Section page' : 'Team page',
      });
    });
  } else {
    topLevelTeams.slice(0, 4).forEach((team) => {
      quickActions.push({
        label: `View ${team.teamShortName || team.teamName}`,
        href: `/admin/teams/${team.id}`,
        icon: Eye,
        description: team.pageTemplate === 'SECTION' ? 'Section page' : 'Team page',
      });
    });
  }

  return (
    <div className="p-8 max-w-7xl">
      {/* ── Welcome Header ── */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="font-sans text-2xl font-bold text-dark-blue">
            {greeting}, {user.name}
          </h1>
          <span className={`${roleBadge.bg} text-white text-xs font-semibold px-2.5 py-0.5 rounded-full font-sans`}>
            {roleBadge.label}
          </span>
        </div>
        <p className="font-sans text-sm text-gray-500">{dateString}</p>
      </div>

      {/* ── KPI Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KPICard
          title={isSuperAdmin ? 'Total Teams' : 'My Teams'}
          value={teams.length}
          subValue={isSuperAdmin ? `${archivedCount} archived` : `${topLevelTeams.length} top-level`}
          color="primary"
          icon={<Building2 size={20} />}
        />
        <KPICard
          title={isSuperAdmin ? 'Total Users' : 'Team Members'}
          value={isSuperAdmin ? totalUsers : memberCount}
          subValue={
            isSuperAdmin
              ? `${adminCount} super, ${teamAdminCount} admin, ${viewerCount} viewer`
              : 'Across your teams'
          }
          color="accent"
          icon={<Users size={20} />}
        />
        <KPICard
          title="Content Items"
          value={totalContentItems}
          subValue={`${portfolioCount} portfolios, ${serviceAreaCount} service areas`}
          color="success"
          icon={<FileText size={20} />}
        />
        <KPICard
          title="Recent Changes"
          value={recentChangesCount}
          subValue="Last 7 days"
          color="warning"
          icon={<Activity size={20} />}
        />
      </div>

      {/* ── System Overview (SUPER_ADMIN only) ── */}
      {isSuperAdmin && (teamsByTemplate as Array<{ pageTemplate: string; _count: number }>).length > 0 && (
        <div className="mb-8">
          <h2 className="font-sans text-lg font-semibold text-gray-900 mb-4">System Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(teamsByTemplate as Array<{ pageTemplate: string; _count: number }>).map((group) => {
              const templateColor = TEMPLATE_COLORS[group.pageTemplate] || 'border-t-gray-300';
              const label = TEMPLATE_LABELS[group.pageTemplate] || group.pageTemplate;
              return (
                <div
                  key={group.pageTemplate}
                  className={`bg-white rounded-lg border border-gray-200 border-t-4 ${templateColor} px-4 py-3 text-center`}
                >
                  <p className="font-sans text-2xl font-bold text-gray-900">{group._count}</p>
                  <p className="font-sans text-xs text-gray-500">{label} Pages</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Activity Chart + Quick Actions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm p-5">
          <div className="mb-4">
            <h2 className="font-sans text-lg font-semibold text-gray-900">Activity</h2>
            <p className="font-sans text-xs text-gray-400">Last 30 days</p>
          </div>
          <DashboardActivityChart data={chartData} />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
          <h2 className="font-sans text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-1">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary-blue/10 text-primary-blue flex items-center justify-center">
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-sm font-medium text-gray-900 truncate">{action.label}</p>
                    <p className="font-sans text-xs text-gray-400 truncate">{action.description}</p>
                  </div>
                  <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Your Teams ── */}
      <div className="mb-8">
        <h2 className="font-sans text-lg font-semibold text-gray-900 mb-4">OCT Teams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topLevelTeams.map((team) => {
            const templateColor = TEMPLATE_COLORS[team.pageTemplate] || 'border-t-gray-300';
            const badgeColor = TEMPLATE_BADGE_COLORS[team.pageTemplate] || 'bg-gray-100 text-gray-600';
            const templateLabel = TEMPLATE_LABELS[team.pageTemplate] || team.pageTemplate;

            return (
              <Link
                key={team.id}
                href={`/admin/teams/${team.id}`}
                className={`bg-white rounded-lg border border-gray-200 border-t-4 ${templateColor} p-5 hover:shadow-md transition-all group`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-sans font-bold text-primary-blue text-base group-hover:text-dark-blue transition-colors">
                      {team.teamName}
                    </h3>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold font-sans ${badgeColor}`}>
                      {templateLabel}
                    </span>
                  </div>
                  {team.isPublished ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-complement-sea-green flex-shrink-0 mt-1" title="Published" />
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-300 flex-shrink-0 mt-1" title="Draft" />
                  )}
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 font-sans mb-3">
                  {team.pageTemplate === 'SECTION' ? (
                    <>
                      <span className="flex items-center gap-1">
                        <Layers size={12} /> {team._count.serviceAreas} service areas
                      </span>
                      {team._count.children > 0 && (
                        <span className="flex items-center gap-1">
                          <FolderTree size={12} /> {team._count.children} sub-teams
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      <span className="flex items-center gap-1">
                        <Briefcase size={12} /> {team._count.portfolios} portfolios
                      </span>
                      <span className="flex items-center gap-1">
                        <UsersRound size={12} /> {team._count.teamMembers} members
                      </span>
                    </>
                  )}
                </div>

                <p className="font-sans text-[11px] text-gray-400">
                  Updated {getRelativeTime(team.updatedAt)}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Recent Activity Feed ── */}
      <div className="mb-8">
        <h2 className="font-sans text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <DashboardActivityFeed logs={serializedLogs} showFullLogLink={isSuperAdmin} />
      </div>

    </div>
  );
}
