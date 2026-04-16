'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Controls,
  Handle,
  Position,
  useReactFlow,
  type Node,
  type Edge,
  type NodeProps,
  type NodeMouseHandler,
} from '@xyflow/react';
import { User, ChevronDown, ChevronRight, Search } from 'lucide-react';
import '@xyflow/react/dist/style.css';
import type { OrgChartData, OrgPerson } from '@/app/org-chart/types';

const NODE_WIDTH = 200;
const NODE_HEIGHT = 180;
const H_GAP = 40;
const V_GAP = 80;
// More than this many visible reports → switch from horizontal row to a
// hanging (vertical-stack) layout, which keeps connector lines from crossing cards.
const HANGING_THRESHOLD = 4;
const HANG_OFFSET = 30;
const HANG_INDENT = 60;
const HANG_V_GAP = 30;

const HIDDEN_HANDLE_STYLE: CSSProperties = {
  background: 'transparent',
  border: 'none',
  width: 1,
  height: 1,
  opacity: 0,
  pointerEvents: 'none',
};

// Edmonton palette
const C = {
  blue: '#005087',
  blueShade1: '#00476F',
  blueTint10: '#E6F0F7',
  navy: '#193A5A',
  navyTint10: '#E8EBF0',
  navyTint30: '#B8C2CF',
  navyTint50: '#8C9DAD',
  processBlue: '#0081BC',
  processBlueTint70: '#339ECD',
  gray100: '#E2E6EA',
  gray800: '#2A3844',
  warning: '#F5A623',
};

type PersonNodeData = {
  name: string;
  title?: string;
  isRoot: boolean;
  hasChildren: boolean;
  isExpanded: boolean;
  reportCount: number;
  isMatch: boolean;
};

function PersonNode({ data }: NodeProps<Node<PersonNodeData>>) {
  const { isRoot, hasChildren, isExpanded, reportCount, isMatch } = data;

  const cardStyle = isRoot
    ? { background: C.blue, borderColor: C.blueShade1, color: '#fff' }
    : { background: '#fff', borderColor: C.blue, color: C.navy };

  const avatarStyle = isRoot
    ? { background: C.blueShade1 }
    : { background: C.processBlue };

  return (
    <div
      className={`border-2 rounded-lg shadow-md w-[200px] h-[180px] flex flex-col overflow-hidden ${
        isMatch ? 'ring-2 ring-offset-2' : ''
      } ${hasChildren ? 'cursor-pointer' : 'cursor-default'}`}
      style={{ ...cardStyle, ...(isMatch ? { boxShadow: `0 0 0 3px ${C.warning}` } : {}) }}
    >
      <Handle type="target" id="top" position={Position.Top} className="!bg-gray-400" />
      <Handle type="target" id="hang-in" position={Position.Left} style={HIDDEN_HANDLE_STYLE} />
      <div className="p-3 flex-1 flex flex-col">
        <div className="flex justify-center mb-2">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={avatarStyle}
          >
            <User className="w-6 h-6" style={{ color: '#fff' }} />
          </div>
        </div>
        <h3
          className={`text-center font-semibold mb-1 ${isRoot ? 'text-base' : 'text-sm'}`}
          style={{ color: isRoot ? '#fff' : C.navy }}
        >
          {data.name}
        </h3>
        {data.title && (
          <p
            className="text-center text-xs leading-snug line-clamp-2"
            style={{ color: isRoot ? 'rgba(255,255,255,0.85)' : '#5C6B78' }}
          >
            {data.title}
          </p>
        )}
      </div>
      {hasChildren && (
        <div
          className="border-t py-1.5 px-3 flex items-center justify-center gap-1.5"
          style={{
            background: isRoot ? 'rgba(255,255,255,0.12)' : C.blueTint10,
            borderColor: isRoot ? 'rgba(255,255,255,0.2)' : C.blueTint10,
          }}
        >
          {isExpanded ? (
            <ChevronDown className="w-3.5 h-3.5" style={{ color: isRoot ? '#fff' : C.blue }} />
          ) : (
            <ChevronRight className="w-3.5 h-3.5" style={{ color: isRoot ? '#fff' : C.blue }} />
          )}
          <span
            className="text-xs font-medium"
            style={{ color: isRoot ? '#fff' : C.blue }}
          >
            {reportCount} {reportCount === 1 ? 'report' : 'reports'}
          </span>
        </div>
      )}
      <Handle type="source" id="bottom" position={Position.Bottom} className="!bg-gray-400" />
      <Handle
        type="source"
        id="hang-out"
        position={Position.Bottom}
        style={{ ...HIDDEN_HANDLE_STYLE, left: HANG_OFFSET }}
      />
    </div>
  );
}

