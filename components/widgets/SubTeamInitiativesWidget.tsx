import Link from 'next/link';

interface Initiative {
  title: string;
  description: string;
  href: string;
}

interface SubTeamInitiativesWidgetProps {
  initiatives: Initiative[];
}

export default function SubTeamInitiativesWidget({ initiatives }: SubTeamInitiativesWidgetProps) {
  if (initiatives.length === 0) return null;
  return (
    <section>
      <h2 className="font-sans text-xl md:text-2xl font-bold text-primary-blue mb-2 pb-2 border-b-2 border-[#F4F2F1]">
        Current Initiatives
      </h2>
      <p className="font-sans text-gray-600 mb-6">
        Key projects currently underway within this portfolio.
      </p>

      <div className="space-y-6">
        {initiatives.map((initiative, index) => (
          <div
            key={index}
            className="border-l-4 border-primary-blue pl-5"
          >
            <h3 className="font-sans text-primary-blue font-bold text-lg mb-1">
              {initiative.title}
            </h3>
            <p className="font-sans text-sm text-gray-600 mb-2">
              {initiative.description}
            </p>
            <Link
              href={initiative.href}
              className="font-sans text-sm text-primary-blue font-semibold hover:underline"
            >
              View Project Docs &rarr;
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
