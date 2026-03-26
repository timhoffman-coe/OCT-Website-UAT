import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DashboardDisclaimer from '@/components/DashboardDisclaimer';

export const metadata = {
  title: 'Dashboards | Open City & Technology',
  description: 'Access dashboards and analytics for Open City & Technology.',
};

const dashboards = [
  {
    title: 'Service & Infrastructure',
    description: 'Real-time health monitoring of critical nodes and cloud infrastructure.',
    url: '/service-health',
    kpi: '99.98%',
    kpiLabel: 'System Uptime',
    kpiColor: 'text-edmonton-success',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 .75-7.425A4.502 4.502 0 0 0 14.25 9 4.5 4.5 0 0 0 9.99 11.1A4.5 4.5 0 0 0 2.25 15Z" />
      </svg>
    ),
    iconBg: 'bg-primary-blue/10 text-primary-blue',
  },
  {
    title: 'Budget & Financial',
    description: 'Quarterly spending tracking against department-wide fiscal allocations.',
    url: '/budget',
    kpi: '64.2%',
    kpiLabel: 'Q3 Utilization',
    kpiColor: 'text-text-secondary',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    iconBg: 'bg-process-blue/10 text-process-blue',
  },
  {
    title: 'People Management',
    description: 'Talent distribution, open requisitions, and departmental capacity.',
    url: '/people-management',
    kpi: '412',
    kpiLabel: 'Total Headcount',
    kpiColor: 'text-edmonton-success',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
    iconBg: 'bg-structural-light-gray text-dark-blue',
  },
  {
    title: 'Asset Management',
    description: 'Inventory tracking for critical hardware and enterprise software assets.',
    url: '/asset-management',
    kpi: '8.4k',
    kpiLabel: 'Managed Units',
    kpiColor: 'text-text-secondary',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
      </svg>
    ),
    iconBg: 'bg-structural-light-gray text-dark-blue',
  },
  {
    title: 'Incident Management',
    description: 'SLA compliance tracking and real-time P1 ticket escalation monitoring.',
    url: '/incident-management',
    kpi: '12.4m',
    kpiLabel: 'Avg Response Time',
    kpiColor: 'text-edmonton-error',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
    ),
    iconBg: 'bg-edmonton-error/10 text-edmonton-error',
  },
  {
    title: 'Vendor Command',
    description: 'Performance auditing for strategic external technology partners.',
    url: '/vendor-command-center',
    kpi: '98%',
    kpiLabel: 'KPI Compliance',
    kpiColor: 'text-edmonton-success',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 1 0-3.15 0v3.026a1.575 1.575 0 0 0 3.15 0V4.575Zm6 0a1.575 1.575 0 1 0-3.15 0v3.026a1.575 1.575 0 0 0 3.15 0V4.575ZM7.875 10.35a1.575 1.575 0 1 0-3.15 0v3.026a1.575 1.575 0 0 0 3.15 0V10.35Zm6 0a1.575 1.575 0 1 0-3.15 0v3.026a1.575 1.575 0 0 0 3.15 0V10.35Zm3-5.775a1.575 1.575 0 0 0-1.575 1.575v3.026a1.575 1.575 0 0 0 3.15 0V6.15a1.575 1.575 0 0 0-1.575-1.575ZM4.5 16.125a1.575 1.575 0 0 0-1.575 1.575v.026a1.575 1.575 0 0 0 3.15 0v-.026A1.575 1.575 0 0 0 4.5 16.125Zm6 0a1.575 1.575 0 0 0-1.575 1.575v.026a1.575 1.575 0 0 0 3.15 0v-.026a1.575 1.575 0 0 0-1.575-1.575Zm6 0a1.575 1.575 0 0 0-1.575 1.575v.026a1.575 1.575 0 0 0 3.15 0v-.026a1.575 1.575 0 0 0-1.575-1.575Z" />
      </svg>
    ),
    iconBg: 'bg-structural-light-gray text-dark-blue',
  },
];

