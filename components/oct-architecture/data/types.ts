export type NodeStatus = 'active' | 'decommissioning' | 'temporary';

export interface ServiceNodeData {
  label: string;
  sublabel?: string;
  status?: NodeStatus;
  badge?: string;
}

export interface GroupNodeData {
  label: string;
  sublabel?: string;
  color?: string;
}

export interface UserGroupNodeData {
  label: string;
}

export interface CloudNodeData {
  label: string;
}

export interface LandingZoneNodeData {
  label: string;
  sublabel?: string;
  icon?: string;
  variant: 'userGroup' | 'cloud' | 'securityBar' | 'blueZone' | 'partnerZone';
  accent?: string;
  clickable?: boolean;
}

export interface GlowEdgeData {
  label?: string;
}
