import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Important Links | Open City & Technology',
  description: 'Quick access to important internal and external resources, tools, and systems for Open City & Technology.',
};

const linkCategories = [
  {
    title: 'Incident & Problem Management',
    subtitle: '7 resources',
    iconBg: 'bg-red-50',
    iconColor: 'text-edmonton-error',
    open: false,
    links: [
      { name: 'Helix (Remedy) SmartIT', url: '#' },
      { name: 'Helix (Remedy) DWP', url: '#' },
      { name: 'Incident Management Process', url: '#' },
      { name: 'WO from Incident Ticket', url: '#' },
      { name: 'Incident Management Flow Charts', url: '#' },
      { name: 'Problem Mgmt Process Guide', url: '#' },
      { name: 'Root Cause Analysis (RCA)', url: '#' },
    ],
  },
  {
    title: 'Change Management',
    subtitle: '8 resources',
    iconBg: 'bg-blue-50',
    iconColor: 'text-process-blue',
    open: false,
    links: [
      { name: 'OCT Change Management', url: '#' },
      { name: 'OCT Schedule Outages', url: '#' },
      { name: 'Severity 1 Procedures', url: '#' },
      { name: 'OCT Change Management Definitions', url: '#' },
      { name: 'Change Approval - Form', url: '#' },
      { name: 'Work Order vs Change Ticket', url: '#' },
      { name: 'Remedy Definitions', url: '#' },
      { name: 'Change Ticket Cheat Sheet', url: '#' },
    ],
  },
  {
    title: 'Resource Management',
    subtitle: '9 resources',
    iconBg: 'bg-amber-50',
    iconColor: 'text-edmonton-warning',
    open: false,
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
    ],
  },
  {
    title: 'OCT Team Sites & Resources',
    subtitle: '9 resources',
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    open: false,
    isTeamGrid: true,
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
    ],
  },
];

const chevronSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-text-secondary transition-transform duration-300 group-open:rotate-180">
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

const externalIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-text-secondary flex-shrink-0">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
  </svg>
);

const categoryIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
  </svg>
);

export default function LinksPage() {
  return (
    <div className="bg-structural-light-gray min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 mb-12">
          <div className="max-w-3xl">
            <span className="uppercase tracking-widest text-[0.6875rem] font-bold text-process-blue mb-4 block">
              Open City &amp; Technology
            </span>
            <h1 className="font-sans text-5xl md:text-6xl font-extrabold tracking-tighter text-dark-blue leading-none mb-6">
              Central Resources<br />&amp; Intelligence
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl leading-relaxed">
              The authoritative directory for OCT Branch operations. Streamlining access to management tools, deployment protocols, and inter-departmental documentation.
            </p>
          </div>
        </section>

        {/* Accordion Directory */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="space-y-6">
            {linkCategories.map((category, catIndex) => (
              <details
                key={catIndex}
                className="group bg-white rounded-2xl border border-structural-gray-blue overflow-hidden"
                open={category.open || undefined}
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-structural-light-gray transition-colors list-none [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg ${category.iconBg} flex items-center justify-center ${category.iconColor}`}>
                      {categoryIcon}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-dark-blue">{category.title}</h2>
                      <p className="text-xs text-text-secondary">{category.subtitle}</p>
                    </div>
                  </div>
                  {chevronSvg}
                </summary>
                <div className="px-6 pb-8">
                  {'isTeamGrid' in category && category.isTeamGrid ? (
                    /* Team Sites — compact tag grid */
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-2">
                      {category.links.map((link, index) => {
                        const isExternal = link.url.startsWith('http');
                        return (
                          <a
                            key={index}
                            href={link.url}
                            target={isExternal ? '_blank' : undefined}
                            rel={isExternal ? 'noopener noreferrer' : undefined}
                            className="p-4 bg-structural-light-gray rounded-xl text-center hover:bg-dark-blue hover:text-white transition-all"
                          >
                            <span className="block font-bold text-xs">{link.name}</span>
                          </a>
                        );
                      })}
                    </div>
                  ) : (
                    /* Standard link cards grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                      {category.links.map((link, index) => {
                        const isExternal = link.url.startsWith('http');
                        return (
                          <a
                            key={index}
                            href={link.url}
                            target={isExternal ? '_blank' : undefined}
                            rel={isExternal ? 'noopener noreferrer' : undefined}
                            className="p-4 rounded-xl border border-structural-gray-blue hover:border-process-blue hover:shadow-sm transition-all bg-white"
                          >
                            <div className="flex justify-between mb-3">
                              <span className="text-process-blue">{categoryIcon}</span>
                              {externalIcon}
                            </div>
                            <h3 className="font-bold text-sm text-dark-blue">{link.name}</h3>
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Need Help / Request Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-20 pt-12 border-t border-structural-gray-blue">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <h3 className="text-2xl font-bold text-dark-blue tracking-tight mb-4">Need Help?</h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                If you can&apos;t find the link you&apos;re looking for or need assistance accessing a resource, please contact the Service Desk or your team lead.
              </p>
              <div className="p-4 bg-blue-50 rounded-lg flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-process-blue flex-shrink-0 mt-0.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
                <p className="text-xs text-dark-blue leading-snug">
                  Is there a critical tool or site missing from this directory? Let us know so we can add it.
                </p>
              </div>
            </div>
            <div className="md:w-2/3 bg-white p-8 rounded-2xl border border-structural-gray-blue flex items-center justify-between">
              <p className="text-text-secondary text-sm leading-relaxed max-w-md">
                Submit a request to the OCT PMO office to have a new resource indexed in the central registry.
              </p>
              <Link
                href="/contact"
                className="px-8 py-3 bg-dark-blue text-white font-bold rounded-lg hover:bg-primary-blue transition-all whitespace-nowrap ml-6"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
