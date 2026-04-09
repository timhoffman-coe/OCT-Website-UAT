import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AuditLogTable from '@/components/admin/AuditLogTable';

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

  const serialized = logs.map((log) => ({
    ...log,
    createdAt: log.createdAt.toISOString(),
  }));

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

      <AuditLogTable logs={serialized} />
    </div>
  );
}
