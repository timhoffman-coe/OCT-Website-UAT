import Link from 'next/link';
import Image from 'next/image';

const teams = [
  {
    title: 'Technology Planning',
    href: '/technology-planning',
    image: '/images/TechPlan.webp',
    description: 'Strategizing and roadmapping the future of technology for the City.',
    hoverColor: 'group-hover:bg-edmonton-warning',
  },
  {
    title: 'Application Technology Services',
    href: '/application-technology-services',
    image: '/images/BS.webp',
    description: 'Developing, implementing, and supporting the applications that power City services.',
    hoverColor: 'group-hover:bg-primary-blue',
  },
  {
    title: 'Integrated Technology Solutions',
    href: '/integrated-technology-solutions',
    image: '/images/ITS.webp',
    description: 'Managing the core infrastructure, networks, and systems that keep the City connected.',
    hoverColor: 'group-hover:bg-process-blue',
  },
  {
    title: 'Project Management Office',
    href: '/project-management-office',
    image: '/images/PMO.webp',
    description: 'Ensuring technology projects are delivered on time, on budget, and meet strategic goals.',
    hoverColor: 'group-hover:bg-edmonton-success',
  },
  {
    title: 'Corporate Information Security',
    href: '/corporate-information-security',
    image: '/images/CISO.webp',
    description: 'Protecting the City\'s data, assets, and information from cyber threats.',
    hoverColor: 'group-hover:bg-dark-blue',
  },
];

export default function Sections() {
  return (
    <>
      {/* Quick Metrics Bar */}
      <section className="relative z-10 w-full bg-primary-blue border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="flex flex-col items-center justify-center text-center px-4 py-4 md:py-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#B3D4E7] mb-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
              <p className="text-3xl font-black text-white mb-1">10,000+</p>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">Endpoints Maintained</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4 py-4 md:py-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#B3D4E7] mb-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
              </svg>
              <p className="text-3xl font-black text-white mb-1">24/7</p>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">Support Availability</p>
            </div>
            <div className="flex flex-col items-center justify-center text-center px-4 py-4 md:py-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-[#B3D4E7] mb-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 .75-7.425A4.502 4.502 0 0 0 14.25 9 4.5 4.5 0 0 0 9.99 11.1A4.5 4.5 0 0 0 2.25 15Z" />
              </svg>
              <p className="text-3xl font-black text-white mb-1">99.9%</p>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/50">System Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Teams Section with gradient */}
      <section id="sections" className="relative bg-gradient-to-b from-primary-blue to-white pt-24 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <h2 className="text-3xl font-black text-white tracking-tight">Explore Your Hub</h2>
          </div>

          {/* Featured OCT Card */}
          <div className="mb-12">
            <Link
              href="/about"
              className="group relative flex flex-col md:flex-row items-center gap-8 bg-white p-2 md:p-3 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-structural-gray-blue"
            >
              <div className="relative w-full md:w-5/12 h-64 md:h-80 rounded-[1.5rem] overflow-hidden shrink-0">
                <Image
                  src="/images/skyline.webp"
                  alt="Edmonton skyline"
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-dark-blue/20 group-hover:bg-dark-blue/10 transition-colors" />
              </div>
              <div className="flex-1 px-8 py-8 md:py-4">
                <span className="text-[11px] font-black uppercase tracking-widest text-process-blue mb-3 block">Consolidated Resource</span>
                <h3 className="text-3xl md:text-4xl font-black text-dark-blue mb-4">Open City &amp; Technology Branch</h3>
                <p className="text-text-secondary max-w-xl leading-relaxed mb-8 text-lg">Your central workspace for branch-wide directives, strategic roadmaps, and administrative toolsets designed for every team member.</p>
                <div className="inline-flex items-center gap-4 px-8 py-4 bg-process-blue text-white font-bold rounded-xl group-hover:bg-dark-blue transition-all duration-300 shadow-lg">
                  <span>Enter Branch Overview</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </Link>
          </div>

          {/* Team Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {teams.map((team, index) => (
              <Link
                key={index}
                href={team.href}
                className="group relative bg-white rounded-2xl shadow-sm border border-structural-gray-blue hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              >
                <div className="h-32 w-full overflow-hidden relative">
                  <Image
                    src={team.image}
                    alt={team.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 20vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark-blue leading-snug mb-4 text-center min-h-[5rem]">{team.title}</h3>
                  <p className="text-base text-text-secondary leading-relaxed mb-6">{team.description}</p>
                  <div className="flex items-center text-process-blue text-[10px] font-black uppercase tracking-widest gap-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    Enter Workspace
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
