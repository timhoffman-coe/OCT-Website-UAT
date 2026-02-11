import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AuditLogPage() {
  const user = await requireUser();
  if (user.role === 'VIEWER') redirect('/admin');

  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
    include: {
      user: { select: { name: true, email: true } },
    },
  });

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="font-sans text-3xl font-bold text-primary-blue">
          Audit Log
        </h1>
        <p className="font-sans text-sm text-gray-500 mt-1">
          Recent content changes across all teams
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full text-sm font-sans">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 text-gray-600 font-semibold">
                Time
              </th>
              <th className="text-left px-4 py-3 text-gray-600 font-semibold">
                User
              </th>
              <th className="text-left px-4 py-3 text-gray-600 font-semibold">
                Action
              </th>
              <th className="text-left px-4 py-3 text-gray-600 font-semibold">
                Entity
              </th>
              <th className="text-left px-4 py-3 text-gray-600 font-semibold">
                Entity ID
              </th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-t border-gray-100">
                <td className="px-4 py-2.5 text-gray-500 whitespace-nowrap">
                  {new Date(log.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-2.5 text-gray-900">
                  <div>{log.user.name}</div>
                  <div className="text-xs text-gray-400">{log.user.email}</div>
                </td>
                <td className="px-4 py-2.5">
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
                <td className="px-4 py-2.5 text-gray-600">{log.entity}</td>
                <td className="px-4 py-2.5 text-gray-400 text-xs font-mono truncate max-w-[200px]">
                  {log.entityId}
                </td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-gray-400"
                >
                  No audit log entries yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
