import type { Node } from '@xyflow/react';

export const initialNodes: Node[] = [
  // ═══════════════════════════════════════════
  // USER GROUPS (top)
  // ═══════════════════════════════════════════
  {
    id: 'coe-remote-users',
    type: 'userGroup',
    position: { x: 200, y: 0 },
    data: { label: 'COE Remote Users', icon: '👨‍💻', sublabel: 'VPN & Remote Access', accent: '#8b5cf6' },
  },
  {
    id: 'public-edmonton-users',
    type: 'userGroup',
    position: { x: 600, y: 0 },
    data: { label: 'Public Edmonton Users', icon: '🌍', sublabel: 'Public Internet Access', accent: '#06b6d4' },
  },

  // ═══════════════════════════════════════════
  // INTERNET CLOUD
  // ═══════════════════════════════════════════
  {
    id: 'internet',
    type: 'cloud',
    position: { x: 400, y: 120 },
    data: { label: 'Internet' },
  },

  // ═══════════════════════════════════════════
  // SECURITY & ACCESS GATEWAY LAYER (group)
  // ═══════════════════════════════════════════
  {
    id: 'security-gateway-group',
    type: 'group',
    position: { x: 40, y: 260 },
    data: { label: 'Security & Access Gateway Layer' },
    style: { width: 1060, height: 180 },
  },
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

  // ═══════════════════════════════════════════
  // COE INTERNAL ENVIRONMENT (group)
  // ═══════════════════════════════════════════
  {
    id: 'coe-internal-group',
    type: 'group',
    position: { x: 40, y: 590 },
    data: { label: 'COE Internal Environment' },
    style: { width: 800, height: 640 },
  },

  // Campus Network (left side)
  {
    id: 'campus-network',
    type: 'userGroup',
    position: { x: 20, y: 50 },
    data: { label: 'Campus Network', icon: '🏛️', sublabel: 'On-Premise Users', accent: '#10b981', hasSubDiagram: true },
    parentId: 'coe-internal-group',
    extent: 'parent' as const,
  },

  // Security appliances (stacked vertically, right of campus)
  {
    id: 'edge-firewall',
    type: 'service',
    position: { x: 280, y: 50 },
    data: { label: 'Edge Firewall Cluster', icon: '🧱', sublabel: 'Perimeter Defense', accent: '#ef4444' },
    parentId: 'coe-internal-group',
    extent: 'parent' as const,
  },
  {
    id: 'trellix-nx',
    type: 'service',
    position: { x: 280, y: 160 },
    data: { label: 'Trellix (FireEye) NX', icon: '🔍', sublabel: 'Threat Detection', accent: '#f97316' },
    parentId: 'coe-internal-group',
    extent: 'parent' as const,
  },
  {
    id: 'f5-adcs',
    type: 'service',
    position: { x: 280, y: 270 },
    data: { label: 'F5 ADCs', icon: '⚖️', sublabel: 'Load Balancing', accent: '#06b6d4' },
    parentId: 'coe-internal-group',
    extent: 'parent' as const,
  },

  // Data Centers (nested groups)
  {
    id: 'primary-dc',
    type: 'group',
    position: { x: 20, y: 390 },
    data: { label: 'Primary Data Center' },
    style: { width: 350, height: 170 },
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
    id: 'dr-dc',
    type: 'group',
    position: { x: 420, y: 390 },
    data: { label: 'DR Data Center' },
    style: { width: 350, height: 170 },
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

  // Internal City Applications (spans both data centers)
  {
    id: 'internal-city-apps',
    type: 'service',
    position: { x: 305, y: 490 },
    data: { label: 'Internal City Applications', icon: '🏙️', sublabel: 'Shared Services', accent: '#f59e0b' },
    parentId: 'coe-internal-group',
    extent: 'parent' as const,
  },


  // ═══════════════════════════════════════════
  // SAAS PUBLIC CLOUD (group, right side)
  // ═══════════════════════════════════════════
  {
    id: 'saas-cloud-group',
    type: 'group',
    position: { x: 1160, y: 260 },
    data: { label: 'SaaS Public Cloud', sublabel: 'Google Workspace: Endpoint Compliance Required' },
    style: { width: 420, height: 200 },
  },
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

  // ═══════════════════════════════════════════
  // IAAS PUBLIC CLOUD (group, right side)
  // ═══════════════════════════════════════════
  {
    id: 'iaas-cloud-group',
    type: 'group',
    position: { x: 1160, y: 780 },
    data: { label: 'IaaS Public Cloud' },
    style: { width: 420, height: 200 },
  },
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

  // ═══════════════════════════════════════════
  // EQUINIX (connecting element)
  // ═══════════════════════════════════════════
  {
    id: 'equinix',
    type: 'service',
    position: { x: 910, y: 950 },
    data: { label: 'Equinix Express Links', icon: '🔗', sublabel: 'Direct Connect', accent: '#3b82f6' },
  },

  // ═══════════════════════════════════════════
  // PARTNER NETWORKS (group, bottom)
  // ═══════════════════════════════════════════
  {
    id: 'partner-group',
    type: 'group',
    position: { x: 40, y: 1380 },
    data: { label: 'Partner Networks' },
    style: { width: 1300, height: 160 },
  },
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
