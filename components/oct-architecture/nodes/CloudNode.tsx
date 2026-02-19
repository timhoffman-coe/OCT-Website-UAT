'use client';

import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

export const CloudNode = memo(function CloudNode({ data }: NodeProps) {
  const label = data.label as string;

  return (
    <div className="relative flex items-center justify-center" style={{ width: 140, height: 80 }}>
      <svg
        viewBox="0 0 140 80"
        width="140"
        height="80"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0"
      >
        <defs>
          <filter id="cloud-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M30 60 C10 60 5 48 12 38 C8 28 18 18 30 20 C35 10 50 5 65 10 C75 5 90 5 100 12 C115 8 130 18 125 32 C135 38 135 52 120 58 C120 62 115 65 108 62 Z"
          fill="rgba(8, 145, 178, 0.06)"
          stroke="rgb(8, 145, 178)"
          strokeWidth="1.5"
          filter="url(#cloud-glow)"
        />
      </svg>
      <span className="relative z-10 text-cyan-300 text-xs font-bold font-sans uppercase tracking-wider">
        {label}
      </span>
      <Handle type="target" position={Position.Top} className="!bg-cyan-500 !w-1.5 !h-1.5 !border-0 !min-w-0 !min-h-0" />
      <Handle type="source" position={Position.Bottom} className="!bg-cyan-500 !w-1.5 !h-1.5 !border-0 !min-w-0 !min-h-0" />
      <Handle type="source" position={Position.Right} id="right" className="!bg-cyan-500 !w-1.5 !h-1.5 !border-0 !min-w-0 !min-h-0" />
      <Handle type="target" position={Position.Left} id="left" className="!bg-cyan-500 !w-1.5 !h-1.5 !border-0 !min-w-0 !min-h-0" />
    </div>
  );
});
