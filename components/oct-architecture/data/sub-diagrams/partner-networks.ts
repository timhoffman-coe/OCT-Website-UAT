import type { Node, Edge } from '@xyflow/react';

export const partnerNetworksNodes: Node[] = [
  // Container group
  {
    id: 'partner-group',
    type: 'group',
    position: { x: 0, y: 0 },
    data: { label: 'Partner Networks' },
    style: { width: 1300, height: 160 },
  },

  // Partner services
  {
    id: 'b2b-firewall',
    type: 'service',
    position: { x: 20, y: 45 },
    data: {
      label: 'Future B2B Firewall',
      icon: '🔥',
      sublabel: 'ACL Controlled',
      accent: '#ef4444',
    },
    parentId: 'partner-group',
    extent: 'parent' as const,
  },
  {
    id: 'ahs',
    type: 'service',
    position: { x: 310, y: 45 },
    data: { label: 'Alberta Health Services', icon: '🏥', accent: '#10b981' },
    parentId: 'partner-group',
    extent: 'parent' as const,
  },
  {
    id: 'eps',
    type: 'service',
    position: { x: 580, y: 45 },
    data: { label: 'Edmonton Police Service', icon: '🚔', accent: '#3b82f6' },
    parentId: 'partner-group',
    extent: 'parent' as const,
  },
  {
    id: 'epcor',
    type: 'service',
    position: { x: 850, y: 45 },
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
    sourceHandle: 'right',
    target: 'ahs',
    targetHandle: 'left',
    type: 'glow',
  },
  {
    id: 'e-b2b-eps',
    source: 'b2b-firewall',
    sourceHandle: 'right',
    target: 'eps',
    targetHandle: 'left',
    type: 'glow',
  },
  {
    id: 'e-b2b-epcor',
    source: 'b2b-firewall',
    sourceHandle: 'right',
    target: 'epcor',
    targetHandle: 'left',
    type: 'glow',
  },
];
