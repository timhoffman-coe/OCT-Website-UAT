import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Technology Strategies | Open City & Technology',
  description: 'View technology strategies, roadmaps, and strategic initiatives for Open City & Technology.',
};

const strategies = [
  {
    title: 'Business Technology Strategy',
    description: 'Setting the foundation for core infrastructure and service delivery across the municipal landscape.',
    url: '#',
    year: 'Coming Soon',
    gradientFrom: 'from-dark-blue',
    gradientTo: 'to-primary-blue',
    icon: (
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className="w-24 h-24 text-white/15">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
      </svg>
    ),
  },
  {
    title: 'Edmonton\'s Digital Action Plan',
    description: 'Driving innovation and digital equity for all citizens, bridging the gap between technology and community needs.',
    url: '#',
    year: 'Coming Soon',
    gradientFrom: 'from-process-blue',
    gradientTo: 'to-primary-blue',
    icon: (
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className="w-24 h-24 text-white/15">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
      </svg>
    ),
  },
  {
    title: 'OCT Business Plan',
    description: 'Operational excellence and tactical roadmap for the current fiscal cycle, focusing on measurable performance.',
    url: '#',
    year: 'Coming Soon',
    gradientFrom: 'from-dark-blue',
    gradientTo: 'to-dark-blue',
    icon: (
      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor" className="w-24 h-24 text-white/15">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
];

const archivedStrategies = [
  { year: '2020 — 2024', title: 'Business Technology Strategy', size: '2.1 MB', url: 'https://www.edmonton.ca/sites/default/files/public-files/assets/Business_Technology_Strategy.pdf' },
  { year: '2019 — 2022', title: 'Edmonton\'s Digital Action Plan', size: '1.5 MB', url: 'https://www.edmonton.ca/sites/default/files/public-files/documents/CoE_Digital-Action-Plan.pdf' },
  { year: '2019 — 2022', title: 'OCT Business Plan', size: '2.4 MB', url: 'https://drive.google.com/file/d/1RbhDRsiyXMZT9TBPpnA073-8Wp5WDvHv/view?ts=5d5c252a' },
];

export default function TechnologyStrategiesPage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />

      <main id="main-content" className="flex-grow">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 mb-20">
          <div className="max-w-3xl">
            <span className="text-[0.6875rem] font-bold uppercase tracking-widest text-process-blue mb-4 block">
              Strategic Governance
            </span>
            <h1 className="font-sans text-5xl md:text-6xl font-bold text-dark-blue tracking-tight mb-8">
              Branch Strategy &amp; Planning
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              Our roadmap is defined by a commitment to transparency and innovation. These core governing documents serve as the blueprint for our digital transformation journey, ensuring that every technological investment translates into tangible public value for the community.
            </p>
          </div>
        </section>

        {/* Strategy Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {strategies.map((strategy, index) => (
              <div
                key={index}
                className="group flex flex-col bg-structural-light-gray rounded-xl overflow-hidden border border-structural-gray-blue transition-all duration-300"
              >
                <div className={`h-48 bg-gradient-to-br ${strategy.gradientFrom} ${strategy.gradientTo} relative overflow-hidden flex items-center justify-center`}>
                  {strategy.icon}
                  <div className="absolute top-4 left-4 bg-edmonton-warning/15 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-[0.65rem] font-bold tracking-widest text-edmonton-warning uppercase">{strategy.year}</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-dark-blue mb-3">{strategy.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-8 flex-grow">{strategy.description}</p>
                  <span className="block w-full bg-structural-gray-blue text-text-secondary py-3 rounded-md font-medium text-sm text-center cursor-not-allowed opacity-60">
                    View Strategy →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Content Blade */}
        <section className="mt-24 bg-dark-blue py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-white mb-6">Built for Continuous Evolution</h2>
              <p className="text-white/60 text-lg leading-relaxed">
                Technology never stands still. Our planning process is agile, allowing us to pivot as new municipal priorities emerge and new technological frontiers open up.
              </p>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <div className="bg-white/10 p-6 rounded-lg border border-white/10">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-process-blue mb-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
                <h4 className="text-white font-bold mb-1">Data-Driven</h4>
                <p className="text-white/50 text-xs">Decisions backed by rigorous municipal data analysis.</p>
              </div>
              <div className="bg-white/10 p-6 rounded-lg border border-white/10">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-process-blue mb-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
                <h4 className="text-white font-bold mb-1">Citizen-Centric</h4>
                <p className="text-white/50 text-xs">Designing services that work for every resident.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Archived Strategies */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-20">
          <div className="flex items-center gap-8 mb-8">
            <h2 className="text-2xl font-bold text-dark-blue whitespace-nowrap">Archived Strategies</h2>
            <div className="h-px flex-grow bg-structural-gray-blue" />
          </div>
          <div className="space-y-4">
            {archivedStrategies.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-structural-light-gray hover:bg-structural-gray-blue transition-colors rounded-lg group block"
              >
                <div className="flex items-center gap-6">
                  <span className="text-xs font-bold text-text-secondary w-24">{item.year}</span>
                  <span className="font-medium text-dark-blue">{item.title}</span>
                </div>
                <div className="flex items-center gap-4 text-text-secondary group-hover:text-dark-blue transition-colors">
                  <span className="text-xs uppercase tracking-wider">PDF ({item.size})</span>
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
