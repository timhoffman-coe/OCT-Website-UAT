'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

// Define searchable pages with their content
const searchablePages = [
  {
    title: 'About Open City and Technology',
    url: '/about',
    keywords: ['about', 'branch', 'overview', 'daryl croft', 'manager', 'technology', 'data', 'cybersecurity', 'strategic partnership', 'key actions', 'capital projects', 'performance'],
    description: 'Learn about Open City and Technology branch, our mission, leadership, and key initiatives.'
  },
  {
    title: 'Leadership',
    url: '/leadership',
    keywords: ['leadership', 'team', 'management', 'directors', 'managers'],
    description: 'Meet our leadership team at Open City and Technology.'
  },
  {
    title: 'Technology Planning',
    url: '/technology-planning',
    keywords: ['technology planning', 'governance', 'investment', 'business engagement', 'intake', 'vendor management', 'contract', 'asset management'],
    description: 'Technology Investment & Governance, Business Engagement & Intake, Vendor & Contract Management, IT Asset Management.'
  },
  {
    title: 'Application Technology Services',
    url: '/application-technology-services',
    keywords: ['application technology services', 'application development', 'support', 'artificial intelligence', 'ai', 'software'],
    description: 'Application Development & Support, and Artificial Intelligence solutions.'
  },
  {
    title: 'Integrated Technology Solutions',
    url: '/integrated-technology-solutions',
    keywords: ['integrated technology solutions', 'infrastructure', 'operations', 'network', 'data center', 'voice', 'mobility', 'iot', 'desktop', 'end-user support', 'service management', 'monitoring'],
    description: 'Technology Infrastructure Operations, Network & Data Center, Voice/Mobility/IoT, Desktop Support, Service Management.'
  },
  {
    title: 'Project Management Office',
    url: '/project-management-office',
    keywords: ['project management', 'pmo', 'office', 'projects', 'delivery'],
    description: 'Project Management Services and delivery excellence.'
  },
  {
    title: 'Corporate Information Security',
    url: '/corporate-information-security',
    keywords: ['security', 'cybersecurity', 'information security', 'risk management', 'identity', 'access management', 'iam'],
    description: 'Cybersecurity & Risk Management, Identity & Access Management.'
  },
  {
    title: 'Services',
    url: '/services',
    keywords: ['services', 'all services', 'offerings', 'technology services'],
    description: 'View all services offered by Open City and Technology.'
  },
  {
    title: 'Contact',
    url: '/contact',
    keywords: ['contact', 'reach us', 'get in touch', 'email', 'phone', 'support'],
    description: 'Get in touch with Open City and Technology.'
  },
  {
    title: 'Service Health',
    url: '/service-health',
    keywords: ['service health', 'status', 'uptime', 'availability', 'incidents', 'outages'],
    description: 'Check the current status of our technology services.'
  },
  {
    title: 'Policies, Directives & Procedures',
    url: '/policies',
    keywords: ['policies', 'directives', 'procedures', 'governance', 'compliance', 'rules'],
    description: 'Access our policies, directives, and procedures.'
  },

  {
    title: 'Technology Strategies',
    url: '/technology-strategies',
    keywords: ['strategies', 'strategic planning', 'roadmap', 'vision', 'future'],
    description: 'Explore our technology strategies and roadmaps.'
  },
  {
    title: 'Budget & Spend',
    url: '/budget',
    keywords: ['budget', 'spending', 'financial', 'allocation', 'costs'],
    description: 'View budget and spending information.'
  },
  {
    title: 'OCT Org Chart',
    url: '/org-chart',
    keywords: ['org chart', 'organization', 'structure', 'hierarchy', 'team structure'],
    description: 'View the organizational chart for Open City and Technology.'
  },
  {
    title: 'Dashboards',
    url: '/dashboards',
    keywords: ['dashboards', 'metrics', 'analytics', 'reporting', 'data visualization'],
    description: 'Access our dashboards and analytics.'
  },
  {
    title: 'AI Resources',
    url: '/ai-resources',
    keywords: ['ai', 'artificial intelligence', 'machine learning', 'automation', 'ai resources'],
    description: 'Explore AI resources and information.'
  },
  {
    title: 'Links',
    url: '/links',
    keywords: ['links', 'resources', 'external links', 'references'],
    description: 'Useful links and external resources.'
  },
  {
    title: 'Home',
    url: '/',
    keywords: ['home', 'main page', 'welcome', 'edmonton', 'city of edmonton'],
    description: 'Welcome to Open City and Technology.'
  }
];

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  // Filter pages based on search query
  const results = query.trim()
    ? searchablePages.filter(page => {
        const searchLower = query.toLowerCase();
        return (
          page.title.toLowerCase().includes(searchLower) ||
          page.description.toLowerCase().includes(searchLower) ||
          page.keywords.some(keyword => keyword.toLowerCase().includes(searchLower))
        );
      })
    : [];

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <main className="p-4 md:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-blue mb-4">
              Search Results
            </h1>
            {query && (
              <p className="font-sans text-lg text-gray-700">
                Showing results for: <span className="font-semibold text-primary-blue">{query}</span>
              </p>
            )}
          </div>

          {/* Results */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {!query.trim() ? (
              <div className="text-center py-12">
                <p className="font-sans text-gray-600 text-lg">
                  Please enter a search term to find pages.
                </p>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-6">
                <p className="font-sans text-gray-600 mb-6">
                  Found {results.length} {results.length === 1 ? 'result' : 'results'}
                </p>
                {results.map((page, idx) => (
                  <div key={idx} className="border-l-4 border-complement-sea-green pl-6 py-3 hover:bg-gray-50 transition-colors">
                    <Link href={page.url} className="group">
                      <h2 className="font-sans text-xl font-bold text-primary-blue group-hover:text-complement-empire-blue mb-2">
                        {page.title}
                      </h2>
                      <p className="font-sans text-gray-700 mb-2">
                        {page.description}
                      </p>
                      <p className="font-sans text-sm text-complement-sea-green group-hover:underline">
                        {`https://oct.edmonton.ca${page.url}`}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="font-sans text-gray-600 text-lg mb-4">
                  No results found for &quot;<span className="font-semibold">{query}</span>&quot;
                </p>
                <p className="font-sans text-gray-600">
                  Try different keywords or check the spelling.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="bg-gray-100 min-h-screen">
        <Header />
        <main className="p-4 md:p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <p className="font-sans text-gray-600 text-center">Loading search results...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
