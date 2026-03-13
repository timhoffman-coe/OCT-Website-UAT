import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LinksAccordion from '@/components/links/LinksAccordion';

export const metadata = {
  title: 'Important Links | Open City & Technology',
  description: 'Quick access to important internal and external resources, tools, and systems for Open City & Technology.',
};

export default function LinksPage() {
  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="container mx-auto max-w-7xl py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-primary-blue mb-4 pb-3 border-b-2 border-[#F4F2F1]">
            Important Links
          </h1>
          <p className="font-serif text-lg md:text-xl text-[#495057] max-w-3xl mt-6">
            Quick access to important internal and external resources, tools, and systems for Open City & Technology.
          </p>
        </div>

        {/* Accordion Links */}
        <LinksAccordion />

        {/* Additional Information */}
        <div className="mt-12 bg-[#D3ECEF] rounded-lg p-8">
          <h2 className="font-sans text-2xl font-bold text-[#212529] mb-4">
            Need Help?
          </h2>
          <p className="font-sans text-base text-[#495057] mb-4">
            If you can&apos;t find the link you&apos;re looking for or need assistance accessing a resource, please contact the Service Desk or your team lead.
          </p>
          <Link
            href="/contact"
            className="inline-block font-sans text-base font-semibold bg-primary-blue text-white px-6 py-3 rounded-md hover:bg-[#193A5A] transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
