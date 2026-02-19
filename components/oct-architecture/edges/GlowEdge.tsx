'use client';

import { memo } from 'react';
import { type EdgeProps, getBezierPath, EdgeLabelRenderer } from '@xyflow/react';

export const GlowEdge = memo(function GlowEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  style,
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
        stroke="rgba(8, 145, 178, 0.25)"
        strokeWidth={5}
        className="react-flow__edge-path"
      />
      {/* Main path */}
      <path
        id={id}
        d={edgePath}
        fill="none"
        stroke="rgb(8, 145, 178)"
        strokeWidth={1.5}
        className="react-flow__edge-path"
        style={style}
      />
      {label && (
        <EdgeLabelRenderer>
          <div
            className="absolute text-[8px] font-sans font-medium text-cyan-400/90 bg-[#0a0e17]/95 px-2 py-0.5 rounded border border-cyan-900/50 pointer-events-none whitespace-nowrap"
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
