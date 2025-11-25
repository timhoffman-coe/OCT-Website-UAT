'use client';

import PortfolioSubpageTemplate, {
  ServiceCard,
  Initiative,
  Contact,
  QuickLink,
} from '@/components/its-shared/PortfolioSubpageTemplate';
import { Database } from 'lucide-react';

const services: ServiceCard[] = [
  {
    title: 'Database Administration',
    items: [
      'SQL Server management',
      'Oracle database support',
      'PostgreSQL operations',
    ],
  },
  {
    title: 'Performance Optimization',
    items: [
      'Query tuning and analysis',
      'Index management',
      'Resource monitoring',
    ],
  },
  {
    title: 'High Availability',
    items: [
      'Always-On clustering',
      'Database replication',
      'Failover configuration',
    ],
  },
  {
    title: 'Security & Compliance',
    items: [
      'Access control management',
      'Data encryption',
      'Audit logging',
    ],
  },
];

const initiatives: Initiative[] = [
  {
    title: 'Database Modernization',
    description: 'Migrating legacy databases to modern platforms with improved performance and security.',
    href: '#',
  },
  {
    title: 'Automated Patching Program',
    description: 'Implementing automated database patching to ensure security compliance.',
    href: '#',
  },
];

const contacts: Contact[] = [
  {
    name: 'First Last',
    role: 'Manager, Database Services',
    email: 'firstname.lastname@edmonton.ca',
  },
  {
    name: 'First Last',
    role: 'Senior Database Administrator',
    email: 'firstname.lastname@edmonton.ca',
  },
];

const quickLinks: QuickLink[] = [
  {
    label: 'Database Request Form',
    description: 'Request new databases or modifications.',
    href: '#',
  },
  {
    label: 'Performance Dashboard',
    description: 'Monitor database health and metrics.',
    href: '#',
  },
  {
    label: 'Data Recovery Request',
    description: 'Submit data restoration requests.',
    href: '#',
    isSecure: true,
  },
];

export default function DatabasePage() {
  return (
    <PortfolioSubpageTemplate
      parentTeam="Technology Infrastructure Operations"
      parentTeamHref="/technology-infrastructure-operations"
      title="Database Management"
      description="We support the City's database environment, ensuring data services are reliable, secure, and performant. Our team manages SQL Server, Oracle, and PostgreSQL platforms across the enterprise."
      icon={Database}
      services={services}
      initiatives={initiatives}
      contacts={contacts}
      quickLinks={quickLinks}
    />
  );
}
