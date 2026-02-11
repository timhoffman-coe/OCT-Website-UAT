import { ITSTeamPageData } from './its-shared';

export const technologyInfrastructureOperationsData: ITSTeamPageData = {
  teamName: 'Technology Infrastructure Operations',
  teamShortName: 'Infrastructure Operations',
  portfolios: [
    {
      icon: 'Database',
      title: 'Database Management',
      description: 'Supporting the City database environment with reliable, secure data storage and retrieval.',
      href: '/technology-infrastructure-operations/database',
    },
    {
      icon: 'Server',
      title: 'Server Solutions & Automation',
      description: 'OS, storage, printing, data protection, and automated infrastructure management.',
      href: '/technology-infrastructure-operations/server-solutions',
    },
    {
      icon: 'Layers',
      title: 'Virtualization',
      description: 'Server infrastructure and virtualization platforms for efficient resource utilization.',
      href: '/technology-infrastructure-operations/virtualization',
    },
  ],
  teamTabs: [
    {
      id: 'database',
      label: 'Database',
      videoTitle: 'Database Management Overview',
      videoDescription: 'Watch this overview of our database management services and architecture.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      diagramsTitle: 'Database Diagrams',
      diagramsDescription: 'View detailed diagrams for database infrastructure.',
      diagramLinks: [
        { label: 'Database Architecture', href: '#' },
        { label: 'Backup & Recovery', href: '#' },
        { label: 'High Availability', href: '#' },
      ],
    },
    {
      id: 'server',
      label: 'Server Solutions',
      videoTitle: 'Server Solutions Overview',
      videoDescription: 'Watch this overview of our server solutions and automation services.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      diagramsTitle: 'Server Diagrams',
      diagramsDescription: 'View detailed diagrams for server infrastructure.',
      diagramLinks: [
        { label: 'Server Architecture', href: '#' },
        { label: 'Storage Systems', href: '#' },
        { label: 'Automation Workflows', href: '#' },
      ],
    },
    {
      id: 'virtualization',
      label: 'Virtualization',
      videoTitle: 'Virtualization Overview',
      videoDescription: 'Watch this overview of our virtualization platforms and services.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      diagramsTitle: 'Platform Diagrams',
      diagramsDescription: 'View detailed diagrams for virtualization platforms.',
      diagramLinks: [
        { label: 'VMware Infrastructure', href: '#' },
        { label: 'Hyper-V Environment', href: '#' },
        { label: 'Container Platforms', href: '#' },
      ],
    },
  ],
  trelloBoards: [
    {
      title: 'Infrastructure Operations',
      description: 'High-level work priorities for the Infrastructure Operations team.',
      href: '#',
    },
    {
      title: 'Database Projects',
      description: 'Tracking for ongoing database projects and initiatives.',
      href: '#',
    },
    {
      title: 'Server & Virtualization',
      description: 'Tracking server and virtualization projects.',
      href: '#',
    },
  ],
  teamMembers: [
    {
      name: 'First Last',
      title: 'Manager, Technology Infrastructure Operations',
      email: 'firstname.lastname@edmonton.ca',
    },
    {
      name: 'First Last',
      title: 'Team Lead, Database Management',
      email: 'firstname.lastname@edmonton.ca',
    },
    {
      name: 'First Last',
      title: 'Team Lead, Server Solutions',
      email: 'firstname.lastname@edmonton.ca',
    },
  ],
};
