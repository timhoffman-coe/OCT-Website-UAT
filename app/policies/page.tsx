'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const categories = [
  { id: 'all', label: 'Overview', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" /> },
  { id: 'security', label: 'Security & Risk', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /> },
  { id: 'infrastructure', label: 'Infrastructure', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" /> },
  { id: 'governance', label: 'Data Governance', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /> },
  { id: 'personnel', label: 'Personnel', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" /> },
];

const policies = [
  {
    title: 'Acceptable Use of Communication Technology',
    type: 'Directive & Procedure',
    code: 'A1429D',
    category: 'infrastructure',
    description: 'Guidelines for appropriate and responsible use of City communication technology resources.',
    url: 'https://www.edmonton.ca/city_government/documents/acceptable_use_of_communication_technology_A1429D_administrative_directive.pdf',
    featured: true,
  },
  {
    title: 'IT Hardware & Software - Non Standard Request',
    type: 'Directive & Procedure',
    code: 'A1442B',
    category: 'infrastructure',
    description: 'Process and requirements for requesting non-standard IT hardware and software.',
    url: 'https://www.edmonton.ca/city_government/documents/PDF/IT-Hardware-and-Software-Non-Standard-Request-A1442B.pdf',
  },
  {
    title: 'IT Investment & Architecture',
    type: 'Directive & Procedure',
    code: 'A1457',
    category: 'governance',
    description: 'Framework for IT investment decisions and enterprise architecture governance.',
    url: 'https://www.edmonton.ca/city_government/documents/PoliciesDirectives/A1457_IT_Investment_and_Architecture_Directive%281%29.pdf',
  },
  {
    title: 'Open City Policy',
    type: 'Policy',
    code: 'C581',
    category: 'governance',
    description: 'City policy promoting openness, transparency, and public access to data and information.',
    url: 'https://www.edmonton.ca/city_government/documents/PoliciesDirectives/C581.pdf',
  },
  {
    title: 'Overtime and Afterhours',
    type: 'Standard Operating Procedures',
    code: 'SOP',
    category: 'personnel',
    description: 'Procedures for managing overtime and after-hours support for technology services.',
    url: 'https://docs.google.com/document/d/1Qlt4E2G8jhZMhJ0NFGsq8t0hlBfQEB5TXCk2Sbg3jDE/edit',
  },
];

const domainCards = [
  { id: 'security', label: 'Cybersecurity', count: 'Coming Soon', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /> },
  { id: 'governance', label: 'Governance', count: '2 Policies', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" /> },
  { id: 'governance', label: 'Data Management', count: 'Coming Soon', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /> },
  { id: 'infrastructure', label: 'Infrastructure', count: '2 Policies', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" /> },
];

const typeBadgeColor: Record<string, string> = {
  'Directive & Procedure': 'bg-process-blue/10 text-process-blue',
  'Policy': 'bg-edmonton-success/10 text-edmonton-success',
  'Standard Operating Procedures': 'bg-edmonton-warning/10 text-edmonton-warning',
};

export default function PoliciesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPolicies = policies.filter(p => {
    const matchesCat = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featuredPolicy = policies.find(p => p.featured);

  return (
    <div className="bg-structural-light-gray min-h-screen flex flex-col">

      <Header />

      <div className="flex flex-1">
        {/* Sidebar — hidden on mobile */}
        <aside className="hidden lg:flex h-[calc(100vh-4rem)] w-72 pt-8 sticky top-16 left-0 bg-white border-r border-structural-gray-blue flex-col">
          <div className="px-8 mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-dark-blue rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-black text-dark-blue leading-tight">Policy Directory</h2>
                <p className="text-[10px] uppercase tracking-widest text-text-secondary font-bold">OCT Branch</p>
              </div>
            </div>
          </div>

          {/* Search in sidebar */}
          <div className="px-6 mb-4">
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-structural-light-gray border-none rounded-lg text-sm text-dark-blue placeholder:text-text-secondary focus:ring-2 focus:ring-process-blue/20"
                placeholder="Search policies..."
              />
            </div>
          </div>

          <nav className="flex flex-col flex-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-left px-6 py-3 flex items-center gap-3 transition-colors ${
                  activeCategory === cat.id
                    ? 'text-dark-blue font-bold bg-structural-gray-blue rounded-r-full'
                    : 'text-text-secondary hover:bg-structural-light-gray'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  {cat.icon}
                </svg>
                <span>{cat.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-6 mt-auto">
            <Link
              href="/contact"
              className="w-full bg-structural-light-gray text-text-secondary py-3 rounded-xl font-bold text-sm tracking-tight flex items-center justify-center gap-2 hover:bg-structural-gray-blue hover:text-dark-blue transition-all border border-structural-gray-blue"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
              Report Broken Link
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 pt-8 pb-20 px-4 sm:px-6 lg:px-12 overflow-x-hidden">
          {/* Mobile filter pills */}
          <div className="lg:hidden flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-dark-blue text-white'
                    : 'bg-white text-text-secondary border border-structural-gray-blue'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Mobile search */}
          <div className="lg:hidden mb-8">
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-structural-gray-blue rounded-xl text-sm text-dark-blue placeholder:text-text-secondary focus:ring-2 focus:ring-process-blue/20 focus:border-process-blue"
                placeholder="Search policies, IDs, or keywords..."
              />
            </div>
          </div>

          {/* Hero */}
          <section className="mb-16">
            <div className="max-w-4xl">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-process-blue mb-4 block">Central Repository</span>
              <h1 className="text-5xl md:text-6xl font-black text-dark-blue tracking-tighter leading-none mb-6">Policies &amp; Procedures</h1>
              <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
                Access the latest directives across infrastructure, security, and digital governance for the Open City &amp; OCT Branch.
              </p>
            </div>
          </section>

          {/* Featured Directives */}
          <section className="mb-20">
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-2xl font-bold text-dark-blue tracking-tight">Featured Directives</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Featured dark card */}
              {featuredPolicy && (
                <a
                  href={featuredPolicy.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-dark-blue rounded-2xl p-8 overflow-hidden min-h-[320px] flex flex-col justify-end"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-blue via-dark-blue/80 to-primary-blue/30" />
                  <div className="relative z-10">
                    <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest mb-4">Featured</span>
                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{featuredPolicy.title}</h3>
                    <p className="text-white/60 text-sm mb-6 line-clamp-2">{featuredPolicy.description}</p>
                    <span className="px-5 py-2.5 bg-white text-dark-blue rounded-lg font-bold text-xs uppercase tracking-wider inline-block group-hover:bg-structural-light-gray transition-colors">
                      Review Policy
                    </span>
                  </div>
                </a>
              )}

              {/* Regular featured cards */}
              {policies.filter(p => !p.featured).slice(0, 2).map((policy, idx) => (
                <a
                  key={idx}
                  href={policy.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-2xl p-8 shadow-sm flex flex-col justify-between border border-structural-gray-blue hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-process-blue/10 flex items-center justify-center text-process-blue mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-dark-blue mb-3">{policy.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{policy.description}</p>
                  </div>
                  <div className="pt-8 border-t border-structural-gray-blue flex items-center justify-between">
                    <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">{policy.code}</span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${typeBadgeColor[policy.type] || 'bg-structural-light-gray text-text-secondary'}`}>{policy.type}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Policy Domains */}
          <section className="mb-20">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-black text-dark-blue tracking-tighter mb-2">Policy Domains</h2>
              <div className="h-1 w-20 bg-process-blue mx-auto rounded-full" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {domainCards.map((domain, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(domain.id)}
                  className="group p-8 bg-white rounded-2xl border border-structural-gray-blue hover:border-process-blue/30 hover:shadow-md transition-all text-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-dark-blue mx-auto mb-4 group-hover:scale-110 transition-transform">
                    {domain.icon}
                  </svg>
                  <h4 className="font-bold text-dark-blue mb-1">{domain.label}</h4>
                  <p className="text-xs text-text-secondary">{domain.count}</p>
                </button>
              ))}
            </div>
          </section>

          {/* All Policies List + Side Panel */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-dark-blue tracking-tight">
                  {activeCategory === 'all' ? 'All Policies' : categories.find(c => c.id === activeCategory)?.label}
                </h3>
                <span className="text-xs text-text-secondary font-bold">{filteredPolicies.length} {filteredPolicies.length === 1 ? 'result' : 'results'}</span>
              </div>
              <div className="flex flex-col gap-4">
                {filteredPolicies.map((policy, idx) => (
                  <a
                    key={idx}
                    href={policy.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-6 bg-white rounded-xl flex items-start justify-between border border-structural-gray-blue hover:shadow-md transition-shadow group"
                  >
                    <div className="flex gap-5">
                      <div className="mt-1 w-10 h-10 rounded-lg bg-structural-light-gray flex items-center justify-center text-text-secondary flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                        </svg>
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <h4 className="font-bold text-dark-blue group-hover:text-process-blue transition-colors">{policy.title}</h4>
                          <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${typeBadgeColor[policy.type] || 'bg-structural-light-gray text-text-secondary'}`}>{policy.type}</span>
                        </div>
                        <p className="text-sm text-text-secondary mb-3 max-w-lg">{policy.description}</p>
                        <span className="text-[11px] font-semibold text-text-secondary">{policy.code}</span>
                      </div>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-text-secondary group-hover:text-process-blue transition-colors flex-shrink-0 mt-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </a>
                ))}

                {filteredPolicies.length === 0 && (
                  <div className="text-center py-12 text-text-secondary">No policies found for this category.</div>
                )}

                <button className="mt-4 py-4 w-full border-2 border-dashed border-structural-gray-blue rounded-xl text-text-secondary font-bold text-sm uppercase tracking-widest hover:bg-white hover:border-process-blue/30 transition-all">
                  Load Archive
                </button>
              </div>
            </div>

            {/* Side Panel */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-dark-blue p-8 rounded-2xl text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="text-sm font-bold opacity-60 uppercase tracking-[0.2em] mb-6">Portal Health</h4>
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div>
                      <p className="text-4xl font-black mb-1">98%</p>
                      <p className="text-[10px] uppercase font-bold opacity-60">Compliance</p>
                    </div>
                    <div>
                      <p className="text-4xl font-black mb-1">{policies.length}</p>
                      <p className="text-[10px] uppercase font-bold opacity-60">Active Policies</p>
                    </div>
                  </div>
                  <div className="p-4 bg-white/10 rounded-xl border border-white/10">
                    <p className="text-xs leading-relaxed opacity-80">All branch directives are currently within their audit window.</p>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-white rounded-2xl border border-structural-gray-blue">
                <h4 className="font-bold text-dark-blue mb-4">Quick Resources</h4>
                <ul className="space-y-4">
                  <li>
                    <a className="flex items-center gap-3 text-sm text-text-secondary hover:text-dark-blue group" href="#">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-process-blue group-hover:scale-110 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                      </svg>
                      Policy Template
                    </a>
                  </li>
                  <li>
                    <Link className="flex items-center gap-3 text-sm text-text-secondary hover:text-dark-blue group" href="/contact">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-process-blue group-hover:scale-110 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                      </svg>
                      Compliance Hotline
                    </Link>
                  </li>
                  <li>
                    <a className="flex items-center gap-3 text-sm text-text-secondary hover:text-dark-blue group" href="#">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-process-blue group-hover:scale-110 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                      </svg>
                      F.A.Q. for New Staff
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
