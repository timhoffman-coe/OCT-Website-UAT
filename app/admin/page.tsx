import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const user = await requireUser();

  // Fetch teams based on role
  const teamWhere = user.role === 'SUPER_ADMIN'
    ? {}
    : { id: { in: user.teamPermissions.map((p: { teamId: string }) => p.teamId) } };
  const teams = await prisma.team.findMany({
    where: teamWhere,
    orderBy: { sortOrder: 'asc' },
    include: {
      _count: {
        select: { portfolios: true, teamMembers: true, serviceAreas: true },
      },
    },
  });

  // Recent audit logs
  const recentLogs = await prisma.auditLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 10,
    include: { user: { select: { name: true, email: true } } },
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-sans text-3xl font-bold text-primary-blue">
          Dashboard
        </h1>
        <p className="font-sans text-gray-600 mt-1">
          Welcome back, {user.name}
        </p>
      </div>

      {/* Team Cards */}
      <div className="mb-10">
        <h2 className="font-sans text-xl font-semibold text-gray-900 mb-4">
          Your Teams
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((team) => (
            <Link
              key={team.id}
              href={`/admin/teams/${team.id}`}
              className="bg-white rounded-lg border border-gray-200 p-5 hover:border-primary-blue hover:shadow-md transition-all"
            >
              <h3 className="font-sans font-bold text-primary-blue text-lg">
                {team.teamName}
              </h3>
              <p className="font-sans text-xs text-gray-500 mt-1 mb-3">
                {team.pageTemplate === 'ITS_TEAM' ? 'ITS Team Page' : 'Section Page'}
              </p>
              <div className="flex gap-4 text-sm text-gray-600 font-sans">
                {team.pageTemplate === 'ITS_TEAM' ? (
                  <>
                    <span>{team._count.portfolios} portfolios</span>
                    <span>{team._count.teamMembers} members</span>
                  </>
                ) : (
                  <span>{team._count.serviceAreas} service areas</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      {recentLogs.length > 0 && (
        <div>
          <h2 className="font-sans text-xl font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full text-sm font-sans">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-4 py-2 text-gray-600 font-semibold">User</th>
                  <th className="text-left px-4 py-2 text-gray-600 font-semibold">Action</th>
                  <th className="text-left px-4 py-2 text-gray-600 font-semibold">Entity</th>
                  <th className="text-left px-4 py-2 text-gray-600 font-semibold">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentLogs.map((log) => (
                  <tr key={log.id} className="border-t border-gray-100">
                    <td className="px-4 py-2 text-gray-900">{log.user.name}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                          log.action === 'CREATE'
                            ? 'bg-green-100 text-green-800'
                            : log.action === 'UPDATE'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-gray-600">{log.entity}</td>
                    <td className="px-4 py-2 text-gray-500">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
