'use client';

import React, { useState, useEffect, useRef } from 'react';

interface NameEntryProps {
  onComplete: (name: string) => void;
}

export const NameEntry: React.FC<NameEntryProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onComplete(name.trim().toUpperCase());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="mb-8 text-center crt-text">
        <p>ENTER OPERATIVE ALIAS</p>
        <p className="text-xs crt-text-dim mt-2">(MAX 12 CHARACTERS)</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex items-center text-2xl">
          <span className="mr-2">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value.toUpperCase().slice(0, 12))}
            className="bg-transparent border-none outline-none text-current font-mono uppercase w-48"
            autoComplete="off"
            spellCheck="false"
          />
          <span className="cursor-blink ml-1">_</span>
        </div>
      </form>
    </div>
  );
};
