import type { Node, Edge } from '@xyflow/react';

export const campusNetworkNodes: Node[] = [
  // ═══════════════════════════════════════════
  // CORE AREA (left side)
  // ═══════════════════════════════════════════
  {
    id: 'core-area-group',
    type: 'group',
    position: { x: 0, y: 350 },
    data: { label: 'Core Area — OSPF Area 0' },
    style: { width: 420, height: 300 },
  },
  {
    id: 'century-place',
    type: 'service',
    position: { x: 20, y: 50 },
    data: { label: 'Century Place', icon: '🔀', sublabel: 'Core L3 Switch', accent: '#10b981' },
    parentId: 'core-area-group',
    extent: 'parent' as const,
  },
  {
    id: 'city-hall',
    type: 'service',
    position: { x: 220, y: 50 },
    data: { label: 'City Hall', icon: '🔀', sublabel: 'Core L3 Switch', accent: '#10b981' },
    parentId: 'core-area-group',
    extent: 'parent' as const,
  },
  {
    id: 'corepk',
    type: 'service',
    position: { x: 120, y: 170 },
    data: { label: 'CorePK', icon: '🔀', sublabel: 'Core L3 Switch', accent: '#10b981' },
    parentId: 'core-area-group',
    extent: 'parent' as const,
  },

  // ═══════════════════════════════════════════
  // CAMPUS SITES (top-right)
  // ═══════════════════════════════════════════
  {
    id: 'campus-sites-group',
    type: 'group',
    position: { x: 520, y: 0 },
    data: { label: 'Campus Sites' },
    style: { width: 700, height: 350 },
  },

  // City Fiber Wired Sites
  {
    id: 'fiber-sites-group',
    type: 'group',
    position: { x: 20, y: 40 },
    data: { label: 'City Fiber Wired Sites' },
    style: { width: 460, height: 280 },
    parentId: 'campus-sites-group',
    extent: 'parent' as const,
  },
  {
    id: 'area-7',
    type: 'service',
    position: { x: 20, y: 45 },
    data: { label: 'Area 7', icon: '🔀', sublabel: 'OSPF Area', accent: '#06b6d4' },
    parentId: 'fiber-sites-group',
    extent: 'parent' as const,
  },
  {
    id: 'area-207',
    type: 'service',
    position: { x: 260, y: 45 },
    data: { label: 'Area 207', icon: '🔀', sublabel: 'OSPF Area', accent: '#06b6d4' },
    parentId: 'fiber-sites-group',
    extent: 'parent' as const,
  },
  {
    id: 'area-21',
    type: 'service',
    position: { x: 20, y: 160 },
    data: { label: 'Area 21', icon: '🔀', sublabel: 'OSPF Area', accent: '#06b6d4' },
    parentId: 'fiber-sites-group',
    extent: 'parent' as const,
  },
  {
    id: 'area-221',
    type: 'service',
    position: { x: 260, y: 160 },
    data: { label: 'Area 221', icon: '🔀', sublabel: 'OSPF Area', accent: '#06b6d4' },
    parentId: 'fiber-sites-group',
    extent: 'parent' as const,
  },

  // Telus MPLS & site count
  {
    id: 'telus-mpls',
    type: 'service',
    position: { x: 510, y: 80 },
    data: { label: 'Telus MPLS Sites', icon: '☁️', sublabel: 'WAN Provider', accent: '#8b5cf6' },
    parentId: 'campus-sites-group',
    extent: 'parent' as const,
  },
  {
    id: 'site-count-fiber',
    type: 'service',
    position: { x: 510, y: 210 },
    data: { label: '70+ Sites', icon: '🏢', sublabel: 'Dual Uplink Redundancy', accent: '#3b82f6' },
    parentId: 'campus-sites-group',
    extent: 'parent' as const,
  },

  // ═══════════════════════════════════════════
  // WIRELESS TOWER NETWORK (middle-right)
  // ═══════════════════════════════════════════
  {
    id: 'wireless-group',
    type: 'group',
    position: { x: 520, y: 400 },
    data: { label: 'Wireless Tower Network' },
    style: { width: 700, height: 300 },
  },
  {
    id: 'poundmaker-tower',
    type: 'service',
    position: { x: 20, y: 50 },
    data: { label: 'Poundmaker Tower', icon: '📡', sublabel: 'Radio Tower', accent: '#f97316' },
    parentId: 'wireless-group',
    extent: 'parent' as const,
  },
  {
    id: 'westwood-tower',
    type: 'service',
    position: { x: 20, y: 170 },
    data: { label: 'Westwood Tower', icon: '📡', sublabel: 'Radio Tower', accent: '#f97316' },
    parentId: 'wireless-group',
    extent: 'parent' as const,
  },
  {
    id: 'kennedale-tower',
    type: 'service',
    position: { x: 230, y: 50 },
    data: { label: 'Kennedale Tower', icon: '📡', sublabel: 'Radio Tower', accent: '#f97316' },
    parentId: 'wireless-group',
    extent: 'parent' as const,
  },
  {
    id: 'century-tower',
    type: 'service',
    position: { x: 230, y: 170 },
    data: { label: 'Century Tower', icon: '📡', sublabel: 'Radio Tower', accent: '#f97316' },
    parentId: 'wireless-group',
    extent: 'parent' as const,
  },
  {
    id: 'ubiquiti-sites',
    type: 'service',
    position: { x: 460, y: 50 },
    data: { label: 'Ubiquiti Wireless', icon: '📶', sublabel: 'Bridged Sites', accent: '#eab308' },
    parentId: 'wireless-group',
    extent: 'parent' as const,
  },
  {
    id: 'site-count-wireless',
    type: 'service',
    position: { x: 460, y: 170 },
    data: { label: '50+ Sites', icon: '📡', sublabel: 'L2 Extension', accent: '#3b82f6' },
    parentId: 'wireless-group',
    extent: 'parent' as const,
  },

  // ═══════════════════════════════════════════
  // LoRaWAN (bottom-right)
  // ═══════════════════════════════════════════
  {
    id: 'lorawan',
    type: 'service',
    position: { x: 960, y: 750 },
    data: { label: 'LoRaWAN', icon: '🌐', sublabel: 'IoT Network', accent: '#10b981' },
  },
];

