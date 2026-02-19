'use client';

import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

export const DecommissionNode = memo(function DecommissionNode({ data }: NodeProps) {
  const label = data.label as string;
  const badge = data.badge as string | undefined;

  return (
    <div
      className="relative px-4 py-2.5 rounded-md text-center min-w-[130px]"
      style={{
        background: 'linear-gradient(180deg, #1e1e2e 0%, #14141f 100%)',
        border: '1.5px dashed rgba(250, 184, 64, 0.5)',
        boxShadow: '0 0 10px rgba(250, 184, 64, 0.08)',
      }}
    >
      {badge && (
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-amber-700/80 text-amber-100 text-[7px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-sans whitespace-nowrap">
          {badge}
        </div>
      )}
      <div className="text-amber-200/70 text-[11px] font-semibold font-sans leading-tight">{label}</div>
      <Handle type="target" position={Position.Top} className="!bg-amber-500 !w-1.5 !h-1.5 !border-0 !min-w-0 !min-h-0" />
      <Handle type="source" position={Position.Bottom} className="!bg-amber-500 !w-1.5 !h-1.5 !border-0 !min-w-0 !min-h-0" />
      <Handle type="target" position={Position.Left} id="left" className="!bg-amber-500 !w-1.5 !h-1.5 !border-0 !min-w-0 !min-h-0" />
      <Handle type="source" position={Position.Right} id="right" className="!bg-amber-500 !w-1.5 !h-1.5 !border-0 !min-w-0 !min-h-0" />
    </div>
  );
});
