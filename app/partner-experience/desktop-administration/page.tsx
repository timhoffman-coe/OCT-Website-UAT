import PortfolioSubpageTemplate from '@/components/its-shared/PortfolioSubpageTemplate';
import { fetchPortfolioSubpage } from '@/lib/data/fetch-subpage';

const fallback = {
  parentTeam: 'Partner Experience',
  parentTeamHref: '/partner-experience',
  title: 'Desktop Administration',
  description:
    'We manage approximately 12,000 computing devices across the City, including operating system deployment, patch management, software distribution, and configuration management.',
  icon: 'Monitor',
  services: [
    {
      title: 'Device Management',
      items: [
        'Endpoint provisioning',
        'Device inventory',
        'Asset tracking',
      ],
    },
    {
      title: 'Patch Management',
      items: [
        'Security updates',
        'OS patching',
        'Compliance reporting',
      ],
    },
    {
      title: 'Software Deployment',
      items: [
        'Application packaging',
        'Automated deployment',
        'License management',
      ],
    },
    {
      title: 'Configuration Management',
      items: [
        'Group Policy management',
        'Standard images',
        'Security baselines',
      ],
    },
  ],
  initiatives: [
    {
      title: 'Windows 11 Migration',
      description: 'Upgrading City devices to Windows 11 with improved security features.',
      href: '#',
    },
    {
      title: 'Endpoint Detection & Response',
      description: 'Deploying advanced endpoint security monitoring across all managed devices.',
      href: '#',
    },
  ],
  contacts: [
    {
      name: 'First Last',
      role: 'Manager, Desktop Administration',
      email: 'firstname.lastname@edmonton.ca',
    },
    {
      name: 'First Last',
      role: 'Senior Desktop Engineer',
      email: 'firstname.lastname@edmonton.ca',
    },
  ],
  quickLinks: [
    {
      label: 'Software Request Form',
      description: 'Request new software installation.',
      href: '/get-help',
    },
    {
      label: 'Device Inventory',
      description: 'View managed device information.',
      href: '#',
    },
    {
      label: 'Patch Compliance Dashboard',
      description: 'View patch status across the organization.',
      href: '#',
      isSecure: true,
    },
  ],
};

export default async function DesktopAdministrationPage() {
  const data = (await fetchPortfolioSubpage('/partner-experience/desktop-administration')) || fallback;
  return <PortfolioSubpageTemplate {...data} />;
}
