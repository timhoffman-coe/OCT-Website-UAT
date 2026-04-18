import type { Node } from '@xyflow/react';

export const landingNodes: Node[] = [
  // ═══════════════════════════════════════════
  // USER GROUPS (left side, yellow dashed)
  // ═══════════════════════════════════════════
  {
    id: 'landing-remote-users',
    type: 'landingZone',
    position: { x: 0, y: 60 },
    data: {
      label: 'CoE Remote Users',
      icon: '👨‍💻',
      variant: 'userGroup',
      clickable: false,
    },
    style: { width: 200, height: 110 },
  },
  {
    id: 'landing-citizens',
    type: 'landingZone',
    position: { x: 0, y: 340 },
    data: {
      label: 'Citizens & Public',
      icon: '🌍',
      variant: 'userGroup',
      clickable: false,
    },
    style: { width: 200, height: 110 },
  },

  // ═══════════════════════════════════════════
  // INTERNET CLOUD (center-left)
  // ═══════════════════════════════════════════
  {
    id: 'landing-internet',
    type: 'landingZone',
    position: { x: 330, y: 170 },
    data: {
      label: 'Internet',
      variant: 'cloud',
      clickable: false,
    },
    style: { width: 180, height: 120 },
  },

  // ═══════════════════════════════════════════
  // SECURITY & ACCESS GATEWAY (tall vertical bar)
  // ═══════════════════════════════════════════
  {
    id: 'landing-security-gateway',
    type: 'landingZone',
    position: { x: 600, y: 20 },
    data: {
      label: 'Security & Access Gateway Layer',
      variant: 'securityBar',
      clickable: true,
    },
    style: { width: 80, height: 460 },
  },

  // ═══════════════════════════════════════════
  // SaaS PUBLIC CLOUD (top right)
  // ═══════════════════════════════════════════
  {
    id: 'landing-saas',
    type: 'landingZone',
    position: { x: 780, y: 20 },
    data: {
      label: 'SaaS Public Cloud',
      sublabel: 'Apps & Services',
      icon: '☁️',
      variant: 'blueZone',
      clickable: true,
    },
    style: { width: 260, height: 120 },
  },

  // ═══════════════════════════════════════════
  // IaaS PUBLIC CLOUD (mid right)
  // ═══════════════════════════════════════════
  {
    id: 'landing-iaas',
    type: 'landingZone',
    position: { x: 780, y: 180 },
    data: {
      label: 'IaaS Public Cloud',
      sublabel: 'Apps & Services',
      icon: '🖥️',
      variant: 'blueZone',
      clickable: true,
    },
    style: { width: 260, height: 120 },
  },

  // ═══════════════════════════════════════════
  // COE INTERNAL ENVIRONMENT (large, bottom center-right)
  // ═══════════════════════════════════════════
  {
    id: 'landing-coe-internal',
    type: 'landingZone',
    position: { x: 780, y: 340 },
    data: {
      label: 'COE Internal Environment',
      sublabel: 'Apps & Services',
      icon: '🏢',
      variant: 'blueZone',
      clickable: true,
    },
    style: { width: 340, height: 160 },
  },

  // ═══════════════════════════════════════════
  // EQUINIX EXPRESS LINKS (right of COE Internal, above Partners)
  // ═══════════════════════════════════════════
  {
    id: 'landing-equinix',
    type: 'landingZone',
    position: { x: 1180, y: 240 },
    data: {
      label: 'Equinix Express Links',
      icon: '🔗',
      variant: 'purpleZone',
      clickable: false,
    },
    style: { width: 200, height: 100 },
  },

  // ═══════════════════════════════════════════
  // PARTNER NETWORKS (far right, pink)
  // ═══════════════════════════════════════════
  {
    id: 'landing-partners',
    type: 'landingZone',
    position: { x: 1180, y: 360 },
    data: {
      label: 'Partner Networks',
      icon: '🤝',
      variant: 'partnerZone',
      clickable: true,
    },
    style: { width: 200, height: 120 },
  },
];
