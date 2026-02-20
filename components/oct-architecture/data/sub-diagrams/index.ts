import type { Node, Edge } from '@xyflow/react';
import { campusNetworkNodes, campusNetworkEdges } from './campus-network';
import { securityGatewayNodes, securityGatewayEdges } from './security-gateway';
import { saasCloudNodes, saasCloudEdges } from './saas-cloud';
import { iaasCloudNodes, iaasCloudEdges } from './iaas-cloud';
import { coeInternalNodes, coeInternalEdges } from './coe-internal';
import { partnerNetworksNodes, partnerNetworksEdges } from './partner-networks';

export interface SubDiagram {
  nodes: Node[];
  edges: Edge[];
  label: string;
}

/** Map of node IDs that have drill-down sub-diagrams */
export const subDiagrams: Record<string, SubDiagram> = {
  // Landing page zone drill-downs
  'landing-security-gateway': {
    nodes: securityGatewayNodes,
    edges: securityGatewayEdges,
    label: 'Security & Access Gateway Layer',
  },
  'landing-saas': {
    nodes: saasCloudNodes,
    edges: saasCloudEdges,
    label: 'SaaS Public Cloud',
  },
  'landing-iaas': {
    nodes: iaasCloudNodes,
    edges: iaasCloudEdges,
    label: 'IaaS Public Cloud',
  },
  'landing-coe-internal': {
    nodes: coeInternalNodes,
    edges: coeInternalEdges,
    label: 'COE Internal Environment',
  },
  'landing-partners': {
    nodes: partnerNetworksNodes,
    edges: partnerNetworksEdges,
    label: 'Partner Networks',
  },

  // Existing sub-diagram (drill-down from COE Internal Environment)
  'campus-network': {
    nodes: campusNetworkNodes,
    edges: campusNetworkEdges,
    label: 'Campus Network',
  },
};
