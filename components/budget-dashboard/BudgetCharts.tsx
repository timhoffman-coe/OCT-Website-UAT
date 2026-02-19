'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BudgetChartData {
  name: string;
  Budgeted: number;
  Actual: number;
}

interface BudgetChartsProps {
  overallData: BudgetChartData[];
  sectionData: BudgetChartData[];
  formatCurrency: (value: number) => string;
}

export default function BudgetCharts({ overallData, sectionData, formatCurrency }: BudgetChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Overall Chart */}
      <div className="bg-white/50 rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Overall Performance</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={overallData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Bar dataKey="Budgeted" fill="#005087" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Actual" fill="#2A9D8F" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* By Section Chart */}
      <div className="lg:col-span-2 bg-white/50 rounded-lg p-4 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Breakdown by Section</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sectionData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" interval={0} angle={-15} textAnchor="end" height={60} />
              <YAxis tickFormatter={formatCurrency} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Bar dataKey="Budgeted" fill="#005087" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Actual" fill="#2A9D8F" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
