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
