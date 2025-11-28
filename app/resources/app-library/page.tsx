'use client';

import { useState } from 'react';
import { appLibraryData, categories } from '@/lib/appLibraryData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AppLibraryPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const filteredApps = selectedCategory === 'all'
        ? appLibraryData
        : appLibraryData.filter(app => app.category === selectedCategory);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">App Library</h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Explore our collection of applications and microservices designed to streamline your workflow.
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedCategory === 'all'
                                    ? 'bg-primary-blue text-white shadow-md'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            All Apps
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedCategory === category.id
                                        ? 'bg-primary-blue text-white shadow-md'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>

                    {/* App Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredApps.map((app) => (
                            <a
                                key={app.id}
                                href={app.url}
                                className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary-blue/30"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center text-primary-blue group-hover:bg-primary-blue group-hover:text-white transition-colors duration-300">
                                            {/* Placeholder Icon */}
                                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                        </div>
                                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                            {categories.find(c => c.id === app.category)?.name}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-blue transition-colors">
                                        {app.name}
                                    </h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                        {app.description}
                                    </p>
                                    <div className="flex items-center text-primary-blue font-medium text-sm group-hover:translate-x-1 transition-transform">
                                        Launch App
                                        <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>

                    {filteredApps.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No apps found in this category.</p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
