import Header from '@/components/Header';
import Hero from '@/components/Hero';
import BusinessUnits from '@/components/BusinessUnits';
import WhoWeAre from '@/components/WhoWeAre';
import GuidingPrinciples from '@/components/GuidingPrinciples';
import KeyInitiatives from '@/components/KeyInitiatives';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="bg-gray-100">
      <Header />
      <Hero />
      <BusinessUnits />
      <WhoWeAre />
      <GuidingPrinciples />
      <KeyInitiatives />
      <Footer />
    </div>
  );
}