const nodeTypes = { person: PersonNode };

interface LayoutResult {
  nodes: Node<PersonNodeData>[];
  edges: Edge[];
  positions: Map<string, { x: number; y: number }>;
}

function layoutTree(
  root: OrgPerson,
  expanded: Set<string>,
  totalCounts: Map<string, number>,
  matchIds: Set<string>,
): LayoutResult {
  const nodes: Node<PersonNodeData>[] = [];
  const edges: Edge[] = [];
  const positions = new Map<string, { x: number; y: number }>();

  const visibleChildren = (p: OrgPerson): OrgPerson[] =>
    expanded.has(p.id) ? p.subordinates ?? [] : [];

  // Bounding box of each subtree.
  const boxW = new Map<string, number>();
  const boxH = new Map<string, number>();
  // Whether each node renders its children as a hanging stack (vs. a horizontal row).
  // A node hangs if it has too many reports for one row, OR its parent already hangs —
  // once we start hanging, descendants keep hanging so the trunk stays clean.
  const hangMode = new Map<string, boolean>();

  const computeBox = (p: OrgPerson, inheritedHanging: boolean) => {
    const kids = visibleChildren(p);
    if (kids.length === 0) {
      boxW.set(p.id, NODE_WIDTH);
      boxH.set(p.id, NODE_HEIGHT);
      hangMode.set(p.id, inheritedHanging);
      return;
    }

    const useHanging = inheritedHanging || kids.length > HANGING_THRESHOLD;
    hangMode.set(p.id, useHanging);

    for (const c of kids) computeBox(c, useHanging);

    if (useHanging) {
      const maxChildW = Math.max(...kids.map((c) => boxW.get(c.id)!));
      const sumChildH =
        kids.reduce((s, c) => s + boxH.get(c.id)!, 0) + HANG_V_GAP * (kids.length - 1);
      boxW.set(p.id, Math.max(NODE_WIDTH, HANG_INDENT + maxChildW));
      boxH.set(p.id, NODE_HEIGHT + V_GAP + sumChildH);
      return;
    }

    // Horizontal: single row of up to HANGING_THRESHOLD siblings.
    const rowWidth =
      kids.reduce((s, c) => s + boxW.get(c.id)!, 0) + H_GAP * (kids.length - 1);
    const rowHeight = Math.max(...kids.map((c) => boxH.get(c.id)!));
    boxW.set(p.id, Math.max(NODE_WIDTH, rowWidth));
    boxH.set(p.id, NODE_HEIGHT + V_GAP + rowHeight);
  };
  computeBox(root, false);

  // Place each node: (leftX, topY) is the top-left of the subtree's bounding box.
  // In horizontal mode the card is centered within its box; in hanging mode it sits at
  // the box's top-left so the trunk on the left lines up across nested levels.
  const place = (p: OrgPerson, leftX: number, topY: number) => {
    const myBoxW = boxW.get(p.id)!;
    const useHanging = hangMode.get(p.id)!;
    const kids = visibleChildren(p);

    const x = useHanging ? leftX : leftX + myBoxW / 2 - NODE_WIDTH / 2;
    const y = topY;
    positions.set(p.id, { x, y });

    const rawChildren = p.subordinates ?? [];
    nodes.push({
      id: p.id,
      type: 'person',
      position: { x, y },
      data: {
        name: p.name,
        title: p.title,
        isRoot: p.id === root.id,
        hasChildren: rawChildren.length > 0,
        isExpanded: expanded.has(p.id),
        reportCount: totalCounts.get(p.id) ?? 0,
        isMatch: matchIds.has(p.id),
      },
      draggable: false,
      selectable: false,
    });

    if (kids.length === 0) return;

    if (useHanging) {
      let cursorY = topY + NODE_HEIGHT + V_GAP;
      for (const child of kids) {
        place(child, leftX + HANG_INDENT, cursorY);
        edges.push({
          id: `${p.id}->${child.id}`,
          source: p.id,
          target: child.id,
          sourceHandle: 'hang-out',
          targetHandle: 'hang-in',
          type: 'smoothstep',
          style: { stroke: C.processBlueTint70, strokeWidth: 2 },
        });
        cursorY += boxH.get(child.id)! + HANG_V_GAP;
      }
      return;
    }

    // Horizontal: single row.
    const rowWidth =
      kids.reduce((s, c) => s + boxW.get(c.id)!, 0) + H_GAP * (kids.length - 1);
    const rowTopY = topY + NODE_HEIGHT + V_GAP;
    let cursor = leftX + myBoxW / 2 - rowWidth / 2;
    for (const child of kids) {
      const cw = boxW.get(child.id)!;
      place(child, cursor, rowTopY);
      edges.push({
        id: `${p.id}->${child.id}`,
        source: p.id,
        target: child.id,
        sourceHandle: 'bottom',
        targetHandle: 'top',
        type: 'smoothstep',
        style: { stroke: C.processBlueTint70, strokeWidth: 2 },
      });
      cursor += cw + H_GAP;
    }
  };
  place(root, 0, 0);

  return { nodes, edges, positions };
}

