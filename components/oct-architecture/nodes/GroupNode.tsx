'use client';

import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

export const GroupNode = memo(function GroupNode({ data }: NodeProps) {
  const label = data.label as string;
  const sublabel = data.sublabel as string | undefined;
  const color = (data.color as string) || 'rgb(8, 145, 178)';

  return (
    <div
      className="rounded-lg"
      style={{
        width: '100%',
        height: '100%',
        background: 'rgba(8, 145, 178, 0.04)',
        border: `1.5px solid ${color}`,
        boxShadow: `0 0 20px ${color}22, inset 0 0 20px ${color}08`,
      }}
    >
      <div
        className="px-3 py-1.5 rounded-tl-lg rounded-br-lg inline-block"
        style={{
          background: `${color}18`,
          borderBottom: `1px solid ${color}33`,
          borderRight: `1px solid ${color}33`,
        }}
      >
        <span
          className="text-[11px] font-bold uppercase tracking-wider font-sans"
          style={{ color }}
        >
          {label}
        </span>
        {sublabel && (
          <span className="block text-[9px] text-gray-500 font-sans">{sublabel}</span>
        )}
      </div>
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-0 !w-0 !h-0" />
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0 !w-0 !h-0" />
      <Handle type="target" position={Position.Left} id="left" className="!bg-transparent !border-0 !w-0 !h-0" />
      <Handle type="source" position={Position.Right} id="right" className="!bg-transparent !border-0 !w-0 !h-0" />
    </div>
  );
});
