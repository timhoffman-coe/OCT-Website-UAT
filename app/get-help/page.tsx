import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { headers } from 'next/headers';
import GetHelpForm from './GetHelpForm';

export const metadata = {
  title: 'Get Help & Support | Open City & Technology',
  description: 'Open a support case with Open City & Technology. Report issues, request services, and get technical assistance.',
};

export default async function GetHelpPage() {
  const headerList = await headers();
  const userEmail = headerList.get('x-user-email') || '';
  const userName = headerList.get('x-user-name') || '';

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main id="main-content" className="max-w-7xl mx-auto py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <GetHelpForm userEmail={userEmail} userName={userName} />
      </main>

      <Footer />
    </div>
  );
}