export const campusNetworkEdges: Edge[] = [
  // ═══════════════════════════════════════════
  // CORE AREA — Full Mesh
  // ═══════════════════════════════════════════
  {
    id: 'e-cp-ch',
    source: 'century-place',
    sourceHandle: 'right',
    target: 'city-hall',
    targetHandle: 'left',
    type: 'glow',
  },
  {
    id: 'e-cp-corepk',
    source: 'century-place',
    target: 'corepk',
    type: 'glow',
  },
  {
    id: 'e-ch-corepk',
    source: 'city-hall',
    target: 'corepk',
    type: 'glow',
  },

  // ═══════════════════════════════════════════
  // CORE → CAMPUS SITES
  // ═══════════════════════════════════════════
  {
    id: 'e-core-fiber',
    source: 'city-hall',
    sourceHandle: 'right',
    target: 'fiber-sites-group',
    targetHandle: 'left',
    type: 'glow',
  },

  // Fiber Sites — Ext Redistribution
  {
    id: 'e-area7-207',
    source: 'area-7',
    sourceHandle: 'right',
    target: 'area-207',
    targetHandle: 'left',
    type: 'glow',
    data: { label: 'Ext Redistribution' },
  },
  {
    id: 'e-area21-221',
    source: 'area-21',
    sourceHandle: 'right',
    target: 'area-221',
    targetHandle: 'left',
    type: 'glow',
    data: { label: 'Ext Redistribution' },
  },

  // Areas → Telus MPLS
  {
    id: 'e-207-telus',
    source: 'area-207',
    sourceHandle: 'right',
    target: 'telus-mpls',
    targetHandle: 'left',
    type: 'glow',
  },

  // ═══════════════════════════════════════════
  // CORE → WIRELESS
  // ═══════════════════════════════════════════
  {
    id: 'e-core-wireless',
    source: 'corepk',
    sourceHandle: 'right',
    target: 'wireless-group',
    targetHandle: 'left',
    type: 'glow',
  },

  // Tower interconnections (L2 Extension)
  {
    id: 'e-pound-kenn',
    source: 'poundmaker-tower',
    sourceHandle: 'right',
    target: 'kennedale-tower',
    targetHandle: 'left',
    type: 'glow',
    data: { label: 'L2 Extension' },
  },
  {
    id: 'e-west-century',
    source: 'westwood-tower',
    sourceHandle: 'right',
    target: 'century-tower',
    targetHandle: 'left',
    type: 'glow',
  },

  // Towers → Ubiquiti
  {
    id: 'e-kenn-ubiquiti',
    source: 'kennedale-tower',
    sourceHandle: 'right',
    target: 'ubiquiti-sites',
    targetHandle: 'left',
    type: 'glow',
  },
  {
    id: 'e-century-sites',
    source: 'century-tower',
    sourceHandle: 'right',
    target: 'site-count-wireless',
    targetHandle: 'left',
    type: 'glow',
  },

  // ═══════════════════════════════════════════
  // CORE → LoRaWAN
  // ═══════════════════════════════════════════
  {
    id: 'e-core-lorawan',
    source: 'corepk',
    target: 'lorawan',
    type: 'glow',
  },
];
