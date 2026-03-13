import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DashboardDisclaimer from '@/components/DashboardDisclaimer';
import OrgTree from '@/components/org-chart/OrgTree';

export const metadata = {
  title: 'Org Chart | Open City & Technology',
  description: 'Explore the organizational structure and teams within the Office of the Chief Technology Officer.',
};

export default function OrgChartPage() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <DashboardDisclaimer dashboardName="OCT Org Chart" />
      <Header />

      <main className="container mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-10 text-center">
          <h1 className="font-sans text-4xl font-bold text-gray-900 mb-4">
            Organizational Structure
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the hierarchy and teams within the Office of the Chief Technology Officer.
          </p>
        </div>

        {/* Org Tree Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          <div className="flex justify-end mb-4">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Interactive Tree View</span>
          </div>
          <OrgTree />
        </div>
      </main>

      <Footer />
    </div>
  );
}
