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
}

interface SectionTemplateProps {
  pageTitle: string;
  pageDescription: string;
  heroColor?: string;
  serviceAreas: ServiceArea[];
}

export default function SectionTemplate({
  pageTitle,
  pageDescription,
  heroColor = 'bg-primary-blue',
  serviceAreas,
}: SectionTemplateProps) {
  const [selectedArea, setSelectedArea] = useState<ServiceArea | null>(null);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className={`${heroColor} py-16 md:py-20`}>
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-white mb-4">
            {pageTitle}
          </h1>
          <p className="font-serif text-lg md:text-xl text-white/90 max-w-3xl">
            {pageDescription}
          </p>
        </div>
      </section>

      {/* Service Areas Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-sans text-3xl font-bold text-center text-gray-900 mb-12">
            Our Service Areas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceAreas.map((area) => (
              <ServiceAreaCard
                key={area.id}
                title={area.title}
                icon={area.icon}
                shortDescription={area.shortDescription}
                onClick={() => setSelectedArea(area)}
              />
            ))}
          </div>
        </div>
      </section>

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
