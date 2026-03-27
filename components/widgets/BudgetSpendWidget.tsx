interface BudgetSpendWidgetProps {
  teamName: string;
  config?: Record<string, string>;
}

export default function BudgetSpendWidget({ teamName, config }: BudgetSpendWidgetProps) {
  const heading = config?.heading || 'Budget & Spend';
  const description = config?.description || `View current-year approved budget, YTD spend, and financial forecasts for ${teamName} portfolios.`;
  const buttonText = config?.buttonText || 'Open Budget Report';
  const buttonLink = config?.buttonLink || '#';

  return (
    <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-structural-light-gray border border-structural-gray-blue rounded-lg p-10 text-center">
        <h3 className="font-sans text-2xl font-semibold text-text-dark mb-4">
          {heading}
        </h3>
        <p className="font-sans text-text-secondary max-w-xl mx-auto mb-6">
          {description}
        </p>
        <a
          href={buttonLink}
          className="inline-block bg-process-blue text-white font-sans font-semibold px-6 py-3 rounded hover:bg-dark-blue transition-colors duration-300"
        >
          {buttonText}
        </a>
      </div>
    </section>
  );
}
