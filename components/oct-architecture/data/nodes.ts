import type { Node } from '@xyflow/react';

export const initialNodes: Node[] = [
  // ═══════════════════════════════════════════
  // USER GROUPS (top)
  // ═══════════════════════════════════════════
  {
    id: 'coe-remote-users',
    type: 'userGroup',
    position: { x: 180, y: 0 },
    data: { label: 'COE Remote Users' },
  },
  {
    id: 'public-edmonton-users',
    type: 'userGroup',
    position: { x: 550, y: 0 },
    data: { label: 'Public Edmonton Users' },
  },

  // ═══════════════════════════════════════════
  // INTERNET CLOUD
  // ═══════════════════════════════════════════
  {
    id: 'internet',
    type: 'cloud',
    position: { x: 380, y: 110 },
    data: { label: 'Internet' },
  },

  // ═══════════════════════════════════════════
  // SECURITY & ACCESS GATEWAY LAYER (group)
  // ═══════════════════════════════════════════
  {
    id: 'security-gateway-group',
    type: 'group',
    position: { x: 60, y: 230 },
    data: { label: 'Security & Access Gateway Layer' },
    style: { width: 620, height: 130 },
  },
  {
    id: 'ivanti-vpn',
    type: 'service',
    position: { x: 20, y: 45 },
    data: { label: 'Ivanti VPN' },
    parentId: 'security-gateway-group',
    extent: 'parent' as const,
  },
  {
    id: 'cloudflare',
    type: 'service',
    position: { x: 200, y: 45 },
    data: { label: 'Cloudflare' },
    parentId: 'security-gateway-group',
    extent: 'parent' as const,
  },
  {
    id: 'ws1-access',
    type: 'service',
    position: { x: 380, y: 45 },
    data: {
      label: 'Workspace One Access',
      sublabel: 'Required Path: Cloudflare in-front of WS1',
    },
    parentId: 'security-gateway-group',
    extent: 'parent' as const,
  },

  // ═══════════════════════════════════════════
  // COE INTERNAL ENVIRONMENT (group)
  // ═══════════════════════════════════════════
  {
    id: 'coe-internal-group',
    type: 'group',
    position: { x: 60, y: 410 },
    data: { label: 'COE Internal Environment' },
    style: { width: 620, height: 420 },
  },

  // Security appliances row
  {
    id: 'edge-firewall',
    type: 'service',
    position: { x: 20, y: 50 },
    data: { label: 'Edge Firewall Cluster' },
    parentId: 'coe-internal-group',
    extent: 'parent' as const,
  },
  {
    id: 'trellix-nx',
    type: 'service',
    position: { x: 200, y: 50 },
    data: { label: 'Trellix (FireEye) NX' },
    parentId: 'coe-internal-group',
    extent: 'parent' as const,
  },
  {
    id: 'f5-adcs',
    type: 'service',
    position: { x: 400, y: 50 },
    data: { label: 'F5 ADCs' },
    parentId: 'coe-internal-group',
    extent: 'parent' as const,
  },

  // Decommissioning items
  {
    id: 'lenovo-portal',
    type: 'decommission',
    position: { x: 380, y: 130 },
    data: { label: 'Lenovo Portal', badge: 'Decommissioning' },
    parentId: 'coe-internal-group',
    extent: 'parent' as const,
  },
  {
    id: 'citrix-gateway',
    type: 'decommission',
    position: { x: 380, y: 200 },
    data: { label: 'Citrix Gateway', badge: 'Decommissioning' },
    parentId: 'coe-internal-group',
    extent: 'parent' as const,
  },

  // Campus Network
  {
    id: 'campus-network',
    type: 'userGroup',
    position: { x: 20, y: 145 },
    data: { label: 'Campus Network' },
    parentId: 'coe-internal-group',
    extent: 'parent' as const,
  },

  // Data Centers
  {
    id: 'primary-dc',
    type: 'service',
    position: { x: 30, y: 280 },
    data: { label: 'Primary Data Center', sublabel: 'Internal City Applications' },
    parentId: 'coe-internal-group',
    extent: 'parent' as const,
  },
  {
    id: 'dr-dc',
    type: 'service',
    position: { x: 280, y: 280 },
    data: { label: 'DR Data Center', sublabel: 'Internal City Applications' },
    parentId: 'coe-internal-group',
    extent: 'parent' as const,
  },

  // ═══════════════════════════════════════════
  // SAAS PUBLIC CLOUD (group, right side)
  // ═══════════════════════════════════════════
  {
    id: 'saas-cloud-group',
    type: 'group',
    position: { x: 770, y: 230 },
    data: { label: 'SaaS Public Cloud', sublabel: 'Google Workspace: Endpoint Compliance Required' },
    style: { width: 340, height: 280 },
  },
  {
    id: 'saas-city-apps',
    type: 'service',
    position: { x: 20, y: 60 },
    data: { label: 'SaaS Cloud\nCity Applications' },
    parentId: 'saas-cloud-group',
    extent: 'parent' as const,
  },
  {
    id: 'saas-non-city-apps',
    type: 'service',
    position: { x: 185, y: 60 },
    data: { label: 'SaaS Cloud\nNon-City Applications' },
    parentId: 'saas-cloud-group',
    extent: 'parent' as const,
  },

  // ═══════════════════════════════════════════
  // IAAS PUBLIC CLOUD (group, right side)
  // ═══════════════════════════════════════════
  {
    id: 'iaas-cloud-group',
    type: 'group',
    position: { x: 770, y: 580 },
    data: { label: 'IaaS Public Cloud' },
    style: { width: 340, height: 210 },
  },
  {
    id: 'iaas-city-apps',
    type: 'service',
    position: { x: 20, y: 55 },
    data: { label: 'IaaS Cloud Apps\nCity Applications' },
    parentId: 'iaas-cloud-group',
    extent: 'parent' as const,
  },
  {
    id: 'paas-city-apps',
    type: 'service',
    position: { x: 185, y: 55 },
    data: { label: 'PaaS Cloud Apps\nCity Applications' },
    parentId: 'iaas-cloud-group',
    extent: 'parent' as const,
  },

  // ═══════════════════════════════════════════
  // EQUINIX (connecting element)
  // ═══════════════════════════════════════════
  {
    id: 'equinix',
    type: 'service',
    position: { x: 720, y: 690 },
    data: { label: 'Equinix\nExpress Links' },
  },

  // ═══════════════════════════════════════════
  // PARTNER NETWORKS (group, bottom)
  // ═══════════════════════════════════════════
  {
    id: 'partner-group',
    type: 'group',
    position: { x: 60, y: 890 },
    data: { label: 'Partner Networks' },
    style: { width: 1050, height: 130 },
  },
  {
    id: 'b2b-firewall',
    type: 'service',
    position: { x: 20, y: 50 },
    data: {
      label: 'Future B2B Firewall Cluster',
      sublabel: 'ACL Controlled',
    },
    parentId: 'partner-group',
    extent: 'parent' as const,
  },
  {
    id: 'ahs',
    type: 'service',
    position: { x: 310, y: 50 },
    data: { label: 'Alberta Health Services' },
    parentId: 'partner-group',
    extent: 'parent' as const,
  },
  {
    id: 'eps',
    type: 'service',
    position: { x: 540, y: 50 },
    data: { label: 'Edmonton Police Service' },
    parentId: 'partner-group',
    extent: 'parent' as const,
  },
  {
    id: 'epcor',
    type: 'service',
    position: { x: 770, y: 50 },
    data: { label: 'EPCOR' },
    parentId: 'partner-group',
    extent: 'parent' as const,
  },

  // ═══════════════════════════════════════════
  // ANNOTATION LABELS (floating labels for connections)
  // ═══════════════════════════════════════════
  {
    id: 'label-temp-path',
    type: 'service',
    position: { x: 780, y: 140 },
    data: {
      label: 'Temporary Direct Path',
      sublabel: 'To Be Removed',
    },
    style: {
      background: 'transparent',
      border: 'none',
      boxShadow: 'none',
    },
  },
  {
    id: 'label-federated',
    type: 'service',
    position: { x: 710, y: 440 },
    data: {
      label: 'Federated Identity /',
      sublabel: 'Shared Data',
    },
    style: {
      background: 'transparent',
      border: 'none',
      boxShadow: 'none',
    },
  },
];
