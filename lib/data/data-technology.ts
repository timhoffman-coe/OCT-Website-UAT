import { Network, Server, Smartphone } from 'lucide-react';
import { ITSTeamPageData } from './its-shared';

export const dataTechnologyData: ITSTeamPageData = {
  teamName: 'Data Technology',
  teamShortName: 'Data Technology',
  portfolios: [
    {
      icon: Network,
      title: 'Network Services',
      description: 'Core network, connectivity, security perimeter, and traffic management.',
      href: '/data-technology/network-services',
    },
    {
      icon: Server,
      title: 'Data Centre',
      description: 'Compute, storage, backup, recovery, and hosting platforms.',
      href: '/data-technology/data-centre',
    },
    {
      icon: Smartphone,
      title: 'Voice, Mobility & IoT',
      description: 'Corporate voice, mobile fleet, radio, and smart/connected devices.',
      href: '/data-technology/voice-mobility-iot',
    },
  ],
  teamTabs: [
    {
      id: 'network',
      label: 'Network',
      videoTitle: 'Network Architecture',
      videoDescription: 'Watch this overview of our core network services and architecture.',
      videoUrl: 'https://drive.google.com/file/d/1RyjeaKqtnKkBT9PhGvUTM1QmXbYvDWnW/preview',
      diagramsTitle: 'Network Diagrams',
      diagramsDescription: 'View detailed diagrams for core network segments.',
      diagramLinks: [
        { label: 'Data Centre', href: '#' },
        { label: 'Campus', href: '#' },
        { label: 'Cloud', href: '#' },
        { label: 'Partners', href: '#' },
      ],
    },
    {
      id: 'voice-mobility',
      label: 'Voice & Mobility',
      videoTitle: 'Voice & Mobility Overview',
      videoDescription: 'Watch this overview of our corporate voice, mobile, and IoT services.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      diagramsTitle: 'Service Diagrams',
      diagramsDescription: 'View detailed diagrams for core services.',
      diagramLinks: [
        { label: 'Corporate Voice', href: '#' },
        { label: 'Mobile Fleet', href: '#' },
        { label: 'IoT Platform', href: '#' },
      ],
    },
    {
      id: 'data-centre',
      label: 'Data Centre',
      videoTitle: 'Data Centre Architecture',
      videoDescription: 'Watch this overview of our compute, storage, and hosting platforms.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      diagramsTitle: 'Platform Diagrams',
      diagramsDescription: 'View detailed diagrams for core platforms.',
      diagramLinks: [
        { label: 'Compute', href: '#' },
        { label: 'Storage & Backup', href: '#' },
        { label: 'Hosting (PaaS/IaaS)', href: '#' },
      ],
    },
    {
      id: 'app-delivery',
      label: 'Application Delivery',
      videoTitle: 'Application Delivery Overview',
      videoDescription: 'Watch this overview of our application delivery and support services.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      diagramsTitle: 'Service Diagrams',
      diagramsDescription: 'View detailed diagrams for core services.',
      diagramLinks: [
        { label: 'CI/CD Pipeline', href: '#' },
        { label: 'App Support Model', href: '#' },
        { label: 'Database Services', href: '#' },
      ],
    },
  ],
  trelloBoards: [
    {
      title: 'Network Services',
      description: 'High-level work priorities for the Network Services team.',
      href: 'https://trello.com/b/5qMgG2C2/network-services-work-priorities',
    },
    {
      title: 'Fibre Project',
      description: 'Tracking for the ongoing Network Services Fibre project.',
      href: 'https://trello.com/b/iukW90n7/network-services-fibre',
    },
    {
      title: 'Project/Initiatives requiring Network',
      description: 'Tracking other projects and initiatives that require Network team support.',
      href: 'https://trello.com/b/rlaQyc0m/projects-initiatives-requiring-network',
    },
  ],
  teamMembers: [
    {
      name: 'First Last',
      title: 'Director, Data Technology',
      email: 'firstname.lastname@edmonton.ca',
    },
    {
      name: 'First Last',
      title: 'Manager, Network Services',
      email: 'firstname.lastname@edmonton.ca',
    },
    {
      name: 'First Last',
      title: 'Manager, Data Centre & Voice',
      email: 'firstname.lastname@edmonton.ca',
    },
  ],
};
