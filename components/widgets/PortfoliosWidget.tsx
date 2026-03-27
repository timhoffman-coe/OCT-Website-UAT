import PortfolioCard from '@/components/its-shared/PortfolioCard';
import type { Portfolio } from '@/lib/data/its-shared';

interface PortfoliosWidgetProps {
  portfolios: Portfolio[];
}

export default function PortfoliosWidget({ portfolios }: PortfoliosWidgetProps) {
  if (portfolios.length === 0) return null;
  return (
    <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="font-sans text-2xl md:text-3xl font-bold text-primary-blue mb-6 pb-2 border-b-2 border-structural-gray-blue">
        Our Portfolios
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((portfolio, index) => (
          <PortfolioCard key={index} {...portfolio} />
        ))}
      </div>
    </section>
  );
}
