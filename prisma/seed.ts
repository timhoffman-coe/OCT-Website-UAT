import { PrismaClient, PageTemplate, Role } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // ============================================================
  // 1. Create initial SUPER_ADMIN user
  // ============================================================
  const adminUser = await prisma.user.upsert({
    where: { email: 'dev@edmonton.ca' },
    update: {},
    create: {
      email: 'dev@edmonton.ca',
      name: 'Dev Admin',
      role: Role.SUPER_ADMIN,
    },
  });
  console.log('Created admin user:', adminUser.email);

  // ============================================================
  // 2. Seed ITS Teams
  // ============================================================

  // --- Data Technology ---
  const dataTech = await prisma.team.upsert({
    where: { slug: 'data-technology' },
    update: {},
    create: {
      slug: 'data-technology',
      teamName: 'Data Technology',
      teamShortName: 'Data Technology',
      pageTemplate: PageTemplate.ITS_TEAM,
      sortOrder: 0,
      portfolios: {
        create: [
          {
            iconName: 'Network',
            title: 'Network Services',
            description: 'Core network, connectivity, security perimeter, and traffic management.',
            href: '/data-technology/network-services',
            sortOrder: 0,
          },
          {
            iconName: 'Server',
            title: 'Data Centre',
            description: 'Compute, storage, backup, recovery, and hosting platforms.',
            href: '/data-technology/data-centre',
            sortOrder: 1,
          },
          {
            iconName: 'Smartphone',
            title: 'Voice, Mobility & IoT',
            description: 'Corporate voice, mobile fleet, radio, and smart/connected devices.',
            href: '/data-technology/voice-mobility-iot',
            sortOrder: 2,
          },
        ],
      },
      teamTabs: {
        create: [
          {
            tabId: 'network',
            label: 'Network',
            videoTitle: 'Network Architecture',
            videoDescription: 'Watch this overview of our core network services and architecture.',
            videoUrl: 'https://drive.google.com/file/d/1RyjeaKqtnKkBT9PhGvUTM1QmXbYvDWnW/preview',
            diagramsTitle: 'Network Diagrams',
            diagramsDescription: 'View detailed diagrams for core network segments.',
            sortOrder: 0,
            diagramLinks: {
              create: [
                { label: 'Data Centre', href: '#', sortOrder: 0 },
                { label: 'Campus', href: '#', sortOrder: 1 },
                { label: 'Cloud', href: '#', sortOrder: 2 },
                { label: 'Partners', href: '#', sortOrder: 3 },
              ],
            },
          },
          {
            tabId: 'voice-mobility',
            label: 'Voice & Mobility',
            videoTitle: 'Voice & Mobility Overview',
            videoDescription: 'Watch this overview of our corporate voice, mobile, and IoT services.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            diagramsTitle: 'Service Diagrams',
            diagramsDescription: 'View detailed diagrams for core services.',
            sortOrder: 1,
            diagramLinks: {
              create: [
                { label: 'Corporate Voice', href: '#', sortOrder: 0 },
                { label: 'Mobile Fleet', href: '#', sortOrder: 1 },
                { label: 'IoT Platform', href: '#', sortOrder: 2 },
              ],
            },
          },
          {
            tabId: 'data-centre',
            label: 'Data Centre',
            videoTitle: 'Data Centre Architecture',
            videoDescription: 'Watch this overview of our compute, storage, and hosting platforms.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            diagramsTitle: 'Platform Diagrams',
            diagramsDescription: 'View detailed diagrams for core platforms.',
            sortOrder: 2,
            diagramLinks: {
              create: [
                { label: 'Compute', href: '#', sortOrder: 0 },
                { label: 'Storage & Backup', href: '#', sortOrder: 1 },
                { label: 'Hosting (PaaS/IaaS)', href: '#', sortOrder: 2 },
              ],
            },
          },
          {
            tabId: 'app-delivery',
            label: 'Application Delivery',
            videoTitle: 'Application Delivery Overview',
            videoDescription: 'Watch this overview of our application delivery and support services.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            diagramsTitle: 'Service Diagrams',
            diagramsDescription: 'View detailed diagrams for core services.',
            sortOrder: 3,
            diagramLinks: {
              create: [
                { label: 'CI/CD Pipeline', href: '#', sortOrder: 0 },
                { label: 'App Support Model', href: '#', sortOrder: 1 },
                { label: 'Database Services', href: '#', sortOrder: 2 },
              ],
            },
          },
        ],
      },
      trelloBoards: {
        create: [
          {
            title: 'Network Services',
            description: 'High-level work priorities for the Network Services team.',
            href: 'https://trello.com/b/5qMgG2C2/network-services-work-priorities',
            sortOrder: 0,
          },
          {
            title: 'Fibre Project',
            description: 'Tracking for the ongoing Network Services Fibre project.',
            href: 'https://trello.com/b/iukW90n7/network-services-fibre',
            sortOrder: 1,
          },
          {
            title: 'Project/Initiatives requiring Network',
            description: 'Tracking other projects and initiatives that require Network team support.',
            href: 'https://trello.com/b/rlaQyc0m/projects-initiatives-requiring-network',
            sortOrder: 2,
          },
        ],
      },
      teamMembers: {
        create: [
          { name: 'First Last', title: 'Director, Data Technology', email: 'firstname.lastname@edmonton.ca', sortOrder: 0 },
          { name: 'First Last', title: 'Manager, Network Services', email: 'firstname.lastname@edmonton.ca', sortOrder: 1 },
          { name: 'First Last', title: 'Manager, Data Centre & Voice', email: 'firstname.lastname@edmonton.ca', sortOrder: 2 },
        ],
      },
    },
  });
  console.log('Created team:', dataTech.teamName);

  // --- Partner Experience ---
  const partnerExp = await prisma.team.upsert({
    where: { slug: 'partner-experience' },
    update: {},
    create: {
      slug: 'partner-experience',
      teamName: 'Partner Experience',
      teamShortName: 'Partner Experience',
      pageTemplate: PageTemplate.ITS_TEAM,
      sortOrder: 1,
      portfolios: {
        create: [
          { iconName: 'Headphones', title: 'Service Desk', description: 'IT assistance via tickets and calls, providing remote troubleshooting and support.', href: '/partner-experience/service-desk', sortOrder: 0 },
          { iconName: 'Wrench', title: 'Desktop Support', description: 'In-person break-fix services for hardware and software issues.', href: '/partner-experience/desktop-support', sortOrder: 1 },
          { iconName: 'Monitor', title: 'Desktop Administration', description: 'Managing approximately 12,000 computing devices across the City.', href: '/partner-experience/desktop-administration', sortOrder: 2 },
        ],
      },
      teamTabs: {
        create: [
          {
            tabId: 'service-desk', label: 'Service Desk',
            videoTitle: 'Service Desk Overview', videoDescription: 'Watch this overview of our Service Desk operations and support services.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            diagramsTitle: 'Service Diagrams', diagramsDescription: 'View detailed diagrams for Service Desk operations.',
            sortOrder: 0,
            diagramLinks: { create: [
              { label: 'Ticket Workflow', href: '#', sortOrder: 0 },
              { label: 'Escalation Process', href: '#', sortOrder: 1 },
              { label: 'SLA Guidelines', href: '#', sortOrder: 2 },
            ] },
          },
          {
            tabId: 'desktop-support', label: 'Desktop Support',
            videoTitle: 'Desktop Support Overview', videoDescription: 'Watch this overview of our Desktop Support services and processes.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            diagramsTitle: 'Support Diagrams', diagramsDescription: 'View detailed diagrams for Desktop Support processes.',
            sortOrder: 1,
            diagramLinks: { create: [
              { label: 'Break-Fix Process', href: '#', sortOrder: 0 },
              { label: 'Hardware Lifecycle', href: '#', sortOrder: 1 },
              { label: 'Field Support Areas', href: '#', sortOrder: 2 },
            ] },
          },
          {
            tabId: 'desktop-admin', label: 'Desktop Administration',
            videoTitle: 'Desktop Administration Overview', videoDescription: 'Watch this overview of our Desktop Administration and device management.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            diagramsTitle: 'Administration Diagrams', diagramsDescription: 'View detailed diagrams for Desktop Administration.',
            sortOrder: 2,
            diagramLinks: { create: [
              { label: 'Device Management', href: '#', sortOrder: 0 },
              { label: 'Patch Management', href: '#', sortOrder: 1 },
              { label: 'Software Deployment', href: '#', sortOrder: 2 },
            ] },
          },
        ],
      },
      trelloBoards: {
        create: [
          { title: 'Partner Experience', description: 'High-level work priorities for the Partner Experience team.', href: '#', sortOrder: 0 },
          { title: 'Service Desk Operations', description: 'Tracking Service Desk initiatives and improvements.', href: '#', sortOrder: 1 },
          { title: 'Desktop Projects', description: 'Tracking desktop support and administration projects.', href: '#', sortOrder: 2 },
        ],
      },
      teamMembers: {
        create: [
          { name: 'First Last', title: 'Manager, Partner Experience', email: 'firstname.lastname@edmonton.ca', sortOrder: 0 },
          { name: 'First Last', title: 'Team Lead, Service Desk', email: 'firstname.lastname@edmonton.ca', sortOrder: 1 },
          { name: 'First Last', title: 'Team Lead, Desktop Support', email: 'firstname.lastname@edmonton.ca', sortOrder: 2 },
        ],
      },
    },
  });
  console.log('Created team:', partnerExp.teamName);

  // --- Technology Infrastructure Operations ---
  const tio = await prisma.team.upsert({
    where: { slug: 'technology-infrastructure-operations' },
    update: {},
    create: {
      slug: 'technology-infrastructure-operations',
      teamName: 'Technology Infrastructure Operations',
      teamShortName: 'Infrastructure Operations',
      pageTemplate: PageTemplate.ITS_TEAM,
      sortOrder: 2,
      portfolios: {
        create: [
          { iconName: 'Database', title: 'Database Management', description: 'Supporting the City database environment with reliable, secure data storage and retrieval.', href: '/technology-infrastructure-operations/database', sortOrder: 0 },
          { iconName: 'Server', title: 'Server Solutions & Automation', description: 'OS, storage, printing, data protection, and automated infrastructure management.', href: '/technology-infrastructure-operations/server-solutions', sortOrder: 1 },
          { iconName: 'Layers', title: 'Virtualization', description: 'Server infrastructure and virtualization platforms for efficient resource utilization.', href: '/technology-infrastructure-operations/virtualization', sortOrder: 2 },
        ],
      },
      teamTabs: {
        create: [
          {
            tabId: 'database', label: 'Database',
            videoTitle: 'Database Management Overview', videoDescription: 'Watch this overview of our database management services and architecture.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            diagramsTitle: 'Database Diagrams', diagramsDescription: 'View detailed diagrams for database infrastructure.',
            sortOrder: 0,
            diagramLinks: { create: [
              { label: 'Database Architecture', href: '#', sortOrder: 0 },
              { label: 'Backup & Recovery', href: '#', sortOrder: 1 },
              { label: 'High Availability', href: '#', sortOrder: 2 },
            ] },
          },
          {
            tabId: 'server', label: 'Server Solutions',
            videoTitle: 'Server Solutions Overview', videoDescription: 'Watch this overview of our server solutions and automation services.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            diagramsTitle: 'Server Diagrams', diagramsDescription: 'View detailed diagrams for server infrastructure.',
            sortOrder: 1,
            diagramLinks: { create: [
              { label: 'Server Architecture', href: '#', sortOrder: 0 },
              { label: 'Storage Systems', href: '#', sortOrder: 1 },
              { label: 'Automation Workflows', href: '#', sortOrder: 2 },
            ] },
          },
          {
            tabId: 'virtualization', label: 'Virtualization',
            videoTitle: 'Virtualization Overview', videoDescription: 'Watch this overview of our virtualization platforms and services.',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            diagramsTitle: 'Platform Diagrams', diagramsDescription: 'View detailed diagrams for virtualization platforms.',
            sortOrder: 2,
            diagramLinks: { create: [
              { label: 'VMware Infrastructure', href: '#', sortOrder: 0 },
              { label: 'Hyper-V Environment', href: '#', sortOrder: 1 },
              { label: 'Container Platforms', href: '#', sortOrder: 2 },
            ] },
          },
        ],
      },
      trelloBoards: {
        create: [
          { title: 'Infrastructure Operations', description: 'High-level work priorities for the Infrastructure Operations team.', href: '#', sortOrder: 0 },
          { title: 'Database Projects', description: 'Tracking for ongoing database projects and initiatives.', href: '#', sortOrder: 1 },
          { title: 'Server & Virtualization', description: 'Tracking server and virtualization projects.', href: '#', sortOrder: 2 },
        ],
      },
      teamMembers: {
        create: [
          { name: 'First Last', title: 'Manager, Technology Infrastructure Operations', email: 'firstname.lastname@edmonton.ca', sortOrder: 0 },
          { name: 'First Last', title: 'Team Lead, Database Management', email: 'firstname.lastname@edmonton.ca', sortOrder: 1 },
          { name: 'First Last', title: 'Team Lead, Server Solutions', email: 'firstname.lastname@edmonton.ca', sortOrder: 2 },
        ],
      },
    },
  });
  console.log('Created team:', tio.teamName);

  // ============================================================
  // 3. Seed Portfolio Sub-Pages
  // ============================================================

  // Fetch portfolios to link subpages
  const allPortfolios = await prisma.portfolio.findMany();
  const portfolioByHref = Object.fromEntries(allPortfolios.map(p => [p.href, p]));

  const subpageData = [
    // Data Technology sub-pages
    {
      portfolioHref: '/data-technology/network-services',
      parentTeam: 'Data Technology', parentTeamHref: '/data-technology',
      title: 'Network Services', iconName: 'Network',
      description: 'We provide the digital foundation for the City of Edmonton. Our team manages the core connectivity, security perimeter, and traffic management infrastructure that connects over 300 City facilities.',
      services: [
        { title: 'Connectivity (LAN/WAN)', items: ['Wired office connectivity', 'Fibre optic backbone', 'Site-to-site switching'], sortOrder: 0 },
        { title: 'Wireless (Wi-Fi)', items: ['Corporate Secure Wi-Fi', 'Guest/Public Wi-Fi', 'High-density event wireless'], sortOrder: 1 },
        { title: 'Security Perimeter', items: ['Firewall management', 'VPN & Remote Access', 'Intrusion Detection'], sortOrder: 2 },
        { title: 'Load Balancing', items: ['Application traffic management', 'F5 BigIP Administration', 'SSL Offloading'], sortOrder: 3 },
      ],
      initiatives: [
        { title: 'Next-Gen Firewall Upgrade', description: 'Replacing legacy edge hardware to improve throughput and security inspection capabilities.', href: '#', sortOrder: 0 },
        { title: 'Fibre Expansion Phase 4', description: 'Extending dark fibre connectivity to new facilities in the southwest quadrant.', href: '#', sortOrder: 1 },
      ],
      contacts: [
        { name: 'First Last', role: 'Manager, Network Services', email: 'firstname.lastname@edmonton.ca', sortOrder: 0 },
        { name: 'First Last', role: 'Lead Network Architect', email: 'firstname.lastname@edmonton.ca', sortOrder: 1 },
      ],
      quickLinks: [
        { label: 'Network Diagrams', description: 'Visio topologies for Data Centre and Campus.', href: '#', isSecure: false, sortOrder: 0 },
        { label: 'SolarWinds Dashboard', description: 'Real-time uptime and bandwidth monitoring.', href: '#', isSecure: false, sortOrder: 1 },
        { label: 'IP Address Management (IPAM)', description: 'Internal DNS and subnet allocation tool.', href: '#', isSecure: true, sortOrder: 2 },
      ],
    },
    {
      portfolioHref: '/data-technology/data-centre',
      parentTeam: 'Data Technology', parentTeamHref: '/data-technology',
      title: 'Data Centre', iconName: 'Building2',
      description: 'We manage the City\'s physical computing infrastructure, including on-premises data centres and colocation facilities, ensuring reliable, secure hosting for all City applications and services.',
      services: [
        { title: 'Facility Management', items: ['Primary data centre operations', 'Colocation site management', 'Physical security controls'], sortOrder: 0 },
        { title: 'Power & Cooling', items: ['UPS and generator systems', 'HVAC monitoring and control', 'Environmental sensors'], sortOrder: 1 },
        { title: 'Rack & Cabling', items: ['Server rack provisioning', 'Structured cabling standards', 'Cable management systems'], sortOrder: 2 },
        { title: 'Disaster Recovery', items: ['Secondary site failover', 'Backup power testing', 'Business continuity planning'], sortOrder: 3 },
      ],
      initiatives: [
        { title: 'Data Centre Consolidation', description: 'Migrating workloads from legacy facilities to modernized infrastructure.', href: '#', sortOrder: 0 },
        { title: 'Green IT Initiative', description: 'Implementing energy-efficient cooling and power management solutions.', href: '#', sortOrder: 1 },
      ],
      contacts: [
        { name: 'First Last', role: 'Manager, Data Centre Operations', email: 'firstname.lastname@edmonton.ca', sortOrder: 0 },
        { name: 'First Last', role: 'Facilities Coordinator', email: 'firstname.lastname@edmonton.ca', sortOrder: 1 },
      ],
      quickLinks: [
        { label: 'Data Centre Access Request', description: 'Submit requests for physical access to facilities.', href: '#', isSecure: false, sortOrder: 0 },
        { label: 'Environmental Monitoring', description: 'Temperature, humidity, and power dashboards.', href: '#', isSecure: false, sortOrder: 1 },
        { label: 'Rack Layout Diagrams', description: 'Current server placement and capacity.', href: '#', isSecure: true, sortOrder: 2 },
      ],
    },
    {
      portfolioHref: '/data-technology/voice-mobility-iot',
      parentTeam: 'Data Technology', parentTeamHref: '/data-technology',
      title: 'Voice, Mobility & IoT', iconName: 'Phone',
      description: 'We provide comprehensive communication services including wireline and VoIP phone systems, cellular wireless, machine-to-machine connectivity, and the City\'s LoRaWAN IoT network infrastructure.',
      services: [
        { title: 'Voice Services (VoIP)', items: ['Cisco IP phone provisioning', 'Voicemail and unified messaging', 'Call centre solutions'], sortOrder: 0 },
        { title: 'Cellular & M2M', items: ['Corporate mobile device plans', 'Machine-to-machine connectivity', 'Fleet tracking integration'], sortOrder: 1 },
        { title: 'IoT Network', items: ['LoRaWAN sensor network', 'Smart city device management', 'Environmental monitoring sensors'], sortOrder: 2 },
        { title: 'Collaboration Tools', items: ['Video conferencing systems', 'Digital signage (Appspace)', 'Meeting room technology'], sortOrder: 3 },
      ],
      initiatives: [
        { title: 'Smart City Sensor Expansion', description: 'Deploying additional LoRaWAN sensors for air quality and traffic monitoring.', href: '#', sortOrder: 0 },
        { title: 'Unified Communications Migration', description: 'Transitioning to cloud-based collaboration and voice platforms.', href: '#', sortOrder: 1 },
      ],
      contacts: [
        { name: 'First Last', role: 'Manager, Telecom & IoT', email: 'firstname.lastname@edmonton.ca', sortOrder: 0 },
        { name: 'First Last', role: 'IoT Solutions Architect', email: 'firstname.lastname@edmonton.ca', sortOrder: 1 },
      ],
      quickLinks: [
        { label: 'Phone Request Form', description: 'Request new VoIP phones or extensions.', href: '#', isSecure: false, sortOrder: 0 },
        { label: 'IoT Device Portal', description: 'Manage and monitor connected devices.', href: '#', isSecure: false, sortOrder: 1 },
        { label: 'Cellular Plan Requests', description: 'Corporate mobile device and plan management.', href: '#', isSecure: true, sortOrder: 2 },
      ],
    },
    // Partner Experience sub-pages
    {
      portfolioHref: '/partner-experience/service-desk',
      parentTeam: 'Partner Experience', parentTeamHref: '/partner-experience',
      title: 'Service Desk', iconName: 'Headphones',
      description: 'We provide IT assistance via tickets and calls, offering remote troubleshooting and support to help City employees stay productive. Our team is available to assist with technical issues, service requests, and general IT inquiries.',
      services: [
        { title: 'Incident Support', items: ['Ticket submission and tracking', 'Phone support (780-496-8000)', 'Live chat assistance'], sortOrder: 0 },
        { title: 'Remote Troubleshooting', items: ['Remote desktop support', 'Password resets', 'Software assistance'], sortOrder: 1 },
        { title: 'Service Requests', items: ['Account provisioning', 'Access requests', 'Software installation'], sortOrder: 2 },
        { title: 'Knowledge Base', items: ['Self-service articles', 'How-to guides', 'FAQ documentation'], sortOrder: 3 },
      ],
      initiatives: [
        { title: 'AI-Powered Support Chat', description: 'Implementing intelligent chatbot for faster resolution of common issues.', href: '#', sortOrder: 0 },
        { title: 'Self-Service Portal Enhancement', description: 'Expanding self-service capabilities to reduce ticket volume and improve user experience.', href: '#', sortOrder: 1 },
      ],
      contacts: [
        { name: 'First Last', role: 'Manager, Service Desk', email: 'firstname.lastname@edmonton.ca', sortOrder: 0 },
        { name: 'First Last', role: 'Team Lead, Service Desk', email: 'firstname.lastname@edmonton.ca', sortOrder: 1 },
      ],
      quickLinks: [
        { label: 'Submit a Ticket', description: 'Create a new support request.', href: '#', isSecure: false, sortOrder: 0 },
        { label: 'Knowledge Base', description: 'Search self-help articles and guides.', href: '#', isSecure: false, sortOrder: 1 },
        { label: 'Track My Tickets', description: 'View status of your open requests.', href: '#', isSecure: true, sortOrder: 2 },
      ],
    },
    {
      portfolioHref: '/partner-experience/desktop-support',
      parentTeam: 'Partner Experience', parentTeamHref: '/partner-experience',
      title: 'Desktop Support', iconName: 'Wrench',
      description: 'We provide in-person break-fix services for hardware and software issues across City facilities. Our field technicians are available to resolve complex issues that cannot be handled remotely.',
      services: [
        { title: 'Hardware Support', items: ['Computer repairs', 'Peripheral troubleshooting', 'Hardware replacement'], sortOrder: 0 },
        { title: 'Software Support', items: ['Application troubleshooting', 'Software installation', 'Configuration issues'], sortOrder: 1 },
        { title: 'Workspace Setup', items: ['New employee setup', 'Desk relocations', 'Equipment deployment'], sortOrder: 2 },
        { title: 'Field Services', items: ['On-site support visits', 'Multi-facility coverage', 'Emergency response'], sortOrder: 3 },
      ],
      initiatives: [
        { title: 'Mobile Technician Program', description: 'Deploying mobile support teams for faster on-site response times.', href: '#', sortOrder: 0 },
        { title: 'Hardware Lifecycle Management', description: 'Implementing proactive hardware refresh cycles to reduce break-fix incidents.', href: '#', sortOrder: 1 },
      ],
      contacts: [
        { name: 'First Last', role: 'Manager, Desktop Support', email: 'firstname.lastname@edmonton.ca', sortOrder: 0 },
        { name: 'First Last', role: 'Team Lead, Field Services', email: 'firstname.lastname@edmonton.ca', sortOrder: 1 },
      ],
      quickLinks: [
        { label: 'Request On-Site Support', description: 'Schedule a technician visit.', href: '#', isSecure: false, sortOrder: 0 },
        { label: 'Hardware Request Form', description: 'Request new or replacement hardware.', href: '#', isSecure: false, sortOrder: 1 },
        { label: 'Equipment Return', description: 'Schedule equipment pickup or return.', href: '#', isSecure: true, sortOrder: 2 },
      ],
    },
    {
      portfolioHref: '/partner-experience/desktop-administration',
      parentTeam: 'Partner Experience', parentTeamHref: '/partner-experience',
      title: 'Desktop Administration', iconName: 'Monitor',
      description: 'We manage approximately 12,000 computing devices across the City, including operating system deployment, patch management, software distribution, and configuration management.',
      services: [
        { title: 'Device Management', items: ['Endpoint provisioning', 'Device inventory', 'Asset tracking'], sortOrder: 0 },
        { title: 'Patch Management', items: ['Security updates', 'OS patching', 'Compliance reporting'], sortOrder: 1 },
        { title: 'Software Deployment', items: ['Application packaging', 'Automated deployment', 'License management'], sortOrder: 2 },
        { title: 'Configuration Management', items: ['Group Policy management', 'Standard images', 'Security baselines'], sortOrder: 3 },
      ],
      initiatives: [
        { title: 'Windows 11 Migration', description: 'Upgrading City devices to Windows 11 with improved security features.', href: '#', sortOrder: 0 },
        { title: 'Endpoint Detection & Response', description: 'Deploying advanced endpoint security monitoring across all managed devices.', href: '#', sortOrder: 1 },
      ],
      contacts: [
        { name: 'First Last', role: 'Manager, Desktop Administration', email: 'firstname.lastname@edmonton.ca', sortOrder: 0 },
        { name: 'First Last', role: 'Senior Desktop Engineer', email: 'firstname.lastname@edmonton.ca', sortOrder: 1 },
      ],
      quickLinks: [
        { label: 'Software Request Form', description: 'Request new software installation.', href: '#', isSecure: false, sortOrder: 0 },
        { label: 'Device Inventory', description: 'View managed device information.', href: '#', isSecure: false, sortOrder: 1 },
        { label: 'Patch Compliance Dashboard', description: 'View patch status across the organization.', href: '#', isSecure: true, sortOrder: 2 },
      ],
    },
    // Technology Infrastructure Operations sub-pages
    {
      portfolioHref: '/technology-infrastructure-operations/database',
      parentTeam: 'Technology Infrastructure Operations', parentTeamHref: '/technology-infrastructure-operations',
      title: 'Database Management', iconName: 'Database',
      description: 'We support the City\'s database environment, ensuring data services are reliable, secure, and performant. Our team manages SQL Server, Oracle, and PostgreSQL platforms across the enterprise.',
      services: [
        { title: 'Database Administration', items: ['SQL Server management', 'Oracle database support', 'PostgreSQL operations'], sortOrder: 0 },
        { title: 'Performance Optimization', items: ['Query tuning and analysis', 'Index management', 'Resource monitoring'], sortOrder: 1 },
        { title: 'High Availability', items: ['Always-On clustering', 'Database replication', 'Failover configuration'], sortOrder: 2 },
        { title: 'Security & Compliance', items: ['Access control management', 'Data encryption', 'Audit logging'], sortOrder: 3 },
      ],
      initiatives: [
        { title: 'Database Modernization', description: 'Migrating legacy databases to modern platforms with improved performance and security.', href: '#', sortOrder: 0 },
        { title: 'Automated Patching Program', description: 'Implementing automated database patching to ensure security compliance.', href: '#', sortOrder: 1 },
      ],
      contacts: [
        { name: 'First Last', role: 'Manager, Database Services', email: 'firstname.lastname@edmonton.ca', sortOrder: 0 },
        { name: 'First Last', role: 'Senior Database Administrator', email: 'firstname.lastname@edmonton.ca', sortOrder: 1 },
      ],
      quickLinks: [
        { label: 'Database Request Form', description: 'Request new databases or modifications.', href: '#', isSecure: false, sortOrder: 0 },
        { label: 'Performance Dashboard', description: 'Monitor database health and metrics.', href: '#', isSecure: false, sortOrder: 1 },
        { label: 'Data Recovery Request', description: 'Submit data restoration requests.', href: '#', isSecure: true, sortOrder: 2 },
      ],
    },
    {
      portfolioHref: '/technology-infrastructure-operations/server-solutions',
      parentTeam: 'Technology Infrastructure Operations', parentTeamHref: '/technology-infrastructure-operations',
      title: 'Server Solutions & Automation', iconName: 'Server',
      description: 'We manage the City\'s server infrastructure including operating systems, storage, printing, and data protection services, with a focus on automation and process improvements.',
      services: [
        { title: 'Operating Systems', items: ['Windows Server administration', 'Linux server management', 'OS patching and updates'], sortOrder: 0 },
        { title: 'Storage Solutions', items: ['SAN/NAS management', 'Storage provisioning', 'Capacity planning'], sortOrder: 1 },
        { title: 'Data Protection', items: ['Backup operations', 'Disaster recovery', 'Data replication'], sortOrder: 2 },
        { title: 'Print Services', items: ['Print server management', 'Printer deployment', 'Print queue administration'], sortOrder: 3 },
      ],
      initiatives: [
        { title: 'Server Automation Program', description: 'Implementing infrastructure-as-code for automated server provisioning and configuration.', href: '#', sortOrder: 0 },
        { title: 'Storage Tier Optimization', description: 'Migrating data to appropriate storage tiers based on access patterns and requirements.', href: '#', sortOrder: 1 },
      ],
      contacts: [
        { name: 'First Last', role: 'Manager, Server Solutions', email: 'firstname.lastname@edmonton.ca', sortOrder: 0 },
        { name: 'First Last', role: 'Senior Systems Administrator', email: 'firstname.lastname@edmonton.ca', sortOrder: 1 },
      ],
      quickLinks: [
        { label: 'Server Request Form', description: 'Request new servers or modifications.', href: '#', isSecure: false, sortOrder: 0 },
        { label: 'Storage Dashboard', description: 'Monitor storage capacity and usage.', href: '#', isSecure: false, sortOrder: 1 },
        { label: 'Backup Restore Request', description: 'Submit file or system restoration requests.', href: '#', isSecure: true, sortOrder: 2 },
      ],
    },
    {
      portfolioHref: '/technology-infrastructure-operations/virtualization',
      parentTeam: 'Technology Infrastructure Operations', parentTeamHref: '/technology-infrastructure-operations',
      title: 'Virtualization', iconName: 'Layers',
      description: 'We manage the City\'s virtualization platforms including VMware, Hyper-V, and container services, enabling efficient resource utilization and flexible infrastructure deployment.',
      services: [
        { title: 'VMware Infrastructure', items: ['vSphere cluster management', 'VM provisioning', 'Resource allocation'], sortOrder: 0 },
        { title: 'Hyper-V Services', items: ['Microsoft virtualization', 'Failover clustering', 'Live migration'], sortOrder: 1 },
        { title: 'Virtual Desktop (VDI)', items: ['Horizon desktop pools', 'Application virtualization', 'Remote access solutions'], sortOrder: 2 },
        { title: 'Container Services', items: ['Kubernetes orchestration', 'Container registry', 'Microservices hosting'], sortOrder: 3 },
      ],
      initiatives: [
        { title: 'Hybrid Cloud Integration', description: 'Extending virtualization platform to support hybrid cloud workloads.', href: '#', sortOrder: 0 },
        { title: 'VDI Refresh Project', description: 'Upgrading virtual desktop infrastructure for improved performance and user experience.', href: '#', sortOrder: 1 },
      ],
      contacts: [
        { name: 'First Last', role: 'Manager, Virtualization Services', email: 'firstname.lastname@edmonton.ca', sortOrder: 0 },
        { name: 'First Last', role: 'Senior Virtualization Engineer', email: 'firstname.lastname@edmonton.ca', sortOrder: 1 },
      ],
      quickLinks: [
        { label: 'VM Request Form', description: 'Request new virtual machines.', href: '#', isSecure: false, sortOrder: 0 },
        { label: 'vCenter Dashboard', description: 'Monitor virtualization infrastructure.', href: '#', isSecure: false, sortOrder: 1 },
        { label: 'VDI Access Request', description: 'Request virtual desktop access.', href: '#', isSecure: true, sortOrder: 2 },
      ],
    },
  ];

  const existingSubpages = await prisma.portfolioSubpage.count();
  if (existingSubpages === 0) {
    for (const sp of subpageData) {
      const portfolio = portfolioByHref[sp.portfolioHref];
      if (!portfolio) {
        console.warn(`Portfolio not found for href: ${sp.portfolioHref}`);
        continue;
      }
      await prisma.portfolioSubpage.create({
        data: {
          portfolioId: portfolio.id,
          parentTeam: sp.parentTeam,
          parentTeamHref: sp.parentTeamHref,
          title: sp.title,
          description: sp.description,
          iconName: sp.iconName,
          showStatus: true,
          services: { create: sp.services },
          initiatives: { create: sp.initiatives },
          contacts: { create: sp.contacts },
          quickLinks: { create: sp.quickLinks },
        },
      });
      console.log('Created subpage:', sp.title);
    }
  } else {
    console.log('Subpages already exist, skipping...');
  }

  // ============================================================
  // 4. Seed Shared Accordion Groups (Important Links)
  // ============================================================
  const sharedAccordionData = [
    {
      groupId: 'incident', title: 'Incident Management', sortOrder: 0,
      links: [
        { label: 'Helix (Remedy) SmartIT', href: '#', sortOrder: 0 },
        { label: 'Helix (Remedy) DWP', href: '#', sortOrder: 1 },
        { label: 'Incident Management Process', href: '#', sortOrder: 2 },
        { label: 'WO from Incident Ticket', href: '#', sortOrder: 3 },
        { label: 'Incident Management Flow Charts', href: '#', sortOrder: 4 },
        { label: 'Problem Mgmt Process Guide', href: '#', sortOrder: 5 },
        { label: 'Root Cause Analysis (RCA)', href: '#', sortOrder: 6 },
      ],
    },
    {
      groupId: 'change', title: 'Change Management', sortOrder: 1,
      links: [
        { label: 'OCT Change Management', href: '#', sortOrder: 0 },
        { label: 'OCT Schedule Outages', href: '#', sortOrder: 1 },
        { label: 'Severity 1 Procedures', href: '#', sortOrder: 2 },
        { label: 'OCT Change Management Definitions', href: '#', sortOrder: 3 },
        { label: 'Change Approval - Form', href: '#', sortOrder: 4 },
        { label: 'Work Order vs Change Ticket', href: '#', sortOrder: 5 },
        { label: 'Remedy Definitions', href: '#', sortOrder: 6 },
        { label: 'Change Ticket Cheat Sheet', href: '#', sortOrder: 7 },
      ],
    },
    {
      groupId: 'resource', title: 'Resource Management', sortOrder: 2,
      links: [
        { label: 'Taleo', href: '#', sortOrder: 0 },
        { label: 'Recruitment Toolkit', href: '#', sortOrder: 1 },
        { label: 'Recruitment Approval Process User Guide', href: '#', sortOrder: 2 },
        { label: 'Recruitment Approval Form', href: '#', sortOrder: 3 },
        { label: 'SAP Time Entry Request', href: '#', sortOrder: 4 },
        { label: 'New Account Request', href: '#', sortOrder: 5 },
        { label: 'Phone Request', href: '#', sortOrder: 6 },
        { label: 'Offboarding Link', href: '#', sortOrder: 7 },
        { label: 'Supervisor Offboarding Checklist', href: '#', sortOrder: 8 },
      ],
    },
    {
      groupId: 'its-links', title: 'ITS Team Sites & Other Links', sortOrder: 3,
      links: [
        { label: 'ITS Service Catalog', href: '#', sortOrder: 0 },
        { label: 'Technology Infrastructure Operations', href: '#', sortOrder: 1 },
        { label: 'Service Desk', href: '#', sortOrder: 2 },
        { label: 'Service Management Office', href: '#', sortOrder: 3 },
        { label: 'Enterprise Commons Project', href: '#', sortOrder: 4 },
        { label: 'OCT Employee Links', href: '#', sortOrder: 5 },
        { label: 'Technology PMO', href: '#', sortOrder: 6 },
        { label: 'Open Data Portal', href: '#', sortOrder: 7 },
        { label: 'Open City', href: '#', sortOrder: 8 },
      ],
    },
  ];

  const existingAccordionGroups = await prisma.accordionGroup.count();
  if (existingAccordionGroups === 0) {
    for (const group of sharedAccordionData) {
      await prisma.accordionGroup.create({
        data: {
          teamId: null, // Shared across all ITS teams
          groupId: group.groupId,
          title: group.title,
          sortOrder: group.sortOrder,
          links: { create: group.links },
        },
      });
      console.log('Created shared accordion group:', group.title);
    }
  } else {
    console.log('Accordion groups already exist, skipping...');
  }

  // ============================================================
  // 5. Seed SectionTemplate Teams
  // ============================================================

  // --- Business Solutions ---
  await prisma.team.upsert({
    where: { slug: 'business-solutions' },
    update: {},
    create: {
      slug: 'business-solutions',
      teamName: 'Business Solutions',
      teamShortName: 'Business Solutions',
      pageTemplate: PageTemplate.SECTION,
      pageTitle: 'Business Solutions',
      pageDescription: 'IT business solutions encompass a range of software, applications, programs, and services designed to assist in achieving business goals. From 311 to internal tools, we develop, implement, and support the applications that power City services.',
      sortOrder: 3,
      serviceAreas: {
        create: [
          {
            serviceAreaId: 'posse', title: 'Application Support for POSSE', sortOrder: 0,
            shortDescription: 'Technical support, development and maintenance of the POSSE platform - a powerful configurable enterprise platform and workflow engine that automates business processes.',
            fullDescription: 'Technical support, development and maintenance of the POSSE platform. POSSE (Public One Stop Service) is a powerful configurable enterprise platform and workflow engine that automates, integrates, monitors and enforces business process rules.\n\nThe term "configurable" simply means that POSSE can be changed to meet the needs of different business areas. POSSE is a corporate system used by all city departments, citizens and other external business partners.',
            features: ['Enterprise platform and workflow engine', 'Business process automation and integration', 'Business process rule enforcement', 'Configurable to meet different business area needs', 'Used by all City departments and external partners'],
          },
          {
            serviceAreaId: 'tacs', title: 'Application Support for TACS', sortOrder: 1,
            shortDescription: 'Full in-house design and development for the Taxation and Collection System (TACS) - responsible for approximately 60% of the City\'s operating budget.',
            fullDescription: 'Provide full-in-house design and in-house application development for the Taxation and Collection System (TACS) application for the City of Edmonton.\n\nThe usage of TACS in the organization is to assess, bill, and collect property taxes and is responsible for approximately 60% of the City\'s operating budget.',
            features: ['Property tax assessment', 'Tax billing and collection', 'Responsible for ~60% of City operating budget', 'Full in-house development and support', 'Critical financial system'],
          },
          {
            serviceAreaId: 'weblogic', title: 'Application Support for WebLogic', sortOrder: 2,
            shortDescription: 'Technical support and maintenance of Oracle WebLogic Server infrastructure that runs critical Oracle applications including AMIS, TACS, and TOPS.',
            fullDescription: 'Technical support and maintenance of the infrastructure. The Oracle Weblogic Server is a JAVA virtual machine that at the City of Edmonton is used to run Oracle Fusion Middleware.\n\nThe middleware allows for the development, deployment, and execution of Oracle applications (AMIS, CACTIS, Debentures, ETDS, MVCIS, PAC, TACS, TOPS).',
            features: ['Oracle WebLogic Server infrastructure support', 'Oracle Fusion Middleware management', 'Support for 8+ critical Oracle applications', 'JAVA virtual machine environment', 'Application deployment and execution'],
          },
          {
            serviceAreaId: 'google-workspace', title: 'Application Support for Google Workspace', sortOrder: 3,
            shortDescription: 'Cloud-based productivity and collaboration tools including Gmail, Drive, Docs, Meet, and Calendar for all City employees.',
            fullDescription: 'Google Workspace is a collection of cloud computing, productivity and collaboration tools, software and products developed and marketed by Google.\n\nIt provides comprehensive communication, collaboration, cloud storage, and content creation capabilities for all City of Edmonton employees.',
            features: ['Communication: Gmail, Contacts, Calendar, Meet, Chat', 'Cloud Storage: Google Drive', 'Content Creation: Docs, Sheets, Slides, Forms', 'Collaboration: Sites, Drawings, Keep', 'Enterprise-wide deployment'],
          },
          {
            serviceAreaId: 'branch-solutions', title: 'Business Solutions for City Branches', sortOrder: 4,
            shortDescription: 'Technical support for branch-specific applications including troubleshooting, updates, upgrades, roadmapping, and low-code/no-code app creation.',
            fullDescription: 'Technical support for the identified business areas\' applications. Services include troubleshooting, problem-solving, software updates, application upgrades and maintenance, application roadmapping, and low-code/no-code application creation.\n\nWe work directly with City branches to deliver tailored solutions that meet their unique business needs.',
            features: ['Application troubleshooting and problem-solving', 'Software updates and application upgrades', 'Application maintenance and support', 'Application roadmapping and planning', 'Low-code/no-code application development'],
          },
          {
            serviceAreaId: 'rapid-development', title: 'Rapid Development Services', sortOrder: 5,
            shortDescription: 'Agile, iterative development using low-code platforms to deliver robust functionality with unprecedented speed and efficiency.',
            fullDescription: 'Rapid Development Services empower you to transform your business with unprecedented speed and efficiency. By leveraging an agile, iterative approach and cutting-edge tools like low-code platforms, we deliver the robust functionality of custom development without the traditional overhead.\n\nExperience the power of streamlined workflows, captivating apps, and optimized processes, all within a fraction of the time and cost. Unlock your organization\'s full potential and accelerate your path to success with Rapid Development Services.',
            features: ['Agile, iterative development approach', 'Low-code platform utilization', 'Rapid application delivery', 'Reduced time and cost', 'Streamlined workflows and processes'],
          },
        ],
      },
    },
  });
  console.log('Created team: Business Solutions');

  // --- Corporate Information Security ---
  await prisma.team.upsert({
    where: { slug: 'corporate-information-security' },
    update: {},
    create: {
      slug: 'corporate-information-security',
      teamName: 'Corporate Information Security',
      teamShortName: 'Info Security',
      pageTemplate: PageTemplate.SECTION,
      pageTitle: 'Corporate Information Security',
      pageDescription: 'Protecting the City\'s data, assets, and information from cyber threats. We safeguard citizen privacy and ensure the integrity of municipal operations against evolving risks through comprehensive security services, incident response, and continuous monitoring.',
      sortOrder: 4,
      serviceAreas: {
        create: [
          {
            serviceAreaId: 'advisory-services', title: 'Cyber Security Advisory Services', sortOrder: 0,
            shortDescription: 'Providing cyber security advice on specifications, best practices, risk assessments, scorecards, and risk acceptance for all City systems.',
            fullDescription: 'The Cyber Security Advisory Services and Architecture team provides cyber security advice to all City of Edmonton (CoE) IT Service providers on CoE Cyber security specifications and best practices; and to all CoE business units for security requirements, risk assessments, scorecards, and risk acceptance.\n\nYou will need to reach out to the Cyber Security Advisory Services team if you are implementing or significantly changing the security posture of an existing system either on-premise or in the cloud where the system deals with: Operational Technology, politically and reputationally sensitive public facing systems, providing or managing access to CoE systems for non-CoE personnel, a system that is operationally critical or if it is going to contain Confidential (including FOIP) or Restricted information.',
            features: ['Cyber security specifications and best practices', 'Security requirements and risk assessments', 'Security scorecards and risk acceptance', 'Operational Technology security', 'Public-facing system security consultation'],
          },
          {
            serviceAreaId: 'directory-services', title: 'Directory Services', sortOrder: 1,
            shortDescription: 'Managing the Corporate Directory Service - the backbone for all Corporate network and technology assets including Active Directory and PKI.',
            fullDescription: 'The Corporate Directory Service is the backbone for all Corporate network and technology assets. Without this critical service, employees and partners would not be able to access Corporate technology resources and assets.\n\nWe provide comprehensive directory and access management services to ensure secure and reliable access to all City technology resources.',
            features: ['Active Directory management', 'Domain Groups and Policies management', 'Domain Controller management', 'PKI and SSL Certificate management', 'Secure File Transfer Protocol services', 'Azure environment access management'],
          },
          {
            serviceAreaId: 'continuity-recovery', title: 'Continuity and Recovery Services', sortOrder: 2,
            shortDescription: 'IT Disaster Recovery Program ensuring critical services remain available through business continuity planning and crisis management.',
            fullDescription: 'Supporting the City in its delivery of uninterrupted critical services, Open City and Technology is responsible for ensuring that the technology required to deliver the CoE\'s most critical services are available when needed most.\n\nThis is achieved through the Information Technology Disaster Recovery Program which aligns to the corporate Business Continuity Management Program.',
            features: ['OCT business continuity planning', 'Crisis management planning and coordination', 'Disaster recovery training and awareness', 'Current state capability assessments', 'Improvement recommendations', 'Exercise design, implementation, and reporting', 'IT business continuity and DR audits'],
          },
          {
            serviceAreaId: 'incident-response', title: 'Cybersecurity Investigation & Incident Response', sortOrder: 3,
            shortDescription: 'SOC monitoring, threat detection, incident response, vulnerability management, and malware forensics with 24x7 MDR service.',
            fullDescription: 'Providing comprehensive cybersecurity investigation, incident response, and security operations services to protect the City from cyber threats.\n\nWe operate an internal SOC monitoring threats entering via email, network, endpoint, or cloud, working closely with Mandiant MDR SOC to remediate threats 24x7.',
            features: ['Vulnerability Assurance - iterative vulnerability management', 'Cybersecurity Operations Centre - 24x7 threat monitoring', 'Incident Management - MDR service with FireEye/Mandiant', 'Malware Forensics & Investigations', 'Computer forensics and employee investigations'],
          },
          {
            serviceAreaId: 'governance-compliance', title: 'Governance, Risk, Compliance, and Awareness', sortOrder: 4,
            shortDescription: 'Creating cybersecurity policies, delivering awareness education, providing risk assessments, and coordinating security audits.',
            fullDescription: 'Providing governance, risk management, compliance, and awareness services to establish and maintain a strong cybersecurity posture across the City.\n\nWe create policies, deliver training, assess risks, and coordinate audits to ensure the City meets cybersecurity requirements and best practices.',
            features: ['Cybersecurity policies and standards creation', 'Cybersecurity awareness and education', 'Consulting and risk assessment services', 'Internal and external audit coordination', 'Exercise design and implementation'],
          },
          {
            serviceAreaId: 'identity-access', title: 'Digital Identity & Access Management', sortOrder: 5,
            shortDescription: 'Enterprise IAM operations including user provisioning, offboarding, EIAM portal, and Multi-Factor Authentication implementation.',
            fullDescription: 'Digital Identity & Access Management (IAM) operations provide comprehensive identity and access services for the City\'s workforce.\n\nFrom onboarding to offboarding, we manage digital identities and access rights, implementing modern security controls like Multi-Factor Authentication across all externally available workforce access.',
            features: ['New user digital ID creation and access provisioning', 'Employee offboarding and access removal', 'Enterprise IAM (EIAM) portal operation', 'Self-serve Digital ID services', 'Multi-Factor Authentication implementation'],
          },
        ],
      },
    },
  });
  console.log('Created team: Corporate Information Security');

  // --- Technology Planning ---
  await prisma.team.upsert({
    where: { slug: 'technology-planning' },
    update: {},
    create: {
      slug: 'technology-planning',
      teamName: 'Technology Planning',
      teamShortName: 'Tech Planning',
      pageTemplate: PageTemplate.SECTION,
      pageTitle: 'Technology Planning',
      pageDescription: 'The Technology Planning and Business Engagement section enables the City to make informed technology decisions that provide value to our citizens, businesses and partners.',
      sortOrder: 5,
      serviceAreas: {
        create: [
          {
            serviceAreaId: 'technology-investment', title: 'Technology Investment & Financial Management', sortOrder: 0,
            shortDescription: 'Managing the intake, evaluation, and governance of multi-stakeholder technology projects aligned with City strategies.',
            fullDescription: 'Technology Investment is responsible for the intake and governance of multi-stakeholder and complex technology projects (commonly referred to as Tier A). By taking an investment focused approach, our team helps align Tier A (over $75,000) projects to the City\'s strategies and objectives, ensuring that the value from these projects is communicated and realized.\n\nThe team also manages the governance of Tier A technology projects by facilitating and coordinating regularly recurring meetings between directors, branch managers, and executives across the City of Edmonton.',
            features: ['Technology Investment intake, evaluation, and prioritization', '4-year Corporate Technology Capital budget planning', 'Financial Management Office - budget planning and reporting', 'Corporate Business Technology Governance support', 'People Services - staffing and FTE management'],
          },
          {
            serviceAreaId: 'business-engagement', title: 'Business Engagement', sortOrder: 1,
            shortDescription: 'First point of contact for new technology initiatives, providing business case consulting and portfolio management.',
            fullDescription: 'This team is the first point of contact for new technology initiatives and provides services such as business case consulting and review, strategy and portfolio management, and organization change management.\n\nWe oversee and manage the OCT intake process for all technology requests (Tier A, B, & C) and the OCT concurrence process with focus on building business engagement with stakeholders across the city.',
            features: ['Technology Intake - track and evaluate new requests', 'Technology Concurrence - guide OCT concurrence process', 'Business Case Review - quality assurance and validation', 'Organizational Change Management consultation', 'Strategy and Portfolio Management'],
          },
          {
            serviceAreaId: 'vendor-management', title: 'Vendor Management Office', sortOrder: 2,
            shortDescription: 'Proactive management of technology vendors and contracts, supporting $30M annually in transactions.',
            fullDescription: 'The Vendor Management Office (VMO) is responsible for the effective and proactive management of all Technology Related Vendors (TRV) and contracts associated with the delivery of computer hardware, software, and supporting services for the City of Edmonton.\n\nThe VMO currently supports, negotiates, and manages approximately 500 contracts over 400 different vendors and is responsible for approximately $30M annually in transactions on behalf of OCT and branches across the City.',
            features: ['Contract Lifecycle Management from initiation to termination', 'Advisory Services for procurement and negotiations', 'Procurement of IT hardware, software, and support', 'Financial Management and audit support', 'Vendor relationship management'],
          },
          {
            serviceAreaId: 'it-asset-management', title: 'IT Asset Management', sortOrder: 3,
            shortDescription: 'Comprehensive lifecycle management of technology assets to maximize business value and ensure compliance.',
            fullDescription: 'IT asset management (ITAM) provides an accurate account of technology asset lifecycle costs and risks in order to maximize the business value of technology strategy, architecture, funding, contractual and sourcing decisions.\n\nThis service includes financial, contractual and inventory services to support life cycle management and strategic decision making for the IT environment. Assets include all elements of software and hardware that are found in the business environment.',
            features: ['Purchase, lease, or rent hardware and software', 'Software installation and license compliance', 'Online hardware and software catalogs with self-service', 'Software audit and rationalization', 'Hardware delivery, installation, and configuration', 'Device rental and loaner pool management', 'Telephony and mobility device management'],
          },
        ],
      },
    },
  });
  console.log('Created team: Technology Planning');

  // --- Integrated Technology Solutions ---
  await prisma.team.upsert({
    where: { slug: 'integrated-technology-solutions' },
    update: {},
    create: {
      slug: 'integrated-technology-solutions',
      teamName: 'Integrated Technology Solutions',
      teamShortName: 'ITS',
      pageTemplate: PageTemplate.SECTION,
      pageTitle: 'Integrated Technology Solutions',
      pageDescription: 'IT infrastructure serves as the underlying structure that supports all services and solutions within the City\'s technology environment. We ensure that technology resources are always available and operate efficiently, forming the foundation for all digital services.',
      sortOrder: 6,
      serviceAreas: {
        create: [
          {
            serviceAreaId: 'infrastructure-operations', title: 'Technology Infrastructure Operations', sortOrder: 0,
            shortDescription: 'Ensuring servers, storage, backup, database, and workspace technology are always available through process improvements and automation.',
            fullDescription: 'Technology Infrastructure Operations ensures that servers, storage, backup, database, and workspace technology are always available and operate efficiently through process improvements and automation.\n\nOur team provides critical services supporting the City\'s database environment, storage and server operating systems, printing, data protection, server infrastructure, and virtualization platforms.',
            features: ['Database Management - supporting City database environment', 'Server Solutions & Automation - OS, storage, printing, data protection', 'Virtualization - server infrastructure and platforms', 'Process improvements and automation', 'High availability and efficiency'],
            link: '/technology-infrastructure-operations',
          },
          {
            serviceAreaId: 'telecom-iot', title: 'Telecom and Internet of Things (IoT)', sortOrder: 1,
            shortDescription: 'Communication services including wireline, VoIP, cellular wireless, M2M, LoRaWAN IoT network and Cisco Call Center solutions.',
            fullDescription: 'Telecommunications provides various communication services including wireline & VoIP (Voice over IP) phone, cellular wireless, M2M (machine to machine), LoRaWAN IoT network and a Cisco Call Center solution to serve and support all City business areas.\n\nThe Internet of Things (IoT) refers to networked devices embedded with sensors and software, allowing them to collect and share data that can be processed and utilized for various purposes across the City.',
            features: ['Wireline & VoIP phone services', 'Cellular wireless and M2M communications', 'LoRaWAN IoT network infrastructure', 'Cisco Call Center solutions', 'IoT device management and data collection'],
            link: '/telecom-iot',
          },
          {
            serviceAreaId: 'data-technology', title: 'Data Technology', sortOrder: 2,
            shortDescription: 'Core networking, data center operations, and application delivery services enabling seamless connectivity across the City.',
            fullDescription: 'Data Technology is a core component of the Integrated Technology Solutions (ITS) team, dedicated to enabling City of Edmonton employees and citizens to seamlessly connect with technology, applications, and each other.\n\nWe manage the City\'s network infrastructure, data center facilities, and application delivery platforms to ensure reliable, secure connectivity across all City operations.',
            features: ['Connecting Technologies - ADCs, cloud, Appspace, digital faxing', 'Data Center - on-prem and colocation facility management', 'Network - 1,000+ switches, 1,400+ APs, 300 km fiber', 'Secure application delivery', 'City-wide connectivity infrastructure'],
            link: '/data-technology',
          },
          {
            serviceAreaId: 'partner-experience', title: 'Partner Experience', sortOrder: 3,
            shortDescription: 'User assistance and computing environment management including Service Desk, Desktop Support, and Desktop Administration.',
            fullDescription: 'Partner Experience delivers essential user assistance and manages our computing environment through several key functional areas to help our internal customers provide services to our citizens.\n\nWe provide comprehensive support from remote troubleshooting to in-person assistance, managing approximately 12,000 computing devices across the City.',
            features: ['Service Desk - IT assistance via tickets and calls', 'Desktop Support - in-person break-fix services', 'Desktop Administration - ~12,000 device management', 'Operating system and patch management', 'Software deployment and configuration'],
            link: '/partner-experience',
          },
          {
            serviceAreaId: 'service-delivery', title: 'Service Delivery and Analytics', sortOrder: 4,
            shortDescription: 'Service Management Office and Monitoring & Analytics providing process management, ITSM platform support, and comprehensive monitoring.',
            fullDescription: 'The Service Management Office (SMO) is instrumental in both operational and business-facing aspects of IT service delivery, focusing on Change, Problem, and Incident Management processes while managing the Digital Workplace Catalog and Work Order process.\n\nMonitoring & Analytics provides reliable monitoring platforms for IT infrastructure, networks, applications, and user interfaces with modern alerting, dashboards, and AI-powered analysis tools.',
            features: ['Change, Problem, and Incident Management', 'Digital Workplace Catalog management', 'CMDB and Remedy ITSM platform support', 'Infrastructure and application monitoring', 'AI-powered data analysis and dashboards'],
            link: '/service-delivery',
          },
        ],
      },
    },
  });
  console.log('Created team: Integrated Technology Solutions');

  // ============================================================
  // 5b. Set Parent-Child Relationships & Create Missing ITS Sub-Teams
  // ============================================================
  const itsSection = await prisma.team.findUniqueOrThrow({ where: { slug: 'integrated-technology-solutions' } });

  // Set parentId on existing ITS sub-teams
  await prisma.team.update({ where: { slug: 'data-technology' }, data: { parentId: itsSection.id } });
  await prisma.team.update({ where: { slug: 'partner-experience' }, data: { parentId: itsSection.id } });
  await prisma.team.update({ where: { slug: 'technology-infrastructure-operations' }, data: { parentId: itsSection.id } });
  console.log('Set parentId for existing ITS sub-teams');

  // Create Service Delivery and Analytics team under ITS
  const serviceDelivery = await prisma.team.upsert({
    where: { slug: 'service-delivery' },
    update: {},
    create: {
      slug: 'service-delivery',
      teamName: 'Service Delivery and Analytics',
      teamShortName: 'Service Delivery',
      pageTemplate: PageTemplate.ITS_TEAM,
      sortOrder: 3,
      parentId: itsSection.id,
    },
  });
  console.log('Created team:', serviceDelivery.teamName);

  // Create Telecom and IoT team under ITS
  const telecomIot = await prisma.team.upsert({
    where: { slug: 'telecom-iot' },
    update: {},
    create: {
      slug: 'telecom-iot',
      teamName: 'Telecom and Internet of Things (IoT)',
      teamShortName: 'Telecom & IoT',
      pageTemplate: PageTemplate.ITS_TEAM,
      sortOrder: 4,
      parentId: itsSection.id,
    },
  });
  console.log('Created team:', telecomIot.teamName);

  // ============================================================
  // 6. Seed Widget Definitions
  // ============================================================
  const widgetDefinitions = [
    { widgetType: 'page_header', label: 'Page Header', description: 'Team name banner with support request button', icon: 'Type' },
    { widgetType: 'portfolios', label: 'Our Portfolios', description: 'Grid of portfolio cards with icons, descriptions, and links', icon: 'LayoutGrid' },
    { widgetType: 'team_tabs', label: 'Team Overviews', description: 'Tabbed interface with video embeds and diagram links', icon: 'Columns' },
    { widgetType: 'accordion_links', label: 'Important Links', description: 'Collapsible accordion groups of categorized links', icon: 'List' },
    { widgetType: 'work_tracking', label: 'Work Tracking Boards', description: 'Grid of external board cards (Trello, etc.)', icon: 'ClipboardList' },
    { widgetType: 'ongoing_projects', label: 'Ongoing Projects', description: 'Hero block highlighting current projects with CTA', icon: 'FileText' },
    { widgetType: 'budget_spend', label: 'Budget & Spend', description: 'Budget overview card with link to financial reports', icon: 'BarChart3' },
    { widgetType: 'team_members', label: 'Who We Are', description: 'Team member cards grid with contact info', icon: 'Users' },
    { widgetType: 'service_areas', label: 'Service Areas', description: 'Service area cards with modal detail views', icon: 'Layers' },
    { widgetType: 'subteam_header', label: 'Sub-Team Header', description: 'Hero section with icon, title, and breadcrumb', icon: 'LayoutGrid' },
    { widgetType: 'subteam_services', label: 'Our Services', description: 'Grid of service cards with bullet items', icon: 'Briefcase' },
    { widgetType: 'subteam_initiatives', label: 'Current Initiatives', description: 'Initiative cards with descriptions and links', icon: 'Rocket' },
    { widgetType: 'subteam_contacts', label: 'Key Contacts', description: 'Sidebar contact cards with roles and emails', icon: 'Users' },
    { widgetType: 'subteam_quick_links', label: 'Quick Links', description: 'Sidebar quick links with descriptions', icon: 'Link' },
  ];

  for (const def of widgetDefinitions) {
    await prisma.widgetDefinition.upsert({
      where: { widgetType: def.widgetType },
      update: {},
      create: def,
    });
  }
  console.log('Created widget definitions:', widgetDefinitions.length);

  // ============================================================
  // 7. Seed Default Widget Instances for Each Team
  // ============================================================
  const allTeams = await prisma.team.findMany();
  const allWidgetDefs = await prisma.widgetDefinition.findMany();
  const defByType = Object.fromEntries(allWidgetDefs.map(d => [d.widgetType, d]));

  const ITS_TEAM_DEFAULTS = [
    'page_header', 'portfolios', 'team_tabs', 'accordion_links',
    'work_tracking', 'ongoing_projects', 'budget_spend', 'team_members',
  ];
  const SECTION_DEFAULTS = ['service_areas'];
  const SUB_TEAM_DEFAULTS = [
    'subteam_header', 'subteam_services', 'subteam_initiatives',
    'subteam_contacts', 'subteam_quick_links',
  ];

  for (const team of allTeams) {
    const defaults = team.pageTemplate === 'SECTION'
      ? SECTION_DEFAULTS
      : team.pageTemplate === 'SUB_TEAM'
        ? SUB_TEAM_DEFAULTS
        : ITS_TEAM_DEFAULTS;
    for (let i = 0; i < defaults.length; i++) {
      const def = defByType[defaults[i]];
      if (!def) continue;
      await prisma.widgetInstance.upsert({
        where: { teamId_widgetDefinitionId: { teamId: team.id, widgetDefinitionId: def.id } },
        update: {},
        create: { teamId: team.id, widgetDefinitionId: def.id, sortOrder: i },
      });
    }
    console.log(`Created default widget instances for: ${team.teamName} (${defaults.length} widgets)`);
  }

  // ============================================================
  // 8. Migrate PortfolioSubpage data to Sub-Team Team records
  // ============================================================
  const existingSubTeams = await prisma.team.count({ where: { pageTemplate: 'SUB_TEAM' } });
  if (existingSubTeams === 0) {
    const portfoliosWithSubpages = await prisma.portfolio.findMany({
      where: { subpage: { isNot: null } },
      include: {
        team: true,
        subpage: {
          include: {
            services: { orderBy: { sortOrder: 'asc' } },
            initiatives: { orderBy: { sortOrder: 'asc' } },
            contacts: { orderBy: { sortOrder: 'asc' } },
            quickLinks: { orderBy: { sortOrder: 'asc' } },
          },
        },
      },
    });

    // Re-fetch widget defs (now includes sub-team defs)
    const freshWidgetDefs = await prisma.widgetDefinition.findMany();
    const freshDefByType = Object.fromEntries(freshWidgetDefs.map(d => [d.widgetType, d]));

    for (const portfolio of portfoliosWithSubpages) {
      const sp = portfolio.subpage!;
      // Derive slug from the portfolio href (e.g. "/data-technology/network-services" -> "network-services")
      const slug = portfolio.href.split('/').pop() || portfolio.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

      const subTeam = await prisma.team.create({
        data: {
          slug,
          teamName: sp.title,
          teamShortName: sp.title,
          pageTemplate: 'SUB_TEAM',
          iconName: sp.iconName,
          pageDescription: sp.description,
          showStatus: sp.showStatus,
          parentId: portfolio.teamId,
          isPublished: true,
          sortOrder: portfolio.sortOrder,
        },
      });

      // Copy content data
      for (const svc of sp.services) {
        await prisma.teamService.create({
          data: { teamId: subTeam.id, title: svc.title, items: svc.items, sortOrder: svc.sortOrder },
        });
      }
      for (const init of sp.initiatives) {
        await prisma.teamInitiative.create({
          data: { teamId: subTeam.id, title: init.title, description: init.description, href: init.href, sortOrder: init.sortOrder },
        });
      }
      for (const contact of sp.contacts) {
        await prisma.teamContact.create({
          data: { teamId: subTeam.id, name: contact.name, role: contact.role, email: contact.email, sortOrder: contact.sortOrder },
        });
      }
      for (const ql of sp.quickLinks) {
        await prisma.teamQuickLink.create({
          data: { teamId: subTeam.id, label: ql.label, description: ql.description, href: ql.href, isSecure: ql.isSecure, sortOrder: ql.sortOrder },
        });
      }

      // Create default sub-team widget instances
      for (let i = 0; i < SUB_TEAM_DEFAULTS.length; i++) {
        const def = freshDefByType[SUB_TEAM_DEFAULTS[i]];
        if (def) {
          await prisma.widgetInstance.upsert({
            where: { teamId_widgetDefinitionId: { teamId: subTeam.id, widgetDefinitionId: def.id } },
            update: {},
            create: { teamId: subTeam.id, widgetDefinitionId: def.id, sortOrder: i },
          });
        }
      }

      // Link portfolio to sub-team
      await prisma.portfolio.update({
        where: { id: portfolio.id },
        data: { linkedTeamId: subTeam.id },
      });

      console.log(`Migrated subpage to sub-team: ${sp.title} (slug: ${slug})`);
    }
  } else {
    console.log('Sub-teams already exist, skipping migration...');
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
