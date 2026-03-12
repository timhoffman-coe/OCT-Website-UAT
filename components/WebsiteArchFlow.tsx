'use client';

import { memo, useState, useCallback } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Handle,
  Position,
  Background,
  BackgroundVariant,
  type Node,
  type Edge,
  type NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { GlowEdge } from './oct-architecture/edges/GlowEdge';
import './oct-architecture/edges/edges.css';
import { X } from 'lucide-react';

const ArchNode = memo(function ArchNode({ data }: NodeProps) {
  const label = data.label as string;
  const sublabel = data.sublabel as string | undefined;
  const icon = data.icon as string | undefined;
  const accent = (data.accent as string) || '#0891b2';

  return (
    <div
      className="relative rounded-lg min-w-[160px] cursor-pointer transition-all duration-200 hover:scale-[1.05] hover:brightness-125"
      style={{
        background: `linear-gradient(135deg, ${accent}22 0%, ${accent}10 100%)`,
        border: `1.5px solid ${accent}66`,
        boxShadow: `0 0 20px ${accent}30, 0 4px 16px rgba(0,0,0,0.4)`,
        borderLeft: `3px solid ${accent}`,
      }}
    >
      <div className="px-4 py-3">
        {icon && <div className="text-xl mb-1.5">{icon}</div>}
        <div className="text-white text-[13px] font-bold font-sans leading-tight">{label}</div>
        {sublabel && (
          <div className="text-slate-300 text-[10px] mt-1 font-sans leading-snug">{sublabel}</div>
        )}
      </div>
      <Handle type="target" position={Position.Top} className="!bg-cyan-400 !w-2 !h-2 !border-2 !border-slate-900 !min-w-0 !min-h-0" />
      <Handle type="source" position={Position.Bottom} className="!bg-cyan-400 !w-2 !h-2 !border-2 !border-slate-900 !min-w-0 !min-h-0" />
      <Handle type="target" position={Position.Left} id="left" className="!bg-cyan-400 !w-2 !h-2 !border-2 !border-slate-900 !min-w-0 !min-h-0" />
      <Handle type="source" position={Position.Right} id="right" className="!bg-cyan-400 !w-2 !h-2 !border-2 !border-slate-900 !min-w-0 !min-h-0" />
    </div>
  );
});

const nodeTypes = { service: ArchNode };
const edgeTypes = { glow: GlowEdge };

interface NodeDetail {
  title: string;
  icon: string;
  accent: string;
  description: string;
  bullets: string[];
}

const NODE_DETAILS: Record<string, NodeDetail> = {
  user: {
    title: 'User / Browser',
    icon: '🌐',
    accent: '#60a5fa',
    description: 'The client-side experience delivered to every user.',
    bullets: [
      'Modern responsive UI built with Tailwind v4',
      'Server-side rendered for fast initial page loads',
      'Works across desktop and mobile devices',
      'Interactive dashboards with Recharts visualizations',
    ],
  },
  iap: {
    title: 'Google Cloud IAP',
    icon: '🔒',
    accent: '#34d399',
    description: 'Zero-trust identity layer that authenticates every request before it reaches the application.',
    bullets: [
      'Zero-trust security model — no VPN required',
      'No password management needed in production',
      'Automatic identity verification via Google Workspace',
      'Role-based access: SUPER_ADMIN, TEAM_ADMIN, VIEWER',
    ],
  },
  nginx: {
    title: 'Nginx',
    icon: '⚡',
    accent: '#22d3ee',
    description: 'High-performance reverse proxy sitting in front of the application container.',
    bullets: [
      'SSL/TLS termination for secure connections',
      'Reverse proxies traffic to the Next.js container',
      'Static asset caching with optimized headers',
      'Request buffering and connection management',
    ],
  },
  ssr: {
    title: 'SSR Pages',
    icon: '📄',
    accent: '#818cf8',
    description: 'Server-rendered pages that deliver fast, SEO-friendly content.',
    bullets: [
      'Built with React 19 and Next.js 15 App Router',
      'Team pages and section pages driven by CMS content',
      'Interactive dashboards with scroll-triggered animations',
      'Dynamic data fetching with streaming support',
    ],
  },
  api: {
    title: 'API Routes',
    icon: '⚙️',
    accent: '#f472b6',
    description: 'Backend API layer handling all data operations and integrations.',
    bullets: [
      '20+ RESTful API endpoints',
      'Server Actions for form submissions',
      'CMS content CRUD operations',
      'Permission-gated access on every route',
    ],
  },
  cms: {
    title: 'CMS Admin',
    icon: '✏️',
    accent: '#fbbf24',
    description: 'Full-featured content management system for non-technical editors.',
    bullets: [
      'Admin panel at /admin with role-based access',
      'Drag-and-drop widget ordering with @dnd-kit',
      'Rich markdown editing for page content',
      'Team hierarchy management and audit logging',
    ],
  },
  prisma: {
    title: 'Prisma ORM',
    icon: '🔷',
    accent: '#a78bfa',
    description: 'Type-safe database abstraction layer providing reliable data access.',
    bullets: [
      '15+ database models with full type safety',
      'TypeScript-first query builder',
      'Driver adapter pattern for PostgreSQL connection',
      'Schema migrations for safe database evolution',
    ],
  },
  postgres: {
    title: 'PostgreSQL',
    icon: '🐘',
    accent: '#38bdf8',
    description: 'Relational database storing all application state and content.',
    bullets: [
      'Users, teams, and permission hierarchies',
      'CMS pages, widgets, and content blocks',
      'Full audit trail of every change',
      'Role-based data access patterns',
    ],
  },
  docker: {
    title: 'Docker Compose',
    icon: '🐳',
    accent: '#2496ED',
    description: 'Multi-container orchestration for consistent environments across dev and production.',
    bullets: [
      'Three-container stack: app, database, reverse proxy',
      'Identical setup for local development and production',
      'Volume mounts for persistent database storage',
      'Environment-based configuration via .env files',
    ],
  },
  github: {
    title: 'GitHub',
    icon: '🔄',
    accent: '#8b5cf6',
    description: 'Source control and collaboration platform for the codebase.',
    bullets: [
      'Private repository with branch protection',
      'Pull request workflow for code review',
      'Version history and change tracking',
      'Issue tracking and project management',
    ],
  },
  devenv: {
    title: 'Dev Environment',
    icon: '🧪',
    accent: '#f97316',
    description: 'Local development stack mirroring production for safe iteration.',
    bullets: [
      'Local Docker Compose with hot reload',
      'DEV_BYPASS_IAP for local auth testing',
      'Seeded PostgreSQL with test data',
      'Prisma Studio for database inspection',
    ],
  },
  production: {
    title: 'Production',
    icon: '🚀',
    accent: '#10b981',
    description: 'Live deployment serving authenticated City of Edmonton users.',
    bullets: [
      'GCP Linux Compute instance with Docker Compose',
      'Google Cloud IAP enforced — no password fallback',
      'Nginx SSL termination with production certificates',
      'Automated container restarts and health checks',
    ],
  },
};

