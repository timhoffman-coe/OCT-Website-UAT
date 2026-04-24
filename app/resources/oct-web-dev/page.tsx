'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Lock, Map, CheckCircle2, Circle, Loader2, ChevronDown, FileText, Cpu, ClipboardList, Sparkles, Zap, Wrench } from 'lucide-react';
import { siteChangesData, type ChangeCategory } from '@/lib/siteChangesData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const DOCUMENTS = [
  { slug: 'ai-assistant', title: 'AI Assistant', description: 'Gemini chat integration, Drive context, and circuit breaker' },
  { slug: 'api-reference', title: 'API Reference', description: 'Complete reference for all API routes' },
  { slug: 'architecture-overview', title: 'Architecture Overview', description: 'System architecture, directory structure, and tech stack' },
  { slug: 'cicd-pipeline', title: 'CI/CD Pipeline', description: 'Build pipeline, commit validation, and GCP production deployment' },
  { slug: 'cms-admin-guide', title: 'CMS Admin Guide', description: 'User guide for content editors' },
  { slug: 'cms-overview', title: 'CMS Overview', description: 'How the content management system works' },
  { slug: 'data-portal', title: 'Data Portal', description: 'MSSQL integration, NTLM auth, and budget/incident queries' },
  { slug: 'database-schema', title: 'Database Schema', description: 'PostgreSQL schema: tables, columns, relationships, indexes, and enums' },
  { slug: 'deployment-guide', title: 'Deployment Guide', description: 'Production deployment and operations' },
  { slug: 'development-setup', title: 'Development Setup', description: 'Local dev environment and tooling guide' },
  { slug: 'environment-variables', title: 'Environment Variables', description: 'Complete reference for all env vars and feature flags' },
  { slug: 'observability', title: 'Observability', description: 'OpenTelemetry logs, traces, and metrics; collector setup' },
  { slug: 'prisma-migration-workflow', title: 'Prisma Migrations', description: 'Schema change lifecycle and rollback procedures' },
  { slug: 'links-system', title: 'Links System', description: 'Links page CMS, categories, permissions, and display modes' },
  { slug: 'policies-system', title: 'Policies System', description: 'Policies page CMS, permissions, and featured policy management' },
  { slug: 'projects-system', title: 'Projects System', description: 'Project pages, widget editors, permissions, and tags' },
  { slug: 'secret-management', title: 'Secret Management', description: 'Google Secret Manager setup and credential rotation' },
  { slug: 'service-health', title: 'Service Health', description: 'Uptrends API integration, status mapping, and caching' },
  { slug: 'testing', title: 'Testing', description: 'Test framework, conventions, and how to run tests' },
  { slug: 'versioning', title: 'Versioning & Releases', description: 'Semantic versioning, conventional commits, and automated releases' },
  { slug: 'widget-system', title: 'Widget System', description: 'Widget types, template blocklist, and how to add new widgets' },
];

const TABS = [
  { id: 'design', label: 'Design', icon: Cpu },
  { id: 'docs', label: 'Docs', icon: FileText },
  { id: 'progress', label: 'Progress', icon: ClipboardList },
  { id: 'changes', label: 'Changes', icon: Sparkles },
] as const;

const INITIALLY_EXPANDED_VERSIONS = 5;

const changeCategoryConfig: Record<
  ChangeCategory,
  { bg: string; text: string; icon: typeof Sparkles }
> = {
  'New Feature': { bg: 'bg-[#005087]/10', text: 'text-[#005087]', icon: Sparkles },
  Enhancement: { bg: 'bg-emerald-500/10', text: 'text-emerald-600', icon: Zap },
  Content: { bg: 'bg-blue-500/10', text: 'text-blue-600', icon: FileText },
  'Bug Fix': { bg: 'bg-red-500/10', text: 'text-red-500', icon: Wrench },
};

function formatChangeDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

type TabId = (typeof TABS)[number]['id'];

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

