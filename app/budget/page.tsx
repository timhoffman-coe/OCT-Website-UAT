import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BudgetPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <main className="p-4 md:p-8 lg:p-12">
        {/* Page Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-blue mb-4">
            Budget & Spend Report
          </h1>
          <p className="font-sans text-lg text-gray-700">
            Current-year approved budget, YTD spend, and financial forecasts for Open City and Technology.
          </p>
        </div>

        {/* Budget Content Placeholder */}
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="font-sans text-2xl font-bold text-gray-800 mb-6">
              Financial Overview
            </h2>
            <p className="font-sans text-gray-600 mb-4">
              Budget and spending information will be displayed here.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-sans text-lg font-semibold text-complement-empire-blue mb-2">
                  Approved Budget
                </h3>
                <p className="font-sans text-gray-600">
                  Current year budget allocation
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-sans text-lg font-semibold text-complement-empire-blue mb-2">
                  YTD Spend
                </h3>
                <p className="font-sans text-gray-600">
                  Year-to-date expenditure
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-sans text-lg font-semibold text-complement-empire-blue mb-2">
                  Forecast
                </h3>
                <p className="font-sans text-gray-600">
                  Projected end-of-year totals
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
