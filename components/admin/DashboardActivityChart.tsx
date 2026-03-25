'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ActivityChartProps {
  data: Array<{ date: string; count: number }>;
}

export default function DashboardActivityChart({ data }: ActivityChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 font-sans text-sm">
        No activity in the last 30 days
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={256}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <defs>
          <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
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
          labelFormatter={(label) => `${label}`}
          formatter={(value: number) => [value, 'Changes']}
        />
        <Area
          type="monotone"
          dataKey="count"
          stroke="#005087"
          strokeWidth={2}
          fill="url(#activityGradient)"
          dot={false}
          activeDot={{ r: 4, fill: '#005087', strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
