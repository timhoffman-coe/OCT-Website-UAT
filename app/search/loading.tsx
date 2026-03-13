import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SearchLoading() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="animate-pulse p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          {/* Search bar */}
          <div className="h-12 w-full bg-gray-200 rounded-lg mb-8" />

          {/* Results */}
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4">
                <div className="h-5 w-48 bg-gray-300 rounded mb-2" />
                <div className="h-4 w-full bg-gray-200 rounded mb-1" />
                <div className="h-4 w-2/3 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
