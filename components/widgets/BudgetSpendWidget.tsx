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
      <div className="bg-[#DDE3E6] rounded-lg p-10 text-center">
        <h3 className="font-sans text-2xl font-semibold text-gray-900 mb-4">
          {heading}
        </h3>
        <p className="font-sans text-gray-600 max-w-xl mx-auto mb-6">
          {description}
        </p>
        <a
          href={buttonLink}
          className="inline-block bg-[#DDE3E6] border-2 border-[#DDE3E6] text-gray-900 font-sans font-semibold px-6 py-3 rounded hover:bg-[#c8d0d3] transition-colors duration-300"
        >
          {buttonText}
        </a>
      </div>
    </section>
  );
}
