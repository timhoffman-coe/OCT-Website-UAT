import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { headers } from 'next/headers';
import TechIntakeForm from './TechIntakeForm';

export const metadata = {
  title: 'Technology Intake | Open City & Technology',
  description: 'Submit a technology intake request to start a new project or initiative with Open City & Technology.',
};

export default async function TechnologyIntakePage() {
  const headerList = await headers();
  const userEmail = headerList.get('x-user-email') || '';
  const userName = headerList.get('x-user-name') || '';

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main id="main-content" className="max-w-7xl mx-auto py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <TechIntakeForm userEmail={userEmail} userName={userName} />
      </main>

      <Footer />
    </div>
  );
}
