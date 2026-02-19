'use client';

import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

export const DecommissionNode = memo(function DecommissionNode({ data }: NodeProps) {
  const label = data.label as string;
  const badge = data.badge as string | undefined;
  const icon = data.icon as string | undefined;

  return (
    <div
      className="relative rounded-lg min-w-[160px] cursor-pointer transition-all duration-200 hover:scale-[1.03] hover:brightness-110"
      style={{
        background: 'linear-gradient(135deg, #1e1e2e 0%, #14141f 100%)',
        border: '1.5px dashed rgba(250, 184, 64, 0.4)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
        borderLeft: '3px dashed rgba(250, 184, 64, 0.6)',
      }}
    >
      {badge && (
        <div className="absolute -top-2.5 left-4 bg-amber-700/90 text-amber-100 text-[7px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-sans whitespace-nowrap">
          {badge}
        </div>
      )}
      <div className="px-4 py-3">
        {icon && (
          <div className="text-xl mb-1.5 opacity-60">{icon}</div>
        )}
        <div className="text-amber-200/80 text-[13px] font-bold font-sans leading-tight">{label}</div>
      </div>
      <Handle type="target" position={Position.Top} className="!bg-amber-500 !w-2 !h-2 !border-2 !border-slate-900 !min-w-0 !min-h-0" />
      <Handle type="source" position={Position.Bottom} className="!bg-amber-500 !w-2 !h-2 !border-2 !border-slate-900 !min-w-0 !min-h-0" />
      <Handle type="target" position={Position.Left} id="left" className="!bg-amber-500 !w-2 !h-2 !border-2 !border-slate-900 !min-w-0 !min-h-0" />
      <Handle type="source" position={Position.Right} id="right" className="!bg-amber-500 !w-2 !h-2 !border-2 !border-slate-900 !min-w-0 !min-h-0" />
    </div>
  );
});
