'use client';

import React, { useRef, useState, useEffect } from 'react';

interface CometButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    contentClassName?: string;
}

export const CometButton: React.FC<CometButtonProps> = ({ className, contentClassName, children, ...props }) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [dims, setDims] = useState({ width: 0, height: 0, rx: 0 });

    useEffect(() => {
        if (!buttonRef.current) return;

        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                // Use borderBoxSize if available for precise border-box dimensions
                const size = entry.borderBoxSize?.[0] || entry.contentRect;
                // Handle both standard property (inlineSize) and legacy (width) just in case, though borderBoxSize helps.
                // entry.contentRect is widely supported but excludes border/padding if box-sizing varies.
                // We want the SVG to cover the whole element (border-box).
                // For standard buttons, clientWidth/Height might be easier but RO is efficient.

                let width, height;
                if ('inlineSize' in size) {
                    width = size.inlineSize;
                    height = size.blockSize;
                } else {
                    // Fallback for older interface if needed (mostly safe to assume modern env)
                    const rect = entry.contentRect;
                    width = rect.width;
                    height = rect.height;
                }

                setDims({ width, height, rx: height / 2 });
            }
        });

        observer.observe(buttonRef.current, { box: 'border-box' });

        return () => observer.disconnect();
    }, []);

    return (
        <button
            ref={buttonRef}
            className={`relative group ${className}`}
            {...props}
        >
            {/* Content Layer - Ensure it stays above the SVG */}
            <span className={`relative z-10 flex items-center justify-center gap-2 ${contentClassName || ''}`}>
                {children}
            </span>

            {/* SVG Overlay Layer */}
            <svg
                aria-hidden="true"
                className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                width={dims.width}
                height={dims.height}
                viewBox={`0 0 ${dims.width} ${dims.height}`}
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {/* Layer 1 Gradient: Fading Trail */}
                    <linearGradient id="comet-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="white" stopOpacity="0" />
                        <stop offset="50%" stopColor="white" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="white" stopOpacity="1" />
                    </linearGradient>

                    {/* Layer 2 Glow: Head */}
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                        <feColorMatrix in="blur" type="matrix" values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.8 0" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Base Border (Optional: Keep faint outline so button isn't invisible in gaps) */}
                <rect
                    x="1" y="1"
                    width={Math.max(0, dims.width - 2)}
                    height={Math.max(0, dims.height - 2)}
                    rx={Math.max(0, dims.rx - 1)}
                    fill="none"
                    stroke="white"
                    strokeOpacity="0.1"
                    strokeWidth="1"
                />

                {/* Layer 1: The Tail (Gradient + Long Dash) */}
                {/* We use stroke-dasharray to create the gap. PathLength=1 means units are 0..1 */}
                {/* Dasharray: 0.5 (draw) 0.5 (gap) */}
                <rect
                    x="1" y="1"
                    width={Math.max(0, dims.width - 2)}
                    height={Math.max(0, dims.height - 2)}
                    rx={Math.max(0, dims.rx - 1)}
                    fill="none"
                    stroke="url(#comet-gradient)"
                    strokeWidth="1.5"
                    strokeDasharray="0.4 0.6"
                    pathLength="1"
                    className="opacity-80"
                    strokeLinecap="round"
                >
                    <animate
                        attributeName="stroke-dashoffset"
                        from="1"
                        to="0"
                        dur="4s"
                        repeatCount="indefinite"
                        calcMode="linear"
                    />
                </rect>

                {/* Layer 2: The Head (Bright White + Glow + Dot) */}
                {/* We must align the head to the 'front' of the tail. 
            If Tail draws 0.0->0.4. Front is 0.4.
            We want Head at 0.4.
            So Head dasharray: 0.01 (draw) 0.99 (gap).
            Head offset needs to be shifted so the 0.01 segment aligns with 0.4 segment of tail.
            Offset = Start - DesiredPos?
            Let's rely on relative timing. If both animate 1->0, they move together.
            We just need the drawing phase to match.
            If Tail is [Draw 0.4, Gap 0.6].
            Head is [Draw 0.01, Gap 0.99].
            Ideally Head is 'ahead' of the tail gradient logic.
             
            Actually, the gradient is static in bounding box. The tail dash moves through it? 
            No, stroke-dashoffset moves the dash window.
            So the "solid part" moves around the rect.
            
            To put Head at the Tip:
            If Tail is 0.4 long.
            We want Head to be at the leading edge.
            If dashoffset decreases, the dash moves "forward" along the path.
            (Imagine a conveyor belt).
            
            I'll use a slight offset in the `from` / `to` values for the Head to place it ahead.
            Experiment: Head offset = Tail offset - 0.4 (roughly).
        */}
                <rect
                    x="1" y="1"
                    width={Math.max(0, dims.width - 2)}
                    height={Math.max(0, dims.height - 2)}
                    rx={Math.max(0, dims.rx - 1)}
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeDasharray="0.02 0.98"
                    pathLength="1"
                    strokeLinecap="round"
                    filter="url(#glow)"
                >
                    <animate
                        attributeName="stroke-dashoffset"
                        from="0.6"
                        to="-0.4"
                        dur="4s"
                        repeatCount="indefinite"
                        calcMode="linear"
                    />
                </rect>
            </svg>
        </button>
    );
};
