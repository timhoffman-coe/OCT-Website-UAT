import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DashboardDisclaimer from '@/components/DashboardDisclaimer';
import OrgFlow from '@/components/org-chart/OrgFlow';
import { getOrgChart } from '@/lib/data/org-chart';
import { logger } from '@/lib/logger';
import type { OrgChartData } from '@/app/org-chart/types';

export const dynamic = 'force-dynamic'; // render on request; data is cached 24h via unstable_cache

export const metadata = {
  title: 'Org Chart | Open City & Technology',
  description: 'Explore the organizational structure and teams within the Office of the Chief Technology Officer.',
};

export default async function OrgChartPage() {
  let data: OrgChartData | null = null;
  try {
    data = await getOrgChart();
  } catch (error) {
    logger.error('Org chart fetch failed', {
      error: error instanceof Error ? error.message : String(error),
    });
  }

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

      <main className="container mx-auto max-w-[1600px] py-4 px-4 sm:px-6 lg:px-8">
        {data ? (
          <OrgFlow 
            data={data}
            headerSlot={
              <div className="mr-0 lg:mr-auto flex-none w-full lg:w-auto mb-2 lg:mb-0">
                <div className="flex flex-wrap items-baseline gap-2 md:gap-3 lg:mb-0.5">
                  <h1 className="font-sans text-xl md:text-2xl font-bold text-[#193A5A]">
                    Organizational Structure
                  </h1>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider hidden sm:inline-block">
                    Live from HR · Refreshed daily
                  </span>
                </div>
                <p className="text-xs text-gray-600 hidden xl:block">
                  Explore the hierarchy and teams within the Office of the Chief Technology Officer.
                </p>
              </div>
            }
          />
        ) : (
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-6 py-8 text-center">
            <h2 className="text-lg font-semibold text-[#193A5A]">
              Org chart is temporarily unavailable
            </h2>
            <p className="mt-2 text-sm text-gray-600 max-w-xl mx-auto">
              We couldn&apos;t reach the data source right now. Please try
              again later.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
