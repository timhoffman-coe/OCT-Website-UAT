import type { Node, Edge } from '@xyflow/react';

export const partnerNetworksNodes: Node[] = [
  // B2B Firewall (above group)
  {
    id: 'b2b-firewall',
    type: 'service',
    position: { x: 370, y: 0 },
    data: {
      label: 'B2B Firewall Cluster',
      icon: '🔥',
      sublabel: 'ACL Controlled',
      accent: '#ef4444',
    },
  },

  // Container group
  {
    id: 'partner-group',
    type: 'group',
    position: { x: 0, y: 120 },
    data: { label: 'Partner Networks' },
    style: { width: 900, height: 160 },
  },

  // Partner services
  {
    id: 'ahs',
    type: 'service',
    position: { x: 100, y: 45 },
    data: { label: 'Alberta Health Services', icon: '🏥', accent: '#10b981' },
    parentId: 'partner-group',
    extent: 'parent' as const,
  },
  {
    id: 'eps',
    type: 'service',
    position: { x: 370, y: 45 },
    data: { label: 'Edmonton Police Service', icon: '🚔', accent: '#3b82f6' },
    parentId: 'partner-group',
    extent: 'parent' as const,
  },
  {
    id: 'epcor',
    type: 'service',
    position: { x: 640, y: 45 },
    data: { label: 'EPCOR', icon: '⚡', accent: '#eab308' },
    parentId: 'partner-group',
    extent: 'parent' as const,
  },
];

export const partnerNetworksEdges: Edge[] = [
  // B2B Firewall → Partners
  {
    id: 'e-b2b-ahs',
    source: 'b2b-firewall',
    target: 'ahs',
    type: 'glow',
  },
  {
    id: 'e-b2b-eps',
    source: 'b2b-firewall',
    target: 'eps',
    type: 'glow',
  },
  {
    id: 'e-b2b-epcor',
    source: 'b2b-firewall',
    target: 'epcor',
    type: 'glow',
  },
];
