/*
 * Organizational Chart Page
 *
 * Libraries Tried:
 * 1. primereact/organizationchart - Works but only horizontal layout, causes excessive scrolling
 * 2. react-organizational-chart - Described as "complete disaster"
 * 3. orgchart (jQuery version) - Had unresolved "relationship" property errors
 * 4. @dabeng/react-orgchart - CSS import compatibility issues with Next.js 16 + Turbopack
 */

'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function OrgChartPage() {
  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="container mx-auto max-w-7xl py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-primary-blue mb-4 pb-3 border-b-2 border-[#F4F2F1]">
            OCT Organizational Chart
          </h1>
        </div>

        {/* Coming Soon Message */}
        <div className="text-center py-16">
          <p className="font-serif text-xl text-[#495057]">
            Coming Soon
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
