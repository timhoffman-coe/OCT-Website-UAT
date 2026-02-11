import PortfolioSubpageTemplate from '@/components/its-shared/PortfolioSubpageTemplate';
import { fetchPortfolioSubpage } from '@/lib/data/fetch-subpage';

const fallback = {
  parentTeam: 'Partner Experience',
  parentTeamHref: '/partner-experience',
  title: 'Desktop Support',
  description:
    'We provide in-person break-fix services for hardware and software issues across City facilities. Our field technicians are available to resolve complex issues that cannot be handled remotely.',
  icon: 'Wrench',
  services: [
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
  ],
  initiatives: [
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
  ],
  contacts: [
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
  ],
  quickLinks: [
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
  ],
};

export default async function DesktopSupportPage() {
  const data = (await fetchPortfolioSubpage('/partner-experience/desktop-support')) || fallback;
  return <PortfolioSubpageTemplate {...data} />;
}
