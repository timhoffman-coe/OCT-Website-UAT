import Link from 'next/link';

export default function BudgetSection() {
  return (
    <section id="budget" className="bg-complement-sea-green py-16 sm:py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 text-center">
          <h2 className="font-sans text-3xl md:text-4xl font-bold text-primary-blue mb-6">
            Budget & Spend
          </h2>
          <p className="font-sans text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
            View current-year approved budget, YTD spend, and financial forecasts for Open City and Technology.
          </p>
          <Link
            href="/budget"
            className="inline-block font-sans text-base font-semibold bg-primary-blue text-white px-8 py-3 rounded-md hover:bg-complement-sea-green transition-colors shadow-md"
          >
            Open Budget Report
          </Link>
        </div>
      </div>
    </section>
  );
}
