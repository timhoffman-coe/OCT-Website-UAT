'use client';

import React, { useState } from 'react';
import { GameState } from './types';
import { Typewriter } from './Typewriter';

interface ReconProps {
  state: GameState;
  updateState: (updates: Partial<GameState>) => void;
  nextPhase: () => void;
}

export const Recon: React.FC<ReconProps> = ({ state, updateState, nextPhase }) => {
  const [log, setLog] = useState<string[]>([
    "PHASE 1: RECONNAISSANCE",
    "Target: City of Edmonton Data Center",
    "Objective: Gather intel and acquire tools."
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inStore, setInStore] = useState(false);

  const addLog = (msg: string) => {
    setLog(prev => [...prev, msg]);
    setIsTyping(true);
  };

  const handleAction = (action: string) => {
    if (isTyping) return;

    let newSuspicion = state.resources.suspicion;
    let newTime = state.resources.timeRemaining;
    let newRep = state.resources.reputation;
    const newIntel = [...state.intel];
    const newInventory = [...state.inventory];
    let msg = "";

    switch (action) {
      case 'OSINT':
        newTime -= 60;
        if (!newIntel.includes('SHIFT_CHANGE_TIME')) {
          newIntel.push('SHIFT_CHANGE_TIME');
          msg = "Scraped LinkedIn profiles. Found security guard schedule. Shift change is 11 PM.";
        } else {
          msg = "Found nothing new. Just municipal budget reports.";
        }
        break;
      case 'DUMPSTER':
        newTime -= 30;
        newSuspicion += 10;
        if (!newIntel.includes('HVAC_VENDOR_NAME')) {
          newIntel.push('HVAC_VENDOR_NAME');
          msg = "Found discarded work orders. HVAC vendor is Northland Mechanical.";
        } else {
          msg = "Found half-eaten donair. Nothing useful.";
        }
        break;
      case 'STORE':
        setInStore(true);
        addLog("Handler: 'What do you need? I've got some gear that might help.'");
        return;
      case 'BUY_USB':
        if (newRep >= 5) {
          newRep -= 5;
          newInventory.push('RUBBER_DUCKY_USB');
          msg = "Purchased Rubber Ducky USB from handler. (-5 Rep)";
        } else {
          msg = "Handler: 'You can't afford that. Come back when you've got more rep.'";
        }
        setInStore(false);
        break;
      case 'BUY_VEST':
        if (newRep >= 5) {
          newRep -= 5;
          newInventory.push('HI_VIS_VEST');
          msg = "Purchased Hi-Vis Vest. Perfect for impersonating Northland Mechanical. (-5 Rep)";
        } else {
          msg = "Handler: 'You can't afford that. Come back when you've got more rep.'";
        }
        setInStore(false);
        break;
      case 'LEAVE_STORE':
        setInStore(false);
        addLog("You leave the supply store.");
        return;
      case 'PROCEED':
        nextPhase();
        return;
    }

    updateState({
      resources: {
        ...state.resources,
        suspicion: newSuspicion,
        timeRemaining: newTime,
        reputation: newRep
      },
      intel: newIntel,
      inventory: newInventory
    });
    addLog(msg);
  };

  const hasUsb = state.inventory.includes('RUBBER_DUCKY_USB');
  const hasVest = state.inventory.includes('HI_VIS_VEST');
  const knowsVendor = state.intel.includes('HVAC_VENDOR_NAME');
  const storeEmpty = hasUsb && (hasVest || !knowsVendor);

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

      {!isTyping && !inStore && (
        <div className="flex flex-col gap-2 mt-auto border-t border-current pt-4">
          <div className="menu-item" onClick={() => handleAction('OSINT')}>1. OSINT Sweep (1h)</div>
          <div className="menu-item" onClick={() => handleAction('DUMPSTER')}>2. Dumpster Dive (30m, +Suspicion)</div>
          <div className="menu-item" onClick={() => handleAction('STORE')}>3. Visit Supply Store</div>
          <div className="menu-item mt-4" onClick={() => handleAction('PROCEED')}>4. Proceed to Infiltration</div>
        </div>
      )}

      {!isTyping && inStore && (
        <div className="flex flex-col gap-2 mt-auto border-t border-current pt-4">
          <div className="crt-text-dim text-xs mb-1">SUPPLY STORE — Your Rep: {state.resources.reputation}</div>
          {!hasUsb && (
            <div className="menu-item" onClick={() => handleAction('BUY_USB')}>1. Rubber Ducky USB (5 Rep)</div>
          )}
          {knowsVendor && !hasVest && (
            <div className="menu-item" onClick={() => handleAction('BUY_VEST')}>2. Hi-Vis Vest — Northland Mechanical style (5 Rep)</div>
          )}
          {storeEmpty && (
            <div className="crt-text-dim text-xs">Nothing left to buy.</div>
          )}
          <div className="menu-item mt-2" onClick={() => handleAction('LEAVE_STORE')}>0. Leave Store</div>
        </div>
      )}
    </div>
  );
};
