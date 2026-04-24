'use client';

import React, { useState } from 'react';
import { GameState } from './types';
import { Typewriter } from './Typewriter';

interface SocialProps {
  state: GameState;
  updateState: (updates: Partial<GameState>) => void;
  nextPhase: () => void;
  gameOver: (reason: string) => void;
}

export const Social: React.FC<SocialProps> = ({ state, updateState, nextPhase, gameOver }) => {
  const [log, setLog] = useState<string[]>([
    "PHASE 2: SOCIAL ENGINEERING",
    "Location: City of Edmonton Data Center Reception",
    "Receptionist: 'Can I help you?'"
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [encounterResolved, setEncounterResolved] = useState(false);

  const addLog = (msg: string) => {
    setLog(prev => [...prev, msg]);
    setIsTyping(true);
  };

  const handleAction = (action: string) => {
    if (isTyping || encounterResolved) return;

    let newSuspicion = state.resources.suspicion;
    let newTime = state.resources.timeRemaining - 15;
    const newNerve = state.resources.nerve;
    let msg = "";

    switch (action) {
      case 'HVAC':
        if (state.intel.includes('HVAC_VENDOR_NAME') && state.inventory.includes('HI_VIS_VEST')) {
          msg = "Receptionist: 'Ah, Northland Mechanical. Go right through, door's open.'";
          setEncounterResolved(true);
        } else if (state.intel.includes('HVAC_VENDOR_NAME')) {
          msg = "Receptionist: 'Northland? Where's your uniform? I need to call this in.' Security is on their way.";
          newSuspicion = 100;
        } else {
          msg = "Receptionist: 'HVAC? We don't have any appointment scheduled.' She reaches for the phone. Security is called.";
          newSuspicion = 100;
        }
        break;
      case 'INTERN':
        msg = "Receptionist: 'New intern? Let me check the directory...' She frowns. 'There's no one by that name. Security!'";
        newSuspicion = 100;
        break;
      case 'DELIVERY':
        msg = "Receptionist: 'Leave it on the desk.' (You are still in the lobby)";
        newTime -= 10;
        break;
      case 'WALK':
        if (state.intel.includes('SHIFT_CHANGE_TIME') && state.resources.timeRemaining % 60 === 0) {
          msg = "You slip past during the shift change chaos. Nobody notices.";
          setEncounterResolved(true);
        } else {
          msg = "Receptionist: 'Hey! You can't go back there!' Security is called.";
          newSuspicion += 100;
        }
        break;
      case 'DISTRACT':
        msg = "You spill coffee on the desk and hit the door release in the confusion. You're through.";
        newSuspicion += 40;
        newTime -= 5;
        setEncounterResolved(true);
        break;
    }

    updateState({
      resources: {
        ...state.resources,
        suspicion: newSuspicion,
        timeRemaining: newTime,
        nerve: newNerve
      }
    });

    addLog(msg);

    if (newSuspicion >= 100) {
      setTimeout(() => gameOver("Detained by security at reception."), 2000);
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

      {!isTyping && !encounterResolved && (
        <div className="flex flex-col gap-2 mt-auto border-t border-current pt-4">
          <div className="menu-item" onClick={() => handleAction('HVAC')}>1. &quot;Hi, I&apos;m from Northland Mechanical.&quot; (Requires Intel &amp; Vest)</div>
          <div className="menu-item" onClick={() => handleAction('INTERN')}>2. &quot;I&apos;m the new IT intern.&quot;</div>
          <div className="menu-item" onClick={() => handleAction('DELIVERY')}>3. &quot;I have a delivery.&quot;</div>
          <div className="menu-item" onClick={() => handleAction('WALK')}>4. [Walk past without speaking]</div>
          <div className="menu-item" onClick={() => handleAction('DISTRACT')}>5. Distract and hit door release (High Risk)</div>
        </div>
      )}

      {!isTyping && encounterResolved && (
        <div className="flex flex-col gap-2 mt-auto border-t border-current pt-4">
          <div className="menu-item text-center" onClick={nextPhase}>[ PROCEED TO INTERIOR ]</div>
        </div>
      )}
    </div>
  );
};
