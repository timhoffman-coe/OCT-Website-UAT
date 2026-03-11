import SectionTemplate, { ServiceArea } from '@/components/SectionTemplate';
import { fetchUnifiedTeamData } from '@/lib/data/fetch-team';
import { fetchWidgetOrder } from '@/lib/data/fetch-widgets';
import type { WidgetDataBag } from '@/components/widgets/WidgetRenderer';

export const metadata = {
  title: 'Integrated Technology Solutions | Open City & Technology',
  description: 'Managing the core infrastructure, networks, and systems that keep the City connected.',
};

const fallbackAreas: ServiceArea[] = [
  {
    id: 'infrastructure-operations',
    title: 'Technology Infrastructure Operations',
    shortDescription: 'Ensuring servers, storage, backup, database, and workspace technology are always available through process improvements and automation.',
    fullDescription: `Technology Infrastructure Operations ensures that servers, storage, backup, database, and workspace technology are always available and operate efficiently through process improvements and automation.

Our team provides critical services supporting the City's database environment, storage and server operating systems, printing, data protection, server infrastructure, and virtualization platforms.`,
    features: [
      'Database Management - supporting City database environment',
      'Server Solutions & Automation - OS, storage, printing, data protection',
      'Virtualization - server infrastructure and platforms',
      'Process improvements and automation',
      'High availability and efficiency',
    ],
    link: '/technology-infrastructure-operations',
  },
  {
    id: 'telecom-iot',
    title: 'Telecom and Internet of Things (IoT)',
    shortDescription: 'Communication services including wireline, VoIP, cellular wireless, M2M, LoRaWAN IoT network and Cisco Call Center solutions.',
    fullDescription: `Telecommunications provides various communication services including wireline & VoIP (Voice over IP) phone, cellular wireless, M2M (machine to machine), LoRaWAN IoT network and a Cisco Call Center solution to serve and support all City business areas.

The Internet of Things (IoT) refers to networked devices embedded with sensors and software, allowing them to collect and share data that can be processed and utilized for various purposes across the City.`,
    features: [
      'Wireline & VoIP phone services',
      'Cellular wireless and M2M communications',
      'LoRaWAN IoT network infrastructure',
      'Cisco Call Center solutions',
      'IoT device management and data collection',
    ],
  },
  {
    id: 'data-technology',
    title: 'Data Technology',
    shortDescription: 'Core networking, data center operations, and application delivery services enabling seamless connectivity across the City.',
    fullDescription: `Data Technology is a core component of the Integrated Technology Solutions (ITS) team, dedicated to enabling City of Edmonton employees and citizens to seamlessly connect with technology, applications, and each other.

We manage the City's network infrastructure, data center facilities, and application delivery platforms to ensure reliable, secure connectivity across all City operations.`,
    features: [
      'Connecting Technologies - ADCs, cloud, Appspace, digital faxing',
      'Data Center - on-prem and colocation facility management',
      'Network - 1,000+ switches, 1,400+ APs, 300 km fiber',
      'Secure application delivery',
      'City-wide connectivity infrastructure',
    ],
    link: '/data-technology',
  },
  {
    id: 'partner-experience',
    title: 'Partner Experience',
    shortDescription: 'User assistance and computing environment management including Service Desk, Desktop Support, and Desktop Administration.',
    fullDescription: `Partner Experience delivers essential user assistance and manages our computing environment through several key functional areas to help our internal customers provide services to our citizens.

We provide comprehensive support from remote troubleshooting to in-person assistance, managing approximately 12,000 computing devices across the City.`,
    features: [
      'Service Desk - IT assistance via tickets and calls',
      'Desktop Support - in-person break-fix services',
      'Desktop Administration - ~12,000 device management',
      'Operating system and patch management',
      'Software deployment and configuration',
    ],
    link: '/partner-experience',
  },
  {
    id: 'service-delivery',
    title: 'Service Delivery and Analytics',
    shortDescription: 'Service Management Office and Monitoring & Analytics providing process management, ITSM platform support, and comprehensive monitoring.',
    fullDescription: `The Service Management Office (SMO) is instrumental in both operational and business-facing aspects of IT service delivery, focusing on Change, Problem, and Incident Management processes while managing the Digital Workplace Catalog and Work Order process.

Monitoring & Analytics provides reliable monitoring platforms for IT infrastructure, networks, applications, and user interfaces with modern alerting, dashboards, and AI-powered analysis tools.`,
    features: [
      'Change, Problem, and Incident Management',
      'Digital Workplace Catalog management',
      'CMDB and Remedy ITSM platform support',
      'Infrastructure and application monitoring',
      'AI-powered data analysis and dashboards',
    ],
    link: '/service-delivery',
  },
];

const fallbackTitle = 'Integrated Technology Solutions';
const fallbackDescription = "IT infrastructure serves as the underlying structure that supports all services and solutions within the City's technology environment. We ensure that technology resources are always available and operate efficiently, forming the foundation for all digital services.";

export default async function IntegratedTechnologySolutionsPage() {
  const [result, widgetOrder] = await Promise.all([
    fetchUnifiedTeamData('integrated-technology-solutions'),
    fetchWidgetOrder('integrated-technology-solutions'),
  ]);

  const fallbackDataBag: WidgetDataBag = {
    serviceAreas: fallbackAreas,
  };

  return (
    <SectionTemplate
      pageTitle={result?.pageTitle || fallbackTitle}
      pageDescription={result?.pageDescription || fallbackDescription}
      dataBag={result?.dataBag || fallbackDataBag}
      widgetOrder={widgetOrder || undefined}
    />
  );
}
