'use client';

import React, { useState } from 'react';
import { GameState } from './types';
import { Typewriter } from './Typewriter';

interface ScoreProps {
  state: GameState;
  onRestart: () => void;
  deathReason?: string;
}

export const Score: React.FC<ScoreProps> = ({ state, onRestart, deathReason }) => {
  const [phase, setPhase] = useState(0);

  const getRating = () => {
    if (deathReason) return { title: "CAUGHT RED-HANDED", grade: "D", bar: "\u2588\u2588\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591" };
    if (state.resources.suspicion === 0 && state.dataExfiltrated > 0) return { title: "GHOST PROTOCOL", grade: "S", bar: "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588" };
    if (state.resources.suspicion < 50 && state.dataExfiltrated > 0) return { title: "SHADOW BROKER", grade: "A", bar: "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591\u2591\u2591" };
    if (state.resources.suspicion < 80 && state.dataExfiltrated > 0) return { title: "GREY HAT", grade: "B", bar: "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591" };
    return { title: "SCRIPT KIDDIE", grade: "C", bar: "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591" };
  };

  const rating = getRating();

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

  const debriefText = deathReason
    ? `MISSION FAILED.\n${deathReason}\n\nLESSON: Physical and logical access controls are layered for a reason. Always monitor your suspicion level.`
    : `MISSION ACCOMPLISHED.\nYou got the goods and mostly covered your tracks. The SOC analyst will be writing incident reports for weeks.`;

  const topText = `
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501
       H A C K   T H E   P L A N E T
          \u2014 MISSION DEBRIEF \u2014
\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501

  Agent:        ${state.playerName}
  Date:         March 2026
  Target:       CoE Data Center

  Data Exfiltrated:    ${state.dataExfiltrated}/1 assets
  Time Remaining:      ${formatTime(state.resources.timeRemaining)}
  Final Suspicion:     ${state.resources.suspicion}%
  Tools Remaining:     ${state.inventory.length}
  Nerve:               ${renderBar(state.resources.nerve)}

  RATING:  ${rating.bar}
           `;

  const ratingText = `${rating.title} (${rating.grade})\n\n`;

  const midText = `  "${debriefText.replace(/\n/g, '\n   ')}"\n`;

  const bottomText = `\n\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n`;

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-y-auto crt-text text-sm min-h-0 pb-4">
        <Typewriter
          text={topText}
          speed={5}
          onComplete={() => setPhase(1)}
        />
        {phase >= 1 && (
          <span className={deathReason ? "text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]" : ""}>
            <Typewriter
              text={ratingText}
              speed={5}
              onComplete={() => setPhase(2)}
            />
          </span>
        )}
        {phase >= 2 && (
          <span className={deathReason ? "text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]" : ""}>
            <Typewriter
              text={midText}
              speed={5}
              onComplete={() => setPhase(3)}
            />
          </span>
        )}
        {phase >= 3 && (
          <Typewriter
            text={bottomText}
            speed={5}
            onComplete={() => setPhase(4)}
          />
        )}
      </div>

      {phase >= 4 && (
        <div className="flex-shrink-0 flex flex-col gap-2 mt-4 border-t border-current pt-4 pb-8">
          <div className="menu-item text-center" onClick={onRestart}>[1] Play Again</div>
          <div className="menu-item text-center" onClick={() => alert("Debrief details not implemented yet.")}>[2] View Detailed Debrief</div>
        </div>
      )}
    </div>
  );
};
