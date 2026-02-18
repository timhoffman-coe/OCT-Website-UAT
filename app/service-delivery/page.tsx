import ITSTeamPageTemplate from '@/components/its-shared/ITSTeamPageTemplate';
import { fetchITSTeamData } from '@/lib/data/fetch-team';
import { fetchWidgetOrder } from '@/lib/data/fetch-widgets';
import type { ITSTeamPageData } from '@/lib/data/its-shared';

const fallbackData: ITSTeamPageData = {
  teamName: 'Service Delivery and Analytics',
  teamShortName: 'Service Delivery',
  portfolios: [
    {
      icon: 'ClipboardList',
      title: 'Service Management Office',
      description: 'Change, Problem, and Incident Management processes with CMDB and Remedy ITSM support.',
      href: '/service-delivery/service-management-office',
    },
    {
      icon: 'BarChart3',
      title: 'Monitoring & Analytics',
      description: 'Infrastructure and application monitoring with AI-powered analysis and dashboards.',
      href: '/service-delivery/monitoring-analytics',
    },
    {
      icon: 'FileText',
      title: 'Digital Workplace Catalog',
      description: 'Managing the Digital Workplace Catalog and Work Order process.',
      href: '/service-delivery/digital-workplace-catalog',
    },
  ],
  teamTabs: [
    {
      id: 'smo',
      label: 'Service Management Office',
      videoTitle: 'Service Management Office Overview',
      videoDescription: 'Watch this overview of our Service Management Office operations.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      diagramsTitle: 'SMO Diagrams',
      diagramsDescription: 'View detailed diagrams for SMO processes.',
      diagramLinks: [
        { label: 'Change Management Process', href: '#' },
        { label: 'Problem Management Process', href: '#' },
        { label: 'Incident Management Process', href: '#' },
        { label: 'CMDB Architecture', href: '#' },
      ],
    },
    {
      id: 'monitoring',
      label: 'Monitoring & Analytics',
      videoTitle: 'Monitoring & Analytics Overview',
      videoDescription: 'Watch this overview of our monitoring platforms and analytics tools.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      diagramsTitle: 'Monitoring Diagrams',
      diagramsDescription: 'View detailed diagrams for monitoring infrastructure.',
      diagramLinks: [
        { label: 'Monitoring Architecture', href: '#' },
        { label: 'Alerting Workflows', href: '#' },
        { label: 'Dashboard Framework', href: '#' },
      ],
    },
  ],
  trelloBoards: [
    {
      title: 'Service Delivery',
      description: 'High-level work priorities for the Service Delivery team.',
      href: '#',
    },
    {
      title: 'SMO Initiatives',
      description: 'Tracking Service Management Office initiatives and improvements.',
      href: '#',
    },
    {
      title: 'Monitoring Projects',
      description: 'Tracking monitoring and analytics projects.',
      href: '#',
    },
  ],
  teamMembers: [
    {
      name: 'First Last',
      title: 'Manager, Service Delivery and Analytics',
      email: 'firstname.lastname@edmonton.ca',
    },
    {
      name: 'First Last',
      title: 'Team Lead, Service Management Office',
      email: 'firstname.lastname@edmonton.ca',
    },
    {
      name: 'First Last',
      title: 'Team Lead, Monitoring & Analytics',
      email: 'firstname.lastname@edmonton.ca',
    },
  ],
  accordionItems: [
    {
      id: 'incident',
      title: 'Incident Management',
      links: [
        { label: 'Helix (Remedy) SmartIT', href: '#' },
        { label: 'Helix (Remedy) DWP', href: '#' },
        { label: 'Incident Management Process', href: '#' },
        { label: 'WO from Incident Ticket', href: '#' },
        { label: 'Incident Management Flow Charts', href: '#' },
        { label: 'Problem Mgmt Process Guide', href: '#' },
        { label: 'Root Cause Analysis (RCA)', href: '#' },
      ],
    },
    {
      id: 'change',
      title: 'Change Management',
      links: [
        { label: 'OCT Change Management', href: '#' },
        { label: 'OCT Schedule Outages', href: '#' },
        { label: 'Severity 1 Procedures', href: '#' },
        { label: 'OCT Change Management Definitions', href: '#' },
        { label: 'Change Approval - Form', href: '#' },
        { label: 'Work Order vs Change Ticket', href: '#' },
        { label: 'Remedy Definitions', href: '#' },
        { label: 'Change Ticket Cheat Sheet', href: '#' },
      ],
    },
    {
      id: 'resource',
      title: 'Resource Management',
      links: [
        { label: 'Taleo', href: '#' },
        { label: 'Recruitment Toolkit', href: '#' },
        { label: 'Recruitment Approval Process User Guide', href: '#' },
        { label: 'Recruitment Approval Form', href: '#' },
        { label: 'SAP Time Entry Request', href: '#' },
        { label: 'New Account Request', href: '#' },
        { label: 'Phone Request', href: '#' },
        { label: 'Offboarding Link', href: '#' },
        { label: 'Supervisor Offboarding Checklist', href: '#' },
      ],
    },
    {
      id: 'its-links',
      title: 'ITS Team Sites & Other Links',
      links: [
        { label: 'ITS Service Catalog', href: '#' },
        { label: 'Technology Infrastructure Operations', href: '#' },
        { label: 'Service Desk', href: '#' },
        { label: 'Service Management Office', href: '#' },
        { label: 'Enterprise Commons Project', href: '#' },
        { label: 'OCT Employee Links', href: '#' },
        { label: 'Technology PMO', href: '#' },
        { label: 'Open Data Portal', href: '#' },
        { label: 'Open City', href: '#' },
      ],
    },
  ],
};

export default async function ServiceDeliveryPage() {
  const [data, widgetOrder] = await Promise.all([
    fetchITSTeamData('service-delivery'),
    fetchWidgetOrder('service-delivery'),
  ]);
  return (
    <ITSTeamPageTemplate
      data={data || fallbackData}
      widgetOrder={widgetOrder || undefined}
    />
  );
}
