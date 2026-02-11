import { ITSTeamPageData } from './its-shared';

export const partnerExperienceData: ITSTeamPageData = {
  teamName: 'Partner Experience',
  teamShortName: 'Partner Experience',
  portfolios: [
    {
      icon: 'Headphones',
      title: 'Service Desk',
      description: 'IT assistance via tickets and calls, providing remote troubleshooting and support.',
      href: '/partner-experience/service-desk',
    },
    {
      icon: 'Wrench',
      title: 'Desktop Support',
      description: 'In-person break-fix services for hardware and software issues.',
      href: '/partner-experience/desktop-support',
    },
    {
      icon: 'Monitor',
      title: 'Desktop Administration',
      description: 'Managing approximately 12,000 computing devices across the City.',
      href: '/partner-experience/desktop-administration',
    },
  ],
  teamTabs: [
    {
      id: 'service-desk',
      label: 'Service Desk',
      videoTitle: 'Service Desk Overview',
      videoDescription: 'Watch this overview of our Service Desk operations and support services.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      diagramsTitle: 'Service Diagrams',
      diagramsDescription: 'View detailed diagrams for Service Desk operations.',
      diagramLinks: [
        { label: 'Ticket Workflow', href: '#' },
        { label: 'Escalation Process', href: '#' },
        { label: 'SLA Guidelines', href: '#' },
      ],
    },
    {
      id: 'desktop-support',
      label: 'Desktop Support',
      videoTitle: 'Desktop Support Overview',
      videoDescription: 'Watch this overview of our Desktop Support services and processes.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      diagramsTitle: 'Support Diagrams',
      diagramsDescription: 'View detailed diagrams for Desktop Support processes.',
      diagramLinks: [
        { label: 'Break-Fix Process', href: '#' },
        { label: 'Hardware Lifecycle', href: '#' },
        { label: 'Field Support Areas', href: '#' },
      ],
    },
    {
      id: 'desktop-admin',
      label: 'Desktop Administration',
      videoTitle: 'Desktop Administration Overview',
      videoDescription: 'Watch this overview of our Desktop Administration and device management.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      diagramsTitle: 'Administration Diagrams',
      diagramsDescription: 'View detailed diagrams for Desktop Administration.',
      diagramLinks: [
        { label: 'Device Management', href: '#' },
        { label: 'Patch Management', href: '#' },
        { label: 'Software Deployment', href: '#' },
      ],
    },
  ],
  trelloBoards: [
    {
      title: 'Partner Experience',
      description: 'High-level work priorities for the Partner Experience team.',
      href: '#',
    },
    {
      title: 'Service Desk Operations',
      description: 'Tracking Service Desk initiatives and improvements.',
      href: '#',
    },
    {
      title: 'Desktop Projects',
      description: 'Tracking desktop support and administration projects.',
      href: '#',
    },
  ],
  teamMembers: [
    {
      name: 'First Last',
      title: 'Manager, Partner Experience',
      email: 'firstname.lastname@edmonton.ca',
    },
    {
      name: 'First Last',
      title: 'Team Lead, Service Desk',
      email: 'firstname.lastname@edmonton.ca',
    },
    {
      name: 'First Last',
      title: 'Team Lead, Desktop Support',
      email: 'firstname.lastname@edmonton.ca',
    },
  ],
};
