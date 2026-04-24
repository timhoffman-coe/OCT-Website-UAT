'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Sparkles, Zap, FileText, Wrench, ChevronDown } from 'lucide-react';
import { siteChangesData, type ChangeCategory } from '@/lib/siteChangesData';

const INITIALLY_EXPANDED = 5;

const categoryConfig: Record<
  ChangeCategory,
  { bg: string; text: string; icon: typeof Sparkles }
> = {
  'New Feature': { bg: 'bg-primary-blue/10', text: 'text-primary-blue', icon: Sparkles },
  Enhancement: { bg: 'bg-complement-sea-green/10', text: 'text-complement-sea-green', icon: Zap },
  Content: { bg: 'bg-process-blue/10', text: 'text-process-blue', icon: FileText },
  'Bug Fix': { bg: 'bg-edmonton-error/10', text: 'text-edmonton-error', icon: Wrench },
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function SiteChangesPage() {
  const [expandedOlder, setExpandedOlder] = useState<Set<string>>(new Set());

  const totalChanges = siteChangesData.reduce(
    (sum, v) => sum + v.changes.length,
    0,
  );

  function toggleVersion(version: string) {
    setExpandedOlder((prev) => {
      const next = new Set(prev);
      if (next.has(version)) {
        next.delete(version);
      } else {
        next.add(version);
      }
      return next;
    });
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main id="main-content" className="flex-grow">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <span className="text-process-blue font-semibold tracking-widest text-[0.6875rem] uppercase mb-4 block">
                OCT Website
              </span>
              <h1 className="font-sans text-5xl md:text-7xl font-bold text-dark-blue tracking-tighter leading-[0.9] mb-6">
                Site<br />
                <span className="text-process-blue">Changes</span>
              </h1>
              <p className="text-text-secondary text-lg max-w-2xl leading-relaxed">
                A running log of new features, improvements, and content added
                to the OCT portal. Check back after each release to see
                what&apos;s new.
              </p>
            </div>
            <div className="lg:col-span-4 flex justify-end">
              <div className="bg-structural-light-gray p-6 rounded-xl border border-structural-gray-blue w-full max-w-sm">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-5 h-5 text-process-blue" />
                  <span className="text-xs font-bold text-dark-blue uppercase tracking-wider">
                    Latest Release
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-3xl font-extrabold text-dark-blue">
                    v{siteChangesData[0].version}
                  </span>
                  <span className="text-sm text-text-secondary">
                    {totalChanges} changes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[15px] md:left-[23px] top-3 bottom-0 w-0.5 bg-structural-gray-blue" />

            {siteChangesData.map((version, i) => {
              const isOlder = i >= INITIALLY_EXPANDED;
              const isExpanded = !isOlder || expandedOlder.has(version.version);

              return (
                <div
                  key={version.version}
                  className="relative pl-10 md:pl-14 pb-12 last:pb-0"
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute top-1.5 rounded-full border-4 border-white ${
                      i === 0
                        ? 'left-[7px] md:left-[15px] w-[18px] h-[18px] bg-process-blue shadow-md shadow-process-blue/30'
                        : 'left-[9px] md:left-[17px] w-3.5 h-3.5 bg-primary-blue'
                    }`}
                  />

                  {/* Version header */}
                  {isOlder ? (
                    <button
                      onClick={() => toggleVersion(version.version)}
                      className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1 group cursor-pointer w-full text-left"
                    >
                      <h2 className="font-sans text-2xl md:text-3xl font-bold text-dark-blue group-hover:text-primary-blue transition-colors">
                        v{version.version}
                      </h2>
                      <span className="font-sans text-sm text-text-secondary">
                        {formatDate(version.date)}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-text-secondary transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  ) : (
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                      <h2 className="font-sans text-2xl md:text-3xl font-bold text-dark-blue">
                        v{version.version}
                      </h2>
                      <span className="font-sans text-sm text-text-secondary">
                        {formatDate(version.date)}
                      </span>
                    </div>
                  )}

                  {version.summary && isExpanded && (
                    <p className="text-text-secondary text-base mb-4">
                      {version.summary}
                    </p>
                  )}

                  {/* Change items — collapsed for older versions */}
                  {isExpanded && (
                    <div className="mt-4 space-y-3">
                      {version.changes.map((change, j) => {
                        const config = categoryConfig[change.category];
                        const Icon = config.icon;
                        return (
                          <div
                            key={j}
                            className="bg-structural-light-gray rounded-lg border border-structural-gray-blue p-4 md:p-5"
                          >
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${config.bg} ${config.text}`}
                            >
                              <Icon className="w-3 h-3" />
                              {change.category}
                            </span>
                            <h3 className="font-sans text-base md:text-lg font-semibold text-dark-blue mt-2">
                              {change.title}
                            </h3>
                            <p className="font-sans text-sm text-text-secondary mt-1 leading-relaxed">
                              {change.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-structural-light-gray border-t border-structural-gray-blue py-16 text-center">
          <h2 className="font-sans text-2xl font-bold text-dark-blue mb-2">
            Have feedback on the site?
          </h2>
          <p className="text-text-secondary mb-6">
            Let us know what you&apos;d like to see next.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary-blue text-white font-semibold px-6 py-3 rounded-lg hover:bg-complement-empire-blue transition-colors"
          >
            Get in Touch
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
