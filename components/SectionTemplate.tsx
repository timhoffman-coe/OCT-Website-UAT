'use client';

import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import ServiceAreaCard from './ServiceAreaCard';
import ServiceAreaModal from './ServiceAreaModal';

export interface ServiceArea {
  id: string;
  title: string;
  icon?: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  link?: string;
}

interface SectionTemplateProps {
  pageTitle: string;
  pageDescription: string;
  serviceAreas: ServiceArea[];
}

export default function SectionTemplate({
  pageTitle,
  pageDescription,
  serviceAreas,
}: SectionTemplateProps) {
  const [selectedArea, setSelectedArea] = useState<ServiceArea | null>(null);

  return (
    <div className="bg-white min-h-screen">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Page Title Section */}
        <div className="mb-12">
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-primary-blue mb-4 pb-3 border-b-2 border-[#F4F2F1]">
            {pageTitle}
          </h1>
          <p className="font-serif text-lg md:text-xl text-[#495057] max-w-3xl mt-6">
            {pageDescription}
          </p>
        </div>

        {/* Service Areas Section */}
        <section>
          <h2 className="font-sans text-3xl font-bold text-primary-blue mb-8 pb-3 border-b-2 border-[#F4F2F1]">
            Our Service Areas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {serviceAreas.map((area) => (
              <ServiceAreaCard
                key={area.id}
                title={area.title}
                icon={area.icon}
                shortDescription={area.shortDescription}
                link={area.link}
                onClick={() => setSelectedArea(area)}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Modal */}
      <ServiceAreaModal
        isOpen={!!selectedArea}
        onClose={() => setSelectedArea(null)}
        title={selectedArea?.title || ''}
        icon={selectedArea?.icon}
        fullDescription={selectedArea?.fullDescription || ''}
        features={selectedArea?.features || []}
      />

      <Footer />
    </div>
  );
}
