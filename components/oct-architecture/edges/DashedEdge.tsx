'use client';

import { memo } from 'react';
import { type EdgeProps, getBezierPath, EdgeLabelRenderer } from '@xyflow/react';

export const DashedEdge = memo(function DashedEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const label = data?.label as string | undefined;

  return (
    <>
      {/* Glow layer */}
      <path
        d={edgePath}
        fill="none"
        stroke="rgba(34, 211, 238, 0.12)"
        strokeWidth={4}
        strokeDasharray="8 4"
        className="react-flow__edge-path"
      />
      {/* Main dashed path */}
      <path
        id={id}
        d={edgePath}
        fill="none"
        stroke="rgba(34, 211, 238, 0.5)"
        strokeWidth={1.5}
        strokeDasharray="8 4"
        className="react-flow__edge-path"
      />
      {label && (
        <EdgeLabelRenderer>
          <div
            className="absolute text-[8px] font-sans font-medium text-cyan-300/80 bg-[#0a0e17]/95 px-2 py-0.5 rounded border border-cyan-800/40 pointer-events-none whitespace-nowrap"
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            }}
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
});
