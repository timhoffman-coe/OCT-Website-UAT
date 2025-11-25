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
            className="block w-full bg-primary-blue hover:bg-dark-blue transition-colors duration-300 rounded-lg"
          >
            <h2 className="font-sans text-2xl md:text-3xl font-bold text-white text-center py-4 md:py-6">
              Learn about Open City and Technology
            </h2>
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
