import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DashboardDisclaimer from '@/components/DashboardDisclaimer';
import OrgFlow from '@/components/org-chart/OrgFlow';
import { getOrgChart } from '@/lib/data/org-chart';

export const dynamic = 'force-dynamic'; // render on request; data is cached 24h via unstable_cache

export const metadata = {
  title: 'Org Chart | Open City & Technology',
  description: 'Explore the organizational structure and teams within the Office of the Chief Technology Officer.',
};

export default async function OrgChartPage() {
  const data = await getOrgChart();

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <DashboardDisclaimer
        dashboardName="OCT Org Chart"
        title="Live — Source May Be Inaccurate"
        message={
          <>
            <span className="font-bold">OCT Org Chart</span> is live and pulling directly from HR data, but the source itself may be out of date or incomplete. Please verify reporting relationships before relying on them.
          </>
        }
      />
      <Header />

      <main className="container mx-auto max-w-[1600px] py-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-sans text-3xl md:text-4xl font-bold text-[#193A5A]">
              Organizational Structure
            </h1>
            <p className="text-base text-gray-600 mt-1">
              Explore the hierarchy and teams within the Office of the Chief Technology Officer.
            </p>
          </div>
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            Live from HR · Refreshed daily
          </span>
        </div>

        <OrgFlow data={data} />
      </main>

      <Footer />
    </div>
  );
}
