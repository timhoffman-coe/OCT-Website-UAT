'use client';

import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ArchitectureFlow = dynamic(
  () => import('@/components/oct-architecture/ArchitectureFlow'),
  { ssr: false, loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-cyan-500/60 text-sm font-sans animate-pulse">Loading diagram...</div>
    </div>
  )}
);

export default function OCTArchitecturePage() {
  return (
    <div className="bg-[#0a0e17] min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-[95%] mx-auto">
          {/* Page Header */}
          <div className="mb-4">
            <h1 className="font-sans text-2xl md:text-3xl font-bold text-white">
              OCT Network Architecture
            </h1>
            <p className="font-sans text-sm text-cyan-500/60 mt-1">
              City of Edmonton — Enterprise Network Topology
            </p>
          </div>

          {/* Instructions */}
          <div className="mb-3 flex items-center gap-3 text-[11px] text-gray-600 font-sans">
            <span>Scroll to zoom</span>
            <span className="text-gray-700">|</span>
            <span>Click & drag to pan</span>
            <span className="text-gray-700">|</span>
            <span>Pinch to zoom on mobile</span>
          </div>

          {/* React Flow Canvas */}
          <div className="w-full h-[calc(100vh-220px)] min-h-[500px] rounded-lg border border-cyan-900/30 overflow-hidden bg-[#080c14]">
            <ArchitectureFlow />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
