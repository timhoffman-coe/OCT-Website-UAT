import SectionTemplate, { ServiceArea } from '@/components/SectionTemplate';

export const metadata = {
  title: 'Project Management Office | Open City & Technology',
  description: 'Ensuring technology projects are delivered on time, on budget, and meet strategic goals.',
};

const serviceAreas: ServiceArea[] = [
  {
    id: 'project-delivery',
    title: 'Centralized Project Delivery',
    shortDescription: 'Planning and controlling the tactical execution of technology projects approved by Business Technology Governance through standardized processes.',
    fullDescription: `The Technology Project Management Office (PMO) is a service organization that delivers and supports technology projects approved by the City's Business Technology Governance.

The PMO is principally responsible for planning and controlling the tactical execution of technology projects approved by the City's Technology Investment Governance. Through centralized project delivery, the PMO develops and follows standardized processes and techniques that build a culture focused on results.`,
    features: [
      'Centralized technology project delivery',
      'Standardized project management processes',
      'Alignment with Business Technology Governance',
      'Results-focused culture',
      'Project planning and tactical execution',
    ],
  },
  {
    id: 'customer-needs',
    title: 'Meeting Customer Needs',
    shortDescription: 'Delivering technology projects that meet customer expectations through disciplined project management and quality control.',
    fullDescription: `We focus on delivering technology projects that meet customer needs and expectations by maintaining professional project management standards and quality control measures.

Our approach ensures stakeholders understand their roles and responsibilities in contributing to project success, while maintaining timely and accurate project data for better decision making.`,
    features: [
      'Customer-focused project delivery',
      'Professional PM standards',
      'Quality control measures',
      'Stakeholder engagement',
      'Clear roles and responsibilities',
    ],
  },
  {
    id: 'decision-support',
    title: 'Better Decision Making',
    shortDescription: 'Facilitating informed decision making throughout project lifecycles by maintaining and providing timely, accurate project data.',
    fullDescription: `The PMO facilitates better decision making throughout a project's lifecycle by maintaining and providing timely and accurate project data.

This enables sponsors, executives, and stakeholders to make informed decisions based on current project status, risks, and forecasts.`,
    features: [
      'Timely and accurate project data',
      'Real-time project status reporting',
      'Risk and issue tracking',
      'Data-driven decision support',
      'Executive visibility and transparency',
    ],
  },
  {
    id: 'quality-assurance',
    title: 'Quality Control & Assurance',
    shortDescription: 'Ensuring project deliverables meet quality standards through consistent control measures and best practices.',
    fullDescription: `Project deliverables abide by quality control measures to ensure consistency, completeness, and alignment with project objectives.

We implement quality assurance processes throughout the project lifecycle to maintain high standards and deliver value to the organization.`,
    features: [
      'Quality control measures',
      'Deliverable standards and validation',
      'Best practice implementation',
      'Consistency and completeness checks',
      'Value delivery assurance',
    ],
  },
  {
    id: 'risk-management',
    title: 'Proactive Risk Management',
    shortDescription: 'Managing and reducing project risks before they become issues through systematic identification, assessment, and mitigation.',
    fullDescription: `We proactively manage and reduce project risks before they become issues through systematic risk identification, assessment, and mitigation strategies.

This approach increases the probability of successfully executing projects on schedule, within scope and budget, while maximizing value to the organization.`,
    features: [
      'Proactive risk identification',
      'Risk assessment and prioritization',
      'Mitigation strategy development',
      'Issue prevention and management',
      'Increased project success probability',
    ],
  },
  {
    id: 'pm-professionalism',
    title: 'Project Management Excellence',
    shortDescription: 'Building a culture of project management professionalism that enables predictable, effective, measurable, and disciplined delivery.',
    fullDescription: `We create a culture of project management professionalism that enables an environment of predictable, effective, measurable and disciplined project management.

Our goal is to become recognized as a leader in delivering technology projects that improve the lives of Edmontonians and contribute to achieving the outcomes of the City's Business Technology Strategy.`,
    features: [
      'PM professionalism and standards',
      'Predictable project delivery',
      'Measurable outcomes and KPIs',
      'Disciplined project methodologies',
      'Continuous improvement culture',
    ],
  },
];

export default function ProjectManagementOfficePage() {
  return (
    <SectionTemplate
      pageTitle="Project Management Office"
      pageDescription="The Technology PMO delivers and supports technology projects through centralized project delivery, developing standardized processes and techniques that build a culture focused on results. We ensure projects are delivered on schedule, within scope and budget, providing maximal value to the organization."
      serviceAreas={serviceAreas}
    />
  );
}
