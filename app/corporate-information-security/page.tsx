import SectionTemplate, { ServiceArea } from '@/components/SectionTemplate';
import { fetchUnifiedTeamData } from '@/lib/data/fetch-team';
import { fetchWidgetOrder } from '@/lib/data/fetch-widgets';
import type { WidgetDataBag } from '@/components/widgets/WidgetRenderer';

export const revalidate = 3600; // ISR: cache for 1 hour, on-demand invalidation via revalidatePath in server actions

export const metadata = {
  title: 'Corporate Information Security | Open City & Technology',
  description: 'Protecting the City\'s data, assets, and information from cyber threats.',
};

const fallbackAreas: ServiceArea[] = [
  {
    id: 'advisory-services',
    title: 'Cyber Security Advisory Services',
    shortDescription: 'Providing cyber security advice on specifications, best practices, risk assessments, scorecards, and risk acceptance for all City systems.',
    fullDescription: `The Cyber Security Advisory Services and Architecture team provides cyber security advice to all City of Edmonton (CoE) IT Service providers on CoE Cyber security specifications and best practices; and to all CoE business units for security requirements, risk assessments, scorecards, and risk acceptance.

You will need to reach out to the Cyber Security Advisory Services team if you are implementing or significantly changing the security posture of an existing system either on-premise or in the cloud where the system deals with: Operational Technology, politically and reputationally sensitive public facing systems, providing or managing access to CoE systems for non-CoE personnel, a system that is operationally critical or if it is going to contain Confidential (including FOIP) or Restricted information.`,
    features: [
      'Cyber security specifications and best practices',
      'Security requirements and risk assessments',
      'Security scorecards and risk acceptance',
      'Operational Technology security',
      'Public-facing system security consultation',
    ],
  },
  {
    id: 'directory-services',
    title: 'Directory Services',
    shortDescription: 'Managing the Corporate Directory Service - the backbone for all Corporate network and technology assets including Active Directory and PKI.',
    fullDescription: `The Corporate Directory Service is the backbone for all Corporate network and technology assets. Without this critical service, employees and partners would not be able to access Corporate technology resources and assets.

We provide comprehensive directory and access management services to ensure secure and reliable access to all City technology resources.`,
    features: [
      'Active Directory management',
      'Domain Groups and Policies management',
      'Domain Controller management',
      'PKI and SSL Certificate management',
      'Secure File Transfer Protocol services',
      'Azure environment access management',
    ],
  },
  {
    id: 'continuity-recovery',
    title: 'Continuity and Recovery Services',
    shortDescription: 'IT Disaster Recovery Program ensuring critical services remain available through business continuity planning and crisis management.',
    fullDescription: `Supporting the City in its delivery of uninterrupted critical services, Open City and Technology is responsible for ensuring that the technology required to deliver the CoE's most critical services are available when needed most.

This is achieved through the Information Technology Disaster Recovery Program which aligns to the corporate Business Continuity Management Program.`,
    features: [
      'OCT business continuity planning',
      'Crisis management planning and coordination',
      'Disaster recovery training and awareness',
      'Current state capability assessments',
      'Improvement recommendations',
      'Exercise design, implementation, and reporting',
      'IT business continuity and DR audits',
    ],
  },
  {
    id: 'incident-response',
    title: 'Cybersecurity Investigation & Incident Response',
    shortDescription: 'SOC monitoring, threat detection, incident response, vulnerability management, and malware forensics with 24x7 MDR service.',
    fullDescription: `Providing comprehensive cybersecurity investigation, incident response, and security operations services to protect the City from cyber threats.

We operate an internal SOC monitoring threats entering via email, network, endpoint, or cloud, working closely with Mandiant MDR SOC to remediate threats 24x7.`,
    features: [
      'Vulnerability Assurance - iterative vulnerability management',
      'Cybersecurity Operations Centre - 24x7 threat monitoring',
      'Incident Management - MDR service with FireEye/Mandiant',
      'Malware Forensics & Investigations',
      'Computer forensics and employee investigations',
    ],
  },
  {
    id: 'governance-compliance',
    title: 'Governance, Risk, Compliance, and Awareness',
    shortDescription: 'Creating cybersecurity policies, delivering awareness education, providing risk assessments, and coordinating security audits.',
    fullDescription: `Providing governance, risk management, compliance, and awareness services to establish and maintain a strong cybersecurity posture across the City.

We create policies, deliver training, assess risks, and coordinate audits to ensure the City meets cybersecurity requirements and best practices.`,
    features: [
      'Cybersecurity policies and standards creation',
      'Cybersecurity awareness and education',
      'Consulting and risk assessment services',
      'Internal and external audit coordination',
      'Exercise design and implementation',
    ],
  },
  {
    id: 'identity-access',
    title: 'Digital Identity & Access Management',
    shortDescription: 'Enterprise IAM operations including user provisioning, offboarding, EIAM portal, and Multi-Factor Authentication implementation.',
    fullDescription: `Digital Identity & Access Management (IAM) operations provide comprehensive identity and access services for the City's workforce.

From onboarding to offboarding, we manage digital identities and access rights, implementing modern security controls like Multi-Factor Authentication across all externally available workforce access.`,
    features: [
      'New user digital ID creation and access provisioning',
      'Employee offboarding and access removal',
      'Enterprise IAM (EIAM) portal operation',
      'Self-serve Digital ID services',
      'Multi-Factor Authentication implementation',
    ],
  },
];

const fallbackTitle = 'Corporate Information Security';
const fallbackDescription = "Protecting the City's data, assets, and information from cyber threats. We safeguard citizen privacy and ensure the integrity of municipal operations against evolving risks through comprehensive security services, incident response, and continuous monitoring.";

export default async function CorporateInformationSecurityPage() {
  const [result, widgetOrder] = await Promise.all([
    fetchUnifiedTeamData('corporate-information-security'),
    fetchWidgetOrder('corporate-information-security'),
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
