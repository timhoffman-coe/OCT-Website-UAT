'use client';

import { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

type Variant = 'userGroup' | 'cloud' | 'securityBar' | 'blueZone' | 'partnerZone' | 'purpleZone';

const variantStyles: Record<Variant, {
  border: string;
  background: string;
  textColor: string;
  sublabelColor: string;
  boxShadow: string;
  accentColor: string;
}> = {
  userGroup: {
    border: '2px dashed rgba(234, 179, 8, 0.5)',
    background: 'rgba(234, 179, 8, 0.06)',
    textColor: '#fde047',
    sublabelColor: 'rgba(253, 224, 71, 0.6)',
    boxShadow: '0 0 15px rgba(234, 179, 8, 0.08)',
    accentColor: '#eab308',
  },
  cloud: {
    border: 'none',
    background: 'transparent',
    textColor: '#67e8f9',
    sublabelColor: 'rgba(103, 232, 249, 0.6)',
    boxShadow: 'none',
    accentColor: '#06b6d4',
  },
  securityBar: {
    border: '1.5px solid rgba(59, 130, 246, 0.6)',
    background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.12) 0%, rgba(59, 130, 246, 0.04) 100%)',
    textColor: '#60a5fa',
    sublabelColor: 'rgba(96, 165, 250, 0.6)',
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.1)',
    accentColor: '#3b82f6',
  },
  blueZone: {
    border: '1.5px solid rgba(8, 145, 178, 0.6)',
    background: 'rgba(8, 145, 178, 0.06)',
    textColor: '#67e8f9',
    sublabelColor: 'rgba(148, 163, 184, 0.8)',
    boxShadow: '0 0 20px rgba(8, 145, 178, 0.1)',
    accentColor: '#0891b2',
  },
  partnerZone: {
    border: '1.5px solid rgba(244, 114, 182, 0.5)',
    background: 'rgba(244, 114, 182, 0.06)',
    textColor: '#f472b6',
    sublabelColor: 'rgba(244, 114, 182, 0.6)',
    boxShadow: '0 0 15px rgba(244, 114, 182, 0.08)',
    accentColor: '#ec4899',
  },
  purpleZone: {
    border: '1.5px solid rgba(139, 92, 246, 0.6)',
    background: 'rgba(139, 92, 246, 0.06)',
    textColor: '#a78bfa',
    sublabelColor: 'rgba(167, 139, 250, 0.6)',
    boxShadow: '0 0 20px rgba(139, 92, 246, 0.1)',
    accentColor: '#8b5cf6',
  },
};

