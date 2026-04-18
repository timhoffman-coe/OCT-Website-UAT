import type { Node, Edge } from '@xyflow/react';

export const securityGatewayNodes: Node[] = [
  // Internet cloud (above group)
  {
    id: 'internet-cloud',
    type: 'cloud',
    position: { x: 460, y: 10 },
    data: { label: 'Internet' },
  },

  // Container group
  {
    id: 'security-gateway-group',
    type: 'group',
    position: { x: 0, y: 120 },
    data: { label: 'Security & Access Gateway Layer' },
    style: { width: 1060, height: 300 },
  },

  // Entry points (top row)
  {
    id: 'cloudflare',
    type: 'service',
    position: { x: 20, y: 40 },
    data: { label: 'Cloudflare', icon: '🛡️', sublabel: 'WAF & CDN', accent: '#f97316' },
    style: { width: 790 },
    parentId: 'security-gateway-group',
    extent: 'parent' as const,
  },
  {
    id: 'ivanti-vpn',
    type: 'service',
    position: { x: 860, y: 40 },
    data: { label: 'Ivanti VPN', icon: '🔐', sublabel: 'Remote Access', accent: '#8b5cf6' },
    parentId: 'security-gateway-group',
    extent: 'parent' as const,
  },

  // Beneath Cloudflare (bottom row) — active left, decommissioning right
  {
    id: 'ws1-access',
    type: 'service',
    position: { x: 20, y: 170 },
    data: { label: 'Workspace One Access', icon: '🔑', sublabel: 'Identity & SSO', accent: '#06b6d4' },
    parentId: 'security-gateway-group',
    extent: 'parent' as const,
  },
  {
    id: 'f5-apm',
    type: 'service',
    position: { x: 230, y: 170 },
    data: { label: 'F5 APM', icon: '🔒', sublabel: 'Access Policy Manager', accent: '#22c55e' },
    parentId: 'security-gateway-group',
    extent: 'parent' as const,
  },
  {
    id: 'citrix-gateway',
    type: 'decommission',
    position: { x: 440, y: 170 },
    data: { label: 'Citrix Gateway', icon: '🌐', badge: 'Decommissioning' },
    parentId: 'security-gateway-group',
    extent: 'parent' as const,
  },
  {
    id: 'lenovo-portal',
    type: 'decommission',
    position: { x: 650, y: 170 },
    data: { label: 'Lenovo Portal', icon: '💻', badge: 'Decommissioning' },
    parentId: 'security-gateway-group',
    extent: 'parent' as const,
  },
];

export const securityGatewayEdges: Edge[] = [
  {
    id: 'e-internet-gateway',
    source: 'internet-cloud',
    target: 'security-gateway-group',
    type: 'glow',
    data: { label: '' },
  },
  {
    id: 'e-cloudflare-ws1',
    source: 'cloudflare',
    target: 'ws1-access',
    type: 'glow',
    data: { label: '' },
  },
  {
    id: 'e-cloudflare-citrix',
    source: 'cloudflare',
    target: 'citrix-gateway',
    type: 'glow',
    data: { label: '' },
  },
  {
    id: 'e-cloudflare-lenovo',
    source: 'cloudflare',
    target: 'lenovo-portal',
    type: 'glow',
    data: { label: '' },
  },
  {
    id: 'e-cloudflare-f5',
    source: 'cloudflare',
    target: 'f5-apm',
    type: 'glow',
    data: { label: '' },
  },
];
