import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DashboardsLoading() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main id="main-content" className="animate-pulse p-4 md:p-8">
        <p className="sr-only" role="status">Loading content, please wait.</p>
        <div className="max-w-7xl mx-auto mb-8">
          <div className="h-8 w-40 bg-gray-300 rounded mb-4" />
          <div className="h-4 w-72 bg-gray-200 rounded" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6">
              <div className="h-10 w-10 bg-gray-300 rounded mb-4" />
              <div className="h-5 w-40 bg-gray-300 rounded mb-2" />
              <div className="h-4 w-full bg-gray-200 rounded mb-1" />
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
