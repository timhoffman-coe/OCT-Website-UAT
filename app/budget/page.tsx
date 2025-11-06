'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface GaugeProps {
  label: string;
  value: number;
  total: number;
  color: string;
}

function BudgetGauge({ label, value, total, color }: GaugeProps) {
  const percentage = Math.round((value / total) * 100);
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48">
        <svg className="transform -rotate-90 w-48 h-48">
          {/* Background circle */}
          <circle
            cx="96"
            cy="96"
            r="70"
            stroke="#E5E7EB"
            strokeWidth="16"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="96"
            cy="96"
            r="70"
            stroke={color}
            strokeWidth="16"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-gray-900">{percentage}%</span>
          <span className="text-sm text-gray-500 mt-1">of budget</span>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="font-sans text-sm font-semibold text-gray-500 uppercase mb-1">
          {label}
        </p>
        <p className="font-sans text-2xl font-bold text-gray-900">
          ${(value / 1000000).toFixed(1)}M
        </p>
        <p className="font-sans text-sm text-gray-500">
          of ${(total / 1000000).toFixed(1)}M
        </p>
      </div>
    </div>
  );
}

export default function BudgetPage() {
  // Sample data - replace with actual values
  const capitalBudgeted = 15000000;
  const capitalActual = 9500000;
  const operatingBudgeted = 85000000;
  const operatingActual = 63000000;

  return (
    <div className="bg-white min-h-screen">
      <Header />

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

        {/* Budget Sections - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Capital Budget Section */}
          <div className="bg-[#D3ECEF] rounded-lg p-8">
            <h2 className="font-sans text-3xl font-bold text-[#212529] mb-8">
              Capital Budget
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <BudgetGauge
                label="Budgeted"
                value={capitalBudgeted}
                total={capitalBudgeted}
                color="#005087"
              />
              <BudgetGauge
                label="Actual"
                value={capitalActual}
                total={capitalBudgeted}
                color="#2A9D8F"
              />
            </div>
            <a
              href="#"
              className="block w-full text-center font-sans text-base font-semibold bg-primary-blue text-white px-6 py-3 rounded-md hover:bg-[#193A5A] transition-colors"
            >
              View the Detailed Capital Dashboard →
            </a>
          </div>

          {/* Operating Budget Section */}
          <div className="bg-[#F4F2F1] rounded-lg p-8">
            <h2 className="font-sans text-3xl font-bold text-[#212529] mb-8">
              Operating Budget
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <BudgetGauge
                label="Budgeted"
                value={operatingBudgeted}
                total={operatingBudgeted}
                color="#005087"
              />
              <BudgetGauge
                label="Actual"
                value={operatingActual}
                total={operatingBudgeted}
                color="#2A9D8F"
              />
            </div>
            <a
              href="#"
              className="block w-full text-center font-sans text-base font-semibold bg-primary-blue text-white px-6 py-3 rounded-md hover:bg-[#193A5A] transition-colors"
            >
              View the Detailed Operating Dashboard →
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
