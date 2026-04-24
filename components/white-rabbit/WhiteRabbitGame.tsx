'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GameState, INITIAL_STATE, GamePhase } from './types';
import { BootScreen } from './BootScreen';
import { TitleScreen } from './TitleScreen';
import { NameEntry } from './NameEntry';
import { Recon } from './Recon';
import { Social } from './Social';
import { Physical } from './Physical';
import { Network } from './Network';
import { Exfil } from './Exfil';
import { Score } from './Score';
import { HUD } from './HUD';

export default function WhiteRabbitGame() {
  const router = useRouter();
  const [state, setState] = useState<GameState>(INITIAL_STATE);
  const [deathReason, setDeathReason] = useState<string | undefined>();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.push('/');
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [router]);

  const updateState = (updates: Partial<GameState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const setPhase = (phase: GamePhase) => {
    updateState({ phase });
  };

  const handleGameOver = (reason: string) => {
    setDeathReason(reason);
    setPhase('SCORE');
  };

  const handleRestart = () => {
    setDeathReason(undefined);
    setState({ ...INITIAL_STATE, phosphorMode: state.phosphorMode });
  };

  const renderPhase = () => {
    switch (state.phase) {
      case 'BOOT':
        return <BootScreen onComplete={() => setPhase('TITLE')} />;
      case 'TITLE':
        return (
          <TitleScreen
            onStart={() => setPhase('NAME_ENTRY')}
            onTogglePhosphor={() => updateState({ phosphorMode: state.phosphorMode === 'green' ? 'amber' : 'green' })}
            phosphorMode={state.phosphorMode}
          />
        );
      case 'NAME_ENTRY':
        return <NameEntry onComplete={(name) => updateState({ playerName: name, phase: 'RECON' })} />;
      case 'RECON':
        return <Recon state={state} updateState={updateState} nextPhase={() => setPhase('SOCIAL')} />;
      case 'SOCIAL':
        return <Social state={state} updateState={updateState} nextPhase={() => setPhase('PHYSICAL')} gameOver={handleGameOver} />;
      case 'PHYSICAL':
        return <Physical state={state} updateState={updateState} nextPhase={() => setPhase('NETWORK')} gameOver={handleGameOver} />;
      case 'NETWORK':
        return <Network state={state} updateState={updateState} nextPhase={() => setPhase('EXFIL')} gameOver={handleGameOver} />;
      case 'EXFIL':
        return <Exfil state={state} updateState={updateState} nextPhase={() => setPhase('SCORE')} gameOver={handleGameOver} />;
      case 'SCORE':
        return <Score state={state} onRestart={handleRestart} deathReason={deathReason} />;
      default:
        return <div>UNKNOWN PHASE</div>;
    }
  };

  const showHUD = !['BOOT', 'TITLE', 'NAME_ENTRY', 'SCORE'].includes(state.phase);

  return (
    <div className={`white-rabbit-root ${state.phosphorMode === 'amber' ? 'amber-mode' : ''}`}>
      <div className="flex flex-col items-end" style={{ width: '100%', maxWidth: 800 }}>
        <button
          onClick={() => router.push('/')}
          className="mb-2 transition-colors text-xs cursor-pointer bg-transparent border-none crt-text-dim hover:text-current"
          style={{ fontFamily: 'inherit' }}
        >
          [ESC] EXIT
        </button>
        <div className="crt-container" style={{ maxWidth: '100%' }}>
          {renderPhase()}
          {showHUD && <HUD state={state} />}
        </div>
      </div>
    </div>
  );
}
