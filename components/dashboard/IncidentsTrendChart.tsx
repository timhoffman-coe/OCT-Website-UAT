'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ClientResponsiveContainer } from '@/components/ClientOnly';

export default function IncidentsTrendChart() {
  // Generate last 30 days of data
  const data = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      incidents: [1,2,0,1,3,2,1,0,0,1,2,4,2,1,0,1,1,2,3,1,0,2,1,1,3,2,0,1,2,1][i]
    };
  });

  return (
    <ClientResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12 }}
          interval={4}
        />
        <YAxis
          tick={{ fontSize: 12 }}
          domain={[0, 5]}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="incidents"
          stroke="#2F63AD"
          strokeWidth={2}
          fill="#2F63AD"
          fillOpacity={0.1}
          name="New P1/P2 Incidents"
        />
      </LineChart>
    </ClientResponsiveContainer>
  );
}
