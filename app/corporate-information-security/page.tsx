import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Corporate Information Security | Open City & Technology',
  description: 'Protecting the City\'s data, assets, and information from cyber threats.',
};

export default function CorporateInformationSecurityPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <main className="container mx-auto max-w-7xl py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-complement-grey-flannel rounded-lg shadow-xl p-8 md:p-12 mb-12">
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-white mb-4">
            Corporate Information Security
          </h1>
          <p className="font-serif text-xl text-white/90">
            Safeguarding citizen privacy and municipal operations.
          </p>
        </div>

        {/* Overview Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-8">
          <h2 className="font-sans text-3xl font-bold text-gray-800 mb-6">
            Overview
          </h2>
          <p className="font-sans text-lg text-gray-700">
            The Cyber Security Advisory Services and Architecture team provides cyber security advice to all City of Edmonton (CoE) IT Service providers on CoE Cyber security specifications and best practices; and to all CoE business units for security requirements, risk assessments, scorecards, and risk acceptance. You will need to reach out to the Cyber Security Advisory Services team if you are implementing or significantly changing the security posture of an existing system either on-premise or in the cloud where the system deals with: Operational Technology, politically and reputationally sensitive public facing systems, providing or managing access to CoE systems for non-CoE personnel, a system that is operationally critical or if it is going to contain Confidential (including FOIP) or Restricted information.
          </p>
        </div>

        {/* Services Section */}
        <div className="space-y-8">
          <h2 className="font-sans text-3xl font-bold text-gray-800">
            Our Services
          </h2>

          {/* Directory Services */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="font-sans text-2xl font-bold text-complement-sea-green mb-4">
              Directory Services
            </h3>
            <p className="font-sans text-gray-700 mb-4">
              The Corporate Directory Service is the backbone for all Corporate network and technology assets. Without this critical service, employees and partners would not be able to access Corporate technology resources and assets.
            </p>
            <p className="font-sans text-gray-700 font-semibold mb-2">This service includes:</p>
            <ul className="font-sans text-gray-700 space-y-2 list-disc list-inside ml-4">
              <li>Active Directory management</li>
              <li>Domain Groups and Policies management</li>
              <li>Domain Controller management</li>
              <li>PKI and SSL Certificate management</li>
              <li>Secure File Transfer Protocol services</li>
              <li>Access management to the Azure environment</li>
            </ul>
          </div>

          {/* Continuity and Recovery */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="font-sans text-2xl font-bold text-complement-sea-green mb-4">
              Continuity and Recovery Services
            </h3>
            <p className="font-sans text-gray-700 mb-4">
              Supporting the City in its delivery of uninterrupted critical services, Open City and Technology is responsible for ensuring that the technology required to deliver the CoE's most critical services are available when needed most. This is achieved through the Information Technology Disaster Recovery Program which aligns to the corporate Business Continuity Management Program.
            </p>
            <p className="font-sans text-gray-700 font-semibold mb-2">This service includes:</p>
            <ul className="font-sans text-gray-700 space-y-2 list-disc list-inside ml-4">
              <li>OCT business continuity planning</li>
              <li>Crisis management planning and coordination</li>
              <li>Disaster recovery and business continuity training and awareness</li>
              <li>Assessments of current state continuity and recovery capabilities</li>
              <li>Recommendations to improve continuity and recovery capabilities</li>
              <li>Exercise design, implementation, and reporting</li>
              <li>Information Technology business continuity and disaster recovery</li>
              <li>Information Technology business continuity and disaster recovery audits</li>
            </ul>
          </div>

          {/* Cybersecurity Investigation */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="font-sans text-2xl font-bold text-complement-sea-green mb-4">
              Cybersecurity Investigation, Incident Response, Assurance, and Secops
            </h3>
            <div className="space-y-4 font-sans text-gray-700">
              <div>
                <p className="font-semibold mb-2">Vulnerability Assurance</p>
                <p>Providing a consistent process to ensure web applications and infrastructure vulnerabilities are identified, reviewed, prioritized, and treated on an iterative basis.</p>
              </div>
              <div>
                <p className="font-semibold mb-2">Cybersecurity Operations Centre</p>
                <p>Internal SOC monitoring cyber threats and alerts entering the City's infrastructure via email, network, endpoint, or cloud. And work closely with the Mandiant MDR SOC and internal teams to remediate threats.</p>
              </div>
              <div>
                <p className="font-semibold mb-2">Cybersecurity Incident Management</p>
                <p>The managed detection and response (MDR) service provided by FireEye and Mandiant combines technology, intelligence, and expertise to identify threats early and reduce the consequences of a breach 24x7. Works closely with the internal C-ISO SOC.</p>
              </div>
              <div>
                <p className="font-semibold mb-2">Malware Forensics & Investigations</p>
                <p>Work with the C-ISO SOC and Mandiant SOC to perform computer forensics as required on cyber threats. Collaborate with Employee Services and Legal Services to provide investigations on employees' conduct.</p>
              </div>
            </div>
          </div>

          {/* Governance, Risk, Compliance */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="font-sans text-2xl font-bold text-complement-sea-green mb-4">
              Governance, Risk, Compliance, and Awareness
            </h3>
            <p className="font-sans text-gray-700 mb-4">This service includes:</p>
            <ul className="font-sans text-gray-700 space-y-2 list-disc list-inside ml-4">
              <li>The creation and oversight of cybersecurity policies and standards</li>
              <li>Delivering cybersecurity awareness and education</li>
              <li>Providing cybersecurity consulting and risk assessment services to branches, projects and initiatives</li>
              <li>Coordinating internal and external cybersecurity audits</li>
              <li>Exercise design, implementation, and reporting</li>
            </ul>
          </div>

          {/* Digital Identity Access Management */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="font-sans text-2xl font-bold text-complement-sea-green mb-4">
              Digital Identity Access Management
            </h3>
            <p className="font-sans text-gray-700 mb-4">
              Digital Identity & Access Management (IAM) operations include, among several services:
            </p>
            <ul className="font-sans text-gray-700 space-y-2 list-disc list-inside ml-4">
              <li>The creation of primary digital identification for new workforce users when they join the organization and the access that is associated to that ID</li>
              <li>The offboarding of employees' digital id when they leave the organization and the removal of access that is associated with their account</li>
              <li>Operation and support of the Enterprise Identity Access Management (EIAM) portal that provides self serve Digital ID services</li>
              <li>Implementation of Multi Factor Authentication across all externally available workforce access</li>
            </ul>
          </div>
        </div>

        {/* Leadership Contact */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="font-sans text-2xl font-bold text-gray-800 mb-4">
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-sans text-sm font-semibold text-complement-empire-blue uppercase">Director</p>
              <p className="font-sans text-lg font-bold text-gray-800">Daniel Pedersen</p>
              <a href="mailto:daniel.pedersen@edmonton.ca" className="font-sans text-sm text-complement-sea-green hover:text-primary-blue">daniel.pedersen@edmonton.ca</a>
            </div>
            <div>
              <p className="font-sans text-sm font-semibold text-complement-empire-blue uppercase">Program Managers</p>
              <p className="font-sans text-gray-800">Andrea Buchholz, David Malone, Jack Truong, Kevin McKay</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
