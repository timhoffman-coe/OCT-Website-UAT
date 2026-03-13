import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadershipContent from '@/components/leadership/LeadershipContent';

export const metadata = {
  title: 'Leadership | Open City & Technology',
  description: 'Meet the leadership team behind Open City and Technology at the City of Edmonton.',
};

export default function LeadershipPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <main className="p-4 md:p-8 lg:p-12">
        {/* Page Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-blue mb-4">
            Leadership Team
          </h1>
          <p className="font-sans text-lg text-gray-700">
            Meet the leadership team behind Open City and Technology. Our experienced leaders guide the strategic direction and operational excellence of our branch.
          </p>
        </div>

        <LeadershipContent />
      </main>

      <Footer />
    </div>
  );
}
