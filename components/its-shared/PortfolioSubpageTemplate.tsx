import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { User, UserCog, ExternalLink, Lock, CheckCircle } from 'lucide-react';
import { resolveIcon } from '@/lib/icon-resolver';

export interface ServiceCard {
  title: string;
  items: string[];
}

export interface Initiative {
  title: string;
  description: string;
  href: string;
}

export interface Contact {
  name: string;
  role: string;
  email: string;
}

export interface QuickLink {
  label: string;
  description: string;
  href: string;
  isSecure?: boolean;
}

interface PortfolioSubpageTemplateProps {
  parentTeam: string;
  parentTeamHref: string;
  title: string;
  description: string;
  icon: string;
  services: ServiceCard[];
  initiatives: Initiative[];
  contacts: Contact[];
  quickLinks: QuickLink[];
  showStatus?: boolean;
}

export default function PortfolioSubpageTemplate({
  parentTeam,
  parentTeamHref,
  title,
  description,
  icon,
  services,
  initiatives,
  contacts,
  quickLinks,
  showStatus = true,
}: PortfolioSubpageTemplateProps) {
  const Icon = resolveIcon(icon);
  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Block */}
          <section className="bg-structural-light-gray rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 mb-8">
            <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-sm flex-shrink-0">
              {/* eslint-disable-next-line react-hooks/static-components -- resolveIcon returns a stable reference from a static map */}
              <Icon className="w-10 h-10 text-primary-blue" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="font-sans text-2xl md:text-3xl font-bold text-primary-blue mb-2">
                {title}
              </h1>
              <p className="font-sans text-text-secondary max-w-3xl">
                {description}
              </p>
            </div>
          </section>

          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content (2/3) */}
            <div className="lg:col-span-2">
              {/* Our Services */}
              <section className="mb-10">
                <h2 className="font-sans text-xl md:text-2xl font-bold text-primary-blue mb-2 pb-2 border-b-2 border-structural-gray-blue">
                  Our Services
                </h2>
                <p className="font-sans text-text-secondary mb-6">
                  We offer end-to-end solutions for business areas. Explore our core capabilities below.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {services.map((service, index) => (
                    <div
                      key={index}
                      className="border border-structural-gray-blue rounded-md p-5 bg-white hover:border-primary-blue hover:-translate-y-1 hover:shadow-md transition-all duration-200"
                    >
                      <h3 className="font-sans text-primary-blue font-bold text-lg mb-3">
                        {service.title}
                      </h3>
                      <ul className="font-sans text-sm text-text-secondary space-y-1 list-disc list-inside">
                        {service.items.map((item, itemIndex) => (
                          <li key={itemIndex}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Current Initiatives */}
              <section>
                <h2 className="font-sans text-xl md:text-2xl font-bold text-primary-blue mb-2 pb-2 border-b-2 border-structural-gray-blue">
                  Current Initiatives
                </h2>
                <p className="font-sans text-text-secondary mb-6">
                  Key projects currently underway within this portfolio.
                </p>

                <div className="space-y-6">
                  {initiatives.map((initiative, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-primary-blue pl-5"
                    >
                      <h3 className="font-sans text-primary-blue font-bold text-lg mb-1">
                        {initiative.title}
                      </h3>
                      <p className="font-sans text-sm text-text-secondary mb-2">
                        {initiative.description}
                      </p>
                      <Link
                        href={initiative.href}
                        className="font-sans text-sm text-primary-blue font-semibold hover:underline"
                      >
                        View Project Docs &rarr;
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar (1/3) */}
            <aside className="space-y-6">
              {/* Key Contacts */}
              <div className="bg-structural-light-gray rounded-md p-5">
                <h3 className="font-sans font-bold text-text-dark border-b border-structural-gray-blue pb-2 mb-4">
                  Key Contacts
                </h3>
                <div className="space-y-4">
                  {contacts.map((contact, index) => (
                    <div key={index} className="flex gap-3">
                      {index === 0 ? (
                        <User className="w-5 h-5 text-primary-blue mt-0.5 flex-shrink-0" />
                      ) : (
                        <UserCog className="w-5 h-5 text-primary-blue mt-0.5 flex-shrink-0" />
                      )}
                      <div>
                        <h4 className="font-sans font-semibold text-sm text-text-dark">
                          {contact.name}
                        </h4>
                        <span className="font-sans text-xs text-text-secondary block">
                          {contact.role}
                        </span>
                        <a
                          href={`mailto:${contact.email}`}
                          className="font-sans text-xs text-primary-blue hover:underline"
                        >
                          {contact.email}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-structural-light-gray rounded-md p-5">
                <h3 className="font-sans font-bold text-text-dark border-b border-structural-gray-blue pb-2 mb-4">
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => (
                    <li
                      key={index}
                      className="border-b border-structural-gray-blue pb-3 last:border-0 last:pb-0"
                    >
                      <a
                        href={link.href}
                        className="font-sans font-semibold text-sm text-primary-blue hover:underline flex items-center gap-1"
                      >
                        {link.label}
                        {link.isSecure ? (
                          <Lock className="w-3 h-3" />
                        ) : (
                          <ExternalLink className="w-3 h-3" />
                        )}
                      </a>
                      <span className="font-sans text-xs text-text-secondary block mt-0.5">
                        {link.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* System Status */}
              {showStatus && (
                <div className="bg-[#e8f5e9] border border-[#c8e6c9] rounded-md p-5">
                  <h3 className="font-sans font-bold text-[#2e7d32] border-b border-[#a5d6a7] pb-2 mb-4">
                    System Status
                  </h3>
                  <div className="flex items-center gap-2 text-[#2e7d32] font-semibold">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-sans text-sm">All Systems Operational</span>
                  </div>
                  <p className="font-sans text-xs text-[#1b5e20] mt-2">
                    <a href="#" className="hover:underline">
                      View Incident History
                    </a>
                  </p>
                </div>
              )}
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
