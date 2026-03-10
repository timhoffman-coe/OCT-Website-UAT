'use client';

import { useState } from 'react';
import Link from 'next/link';

interface WhoWeAreItem {
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
}

export default function WhoWeAreWidget({ items }: { items: WhoWeAreItem[] }) {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  if (items.length === 0) return null;

  return (
    <section className="bg-[#F4F2F1] py-16 sm:py-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-sans text-3xl font-bold text-center text-primary-blue mb-10 md:mb-12">
          Who We Are
        </h2>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Video Placeholder */}
            <div className="p-6 lg:border-r border-gray-200">
              <h3 className="font-sans text-xl font-bold text-gray-800 mb-4">
                Learn more about our team
              </h3>
              <p className="text-gray-600 mb-4">
                Watch this overview to learn more about what we do.
              </p>

              <div className="relative bg-gray-200 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block bg-primary-blue rounded-full p-4 mb-2">
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                  <p className="font-sans text-sm text-gray-600">
                    Video Coming Soon
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
                Explore key areas and learn more about our work.
              </p>

              <div className="space-y-3">
                {items.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <span className="font-sans font-semibold text-gray-800">
                        {item.title}
                      </span>
                      <svg
                        className={`w-5 h-5 text-primary-blue transition-transform ${openAccordion === index ? 'rotate-180' : ''}`}
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
                        <p className="text-gray-600 mb-3">{item.description}</p>
                        <Link
                          href={item.linkUrl}
                          className="inline-flex items-center text-primary-blue hover:text-complement-empire-blue font-semibold"
                        >
                          {item.linkText}
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
