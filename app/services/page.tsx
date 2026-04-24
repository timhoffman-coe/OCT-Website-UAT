import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Our Services | Open City & Technology',
  description: 'Explore the technology services and solutions provided by Open City & Technology at the City of Edmonton.',
};

export default function ServicesPage() {
  const sections = [
    {
      title: 'Technology Planning',
      url: '/technology-planning',
      icon: '🏛️',
      description: 'Strategic oversight of technology investments, portfolio management, business engagement, and enterprise architecture.'
    },
    {
      title: 'Application Technology Services',
      url: '/application-technology-services',
      icon: '💻',
      description: 'Custom software development, application maintenance, system integration, and advanced artificial intelligence solutions.'
    },
    {
      title: 'Integrated Technology Solutions',
      url: '/integrated-technology-solutions',
      icon: '🌐',
      description: 'Enterprise server management, cloud infrastructure, network connectivity, and comprehensive end-user support.'
    },
    {
      title: 'Project Management Office',
      url: '/project-management-office',
      icon: '📈',
      description: 'Project planning, governance frameworks, risk management strategies, and delivery oversight for technology initiatives.'
    },
    {
      title: 'Corporate Information Security',
      url: '/corporate-information-security',
      icon: '🔒',
      description: 'Cybersecurity threat detection, vulnerability management, access controls, and enterprise identity governance.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] selection:bg-primary-blue/20">
      <Header />

      <main id="main-content" className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative">
        {/* Ambient background decoration */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] pointer-events-none" 
          style={{ background: 'radial-gradient(ellipse at top, rgba(0, 105, 180, 0.05) 0%, rgba(255, 255, 255, 0) 70%)' }} 
        />

        {/* Page Heading */}
        <div className="max-w-4xl mx-auto text-center mb-24 relative z-10">
          <h1 className="font-sans text-5xl md:text-6xl lg:text-7xl font-extrabold text-text-dark tracking-tight mb-8">
            Our <span className="text-primary-blue relative whitespace-nowrap">
              Services
              <svg aria-hidden="true" className="absolute -bottom-2 left-0 w-full h-3 text-primary-blue/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5 Q 50 0 0 5" fill="currentColor" />
              </svg>
            </span>
          </h1>
          <p className="font-serif text-xl md:text-2xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
            Delivering secure, reliable, and innovative technology solutions that enable the City of Edmonton&apos;s operations and strategic objectives.
          </p>
        </div>

        {/* Minimalistic Symmetric Cards */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-10 max-w-6xl mx-auto relative z-10">
          {sections.map((section, index) => (
            <Link
              key={index}
              href={section.url}
              className="flex-1 min-w-[320px] max-w-[380px] flex flex-col items-center text-center p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden"
            >
              {/* Subtle background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary-blue/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="mb-8 p-6 rounded-3xl bg-structural-light-gray group-hover:bg-primary-blue/[0.08] transition-colors duration-500 relative z-10">
                 <span className="text-6xl block group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 ease-out">{section.icon}</span>
              </div>
              
              <h2 className="text-2xl font-bold text-text-dark mb-5 group-hover:text-primary-blue transition-colors duration-300 relative z-10 leading-tight">
                {section.title}
              </h2>
              
              <p className="text-text-secondary text-base leading-relaxed flex-grow relative z-10">
                {section.description}
              </p>
              
              {/* Dynamic Bottom Edge Indicator */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1.5 bg-primary-blue group-hover:w-full transition-all duration-500 ease-out rounded-t-full" />
            </Link>
          ))}
        </div>

        {/* Sleek Contact CTA */}
        <div className="mt-32 max-w-2xl mx-auto text-center relative z-10">
          <p className="font-serif text-text-secondary text-xl mb-8">
            Looking for something specific or need direct assistance?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-3 px-10 py-4 rounded-full bg-white border-2 border-gray-100 text-text-dark font-semibold text-lg hover:border-primary-blue hover:text-primary-blue hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 group"
          >
            <span>Contact Our Team</span>
            <svg aria-hidden="true" className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
