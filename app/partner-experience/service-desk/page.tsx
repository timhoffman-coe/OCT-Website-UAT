import PortfolioSubpageTemplate from '@/components/its-shared/PortfolioSubpageTemplate';
import { fetchPortfolioSubpage } from '@/lib/data/fetch-subpage';

const fallback = {
  parentTeam: 'Partner Experience',
  parentTeamHref: '/partner-experience',
  title: 'Service Desk',
  description:
    'We provide IT assistance via tickets and calls, offering remote troubleshooting and support to help City employees stay productive. Our team is available to assist with technical issues, service requests, and general IT inquiries.',
  icon: 'Headphones',
  services: [
    {
      title: 'Incident Support',
      items: [
        'Ticket submission and tracking',
        'Phone support (780-496-8000)',
        'Live chat assistance',
      ],
    },
    {
      title: 'Remote Troubleshooting',
      items: [
        'Remote desktop support',
        'Password resets',
        'Software assistance',
      ],
    },
    {
      title: 'Service Requests',
      items: [
        'Account provisioning',
        'Access requests',
        'Software installation',
      ],
    },
    {
      title: 'Knowledge Base',
      items: [
        'Self-service articles',
        'How-to guides',
        'FAQ documentation',
      ],
    },
  ],
  initiatives: [
    {
      title: 'AI-Powered Support Chat',
      description: 'Implementing intelligent chatbot for faster resolution of common issues.',
      href: '#',
    },
    {
      title: 'Self-Service Portal Enhancement',
      description: 'Expanding self-service capabilities to reduce ticket volume and improve user experience.',
      href: '#',
    },
  ],
  contacts: [
    {
      name: 'First Last',
      role: 'Manager, Service Desk',
      email: 'firstname.lastname@edmonton.ca',
    },
    {
      name: 'First Last',
      role: 'Team Lead, Service Desk',
      email: 'firstname.lastname@edmonton.ca',
    },
  ],
  quickLinks: [
    {
      label: 'Submit a Ticket',
      description: 'Create a new support request.',
      href: '/get-help',
    },
    {
      label: 'Knowledge Base',
      description: 'Search self-help articles and guides.',
      href: '#',
    },
    {
      label: 'Track My Tickets',
      description: 'View status of your open requests.',
      href: '#',
      isSecure: true,
    },
  ],
};

export default async function ServiceDeskPage() {
  const data = (await fetchPortfolioSubpage('/partner-experience/service-desk')) || fallback;
  return <PortfolioSubpageTemplate {...data} />;
}
