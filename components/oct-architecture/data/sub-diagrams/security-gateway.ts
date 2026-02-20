import type { Node, Edge } from '@xyflow/react';

export const securityGatewayNodes: Node[] = [
  // Container group
  {
    id: 'security-gateway-group',
    type: 'group',
    position: { x: 0, y: 0 },
    data: { label: 'Security & Access Gateway Layer' },
    style: { width: 1060, height: 180 },
  },

  // Active services
  {
    id: 'ivanti-vpn',
    type: 'service',
    position: { x: 420, y: 40 },
    data: { label: 'Ivanti VPN', icon: '🔐', sublabel: 'Remote Access', accent: '#8b5cf6' },
    parentId: 'security-gateway-group',
    extent: 'parent' as const,
  },
  {
    id: 'cloudflare',
    type: 'service',
    position: { x: 630, y: 40 },
    data: { label: 'Cloudflare', icon: '🛡️', sublabel: 'WAF & CDN', accent: '#f97316' },
    parentId: 'security-gateway-group',
    extent: 'parent' as const,
  },
  {
    id: 'ws1-access',
    type: 'service',
    position: { x: 840, y: 40 },
    data: {
      label: 'Workspace One Access',
      icon: '🔑',
      sublabel: 'Cloudflare in-front of WS1',
      accent: '#06b6d4',
    },
    parentId: 'security-gateway-group',
    extent: 'parent' as const,
  },

  // Decommissioning services
  {
    id: 'lenovo-portal',
    type: 'decommission',
    position: { x: 20, y: 40 },
    data: { label: 'Lenovo Portal', icon: '💻', badge: 'Decommissioning' },
    parentId: 'security-gateway-group',
    extent: 'parent' as const,
  },
  {
    id: 'citrix-gateway',
    type: 'decommission',
    position: { x: 210, y: 40 },
    data: { label: 'Citrix Gateway', icon: '🌐', badge: 'Decommissioning' },
    parentId: 'security-gateway-group',
    extent: 'parent' as const,
  },
];

export const securityGatewayEdges: Edge[] = [
  {
    id: 'e-cloudflare-ws1',
    source: 'cloudflare',
    sourceHandle: 'right',
    target: 'ws1-access',
    targetHandle: 'left',
    type: 'glow',
    data: { label: 'Required Path' },
  },
];
