import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadershipContent from '@/components/leadership/LeadershipContent';

export const metadata = {
  title: 'Leadership | Open City & Technology',
  description: 'Meet the leadership team behind Open City and Technology at the City of Edmonton.',
};

export default function LeadershipPage() {
  return (
    <div className="bg-structural-light-gray min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 mb-20">
          <div className="max-w-3xl">
            <span className="text-process-blue font-bold tracking-widest text-[0.6875rem] uppercase mb-4 block">
              Executive Leadership
            </span>
            <h1 className="font-sans text-5xl md:text-6xl font-extrabold text-dark-blue leading-none tracking-tight mb-6">
              Our Leadership Team
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              Driving innovation and digital transformation for the Open City &amp; Technology branch. Our team is dedicated to building a smarter, more connected municipality.
            </p>
          </div>
        </section>

        <LeadershipContent />
      </main>

      <Footer />
    </div>
  );
}
