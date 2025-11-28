import Header from '@/components/Header';
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
            className="group block w-full bg-gradient-to-r from-primary-blue to-cyan-600 hover:to-cyan-500 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.01] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex items-center justify-center space-x-3 py-4 md:py-6">
              <h2 className="font-sans text-2xl md:text-3xl font-bold text-white text-center">
                Learn about Open City and Technology
              </h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6 md:w-8 md:h-8 text-white transform group-hover:translate-x-1 transition-transform duration-300"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
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
