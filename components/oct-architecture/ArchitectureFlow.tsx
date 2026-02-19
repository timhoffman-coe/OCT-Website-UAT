'use client';

import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { initialNodes } from './data/nodes';
import { initialEdges } from './data/edges';
import { GroupNode } from './nodes/GroupNode';
import { ServiceNode } from './nodes/ServiceNode';
import { DecommissionNode } from './nodes/DecommissionNode';
import { UserGroupNode } from './nodes/UserGroupNode';
import { CloudNode } from './nodes/CloudNode';
import { GlowEdge } from './edges/GlowEdge';
import { DashedEdge } from './edges/DashedEdge';

const nodeTypes = {
  group: GroupNode,
  service: ServiceNode,
  decommission: DecommissionNode,
  userGroup: UserGroupNode,
  cloud: CloudNode,
};

const edgeTypes = {
  glow: GlowEdge,
  dashed: DashedEdge,
};

export default function ArchitectureFlow() {
  return (
    <ReactFlow
      nodes={initialNodes}
      edges={initialEdges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
      fitView
      fitViewOptions={{ padding: 0.12 }}
      minZoom={0.3}
      maxZoom={2}
      defaultEdgeOptions={{
        type: 'glow',
      }}
      proOptions={{ hideAttribution: true }}
    >
      <Background
        variant={BackgroundVariant.Dots}
        gap={24}
        size={1}
        color="#1e293b"
      />
      <Controls
        showInteractive={false}
        className="!bg-gray-900/90 !border-cyan-900/50 !rounded-lg !shadow-lg [&>button]:!bg-gray-800 [&>button]:!border-cyan-900/30 [&>button]:!fill-cyan-400 [&>button:hover]:!bg-gray-700"
      />
      <MiniMap
        className="!bg-gray-900/90 !border-cyan-900/50 !rounded-lg"
        nodeColor="#0e7490"
        maskColor="rgba(0, 0, 0, 0.7)"
        pannable
        zoomable
      />
    </ReactFlow>
  );
}
