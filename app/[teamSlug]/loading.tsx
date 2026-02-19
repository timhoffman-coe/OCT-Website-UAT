import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TeamPageLoading() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main className="animate-pulse">
        {/* Hero / Title Section */}
        <div className="bg-gray-100 py-10 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="h-8 w-64 bg-gray-300 rounded mb-3" />
            <div className="h-4 w-96 bg-gray-200 rounded" />
          </div>
        </div>

        {/* Content Blocks */}
        <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
          {/* Portfolio cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 rounded-lg p-6 space-y-3">
                <div className="h-10 w-10 bg-gray-300 rounded" />
                <div className="h-5 w-32 bg-gray-300 rounded" />
                <div className="h-3 w-full bg-gray-200 rounded" />
                <div className="h-3 w-3/4 bg-gray-200 rounded" />
              </div>
            ))}
          </div>

          {/* Tabs placeholder */}
          <div className="space-y-4">
            <div className="flex gap-4 border-b border-gray-200 pb-2">
              <div className="h-5 w-20 bg-gray-300 rounded" />
              <div className="h-5 w-24 bg-gray-200 rounded" />
              <div className="h-5 w-20 bg-gray-200 rounded" />
            </div>
            <div className="h-48 bg-gray-100 rounded-lg" />
          </div>

          {/* Team members placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded">
                <div className="h-10 w-10 rounded-full bg-gray-300" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-28 bg-gray-300 rounded" />
                  <div className="h-3 w-40 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
