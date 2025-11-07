'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { OrgChart } from './OrgChart';
import { octOrgData } from './data';

export default function OrgChartPage() {
  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="container mx-auto max-w-7xl py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-12 max-w-7xl mx-auto">
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-primary-blue mb-4 pb-3 border-b-2 border-[#F4F2F1]">
            OCT Organizational Chart
          </h1>
          <p className="font-serif text-lg md:text-xl text-[#495057] max-w-3xl mt-6">
            View the complete organizational structure of Open City & Technology. Click on any card to expand and view direct reports.
          </p>
        </div>

        {/* Organizational Chart */}
        <div className="w-full">
          <OrgChart data={octOrgData.root} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
