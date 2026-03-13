import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Our Services | Open City & Technology',
  description: 'Explore the technology services and solutions provided by Open City & Technology at the City of Edmonton.',
};

export default function ServicesPage() {
  const serviceGroups = [
    {
      section: 'Technology Planning',
      sectionUrl: '/technology-planning',
      services: [
        {
          title: 'Technology Investment & Governance',
          description: 'Strategic oversight of technology investments, portfolio management, and enterprise architecture governance.',
          icon: '🏛️',
        },
        {
          title: 'Business Engagement & Intake',
          description: 'Technology project intake, business requirement gathering, and stakeholder engagement services.',
          icon: '🤝',
        },
        {
          title: 'Vendor & Contract Management',
          description: 'Procurement, vendor relationships, contract negotiation, and supplier performance management.',
          icon: '📋',
        },
        {
          title: 'IT Asset Management',
          description: 'Hardware and software asset tracking, lifecycle management, and license compliance.',
          icon: '📦',
        },
      ],
    },
    {
      section: 'Application Technology Services',
      sectionUrl: '/application-technology-services',
      services: [
        {
          title: 'Application Development & Support',
          description: 'Custom software development, application maintenance, system integration, and technical support.',
          icon: '💻',
        },
        {
          title: 'Artificial Intelligence',
          description: 'AI and machine learning solutions, intelligent automation, and data analytics services.',
          icon: '🤖',
        },
      ],
    },
    {
      section: 'Integrated Technology Solutions',
      sectionUrl: '/integrated-technology-solutions',
      services: [
        {
          title: 'Technology Infrastructure Operations',
          description: 'Server management, cloud services, storage systems, and infrastructure monitoring.',
          icon: '🖥️',
        },
        {
          title: 'Network & Data Center Operations',
          description: 'Network infrastructure, connectivity, data center operations, and telecommunications.',
          icon: '🌐',
        },
        {
          title: 'Voice, Mobility, & IoT',
          description: 'Voice communications, mobile device management, and Internet of Things solutions.',
          icon: '📱',
        },
        {
          title: 'Desktop & End-User Support',
          description: 'Help desk services, device support, software installation, and end-user training.',
          icon: '🖱️',
        },
        {
          title: 'Service Management & Monitoring',
          description: 'IT service desk, incident management, service monitoring, and performance tracking.',
          icon: '📊',
        },
      ],
    },
    {
      section: 'Project Management Office',
      sectionUrl: '/project-management-office',
      services: [
        {
          title: 'Project Management Services',
          description: 'Project planning, execution, governance, risk management, and delivery oversight.',
          icon: '📈',
        },
      ],
    },
    {
      section: 'Corporate Information Security',
      sectionUrl: '/corporate-information-security',
      services: [
        {
          title: 'Cybersecurity & Risk Management',
          description: 'Threat detection, security monitoring, vulnerability management, and risk assessment.',
          icon: '🔒',
        },
        {
          title: 'Identity & Access Management',
          description: 'User authentication, access controls, identity governance, and privileged access management.',
          icon: '🔑',
        },
      ],
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="container mx-auto max-w-7xl py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-primary-blue mb-4 pb-3 border-b-2 border-[#F4F2F1]">
            Our Services
          </h1>
          <p className="font-serif text-lg md:text-xl text-[#495057] max-w-3xl mt-6">
            Open City & Technology provides comprehensive technology services that support the City of Edmonton&apos;s operations and strategic objectives.
          </p>
        </div>

        {/* Services by Section */}
        {serviceGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-12">
            {/* Section Header */}
            <h2 className="font-sans text-2xl font-bold text-primary-blue mb-6">
              {group.section}
            </h2>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.services.map((service, serviceIndex) => (
                <a
                  key={serviceIndex}
                  href={group.sectionUrl}
                  className="group bg-[#D3ECEF] rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-primary-blue"
                >
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h3 className="font-sans text-xl font-bold text-[#212529] mb-3 group-hover:text-primary-blue transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-sans text-sm text-[#495057] mb-4">
                    {service.description}
                  </p>
                  <div className="flex items-center font-sans text-sm font-semibold text-primary-blue">
                    <span>Learn More</span>
                    <svg
                      className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}

        {/* Contact Information */}
        <div className="bg-[#F4F2F1] rounded-lg p-8 mt-8">
          <h2 className="font-sans text-2xl font-bold text-[#212529] mb-4">
            How Can We Help?
          </h2>
          <p className="font-sans text-base text-[#495057] mb-4">
            Our team of technology professionals is dedicated to delivering secure, reliable, and innovative solutions that enable City operations and improve citizen services.
          </p>
          <p className="font-sans text-base text-[#495057] mb-6">
            For inquiries about any of our services, please visit our contact page or reach out to the appropriate service area directly.
          </p>
          <Link
            href="/contact"
            className="inline-block font-sans text-base font-semibold bg-primary-blue text-white px-6 py-3 rounded-md hover:bg-[#193A5A] transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
