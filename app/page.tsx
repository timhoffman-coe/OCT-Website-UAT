import Header from '@/components/Header';
import Image from 'next/image';
import Hero from '@/components/Hero';
import Sections from '@/components/Sections';
import Link from 'next/link';
import WhoWeAre from '@/components/WhoWeAre';
import GuidingPrinciples from '@/components/GuidingPrinciples';
import BudgetSection from '@/components/BudgetSection';
import KeyInitiatives from '@/components/KeyInitiatives';
import Footer from '@/components/Footer';
import ScrollSpyNav from '@/components/ScrollSpyNav';
import AnimatedSection from '@/components/AnimatedSection';

export default function Home() {
  return (
    <div className="bg-white">
      <Header />
      <ScrollSpyNav />
      <Hero />

      <AnimatedSection>
        {/* Branch Banner */}
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 md:pt-16">
          <Link
            href="/about"
            className="group relative block w-full overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:scale-[1.01] hover:shadow-xl"
          >
            {/* Background Base */}
            <div className="absolute inset-0 bg-[#055c8a]" />

            {/* Image on Left (approx 1/2 width to prevent cropping of gradient) */}
            <div className="absolute inset-y-0 left-0 w-1/3 md:w-1/2">
              <Image
                src="/images/Technology-v1.jpg"
                alt="Technology"
                fill
                className="object-cover object-left"
              />
              {/* Gradient fade to blend into the blue background */}

            </div>

            {/* Content */}
            <div className="relative flex items-center justify-center py-16 px-6">
              <div className="flex items-center space-x-4 z-10 w-full justify-center">
                <h2 className="text-center font-sans text-2xl font-bold text-white drop-shadow-md md:text-3xl lg:text-4xl text-shadow-sm">
                  Learn about Open City and Technology
                </h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="h-8 w-8 text-white transition-transform duration-300 group-hover:translate-x-2 flex-shrink-0"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
        <Sections />
      </AnimatedSection>
      <AnimatedSection>
        <WhoWeAre />
      </AnimatedSection>
      <AnimatedSection>
        <GuidingPrinciples />
      </AnimatedSection>
      <AnimatedSection>
        <BudgetSection />
      </AnimatedSection>
      <AnimatedSection>
        <KeyInitiatives />
      </AnimatedSection>
      <Footer />
    </div>
  );
}
