import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Technology Planning | Open City & Technology',
  description: 'Strategizing and roadmapping the future of technology for the City of Edmonton.',
};

export default function TechnologyPlanningPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <main className="container mx-auto max-w-7xl py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-complement-empire-blue rounded-lg shadow-xl p-8 md:p-12 mb-12">
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-white mb-4">
            Technology Planning
          </h1>
          <p className="font-serif text-xl text-white/90">
            Strategizing and roadmapping the future of technology for the City.
          </p>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h2 className="font-sans text-3xl font-bold text-gray-800 mb-6">
            Our Approach
          </h2>
          <p className="font-serif text-lg text-gray-700 mb-6">
            We align technology investments with corporate goals to ensure Edmonton is ready for tomorrow's challenges.
          </p>

          <h3 className="font-sans text-2xl font-semibold text-gray-800 mb-4 mt-8">
            Key Services
          </h3>
          <ul className="font-serif text-lg text-gray-700 space-y-3 list-disc list-inside">
            <li>Strategic technology planning and roadmapping</li>
            <li>Enterprise architecture</li>
            <li>Technology investment planning</li>
            <li>Innovation and emerging technology assessment</li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
}
