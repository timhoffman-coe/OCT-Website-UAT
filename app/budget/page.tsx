'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import Link from 'next/link';

export default function BudgetPage() {
  // Sample data for Capital Budget
  const capitalOverallData = [
    { name: 'Total', Budgeted: 15.0, Actual: 9.5 }
  ];

  const capitalSectionData = [
    { name: 'Tech Planning', Budgeted: 2.5, Actual: 1.8 },
    { name: 'Business Solutions', Budgeted: 4.0, Actual: 2.2 },
    { name: 'Integrated Tech', Budgeted: 5.5, Actual: 4.1 },
    { name: 'PMO', Budgeted: 1.5, Actual: 0.8 },
    { name: 'Corp Security', Budgeted: 1.5, Actual: 0.6 },
  ];

  // Sample data for Operating Budget
  const operatingOverallData = [
    { name: 'Total', Budgeted: 85.0, Actual: 63.0 }
  ];

  const operatingSectionData = [
    { name: 'Tech Planning', Budgeted: 12.0, Actual: 9.5 },
    { name: 'Business Solutions', Budgeted: 25.0, Actual: 18.0 },
    { name: 'Integrated Tech', Budgeted: 35.0, Actual: 28.0 },
    { name: 'PMO', Budgeted: 5.0, Actual: 3.5 },
    { name: 'Corp Security', Budgeted: 8.0, Actual: 4.0 },
  ];

  const formatCurrency = (value: number) => `$${value}M`;

  return (
    <div className="bg-white min-h-screen">
      <Header />

      {/* Sample Data Warning Banner */}
      <div className="bg-red-600 text-white text-center py-3 px-4">
        <p className="font-sans text-lg font-bold uppercase tracking-wide">
          ⚠️ SAMPLE DATA ONLY - NOT LIVE ⚠️
        </p>
      </div>

      <main className="container mx-auto max-w-7xl py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-primary-blue mb-4 pb-3 border-b-2 border-[#F4F2F1]">
            Budget & Spend Report
          </h1>
          <p className="font-serif text-lg md:text-xl text-[#495057] max-w-3xl mt-6">
            Current-year approved budget, YTD spend, and financial forecasts for Open City and Technology.
          </p>
        </div>

        {/* Budget Sections */}
        <div className="space-y-12">

          {/* Capital Budget Section */}
          <div className="bg-[#D3ECEF] rounded-lg p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h2 className="font-sans text-3xl font-bold text-[#212529]">
                Capital Budget
              </h2>
              <Link
                href="/budget/capital"
                className="mt-4 md:mt-0 font-sans text-sm font-semibold text-primary-blue hover:text-[#193A5A] transition-colors"
              >
                View Detailed Capital Dashboard →
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Overall Chart */}
              <div className="bg-white/50 rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Overall Performance</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={capitalOverallData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={formatCurrency} />
                      <Tooltip formatter={(value: number) => formatCurrency(value)} />
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
                    <BarChart data={capitalSectionData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" interval={0} angle={-15} textAnchor="end" height={60} />
                      <YAxis tickFormatter={formatCurrency} />
                      <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      <Legend />
                      <Bar dataKey="Budgeted" fill="#005087" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Actual" fill="#2A9D8F" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Operating Budget Section */}
          <div className="bg-[#F4F2F1] rounded-lg p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h2 className="font-sans text-3xl font-bold text-[#212529]">
                Operating Budget
              </h2>
              <Link
                href="/budget/operating"
                className="mt-4 md:mt-0 font-sans text-sm font-semibold text-primary-blue hover:text-[#193A5A] transition-colors"
              >
                View Detailed Operating Dashboard →
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Overall Chart */}
              <div className="bg-white/50 rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">Overall Performance</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={operatingOverallData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={formatCurrency} />
                      <Tooltip formatter={(value: number) => formatCurrency(value)} />
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
                    <BarChart data={operatingSectionData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" interval={0} angle={-15} textAnchor="end" height={60} />
                      <YAxis tickFormatter={formatCurrency} />
                      <Tooltip formatter={(value: number) => formatCurrency(value)} />
                      <Legend />
                      <Bar dataKey="Budgeted" fill="#005087" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Actual" fill="#2A9D8F" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