function buildParentMap(root: OrgPerson): Map<string, string> {
  const map = new Map<string, string>();
  const walk = (p: OrgPerson) => {
    for (const c of p.subordinates ?? []) {
      map.set(c.id, p.id);
      walk(c);
    }
  };
  walk(root);
  return map;
}

function collectManagerIds(root: OrgPerson): Set<string> {
  const ids = new Set<string>();
  const walk = (p: OrgPerson) => {
    if ((p.subordinates?.length ?? 0) > 0) {
      ids.add(p.id);
      for (const c of p.subordinates!) walk(c);
    }
  };
  walk(root);
  return ids;
}

function computeTotalCounts(root: OrgPerson): Map<string, number> {
  const counts = new Map<string, number>();
  const walk = (p: OrgPerson): number => {
    let total = 0;
    for (const c of p.subordinates ?? []) {
      total += 1 + walk(c);
    }
    counts.set(p.id, total);
    return total;
  };
  walk(root);
  return counts;
}

function findNodeById(root: OrgPerson, id: string): OrgPerson | null {
  if (root.id === id) return root;
  for (const c of root.subordinates ?? []) {
    const hit = findNodeById(c, id);
    if (hit) return hit;
  }
  return null;
}

function descendantIds(node: OrgPerson): string[] {
  const out: string[] = [];
  const walk = (p: OrgPerson) => {
    for (const c of p.subordinates ?? []) {
      if ((c.subordinates?.length ?? 0) > 0) {
        out.push(c.id);
        walk(c);
      }
    }
  };
  if ((node.subordinates?.length ?? 0) > 0) {
    out.push(node.id);
    walk(node);
  }
  return out;
}

// Remove `id` and every descendant manager id beneath it from the set.
function collapseSubtree(set: Set<string>, node: OrgPerson) {
  set.delete(node.id);
  for (const c of node.subordinates ?? []) collapseSubtree(set, c);
}

