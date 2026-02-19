import type { Node, Edge } from '@xyflow/react';

export const campusNetworkNodes: Node[] = [
  // ═══════════════════════════════════════════
  // WAN UPLINK (top)
  // ═══════════════════════════════════════════
  {
    id: 'wan-uplink',
    type: 'service',
    position: { x: 300, y: 0 },
    data: { label: 'WAN / Internet Uplink', icon: '🌐', sublabel: 'To Edge Firewall', accent: '#ef4444' },
  },

  // ═══════════════════════════════════════════
  // CORE LAYER (group)
  // ═══════════════════════════════════════════
  {
    id: 'core-layer-group',
    type: 'group',
    position: { x: 50, y: 130 },
    data: { label: 'Core Layer' },
    style: { width: 700, height: 180 },
  },
  {
    id: 'core-sw-a',
    type: 'service',
    position: { x: 30, y: 50 },
    data: { label: 'Core Switch A', icon: '🔀', sublabel: 'Primary - HA Pair', accent: '#10b981' },
    parentId: 'core-layer-group',
    extent: 'parent' as const,
  },
  {
    id: 'core-sw-b',
    type: 'service',
    position: { x: 260, y: 50 },
    data: { label: 'Core Switch B', icon: '🔀', sublabel: 'Redundant - HA Pair', accent: '#10b981' },
    parentId: 'core-layer-group',
    extent: 'parent' as const,
  },
  {
    id: 'wlan-controller',
    type: 'service',
    position: { x: 490, y: 50 },
    data: { label: 'WLAN Controller', icon: '📡', sublabel: 'Wireless Management', accent: '#8b5cf6' },
    parentId: 'core-layer-group',
    extent: 'parent' as const,
  },

  // ═══════════════════════════════════════════
  // SERVICES (middle)
  // ═══════════════════════════════════════════
  {
    id: 'nac-server',
    type: 'service',
    position: { x: 100, y: 370 },
    data: { label: 'NAC Server', icon: '🔒', sublabel: 'Network Access Control', accent: '#f97316' },
  },
  {
    id: 'voip-gateway',
    type: 'service',
    position: { x: 500, y: 370 },
    data: { label: 'VoIP Gateway', icon: '📞', sublabel: 'Voice Services', accent: '#06b6d4' },
  },

  // ═══════════════════════════════════════════
  // DISTRIBUTION / ACCESS LAYER (group)
  // ═══════════════════════════════════════════
  {
    id: 'dist-layer-group',
    type: 'group',
    position: { x: 20, y: 500 },
    data: { label: 'Distribution / Access Layer' },
    style: { width: 780, height: 190 },
  },
  {
    id: 'city-hall',
    type: 'service',
    position: { x: 20, y: 50 },
    data: { label: 'City Hall', icon: '🏛️', sublabel: 'Floor Switches & APs', accent: '#06b6d4' },
    parentId: 'dist-layer-group',
    extent: 'parent' as const,
  },
  {
    id: 'edmonton-tower',
    type: 'service',
    position: { x: 210, y: 50 },
    data: { label: 'Edmonton Tower', icon: '🏢', sublabel: 'Floor Switches & APs', accent: '#06b6d4' },
    parentId: 'dist-layer-group',
    extent: 'parent' as const,
  },
  {
    id: 'century-place',
    type: 'service',
    position: { x: 400, y: 50 },
    data: { label: 'Century Place', icon: '🏗️', sublabel: 'Floor Switches & APs', accent: '#06b6d4' },
    parentId: 'dist-layer-group',
    extent: 'parent' as const,
  },
  {
    id: 'field-offices',
    type: 'service',
    position: { x: 590, y: 50 },
    data: { label: 'Field Offices', icon: '🏘️', sublabel: 'Remote Sites', accent: '#f97316' },
    parentId: 'dist-layer-group',
    extent: 'parent' as const,
  },
];

export const campusNetworkEdges: Edge[] = [
  // WAN → Core
  { id: 'e-wan-core-a', source: 'wan-uplink', target: 'core-sw-a', type: 'glow' },
  { id: 'e-wan-core-b', source: 'wan-uplink', target: 'core-sw-b', type: 'glow' },

  // Core HA pair
  {
    id: 'e-core-ha',
    source: 'core-sw-a',
    sourceHandle: 'right',
    target: 'core-sw-b',
    targetHandle: 'left',
    type: 'glow',
    data: { label: 'HA Pair' },
  },

  // Core → WLAN
  {
    id: 'e-core-wlan',
    source: 'core-sw-b',
    sourceHandle: 'right',
    target: 'wlan-controller',
    targetHandle: 'left',
    type: 'glow',
  },

  // Core → Services
  { id: 'e-core-nac', source: 'core-sw-a', target: 'nac-server', type: 'glow' },
  { id: 'e-core-voip', source: 'core-sw-b', target: 'voip-gateway', type: 'glow' },

  // Core → Distribution
  { id: 'e-core-city', source: 'core-sw-a', target: 'city-hall', type: 'glow' },
  { id: 'e-core-tower', source: 'core-sw-a', target: 'edmonton-tower', type: 'glow' },
  { id: 'e-core-century', source: 'core-sw-b', target: 'century-place', type: 'glow' },
  { id: 'e-core-field', source: 'core-sw-b', target: 'field-offices', type: 'glow' },
];
