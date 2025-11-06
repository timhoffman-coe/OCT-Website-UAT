'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ServiceHealthPage() {
  const [lastUpdated, setLastUpdated] = useState('');
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' });
    const dateString = now.toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });
    setLastUpdated(`${dateString} at ${timeString}`);
  }, []);

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  type StatusType = 'operational' | 'partial-outage' | 'major-outage' | 'maintenance';

  const getStatusStyles = (status: StatusType) => {
    const styles = {
      'operational': 'bg-green-50 text-complement-sea-green border-green-200',
      'partial-outage': 'bg-yellow-50 text-complement-sunrise border-yellow-200',
      'major-outage': 'bg-red-50 text-complement-sunset border-red-200',
      'maintenance': 'bg-gray-50 text-complement-grey-flannel border-gray-200'
    };
    return styles[status];
  };

  const getStatusLabel = (status: StatusType) => {
    const labels = {
      'operational': 'Operational',
      'partial-outage': 'Partial Outage',
      'major-outage': 'Major Outage',
      'maintenance': 'Maintenance'
    };
    return labels[status];
  };

  const StatusPill = ({ status }: { status: StatusType }) => (
    <span className={`inline-block px-3 py-1.5 text-sm font-semibold uppercase tracking-wide rounded-full border min-w-[140px] text-center ${getStatusStyles(status)}`}>
      {getStatusLabel(status)}
    </span>
  );

  interface Service {
    name: string;
    status: StatusType;
  }

  interface ServiceCategory {
    id: string;
    name: string;
    status: StatusType;
    services?: Service[];
  }

  const applicationCategories: ServiceCategory[] = [
    {
      id: 'financial',
      name: 'Financial & Corporate Services',
      status: 'operational',
      services: [
        { name: 'SAP (Financials)', status: 'operational' },
        { name: 'PeopleSoft (HR)', status: 'operational' }
      ]
    },
    {
      id: 'city-ops',
      name: 'City Operations',
      status: 'operational',
      services: [
        { name: '311 Call Centre', status: 'operational' },
        { name: 'Fleet Management', status: 'operational' },
        { name: 'Waste Collection Services', status: 'operational' }
      ]
    },
    {
      id: 'community',
      name: 'Community Services',
      status: 'partial-outage',
      services: [
        { name: 'Recreation Facility Booking', status: 'partial-outage' },
        { name: 'Fire Rescue Dispatch', status: 'operational' }
      ]
    },
    {
      id: 'iis',
      name: 'Integrated Infrastructure Services (IIS)',
      status: 'maintenance',
      services: [
        { name: 'Construction Project Portal', status: 'maintenance' }
      ]
    },
    {
      id: 'urban-planning',
      name: 'Urban Planning and Economy',
      status: 'operational',
      services: [
        { name: 'Permit & Licensing', status: 'operational' },
        { name: 'Economic Data Portal', status: 'operational' }
      ]
    }
  ];

  const networkCategories: ServiceCategory[] = [
    {
      id: 'corporate-network',
      name: 'Corporate Network',
      status: 'operational',
      services: [
        { name: 'Campus', status: 'operational' },
        { name: 'Datacenter', status: 'operational' },
        { name: 'Wifi', status: 'operational' }
      ]
    }
  ];

  const CategorySection = ({ category, isLast = false }: { category: ServiceCategory; isLast?: boolean }) => {
    const isOpen = openSections.has(category.id);

    return (
      <li className={isLast ? '' : 'border-b border-gray-200'}>
        <button
          className="w-full px-6 py-5 flex items-center justify-between space-x-4 text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary-blue"
          onClick={() => toggleSection(category.id)}
          aria-expanded={isOpen}
        >
          <div className="flex items-center space-x-4">
            <div className="text-gray-500 flex-shrink-0">
              {isOpen ? (
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                </svg>
              ) : (
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              )}
            </div>
            <p className="text-lg font-medium text-gray-800">{category.name}</p>
          </div>
          <StatusPill status={category.status} />
        </button>

        {isOpen && category.services && (
          <div className="bg-gray-50 pl-16 pr-6 pb-4 pt-2">
            <ul className="divide-y divide-gray-100">
              {category.services.map((service, idx) => (
                <li key={idx} className="py-3 flex justify-between items-center">
                  <p className="text-sm text-gray-700">{service.name}</p>
                  <StatusPill status={service.status} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </li>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Overall Status Bar */}
        <div className="mb-10 p-5 bg-green-100 border border-green-200 rounded-lg shadow-sm flex items-center space-x-4">
          <div className="flex-shrink-0">
            <svg className="h-10 w-10 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-green-800">All systems operational</h2>
            <p className="text-green-700 mt-1">
              All services are currently running smoothly. Last checked: <span className="font-medium">{lastUpdated}</span>
            </p>
          </div>
        </div>

        {/* Application Status */}
        <section className="mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-3 border-primary-blue">
            Application Status
          </h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <ul className="divide-y-0">
              {applicationCategories.map((category, idx) => (
                <CategorySection
                  key={category.id}
                  category={category}
                  isLast={idx === applicationCategories.length - 1}
                />
              ))}
            </ul>
          </div>
        </section>

        {/* Network Status */}
        <section className="mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-3 border-primary-blue">
            Network Status
          </h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <ul className="divide-y-0">
              {networkCategories.map((category) => (
                <CategorySection
                  key={category.id}
                  category={category}
                  isLast={true}
                />
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
