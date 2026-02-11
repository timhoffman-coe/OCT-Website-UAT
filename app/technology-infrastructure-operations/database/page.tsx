import PortfolioSubpageTemplate from '@/components/its-shared/PortfolioSubpageTemplate';
import { fetchPortfolioSubpage } from '@/lib/data/fetch-subpage';
import { Database } from 'lucide-react';

const fallback = {
  parentTeam: 'Technology Infrastructure Operations',
  parentTeamHref: '/technology-infrastructure-operations',
  title: 'Database Management',
  description:
    'We support the City\'s database environment, ensuring data services are reliable, secure, and performant. Our team manages SQL Server, Oracle, and PostgreSQL platforms across the enterprise.',
  icon: Database,
  services: [
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
  ],
  initiatives: [
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
  ],
  contacts: [
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
  ],
  quickLinks: [
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
  ],
};

export default async function DatabasePage() {
  const data = (await fetchPortfolioSubpage('/technology-infrastructure-operations/database')) || fallback;
  return <PortfolioSubpageTemplate {...data} />;
}
