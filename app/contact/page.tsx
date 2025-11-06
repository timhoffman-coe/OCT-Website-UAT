import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Contact Us | Open City & Technology',
  description: 'Get in touch with Open City & Technology at the City of Edmonton.',
};

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="container mx-auto max-w-7xl py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-primary-blue mb-4 pb-3 border-b-2 border-[#F4F2F1]">
            Contact Us
          </h1>
          <p className="font-serif text-lg md:text-xl text-[#495057] max-w-3xl mt-6">
            Get in touch with Open City & Technology. We're here to help with your technology needs and inquiries.
          </p>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Branch Manager's Office */}
          <div className="bg-[#D3ECEF] rounded-lg p-8 flex flex-col">
            <h2 className="font-sans text-2xl font-bold text-[#212529] mb-8">
              Branch Manager's Office
            </h2>
            <div className="space-y-8 flex-1">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-16 h-16 rounded-full bg-primary-blue flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">DC</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-sans text-xs font-semibold text-primary-blue uppercase mb-1">
                    Branch Manager
                  </p>
                  <p className="font-sans text-xl font-bold text-[#212529] mb-1">
                    Daryl Croft
                  </p>
                  <a
                    href="mailto:daryl.croft@edmonton.ca"
                    className="font-sans text-base text-complement-sea-green hover:text-primary-blue transition-colors"
                  >
                    daryl.croft@edmonton.ca
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-16 h-16 rounded-full bg-complement-sea-green flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">CP</span>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-sans text-xs font-semibold text-primary-blue uppercase mb-1">
                    Administrative Assistant
                  </p>
                  <p className="font-sans text-xl font-bold text-[#212529] mb-1">
                    Charalyn Parlee
                  </p>
                  <a
                    href="mailto:charalyn.parlee@edmonton.ca"
                    className="font-sans text-base text-complement-sea-green hover:text-primary-blue transition-colors"
                  >
                    charalyn.parlee@edmonton.ca
                  </a>
                </div>
              </div>
            </div>
            <a
              href="/leadership"
              className="mt-6 block w-full text-center font-sans text-base font-semibold bg-primary-blue text-white px-6 py-3 rounded-md hover:bg-[#193A5A] transition-colors"
            >
              See the Rest of Our Leadership Team →
            </a>
          </div>

          {/* General Information */}
          <div className="bg-[#F4F2F1] rounded-lg p-8">
            <h2 className="font-sans text-2xl font-bold text-[#212529] mb-6">
              Quick Actions
            </h2>
            <div className="space-y-6">
              {/* New Request */}
              <div className="bg-white rounded-lg p-6 border-2 border-[#DDE3E6] hover:border-primary-blue transition-all">
                <div className="flex items-start">
                  <div className="text-3xl mr-4">📋</div>
                  <div className="flex-1">
                    <h3 className="font-sans text-lg font-bold text-[#212529] mb-2">
                      Have a new request?
                    </h3>
                    <p className="font-sans text-sm text-[#495057] mb-4">
                      Start a technology intake to submit new project requests, service requests, or technology initiatives.
                    </p>
                    <a
                      href="#"
                      className="inline-block font-sans text-base font-semibold bg-primary-blue text-white px-6 py-2 rounded-md hover:bg-[#193A5A] transition-colors"
                    >
                      Start Technology Intake →
                    </a>
                  </div>
                </div>
              </div>

              {/* Need Help */}
              <div className="bg-white rounded-lg p-6 border-2 border-[#DDE3E6] hover:border-primary-blue transition-all">
                <div className="flex items-start">
                  <div className="text-3xl mr-4">🎫</div>
                  <div className="flex-1">
                    <h3 className="font-sans text-lg font-bold text-[#212529] mb-2">
                      Need help?
                    </h3>
                    <p className="font-sans text-sm text-[#495057] mb-4">
                      Open a support ticket for technical assistance, troubleshooting, or service desk help.
                    </p>
                    <a
                      href="#"
                      className="inline-block font-sans text-base font-semibold bg-primary-blue text-white px-6 py-2 rounded-md hover:bg-[#193A5A] transition-colors"
                    >
                      Open Support Ticket →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service-Specific Contacts */}
        <div className="mb-12">
          <h2 className="font-sans text-3xl font-bold text-primary-blue mb-6">
            Section Contacts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Technology Planning */}
            <div className="bg-white border-2 border-[#F4F2F1] rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-sans text-xl font-bold text-[#212529] mb-3">
                Technology Planning
              </h3>
              <p className="font-sans text-sm text-[#495057] mb-4">
                Strategic technology direction, investment, and governance
              </p>
              <a
                href="/technology-planning"
                className="font-sans text-base font-semibold text-primary-blue hover:text-complement-sea-green transition-colors"
              >
                Learn More →
              </a>
            </div>

            {/* Business Solutions */}
            <div className="bg-white border-2 border-[#F4F2F1] rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-sans text-xl font-bold text-[#212529] mb-3">
                Business Solutions
              </h3>
              <p className="font-sans text-sm text-[#495057] mb-4">
                Application development, support, and AI solutions
              </p>
              <a
                href="/business-solutions"
                className="font-sans text-base font-semibold text-primary-blue hover:text-complement-sea-green transition-colors"
              >
                Learn More →
              </a>
            </div>

            {/* Integrated Technology Solutions */}
            <div className="bg-white border-2 border-[#F4F2F1] rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-sans text-xl font-bold text-[#212529] mb-3">
                Integrated Technology Solutions
              </h3>
              <p className="font-sans text-sm text-[#495057] mb-4">
                Infrastructure, networks, and end-user support
              </p>
              <a
                href="/integrated-technology-solutions"
                className="font-sans text-base font-semibold text-primary-blue hover:text-complement-sea-green transition-colors"
              >
                Learn More →
              </a>
            </div>

            {/* Project Management Office */}
            <div className="bg-white border-2 border-[#F4F2F1] rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-sans text-xl font-bold text-[#212529] mb-3">
                Project Management Office
              </h3>
              <p className="font-sans text-sm text-[#495057] mb-4">
                Project governance, delivery, and oversight
              </p>
              <a
                href="/project-management-office"
                className="font-sans text-base font-semibold text-primary-blue hover:text-complement-sea-green transition-colors"
              >
                Learn More →
              </a>
            </div>

            {/* Corporate Information Security */}
            <div className="bg-white border-2 border-[#F4F2F1] rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-sans text-xl font-bold text-[#212529] mb-3">
                Corporate Information Security
              </h3>
              <p className="font-sans text-sm text-[#495057] mb-4">
                Cybersecurity, risk management, and identity services
              </p>
              <a
                href="/corporate-information-security"
                className="font-sans text-base font-semibold text-primary-blue hover:text-complement-sea-green transition-colors"
              >
                Learn More →
              </a>
            </div>

            {/* Service Health */}
            <div className="bg-white border-2 border-[#F4F2F1] rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-sans text-xl font-bold text-[#212529] mb-3">
                Service Health
              </h3>
              <p className="font-sans text-sm text-[#495057] mb-4">
                Check current status of technology services
              </p>
              <a
                href="/service-health"
                className="font-sans text-base font-semibold text-primary-blue hover:text-complement-sea-green transition-colors"
              >
                View Status →
              </a>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-[#DDE3E6] rounded-lg p-8">
          <h2 className="font-sans text-2xl font-bold text-[#212529] mb-4">
            Office Location
          </h2>
          <p className="font-sans text-base text-[#495057] mb-2">
            City of Edmonton
          </p>
          <p className="font-sans text-base text-[#495057] mb-2">
            Financial and Corporate Services
          </p>
          <p className="font-sans text-base text-[#495057]">
            Open City & Technology
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
