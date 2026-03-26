import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Contact & Support | Open City & Technology',
  description: 'Get in touch with Open City & Technology at the City of Edmonton.',
};

export default function ContactPage() {
  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <header className="mb-16">
          <span className="text-[0.6875rem] uppercase tracking-widest font-bold text-process-blue mb-4 block">
            Civic Services Hub
          </span>
          <h1 className="font-sans text-5xl md:text-6xl font-bold text-dark-blue tracking-tight leading-tight mb-6">
            Contact &amp; Support
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
            The Open City &amp; Technology branch drives digital transformation for Edmonton.
            Connect with our leadership and specialized technical teams to facilitate innovation.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-12">

            {/* Primary Action Cards */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Start Tech Intake */}
              <div className="group relative overflow-hidden p-8 rounded-xl bg-dark-blue text-white transition-all hover:-translate-y-1">
                <div className="mb-8">
                  {/* Rocket icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-white/70">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3 tracking-tight">Start Tech Intake Process</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-8">
                  Ready to launch a new project? Submit your requirements here for architectural review and resource allocation.
                </p>
                <a
                  href="#"
                  className="block w-full py-4 bg-primary-blue text-white font-bold rounded-md text-center hover:bg-process-blue transition-colors"
                >
                  Submit Requirements
                  <span className="ml-2">→</span>
                </a>
              </div>

              {/* Open Support Ticket */}
              <div className="group relative overflow-hidden p-8 rounded-xl bg-white border border-structural-gray-blue transition-all hover:-translate-y-1">
                <div className="mb-8">
                  {/* Ticket icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-process-blue">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-dark-blue mb-3 tracking-tight">Open Support Ticket</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-8">
                  Need technical assistance? Our support team is here to help with application errors, hardware, and access issues.
                </p>
                <a
                  href="#"
                  className="block w-full py-4 bg-process-blue text-white font-bold rounded-md text-center hover:bg-primary-blue transition-colors"
                >
                  Get Assistance
                  <span className="ml-2">→</span>
                </a>
              </div>
            </section>

            {/* Branch Leadership Section */}
            <section className="bg-structural-light-gray rounded-xl p-8 md:p-12 overflow-hidden">
              <span className="text-[0.6875rem] font-bold text-process-blue uppercase tracking-widest mb-8 block">
                Executive Office
              </span>

              {/* Branch Manager — primary, large */}
              <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                {/* Left: Photo + Name */}
                <div className="flex items-center gap-5 flex-1 min-w-0">
                  <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white flex-shrink-0">
                    <Image
                      src="/images/Daryl.webp"
                      alt="Daryl Croft"
                      width={144}
                      height={144}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-[0.6875rem] font-bold text-process-blue uppercase tracking-widest mb-1">
                      Branch Manager
                    </p>
                    <h2 className="text-3xl font-bold text-dark-blue mb-1">Daryl Croft</h2>
                    <p className="text-base text-text-secondary font-medium">
                      Open City &amp; Technology
                    </p>
                  </div>
                </div>

                {/* Right: Action buttons stacked */}
                <div className="flex flex-col gap-3 flex-shrink-0">
                  <a
                    href="mailto:daryl.croft@edmonton.ca"
                    className="px-5 py-2.5 bg-primary-blue text-white rounded-md flex items-center gap-2 hover:bg-dark-blue transition-all font-semibold text-sm justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    Email Branch Manager
                  </a>
                  <Link
                    href="/leadership"
                    className="px-5 py-2.5 border border-structural-gray-blue text-dark-blue font-bold rounded-md hover:bg-white transition-all text-sm text-center"
                  >
                    View Executive Profile
                  </Link>
                </div>
              </div>

              {/* Supporting staff — smaller, side by side */}
              <div className="border-t border-structural-gray-blue pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Charalyn Parlee */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white flex-shrink-0">
                    <Image
                      src="/images/Portraits/Charalyn.webp"
                      alt="Charalyn Parlee"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-[0.625rem] font-bold text-process-blue uppercase tracking-widest mb-0.5">
                      Administrative Assistant
                    </p>
                    <p className="text-base font-bold text-dark-blue">Charalyn Parlee</p>
                    <a
                      href="mailto:charalyn.parlee@edmonton.ca"
                      className="text-sm text-process-blue hover:text-primary-blue transition-colors"
                    >
                      charalyn.parlee@edmonton.ca
                    </a>
                  </div>
                </div>

                {/* Andrew Clark */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white flex-shrink-0">
                    <Image
                      src="/images/Portraits/Andrew.webp"
                      alt="Andrew Clark"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-[0.625rem] font-bold text-process-blue uppercase tracking-widest mb-0.5">
                      Strategic Coordinator
                    </p>
                    <p className="text-base font-bold text-dark-blue">Andrew Clark</p>
                    <a
                      href="mailto:andrew.clark@edmonton.ca"
                      className="text-sm text-process-blue hover:text-primary-blue transition-colors"
                    >
                      andrew.clark@edmonton.ca
                    </a>
                  </div>
                </div>
              </div>

              {/* See all leadership link */}
              <div className="mt-8 pt-6 border-t border-structural-gray-blue text-center">
                <Link
                  href="/leadership"
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary-blue hover:text-dark-blue transition-colors"
                >
                  See the Rest of Our Leadership Team
                  <span>→</span>
                </Link>
              </div>
            </section>

            {/* OCT Sections */}
            <section>
              <h3 className="text-xl font-bold text-dark-blue mb-8 tracking-tight border-l-4 border-process-blue pl-4">
                OCT Sections
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/integrated-technology-solutions"
                  className="p-6 bg-white rounded-lg border border-structural-gray-blue hover:border-process-blue/50 transition-all flex items-center justify-between group"
                >
                  <div>
                    <h4 className="font-bold text-dark-blue mb-1">Integrated Technology Solutions (ITS)</h4>
                    <p className="text-xs text-text-secondary">Infrastructure, networks, and end-user support</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-text-secondary group-hover:text-process-blue transition-colors flex-shrink-0 ml-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </Link>

                <Link
                  href="/application-technology-services"
                  className="p-6 bg-white rounded-lg border border-structural-gray-blue hover:border-process-blue/50 transition-all flex items-center justify-between group"
                >
                  <div>
                    <h4 className="font-bold text-dark-blue mb-1">Application Technology Services (ATS)</h4>
                    <p className="text-xs text-text-secondary">Application development, support, and AI solutions</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-text-secondary group-hover:text-process-blue transition-colors flex-shrink-0 ml-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </Link>

                <Link
                  href="/corporate-information-security"
                  className="p-6 bg-white rounded-lg border border-structural-gray-blue hover:border-process-blue/50 transition-all flex items-center justify-between group"
                >
                  <div>
                    <h4 className="font-bold text-dark-blue mb-1">Corporate Information Security (CIS)</h4>
                    <p className="text-xs text-text-secondary">Cybersecurity, risk management, and identity services</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-text-secondary group-hover:text-process-blue transition-colors flex-shrink-0 ml-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </Link>

                <Link
                  href="/project-management-office"
                  className="p-6 bg-white rounded-lg border border-structural-gray-blue hover:border-process-blue/50 transition-all flex items-center justify-between group"
                >
                  <div>
                    <h4 className="font-bold text-dark-blue mb-1">Project Management Office (PMO)</h4>
                    <p className="text-xs text-text-secondary">Project governance, delivery, and oversight</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-text-secondary group-hover:text-process-blue transition-colors flex-shrink-0 ml-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </Link>

                <Link
                  href="/technology-planning"
                  className="p-6 bg-white rounded-lg border border-structural-gray-blue hover:border-process-blue/50 transition-all flex items-center justify-between group md:col-span-2"
                >
                  <div>
                    <h4 className="font-bold text-dark-blue mb-1">Technology Planning</h4>
                    <p className="text-xs text-text-secondary">Strategic technology direction, investment, and governance</p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-text-secondary group-hover:text-process-blue transition-colors flex-shrink-0 ml-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </Link>
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Location, Contact, Hours */}
            <div className="bg-structural-light-gray p-8 rounded-xl space-y-8">
              {/* Location */}
              <div>
                <h4 className="text-[0.6875rem] font-bold text-process-blue uppercase tracking-widest mb-4">Location</h4>
                <div className="aspect-square rounded-lg mb-4 overflow-hidden border border-structural-gray-blue">
                  <iframe
                    src="https://maps.google.com/maps?q=Century+Place,+9803+102A+Ave+NW,+Edmonton,+AB+T5J+3A3&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Century Place location map"
                  />
                </div>
                <address className="not-italic text-text-dark leading-relaxed">
                  <p className="font-bold">Century Place</p>
                  <p>9803 102A Ave NW</p>
                  <p>Edmonton, AB T5J 3A3</p>
                </address>
              </div>

              <div className="h-px bg-structural-gray-blue"></div>

              {/* General Contact */}
              <div>
                <h4 className="text-[0.6875rem] font-bold text-process-blue uppercase tracking-widest mb-4">Contact Service Desk</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-process-blue flex-shrink-0 mt-0.5">
                      <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-bold text-dark-blue">780-944-4311</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-process-blue flex-shrink-0 mt-0.5">
                      <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-bold text-dark-blue">311</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-structural-gray-blue"></div>

              {/* Operating Hours */}
              <div>
                <h4 className="text-[0.6875rem] font-bold text-process-blue uppercase tracking-widest mb-4">Operating Hours</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Monday – Friday</span>
                    <span className="font-bold text-dark-blue">8:00am – 4:30pm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Weekends</span>
                    <span className="font-bold text-edmonton-error">Closed</span>
                  </div>
                  <p className="text-[10px] text-text-secondary mt-4 italic">
                    Note: Technical Support operates 24/7 for critical infrastructure emergencies.
                  </p>
                </div>
              </div>
            </div>

            {/* Service Health Accent Card */}
            <div className="bg-dark-blue p-8 rounded-xl text-white">
              <h4 className="text-lg font-bold mb-4 tracking-tight">Service Health</h4>
              <p className="text-sm text-white/80 mb-6 leading-relaxed">
                Check the current status of technology services and infrastructure across the City of Edmonton.
              </p>
              <Link
                href="/service-health"
                className="inline-flex items-center gap-2 text-sm font-bold hover:gap-4 transition-all text-white"
              >
                View Status
                <span>→</span>
              </Link>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
