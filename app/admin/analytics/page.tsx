import { prisma } from '@/lib/prisma';
import { requireUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
  const user = await requireUser();
  if (user.role !== 'SUPER_ADMIN') redirect('/admin');

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const [
    totalViews30d,
    totalViews7d,
    viewsByDay,
    topPages,
    topTeams,
    recentViews,
  ] = await Promise.all([
    prisma.pageView.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.pageView.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.$queryRaw<Array<{ date: Date; count: number }>>`
      SELECT DATE("createdAt") as date, COUNT(*)::int as count
      FROM "PageView"
      WHERE "createdAt" >= ${thirtyDaysAgo}
      GROUP BY DATE("createdAt")
      ORDER BY date ASC
    `,
    prisma.$queryRaw<Array<{ path: string; count: number }>>`
      SELECT "path", COUNT(*)::int as count
      FROM "PageView"
      WHERE "createdAt" >= ${thirtyDaysAgo}
      GROUP BY "path"
      ORDER BY count DESC
      LIMIT 10
    `,
    prisma.$queryRaw<Array<{ teamSlug: string; count: number }>>`
      SELECT "teamSlug", COUNT(*)::int as count
      FROM "PageView"
      WHERE "teamSlug" IS NOT NULL AND "createdAt" >= ${thirtyDaysAgo}
      GROUP BY "teamSlug"
      ORDER BY count DESC
      LIMIT 10
    `,
    prisma.pageView.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      select: { id: true, path: true, teamSlug: true, referrer: true, createdAt: true },
    }),
  ]);

  const chartData = viewsByDay.map((row) => ({
    date: new Date(row.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    count: row.count,
  }));

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-6">
        <h1 className="font-sans text-3xl font-bold text-primary-blue">Page Analytics</h1>
        <p className="font-sans text-sm text-gray-500 mt-1">Public page view tracking (last 30 days)</p>
      </div>
      <AnalyticsDashboard
        totalViews30d={totalViews30d}
        totalViews7d={totalViews7d}
        chartData={chartData}
        topPages={topPages}
        topTeams={topTeams}
        recentViews={recentViews.map((v) => ({ ...v, createdAt: v.createdAt.toISOString() }))}
      />
    </div>
  );
}
