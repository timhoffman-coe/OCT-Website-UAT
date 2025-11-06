import Link from 'next/link';
import Image from 'next/image';

export default function Sections() {
  const units = [
    {
      title: 'Technology Planning',
      href: '/technology-planning',
      image: '/images/TechPlan.png',
      bgColor: 'bg-complement-empire-blue',
      footerColor: 'bg-primary-blue',
      giantText: 'strategy',
      description: 'Strategizing and roadmapping the future of technology for the City. We align technology investments with corporate goals to ensure Edmonton is ready for tomorrow\'s challenges.',
    },
    {
      title: 'Business Solutions',
      href: '/business-solutions',
      image: '/images/BS.png',
      bgColor: 'bg-complement-spring-mist',
      footerColor: 'bg-complement-sea-green',
      giantText: 'applications',
      description: 'Developing, implementing, and supporting the applications that power City services. From 311 to internal tools, we build the software that serves our citizens and staff.',
    },
    {
      title: 'Integrated Technology Solutions',
      href: '/integrated-technology-solutions',
      image: '/images/ITS.png',
      bgColor: 'bg-complement-sea-green',
      footerColor: 'bg-teal-800',
      giantText: 'infrastructure',
      description: 'Managing the core infrastructure, networks, and systems that keep the City connected. We are the foundation for all digital services, ensuring reliability and performance.',
    },
    {
      title: 'Project Management Office',
      href: '/project-management-office',
      image: '/images/PMO.png',
      bgColor: 'bg-complement-sunrise',
      footerColor: 'bg-amber-700',
      giantText: 'projects',
      textOpacity: 'opacity-20',
      textColor: 'text-gray-800',
      description: 'Ensuring technology projects are delivered on time, on budget, and meet strategic goals. We provide the governance, standards, and oversight for successful project delivery.',
    },
    {
      title: 'Corporate Information Security',
      href: '/corporate-information-security',
      image: '/images/CISO.png',
      bgColor: 'bg-complement-grey-flannel',
      footerColor: 'bg-gray-700',
      giantText: 'security',
      description: 'Protecting the City\'s data, assets, and information from cyber threats. We safeguard citizen privacy and ensure the integrity of our municipal operations against evolving risks.',
    },
  ];

  return (
    <main id="sections" className="container mx-auto max-w-7xl py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <h3 className="font-sans text-3xl font-bold text-center text-gray-800 mb-10 md:mb-12">
        Sections
      </h3>

      {/* Grid layout (5-column grid on xl screens) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
        {units.map((unit, index) => (
          <Link
            key={index}
            href={unit.href}
            className="card-container group relative rounded-lg shadow-xl overflow-hidden block h-[500px]"
            title={unit.description}
          >
            {/* Full Image Background */}
            <Image
              src={unit.image}
              alt={unit.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Hover Overlay with Description */}
            <div className="absolute inset-0 bg-gray-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-start justify-center pt-8 pb-40 px-6">
              <p className="font-serif text-lg text-white text-center leading-relaxed drop-shadow-lg">
                {unit.description}
              </p>
            </div>

            {/* Title Overlay at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-primary-blue bg-opacity-95 flex items-center justify-center p-6 h-36">
              <h4 className="font-sans text-2xl font-semibold text-white text-center leading-tight">
                {unit.title}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
