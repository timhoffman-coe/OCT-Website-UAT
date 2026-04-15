import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DashboardDisclaimer from '@/components/DashboardDisclaimer';
import OrgFlow from '@/components/org-chart/OrgFlow';
import { getOrgChart } from '@/lib/data/org-chart';

export const revalidate = 86400; // 24h ISR — HR data refreshed once daily

export const metadata = {
  title: 'Org Chart | Open City & Technology',
  description: 'Explore the organizational structure and teams within the Office of the Chief Technology Officer.',
};

export default async function OrgChartPage() {
  const data = await getOrgChart();

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <DashboardDisclaimer dashboardName="OCT Org Chart" />
      <Header />

      <main className="container mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="font-sans text-4xl font-bold text-gray-900 mb-4">
            Organizational Structure
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the hierarchy and teams within the Office of the Chief Technology Officer.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          <div className="flex justify-end mb-4">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Live from HR · Refreshed daily
            </span>
          </div>
          <OrgFlow data={data} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
