import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Corporate Information Security | Open City & Technology',
  description: 'Protecting the City\'s data, assets, and information from cyber threats.',
};

export default function CorporateInformationSecurityPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <main className="container mx-auto max-w-7xl py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-complement-grey-flannel rounded-lg shadow-xl p-8 md:p-12 mb-12">
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-white mb-4">
            Corporate Information Security
          </h1>
          <p className="font-serif text-xl text-white/90">
            Safeguarding citizen privacy and municipal operations.
          </p>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h2 className="font-sans text-3xl font-bold text-gray-800 mb-6">
            Our Approach
          </h2>
          <p className="font-serif text-lg text-gray-700 mb-6">
            We protect the City's data, assets, and information from cyber threats, safeguarding citizen privacy and ensuring the integrity of our municipal operations against evolving risks.
          </p>

          <h3 className="font-sans text-2xl font-semibold text-gray-800 mb-4 mt-8">
            Key Services
          </h3>
          <ul className="font-serif text-lg text-gray-700 space-y-3 list-disc list-inside">
            <li>Security risk assessment and management</li>
            <li>Security architecture and design</li>
            <li>Incident response and monitoring</li>
            <li>Security awareness and training</li>
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  );
}
