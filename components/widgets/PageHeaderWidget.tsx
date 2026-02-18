interface PageHeaderWidgetProps {
  teamName: string;
  config?: Record<string, string>;
}

export default function PageHeaderWidget({ teamName, config }: PageHeaderWidgetProps) {
  const subtitle = config?.subtitle || 'Integrated Technology Services (ITS) \u00b7 Open City & Technology (OCT)';
  const buttonText = config?.buttonText || 'Submit a Support Request';
  const buttonLink = config?.buttonLink || '#';
  const phoneText = config?.phoneText || 'For urgent incidents, call 780-123-4567';

  return (
    <section className="bg-white border-b-[3px] border-primary-blue py-6 px-[5%]">
      <div className="container mx-auto max-w-7xl flex flex-wrap justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="font-sans text-3xl md:text-4xl font-bold text-primary-blue">
              {teamName}
            </h1>
            <p className="font-sans text-sm text-gray-600 mt-1">
              {subtitle}
            </p>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <a
            href={buttonLink}
            className="inline-block bg-primary-blue text-white font-sans font-semibold px-6 py-3 rounded hover:bg-dark-blue transition-colors duration-300 mb-2"
          >
            {buttonText}
          </a>
          <p className="font-sans text-xs text-gray-600">
            {phoneText}
          </p>
        </div>
      </div>
    </section>
  );
}
