import Link from 'next/link';
import type { OngoingProjectSummary } from './WidgetRenderer';

const STATUS_LABELS: Record<string, string> = {
  PLANNING: 'Planning',
  IN_PROGRESS: 'In Progress',
  ON_HOLD: 'On Hold',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

const STATUS_COLORS: Record<string, string> = {
  PLANNING: 'bg-blue-100 text-blue-800',
  IN_PROGRESS: 'bg-emerald-100 text-emerald-800',
  ON_HOLD: 'bg-amber-100 text-amber-800',
  COMPLETED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
};

interface OngoingProjectsWidgetProps {
  teamName: string;
  teamShortName: string;
  config?: Record<string, string>;
  projects?: OngoingProjectSummary[];
}

export default function OngoingProjectsWidget({ teamName, teamShortName, config, projects }: OngoingProjectsWidgetProps) {
  const heading = config?.heading || 'Ongoing Projects';
  const showViewAll = config?.showViewAll !== 'false';

  // If we have real project data, render the project cards
  if (projects && projects.length > 0) {
    return (
      <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-lg overflow-hidden">
          <div className="bg-primary-blue text-white text-center py-3 font-sans font-bold text-lg tracking-wide">
            {heading.toUpperCase()}
          </div>
          <div className="bg-structural-light-gray py-8 px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="block bg-white rounded-lg p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-sm font-bold tracking-wider uppercase ${STATUS_COLORS[project.status] || 'bg-gray-100 text-gray-600'}`}>
                      {STATUS_LABELS[project.status] || project.status}
                    </span>
                  </div>
                  <h4 className="font-sans text-base font-bold text-primary-blue mb-1 line-clamp-2">
                    {project.title}
                  </h4>
                  {project.description && (
                    <p className="font-sans text-sm text-text-secondary line-clamp-2 mb-3">
                      {project.description}
                    </p>
                  )}
                  <div className="mt-auto">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-primary-blue transition-all" style={{ width: `${project.progress}%` }}></div>
                    </div>
                  </div>
                  {project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {project.tags.map(({ tag }) => (
                        <span key={tag.slug} className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-medium">
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              ))}
            </div>
            {showViewAll && (
              <div className="text-center mt-6">
                <Link
                  href="/projects"
                  className="inline-block bg-primary-blue text-white font-sans font-semibold px-6 py-3 rounded hover:bg-dark-blue transition-colors duration-300"
                >
                  View All Projects
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Fallback: original CTA layout when no projects configured
  const bannerText = config?.bannerText || 'ONGOING PROJECTS';
  const description = config?.description || `See the list of all current Projects for the ${teamName} Team. This list is only projects run through the PMO. For other work requests, see either Remedy or Trello.`;
  const buttonText = config?.buttonText || 'View Project List';
  const buttonLink = config?.buttonLink || '/projects';

  return (
    <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="rounded-lg overflow-hidden">
        <div className="bg-primary-blue text-white text-center py-3 font-sans font-bold text-lg tracking-wide">
          {bannerText}
        </div>
        <div className="bg-structural-light-gray py-10 px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <h3 className="font-sans text-2xl md:text-3xl font-bold text-primary-blue mb-4">
                {heading}
              </h3>
              <p className="font-sans text-text-secondary mb-6">
                {description}
              </p>
              <a
                href={buttonLink}
                className="inline-block bg-primary-blue text-white font-sans font-semibold px-6 py-3 rounded hover:bg-dark-blue transition-colors duration-300"
              >
                {buttonText}
              </a>
            </div>
            <div className="order-1 md:order-2">
              <div className="bg-primary-blue rounded-lg flex items-center justify-center h-64 md:h-80">
                <span className="text-peaceful-light-blue font-sans text-lg">
                  {teamShortName} Projects
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
