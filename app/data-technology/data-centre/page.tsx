import PortfolioSubpageTemplate from '@/components/its-shared/PortfolioSubpageTemplate';
import { fetchPortfolioSubpage } from '@/lib/data/fetch-subpage';
import { Building2 } from 'lucide-react';

const fallback = {
  parentTeam: 'Data Technology',
  parentTeamHref: '/data-technology',
  title: 'Data Centre',
  description:
    'We manage the City\'s physical computing infrastructure, including on-premises data centres and colocation facilities, ensuring reliable, secure hosting for all City applications and services.',
  icon: Building2,
  services: [
    {
      title: 'Facility Management',
      items: [
        'Primary data centre operations',
        'Colocation site management',
        'Physical security controls',
      ],
    },
    {
      title: 'Power & Cooling',
      items: [
        'UPS and generator systems',
        'HVAC monitoring and control',
        'Environmental sensors',
      ],
    },
    {
      title: 'Rack & Cabling',
      items: [
        'Server rack provisioning',
        'Structured cabling standards',
        'Cable management systems',
      ],
    },
    {
      title: 'Disaster Recovery',
      items: [
        'Secondary site failover',
        'Backup power testing',
        'Business continuity planning',
      ],
    },
  ],
  initiatives: [
    {
      title: 'Data Centre Consolidation',
      description: 'Migrating workloads from legacy facilities to modernized infrastructure.',
      href: '#',
    },
    {
      title: 'Green IT Initiative',
      description: 'Implementing energy-efficient cooling and power management solutions.',
      href: '#',
    },
  ],
  contacts: [
    {
      name: 'First Last',
      role: 'Manager, Data Centre Operations',
      email: 'firstname.lastname@edmonton.ca',
    },
    {
      name: 'First Last',
      role: 'Facilities Coordinator',
      email: 'firstname.lastname@edmonton.ca',
    },
  ],
  quickLinks: [
    {
      label: 'Data Centre Access Request',
      description: 'Submit requests for physical access to facilities.',
      href: '#',
    },
    {
      label: 'Environmental Monitoring',
      description: 'Temperature, humidity, and power dashboards.',
      href: '#',
    },
    {
      label: 'Rack Layout Diagrams',
      description: 'Current server placement and capacity.',
      href: '#',
      isSecure: true,
    },
  ],
};

export default async function DataCentrePage() {
  const data = (await fetchPortfolioSubpage('/data-technology/data-centre')) || fallback;
  return <PortfolioSubpageTemplate {...data} />;
}
