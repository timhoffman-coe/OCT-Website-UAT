'use client';

import PortfolioSubpageTemplate, {
  ServiceCard,
  Initiative,
  Contact,
  QuickLink,
} from '@/components/its-shared/PortfolioSubpageTemplate';
import { BarChart3 } from 'lucide-react';

const services: ServiceCard[] = [
  {
    title: 'Infrastructure Monitoring',
    items: [
      'Server health monitoring',
      'Network device monitoring',
      'Storage capacity tracking',
    ],
  },
  {
    title: 'Application Monitoring',
    items: [
      'Application performance',
      'Synthetic monitoring',
      'End-user experience',
    ],
  },
  {
    title: 'Alerting & Response',
    items: [
      'Automated alerting',
      'On-call escalation',
      'Incident notification',
    ],
  },
  {
    title: 'Analytics & Reporting',
    items: [
      'Custom dashboards',
      'Trend analysis',
      'AI-powered insights',
    ],
  },
];

const initiatives: Initiative[] = [
  {
    title: 'AIOps Implementation',
    description: 'Deploying AI-powered operations for predictive monitoring and anomaly detection.',
    href: '#',
  },
  {
    title: 'Unified Monitoring Platform',
    description: 'Consolidating monitoring tools into a single pane of glass for IT operations.',
    href: '#',
  },
];

const contacts: Contact[] = [
  {
    name: 'First Last',
    role: 'Manager, Monitoring & Analytics',
    email: 'firstname.lastname@edmonton.ca',
  },
  {
    name: 'First Last',
    role: 'Senior Monitoring Engineer',
    email: 'firstname.lastname@edmonton.ca',
  },
];

const quickLinks: QuickLink[] = [
  {
    label: 'Operations Dashboard',
    description: 'View real-time infrastructure status.',
    href: '#',
  },
  {
    label: 'Alert History',
    description: 'Review recent alerts and incidents.',
    href: '#',
  },
  {
    label: 'Custom Report Request',
    description: 'Request custom analytics reports.',
    href: '#',
    isSecure: true,
  },
];

export default function MonitoringAnalyticsPage() {
  return (
    <PortfolioSubpageTemplate
      parentTeam="Service Delivery and Analytics"
      parentTeamHref="/service-delivery"
      title="Monitoring & Analytics"
      description="We provide reliable monitoring platforms for IT infrastructure, networks, applications, and user interfaces with modern alerting, dashboards, and AI-powered analysis tools."
      icon={BarChart3}
      services={services}
      initiatives={initiatives}
      contacts={contacts}
      quickLinks={quickLinks}
    />
  );
}
