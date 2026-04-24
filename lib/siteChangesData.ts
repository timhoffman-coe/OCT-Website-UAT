// Add a new entry at the top of siteChangesData[] each time a user-facing
// version is released.  Keep descriptions non-technical and focused on what
// users can now do differently.

export type ChangeCategory = 'New Feature' | 'Enhancement' | 'Content' | 'Bug Fix';

export interface ChangeItem {
  title: string;
  description: string;
  category: ChangeCategory;
}

export interface VersionEntry {
  version: string;
  date: string;
  summary?: string;
  changes: ChangeItem[];
}

export const siteChangesData: VersionEntry[] = [
  {
    version: '1.8.0',
    date: '2026-04-23',
    changes: [
      {
        title: 'ServiceNow Dashboard Previews',
        description:
          'The Incident Management and Asset Management dashboards now show a preview of what\'s coming with the ServiceNow integration.',
        category: 'New Feature',
      },
    ],
  },
  {
    version: '1.7.0',
    date: '2026-04-23',
    changes: [
      {
        title: 'OCT Site Changes Page',
        description:
          'A new changelog page lets you see every feature, enhancement, and fix released on the OCT portal.',
        category: 'New Feature',
      },
      {
        title: 'Dashboard Greeting Time Fix',
        description:
          'The admin dashboard greeting now displays the correct time based on your local timezone.',
        category: 'Bug Fix',
      },
    ],
  },
  {
    version: '1.6.0',
    date: '2026-04-23',
    changes: [
      {
        title: 'Form Integration Notices',
        description:
          'Stub form confirmation pages now display a notice that backend integration is coming soon.',
        category: 'Enhancement',
      },
    ],
  },
  {
    version: '1.5.0',
    date: '2026-04-23',
    changes: [
      {
        title: 'Footer Improvements',
        description:
          'Various improvements and refinements to the site footer.',
        category: 'Enhancement',
      },
    ],
  },
  {
    version: '1.4.0',
    date: '2026-04-23',
    changes: [
      {
        title: 'Redesigned Footer Navigation',
        description:
          'The site footer has been rebuilt with multi-section navigation, quick links to key resources, and updated branding.',
        category: 'Enhancement',
      },
    ],
  },
  {
    version: '1.3.0',
    date: '2026-04-22',
    changes: [
      {
        title: 'Technology Intake Form',
        description:
          'A new multi-step wizard lets you submit technology requests directly from the site. Walk through requirements, justification, and approvals in one guided flow.',
        category: 'New Feature',
      },
    ],
  },
  {
    version: '1.2.0',
    date: '2026-04-22',
    changes: [
      {
        title: 'Get Help & Support Page',
        description:
          'Need assistance? The new Get Help page provides a step-by-step case submission wizard so you can describe your issue and route it to the right team.',
        category: 'New Feature',
      },
    ],
  },
  {
    version: '1.1.0',
    date: '2026-04-22',
    changes: [
      {
        title: 'Slide-in Navigation Panels',
        description:
          'The header navigation has been upgraded from cascading dropdown menus to smooth, animated slide-in panels for a cleaner browsing experience.',
        category: 'Enhancement',
      },
    ],
  },
  {
    version: '1.0.0',
    date: '2026-04-22',
    summary: 'The initial launch of the OCT internal portal.',
    changes: [
      {
        title: 'OCT Website Launch',
        description:
          'The Open City & Technology internal portal is live — a single hub for teams, resources, dashboards, and documentation.',
        category: 'New Feature',
      },
      {
        title: 'AI-Powered OCT Assistant',
        description:
          'Ask questions and get context-aware answers powered by Gemini, with citations pulled directly from internal Google Drive documents.',
        category: 'New Feature',
      },
      {
        title: 'Interactive Org Chart',
        description:
          'Explore the OCT organizational structure with a dynamic, searchable chart that stays up to date automatically.',
        category: 'New Feature',
      },
      {
        title: 'App & Project Library',
        description:
          'Browse a searchable catalog of OCT-built applications and active projects, complete with status indicators and team ownership details.',
        category: 'New Feature',
      },
      {
        title: 'Dashboard Suite',
        description:
          'Six new dashboards covering Service Health, Budget & Financial, People Management, Asset Management, Incident Management, and Vendor Command Center.',
        category: 'New Feature',
      },
      {
        title: 'Content Management System',
        description:
          'Team admins can now manage their own page content, news posts, links, and policies through a built-in CMS with role-based permissions.',
        category: 'New Feature',
      },
      {
        title: 'Network Information Centre',
        description:
          'A dedicated portal for network operations with fibre route maps, wireless tower data, carrier service agreements, and team contacts.',
        category: 'Content',
      },
      {
        title: 'Real-Time Service Health Monitoring',
        description:
          'Live service status pulled from Uptrends so you can check system availability at a glance.',
        category: 'New Feature',
      },
      {
        title: 'OCT Web Development Docs',
        description:
          'Internal developer documentation with architecture diagrams, design system references, and project progress tracking.',
        category: 'Content',
      },
    ],
  },
];
