'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import { Lock, Map, CheckCircle2, Circle, Loader2, ChevronDown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';

const WebsiteArchFlow = dynamic(
  () => import('@/components/WebsiteArchFlow'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-[#111827]">
        <span className="text-cyan-500/60 text-sm font-sans animate-pulse">Loading architecture diagram...</span>
      </div>
    ),
  }
);

const PHASE_COLORS = [
  { border: 'border-l-[#005087]', bg: 'bg-[#005087]/5', badge: 'bg-[#005087]', bar: '#005087' },
  { border: 'border-l-[#109D7E]', bg: 'bg-[#109D7E]/5', badge: 'bg-[#109D7E]', bar: '#109D7E' },
  { border: 'border-l-[#2F63AD]', bg: 'bg-[#2F63AD]/5', badge: 'bg-[#2F63AD]', bar: '#2F63AD' },
  { border: 'border-l-[#99479A]', bg: 'bg-[#99479A]/5', badge: 'bg-[#99479A]', bar: '#99479A' },
  { border: 'border-l-[#EA5853]', bg: 'bg-[#EA5853]/5', badge: 'bg-[#EA5853]', bar: '#EA5853' },
  { border: 'border-l-[#FAB840]', bg: 'bg-[#FAB840]/5', badge: 'bg-[#FAB840]', bar: '#FAB840' },
  { border: 'border-l-[#3B82F6]', bg: 'bg-[#3B82F6]/5', badge: 'bg-[#3B82F6]', bar: '#3B82F6' },
  { border: 'border-l-[#F97316]', bg: 'bg-[#F97316]/5', badge: 'bg-[#F97316]', bar: '#F97316' },
  { border: 'border-l-[#14B8A6]', bg: 'bg-[#14B8A6]/5', badge: 'bg-[#14B8A6]', bar: '#14B8A6' },
];

interface Phase {
  title: string;
  content: string;
  total: number;
  done: number;
}

function parsePhases(md: string): Phase[] {
  const lines = md.split('\n');
  const phases: Phase[] = [];
  let current: Phase | null = null;
  let contentLines: string[] = [];

  for (const line of lines) {
    if (line.startsWith('# ') && !line.startsWith('## ')) continue;
    if (line.startsWith('## ')) {
      if (current) {
        current.content = contentLines.join('\n');
        phases.push(current);
      }
      current = { title: line.replace('## ', '').trim(), content: '', total: 0, done: 0 };
      contentLines = [];
      continue;
    }
    if (current) {
      contentLines.push(line);
      if (line.match(/^- \[[ x]\]/)) {
        current.total++;
        if (line.match(/^- \[x\]/)) current.done++;
      }
    }
  }
  if (current) {
    current.content = contentLines.join('\n');
    phases.push(current);
  }
  return phases;
}

