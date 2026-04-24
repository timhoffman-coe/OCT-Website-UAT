'use client';

import React, { useState } from 'react';
import { GameState } from './types';
import { Typewriter } from './Typewriter';

interface PhysicalProps {
  state: GameState;
  updateState: (updates: Partial<GameState>) => void;
  nextPhase: () => void;
  gameOver: (reason: string) => void;
}

export const Physical: React.FC<PhysicalProps> = ({ state, updateState, nextPhase, gameOver }) => {
  const [log, setLog] = useState<string[]>([
    "PHASE 3: PHYSICAL INFILTRATION",
    "You are inside the East Wing corridor.",
    "The server room is down the hall. A guard patrols the area."
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [position, setPosition] = useState('HALLWAY');

  const addLog = (msg: string) => {
    setLog(prev => [...prev, msg]);
    setIsTyping(true);
  };

  const handleAction = (action: string) => {
    if (isTyping) return;

    let newSuspicion = state.resources.suspicion;
    let newTime = state.resources.timeRemaining - 5;
    let msg = "";

    switch (action) {
      case 'BREAK_ROOM':
        setPosition('BREAK_ROOM');
        msg = "You enter the break room. It's empty. A good place to hide or plant a USB drop.";
        break;
      case 'SERVER_ROOM':
        if (state.inventory.includes('RUBBER_DUCKY_USB')) {
          msg = "You approach the server room. The door is locked, but you slide the Rubber Ducky under the door into a floor port. Access granted.";
          setPosition('SERVER_ROOM');
          setTimeout(nextPhase, 3000);
        } else {
          msg = "The server room door is locked. Biometric scanner active. You need a way in.";
          newSuspicion += 10;
        }
        break;
      case 'WAIT':
        msg = "You wait in the shadows. The guard passes by without noticing you.";
        newTime -= 15;
        break;
      case 'TAILGATE':
        msg = "You wait for an employee and catch the server room door before it closes. You're in.";
        newTime -= 30;
        newSuspicion += 30;
        setPosition('SERVER_ROOM');
        setTimeout(nextPhase, 3000);
        break;
      case 'USB_DROP':
        if (state.inventory.includes('RUBBER_DUCKY_USB')) {
          msg = "You leave the baited USB drive on the break room table. Someone might plug it in later.";
          updateState({ inventory: state.inventory.filter(i => i !== 'RUBBER_DUCKY_USB') });
        } else {
          msg = "You don't have a USB drop.";
        }
        break;
    }

    updateState({
      resources: {
        ...state.resources,
        suspicion: newSuspicion,
        timeRemaining: newTime
      }
    });

    addLog(msg);

    if (newSuspicion >= 100) {
      setTimeout(() => gameOver("Spotted by a guard in the hallway."), 2000);
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 w-full">
      <div className="mb-2 crt-text text-sm font-bold text-green-400">
        YOU ARE: {position}
      </div>

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

      {!isTyping && position !== 'SERVER_ROOM' && (
        <div className="flex flex-col gap-2 mt-auto border-t border-current pt-4">
          {position === 'HALLWAY' && (
            <>
              <div className="menu-item" onClick={() => handleAction('BREAK_ROOM')}>1. Move NORTH to Break Room</div>
              <div className="menu-item" onClick={() => handleAction('SERVER_ROOM')}>2. Move SOUTH to Server Room</div>
              <div className="menu-item" onClick={() => handleAction('WAIT')}>3. Wait and observe</div>
              <div className="menu-item" onClick={() => handleAction('TAILGATE')}>4. Tailgate an employee (High Risk)</div>
            </>
          )}
          {position === 'BREAK_ROOM' && (
            <>
              <div className="menu-item" onClick={() => handleAction('USB_DROP')}>1. Plant USB Drop on table</div>
              <div className="menu-item" onClick={() => setPosition('HALLWAY')}>2. Return to Hallway</div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
