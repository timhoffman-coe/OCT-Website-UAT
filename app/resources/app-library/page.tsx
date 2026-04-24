'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { appLibraryData, categories } from '@/lib/appLibraryData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const statusConfig = {
  production: { color: 'bg-edmonton-success', label: 'Production' },
  beta: { color: 'bg-edmonton-warning', label: 'Beta' },
  development: { color: 'bg-process-blue', label: 'Development' },
} as const;

export default function AppLibraryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredApps = appLibraryData.filter(app => {
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
    const matchesSearch = !searchQuery ||
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredApp = filteredApps.find(app => app.featured);
  const regularApps = filteredApps.filter(app => !app.featured);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main id="main-content" className="flex-grow">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="text-process-blue font-semibold tracking-widest text-[0.6875rem] uppercase mb-4 block">
                OCT Internal Repository
              </span>
              <h1 className="font-sans text-5xl md:text-7xl font-bold text-dark-blue tracking-tighter leading-[0.9] mb-6">
                App &amp; Project<br />
                <span className="text-process-blue">Library</span>
              </h1>
              <p className="text-text-secondary text-lg max-w-2xl leading-relaxed">
                Explore the ecosystem of custom and proprietary solutions developed by the Open City &amp; Technology Branch. From internal operational tools to public-facing citizen services, we build the future of civic infrastructure.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-end">
              <div className="bg-structural-light-gray p-6 rounded-xl border border-structural-gray-blue w-full max-w-sm">
                <div className="flex items-center gap-3 mb-2">
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-process-blue">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                  </svg>
                  <span className="text-xs font-bold text-dark-blue uppercase tracking-wider">Live Stats</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-3xl font-extrabold text-dark-blue">{appLibraryData.length}</span>
                  <span className="text-sm text-text-secondary">Active Solutions</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter & Search Section */}
        <section className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg py-6 px-4 sm:px-6 lg:px-8 border-b border-structural-gray-blue">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:max-w-md">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-structural-light-gray border-b-2 border-structural-gray-blue focus:border-dark-blue focus:ring-0 transition-all outline-none rounded-t-lg text-dark-blue placeholder:text-text-secondary"
                placeholder="Search applications, teams, or features..."
              />
            </div>
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-dark-blue text-white'
                    : 'bg-structural-light-gray hover:bg-structural-gray-blue text-text-secondary'
                }`}
              >
                All Projects
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-dark-blue text-white'
                      : 'bg-structural-light-gray hover:bg-structural-gray-blue text-text-secondary'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* App Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Featured Card */}
            {featuredApp && (
              <div className="md:col-span-2 bg-structural-light-gray rounded-xl overflow-hidden border border-structural-gray-blue group hover:shadow-xl transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                  <div className="relative h-64 lg:h-full overflow-hidden bg-gradient-to-br from-dark-blue to-primary-blue">
                    <div className="absolute inset-0 flex items-center justify-center p-12">
                      <Image
                        src="/images/logos/Omnissa_Identity_Service_Logo.png"
                        alt="Workspace One"
                        width={300}
                        height={300}
                        className="object-contain max-h-full"
                      />
                    </div>
                    <div className="absolute bottom-6 left-6">
                      <span className="bg-process-blue text-white px-3 py-1 rounded text-[0.6875rem] font-bold tracking-widest uppercase">
                        {statusConfig[featuredApp.status].label}
                      </span>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-3xl font-bold text-dark-blue tracking-tight">{featuredApp.name}</h3>
                        <span className="text-sm font-semibold text-process-blue px-2 py-1 bg-process-blue/10 rounded">{featuredApp.team}</span>
                      </div>
                      <p className="text-text-secondary leading-relaxed mb-8">
                        {featuredApp.description}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href={featuredApp.url}
                        className="bg-dark-blue text-white px-6 py-3 rounded-md font-semibold text-sm hover:bg-primary-blue transition-all flex items-center justify-center gap-2"
                      >
                        {featuredApp.actionLabel || 'Launch App'}
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                      </a>
                      <button className="text-process-blue border border-process-blue/20 px-6 py-3 rounded-md font-semibold text-sm hover:bg-process-blue/5 transition-all">
                        Documentation
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Regular App Cards */}
            {regularApps.map((app) => {
              const status = statusConfig[app.status];
              return (
                <div
                  key={app.id}
                  className="bg-structural-light-gray p-8 rounded-xl border border-structural-gray-blue flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-structural-light-gray rounded-lg flex items-center justify-center text-dark-blue">
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                        </svg>
                      </div>
                      <span className="text-xs font-bold text-text-secondary bg-structural-light-gray px-2 py-1 rounded">
                        {app.team}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-dark-blue mb-2">{app.name}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-6">
                      {app.description}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className={`w-2 h-2 rounded-full ${status.color}`} />
                      <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{status.label}</span>
                    </div>
                    <a
                      href={app.url}
                      className="block w-full bg-structural-light-gray text-dark-blue px-4 py-2 rounded-md font-bold text-xs hover:bg-structural-gray-blue transition-all uppercase tracking-wider text-center"
                    >
                      {app.actionLabel || 'Explore Tool'}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredApps.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-secondary text-lg">No apps found matching your criteria.</p>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-dark-blue text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
            <svg aria-hidden="true" className="w-full h-full fill-white" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,400 L400,400 L400,0 C300,100 100,200 0,400 Z" />
            </svg>
          </div>
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Have an Idea for a New Tool?</h2>
              <p className="text-white/60 text-lg mb-8 max-w-lg leading-relaxed">
                The OCT Branch thrives on collaboration. Whether you need a specific data dashboard or a process automated, our internal development teams are here to help.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="bg-white text-dark-blue px-8 py-4 rounded-md font-bold text-sm hover:bg-structural-light-gray transition-all flex items-center gap-2"
                >
                  Request a New App
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="border border-white/30 text-white px-8 py-4 rounded-md font-bold text-sm hover:bg-white/10 transition-all"
                >
                  Submit a Project Pitch
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-process-blue flex items-center justify-center shrink-0">
                      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Collaborative Design</h4>
                      <p className="text-sm text-white/50">Work directly with our UX researchers to define your needs.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-process-blue flex items-center justify-center shrink-0">
                      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Agile Development</h4>
                      <p className="text-sm text-white/50">Iterative cycles ensure the tool evolves with your workflow.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-process-blue flex items-center justify-center shrink-0">
                      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Full Support</h4>
                      <p className="text-sm text-white/50">Continuous maintenance and security monitoring included.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
