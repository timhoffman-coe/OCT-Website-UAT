'use client';

import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

export const ServiceNode = memo(function ServiceNode({ data }: NodeProps) {
  const label = data.label as string;
  const sublabel = data.sublabel as string | undefined;

  return (
    <div
      className="relative px-4 py-2.5 rounded-md text-center min-w-[130px]"
      style={{
        background: 'linear-gradient(180deg, #1a2744 0%, #0f1a2e 100%)',
        border: '1px solid rgb(8, 145, 178)',
        boxShadow: '0 0 12px rgba(8, 145, 178, 0.15), inset 0 1px 0 rgba(8, 145, 178, 0.1)',
      }}
    >
      <div className="text-cyan-100 text-[11px] font-semibold font-sans leading-tight">{label}</div>
      {sublabel && (
        <div className="text-cyan-500/50 text-[9px] mt-0.5 font-sans leading-tight">{sublabel}</div>
      )}
      <Handle type="target" position={Position.Top} className="!bg-cyan-500 !w-1.5 !h-1.5 !border-0 !min-w-0 !min-h-0" />
      <Handle type="source" position={Position.Bottom} className="!bg-cyan-500 !w-1.5 !h-1.5 !border-0 !min-w-0 !min-h-0" />
      <Handle type="target" position={Position.Left} id="left" className="!bg-cyan-500 !w-1.5 !h-1.5 !border-0 !min-w-0 !min-h-0" />
      <Handle type="source" position={Position.Right} id="right" className="!bg-cyan-500 !w-1.5 !h-1.5 !border-0 !min-w-0 !min-h-0" />
    </div>
  );
});
