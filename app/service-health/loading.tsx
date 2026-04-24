import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ServiceHealthLoading() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main id="main-content" className="animate-pulse p-4 md:p-8">
        <p className="sr-only" role="status">Loading content, please wait.</p>
        {/* Title */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="h-8 w-56 bg-gray-300 rounded mb-4" />
          <div className="h-4 w-96 bg-gray-200 rounded" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Status overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="h-6 w-40 bg-gray-300 rounded mb-4" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-20 bg-gray-100 rounded-lg" />
                ))}
              </div>
            </div>
            {/* Service groups */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                <div className="h-5 w-48 bg-gray-300 rounded mb-3" />
                <div className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className="h-3 w-3 bg-gray-300 rounded-full" />
                      <div className="h-4 w-40 bg-gray-200 rounded" />
                      <div className="ml-auto h-4 w-16 bg-gray-200 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Calendar sidebar */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="h-6 w-32 bg-gray-300 rounded mb-4" />
            <div className="h-64 bg-gray-100 rounded" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
