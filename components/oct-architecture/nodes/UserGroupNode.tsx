'use client';

import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

export const UserGroupNode = memo(function UserGroupNode({ data }: NodeProps) {
  const label = data.label as string;
  const sublabel = data.sublabel as string | undefined;
  const icon = data.icon as string | undefined;
  const accent = (data.accent as string) || '#06b6d4';
  const hasSubDiagram = data.hasSubDiagram as boolean | undefined;

  return (
    <div
      className="relative rounded-lg min-w-[160px] cursor-pointer transition-all duration-200 hover:scale-[1.03] hover:brightness-110"
      style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        border: '1px solid rgba(100, 116, 139, 0.3)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
        borderLeft: `3px solid ${accent}`,
      }}
    >
      <div className={`px-4 ${hasSubDiagram ? 'py-7' : 'py-3'}`}>
        {icon && (
          <div className={`${hasSubDiagram ? 'text-3xl mb-3' : 'text-xl mb-1.5'}`}>{icon}</div>
        )}
        <div className="text-white text-[13px] font-bold font-sans leading-tight">{label}</div>
        {sublabel && (
          <div className="text-slate-400 text-[10px] mt-1 font-sans leading-snug">{sublabel}</div>
        )}
      </div>
      {hasSubDiagram && (
        <div
          className="flex items-center justify-center gap-1.5 py-1.5 rounded-b-lg text-[10px] font-sans font-semibold tracking-wide uppercase"
          style={{
            background: `${accent}15`,
            borderTop: `1px solid ${accent}40`,
            color: accent,
          }}
        >
          <span>Explore</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-80">
            <path d="M3 2L7 5L3 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
      <Handle type="source" position={Position.Bottom} className="!bg-cyan-500 !w-2 !h-2 !border-2 !border-slate-900 !min-w-0 !min-h-0" />
      <Handle type="target" position={Position.Top} className="!bg-cyan-500 !w-2 !h-2 !border-2 !border-slate-900 !min-w-0 !min-h-0" />
      <Handle type="source" position={Position.Right} id="right" className="!bg-cyan-500 !w-2 !h-2 !border-2 !border-slate-900 !min-w-0 !min-h-0" />
      <Handle type="target" position={Position.Left} id="left" className="!bg-cyan-500 !w-2 !h-2 !border-2 !border-slate-900 !min-w-0 !min-h-0" />
    </div>
  );
});
