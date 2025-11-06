import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Sections from '@/components/Sections';
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
