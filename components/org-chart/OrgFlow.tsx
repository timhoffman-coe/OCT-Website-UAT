'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Controls,
  Handle,
  Position,
  BaseEdge,
  useReactFlow,
  type Node,
  type Edge,
  type NodeProps,
  type EdgeProps,
  type NodeMouseHandler,
} from '@xyflow/react';
import { User, ChevronDown, ChevronRight, ChevronUp, Search } from 'lucide-react';
import '@xyflow/react/dist/style.css';
import type { OrgChartData, OrgPerson } from '@/app/org-chart/types';

const NODE_WIDTH = 200;
const NODE_HEIGHT = 180;
const H_GAP = 40;
const V_GAP = 80;
// More than this many visible reports → switch from horizontal row to a
// hanging (vertical-stack) layout, which keeps connector lines from crossing cards.
const HANGING_THRESHOLD = 4;
const HANGING_COLS = 4;
const HANG_V_GAP = 60;

const HIDDEN_HANDLE_STYLE: CSSProperties = {
  background: 'transparent',
  border: 'none',
  width: 1,
  height: 1,
  opacity: 0,
  pointerEvents: 'none',
};

const HIDDEN_NODE_STYLE: CSSProperties = {
  width: 1,
  height: 1,
  opacity: 0,
  pointerEvents: 'none',
  background: 'transparent',
  border: 'none',
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
      <Handle type="target" id="top" position={Position.Top} style={HIDDEN_HANDLE_STYLE} />
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
      <Handle type="source" id="bottom" position={Position.Bottom} style={HIDDEN_HANDLE_STYLE} />
    </div>
  );
}

type ParentLinkData = {
  name: string;
  parentId: string;
};

function ParentLinkNode({ data }: NodeProps<Node<ParentLinkData>>) {
  return (
    <div
      className="border-2 border-dashed rounded-lg shadow-sm w-[200px] h-[60px] flex items-center justify-center gap-2 cursor-pointer bg-white transition hover:shadow-md"
      style={{ borderColor: C.processBlueTint70 }}
    >
      <ChevronUp className="w-4 h-4" style={{ color: C.blue }} />
      <div className="flex flex-col items-start leading-tight">
        <span
          className="text-[10px] uppercase tracking-wide"
          style={{ color: C.navyTint50 }}
        >
          Up to
        </span>
        <span className="text-sm font-semibold" style={{ color: C.blue }}>
          {data.name}
        </span>
      </div>
      <Handle type="source" id="bottom" position={Position.Bottom} style={HIDDEN_HANDLE_STYLE} />
    </div>
  );
}

function InvisibleNode() {
  return (
    <div style={HIDDEN_NODE_STYLE}>
      <Handle type="target" id="top" position={Position.Top} style={HIDDEN_HANDLE_STYLE} />
      <Handle type="source" id="bottom" position={Position.Bottom} style={HIDDEN_HANDLE_STYLE} />
    </div>
  );
}

type BusEdgeData = { busY?: number };

function BusEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
  style,
}: EdgeProps<Edge<BusEdgeData>>) {
  const busY = data?.busY ?? sourceY;
  const path = `M ${sourceX} ${sourceY} L ${sourceX} ${busY} L ${targetX} ${busY} L ${targetX} ${targetY}`;
  return <BaseEdge path={path} style={style} />;
}

