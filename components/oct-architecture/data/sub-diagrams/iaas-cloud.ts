import type { Node, Edge } from '@xyflow/react';

export const iaasCloudNodes: Node[] = [
  // Equinix connection (above everything)
  {
    id: 'equinix',
    type: 'service',
    position: { x: 330, y: 0 },
    data: { label: 'Equinix Express Links', icon: '🔗', sublabel: 'Direct Connect', accent: '#3b82f6' },
  },

  // Cloud providers group
  {
    id: 'iaas-cloud-group',
    type: 'group',
    position: { x: 0, y: 110 },
    data: { label: 'IaaS / PaaS Public Cloud' },
    style: { width: 840, height: 160 },
  },

  // Cloud providers
  {
    id: 'cloud-gcp',
    type: 'service',
    position: { x: 20, y: 45 },
    data: { label: 'Google Cloud', icon: '☁️', sublabel: 'GCP', accent: '#4285f4' },
    parentId: 'iaas-cloud-group',
    extent: 'parent' as const,
  },
  {
    id: 'cloud-aws',
    type: 'service',
    position: { x: 220, y: 45 },
    data: { label: 'Amazon Web Services', icon: '☁️', sublabel: 'AWS', accent: '#ff9900' },
    parentId: 'iaas-cloud-group',
    extent: 'parent' as const,
  },
  {
    id: 'cloud-azure',
    type: 'service',
    position: { x: 420, y: 45 },
    data: { label: 'Microsoft Azure', icon: '☁️', sublabel: 'Azure', accent: '#0078d4' },
    parentId: 'iaas-cloud-group',
    extent: 'parent' as const,
  },
  {
    id: 'cloud-oci',
    type: 'service',
    position: { x: 620, y: 45 },
    data: { label: 'Oracle Cloud', icon: '☁️', sublabel: 'OCI', accent: '#f80000' },
    parentId: 'iaas-cloud-group',
    extent: 'parent' as const,
  },

  // Cloud applications group
  {
    id: 'cloud-apps-group',
    type: 'group',
    position: { x: 120, y: 310 },
    data: { label: 'Cloud Applications' },
    style: { width: 600, height: 160 },
  },

  {
    id: 'iaas-city-apps',
    type: 'service',
    position: { x: 50, y: 45 },
    data: { label: 'IaaS Cloud Apps', icon: '🖥️', sublabel: 'City Applications', accent: '#06b6d4' },
    parentId: 'cloud-apps-group',
    extent: 'parent' as const,
  },
  {
    id: 'paas-city-apps',
    type: 'service',
    position: { x: 340, y: 45 },
    data: { label: 'PaaS Cloud Apps', icon: '⚙️', sublabel: 'City Applications', accent: '#10b981' },
    parentId: 'cloud-apps-group',
    extent: 'parent' as const,
  },
];

export const iaasCloudEdges: Edge[] = [
  {
    id: 'e-equinix-iaas',
    source: 'equinix',
    target: 'iaas-cloud-group',
    type: 'glow',
    data: { label: '' },
  },
  {
    id: 'e-iaas-apps',
    source: 'iaas-cloud-group',
    target: 'cloud-apps-group',
    type: 'glow',
    data: { label: '' },
  },
];
