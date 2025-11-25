'use client';

import PortfolioSubpageTemplate, {
  ServiceCard,
  Initiative,
  Contact,
  QuickLink,
} from '@/components/its-shared/PortfolioSubpageTemplate';
import { ClipboardList } from 'lucide-react';

const services: ServiceCard[] = [
  {
    title: 'Incident Management',
    items: [
      'Incident tracking and resolution',
      'Severity classification',
      'Escalation procedures',
    ],
  },
  {
    title: 'Change Management',
    items: [
      'Change request processing',
      'CAB coordination',
      'Change scheduling',
    ],
  },
  {
    title: 'Problem Management',
    items: [
      'Root cause analysis',
      'Known error database',
      'Proactive problem identification',
    ],
  },
  {
    title: 'ITSM Platform',
    items: [
      'Remedy administration',
      'CMDB management',
      'Process automation',
    ],
  },
];

const initiatives: Initiative[] = [
  {
    title: 'ITSM Platform Upgrade',
    description: 'Upgrading Helix ITSM platform to latest version with enhanced capabilities.',
    href: '#',
  },
  {
    title: 'Process Automation',
    description: 'Implementing automated workflows to reduce manual effort in service management.',
    href: '#',
  },
];

const contacts: Contact[] = [
  {
    name: 'First Last',
    role: 'Manager, Service Management Office',
    email: 'firstname.lastname@edmonton.ca',
  },
  {
    name: 'First Last',
    role: 'ITSM Process Lead',
    email: 'firstname.lastname@edmonton.ca',
  },
];

const quickLinks: QuickLink[] = [
  {
    label: 'Submit Change Request',
    description: 'Request a change to production systems.',
    href: '#',
  },
  {
    label: 'Helix (Remedy) SmartIT',
    description: 'Access the ITSM platform.',
    href: '#',
  },
  {
    label: 'Change Calendar',
    description: 'View scheduled changes and outages.',
    href: '#',
    isSecure: true,
  },
];

export default function ServiceManagementOfficePage() {
  return (
    <PortfolioSubpageTemplate
      parentTeam="Service Delivery and Analytics"
      parentTeamHref="/service-delivery"
      title="Service Management Office"
      description="We manage Change, Problem, and Incident Management processes, maintaining the CMDB and supporting the Remedy ITSM platform to ensure efficient IT service delivery."
      icon={ClipboardList}
      services={services}
      initiatives={initiatives}
      contacts={contacts}
      quickLinks={quickLinks}
    />
  );
}