const nodeTypes = { person: PersonNode, invisible: InvisibleNode, parentLink: ParentLinkNode };
const edgeTypes = { bus: BusEdge };

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
  // Whether each node renders its children as a hanging grid (vs. a horizontal row).
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
      let maxLeftW = 0;
      let maxRightW = 0;
      let totalH = 0;

      for (let r = 0; r < kids.length; r += HANGING_COLS) {
        const rowKids = kids.slice(r, r + HANGING_COLS);
        const n = rowKids.length;
        let leftW = 0;
        let rightW = 0;
        let rowH = 0;

        for (const k of rowKids) {
          rowH = Math.max(rowH, boxH.get(k.id)!);
        }
        totalH += rowH;

        if (n === 4) {
          leftW = H_GAP / 2 + boxW.get(rowKids[1].id)! + H_GAP + boxW.get(rowKids[0].id)!;
          rightW = H_GAP / 2 + boxW.get(rowKids[2].id)! + H_GAP + boxW.get(rowKids[3].id)!;
        } else if (n === 3) {
          leftW = boxW.get(rowKids[1].id)! / 2 + H_GAP + boxW.get(rowKids[0].id)!;
          rightW = boxW.get(rowKids[1].id)! / 2 + H_GAP + boxW.get(rowKids[2].id)!;
        } else if (n === 2) {
          leftW = H_GAP / 2 + boxW.get(rowKids[0].id)!;
          rightW = H_GAP / 2 + boxW.get(rowKids[1].id)!;
        } else if (n === 1) {
          leftW = boxW.get(rowKids[0].id)! / 2;
          rightW = boxW.get(rowKids[0].id)! / 2;
        }

        maxLeftW = Math.max(maxLeftW, leftW);
        maxRightW = Math.max(maxRightW, rightW);
      }

      const numRows = Math.ceil(kids.length / HANGING_COLS);
      if (numRows > 1) {
        totalH += HANG_V_GAP * (numRows - 1);
      }

      boxW.set(p.id, Math.max(NODE_WIDTH, 2 * Math.max(maxLeftW, maxRightW)));
      boxH.set(p.id, NODE_HEIGHT + V_GAP + totalH);
      return;
    }

    // Horizontal: single row.
    const rowWidth =
      kids.reduce((s, c) => s + boxW.get(c.id)!, 0) + H_GAP * (kids.length - 1);
    const rowHeight = Math.max(...kids.map((c) => boxH.get(c.id)!));
    boxW.set(p.id, Math.max(NODE_WIDTH, rowWidth));
    boxH.set(p.id, NODE_HEIGHT + V_GAP + rowHeight);
  };
  computeBox(root, false);

  // Place each node: (leftX, topY) is the top-left of the subtree's bounding box.
  const place = (p: OrgPerson, leftX: number, topY: number) => {
    const myBoxW = boxW.get(p.id)!;
    const useHanging = hangMode.get(p.id)!;
    const kids = visibleChildren(p);

    const x = leftX + myBoxW / 2 - NODE_WIDTH / 2;
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
      const trunkX = leftX + myBoxW / 2;
      let cursorY = topY + NODE_HEIGHT + V_GAP;

      let prevTrunkId = p.id;
      let prevTrunkHandle = 'bottom';

      for (let r = 0; r < kids.length; r += HANGING_COLS) {
        const rowKids = kids.slice(r, r + HANGING_COLS);
        const n = rowKids.length;

        let rowH = 0;
        for (const k of rowKids) rowH = Math.max(rowH, boxH.get(k.id)!);

        const trunkId = `${p.id}_trunk_${r}`;
        const trunkY = cursorY - (r === 0 ? V_GAP / 2 : HANG_V_GAP / 2);

        nodes.push({
          id: trunkId,
          type: 'invisible',
          position: { x: trunkX, y: trunkY },
          data: {} as unknown as PersonNodeData,
          draggable: false,
          selectable: false,
        });

        edges.push({
          id: `${prevTrunkId}->${trunkId}`,
          source: prevTrunkId,
          target: trunkId,
          sourceHandle: prevTrunkHandle,
          targetHandle: 'top',
          type: 'straight',
          style: { stroke: C.processBlueTint70, strokeWidth: 2 },
        });

        prevTrunkId = trunkId;
        prevTrunkHandle = 'bottom';

        const xCoords: number[] = [];
        if (n === 4) {
          const w0 = boxW.get(rowKids[0].id)!;
          const w1 = boxW.get(rowKids[1].id)!;
          const w2 = boxW.get(rowKids[2].id)!;
          xCoords.push(trunkX - H_GAP / 2 - w1 - H_GAP - w0);
          xCoords.push(trunkX - H_GAP / 2 - w1);
          xCoords.push(trunkX + H_GAP / 2);
          xCoords.push(trunkX + H_GAP / 2 + w2 + H_GAP);
        } else if (n === 3) {
          const w0 = boxW.get(rowKids[0].id)!;
          const w1 = boxW.get(rowKids[1].id)!;
          xCoords.push(trunkX - w1 / 2 - H_GAP - w0);
          xCoords.push(trunkX - w1 / 2);
          xCoords.push(trunkX + w1 / 2 + H_GAP);
        } else if (n === 2) {
          const w0 = boxW.get(rowKids[0].id)!;
          xCoords.push(trunkX - H_GAP / 2 - w0);
          xCoords.push(trunkX + H_GAP / 2);
        } else if (n === 1) {
          const w0 = boxW.get(rowKids[0].id)!;
          xCoords.push(trunkX - w0 / 2);
        }

        for (let i = 0; i < n; i++) {
          const kid = rowKids[i];
          place(kid, xCoords[i], cursorY);

          edges.push({
            id: `${trunkId}->${kid.id}`,
            source: trunkId,
            target: kid.id,
            sourceHandle: 'bottom',
            targetHandle: 'top',
            type: 'bus',
            style: { stroke: C.processBlueTint70, strokeWidth: 2 },
          });
        }

        cursorY += rowH + HANG_V_GAP;
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
        type: 'bus',
        data: { busY: rowTopY - V_GAP / 2 },
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

// Returns the chain [root, ..., node]. Empty when `id` is not in the tree.
function buildPathToRoot(root: OrgPerson, id: string): OrgPerson[] {
  const path: OrgPerson[] = [];
  const walk = (p: OrgPerson): boolean => {
    path.push(p);
    if (p.id === id) return true;
    for (const c of p.subordinates ?? []) {
      if (walk(c)) return true;
    }
    path.pop();
    return false;
  };
  walk(root);
  return path;
}

function OrgFlowInner({ data }: { data: OrgChartData }) {
  const { root } = data;
  const [focusedId, setFocusedId] = useState(root.id);
  const [rawQuery, setRawQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const reactFlow = useReactFlow();

  // Debounce search input.
  useEffect(() => {
    const t = setTimeout(() => setSearchQuery(rawQuery.trim()), 200);
    return () => clearTimeout(t);
  }, [rawQuery]);

  const parentMap = useMemo(() => buildParentMap(root), [root]);
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

  // A search reveals matches anywhere in the tree, so snap focus to the real
  // root while a query is active.
  const effectiveFocusedId = searchQuery ? root.id : focusedId;
  const effectiveRoot = useMemo(
    () => findNodeById(root, effectiveFocusedId) ?? root,
    [root, effectiveFocusedId],
  );
  const breadcrumbPath = useMemo(
    () => buildPathToRoot(root, effectiveFocusedId),
    [root, effectiveFocusedId],
  );

  // Ancestors of search matches (within the full tree) must be forced open.
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

  // Focused root always shows its direct reports; search ancestors stay open too.
  const effectiveExpanded = useMemo(() => {
    const merged = new Set<string>([effectiveFocusedId]);
    for (const id of searchExpanded) merged.add(id);
    return merged;
  }, [effectiveFocusedId, searchExpanded]);

  const { nodes, edges, positions } = useMemo(() => {
    const result = layoutTree(effectiveRoot, effectiveExpanded, totalCounts, matchIds);

    if (effectiveFocusedId !== root.id) {
      const parentId = parentMap.get(effectiveFocusedId);
      if (parentId) {
        const parent = findNodeById(root, parentId);
        const focusedPos = result.positions.get(effectiveFocusedId);
        if (parent && focusedPos) {
          const linkId = `parent-link-${parent.id}`;
          const linkHeight = 60;
          const linkY = focusedPos.y - linkHeight - V_GAP;
          result.nodes.unshift({
            id: linkId,
            type: 'parentLink',
            position: { x: focusedPos.x, y: linkY },
            data: { name: parent.name, parentId: parent.id } as unknown as PersonNodeData,
            draggable: false,
            selectable: false,
          });
          result.edges.unshift({
            id: `${linkId}->${effectiveFocusedId}`,
            source: linkId,
            target: effectiveFocusedId,
            sourceHandle: 'bottom',
            targetHandle: 'top',
            type: 'straight',
            style: {
              stroke: C.processBlueTint70,
              strokeWidth: 2,
              strokeDasharray: '4 4',
            },
          });
        }
      }
    }

    return result;
  }, [effectiveRoot, effectiveExpanded, totalCounts, matchIds, effectiveFocusedId, parentMap, root]);

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
  }, [nodes.length, matchIds, positions, reactFlow, effectiveFocusedId]);

  const onNodeClick = useCallback<NodeMouseHandler>(
    (_, node) => {
      if (node.type === 'parentLink') {
        const { parentId } = node.data as unknown as ParentLinkData;
        setFocusedId(parentId);
        setRawQuery('');
        return;
      }
      const d = node.data as PersonNodeData;
      if (!d.hasChildren) return;
      if (node.id === effectiveFocusedId) return;
      setFocusedId(node.id);
      setRawQuery('');
    },
    [effectiveFocusedId],
  );

  const resetToTop = () => {
    setFocusedId(root.id);
    setRawQuery('');
  };

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
        {effectiveFocusedId !== root.id && (
          <button
            type="button"
            onClick={resetToTop}
            className="ml-auto px-3 py-2 text-xs font-medium rounded-md border transition"
            style={{ borderColor: C.blue, color: C.blue, background: '#fff' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = C.blueTint10)}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
          >
            Back to top
          </button>
        )}
      </div>

      {/* Breadcrumb trail — only when focused below the root */}
      {breadcrumbPath.length > 1 && (
        <nav
          aria-label="Org chart breadcrumb"
          className="flex flex-wrap items-center gap-1 mb-3 text-sm"
        >
          {breadcrumbPath.map((p, i) => {
            const isLast = i === breadcrumbPath.length - 1;
            return (
              <span key={p.id} className="flex items-center gap-1">
                {i > 0 && (
                  <ChevronRight
                    className="w-3.5 h-3.5"
                    style={{ color: C.navyTint30 }}
                  />
                )}
                {isLast ? (
                  <span className="font-semibold" style={{ color: C.navy }}>
                    {p.name}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setFocusedId(p.id);
                      setRawQuery('');
                    }}
                    className="hover:underline"
                    style={{ color: C.blue }}
                  >
                    {p.name}
                  </button>
                )}
              </span>
            );
          })}
        </nav>
      )}

      {/* Canvas — no border, inherits page background */}
      <div className="w-full h-[80vh]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodeClick={onNodeClick}
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