function OrgFlowInner({ data }: { data: OrgChartData }) {
  const { root } = data;
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set([root.id]));
  const [rawQuery, setRawQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const reactFlow = useReactFlow();

  // Debounce search input.
  useEffect(() => {
    const t = setTimeout(() => setSearchQuery(rawQuery.trim()), 200);
    return () => clearTimeout(t);
  }, [rawQuery]);

  const parentMap = useMemo(() => buildParentMap(root), [root]);
  const allManagerIds = useMemo(() => collectManagerIds(root), [root]);
  const totalCounts = useMemo(() => computeTotalCounts(root), [root]);

  const matchIds = useMemo(() => {
    if (!searchQuery) return new Set<string>();
    const q = searchQuery.toLowerCase();
    const hits = new Set<string>();
    const walk = (p: OrgPerson) => {
      if (p.name.toLowerCase().includes(q)) hits.add(p.id);
      for (const c of p.subordinates ?? []) walk(c);
    };
    walk(root);
    return hits;
  }, [root, searchQuery]);

  // Derive the set of ancestor ids that must be forced open by the current search,
  // without mutating the user's manual `expanded` state inside an effect.
  const searchExpanded = useMemo(() => {
    if (matchIds.size === 0) return new Set<string>();
    const ancestors = new Set<string>();
    for (const id of matchIds) {
      let cursor = parentMap.get(id);
      while (cursor) {
        ancestors.add(cursor);
        cursor = parentMap.get(cursor);
      }
    }
    return ancestors;
  }, [matchIds, parentMap]);

  const effectiveExpanded = useMemo(() => {
    if (searchExpanded.size === 0) return expanded;
    const merged = new Set(expanded);
    for (const id of searchExpanded) merged.add(id);
    return merged;
  }, [expanded, searchExpanded]);

  const { nodes, edges, positions } = useMemo(
    () => layoutTree(root, effectiveExpanded, totalCounts, matchIds),
    [root, effectiveExpanded, totalCounts, matchIds],
  );

  // Fit or pan after the visible set changes.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (matchIds.size > 0) {
      const firstId = [...matchIds][0];
      const pos = positions.get(firstId);
      if (pos) {
        reactFlow.setCenter(pos.x + NODE_WIDTH / 2, pos.y + NODE_HEIGHT / 2, {
          zoom: 1,
          duration: 400,
        });
        return;
      }
    }
    reactFlow.fitView({ padding: 0.2, duration: 400 });
  }, [nodes.length, matchIds, positions, reactFlow]);

  const onNodeClick = useCallback<NodeMouseHandler>(
    (_, node) => {
      const d = node.data as PersonNodeData;
      if (!d.hasChildren) return;
      const target = findNodeById(root, node.id);
      if (!target) return;
      setExpanded((prev) => {
        const next = new Set(prev);
        if (next.has(node.id)) {
          // Collapsing — drop this node and every descendant manager.
          collapseSubtree(next, target);
        } else {
          // Expanding — accordion: collapse any sibling branches first.
          const parentId = parentMap.get(node.id);
          if (parentId) {
            const parentNode = findNodeById(root, parentId);
            if (parentNode) {
              for (const sib of parentNode.subordinates ?? []) {
                if (sib.id !== node.id) collapseSubtree(next, sib);
              }
            }
          }
          next.add(node.id);
        }
        return next;
      });
    },
    [parentMap, root],
  );

  const onNodeDoubleClick = useCallback<NodeMouseHandler>(
    (_, node) => {
      const d = node.data as PersonNodeData;
      if (!d.hasChildren) return;
      const target = findNodeById(root, node.id);
      if (!target) return;
      const ids = descendantIds(target);
      setExpanded((prev) => {
        const next = new Set(prev);
        // Accordion: collapse sibling branches before expanding the subtree.
        const parentId = parentMap.get(node.id);
        if (parentId) {
          const parentNode = findNodeById(root, parentId);
          if (parentNode) {
            for (const sib of parentNode.subordinates ?? []) {
              if (sib.id !== node.id) collapseSubtree(next, sib);
            }
          }
        }
        for (const id of ids) next.add(id);
        return next;
      });
    },
    [parentMap, root],
  );

  const handleExpandAll = () => setExpanded(new Set(allManagerIds));
  const handleCollapseAll = () => setExpanded(new Set([root.id]));

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-[220px]">
          <Search
            className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: C.navyTint50 }}
          />
          <input
            type="text"
            value={rawQuery}
            onChange={(e) => setRawQuery(e.target.value)}
            placeholder="Search by name…"
            className="w-full pl-9 pr-3 py-2 text-sm rounded-md border outline-none transition focus:ring-2"
            style={{
              borderColor: C.gray100,
              color: C.gray800,
              // @ts-expect-error — CSS var for focus ring colour
              '--tw-ring-color': C.processBlue,
            }}
          />
        </div>
        {searchQuery && (
          <span className="text-xs" style={{ color: C.navy }}>
            {matchIds.size} match{matchIds.size === 1 ? '' : 'es'}
          </span>
        )}
        <div className="flex gap-2 ml-auto">
          <button
            type="button"
            onClick={handleExpandAll}
            className="px-3 py-2 text-xs font-medium rounded-md transition"
            style={{ background: C.blue, color: '#fff' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = C.blueShade1)}
            onMouseLeave={(e) => (e.currentTarget.style.background = C.blue)}
          >
            Expand all
          </button>
          <button
            type="button"
            onClick={handleCollapseAll}
            className="px-3 py-2 text-xs font-medium rounded-md border transition"
            style={{ borderColor: C.blue, color: C.blue, background: '#fff' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = C.blueTint10)}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
          >
            Collapse all
          </button>
        </div>
      </div>

      {/* Canvas — no border, inherits page background */}
      <div className="w-full h-[80vh]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          onNodeDoubleClick={onNodeDoubleClick}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          minZoom={0.2}
          maxZoom={1.5}
          proOptions={{ hideAttribution: true }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
        >
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
    </div>
  );
}

export default function OrgFlow({ data }: { data: OrgChartData }) {
  return (
    <ReactFlowProvider>
      <OrgFlowInner data={data} />
    </ReactFlowProvider>
  );
}