const markdownComponents = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 font-sans mb-4 mt-8 first:mt-0">{children}</h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="text-lg lg:text-xl font-bold text-gray-800 font-sans mb-3 mt-6 pb-2 border-b border-gray-200">{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-base lg:text-lg font-semibold text-gray-600 font-sans mb-2 mt-5 pl-3 border-l-2 border-gray-300">{children}</h3>
  ),
  h4: ({ children }: { children?: React.ReactNode }) => (
    <h4 className="text-sm lg:text-base font-medium text-gray-500 font-sans mb-1.5 mt-4 uppercase tracking-wide">{children}</h4>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-sm lg:text-base text-gray-600 font-sans leading-relaxed mb-3">{children}</p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="list-disc list-inside space-y-1 mb-3 text-sm text-gray-600 ml-1">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="list-decimal list-inside space-y-1 mb-3 text-sm text-gray-600 ml-1">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="text-sm text-gray-600 font-sans">{children}</li>
  ),
  pre: ({ children }: { children?: React.ReactNode }) => (
    <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto mb-4 text-xs font-mono leading-relaxed">{children}</pre>
  ),
  code: ({ children, className }: { children?: React.ReactNode; className?: string }) => {
    const isBlock = className?.startsWith('language-');
    if (isBlock) return <code>{children}</code>;
    return <code className="bg-gray-100 text-[#005087] px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>;
  },
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="text-left px-3 py-2 bg-gray-100 border border-gray-200 font-semibold text-gray-700 text-xs font-sans">{children}</th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td className="px-3 py-2 border border-gray-200 text-gray-600 text-xs font-sans">{children}</td>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-gray-800">{children}</strong>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-500 mb-3">{children}</blockquote>
  ),
  hr: () => <hr className="my-6 border-gray-200" />,
};

