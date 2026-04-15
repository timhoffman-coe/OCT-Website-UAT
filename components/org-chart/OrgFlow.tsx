'use client';

import { useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
  type Node,
  type Edge,
  type NodeProps,
} from '@xyflow/react';
import { User } from 'lucide-react';
import '@xyflow/react/dist/style.css';
import type { OrgChartData, OrgPerson } from '@/app/org-chart/types';

const NODE_WIDTH = 200;
const NODE_HEIGHT = 180;
const H_GAP = 40;
const V_GAP = 80;

type PersonNodeData = {
  name: string;
  title?: string;
  isRoot: boolean;
};

function PersonNode({ data }: NodeProps<Node<PersonNodeData>>) {
  return (
    <div
      className={`bg-white border-2 rounded-lg shadow-md w-[200px] h-[180px] flex flex-col p-3 ${
        data.isRoot ? 'border-[#005087]' : 'border-gray-200'
      }`}
    >
      <Handle type="target" position={Position.Top} className="!bg-gray-400" />
      <div className="flex justify-center mb-2">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center ${
            data.isRoot ? 'bg-[#005087]' : 'bg-gray-300'
          }`}
        >
          <User className={`w-6 h-6 ${data.isRoot ? 'text-white' : 'text-gray-600'}`} />
        </div>
      </div>
      <h3
        className={`text-center font-semibold mb-1 ${
          data.isRoot ? 'text-base text-[#005087]' : 'text-sm text-gray-900'
        }`}
      >
        {data.name}
      </h3>
      {data.title && (
        <p className="text-center text-xs leading-snug line-clamp-2 text-gray-600">{data.title}</p>
      )}
      <Handle type="source" position={Position.Bottom} className="!bg-gray-400" />
    </div>
  );
}

const nodeTypes = { person: PersonNode };

interface LayoutResult {
  nodes: Node<PersonNodeData>[];
  edges: Edge[];
  width: number;
  height: number;
}

function layoutTree(root: OrgPerson): LayoutResult {
  const nodes: Node<PersonNodeData>[] = [];
  const edges: Edge[] = [];

  // Recursively compute the rendered width of each subtree (px).
  const subtreeWidth = new Map<string, number>();
  const computeWidth = (p: OrgPerson): number => {
    const children = p.subordinates ?? [];
    if (children.length === 0) {
      subtreeWidth.set(p.id, NODE_WIDTH);
      return NODE_WIDTH;
    }
    const total =
      children.reduce((sum, c) => sum + computeWidth(c), 0) + H_GAP * (children.length - 1);
    const w = Math.max(NODE_WIDTH, total);
    subtreeWidth.set(p.id, w);
    return w;
  };
  computeWidth(root);

  let maxDepth = 0;
  const place = (p: OrgPerson, leftX: number, depth: number) => {
    maxDepth = Math.max(maxDepth, depth);
    const myWidth = subtreeWidth.get(p.id)!;
    const centerX = leftX + myWidth / 2;
    const x = centerX - NODE_WIDTH / 2;
    const y = depth * (NODE_HEIGHT + V_GAP);

    nodes.push({
      id: p.id,
      type: 'person',
      position: { x, y },
      data: { name: p.name, title: p.title, isRoot: depth === 0 },
      draggable: false,
    });

    let cursor = leftX;
    for (const child of p.subordinates ?? []) {
      const cw = subtreeWidth.get(child.id)!;
      place(child, cursor, depth + 1);
      edges.push({
        id: `${p.id}->${child.id}`,
        source: p.id,
        target: child.id,
        type: 'smoothstep',
        style: { stroke: '#94a3b8', strokeWidth: 1.5 },
      });
      cursor += cw + H_GAP;
    }
  };
  place(root, 0, 0);

  return {
    nodes,
    edges,
    width: subtreeWidth.get(root.id)!,
    height: (maxDepth + 1) * NODE_HEIGHT + maxDepth * V_GAP,
  };
}

export default function OrgFlow({ data }: { data: OrgChartData }) {
  const { nodes, edges } = useMemo(() => layoutTree(data.root), [data]);

  return (
    <div className="w-full h-[80vh] bg-gray-50 rounded-lg border border-gray-200">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.1}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#e5e7eb" gap={20} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
