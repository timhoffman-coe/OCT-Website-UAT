import type { Edge } from '@xyflow/react';

export const landingEdges: Edge[] = [
  // ═══════════════════════════════════════════
  // USER GROUPS → INTERNET
  // ═══════════════════════════════════════════
  {
    id: 'le-remote-internet',
    source: 'landing-remote-users',
    sourceHandle: 'right',
    target: 'landing-internet',
    targetHandle: 'left',
    type: 'glow',
  },
  {
    id: 'le-citizens-internet',
    source: 'landing-citizens',
    sourceHandle: 'right',
    target: 'landing-internet',
    targetHandle: 'left',
    type: 'glow',
  },

  // ═══════════════════════════════════════════
  // INTERNET → SECURITY GATEWAY
  // ═══════════════════════════════════════════
  {
    id: 'le-internet-security',
    source: 'landing-internet',
    sourceHandle: 'right',
    target: 'landing-security-gateway',
    targetHandle: 'left',
    type: 'glow',
  },

  // ═══════════════════════════════════════════
  // SECURITY GATEWAY → ZONES
  // ═══════════════════════════════════════════
  {
    id: 'le-security-saas',
    source: 'landing-security-gateway',
    sourceHandle: 'right-top',
    target: 'landing-saas',
    targetHandle: 'left',
    type: 'glow',
  },
  {
    id: 'le-security-iaas',
    source: 'landing-security-gateway',
    sourceHandle: 'right-mid',
    target: 'landing-iaas',
    targetHandle: 'left',
    type: 'glow',
  },
  {
    id: 'le-security-internal',
    source: 'landing-security-gateway',
    sourceHandle: 'right-bot',
    target: 'landing-coe-internal',
    targetHandle: 'left',
    type: 'glow',
  },

  // ═══════════════════════════════════════════
  // COE INTERNAL → EQUINIX EXPRESS LINKS
  // ═══════════════════════════════════════════
  {
    id: 'le-internal-equinix',
    source: 'landing-coe-internal',
    sourceHandle: 'right',
    target: 'landing-equinix',
    targetHandle: 'left',
    type: 'glow',
    data: { color: '139, 92, 246', flowColor: 'rgba(167, 139, 250, 0.9)' },
  },

  // ═══════════════════════════════════════════
  // EQUINIX → SAAS & IAAS
  // ═══════════════════════════════════════════
  {
    id: 'le-equinix-saas',
    source: 'landing-equinix',
    sourceHandle: 'left-source',
    target: 'landing-saas',
    targetHandle: 'right-target',
    type: 'glow',
    data: { color: '139, 92, 246', flowColor: 'rgba(167, 139, 250, 0.9)' },
  },
  {
    id: 'le-equinix-iaas',
    source: 'landing-equinix',
    sourceHandle: 'left-source',
    target: 'landing-iaas',
    targetHandle: 'right-target',
    type: 'glow',
    data: { color: '139, 92, 246', flowColor: 'rgba(167, 139, 250, 0.9)' },
  },

  // ═══════════════════════════════════════════
  // COE INTERNAL → PARTNER NETWORKS (dashed)
  // ═══════════════════════════════════════════
  {
    id: 'le-internal-partners',
    source: 'landing-coe-internal',
    sourceHandle: 'right',
    target: 'landing-partners',
    targetHandle: 'left',
    type: 'dashed',
  },
];
