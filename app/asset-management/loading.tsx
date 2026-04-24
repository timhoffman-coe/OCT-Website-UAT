import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AssetManagementLoading() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main id="main-content" className="animate-pulse p-4 md:p-8">
        <p className="sr-only" role="status">Loading content, please wait.</p>
        <div className="max-w-7xl mx-auto mb-8">
          <div className="h-8 w-56 bg-gray-300 rounded mb-4" />
        </div>

        <div className="max-w-7xl mx-auto space-y-6">
          {/* KPI row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4 text-center">
                <div className="h-4 w-24 bg-gray-200 rounded mx-auto mb-2" />
                <div className="h-8 w-12 bg-gray-300 rounded mx-auto" />
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                <div className="h-5 w-40 bg-gray-300 rounded mb-4" />
                <div className="h-64 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