export const LandingZoneNode = memo(function LandingZoneNode({ data }: NodeProps) {
  const label = data.label as string;
  const sublabel = data.sublabel as string | undefined;
  const icon = data.icon as string | undefined;
  const variant = (data.variant as Variant) || 'blueZone';
  const clickable = data.clickable as boolean | undefined;

  const styles = variantStyles[variant];

  // Cloud variant renders an SVG cloud shape
  if (variant === 'cloud') {
    return (
      <div className="relative flex items-center justify-center" style={{ width: '100%', height: '100%' }}>
        <svg
          viewBox="0 0 200 120"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0"
        >
          <defs>
            <filter id="landing-cloud-glow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M42 86 C14 86 7 69 17 54 C11 40 26 26 42 29 C50 14 71 7 93 14 C107 7 129 7 143 17 C164 11 186 26 179 46 C193 54 193 74 171 83 C171 89 164 93 154 89 Z"
            fill="rgba(8, 145, 178, 0.08)"
            stroke="rgb(8, 145, 178)"
            strokeWidth="2"
            filter="url(#landing-cloud-glow)"
          />
        </svg>
        <span className="relative z-10 text-cyan-300 text-base font-bold font-sans uppercase tracking-wider">
          {label}
        </span>
        <Handle type="target" position={Position.Top} className="!bg-cyan-500 !w-2 !h-2 !border-0 !min-w-0 !min-h-0" />
        <Handle type="source" position={Position.Bottom} className="!bg-cyan-500 !w-2 !h-2 !border-0 !min-w-0 !min-h-0" />
        <Handle type="source" position={Position.Right} id="right" className="!bg-cyan-500 !w-2 !h-2 !border-0 !min-w-0 !min-h-0" />
        <Handle type="target" position={Position.Left} id="left" className="!bg-cyan-500 !w-2 !h-2 !border-0 !min-w-0 !min-h-0" />
      </div>
    );
  }

  // Security bar variant renders a tall vertical bar with rotated text
  if (variant === 'securityBar') {
    return (
      <div
        className="relative rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:brightness-110 flex flex-col items-center justify-center"
        style={{
          width: '100%',
          height: '100%',
          border: styles.border,
          background: styles.background,
          boxShadow: styles.boxShadow,
        }}
      >
        <div
          className="font-sans font-bold text-sm uppercase tracking-[0.2em] whitespace-nowrap"
          style={{
            color: styles.textColor,
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            transform: 'rotate(180deg)',
          }}
        >
          {label}
        </div>
        {clickable && (
          <div
            className="absolute bottom-2 flex items-center justify-center gap-1 text-[9px] font-sans font-semibold tracking-wide uppercase"
            style={{ color: styles.accentColor }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-80">
              <path d="M3 2L7 5L3 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
        <Handle type="target" position={Position.Top} className="!bg-transparent !border-0 !w-0 !h-0" />
        <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0 !w-0 !h-0" />
        <Handle type="target" position={Position.Left} id="left" className="!bg-transparent !border-0 !w-0 !h-0" />
        <Handle type="source" position={Position.Right} id="right" className="!bg-transparent !border-0 !w-0 !h-0" />
        <Handle type="source" position={Position.Right} id="right-top" className="!bg-transparent !border-0 !w-0 !h-0" style={{ top: '20%' }} />
        <Handle type="source" position={Position.Right} id="right-mid" className="!bg-transparent !border-0 !w-0 !h-0" style={{ top: '45%' }} />
        <Handle type="source" position={Position.Right} id="right-bot" className="!bg-transparent !border-0 !w-0 !h-0" style={{ top: '75%' }} />
      </div>
    );
  }

  // Default rendering for userGroup, blueZone, partnerZone
  return (
    <div
      className={`relative rounded-xl ${clickable ? 'cursor-pointer' : 'cursor-default'} transition-all duration-200 ${clickable ? 'hover:scale-[1.03] hover:brightness-110' : ''}`}
      style={{
        width: '100%',
        height: '100%',
        border: styles.border,
        background: styles.background,
        boxShadow: styles.boxShadow,
      }}
    >
      <div className="flex flex-col items-center justify-center h-full px-4 py-4 text-center">
        {icon && (
          <div className="text-3xl mb-2">{icon}</div>
        )}
        <div
          className="text-base font-bold font-sans leading-tight"
          style={{ color: styles.textColor }}
        >
          {label}
        </div>
        {sublabel && (
          <div
            className="text-[11px] mt-1.5 font-sans leading-snug"
            style={{ color: styles.sublabelColor }}
          >
            {sublabel}
          </div>
        )}
      </div>
      {clickable && (
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-1.5 py-1.5 rounded-b-xl text-[10px] font-sans font-semibold tracking-wide uppercase"
          style={{
            background: `${styles.accentColor}15`,
            borderTop: `1px solid ${styles.accentColor}40`,
            color: styles.accentColor,
          }}
        >
          <span>Explore</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="opacity-80">
            <path d="M3 2L7 5L3 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
      <Handle type="target" position={Position.Top} className="!bg-transparent !border-0 !w-0 !h-0" />
      <Handle type="source" position={Position.Bottom} className="!bg-transparent !border-0 !w-0 !h-0" />
      <Handle type="target" position={Position.Left} id="left" className="!bg-transparent !border-0 !w-0 !h-0" />
      <Handle type="source" position={Position.Left} id="left-source" className="!bg-transparent !border-0 !w-0 !h-0" />
      <Handle type="source" position={Position.Right} id="right" className="!bg-transparent !border-0 !w-0 !h-0" />
      <Handle type="target" position={Position.Right} id="right-target" className="!bg-transparent !border-0 !w-0 !h-0" />
    </div>
  );
});
