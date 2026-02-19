import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SubTeamPageLoading() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main className="animate-pulse">
        {/* Header section */}
        <div className="bg-gray-100 py-8 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="h-4 w-40 bg-gray-200 rounded mb-4" />
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-gray-300 rounded-lg" />
              <div className="space-y-2">
                <div className="h-7 w-56 bg-gray-300 rounded" />
                <div className="h-4 w-80 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="md:col-span-2 space-y-6">
              <div className="space-y-3">
                <div className="h-6 w-32 bg-gray-300 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-5/6 bg-gray-200 rounded" />
              </div>
              <div className="space-y-3">
                <div className="h-6 w-40 bg-gray-300 rounded" />
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-lg space-y-2">
                    <div className="h-5 w-48 bg-gray-300 rounded" />
                    <div className="h-3 w-full bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-5 space-y-3">
                <div className="h-5 w-24 bg-gray-300 rounded" />
                {[1, 2].map((i) => (
                  <div key={i} className="space-y-1">
                    <div className="h-4 w-28 bg-gray-200 rounded" />
                    <div className="h-3 w-36 bg-gray-200 rounded" />
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 rounded-lg p-5 space-y-3">
                <div className="h-5 w-28 bg-gray-300 rounded" />
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-10 w-full bg-gray-200 rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
