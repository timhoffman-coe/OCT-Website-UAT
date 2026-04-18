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
  const color = (data?.color as string) || '8, 145, 178';
  const flowColor = (data?.flowColor as string) || 'rgba(34, 211, 238, 0.9)';

  return (
    <>
      {/* Glow layer */}
      <path
        d={edgePath}
        style={{
          fill: 'none',
          stroke: `rgba(${color}, 0.15)`,
          strokeWidth: 6,
        }}
      />
      {/* Subtle base line */}
      <path
        d={edgePath}
        className="react-flow__edge-path"
        style={{
          fill: 'none',
          stroke: `rgba(${color}, 0.3)`,
          strokeWidth: 1.5,
          ...style,
        }}
      />
      {/* Animated packet flow */}
      <path
        id={id}
        d={edgePath}
        className="animated-flow-edge"
        style={{
          fill: 'none',
          stroke: flowColor,
          strokeWidth: 2.5,
          strokeDasharray: '4 14',
          strokeLinecap: 'round',
        }}
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