export default function DashboardsPage() {
  return (
    <div className="bg-white min-h-screen">
      <DashboardDisclaimer dashboardName="Dashboards" />
      <Header />

      <main className="max-w-screen-2xl mx-auto py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        {/* Centered Hero Section */}
        <header className="mb-16 mt-8 flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4 justify-center">
            <span className="w-8 h-[2px] bg-process-blue" />
            <span className="text-xs font-bold uppercase tracking-widest text-process-blue">Open City &amp; Technology</span>
            <span className="w-8 h-[2px] bg-process-blue" />
          </div>
          <h1 className="font-sans text-5xl md:text-6xl font-extrabold text-dark-blue tracking-tighter leading-none mb-6">
            Dashboards <span className="text-process-blue">.</span>
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
            Access key performance dashboards, analytics, and metrics for Open City &amp; Technology operations.
          </p>
        </header>

        {/* Dashboard Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {dashboards.map((dashboard, index) => (
            <Link
              key={index}
              href={dashboard.url}
              className="group relative bg-white p-6 rounded-xl border border-structural-gray-blue flex flex-col h-full hover:shadow-lg transition-all duration-300"
            >
              <span className="absolute top-4 right-4 text-[0.625rem] font-bold uppercase tracking-wider bg-edmonton-warning/15 text-edmonton-warning px-2.5 py-1 rounded-full">
                Coming Soon
              </span>
              <div className="flex flex-col flex-grow">
                <div className={`mb-4 p-3 rounded-lg w-fit ${dashboard.iconBg}`}>
                  {dashboard.icon}
                </div>
                <h3 className="text-lg font-bold text-dark-blue mb-3">{dashboard.title}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-extrabold text-dark-blue">{dashboard.kpi}</span>
                  <span className={`block text-xs font-medium mt-1 uppercase tracking-wider ${dashboard.kpiColor}`}>{dashboard.kpiLabel}</span>
                </div>
                <p className="text-sm text-text-secondary mb-6 line-clamp-2">{dashboard.description}</p>
              </div>
              <div className="mt-auto pt-4 border-t border-structural-gray-blue text-process-blue font-bold text-sm flex items-center justify-between">
                <span>View Dashboard</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </Link>
          ))}

          {/* Leadership Strategy — dark accent card */}
          <Link
            href="/cio-dashboard"
            className="group relative bg-dark-blue text-white p-6 rounded-xl border border-dark-blue flex flex-col h-full hover:shadow-lg transition-all duration-300"
          >
            <span className="absolute top-4 right-4 text-[0.625rem] font-bold uppercase tracking-wider bg-white/15 text-white/80 px-2.5 py-1 rounded-full">
              Coming Soon
            </span>
            <div className="flex flex-col flex-grow">
              <div className="mb-4 p-3 bg-white/10 text-white rounded-lg w-fit">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-3">Leadership Strategy</h3>
              <div className="mb-4">
                <span className="text-3xl font-extrabold">12</span>
                <span className="block text-xs font-medium text-white/60 mt-1 uppercase tracking-wider">Active Initiatives</span>
              </div>
              <p className="text-sm text-white/70 mb-6 line-clamp-2">High-level strategic roadmap tracking and organizational performance.</p>
            </div>
            <div className="mt-auto pt-4 border-t border-white/10 text-white font-bold text-sm flex items-center justify-between">
              <span>Access Strategy</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Secondary Information Layer */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 border-t border-structural-gray-blue pt-16">
          {/* Recent Operational Updates */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-dark-blue mb-8 font-sans">Recent Operational Updates</h2>
            <div className="space-y-6">
              {/* Update 1 */}
              <div className="flex gap-6 p-4 rounded-lg hover:bg-structural-light-gray transition-colors">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-process-blue">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
                  </svg>
                </div>
                <div>
                  <span className="text-[0.6875rem] font-bold uppercase tracking-widest text-text-secondary">Network Operations &bull; 2h ago</span>
                  <h4 className="font-bold text-dark-blue mt-1">Fiber Link Maintenance in Sector 4</h4>
                  <p className="text-sm text-text-secondary mt-1">Scheduled maintenance successfully completed. Primary backhaul capacity restored to 100%.</p>
                </div>
              </div>

              {/* Update 2 */}
              <div className="flex gap-6 p-4 rounded-lg hover:bg-structural-light-gray transition-colors">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-edmonton-error">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[0.6875rem] font-bold uppercase tracking-widest text-text-secondary">Security Alert &bull; 5h ago</span>
                  <h4 className="font-bold text-dark-blue mt-1">Anomalous Login Pattern Detected</h4>
                  <p className="text-sm text-text-secondary mt-1">Security protocols isolated 12 unauthorized access attempts on the internal GIS server. No breach occurred.</p>
                </div>
              </div>

              {/* Update 3 */}
              <div className="flex gap-6 p-4 rounded-lg hover:bg-structural-light-gray transition-colors">
                <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-edmonton-success">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[0.6875rem] font-bold uppercase tracking-widest text-text-secondary">Infrastructure &bull; 1d ago</span>
                  <h4 className="font-bold text-dark-blue mt-1">Cloud Migration Phase 3 Complete</h4>
                  <p className="text-sm text-text-secondary mt-1">All remaining workloads successfully migrated to Azure. On-prem decommissioning scheduled for next quarter.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <aside className="bg-structural-light-gray p-8 rounded-2xl h-fit">
            <h2 className="text-xl font-bold text-dark-blue mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <Link
                href="/incident-management"
                className="w-full text-left p-4 bg-white rounded-xl flex items-center gap-4 hover:shadow-md transition-shadow group block"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-process-blue flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <div>
                  <span className="block font-bold text-dark-blue">Report Incident</span>
                  <span className="text-xs text-text-secondary">Log a new service ticket</span>
                </div>
              </Link>

              <Link
                href="/vendor-command-center"
                className="w-full text-left p-4 bg-white rounded-xl flex items-center gap-4 hover:shadow-md transition-shadow group block"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-process-blue flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                <div>
                  <span className="block font-bold text-dark-blue">Vendor Portal</span>
                  <span className="text-xs text-text-secondary">Access vendor contracts</span>
                </div>
              </Link>

              <a
                href="#"
                className="w-full text-left p-4 bg-white rounded-xl flex items-center gap-4 hover:shadow-md transition-shadow group block"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-process-blue flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
                <div>
                  <span className="block font-bold text-dark-blue">Maintenance Calendar</span>
                  <span className="text-xs text-text-secondary">View upcoming downtime</span>
                </div>
              </a>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}