export default function OctWebDevPage() {
  const [canView, setCanView] = useState<boolean | null>(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [openPhases, setOpenPhases] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetch('/api/cms/oct-web-dev/check-access')
      .then(res => res.ok ? res.json() : { canView: false })
      .then(data => {
        setCanView(data.canView);
        if (data.canView) {
          return fetch('/api/cms/oct-web-dev/content')
            .then(res => res.ok ? res.json() : null)
            .then(data => { if (data?.content) setContent(data.content); });
        }
      })
      .catch(() => setCanView(false))
      .finally(() => setLoading(false));
  }, []);

  const phases = useMemo(() => parsePhases(content), [content]);
  const totalDone = phases.reduce((s, p) => s + p.done, 0);
  const totalItems = phases.reduce((s, p) => s + p.total, 0);
  const overallPct = totalItems > 0 ? Math.round((totalDone / totalItems) * 100) : 0;

  const togglePhase = (i: number) => {
    setOpenPhases(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Page Header */}
      <div className="bg-[#193A5A] text-white shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#005087] rounded-lg shadow-lg shadow-[#005087]/50">
              <Map className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold tracking-tight">OCT Web Development</h1>
              <p className="text-xs text-[#839899] font-medium tracking-widest uppercase">OCT Website Development Progress</p>
            </div>
            {canView && totalItems > 0 && (
              <div className="text-right">
                <p className="text-2xl font-bold tabular-nums">{overallPct}%</p>
                <p className="text-xs text-[#839899] font-sans">{totalDone} of {totalItems} tasks</p>
              </div>
            )}
          </div>
          {canView && totalItems > 0 && (
            <div className="mt-4 w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-400 rounded-full transition-all duration-500" style={{ width: `${overallPct}%` }} />
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-24 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin mr-3" />
            <span className="text-sm font-sans">Loading...</span>
          </div>
        ) : !canView ? (
          <div className="max-w-md mx-auto mt-16 text-center">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-7 h-7 text-gray-400" />
              </div>
              <h2 className="text-lg font-bold text-gray-900 font-sans mb-2">Access Restricted</h2>
              <p className="text-sm text-gray-500 font-sans">
                You don&apos;t have permission to view OCT-Web-Dev. Contact your administrator for access.
              </p>
            </div>
          </div>
        ) : (
          <>
          {/* Architecture Diagram */}
          <AnimatedSection className="mb-8">
            <div className="bg-[#111827] rounded-xl border border-cyan-900/30 overflow-hidden shadow-lg">
              <div className="px-4 py-3 border-b border-cyan-900/20">
                <h3 className="text-sm font-bold text-white font-sans">Request Lifecycle</h3>
                <p className="text-[11px] text-cyan-500/60 font-sans">How a request flows through this application</p>
              </div>
              <div className="h-[500px]">
                <WebsiteArchFlow />
              </div>
              <div className="px-4 py-3 border-t border-cyan-900/20">
                <p className="text-[10px] text-cyan-400/60 font-sans uppercase tracking-wider font-semibold text-center mb-2.5">Also powered by</p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                {[
                  { icon: '🐳', label: 'Docker Compose', sub: '3 containers' },
                  { icon: '🔄', label: 'GitHub', sub: 'Source control & CI/CD' },
                  { icon: '🧪', label: 'Dev Environment', sub: 'Local Docker stack' },
                  { icon: '🚀', label: 'Production', sub: 'GCP Linux Compute' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-3 py-1.5"
                  >
                    <span className="text-sm">{item.icon}</span>
                    <div>
                      <span className="text-[11px] text-white font-sans font-semibold">{item.label}</span>
                      <span className="text-[10px] text-gray-400 font-sans ml-1.5">{item.sub}</span>
                    </div>
                  </div>
                ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          <div className="space-y-3">
            {phases.map((phase, i) => {
              const colors = PHASE_COLORS[i % PHASE_COLORS.length];
              const pct = phase.total > 0 ? Math.round((phase.done / phase.total) * 100) : 0;
              const isOpen = openPhases.has(i);

              return (
                <div key={i} className={`border-l-4 ${colors.border} rounded-r-lg bg-white shadow-sm overflow-hidden`}>
                  <button
                    onClick={() => togglePhase(i)}
                    className={`w-full px-5 py-4 ${colors.bg} flex items-center gap-3 cursor-pointer hover:brightness-95 transition-all`}
                  >
                    <span className={`${colors.badge} text-white text-xs font-bold px-2.5 py-1 rounded-full font-sans flex-shrink-0`}>
                      Phase {i + 1}
                    </span>
                    <h2 className="text-lg font-bold text-gray-900 font-sans text-left flex-1">{phase.title}</h2>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-xs font-semibold text-gray-500 font-sans tabular-nums">
                        {phase.done}/{phase.total}
                      </span>
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%`, backgroundColor: colors.bar }}
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-600 font-sans tabular-nums w-8 text-right">
                        {pct}%
                      </span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 py-4 border-t border-gray-100">
                      <ReactMarkdown
                        components={{
                          h3: ({ children }) => (
                            <h3 className="text-base font-semibold text-gray-700 font-sans mt-5 first:mt-0 mb-2">{children}</h3>
                          ),
                          ul: ({ children }) => (
                            <ul className="space-y-1.5 mb-4">{children}</ul>
                          ),
                          li: ({ children }) => {
                            const text = String(children);
                            const isChecked = text.startsWith('[x]') || text.includes('✅');
                            return (
                              <li className="flex items-start gap-2.5 text-sm font-sans">
                                {isChecked ? (
                                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                ) : (
                                  <Circle className="w-4.5 h-4.5 text-gray-300 flex-shrink-0 mt-0.5" />
                                )}
                                <span className={isChecked ? 'text-gray-400 line-through' : 'text-gray-700'}>{children}</span>
                              </li>
                            );
                          },
                          p: ({ children }) => (
                            <p className="text-sm text-gray-600 font-sans leading-relaxed">{children}</p>
                          ),
                          input: ({ checked }) => checked ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 inline-block mr-1.5 -mt-0.5" />
                          ) : (
                            <Circle className="w-4 h-4 text-gray-300 inline-block mr-1.5 -mt-0.5" />
                          ),
                        }}
                      >
                        {phase.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
