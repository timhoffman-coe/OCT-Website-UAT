'use client';

import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#2F63AD', '#9947AE', '#61BEB2', '#109D7E', '#B1C034', '#FAB840', '#EA5853', '#839899'];

const timeAccountingData = [
  { name: 'Service Desk', hours: 8200 },
  { name: 'Network Ops', hours: 6500 },
  { name: 'App Dev', hours: 7100 },
  { name: 'Project Mgmt', hours: 4500 },
  { name: 'Security Ops', hours: 5300 },
];

const spendData = [
  { name: 'Software Licensing', value: 4.2 },
  { name: 'Personnel', value: 3.8 },
  { name: 'Cloud Infrastructure', value: 2.5 },
  { name: 'Telecom', value: 1.8 },
  { name: 'Consulting', value: 1.1 },
];

export function SpendPieChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={spendData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={(props: any) => `${(props.percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {spendData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `$${value}M`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function TimeAccountingBarChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={timeAccountingData}>
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Bar dataKey="hours" fill="#2F63AD" />
      </BarChart>
    </ResponsiveContainer>
  );
}
