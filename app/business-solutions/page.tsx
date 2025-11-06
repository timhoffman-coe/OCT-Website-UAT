import SectionTemplate, { ServiceArea } from '@/components/SectionTemplate';

export const metadata = {
  title: 'Business Solutions | Open City & Technology',
  description: 'Developing, implementing, and supporting the applications that power City services.',
};

const serviceAreas: ServiceArea[] = [
  {
    id: 'posse',
    title: 'Application Support for POSSE',
    shortDescription: 'Technical support, development and maintenance of the POSSE platform - a powerful configurable enterprise platform and workflow engine that automates business processes.',
    fullDescription: `Technical support, development and maintenance of the POSSE platform. POSSE (Public One Stop Service) is a powerful configurable enterprise platform and workflow engine that automates, integrates, monitors and enforces business process rules.

The term "configurable" simply means that POSSE can be changed to meet the needs of different business areas. POSSE is a corporate system used by all city departments, citizens and other external business partners.`,
    features: [
      'Enterprise platform and workflow engine',
      'Business process automation and integration',
      'Business process rule enforcement',
      'Configurable to meet different business area needs',
      'Used by all City departments and external partners',
    ],
  },
  {
    id: 'tacs',
    title: 'Application Support for TACS',
    shortDescription: 'Full in-house design and development for the Taxation and Collection System (TACS) - responsible for approximately 60% of the City\'s operating budget.',
    fullDescription: `Provide full-in-house design and in-house application development for the Taxation and Collection System (TACS) application for the City of Edmonton.

The usage of TACS in the organization is to assess, bill, and collect property taxes and is responsible for approximately 60% of the City's operating budget.`,
    features: [
      'Property tax assessment',
      'Tax billing and collection',
      'Responsible for ~60% of City operating budget',
      'Full in-house development and support',
      'Critical financial system',
    ],
  },
  {
    id: 'weblogic',
    title: 'Application Support for WebLogic',
    shortDescription: 'Technical support and maintenance of Oracle WebLogic Server infrastructure that runs critical Oracle applications including AMIS, TACS, and TOPS.',
    fullDescription: `Technical support and maintenance of the infrastructure. The Oracle Weblogic Server is a JAVA virtual machine that at the City of Edmonton is used to run Oracle Fusion Middleware.

The middleware allows for the development, deployment, and execution of Oracle applications (AMIS, CACTIS, Debentures, ETDS, MVCIS, PAC, TACS, TOPS).`,
    features: [
      'Oracle WebLogic Server infrastructure support',
      'Oracle Fusion Middleware management',
      'Support for 8+ critical Oracle applications',
      'JAVA virtual machine environment',
      'Application deployment and execution',
    ],
  },
  {
    id: 'google-workspace',
    title: 'Application Support for Google Workspace',
    shortDescription: 'Cloud-based productivity and collaboration tools including Gmail, Drive, Docs, Meet, and Calendar for all City employees.',
    fullDescription: `Google Workspace is a collection of cloud computing, productivity and collaboration tools, software and products developed and marketed by Google.

It provides comprehensive communication, collaboration, cloud storage, and content creation capabilities for all City of Edmonton employees.`,
    features: [
      'Communication: Gmail, Contacts, Calendar, Meet, Chat',
      'Cloud Storage: Google Drive',
      'Content Creation: Docs, Sheets, Slides, Forms',
      'Collaboration: Sites, Drawings, Keep',
      'Enterprise-wide deployment',
    ],
  },
  {
    id: 'branch-solutions',
    title: 'Business Solutions for City Branches',
    shortDescription: 'Technical support for branch-specific applications including troubleshooting, updates, upgrades, roadmapping, and low-code/no-code app creation.',
    fullDescription: `Technical support for the identified business areas' applications. Services include troubleshooting, problem-solving, software updates, application upgrades and maintenance, application roadmapping, and low-code/no-code application creation.

We work directly with City branches to deliver tailored solutions that meet their unique business needs.`,
    features: [
      'Application troubleshooting and problem-solving',
      'Software updates and application upgrades',
      'Application maintenance and support',
      'Application roadmapping and planning',
      'Low-code/no-code application development',
    ],
  },
  {
    id: 'rapid-development',
    title: 'Rapid Development Services',
    shortDescription: 'Agile, iterative development using low-code platforms to deliver robust functionality with unprecedented speed and efficiency.',
    fullDescription: `Rapid Development Services empower you to transform your business with unprecedented speed and efficiency. By leveraging an agile, iterative approach and cutting-edge tools like low-code platforms, we deliver the robust functionality of custom development without the traditional overhead.

Experience the power of streamlined workflows, captivating apps, and optimized processes, all within a fraction of the time and cost. Unlock your organization's full potential and accelerate your path to success with Rapid Development Services.`,
    features: [
      'Agile, iterative development approach',
      'Low-code platform utilization',
      'Rapid application delivery',
      'Reduced time and cost',
      'Streamlined workflows and processes',
    ],
  },
];

export default function BusinessSolutionsPage() {
  return (
    <SectionTemplate
      pageTitle="Business Solutions"
      pageDescription="IT business solutions encompass a range of software, applications, programs, and services designed to assist in achieving business goals. From 311 to internal tools, we develop, implement, and support the applications that power City services."
      serviceAreas={serviceAreas}
    />
  );
}
