import type { Node, Edge } from '@xyflow/react';

export const saasCloudNodes: Node[] = [
  // Sources (centered above group)
  {
    id: 'saas-internet',
    type: 'cloud',
    position: { x: -40, y: 10 },
    data: { label: 'Internet' },
  },
  {
    id: 'saas-equinix',
    type: 'service',
    position: { x: 120, y: 0 },
    data: { label: 'Equinix Express Links', icon: '🔗', sublabel: 'Direct Connect', accent: '#3b82f6' },
  },

  // Container group
  {
    id: 'saas-cloud-group',
    type: 'group',
    position: { x: 0, y: 120 },
    data: { label: 'SaaS Public Cloud', sublabel: 'Google Workspace: Endpoint Compliance Required' },
    style: { width: 420, height: 200 },
  },

  // SaaS services
  {
    id: 'saas-city-apps',
    type: 'service',
    position: { x: 20, y: 60 },
    data: { label: 'SaaS Cloud', icon: '☁️', sublabel: 'City Applications', accent: '#06b6d4' },
    parentId: 'saas-cloud-group',
    extent: 'parent' as const,
  },
  {
    id: 'saas-non-city-apps',
    type: 'service',
    position: { x: 220, y: 60 },
    data: { label: 'SaaS Cloud', icon: '☁️', sublabel: 'Non-City Applications', accent: '#8b5cf6' },
    parentId: 'saas-cloud-group',
    extent: 'parent' as const,
  },
  // Azure Enterprise Apps (outside group, to the right)
  {
    id: 'saas-azure-entra',
    type: 'service',
    position: { x: 300, y: 0 },
    data: { label: 'Azure Enterprise Apps', icon: '🔐', sublabel: 'Entra ID', accent: '#0078d4' },
  },
];

export const saasCloudEdges: Edge[] = [
  {
    id: 'e-internet-saas',
    source: 'saas-internet',
    target: 'saas-cloud-group',
    type: 'glow',
    data: { label: '' },
  },
  {
    id: 'e-equinix-saas',
    source: 'saas-equinix',
    target: 'saas-cloud-group',
    type: 'glow',
    data: { label: '' },
  },
  {
    id: 'e-azure-entra-saas',
    source: 'saas-azure-entra',
    target: 'saas-cloud-group',
    type: 'glow',
    data: { label: '' },
  },
];
