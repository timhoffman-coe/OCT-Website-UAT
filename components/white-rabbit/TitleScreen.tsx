'use client';

import React, { useState, useEffect } from 'react';

interface TitleScreenProps {
  onStart: () => void;
  onTogglePhosphor: () => void;
  phosphorMode: 'green' | 'amber';
}

export const TitleScreen: React.FC<TitleScreenProps> = ({ onStart, onTogglePhosphor, phosphorMode }) => {
  const [selectedOption, setSelectedOption] = useState(0);

  const options = [
    "Start New Campaign",
    `Toggle Phosphor: [${phosphorMode.toUpperCase()}]`,
    "View Leaderboard"
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        setSelectedOption(prev => (prev > 0 ? prev - 1 : options.length - 1));
      } else if (e.key === 'ArrowDown') {
        setSelectedOption(prev => (prev < options.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'Enter') {
        if (selectedOption === 0) onStart();
        if (selectedOption === 1) onTogglePhosphor();
        if (selectedOption === 2) alert("Leaderboard not implemented yet.");
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedOption, onStart, onTogglePhosphor, options.length]);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="text-center font-bold mb-8 crt-text text-4xl tracking-widest">
        HACK THE PLANET
      </div>

      <div className="flex flex-col items-center gap-4 mt-8">
        {options.map((option, i) => (
          <div
            key={i}
            className={`menu-item px-4 py-2 ${selectedOption === i ? 'selected' : ''}`}
            onClick={() => {
              if (i === 0) onStart();
              if (i === 1) onTogglePhosphor();
              if (i === 2) alert("Leaderboard not implemented yet.");
            }}
          >
            {selectedOption === i ? '> ' : '  '}{option}
          </div>
        ))}
      </div>

      <div className="mt-16 text-xs crt-text-dim text-center">
        (C) 2026 SHADOW BROKER SYNDICATE<br/>
        ALL RIGHTS RESERVED
      </div>
    </div>
  );
};
