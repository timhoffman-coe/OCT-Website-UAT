import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RoadmapLoading() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="animate-pulse">
        {/* Header */}
        <div className="bg-white shadow-sm p-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="h-8 w-64 bg-gray-300 rounded" />
            <div className="flex gap-2">
              <div className="h-10 w-28 bg-gray-200 rounded" />
              <div className="h-10 w-28 bg-gray-200 rounded" />
            </div>
          </div>
        </div>

        {/* Roadmap Sections */}
        <div className="max-w-7xl mx-auto p-6 space-y-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-6 w-6 bg-gray-300 rounded" />
                <div className="h-6 w-48 bg-gray-300 rounded" />
              </div>
              {/* Gantt-style bars */}
              <div className="space-y-3">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="flex items-center gap-4">
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                    <div className="flex-1 h-8 bg-gray-100 rounded-full">
                      <div
                        className="h-8 bg-gray-200 rounded-full"
                        style={{ width: `${30 + j * 15}%`, marginLeft: `${j * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
