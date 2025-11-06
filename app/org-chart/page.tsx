import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'OCT Org Chart | Open City & Technology',
  description: 'View the organizational chart for Open City & Technology.',
};

export default function OrgChartPage() {
  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="container mx-auto max-w-7xl py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-primary-blue mb-4 pb-3 border-b-2 border-[#F4F2F1]">
            OCT Organizational Chart
          </h1>
          <p className="font-serif text-lg md:text-xl text-[#495057] max-w-3xl mt-6">
            View the complete organizational structure of Open City & Technology, including all sections and reporting relationships.
          </p>
        </div>

        {/* Coming Soon Content */}
        <div className="bg-[#D3ECEF] rounded-lg p-8 md:p-12 text-center">
          <h2 className="font-sans text-2xl font-bold text-[#212529] mb-4">
            Coming Soon
          </h2>
          <p className="font-sans text-lg text-[#495057]">
            The organizational chart will be available here shortly.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
