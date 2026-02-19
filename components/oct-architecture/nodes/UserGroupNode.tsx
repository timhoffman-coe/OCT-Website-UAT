'use client';

import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

export const UserGroupNode = memo(function UserGroupNode({ data }: NodeProps) {
  const label = data.label as string;

  return (
    <div className="flex flex-col items-center gap-1.5">
      {/* Computer/User icon */}
      <div
        className="w-12 h-10 rounded-md flex items-center justify-center"
        style={{
          background: 'linear-gradient(180deg, #1a2744 0%, #0f1a2e 100%)',
          border: '1px solid rgba(8, 145, 178, 0.6)',
          boxShadow: '0 0 10px rgba(8, 145, 178, 0.15)',
        }}
      >
        <svg
          width="24"
          height="20"
          viewBox="0 0 24 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-cyan-400"
        >
          {/* Monitor */}
          <rect x="3" y="1" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
          {/* Screen */}
          <rect x="5" y="3" width="14" height="8" rx="0.5" fill="currentColor" opacity="0.15" />
          {/* Stand */}
          <path d="M8 15H16M12 13V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          {/* Person */}
          <circle cx="12" cy="6" r="1.5" fill="currentColor" opacity="0.5" />
          <path d="M9 10C9 8.5 10.3 7.5 12 7.5C13.7 7.5 15 8.5 15 10" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        </svg>
      </div>
      <div
        className="px-3 py-1 rounded text-center"
        style={{
          background: 'rgba(8, 145, 178, 0.08)',
          border: '1px solid rgba(8, 145, 178, 0.3)',
        }}
      >
        <span className="text-cyan-300 text-[10px] font-semibold font-sans whitespace-nowrap">{label}</span>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-cyan-500 !w-1.5 !h-1.5 !border-0 !min-w-0 !min-h-0" />
      <Handle type="target" position={Position.Top} className="!bg-cyan-500 !w-1.5 !h-1.5 !border-0 !min-w-0 !min-h-0" />
      <Handle type="source" position={Position.Right} id="right" className="!bg-cyan-500 !w-1.5 !h-1.5 !border-0 !min-w-0 !min-h-0" />
      <Handle type="target" position={Position.Left} id="left" className="!bg-cyan-500 !w-1.5 !h-1.5 !border-0 !min-w-0 !min-h-0" />
    </div>
  );
});
