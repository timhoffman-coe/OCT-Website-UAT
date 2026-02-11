import PortfolioSubpageTemplate from '@/components/its-shared/PortfolioSubpageTemplate';
import { fetchPortfolioSubpage } from '@/lib/data/fetch-subpage';
import { Network } from 'lucide-react';

const fallback = {
  parentTeam: 'Data Technology',
  parentTeamHref: '/data-technology',
  title: 'Network Services',
  description:
    'We provide the digital foundation for the City of Edmonton. Our team manages the core connectivity, security perimeter, and traffic management infrastructure that connects over 300 City facilities.',
  icon: Network,
  services: [
    { title: 'Connectivity (LAN/WAN)', items: ['Wired office connectivity', 'Fibre optic backbone', 'Site-to-site switching'] },
    { title: 'Wireless (Wi-Fi)', items: ['Corporate Secure Wi-Fi', 'Guest/Public Wi-Fi', 'High-density event wireless'] },
    { title: 'Security Perimeter', items: ['Firewall management', 'VPN & Remote Access', 'Intrusion Detection'] },
    { title: 'Load Balancing', items: ['Application traffic management', 'F5 BigIP Administration', 'SSL Offloading'] },
  ],
  initiatives: [
    { title: 'Next-Gen Firewall Upgrade', description: 'Replacing legacy edge hardware to improve throughput and security inspection capabilities.', href: '#' },
    { title: 'Fibre Expansion Phase 4', description: 'Extending dark fibre connectivity to new facilities in the southwest quadrant.', href: '#' },
  ],
  contacts: [
    { name: 'First Last', role: 'Manager, Network Services', email: 'firstname.lastname@edmonton.ca' },
    { name: 'First Last', role: 'Lead Network Architect', email: 'firstname.lastname@edmonton.ca' },
  ],
  quickLinks: [
    { label: 'Network Diagrams', description: 'Visio topologies for Data Centre and Campus.', href: '#' },
    { label: 'SolarWinds Dashboard', description: 'Real-time uptime and bandwidth monitoring.', href: '#' },
    { label: 'IP Address Management (IPAM)', description: 'Internal DNS and subnet allocation tool.', href: '#', isSecure: true },
  ],
};

export default async function NetworkServicesPage() {
  const data = (await fetchPortfolioSubpage('/data-technology/network-services')) || fallback;
  return <PortfolioSubpageTemplate {...data} />;
}
