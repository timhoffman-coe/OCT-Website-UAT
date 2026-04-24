import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function VendorCommandCenterLoading() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main id="main-content" className="animate-pulse p-4 md:p-8">
        <p className="sr-only" role="status">Loading content, please wait.</p>
        {/* Title */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="h-8 w-64 bg-gray-300 rounded mb-4" />
          <div className="h-4 w-96 bg-gray-200 rounded" />
        </div>

        <div className="max-w-7xl mx-auto space-y-6">
          {/* KPI cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4">
                <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
                <div className="h-8 w-12 bg-gray-300 rounded mb-1" />
                <div className="h-3 w-16 bg-gray-200 rounded" />
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow p-4 flex gap-4">
            <div className="h-10 w-48 bg-gray-200 rounded" />
            <div className="h-10 w-32 bg-gray-200 rounded" />
            <div className="h-10 w-32 bg-gray-200 rounded" />
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="h-5 w-40 bg-gray-300 rounded mb-4" />
            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex gap-4 items-center">
                  <div className="h-4 w-40 bg-gray-200 rounded" />
                  <div className="h-4 flex-1 bg-gray-100 rounded" />
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
