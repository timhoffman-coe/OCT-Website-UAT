'use client';

import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { ClientResponsiveContainer } from '@/components/ClientOnly';

const COLORS = ['#0081BC', '#109D7E', '#FAB840', '#EA5853', '#99479A', '#2F63AD'];

interface ChartDataItem {
  name: string;
  value: number;
  [key: string]: string | number;
}

interface BudgetPieChartsProps {
  fundingByProgram: ChartDataItem[];
  spendingByProgram: ChartDataItem[];
  spendingByYear: ChartDataItem[];
  formatCurrency: (val: number) => string;
}

export default function BudgetPieCharts({ fundingByProgram, spendingByProgram, spendingByYear, formatCurrency }: BudgetPieChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Approved Funding By Program */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-[#212529] mb-4 font-sans">Funding by Program</h3>
        <div className="h-64">
          <ClientResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={fundingByProgram}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {fundingByProgram.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => formatCurrency(Number(value))}
                contentStyle={{ backgroundColor: '#fff', borderColor: '#ccc', color: '#000' }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ClientResponsiveContainer>
        </div>
      </div>

      {/* Spend by Program */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-[#212529] mb-4 font-sans">Spending by Program</h3>
        <div className="h-64">
          <ClientResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={spendingByProgram}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {spendingByProgram.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => formatCurrency(Number(value))}
                contentStyle={{ backgroundColor: '#fff', borderColor: '#ccc', color: '#000' }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ClientResponsiveContainer>
        </div>
      </div>

      {/* Spend by Year */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-bold text-[#212529] mb-4 font-sans">Spending by Fiscal Year</h3>
        <div className="h-64">
          <ClientResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={spendingByYear}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {spendingByYear.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => formatCurrency(Number(value))}
                contentStyle={{ backgroundColor: '#fff', borderColor: '#ccc', color: '#000' }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ClientResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
