import SectionTemplate, { ServiceArea } from '@/components/SectionTemplate';
import { fetchUnifiedTeamData } from '@/lib/data/fetch-team';
import { fetchWidgetOrder } from '@/lib/data/fetch-widgets';
import type { WidgetDataBag } from '@/components/widgets/WidgetRenderer';

export const metadata = {
  title: 'Technology Planning | Open City & Technology',
  description: 'Strategizing and roadmapping the future of technology for the City of Edmonton.',
};

const fallbackAreas: ServiceArea[] = [
  {
    id: 'technology-investment',
    title: 'Technology Investment & Financial Management',
    shortDescription: 'Managing the intake, evaluation, and governance of multi-stakeholder technology projects aligned with City strategies.',
    fullDescription: `Technology Investment is responsible for the intake and governance of multi-stakeholder and complex technology projects (commonly referred to as Tier A). By taking an investment focused approach, our team helps align Tier A (over $75,000) projects to the City's strategies and objectives, ensuring that the value from these projects is communicated and realized.

The team also manages the governance of Tier A technology projects by facilitating and coordinating regularly recurring meetings between directors, branch managers, and executives across the City of Edmonton.`,
    features: [
      'Technology Investment intake, evaluation, and prioritization',
      '4-year Corporate Technology Capital budget planning',
      'Financial Management Office - budget planning and reporting',
      'Corporate Business Technology Governance support',
      'People Services - staffing and FTE management',
    ],
  },
  {
    id: 'business-engagement',
    title: 'Business Engagement',
    shortDescription: 'First point of contact for new technology initiatives, providing business case consulting and portfolio management.',
    fullDescription: `This team is the first point of contact for new technology initiatives and provides services such as business case consulting and review, strategy and portfolio management, and organization change management.

We oversee and manage the OCT intake process for all technology requests (Tier A, B, & C) and the OCT concurrence process with focus on building business engagement with stakeholders across the city.`,
    features: [
      'Technology Intake - track and evaluate new requests',
      'Technology Concurrence - guide OCT concurrence process',
      'Business Case Review - quality assurance and validation',
      'Organizational Change Management consultation',
      'Strategy and Portfolio Management',
    ],
  },
  {
    id: 'vendor-management',
    title: 'Vendor Management Office',
    shortDescription: 'Proactive management of technology vendors and contracts, supporting $30M annually in transactions.',
    fullDescription: `The Vendor Management Office (VMO) is responsible for the effective and proactive management of all Technology Related Vendors (TRV) and contracts associated with the delivery of computer hardware, software, and supporting services for the City of Edmonton.

The VMO currently supports, negotiates, and manages approximately 500 contracts over 400 different vendors and is responsible for approximately $30M annually in transactions on behalf of OCT and branches across the City.`,
    features: [
      'Contract Lifecycle Management from initiation to termination',
      'Advisory Services for procurement and negotiations',
      'Procurement of IT hardware, software, and support',
      'Financial Management and audit support',
      'Vendor relationship management',
    ],
  },
  {
    id: 'it-asset-management',
    title: 'IT Asset Management',
    shortDescription: 'Comprehensive lifecycle management of technology assets to maximize business value and ensure compliance.',
    fullDescription: `IT asset management (ITAM) provides an accurate account of technology asset lifecycle costs and risks in order to maximize the business value of technology strategy, architecture, funding, contractual and sourcing decisions.

This service includes financial, contractual and inventory services to support life cycle management and strategic decision making for the IT environment. Assets include all elements of software and hardware that are found in the business environment.`,
    features: [
      'Purchase, lease, or rent hardware and software',
      'Software installation and license compliance',
      'Online hardware and software catalogs with self-service',
      'Software audit and rationalization',
      'Hardware delivery, installation, and configuration',
      'Device rental and loaner pool management',
      'Telephony and mobility device management',
    ],
  },
];

const fallbackTitle = 'Technology Planning';
const fallbackDescription = 'The Technology Planning and Business Engagement section enables the City to make informed technology decisions that provide value to our citizens, businesses and partners.';

export default async function TechnologyPlanningPage() {
  const [result, widgetOrder] = await Promise.all([
    fetchUnifiedTeamData('technology-planning'),
    fetchWidgetOrder('technology-planning'),
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
