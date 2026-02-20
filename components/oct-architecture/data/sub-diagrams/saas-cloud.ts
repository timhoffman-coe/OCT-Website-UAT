import type { Node, Edge } from '@xyflow/react';

export const saasCloudNodes: Node[] = [
  // Container group
  {
    id: 'saas-cloud-group',
    type: 'group',
    position: { x: 0, y: 0 },
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
];

export const saasCloudEdges: Edge[] = [];
