'use client';

import PortfolioSubpageTemplate, {
  ServiceCard,
  Initiative,
  Contact,
  QuickLink,
} from '@/components/its-shared/PortfolioSubpageTemplate';
import { Server } from 'lucide-react';

const services: ServiceCard[] = [
  {
    title: 'Operating Systems',
    items: [
      'Windows Server administration',
      'Linux server management',
      'OS patching and updates',
    ],
  },
  {
    title: 'Storage Solutions',
    items: [
      'SAN/NAS management',
      'Storage provisioning',
      'Capacity planning',
    ],
  },
  {
    title: 'Data Protection',
    items: [
      'Backup operations',
      'Disaster recovery',
      'Data replication',
    ],
  },
  {
    title: 'Print Services',
    items: [
      'Print server management',
      'Printer deployment',
      'Print queue administration',
    ],
  },
];

const initiatives: Initiative[] = [
  {
    title: 'Server Automation Program',
    description: 'Implementing infrastructure-as-code for automated server provisioning and configuration.',
    href: '#',
  },
  {
    title: 'Storage Tier Optimization',
    description: 'Migrating data to appropriate storage tiers based on access patterns and requirements.',
    href: '#',
  },
];

const contacts: Contact[] = [
  {
    name: 'First Last',
    role: 'Manager, Server Solutions',
    email: 'firstname.lastname@edmonton.ca',
  },
  {
    name: 'First Last',
    role: 'Senior Systems Administrator',
    email: 'firstname.lastname@edmonton.ca',
  },
];

const quickLinks: QuickLink[] = [
  {
    label: 'Server Request Form',
    description: 'Request new servers or modifications.',
    href: '#',
  },
  {
    label: 'Storage Dashboard',
    description: 'Monitor storage capacity and usage.',
    href: '#',
  },
  {
    label: 'Backup Restore Request',
    description: 'Submit file or system restoration requests.',
    href: '#',
    isSecure: true,
  },
];

export default function ServerSolutionsPage() {
  return (
    <PortfolioSubpageTemplate
      parentTeam="Technology Infrastructure Operations"
      parentTeamHref="/technology-infrastructure-operations"
      title="Server Solutions & Automation"
      description="We manage the City's server infrastructure including operating systems, storage, printing, and data protection services, with a focus on automation and process improvements."
      icon={Server}
      services={services}
      initiatives={initiatives}
      contacts={contacts}
      quickLinks={quickLinks}
    />
  );
}