const nodes: Node[] = [
  {
    id: 'user',
    type: 'service',
    position: { x: 0, y: 200 },
    data: { label: 'User / Browser', sublabel: 'HTTPS request', icon: '🌐', accent: '#60a5fa' },
  },
  {
    id: 'iap',
    type: 'service',
    position: { x: 220, y: 200 },
    data: { label: 'Google Cloud IAP', sublabel: 'Identity-Aware Proxy', icon: '🔒', accent: '#34d399' },
  },
  {
    id: 'nginx',
    type: 'service',
    position: { x: 440, y: 200 },
    data: { label: 'Nginx', sublabel: 'SSL & reverse proxy', icon: '⚡', accent: '#22d3ee' },
  },
  {
    id: 'ssr',
    type: 'service',
    position: { x: 660, y: 60 },
    data: { label: 'SSR Pages', sublabel: 'Server-rendered routes', icon: '📄', accent: '#818cf8' },
  },
  {
    id: 'api',
    type: 'service',
    position: { x: 660, y: 200 },
    data: { label: 'API Routes', sublabel: '20+ endpoints', icon: '⚙️', accent: '#f472b6' },
  },
  {
    id: 'cms',
    type: 'service',
    position: { x: 660, y: 340 },
    data: { label: 'CMS Admin', sublabel: 'Content management', icon: '✏️', accent: '#fbbf24' },
  },
  {
    id: 'prisma',
    type: 'service',
    position: { x: 880, y: 200 },
    data: { label: 'Prisma ORM', sublabel: 'Type-safe queries · 15+ models', icon: '🔷', accent: '#a78bfa' },
  },
  {
    id: 'postgres',
    type: 'service',
    position: { x: 1100, y: 200 },
    data: { label: 'PostgreSQL', sublabel: 'Roles · Teams · Audit logs', icon: '🐘', accent: '#38bdf8' },
  },
];

const edges: Edge[] = [
  { id: 'e-user-iap', source: 'user', target: 'iap', type: 'glow', sourceHandle: 'right', targetHandle: 'left', data: { label: 'HTTPS' } },
  { id: 'e-iap-nginx', source: 'iap', target: 'nginx', type: 'glow', sourceHandle: 'right', targetHandle: 'left', data: { label: 'Authenticated' } },
  { id: 'e-nginx-ssr', source: 'nginx', target: 'ssr', type: 'glow', sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-nginx-api', source: 'nginx', target: 'api', type: 'glow', sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-nginx-cms', source: 'nginx', target: 'cms', type: 'glow', sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-ssr-prisma', source: 'ssr', target: 'prisma', type: 'glow', sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-api-prisma', source: 'api', target: 'prisma', type: 'glow', sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-cms-prisma', source: 'cms', target: 'prisma', type: 'glow', sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-prisma-pg', source: 'prisma', target: 'postgres', type: 'glow', sourceHandle: 'right', targetHandle: 'left', data: { label: 'SQL' } },
];

function WebsiteArchFlowInner() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const handleNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(prev => prev === node.id ? null : node.id);
  }, []);

  const handlePaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const detail = selectedNode ? NODE_DETAILS[selectedNode] : null;

  return (
    <div className="relative w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodeClick={handleNodeClick}
          onPaneClick={handlePaneClick}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          panOnDrag={false}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          preventScrolling={false}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#2d3a4d" />
        </ReactFlow>

        {/* Detail Sidebar */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-white border-l border-gray-200 shadow-2xl transition-transform duration-300 ease-in-out ${
            detail ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
        {detail && (
          <div className="p-5 h-full overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{detail.icon}</span>
                <h4
                  className="text-sm font-bold font-sans"
                  style={{ color: detail.accent }}
                >
                  {detail.title}
                </h4>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-1 rounded hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <p className="text-[13px] text-gray-600 font-sans leading-relaxed mb-4">
              {detail.description}
            </p>
            <ul className="space-y-2.5">
              {detail.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-2 text-[12px] text-gray-500 font-sans leading-relaxed">
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: detail.accent }}
                  />
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default function WebsiteArchFlow() {
  return (
    <ReactFlowProvider>
      <WebsiteArchFlowInner />
    </ReactFlowProvider>
  );
}
