'use client';

import { useEffect, useRef, useState } from 'react';

const BOOT_SEQUENCE = [
  "BIOS Date 03/25/26 20:06:47 Ver 1.00",
  "CPU: Intel(R) Core(TM) i9-14900K @ 3.20GHz",
  "Speed: 3.20 GHz",
  "Memory Test: 65536K OK",
  "",
  "Initializing USB Controllers .. Done.",
  "Auto-Detecting Primary Master .. IDE Hard Disk",
  "Auto-Detecting Primary Slave  .. Not Detected",
  "",
  "Loading OS...",
  "Mounting root filesystem...",
  "Starting network interfaces...",
  "Establishing secure connection to handler...",
  "Connection established.",
  "",
  "Welcome to HACK THE PLANET v1.0",
  "Press any key to continue..."
];

interface BootScreenProps {
  onComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onComplete }) => {
  const [lines, setLines] = useState<string[]>([]);
  const linesRef = useRef(lines);
  linesRef.current = lines;

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < BOOT_SEQUENCE.length) {
        setLines(prev => [...prev, BOOT_SEQUENCE[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleKeyDown = () => {
      if (linesRef.current.length >= BOOT_SEQUENCE.length) {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete]);

  return (
    <div className="flex flex-col h-full w-full crt-text text-sm">
      {lines.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
      <div className="mt-2">
        <span className="cursor-blink">_</span>
      </div>
    </div>
  );
};
