'use client';

import PortfolioSubpageTemplate, {
  ServiceCard,
  Initiative,
  Contact,
  QuickLink,
} from '@/components/its-shared/PortfolioSubpageTemplate';
import { Layers } from 'lucide-react';

const services: ServiceCard[] = [
  {
    title: 'VMware Infrastructure',
    items: [
      'vSphere cluster management',
      'VM provisioning',
      'Resource allocation',
    ],
  },
  {
    title: 'Hyper-V Services',
    items: [
      'Microsoft virtualization',
      'Failover clustering',
      'Live migration',
    ],
  },
  {
    title: 'Virtual Desktop (VDI)',
    items: [
      'Horizon desktop pools',
      'Application virtualization',
      'Remote access solutions',
    ],
  },
  {
    title: 'Container Services',
    items: [
      'Kubernetes orchestration',
      'Container registry',
      'Microservices hosting',
    ],
  },
];

const initiatives: Initiative[] = [
  {
    title: 'Hybrid Cloud Integration',
    description: 'Extending virtualization platform to support hybrid cloud workloads.',
    href: '#',
  },
  {
    title: 'VDI Refresh Project',
    description: 'Upgrading virtual desktop infrastructure for improved performance and user experience.',
    href: '#',
  },
];

const contacts: Contact[] = [
  {
    name: 'First Last',
    role: 'Manager, Virtualization Services',
    email: 'firstname.lastname@edmonton.ca',
  },
  {
    name: 'First Last',
    role: 'Senior Virtualization Engineer',
    email: 'firstname.lastname@edmonton.ca',
  },
];

const quickLinks: QuickLink[] = [
  {
    label: 'VM Request Form',
    description: 'Request new virtual machines.',
    href: '#',
  },
  {
    label: 'vCenter Dashboard',
    description: 'Monitor virtualization infrastructure.',
    href: '#',
  },
  {
    label: 'VDI Access Request',
    description: 'Request virtual desktop access.',
    href: '#',
    isSecure: true,
  },
];

export default function VirtualizationPage() {
  return (
    <PortfolioSubpageTemplate
      parentTeam="Technology Infrastructure Operations"
      parentTeamHref="/technology-infrastructure-operations"
      title="Virtualization"
      description="We manage the City's virtualization platforms including VMware, Hyper-V, and container services, enabling efficient resource utilization and flexible infrastructure deployment."
      icon={Layers}
      services={services}
      initiatives={initiatives}
      contacts={contacts}
      quickLinks={quickLinks}
    />
  );
}
