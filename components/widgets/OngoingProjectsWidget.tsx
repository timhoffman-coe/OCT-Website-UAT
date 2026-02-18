interface OngoingProjectsWidgetProps {
  teamName: string;
  teamShortName: string;
  config?: Record<string, string>;
}

export default function OngoingProjectsWidget({ teamName, teamShortName, config }: OngoingProjectsWidgetProps) {
  const bannerText = config?.bannerText || 'ONGOING PROJECTS';
  const heading = config?.heading || 'Projects';
  const description = config?.description || `See the list of all current Projects for the ${teamName} Team. This list is only projects run through the PMO. For other work requests, see either Remedy or Trello.`;
  const buttonText = config?.buttonText || 'View Project List';
  const buttonLink = config?.buttonLink || '#';

  return (
    <section>
      <div className="bg-primary-blue text-white text-center py-3 font-sans font-bold text-lg tracking-wide">
        {bannerText}
      </div>
      <div className="bg-[#F4F2F1] py-10 px-[5%]">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <h3 className="font-sans text-2xl md:text-3xl font-bold text-primary-blue mb-4">
              {heading}
            </h3>
            <p className="font-sans text-gray-600 mb-6">
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
              <span className="text-[#D3ECEF] font-sans text-lg">
                {teamShortName} Projects
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
