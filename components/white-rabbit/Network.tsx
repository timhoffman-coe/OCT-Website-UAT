'use client';

import React, { useState } from 'react';
import { GameState } from './types';
import { Typewriter } from './Typewriter';

interface NetworkProps {
  state: GameState;
  updateState: (updates: Partial<GameState>) => void;
  nextPhase: () => void;
  gameOver: (reason: string) => void;
}

export const Network: React.FC<NetworkProps> = ({ state, updateState, nextPhase, gameOver }) => {
  const [log, setLog] = useState<string[]>([
    "PHASE 4: NETWORK PENETRATION",
    "TERMINAL \u2014 10.10.50.12",
    "user: jared.mclean (DOMAIN\\std-user)"
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [foundData, setFoundData] = useState(false);

  const addLog = (msg: string) => {
    setLog(prev => [...prev, msg]);
    setIsTyping(true);
  };

  const handleAction = (action: string) => {
    if (isTyping) return;

    let newSuspicion = state.resources.suspicion;
    let newTime = state.resources.timeRemaining;
    const newHoneypots = state.honeypotsAvoided;
    let msg = "";

    switch (action) {
      case 'SCAN':
        newTime -= 10;
        newSuspicion += 5;
        msg = "Scanning subnet... Found file server at 10.10.50.100. Found database at 10.10.60.50.";
        break;
      case 'MIMIKATZ':
        newTime -= 5;
        newSuspicion += 40;
        msg = "Running Mimikatz... (NOISY). Extracted local admin hashes. IDS threat level rising.";
        break;
      case 'HONEYPOT':
        newTime -= 5;
        newSuspicion += 80;
        msg = "Accessing \\\\fileserver\\PAYROLL-BACKUP-FINAL.xlsx. Wait... file timestamps are uniform. It's a honeypot! Silent alarm triggered.";
        break;
      case 'SEARCH':
        newTime -= 20;
        msg = "Searching documents quietly... Found 'SCADA_Credentials.txt'. Target data located.";
        setFoundData(true);
        break;
      case 'COVER':
        newTime -= 15;
        newSuspicion = Math.max(0, newSuspicion - 20);
        msg = "Clearing event logs. Suspicion reduced.";
        break;
      case 'PROCEED':
        if (foundData) {
          nextPhase();
          return;
        } else {
          msg = "You haven't found the target data yet.";
        }
        break;
    }

    updateState({
      resources: {
        ...state.resources,
        suspicion: newSuspicion,
        timeRemaining: newTime
      },
      honeypotsAvoided: newHoneypots
    });

    addLog(msg);

    if (newSuspicion >= 100) {
      setTimeout(() => gameOver("SOC Analyst isolated your subnet. Connection lost."), 2000);
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
          <div className="menu-item" onClick={() => handleAction('SCAN')}>1. Scan Network (10m)</div>
          <div className="menu-item" onClick={() => handleAction('MIMIKATZ')}>2. Run Mimikatz (5m, Noisy)</div>
          <div className="menu-item" onClick={() => handleAction('HONEYPOT')}>3. Access PAYROLL-BACKUP-FINAL.xlsx</div>
          <div className="menu-item" onClick={() => handleAction('SEARCH')}>4. Search for &quot;password&quot; in documents (20m)</div>
          <div className="menu-item" onClick={() => handleAction('COVER')}>5. Cover tracks (15m, -Suspicion)</div>
          {foundData && (
            <div className="menu-item mt-4 text-center" onClick={() => handleAction('PROCEED')}>[ PROCEED TO EXFILTRATION ]</div>
          )}
        </div>
      )}
    </div>
  );
};
