export enum Quarter {
  Q1 = 1,
  Q2 = 2,
  Q3 = 3,
  Q4 = 4,
}

export type CategoryType =
  | 'Cyber Security'
  | 'Application Technology Services'
  | 'Integrated Technology Solutions'
  | 'Project Management Office';

export interface Project {
  id: string;
  name: string;
  owner: string; // The person responsible (e.g., "James", or "Team A")
  startYear: number; // 1, 2, 3, or 4
  endYear: number;   // 1, 2, 3, or 4
  startQuarter: Quarter;
  endQuarter: Quarter;
  progress: number; // 0-100
  description?: string;
}

export interface RoadmapSection {
  id: string;
  title: CategoryType;
  color: string; // Color theme name (e.g., 'watermelon', 'sea-green')
  projects: Project[];
}

export interface AppState {
  currentYear: number;
  sections: RoadmapSection[];
}
