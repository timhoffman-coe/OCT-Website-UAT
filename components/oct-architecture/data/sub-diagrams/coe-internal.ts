import type { Node, Edge } from '@xyflow/react';

export const coeInternalNodes: Node[] = [
  // Main container group
  {
    id: 'coe-internal-group',
    type: 'group',
    position: { x: 0, y: 0 },
    data: { label: 'COE Internal Environment' },
    style: { width: 930, height: 750 },
  },

  // Campus Network (drillable)
  {
    id: 'campus-network',
    type: 'userGroup',
    position: { x: 20, y: 50 },
    data: { label: 'Campus Network', icon: '🏛️', sublabel: 'On-Premise Users', accent: '#10b981', hasSubDiagram: true },
    parentId: 'coe-internal-group',
    extent: 'parent' as const,
  },

  // Internet Access Zone (nested group)
  {
    id: 'internet-access-zone',
    type: 'group',
    position: { x: 350, y: 30 },
    data: { label: 'Internet Access Zone' },
    style: { width: 230, height: 350 },
    parentId: 'coe-internal-group',
    extent: 'parent' as const,
  },
  {
    id: 'edge-firewall',
    type: 'service',
    position: { x: 20, y: 40 },
    data: { label: 'Edge Firewall Cluster', icon: '🧱', sublabel: 'Perimeter Defense', accent: '#ef4444' },
    parentId: 'internet-access-zone',
    extent: 'parent' as const,
  },
  {
    id: 'trellix-nx',
    type: 'service',
    position: { x: 20, y: 140 },
    data: { label: 'IPS/IDS', icon: '🔍', sublabel: 'Threat Detection', accent: '#f97316' },
    parentId: 'internet-access-zone',
    extent: 'parent' as const,
  },
  {
    id: 'f5-adcs',
    type: 'service',
    position: { x: 20, y: 240 },
    data: { label: 'Loadbalancers/ADCs', icon: '⚖️', sublabel: 'Load Balancing', accent: '#06b6d4' },
    parentId: 'internet-access-zone',
    extent: 'parent' as const,
  },

  // Primary Data Center
  {
    id: 'primary-dc',
    type: 'group',
    position: { x: 20, y: 390 },
    data: { label: 'Primary Data Center' },
    style: { width: 350, height: 280 },
    parentId: 'coe-internal-group',
    extent: 'parent' as const,
  },
  {
    id: 'primary-fw-cluster',
    type: 'service',
    position: { x: 80, y: 45 },
    data: { label: 'Firewall Cluster', icon: '🔥', sublabel: 'Primary DC', accent: '#10b981' },
    parentId: 'primary-dc',
    extent: 'parent' as const,
  },
  {
    id: 'primary-dc-apps',
    type: 'service',
    position: { x: 80, y: 155 },
    data: { label: 'Data Center', icon: '🏢', sublabel: 'Primary Infrastructure', accent: '#3b82f6' },
    parentId: 'primary-dc',
    extent: 'parent' as const,
  },

  // DR Data Center
  {
    id: 'dr-dc',
    type: 'group',
    position: { x: 560, y: 390 },
    data: { label: 'DR Data Center' },
    style: { width: 350, height: 280 },
    parentId: 'coe-internal-group',
    extent: 'parent' as const,
  },
  {
    id: 'dr-fw-cluster',
    type: 'service',
    position: { x: 80, y: 45 },
    data: { label: 'Firewall Cluster', icon: '🔥', sublabel: 'DR DC', accent: '#10b981' },
    parentId: 'dr-dc',
    extent: 'parent' as const,
  },
  {
    id: 'dr-dc-apps',
    type: 'service',
    position: { x: 80, y: 155 },
    data: { label: 'Data Center', icon: '🏢', sublabel: 'DR Infrastructure', accent: '#3b82f6' },
    parentId: 'dr-dc',
    extent: 'parent' as const,
  },

  // Internal City Applications
  {
    id: 'internal-city-apps',
    type: 'service',
    position: { x: 370, y: 545 },
    data: { label: 'Internal City Applications', icon: '🏙️', sublabel: 'Shared Services', accent: '#f59e0b' },
    parentId: 'coe-internal-group',
    extent: 'parent' as const,
  },
];

export const coeInternalEdges: Edge[] = [
  // Campus → Internet Access Zone
  {
    id: 'e-campus-firewall',
    source: 'campus-network',
    sourceHandle: 'right',
    target: 'internet-access-zone',
    targetHandle: 'left',
    type: 'glow',
  },

  // Internet Access Zone internal flow
  {
    id: 'e-firewall-trellix',
    source: 'edge-firewall',
    target: 'trellix-nx',
    type: 'glow',
  },
  {
    id: 'e-trellix-f5',
    source: 'trellix-nx',
    target: 'f5-adcs',
    type: 'glow',
  },

  // F5 → Data Centers
  {
    id: 'e-f5-primary-fw',
    source: 'f5-adcs',
    target: 'primary-fw-cluster',
    type: 'glow',
  },
  {
    id: 'e-f5-dr-fw',
    source: 'f5-adcs',
    target: 'dr-fw-cluster',
    type: 'glow',
  },

  // Data Centers → Internal City Apps
  {
    id: 'e-primary-dc-city-apps',
    source: 'primary-dc-apps',
    sourceHandle: 'right',
    target: 'internal-city-apps',
    targetHandle: 'left',
    type: 'glow',
  },
  {
    id: 'e-city-apps-dr-dc',
    source: 'internal-city-apps',
    sourceHandle: 'right',
    target: 'dr-dc-apps',
    targetHandle: 'left',
    type: 'glow',
  },
];
