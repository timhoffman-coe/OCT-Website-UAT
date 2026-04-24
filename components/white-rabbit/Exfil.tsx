'use client';

import React, { useState } from 'react';
import { GameState } from './types';
import { Typewriter } from './Typewriter';

interface ExfilProps {
  state: GameState;
  updateState: (updates: Partial<GameState>) => void;
  nextPhase: () => void;
  gameOver: (reason: string) => void;
}

export const Exfil: React.FC<ExfilProps> = ({ state, updateState, nextPhase, gameOver }) => {
  const [log, setLog] = useState<string[]>([
    "PHASE 5: DATA EXFILTRATION",
    "Target data acquired. SOC Analyst is actively hunting.",
    "Choose exfiltration method carefully."
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const addLog = (msg: string) => {
    setLog(prev => [...prev, msg]);
    setIsTyping(true);
  };

  const handleAction = (action: string) => {
    if (isTyping) return;

    let newSuspicion = state.resources.suspicion;
    let newTime = state.resources.timeRemaining;
    let newData = state.dataExfiltrated;
    let msg = "";

    switch (action) {
      case 'USB':
        newTime -= 5;
        newData += 1;
        msg = "Data copied to physical USB. You must walk out with it.";
        break;
      case 'DNS':
        newTime -= 45;
        newSuspicion += 10;
        newData += 1;
        msg = "Tunneling data over DNS. Slow but stealthy. Data exfiltrated.";
        break;
      case 'EMAIL':
        newTime -= 15;
        newSuspicion += 50;
        newData += 1;
        msg = "Emailed encrypted zip to burner account. DLP flagged the attachment! Suspicion spikes.";
        break;
    }

    updateState({
      resources: {
        ...state.resources,
        suspicion: newSuspicion,
        timeRemaining: newTime
      },
      dataExfiltrated: newData
    });

    addLog(msg);

    if (newSuspicion >= 100) {
      setTimeout(() => gameOver("SOC Analyst revoked your credentials during exfiltration."), 2000);
    } else {
      setTimeout(nextPhase, 3000);
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 w-full">
      <div className="flex-1 overflow-hidden flex flex-col justify-end mb-4 crt-text text-sm">
        {log.slice(-8).map((msg, i, arr) => (
          <div key={log.length - arr.length + i} className="mb-2">
            {i === arr.length - 1 && isTyping ? (
              <Typewriter text={msg} onComplete={() => setIsTyping(false)} />
            ) : (
              msg
            )}
          </div>
        ))}
      </div>

      {!isTyping && (
        <div className="flex flex-col gap-2 mt-auto border-t border-current pt-4">
          <div className="menu-item" onClick={() => handleAction('USB')}>1. Copy to USB drive (Fast, Physical Risk)</div>
          <div className="menu-item" onClick={() => handleAction('DNS')}>2. DNS Tunneling (Slow, Stealthy)</div>
          <div className="menu-item" onClick={() => handleAction('EMAIL')}>3. Encrypted Email (Medium, High Risk)</div>
        </div>
      )}
    </div>
  );
};
