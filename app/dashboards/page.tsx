import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DashboardDisclaimer from '@/components/DashboardDisclaimer';

export const metadata = {
  title: 'Dashboards | Open City & Technology',
  description: 'Access dashboards and analytics for Open City & Technology.',
};

export default function DashboardsPage() {
  const dashboards = [
    {
      title: 'Service & Infrastructure Health',
      description: 'Monitor uptime, performance, and health metrics for all technology services and infrastructure.',
      icon: '📊',
      url: '/service-health',
    },
    {
      title: 'Budget & Financial',
      description: 'Track budget allocations, expenditures, forecasts, and financial performance across OCT.',
      icon: '💰',
      url: '/budget',
    },
    {
      title: 'People Management',
      description: 'View team capacity, staffing levels, resource allocation, and workforce analytics.',
      icon: '👥',
      url: '/people-management',
    },
    {
      title: 'Asset Management',
      description: 'Monitor IT assets, hardware inventory, software licenses, and lifecycle management.',
      icon: '🖥️',
      url: '/asset-management',
    },
    {
      title: 'Incident & Service Management',
      description: 'Track incidents, service requests, resolution times, and service desk performance metrics.',
      icon: '🔧',
      url: '/incident-management',
    },
    {
      title: 'Leadership',
      description: 'Executive dashboard with high-level KPIs, strategic metrics, and organizational performance.',
      icon: '📈',
      url: '/cio-dashboard',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <DashboardDisclaimer dashboardName="Dashboards" />
      <Header />

      <main className="container mx-auto max-w-7xl py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-primary-blue mb-4 pb-3 border-b-2 border-[#F4F2F1]">
            Dashboards
          </h1>
          <p className="font-serif text-lg md:text-xl text-[#495057] max-w-3xl mt-6">
            Access key performance dashboards, analytics, and metrics for Open City & Technology operations.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {dashboards.map((dashboard, index) => (
            <a
              key={index}
              href={dashboard.url}
              className="group bg-[#D3ECEF] rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-primary-blue"
            >
              <div className="text-5xl mb-4">{dashboard.icon}</div>
              <h2 className="font-sans text-xl font-bold text-[#212529] mb-3 group-hover:text-primary-blue transition-colors">
                {dashboard.title}
              </h2>
              <p className="font-sans text-base text-[#495057] mb-4">
                {dashboard.description}
              </p>
              <div className="flex items-center font-sans text-base font-semibold text-primary-blue">
                <span>View Dashboard</span>
                <svg
                  className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Additional Information */}
        <div className="bg-[#F4F2F1] rounded-lg p-8">
          <h2 className="font-sans text-2xl font-bold text-[#212529] mb-4">
            About These Dashboards
          </h2>
          <p className="font-sans text-base text-[#495057] mb-4">
            These dashboards provide real-time insights and analytics to help you monitor and manage Open City & Technology operations effectively. Each dashboard is tailored to specific operational areas and stakeholder needs.
          </p>
          <p className="font-sans text-base text-[#495057]">
            For questions about dashboard access or data definitions, please contact the Service Management Office.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
