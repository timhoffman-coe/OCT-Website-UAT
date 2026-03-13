'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LinksPage() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(section)) {
        newSet.delete(section);
      } else {
        newSet.add(section);
      }
      return newSet;
    });
  };

  const linkCategories = [
    {
      id: 'incident',
      title: 'Incident & Problem Management',
      links: [
        { name: 'Helix (Remedy) SmartIT', url: '#' },
        { name: 'Helix (Remedy) DWP', url: '#' },
        { name: 'Incident Management Process', url: '#' },
        { name: 'WO from Incident Ticket', url: '#' },
        { name: 'Incident Management Flow Charts', url: '#' },
        { name: 'Problem Mgmt Process Guide', url: '#' },
        { name: 'Root Cause Analysis (RCA)', url: '#' },
      ]
    },
    {
      id: 'change',
      title: 'Change Management',
      links: [
        { name: 'OCT Change Management', url: '#' },
        { name: 'OCT Schedule Outages', url: '#' },
        { name: 'Severity 1 Procedures', url: '#' },
        { name: 'OCT Change Management Definitions', url: '#' },
        { name: 'Change Approval - Form', url: '#' },
        { name: 'Work Order vs Change Ticket', url: '#' },
        { name: 'Remedy Definitions', url: '#' },
        { name: 'Change Ticket Cheat Sheet', url: '#' },
      ]
    },
    {
      id: 'resource',
      title: 'Resource Management',
      links: [
        { name: 'Taleo', url: '#' },
        { name: 'Recruitment Toolkit', url: '#' },
        { name: 'Recruitment Approval Process User Guide', url: '#' },
        { name: 'Recruitment Approval Form', url: '#' },
        { name: 'SAP Time Entry Request', url: '#' },
        { name: 'New Account Request', url: '#' },
        { name: 'Phone Request', url: '#' },
        { name: 'Offboarding Link', url: '#' },
        { name: 'Supervisor Offboarding Checklist', url: '#' },
      ]
    },
    {
      id: 'oct',
      title: 'OCT Team Sites & Resources',
      links: [
        { name: 'OCT Service Catalog', url: '#' },
        { name: 'Technology Infrastructure Operations', url: '#' },
        { name: 'Service Desk', url: '#' },
        { name: 'Service Management Office', url: '#' },
        { name: 'Enterprise Commons Project', url: '#' },
        { name: 'OCT Employee Links', url: '#' },
        { name: 'Technology PMO', url: '#' },
        { name: 'Open Data Portal', url: 'https://data.edmonton.ca' },
        { name: 'Open City', url: '#' },
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="container mx-auto max-w-7xl py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-primary-blue mb-4 pb-3 border-b-2 border-[#F4F2F1]">
            Important Links
          </h1>
          <p className="font-serif text-lg md:text-xl text-[#495057] max-w-3xl mt-6">
            Quick access to important internal and external resources, tools, and systems for Open City & Technology.
          </p>
        </div>

        {/* Accordion Links */}
        <div className="space-y-2">
          {linkCategories.map((category) => {
            const isExpanded = expandedSections.has(category.id);
            return (
              <div
                key={category.id}
                className="border-2 border-[#DDE3E6] rounded-lg overflow-hidden bg-white"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleSection(category.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#F4F2F1] transition-colors focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2"
                  aria-expanded={isExpanded}
                  aria-controls={`accordion-content-${category.id}`}
                >
                  <h2 className="font-sans text-xl font-semibold text-[#212529] text-left">
                    {category.title}
                  </h2>
                  <div className="flex-shrink-0 ml-4">
                    <svg
                      className={`h-5 w-5 text-primary-blue transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Accordion Content */}
                {isExpanded && (
                  <div
                    id={`accordion-content-${category.id}`}
                    className="bg-[#F4F2F1] px-6 py-4 animate-fadeIn"
                  >
                    <ul className="space-y-2">
                      {category.links.map((link, index) => (
                        <li key={index}>
                          <a
                            href={link.url}
                            className="font-sans text-base text-[#495057] hover:text-primary-blue transition-colors flex items-center"
                            target={link.url.startsWith('http') ? '_blank' : undefined}
                            rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                          >
                            <svg
                              className="h-4 w-4 mr-2 flex-shrink-0 text-primary-blue"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                            {link.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-[#D3ECEF] rounded-lg p-8">
          <h2 className="font-sans text-2xl font-bold text-[#212529] mb-4">
            Need Help?
          </h2>
          <p className="font-sans text-base text-[#495057] mb-4">
            If you can&apos;t find the link you&apos;re looking for or need assistance accessing a resource, please contact the Service Desk or your team lead.
          </p>
          <Link
            href="/contact"
            className="inline-block font-sans text-base font-semibold bg-primary-blue text-white px-6 py-3 rounded-md hover:bg-[#193A5A] transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
