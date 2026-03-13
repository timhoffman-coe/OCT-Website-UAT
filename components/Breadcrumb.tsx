'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const routeMap: Record<string, { label: string; parent: string | null }> = {
  '/': { label: 'Home', parent: null },
  '/about': { label: 'Branch Overview', parent: '/' },
  '/leadership': { label: 'Our Leadership', parent: '/about' },
  '/about/how-oct-works': { label: 'How OCT Works', parent: '/about' },
  '/contact': { label: 'Contact', parent: '/' },
  '/search': { label: 'Search', parent: '/' },
  '/service-health': { label: 'Service Health', parent: '/' },
  '/services': { label: 'All Teams', parent: '/' },
  '/technology-planning': { label: 'Technology Planning', parent: '/' },
  '/application-technology-services': { label: 'Application Technology Services', parent: '/' },
  '/integrated-technology-solutions': { label: 'Integrated Technology Solutions', parent: '/' },
  '/project-management-office': { label: 'Project Management Office', parent: '/' },
  '/corporate-information-security': { label: 'Corporate Information Security', parent: '/' },
  '/technology-infrastructure-operations': { label: 'Technology Infrastructure Operations', parent: '/integrated-technology-solutions' },
  '/data-technology': { label: 'Data Technology', parent: '/integrated-technology-solutions' },
  '/partner-experience': { label: 'Partner Experience', parent: '/integrated-technology-solutions' },
  '/service-delivery': { label: 'Service Delivery', parent: '/integrated-technology-solutions' },
  // Technology Infrastructure Operations sub-pages
  '/technology-infrastructure-operations/server-solutions': { label: 'Server Solutions & Automation', parent: '/technology-infrastructure-operations' },
  '/technology-infrastructure-operations/database': { label: 'Database Management', parent: '/technology-infrastructure-operations' },
  '/technology-infrastructure-operations/virtualization': { label: 'Virtualization', parent: '/technology-infrastructure-operations' },
  // Data Technology sub-pages
  '/data-technology/data-centre': { label: 'Data Centre', parent: '/data-technology' },
  '/data-technology/network-services': { label: 'Network Services', parent: '/data-technology' },
  '/data-technology/voice-mobility-iot': { label: 'Voice, Mobility & IoT', parent: '/data-technology' },
  // Partner Experience sub-pages
  '/partner-experience/desktop-administration': { label: 'Desktop Administration', parent: '/partner-experience' },
  '/partner-experience/desktop-support': { label: 'Desktop Support', parent: '/partner-experience' },
  '/partner-experience/service-desk': { label: 'Service Desk', parent: '/partner-experience' },
  // Service Delivery sub-pages
  '/service-delivery/digital-workplace-catalog': { label: 'Digital Workplace Catalog', parent: '/service-delivery' },
  '/service-delivery/monitoring-analytics': { label: 'Monitoring & Analytics', parent: '/service-delivery' },
  '/service-delivery/service-management-office': { label: 'Service Management Office', parent: '/service-delivery' },
  '/dashboards': { label: 'Dashboards', parent: '/' },
  '/cio-dashboard': { label: 'CIO Dashboard', parent: '/dashboards' },
  '/policies': { label: 'Policies', parent: '/' },
  '/branch-templates': { label: 'Branch Templates', parent: '/' },
  '/technology-strategies': { label: 'Technology Strategies', parent: '/' },
  '/budget': { label: 'Budget', parent: '/' },
  '/org-chart': { label: 'Org Chart', parent: '/' },
  '/ai-resources': { label: 'AI Resources', parent: '/' },
  '/links': { label: 'Links', parent: '/' },
};

export default function Breadcrumb() {
  const pathname = usePathname();

  // On home page, return empty placeholder to maintain flex spacing
  if (pathname === '/') return <div className="hidden md:block" />;

  // Build breadcrumb trail
  const trail: { path: string; label: string }[] = [];
  let current = pathname;

  while (current && routeMap[current]) {
    trail.unshift({ path: current, label: routeMap[current].label });
    current = routeMap[current].parent || '';
  }

  // Fallback for unmapped routes
  if (trail.length === 0) {
    trail.push({ path: '/', label: 'Home' });
    trail.push({ path: pathname, label: pathname.split('/').pop()?.replace(/-/g, ' ') || 'Page' });
  }

  return (
    <nav aria-label="Breadcrumb" className="hidden md:flex items-center text-sm text-white/80">
      {trail.map((item, index) => (
        <span key={item.path} className="flex items-center">
          {index > 0 && <ChevronRight className="h-4 w-4 mx-2 text-white/50" />}
          {index === trail.length - 1 ? (
            <span className="text-white font-medium">{item.label}</span>
          ) : (
            <Link href={item.path} className="hover:text-white hover:underline">
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
