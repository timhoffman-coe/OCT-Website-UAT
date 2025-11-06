import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Project Management Office | Open City & Technology',
  description: 'Ensuring technology projects are delivered on time, on budget, and meet strategic goals.',
};

export default function ProjectManagementOfficePage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <main className="container mx-auto max-w-7xl py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-complement-sunrise rounded-lg shadow-xl p-8 md:p-12 mb-12">
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-white mb-4">
            Project Management Office
          </h1>
          <p className="font-serif text-xl text-gray-800/90">
            Delivering excellence in technology projects.
          </p>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h2 className="font-sans text-3xl font-bold text-gray-800 mb-6">
            Our Approach
          </h2>
          <p className="font-serif text-lg text-gray-700 mb-6">
            We provide the governance, standards, and oversight for successful project delivery, ensuring technology projects are delivered on time, on budget, and meet strategic goals.
          </p>

          <h3 className="font-sans text-2xl font-semibold text-gray-800 mb-4 mt-8">
            Key Services
          </h3>
          <ul className="font-serif text-lg text-gray-700 space-y-3 list-disc list-inside">
            <li>Project portfolio management</li>
            <li>Project governance and methodology</li>
            <li>Risk and issue management</li>
            <li>Project performance monitoring</li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
}
