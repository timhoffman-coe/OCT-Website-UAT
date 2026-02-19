'use client';

import { useState, useCallback, useRef } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  Panel,
  BackgroundVariant,
  useReactFlow,
  type Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './edges/edges.css';

import { initialNodes } from './data/nodes';
import { initialEdges } from './data/edges';
import { subDiagrams } from './data/sub-diagrams';
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

/** Compute absolute position for a node (handles nested parents) */
function getAbsolutePosition(nodeId: string, nodes: Node[]): { x: number; y: number } {
  const node = nodes.find((n) => n.id === nodeId);
  if (!node) return { x: 0, y: 0 };

  let x = node.position.x;
  let y = node.position.y;

  if (node.parentId) {
    const parentPos = getAbsolutePosition(node.parentId, nodes);
    x += parentPos.x;
    y += parentPos.y;
  }

  return { x, y };
}

function ArchitectureFlowInner() {
  const { setCenter, fitView } = useReactFlow();

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [navStack, setNavStack] = useState<{ id: string; label: string }[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionRef = useRef(false);

  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      if (transitionRef.current) return;

      const sub = subDiagrams[node.id];
      if (!sub) return;

      transitionRef.current = true;

      // Get absolute position of the clicked node
      const absPos = getAbsolutePosition(node.id, nodes);

      // Step 1: Zoom into the clicked node
      setCenter(absPos.x + 90, absPos.y + 50, { zoom: 3, duration: 600 });

      // Step 2: Fade out near end of zoom
      setTimeout(() => setIsTransitioning(true), 450);

      // Step 3: Swap data after zoom + fade
      setTimeout(() => {
        setNodes(sub.nodes);
        setEdges(sub.edges);
        setNavStack((prev) => [...prev, { id: node.id, label: sub.label }]);

        // Step 4: Fade back in + fitView
        setTimeout(() => {
          setIsTransitioning(false);
          fitView({ duration: 600, padding: 0.15 });
          transitionRef.current = false;
        }, 50);
      }, 650);
    },
    [nodes, setCenter, fitView],
  );

  const handleBack = useCallback(() => {
    if (transitionRef.current || navStack.length === 0) return;
    transitionRef.current = true;

    // Fade out
    setIsTransitioning(true);

    // Swap back after fade
    setTimeout(() => {
      setNodes(initialNodes);
      setEdges(initialEdges);
      setNavStack([]);

      // Fade in + fitView
      setTimeout(() => {
        setIsTransitioning(false);
        fitView({ duration: 600, padding: 0.12 });
        transitionRef.current = false;
      }, 50);
    }, 250);
  }, [navStack, fitView]);

  return (
    <div className="relative w-full h-full">
      <div
        className="w-full h-full"
        style={{
          opacity: isTransitioning ? 0 : 1,
          transition: 'opacity 200ms ease-in-out',
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodeClick={handleNodeClick}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          fitView
          fitViewOptions={{ padding: 0.12 }}
          minZoom={0.3}
          maxZoom={4}
          defaultEdgeOptions={{ type: 'glow' }}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#1e293b" />
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

          {/* Breadcrumb navigation */}
          {navStack.length > 0 && (
            <Panel position="top-left">
              <div className="flex items-center gap-2 bg-gray-900/95 border border-cyan-900/50 rounded-lg px-4 py-2 shadow-lg backdrop-blur-sm">
                <button
                  onClick={handleBack}
                  className="text-cyan-400 hover:text-cyan-300 text-sm font-sans font-medium transition-colors cursor-pointer"
                >
                  Main
                </button>
                {navStack.map((item) => (
                  <span key={item.id} className="flex items-center gap-2">
                    <span className="text-gray-600 text-xs">/</span>
                    <span className="text-white text-sm font-sans font-medium">{item.label}</span>
                  </span>
                ))}
              </div>
            </Panel>
          )}
        </ReactFlow>
      </div>
    </div>
  );
}

export default function ArchitectureFlow() {
  return (
    <ReactFlowProvider>
      <ArchitectureFlowInner />
    </ReactFlowProvider>
  );
}
