'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LeadershipPage() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );

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

  const branchManagerOffice = {
    section: "Branch Manager's Office",
    members: [
      { role: 'Branch Manager', name: 'Daryl Croft', email: 'daryl.croft@edmonton.ca', image: '/images/Daryl.webp' },
      { role: 'Administrative Assistant', name: 'Charalyn Parlee', email: 'charalyn.parlee@edmonton.ca', image: '/images/Portraits/Charalyn.webp' },
      { role: 'Strategic Coordinator', name: 'Andrew Clark', email: 'andrew.clark@edmonton.ca', image: '/images/Portraits/Andrew.webp' },
    ]
  };

  const businessUnits = [
    {
      section: 'Application Technology Services',
      link: '/application-technology-services',
      members: [
        { role: 'Director', name: 'Robert Dufresne', email: 'robert.dufresne@edmonton.ca', image: '/images/Portraits/Bob.webp' },
        { role: 'Program Manager', name: 'Matthew Raven', email: 'matthew.raven@edmonton.ca' },
        { role: 'Program Manager', name: 'Margaret Cieslak-Olmos', email: 'margaret.cieslak-olmos@edmonton.ca' },
        { role: 'Program Manager', name: 'Ken Merkel', email: 'ken.merkel@edmonton.ca' },
      ]
    },
    {
      section: 'Corporate Information and Security Office',
      link: '/corporate-information-security',
      members: [
        { role: 'Director', name: 'Daniel Pedersen', email: 'daniel.pedersen@edmonton.ca', image: '/images/Portraits/Daniel.webp' },
        { role: 'Program Manager', name: 'Andrea Buchholz', email: 'andrea.buchholz@edmonton.ca' },
        { role: 'Program Manager', name: 'David Malone', email: 'david.malone@edmonton.ca' },
        { role: 'Program Manager', name: 'Jack Truong', email: 'jack.truong@edmonton.ca' },
        { role: 'Program Manager', name: 'Kevin McKay', email: 'kevin.mckay@edmonton.ca' },
      ]
    },
    {
      section: 'Integrated Technology Solutions',
      link: '/integrated-technology-solutions',
      members: [
        { role: 'Director', name: 'Mike Fryer', email: 'mike.fryer@edmonton.ca', image: '/images/Portraits/Mike.webp' },
        { role: 'Program Manager', name: 'Josh McGillis', email: 'josh.mcgillis@edmonton.ca' },
        { role: 'Program Manager', name: 'Greg Krol', email: 'greg.krol@edmonton.ca' },
        { role: 'Program Manager', name: 'Tim Hoffman', email: 'tim.hoffman@edmonton.ca' },
        { role: 'Program Manager', name: 'Alex Noot', email: 'alex.noot@edmonton.ca' },
        { role: 'Technical Lead', name: 'Kevin Wang', email: 'kevin.wang@edmonton.ca' },
      ]
    },
    {
      section: 'Project Management Office',
      link: '/project-management-office',
      members: [
        { role: 'Director', name: 'Nisreen Hussain', email: 'nisreen.hussain@edmonton.ca', image: '/images/Portraits/Nisreen.webp' },
        { role: 'Program Manager', name: 'Liviu Jalba', email: 'liviu.jalba@edmonton.ca' },
        { role: 'Program Manager', name: 'Shengxi Jin', email: 'shengxi.jin@edmonton.ca' },
      ]
    },
    {
      section: 'Technology Planning',
      link: '/technology-planning',
      members: [
        { role: 'Director', name: 'Troy Murray', email: 'troy.murray@edmonton.ca', image: '/images/Portraits/Troy.webp' },
        { role: 'Program Manager', name: 'Liza Wong', email: 'liza.wong@edmonton.ca' },
        { role: 'Program Manager', name: 'Mike Meraw', email: 'mike.meraw@edmonton.ca' },
        { role: 'Program Manager', name: 'Romelia Fernandez', email: 'romelia.fernandez@edmonton.ca' },
      ]
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <main className="p-4 md:p-8 lg:p-12">
        {/* Page Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-blue mb-4">
            Leadership Team
          </h1>
          <p className="font-sans text-lg text-gray-700">
            Meet the leadership team behind Open City and Technology. Our experienced leaders guide the strategic direction and operational excellence of our branch.
          </p>
        </div>

        {/* Branch Manager's Office - Always Visible */}
        <div className="max-w-7xl mx-auto mb-10">
          <div className="bg-gradient-to-r from-complement-empire-blue to-primary-blue rounded-lg shadow-xl p-8">
            <div className="flex items-center mb-6">
              <div className="w-1 h-12 bg-complement-sea-green mr-4"></div>
              <h2 className="font-sans text-3xl font-bold text-white">
                {branchManagerOffice.section}
              </h2>
            </div>
            <p className="font-sans text-white/90 mb-6">Primary contact for Open City and Technology</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {branchManagerOffice.members.map((member, memberIdx) => (
                <div key={memberIdx} className="bg-white rounded-lg p-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={96}
                        height={96}
                        sizes="96px"
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-sans text-sm font-semibold text-complement-empire-blue uppercase mb-1">
                        {member.role}
                      </p>
                      <h3 className="font-sans text-lg font-bold text-gray-800 mb-2">
                        {member.name}
                      </h3>
                      <a
                        href={`mailto:${member.email}`}
                        className="font-sans text-sm text-complement-sea-green hover:text-primary-blue transition-colors"
                      >
                        {member.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Business Units - Collapsible */}
        <div className="max-w-7xl mx-auto">
          <h2 className="font-sans text-2xl font-bold text-gray-800 mb-6 ml-4">
            Business Units
          </h2>
          <div className="space-y-4 ml-8 border-l-4 border-primary-blue pl-8">
            {businessUnits.map((unit, idx) => {
              const isExpanded = expandedSections.has(unit.section);
              return (
                <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <button
                    onClick={() => toggleSection(unit.section)}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2"
                    aria-expanded={isExpanded}
                  >
                    <h3 className="font-sans text-xl font-bold text-primary-blue text-left">
                      {unit.section}
                    </h3>
                    <div className="flex-shrink-0 ml-4">
                      {isExpanded ? (
                        <svg className="h-6 w-6 text-primary-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      ) : (
                        <svg className="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="bg-gray-50">
                      <div className="px-6 pt-2 pb-4">
                        {/* Director Section */}
                        {unit.members.filter(m => m.role === 'Director' && m.image).map((director, idx) => (
                          <div key={idx} className="bg-white border border-gray-200 rounded-lg p-5 mb-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                <Image
                                  src={director.image!}
                                  alt={director.name}
                                  width={96}
                                  height={96}
                                  sizes="96px"
                                  className="w-24 h-24 rounded-lg object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="font-sans text-sm font-semibold text-complement-empire-blue uppercase mb-1">
                                  {director.role}
                                </p>
                                <h4 className="font-sans text-lg font-bold text-gray-800 mb-2">
                                  {director.name}
                                </h4>
                                <a
                                  href={`mailto:${director.email}`}
                                  className="font-sans text-sm text-complement-sea-green hover:text-primary-blue transition-colors"
                                >
                                  {director.email}
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Program Managers and Other Staff Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {unit.members.filter(m => m.role !== 'Director').map((member, memberIdx) => (
                            <div key={memberIdx} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                              <p className="font-sans text-sm font-semibold text-complement-empire-blue uppercase mb-1">
                                {member.role}
                              </p>
                              <h4 className="font-sans text-lg font-bold text-gray-800 mb-2">
                                {member.name}
                              </h4>
                              <a
                                href={`mailto:${member.email}`}
                                className="font-sans text-sm text-complement-sea-green hover:text-primary-blue transition-colors"
                              >
                                {member.email}
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Link
                        href={unit.link}
                        className="block bg-primary-blue hover:bg-complement-empire-blue text-white text-center font-sans font-semibold py-4 transition-colors"
                      >
                        More Information About {unit.section}
                        <svg className="inline-block ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact Information */}
        <div className="max-w-7xl mx-auto mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="font-sans text-2xl font-bold text-primary-blue mb-4">
            Contact Us
          </h2>
          <p className="font-sans text-gray-700 mb-4">
            For general inquiries about Open City and Technology services, please reach out to the appropriate business unit or contact the Branch Manager&apos;s office.
          </p>
          <p className="font-sans text-gray-600 text-sm">
            Updated: January 2025
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
