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
      {/* Subtle base line */}
      <path
        d={edgePath}
        className="react-flow__edge-path"
        style={{
          fill: 'none',
          stroke: 'rgba(251, 191, 36, 0.15)',
          strokeWidth: 5,
        }}
      />
      {/* Animated packet flow */}
      <path
        id={id}
        d={edgePath}
        className="animated-flow-edge-slow"
        style={{
          fill: 'none',
          stroke: 'rgba(251, 191, 36, 0.8)',
          strokeWidth: 2.5,
          strokeDasharray: '4 14',
          strokeLinecap: 'round',
        }}
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