function PhaseContent({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let level = 0; // 0 = under h3, 1 = under h4, 2 = under bold label
  let pendingItems: { text: string; checked: boolean }[] = [];
  let key = 0;

  const flushItems = () => {
    if (pendingItems.length === 0) return;
    const ml = level === 0 ? '' : level === 1 ? 'ml-6' : 'ml-12';
    elements.push(
      <ul key={key++} className={`space-y-1.5 mb-4 ${ml}`}>
        {pendingItems.map((item, j) => (
          <li key={j} className="flex items-start gap-2.5 text-sm font-sans">
            {item.checked ? (
              <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 flex-shrink-0 mt-0.5" />
            ) : (
              <Circle className="w-4.5 h-4.5 text-gray-300 flex-shrink-0 mt-0.5" />
            )}
            <span className={item.checked ? 'text-gray-400 line-through' : 'text-gray-700'}>
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    );
    pendingItems = [];
  };

  for (const line of lines) {
    if (line.startsWith('### ')) {
      flushItems();
      level = 0;
      elements.push(
        <h3 key={key++} className="text-base font-bold text-gray-800 font-sans mt-6 first:mt-0 mb-2 pb-1.5 border-b border-gray-200">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith('#### ')) {
      flushItems();
      level = 1;
      elements.push(
        <h4 key={key++} className="text-sm font-semibold text-gray-700 font-sans mt-5 mb-1.5 ml-6 pl-3 border-l-2 border-[#005087]/30">
          {line.slice(5)}
        </h4>
      );
    } else if (/^\*\*.*[*:]\*\*\s*$/.test(line)) {
      flushItems();
      level = 2;
      elements.push(
        <p key={key++} className="text-xs font-semibold text-gray-500 font-sans mt-3 mb-1 ml-12 uppercase tracking-wide">
          {line.replace(/\*\*/g, '')}
        </p>
      );
    } else if (/^- \[[ x]\]/.test(line)) {
      const checked = /^- \[x\]/.test(line);
      const text = line.replace(/^- \[[ x]\]\s*/, '');
      pendingItems.push({ text, checked });
    } else if (line.trim() !== '') {
      flushItems();
      const ml = level === 0 ? '' : level === 1 ? 'ml-6' : 'ml-12';
      elements.push(
        <p key={key++} className={`text-sm text-gray-600 font-sans leading-relaxed mb-2 ${ml}`}>
          {line}
        </p>
      );
    }
  }
  flushItems();

  return <>{elements}</>;
}

export default function OctWebDevPage() {
  const [canView, setCanView] = useState<boolean | null>(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>('design');
  const [openPhases, setOpenPhases] = useState<Set<number>>(new Set());
  const [docs, setDocs] = useState<Record<string, string>>({});
  const [failedDocs, setFailedDocs] = useState<Set<string>>(new Set());
  const [activeDoc, setActiveDoc] = useState<string | null>(null);
  const docScrollRef = useRef<HTMLDivElement>(null);
  const [expandedVersions, setExpandedVersions] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch('/api/cms/oct-web-dev/check-access')
      .then(res => res.ok ? res.json() : { canView: false })
      .then(data => {
        setCanView(data.canView);
        if (data.canView) {
          const checklistFetch = fetch('/api/cms/oct-web-dev/content')
            .then(res => res.ok ? res.json() : null)
            .then(data => { if (data?.content) setContent(data.content); });

          const docsFetch = Promise.all(
            DOCUMENTS.map(d =>
              fetch(`/api/cms/oct-web-dev/docs/${d.slug}`)
                .then(r => r.ok ? r.json() : null)
                .then(data => data ? [d.slug, data.content, true] as const : [d.slug, null, false] as const)
                .catch(() => [d.slug, null, false] as const)
            )
          ).then(results => {
            const docMap: Record<string, string> = {};
            const failed = new Set<string>();
            for (const r of results) {
              if (r[2] && r[1]) docMap[r[0]] = r[1];
              else failed.add(r[0]);
            }
            setDocs(docMap);
            setFailedDocs(failed);
          });

          return Promise.all([checklistFetch, docsFetch]);
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-[#005087] rounded-lg shadow-lg shadow-[#005087]/50">
              <Map className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg lg:text-xl font-bold tracking-tight flex-1">OCT Web Development</h1>
            {canView && totalItems > 0 && (
              <div className="flex items-center gap-3">
                <div className="w-28 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full transition-all duration-500" style={{ width: `${overallPct}%` }} />
                </div>
                <span className="text-sm font-bold tabular-nums">{overallPct}%</span>
                <span className="text-xs text-[#839899] font-sans">{totalDone}/{totalItems}</span>
              </div>
            )}
          </div>
        </div>

        {/* Tab Bar */}
        {canView && !loading && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-1 justify-center">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-4 py-1.5 text-sm font-sans font-medium transition-colors relative cursor-pointer rounded-t-lg ${
                      isActive
                        ? 'bg-gray-50 text-[#005087]'
                        : 'text-white/60 hover:text-white/90 hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main id="main-content" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
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
          {/* Design Tab */}
          {activeTab === 'design' && (
            <div className="bg-[#111827] rounded-xl border border-cyan-900/30 overflow-hidden shadow-lg">
              <div className="px-4 py-3 border-b border-cyan-900/20">
                <h3 className="text-sm font-bold text-white font-sans">Request Lifecycle</h3>
                <p className="text-[11px] text-cyan-500/60 font-sans">How a request flows through this application</p>
              </div>
              <div className="h-[500px] lg:h-[650px]">
                <WebsiteArchFlow />
              </div>
              <div className="px-4 py-3 border-t border-cyan-900/20">
                <p className="text-[10px] text-cyan-400/60 font-sans uppercase tracking-wider font-semibold text-center mb-2.5">Also powered by</p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                {[
                  { icon: '\uD83D\uDC33', label: 'Docker Compose', sub: '3 containers' },
                  { icon: '\uD83D\uDD04', label: 'GitHub', sub: 'Source control & CI/CD' },
                  { icon: '\uD83E\uDDEA', label: 'Dev Environment', sub: 'Local Docker stack' },
                  { icon: '\uD83D\uDE80', label: 'Production', sub: 'GCP Linux Compute' },
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
          )}

          {/* Docs Tab */}
          {activeTab === 'docs' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="flex min-h-[600px]">
                {/* Left Sidebar */}
                <div className="w-56 lg:w-64 flex-shrink-0 border-r border-gray-200 bg-gray-50/50">
                  <div className="px-4 py-4 border-b border-gray-200">
                    <button
                      onClick={() => {
                        setActiveDoc(null);
                        docScrollRef.current?.scrollTo(0, 0);
                      }}
                      className="text-xs font-bold text-gray-500 font-sans uppercase tracking-wider hover:text-[#005087] transition-colors cursor-pointer"
                    >
                      Documents
                    </button>
                  </div>
                  <nav className="p-2">
                    {DOCUMENTS.map((doc) => (
                      <button
                        key={doc.slug}
                        onClick={() => {
                          setActiveDoc(doc.slug);
                          docScrollRef.current?.scrollTo(0, 0);
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-sans transition-colors mb-1 cursor-pointer ${
                          activeDoc === doc.slug
                            ? 'bg-[#005087]/10 text-[#005087] font-medium'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        <div className="font-medium">{doc.title}</div>
                        <div className="text-[11px] text-gray-400 mt-0.5">{doc.description}</div>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Document Content */}
                <div ref={docScrollRef} className="flex-1 px-6 lg:px-10 py-5">
                  {activeDoc === null ? (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 font-sans mb-2">Project Documentation</h2>
                        <p className="text-sm text-gray-500 font-sans leading-relaxed">
                          Runbooks and reference documentation for the OCT website. Select a document from the sidebar to get started.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {DOCUMENTS.map((doc) => (
                          <button
                            key={doc.slug}
                            onClick={() => {
                              setActiveDoc(doc.slug);
                              docScrollRef.current?.scrollTo(0, 0);
                            }}
                            className="text-left bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-[#005087]/40 hover:shadow-sm transition-all cursor-pointer group"
                          >
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-[#005087]/10 rounded-lg flex-shrink-0 group-hover:bg-[#005087]/20 transition-colors">
                                <FileText className="w-5 h-5 text-[#005087]" />
                              </div>
                              <div>
                                <h3 className="text-sm font-semibold text-gray-900 font-sans group-hover:text-[#005087] transition-colors">{doc.title}</h3>
                                <p className="text-xs text-gray-500 font-sans mt-1">{doc.description}</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : docs[activeDoc] ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                      {docs[activeDoc]}
                    </ReactMarkdown>
                  ) : failedDocs.has(activeDoc) ? (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                      <FileText className="w-8 h-8 mb-2 text-gray-300" />
                      <span className="text-sm font-sans font-medium text-gray-500">Document unavailable</span>
                      <span className="text-xs font-sans mt-1">This document could not be loaded. It may not be deployed yet.</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center py-12 text-gray-400">
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      <span className="text-sm font-sans">Loading document...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Progress Tab */}
          {activeTab === 'progress' && (
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
                        <PhaseContent content={phase.content} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Changes Tab */}
          {activeTab === 'changes' && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Header card */}
              <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 font-sans">Site Changes</h2>
                  <p className="text-sm text-gray-500 font-sans mt-0.5">New features, improvements, and content updates</p>
                </div>
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2">
                  <Sparkles className="w-4 h-4 text-[#005087]" />
                  <span className="text-sm font-bold text-gray-900">v{siteChangesData[0].version}</span>
                  <span className="text-xs text-gray-500">latest</span>
                </div>
              </div>

              {/* Timeline */}
              <div className="px-6 py-6">
                <div className="relative">
                  <div className="absolute left-[11px] top-3 bottom-0 w-0.5 bg-gray-200" />

                  {siteChangesData.map((version, i) => {
                    const isOlder = i >= INITIALLY_EXPANDED_VERSIONS;
                    const isExpanded = !isOlder || expandedVersions.has(version.version);

                    return (
                      <div key={version.version} className="relative pl-10 pb-8 last:pb-0">
                        <div
                          className={`absolute top-1.5 rounded-full border-4 border-white ${
                            i === 0
                              ? 'left-[3px] w-[18px] h-[18px] bg-[#005087] shadow-md shadow-[#005087]/30'
                              : 'left-[5px] w-3.5 h-3.5 bg-gray-400'
                          }`}
                        />

                        {isOlder ? (
                          <button
                            onClick={() => setExpandedVersions(prev => {
                              const next = new Set(prev);
                              next.has(version.version) ? next.delete(version.version) : next.add(version.version);
                              return next;
                            })}
                            className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1 group cursor-pointer w-full text-left"
                          >
                            <h3 className="text-xl font-bold text-gray-900 font-sans group-hover:text-[#005087] transition-colors">
                              v{version.version}
                            </h3>
                            <span className="text-sm text-gray-500 font-sans">{formatChangeDate(version.date)}</span>
                            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                          </button>
                        ) : (
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                            <h3 className="text-xl font-bold text-gray-900 font-sans">v{version.version}</h3>
                            <span className="text-sm text-gray-500 font-sans">{formatChangeDate(version.date)}</span>
                          </div>
                        )}

                        {version.summary && isExpanded && (
                          <p className="text-sm text-gray-500 font-sans mb-3">{version.summary}</p>
                        )}

                        {isExpanded && (
                          <div className="mt-3 space-y-2">
                            {version.changes.map((change, j) => {
                              const config = changeCategoryConfig[change.category];
                              const Icon = config.icon;
                              return (
                                <div key={j} className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${config.bg} ${config.text}`}>
                                    <Icon className="w-3 h-3" />
                                    {change.category}
                                  </span>
                                  <h4 className="text-sm font-semibold text-gray-900 font-sans mt-1.5">{change.title}</h4>
                                  <p className="text-xs text-gray-500 font-sans mt-1 leading-relaxed">{change.description}</p>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
