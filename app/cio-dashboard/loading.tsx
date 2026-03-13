import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CIODashboardLoading() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="animate-pulse">
        {/* Banner */}
        <div className="bg-gray-300 h-12" />

        {/* Dashboard Header */}
        <div className="bg-white shadow-sm p-4">
          <div className="h-7 w-80 bg-gray-300 rounded" />
        </div>

        <div className="p-4 md:p-6 lg:p-8">
          {/* Metric Cards Row */}
          <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
            <div className="h-5 w-64 bg-gray-300 rounded mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-center p-4">
                  <div className="h-4 w-24 bg-gray-200 rounded mx-auto mb-2" />
                  <div className="h-8 w-16 bg-gray-300 rounded mx-auto mb-1" />
                  <div className="h-3 w-20 bg-gray-200 rounded mx-auto" />
                </div>
              ))}
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg p-4">
                <div className="h-5 w-40 bg-gray-300 rounded mb-4" />
                <div className="h-72 bg-gray-100 rounded" />
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="h-5 w-48 bg-gray-300 rounded mb-4" />
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="h-4 flex-1 bg-gray-100 rounded" />
                  <div className="h-4 w-16 bg-gray-200 rounded" />
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
