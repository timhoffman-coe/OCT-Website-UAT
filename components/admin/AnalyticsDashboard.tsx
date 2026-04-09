'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { ClientResponsiveContainer } from '@/components/ClientOnly';

interface AnalyticsDashboardProps {
  totalViews30d: number;
  totalViews7d: number;
  chartData: Array<{ date: string; count: number }>;
  topPages: Array<{ path: string; count: number }>;
  topTeams: Array<{ teamSlug: string; count: number }>;
  recentViews: Array<{
    id: string;
    path: string;
    teamSlug: string | null;
    referrer: string | null;
    createdAt: string;
  }>;
}

export default function AnalyticsDashboard({
  totalViews30d,
  totalViews7d,
  chartData,
  topPages,
  topTeams,
  recentViews,
}: AnalyticsDashboardProps) {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <p className="font-sans text-sm text-gray-500">Views (Last 30 Days)</p>
          <p className="font-sans text-3xl font-bold text-primary-blue mt-1">
            {totalViews30d.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <p className="font-sans text-sm text-gray-500">Views (Last 7 Days)</p>
          <p className="font-sans text-3xl font-bold text-primary-blue mt-1">
            {totalViews7d.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h2 className="font-sans text-lg font-semibold text-gray-800 mb-4">Daily Page Views</h2>
        {chartData.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-gray-400 font-sans text-sm">
            No page views recorded yet
          </div>
        ) : (
          <ClientResponsiveContainer width="100%" height={256}>
            <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="pageViewGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#005087" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#005087" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: '#6b7280' }}
                tickLine={false}
                axisLine={{ stroke: '#e5e7eb' }}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#6b7280' }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                  fontSize: '13px',
                  fontFamily: 'Open Sans, sans-serif',
                }}
                formatter={(value) => [value, 'Views']}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#005087"
                strokeWidth={2}
                fill="url(#pageViewGradient)"
                dot={false}
                activeDot={{ r: 4, fill: '#005087', strokeWidth: 0 }}
              />
            </AreaChart>
          </ClientResponsiveContainer>
        )}
      </div>

      {/* Top Pages & Top Teams */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-sans text-lg font-semibold text-gray-800">Top Pages</h2>
          </div>
          <table className="w-full text-sm font-sans">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2.5 text-gray-600 font-semibold">Path</th>
                <th className="text-right px-4 py-2.5 text-gray-600 font-semibold">Views</th>
              </tr>
            </thead>
            <tbody>
              {topPages.map((page) => (
                <tr key={page.path} className="border-t border-gray-100">
                  <td className="px-4 py-2.5 text-gray-900 font-mono text-xs">{page.path}</td>
                  <td className="px-4 py-2.5 text-gray-600 text-right">{page.count.toLocaleString()}</td>
                </tr>
              ))}
              {topPages.length === 0 && (
                <tr>
                  <td colSpan={2} className="px-4 py-8 text-center text-gray-400">No data yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Top Teams */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-sans text-lg font-semibold text-gray-800">Top Teams</h2>
          </div>
          <table className="w-full text-sm font-sans">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2.5 text-gray-600 font-semibold">Team Slug</th>
                <th className="text-right px-4 py-2.5 text-gray-600 font-semibold">Views</th>
              </tr>
            </thead>
            <tbody>
              {topTeams.map((team) => (
                <tr key={team.teamSlug} className="border-t border-gray-100">
                  <td className="px-4 py-2.5 text-gray-900 font-mono text-xs">{team.teamSlug}</td>
                  <td className="px-4 py-2.5 text-gray-600 text-right">{team.count.toLocaleString()}</td>
                </tr>
              ))}
              {topTeams.length === 0 && (
                <tr>
                  <td colSpan={2} className="px-4 py-8 text-center text-gray-400">No data yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Views */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-sans text-lg font-semibold text-gray-800">Recent Views</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-sans">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-2.5 text-gray-600 font-semibold">Time</th>
                <th className="text-left px-4 py-2.5 text-gray-600 font-semibold">Path</th>
                <th className="text-left px-4 py-2.5 text-gray-600 font-semibold">Team</th>
                <th className="text-left px-4 py-2.5 text-gray-600 font-semibold">Referrer</th>
              </tr>
            </thead>
            <tbody>
              {recentViews.map((view) => (
                <tr key={view.id} className="border-t border-gray-100">
                  <td className="px-4 py-2.5 text-gray-500 whitespace-nowrap">
                    {new Date(view.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2.5 text-gray-900 font-mono text-xs">{view.path}</td>
                  <td className="px-4 py-2.5 text-gray-600 font-mono text-xs">
                    {view.teamSlug || '—'}
                  </td>
                  <td className="px-4 py-2.5 text-gray-400 text-xs truncate max-w-[200px]">
                    {view.referrer || '—'}
                  </td>
                </tr>
              ))}
              {recentViews.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                    No page views recorded yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
