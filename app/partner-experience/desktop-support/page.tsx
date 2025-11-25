'use client';

import PortfolioSubpageTemplate, {
  ServiceCard,
  Initiative,
  Contact,
  QuickLink,
} from '@/components/its-shared/PortfolioSubpageTemplate';
import { Wrench } from 'lucide-react';

const services: ServiceCard[] = [
  {
    title: 'Hardware Support',
    items: [
      'Computer repairs',
      'Peripheral troubleshooting',
      'Hardware replacement',
    ],
  },
  {
    title: 'Software Support',
    items: [
      'Application troubleshooting',
      'Software installation',
      'Configuration issues',
    ],
  },
  {
    title: 'Workspace Setup',
    items: [
      'New employee setup',
      'Desk relocations',
      'Equipment deployment',
    ],
  },
  {
    title: 'Field Services',
    items: [
      'On-site support visits',
      'Multi-facility coverage',
      'Emergency response',
    ],
  },
];

const initiatives: Initiative[] = [
  {
    title: 'Mobile Technician Program',
    description: 'Deploying mobile support teams for faster on-site response times.',
    href: '#',
  },
  {
    title: 'Hardware Lifecycle Management',
    description: 'Implementing proactive hardware refresh cycles to reduce break-fix incidents.',
    href: '#',
  },
];

const contacts: Contact[] = [
  {
    name: 'First Last',
    role: 'Manager, Desktop Support',
    email: 'firstname.lastname@edmonton.ca',
  },
  {
    name: 'First Last',
    role: 'Team Lead, Field Services',
    email: 'firstname.lastname@edmonton.ca',
  },
];

const quickLinks: QuickLink[] = [
  {
    label: 'Request On-Site Support',
    description: 'Schedule a technician visit.',
    href: '#',
  },
  {
    label: 'Hardware Request Form',
    description: 'Request new or replacement hardware.',
    href: '#',
  },
  {
    label: 'Equipment Return',
    description: 'Schedule equipment pickup or return.',
    href: '#',
    isSecure: true,
  },
];

export default function DesktopSupportPage() {
  return (
    <PortfolioSubpageTemplate
      parentTeam="Partner Experience"
      parentTeamHref="/partner-experience"
      title="Desktop Support"
      description="We provide in-person break-fix services for hardware and software issues across City facilities. Our field technicians are available to resolve complex issues that cannot be handled remotely."
      icon={Wrench}
      services={services}
      initiatives={initiatives}
      contacts={contacts}
      quickLinks={quickLinks}
    />
  );
}
