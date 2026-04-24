export type GamePhase =
  | 'BOOT'
  | 'TITLE'
  | 'NAME_ENTRY'
  | 'RECON'
  | 'SOCIAL'
  | 'PHYSICAL'
  | 'NETWORK'
  | 'EXFIL'
  | 'SCORE';

export interface GameState {
  phase: GamePhase;
  playerName: string;
  phosphorMode: 'green' | 'amber';
  resources: {
    suspicion: number; // 0-100
    timeRemaining: number; // in minutes
    reputation: number;
    nerve: number; // 0-100
  };
  inventory: string[];
  intel: string[];
  dataExfiltrated: number;
  honeypotsAvoided: number;
  history: string[];
}

export const INITIAL_STATE: GameState = {
  phase: 'BOOT',
  playerName: '',
  phosphorMode: 'green',
  resources: {
    suspicion: 0,
    timeRemaining: 8 * 60, // 8 hours
    reputation: 10,
    nerve: 100,
  },
  inventory: [],
  intel: [],
  dataExfiltrated: 0,
  honeypotsAvoided: 0,
  history: [],
};
