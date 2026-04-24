import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BudgetLoading() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main id="main-content" className="animate-pulse p-4 md:p-8">
        <p className="sr-only" role="status">Loading content, please wait.</p>
        {/* Title */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="h-8 w-48 bg-gray-300 rounded mb-4" />
          <div className="h-4 w-80 bg-gray-200 rounded" />
        </div>

        <div className="max-w-7xl mx-auto space-y-8">
          {/* Budget overview cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg p-6">
                <div className="h-5 w-40 bg-gray-300 rounded mb-4" />
                <div className="h-64 bg-gray-100 rounded" />
              </div>
            ))}
          </div>

          {/* Section breakdown */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="h-5 w-56 bg-gray-300 rounded mb-4" />
            <div className="h-72 bg-gray-100 rounded" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
