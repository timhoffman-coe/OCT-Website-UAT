import type { Node, Edge } from '@xyflow/react';

export const iaasCloudNodes: Node[] = [
  // Container group
  {
    id: 'iaas-cloud-group',
    type: 'group',
    position: { x: 0, y: 0 },
    data: { label: 'IaaS Public Cloud' },
    style: { width: 420, height: 200 },
  },

  // IaaS services
  {
    id: 'iaas-city-apps',
    type: 'service',
    position: { x: 20, y: 60 },
    data: { label: 'IaaS Cloud Apps', icon: '🖥️', sublabel: 'City Applications', accent: '#06b6d4' },
    parentId: 'iaas-cloud-group',
    extent: 'parent' as const,
  },
  {
    id: 'paas-city-apps',
    type: 'service',
    position: { x: 220, y: 60 },
    data: { label: 'PaaS Cloud Apps', icon: '⚙️', sublabel: 'City Applications', accent: '#10b981' },
    parentId: 'iaas-cloud-group',
    extent: 'parent' as const,
  },

  // Equinix connection
  {
    id: 'equinix',
    type: 'service',
    position: { x: 140, y: 280 },
    data: { label: 'Equinix Express Links', icon: '🔗', sublabel: 'Direct Connect', accent: '#3b82f6' },
  },
];

export const iaasCloudEdges: Edge[] = [
  {
    id: 'e-equinix-iaas',
    source: 'equinix',
    target: 'iaas-cloud-group',
    type: 'glow',
    data: { label: 'Equinix Express Links' },
  },
];
