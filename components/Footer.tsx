import Link from 'next/link';
import Image from 'next/image';

const aboutLinks = [
  { label: 'Branch Overview', href: '/about' },
  { label: 'Our Leadership', href: '/leadership' },
  { label: 'How OCT Works', href: '/about/how-oct-works' },
  { label: 'Technology Roadmap', href: '/roadmap' },
  { label: 'Org Chart', href: '/org-chart' },
  { label: 'News & Updates', href: '/news' },
];

const sectionLinks = [
  { label: 'All Teams', href: '/services' },
  { label: 'Technology Planning', href: '/technology-planning' },
  { label: 'Application Technology Services', href: '/application-technology-services' },
  { label: 'Integrated Technology Solutions', href: '/integrated-technology-solutions' },
  { label: 'Project Management Office', href: '/project-management-office' },
  { label: 'Corporate Information Security', href: '/corporate-information-security' },
];

const resourceLinks = [
  { label: 'Dashboards', href: '/dashboards' },
  { label: 'App Library', href: '/resources/app-library' },
  { label: 'Technology Strategies', href: '/technology-strategies' },
  { label: 'Policies & Procedures', href: '/policies' },
  { label: 'AI Resources', href: '/ai-resources' },
  { label: 'Useful Links', href: '/links' },
];

const supportLinks = [
  { label: 'Contact Us', href: '/contact' },
  { label: 'Get Help', href: '/get-help' },
  { label: 'Technology Intake', href: '/technology-intake' },
  { label: 'Service Health', href: '/service-health' },
  { label: 'Search', href: '/search' },
];

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="font-sans text-sm font-semibold text-white uppercase tracking-wider mb-4">
        {title}
      </h3>
      <ul className="space-y-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block py-1.5 font-sans text-sm text-gray-300 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-primary-blue">
      <div className="w-full max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <nav aria-label="Footer navigation">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Block */}
            <div className="md:col-span-2 lg:col-span-1">
              <Image
                src="/images/EDM_logo_Blue.webp"
                alt="City of Edmonton"
                width={48}
                height={48}
                className="mb-4 brightness-200"
              />
              <p className="font-sans text-lg font-bold text-white">Open City &amp; Technology</p>
              <p className="font-sans text-xs text-gray-300 uppercase tracking-wider mt-1">
                Financial and Corporate Services
              </p>
              <p className="font-sans text-sm text-gray-300 italic mt-4">
                Connecting Edmonton Through Technology
              </p>
            </div>

            <FooterColumn title="About Us" links={aboutLinks} />
            <FooterColumn title="Sections" links={sectionLinks} />
            <FooterColumn title="Resources" links={resourceLinks} />
            <FooterColumn title="Support" links={supportLinks} />
          </div>
        </nav>

        {/* Divider */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="font-sans text-sm text-gray-300">
              &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> City of Edmonton | Open City &amp; Technology
            </p>
            <Link
              href="/white-rabbit"
              className="font-sans text-xs text-primary-blue hover:text-white transition-colors"
              aria-hidden="true"
              tabIndex={-1}
            >
              White Rabbit
            </Link>
            <p className="font-sans text-xs text-gray-300">
              v{process.env.NEXT_PUBLIC_APP_VERSION}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
