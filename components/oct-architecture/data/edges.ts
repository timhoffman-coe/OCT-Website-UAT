import type { Edge } from '@xyflow/react';

export const initialEdges: Edge[] = [
  // ═══════════════════════════════════════════
  // USER → INTERNET connections
  // ═══════════════════════════════════════════
  {
    id: 'e-remote-internet',
    source: 'coe-remote-users',
    target: 'internet',
    targetHandle: 'left',
    type: 'glow',
  },
  {
    id: 'e-public-internet',
    source: 'public-edmonton-users',
    target: 'internet',
    targetHandle: 'right-target',
    type: 'glow',
  },

  // ═══════════════════════════════════════════
  // INTERNET → SECURITY GATEWAY
  // ═══════════════════════════════════════════
  {
    id: 'e-internet-cloudflare',
    source: 'internet',
    target: 'cloudflare',
    type: 'glow',
  },
  {
    id: 'e-cloudflare-ws1',
    source: 'cloudflare',
    sourceHandle: 'right',
    target: 'ws1-access',
    targetHandle: 'left',
    type: 'glow',
    data: { label: 'Required Path' },
  },

  // ═══════════════════════════════════════════
  // SECURITY GATEWAY → COE INTERNAL
  // ═══════════════════════════════════════════
  {
    id: 'e-vpn-firewall',
    source: 'ivanti-vpn',
    target: 'edge-firewall',
    type: 'glow',
  },
  {
    id: 'e-ws1-firewall',
    source: 'ws1-access',
    target: 'edge-firewall',
    type: 'glow',
  },

  // ═══════════════════════════════════════════
  // COE INTERNAL flow
  // ═══════════════════════════════════════════
  {
    id: 'e-campus-firewall',
    source: 'campus-network',
    sourceHandle: 'right',
    target: 'internet-access-zone',
    targetHandle: 'left',
    type: 'glow',
  },
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

  // Data Center ↔ Internal City Applications
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

  // ═══════════════════════════════════════════
  // INTERNET → SAAS (temporary direct path)
  // ═══════════════════════════════════════════
  {
    id: 'e-internet-saas',
    source: 'internet',
    sourceHandle: 'right',
    target: 'saas-cloud-group',
    type: 'dashed',
    data: { label: 'Temporary Direct Path (To Be Removed)' },
  },

  // ═══════════════════════════════════════════
  // COE INTERNAL ↔ SAAS (Federated Identity)
  // ═══════════════════════════════════════════
  {
    id: 'e-internal-saas',
    source: 'saas-cloud-group',
    sourceHandle: 'left-source',
    target: 'coe-internal-group',
    targetHandle: 'right-target',
    type: 'glow',
    data: { label: 'Federated Identity / Shared Data' },
  },

  // ═══════════════════════════════════════════
  // COE INTERNAL → IAAS (Equinix Express Links)
  // ═══════════════════════════════════════════
  {
    id: 'e-internal-equinix',
    source: 'coe-internal-group',
    sourceHandle: 'right',
    target: 'equinix',
    targetHandle: 'left',
    type: 'glow',
  },
  {
    id: 'e-equinix-iaas',
    source: 'equinix',
    sourceHandle: 'right',
    target: 'iaas-cloud-group',
    targetHandle: 'left',
    type: 'glow',
    data: { label: 'Equinix Express Links' },
  },

  // ═══════════════════════════════════════════
  // COE INTERNAL → PARTNER NETWORKS
  // ═══════════════════════════════════════════
  {
    id: 'e-internal-partner',
    source: 'coe-internal-group',
    target: 'partner-group',
    type: 'glow',
  },
];
