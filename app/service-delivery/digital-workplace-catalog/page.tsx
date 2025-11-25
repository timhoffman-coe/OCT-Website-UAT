'use client';

import PortfolioSubpageTemplate, {
  ServiceCard,
  Initiative,
  Contact,
  QuickLink,
} from '@/components/its-shared/PortfolioSubpageTemplate';
import { FileText } from 'lucide-react';

const services: ServiceCard[] = [
  {
    title: 'Service Catalog',
    items: [
      'IT service offerings',
      'Service descriptions',
      'Request fulfillment',
    ],
  },
  {
    title: 'Work Order Management',
    items: [
      'Work order processing',
      'Task assignment',
      'Completion tracking',
    ],
  },
  {
    title: 'Catalog Maintenance',
    items: [
      'Service updates',
      'Pricing management',
      'SLA definitions',
    ],
  },
  {
    title: 'User Experience',
    items: [
      'Portal design',
      'Search optimization',
      'Category organization',
    ],
  },
];

const initiatives: Initiative[] = [
  {
    title: 'Catalog Modernization',
    description: 'Redesigning the Digital Workplace Catalog for improved user experience and discoverability.',
    href: '#',
  },
  {
    title: 'Automated Fulfillment',
    description: 'Implementing automated service fulfillment for common requests.',
    href: '#',
  },
];

const contacts: Contact[] = [
  {
    name: 'First Last',
    role: 'Manager, Digital Workplace',
    email: 'firstname.lastname@edmonton.ca',
  },
  {
    name: 'First Last',
    role: 'Catalog Administrator',
    email: 'firstname.lastname@edmonton.ca',
  },
];

const quickLinks: QuickLink[] = [
  {
    label: 'Digital Workplace Portal',
    description: 'Browse and request IT services.',
    href: '#',
  },
  {
    label: 'Service Request Status',
    description: 'Track your service requests.',
    href: '#',
  },
  {
    label: 'Catalog Feedback',
    description: 'Submit suggestions for new services.',
    href: '#',
    isSecure: true,
  },
];

export default function DigitalWorkplaceCatalogPage() {
  return (
    <PortfolioSubpageTemplate
      parentTeam="Service Delivery and Analytics"
      parentTeamHref="/service-delivery"
      title="Digital Workplace Catalog"
      description="We manage the Digital Workplace Catalog and Work Order process, making it easy for City employees to discover and request IT services through a centralized, user-friendly portal."
      icon={FileText}
      services={services}
      initiatives={initiatives}
      contacts={contacts}
      quickLinks={quickLinks}
    />
  );
}
