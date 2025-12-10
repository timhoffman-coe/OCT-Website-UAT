import { LucideIcon } from 'lucide-react';

// Type definitions for ITS shared data structures
export interface Portfolio {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

export interface DiagramLink {
  label: string;
  href: string;
}

export interface TeamTab {
  id: string;
  label: string;
  videoTitle: string;
  videoDescription: string;
  videoUrl: string;
  diagramsTitle: string;
  diagramsDescription: string;
  diagramLinks: DiagramLink[];
}

export interface AccordionLink {
  label: string;
  href: string;
}

export interface AccordionItem {
  id: string;
  title: string;
  links: AccordionLink[];
}

export interface TrelloBoard {
  title: string;
  description: string;
  href: string;
}

export interface TeamMember {
  name: string;
  title: string;
  email: string;
}

export interface ITSTeamPageData {
  teamName: string;
  teamShortName: string;
  portfolios: Portfolio[];
  teamTabs: TeamTab[];
  trelloBoards: TrelloBoard[];
  teamMembers: TeamMember[];
}

// Shared important links used across all ITS team pages
export const sharedImportantLinks: AccordionItem[] = [
  {
    id: 'incident',
    title: 'Incident Management',
    links: [
      { label: 'Helix (Remedy) SmartIT', href: '#' },
      { label: 'Helix (Remedy) DWP', href: '#' },
      { label: 'Incident Management Process', href: '#' },
      { label: 'WO from Incident Ticket', href: '#' },
      { label: 'Incident Management Flow Charts', href: '#' },
      { label: 'Problem Mgmt Process Guide', href: '#' },
      { label: 'Root Cause Analysis (RCA)', href: '#' },
    ],
  },
  {
    id: 'change',
    title: 'Change Management',
    links: [
      { label: 'OCT Change Management', href: '#' },
      { label: 'OCT Schedule Outages', href: '#' },
      { label: 'Severity 1 Procedures', href: '#' },
      { label: 'OCT Change Management Definitions', href: '#' },
      { label: 'Change Approval - Form', href: '#' },
      { label: 'Work Order vs Change Ticket', href: '#' },
      { label: 'Remedy Definitions', href: '#' },
      { label: 'Change Ticket Cheat Sheet', href: '#' },
    ],
  },
  {
    id: 'resource',
    title: 'Resource Management',
    links: [
      { label: 'Taleo', href: '#' },
      { label: 'Recruitment Toolkit', href: '#' },
      { label: 'Recruitment Approval Process User Guide', href: '#' },
      { label: 'Recruitment Approval Form', href: '#' },
      { label: 'SAP Time Entry Request', href: '#' },
      { label: 'New Account Request', href: '#' },
      { label: 'Phone Request', href: '#' },
      { label: 'Offboarding Link', href: '#' },
      { label: 'Supervisor Offboarding Checklist', href: '#' },
    ],
  },
  {
    id: 'its-links',
    title: 'ITS Team Sites & Other Links',
    links: [
      { label: 'ITS Service Catalog', href: '#' },
      { label: 'Technology Infrastructure Operations', href: '#' },
      { label: 'Service Desk', href: '#' },
      { label: 'Service Management Office', href: '#' },
      { label: 'Enterprise Commons Project', href: '#' },
      { label: 'OCT Employee Links', href: '#' },
      { label: 'Technology PMO', href: '#' },
      { label: 'Open Data Portal', href: '#' },
      { label: 'Open City', href: '#' },
    ],
  },
];
