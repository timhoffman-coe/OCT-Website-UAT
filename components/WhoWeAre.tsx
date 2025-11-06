'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function WhoWeAre() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const accordionItems = [
    {
      title: 'Connect with OCT',
      content: 'Learn how to engage with our team, submit requests, and collaborate on technology initiatives. Contact our leadership team for inquiries.',
      link: '/leadership',
    },
    {
      title: 'Branch Overview',
      content: 'Discover our organizational structure, mission, vision, key actions for 2025-2026, and how we support the City of Edmonton.',
      link: '/about',
    },
    {
      title: 'Services',
      content: 'Explore the comprehensive range of technology services we provide through our five business units: Technology Planning, Business Solutions, Integrated Technology Solutions, Project Management Office, and Corporate Information Security.',
      link: '/business-solutions',
    },
    {
      title: 'Technology Strategies & Directives',
      content: 'Review our strategic plans, key actions for 2025-2026, capital projects, and performance metrics that guide technology decisions across the City.',
      link: '/about',
    },
  ];

  return (
    <section id="who-we-are" className="bg-[#F4F2F1] py-16 sm:py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-sans text-3xl font-bold text-center text-primary-blue mb-10 md:mb-12">
          Who We Are
        </h2>

        {/* Unified Card Container */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Video/Network Architecture */}
            <div className="p-6 lg:border-r border-gray-200">
              <h3 className="font-sans text-xl font-bold text-gray-800 mb-4">
                Learn more about OCT
              </h3>
              <p className="text-gray-600 mb-4">
                Watch this overview to learn more about our branch.
              </p>

              {/* Video Placeholder */}
              <div className="relative bg-gray-200 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block bg-primary-blue rounded-full p-4 mb-2">
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                  <p className="font-sans text-sm text-gray-600">
                    Edmonton&apos;s Digital Backbone
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Accordion Navigation */}
            <div className="p-6">
              <h3 className="font-sans text-xl font-bold text-gray-800 mb-4">
                Helpful Information and Resources
              </h3>
              <p className="text-gray-600 mb-6">
                View detailed diagrams for core network segments.
              </p>

              <div className="space-y-3">
              {accordionItems.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <span className="font-sans font-semibold text-gray-800">
                      {item.title}
                    </span>
                    <svg
                      className={`w-5 h-5 text-primary-blue transition-transform ${
                        openAccordion === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {openAccordion === index && (
                    <div className="p-4 bg-white border-t border-gray-200">
                      <p className="text-gray-600 mb-3">{item.content}</p>
                      <Link
                        href={item.link}
                        className="inline-flex items-center text-primary-blue hover:text-complement-empire-blue font-semibold"
                      >
                        Learn More
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
