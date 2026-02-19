import type { Node, Edge } from '@xyflow/react';
import { campusNetworkNodes, campusNetworkEdges } from './campus-network';

export interface SubDiagram {
  nodes: Node[];
  edges: Edge[];
  label: string;
}

/** Map of node IDs that have drill-down sub-diagrams */
export const subDiagrams: Record<string, SubDiagram> = {
  'campus-network': {
    nodes: campusNetworkNodes,
    edges: campusNetworkEdges,
    label: 'Campus Network',
  },
};
