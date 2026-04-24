'use client';

import React from 'react';
import { GameState } from './types';

interface HUDProps {
  state: GameState;
}

export const HUD: React.FC<HUDProps> = ({ state }) => {
  const { resources } = state;

  const formatTime = (minutes: number) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  const renderBar = (value: number, max: number = 100) => {
    const clampedValue = Math.max(0, Math.min(value, max));
    const filled = Math.round((clampedValue / max) * 10);
    const empty = 10 - filled;
    return '\u2588'.repeat(filled) + '\u2591'.repeat(empty);
  };

  return (
    <div className="mt-auto pt-4 border-t border-current text-sm crt-text-dim flex flex-col gap-1">
      <div className="flex justify-between">
        <span>AGENT: {state.playerName || 'UNKNOWN'}</span>
        <span>TIME: {formatTime(resources.timeRemaining)}</span>
      </div>
      <div className="flex justify-between">
        <span>SUSPICION: {renderBar(resources.suspicion)} {resources.suspicion}%</span>
        <span>NERVE: {renderBar(resources.nerve)} {resources.nerve}%</span>
      </div>
      <div className="flex justify-between">
        <span>REP: {resources.reputation}</span>
        <span>TOOLS: {state.inventory.length}</span>
      </div>
    </div>
  );
};
