'use client';

import { useState } from 'react';
import ServiceAreaCard from '@/components/ServiceAreaCard';
import ServiceAreaModal from '@/components/ServiceAreaModal';
import type { ServiceArea } from '@/components/SectionTemplate';

interface ServiceAreasWidgetProps {
  serviceAreas: ServiceArea[];
}

export default function ServiceAreasWidget({ serviceAreas }: ServiceAreasWidgetProps) {
  const [selectedArea, setSelectedArea] = useState<ServiceArea | null>(null);

  if (serviceAreas.length === 0) return null;

  return (
    <>
      <section>
        <h2 className="font-sans text-3xl font-bold text-primary-blue mb-8 pb-3 border-b-2 border-structural-gray-blue">
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
              isPublished={area.isPublished}
              onClick={() => setSelectedArea(area)}
            />
          ))}
        </div>
      </section>
      <ServiceAreaModal
        isOpen={!!selectedArea}
        onClose={() => setSelectedArea(null)}
        title={selectedArea?.title || ''}
        icon={selectedArea?.icon}
        fullDescription={selectedArea?.fullDescription || ''}
        features={selectedArea?.features || []}
      />
    </>
  );
}
