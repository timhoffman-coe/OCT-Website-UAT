'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export const dynamic = 'force-static';

function WifiOffIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 20h.01" />
      <path d="M8.5 16.429a5 5 0 0 1 7 0" />
      <path d="M5 12.859a10 10 0 0 1 5.17-2.69" />
      <path d="M13.83 10.17A10 10 0 0 1 19 12.859" />
      <path d="M2 8.82a15 15 0 0 1 4.17-2.65" />
      <path d="M10.66 5.09A15 15 0 0 1 22 8.82" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  );
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  );
}

function GroupsIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function DashboardIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
}

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function HeartPulseIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19.5 12.572l-7.5 7.428l-7.5-7.428A5 5 0 1 1 12 6.006a5 5 0 1 1 7.5 6.572" />
      <path d="M5 12h2l2 4 4-8 2 4h2" />
    </svg>
  );
}

const quickLinks = [
  { label: 'About Us', href: '/about', Icon: GroupsIcon },
  { label: 'Dashboards', href: '/dashboards', Icon: DashboardIcon },
  { label: 'Resources', href: '/resources', Icon: FolderIcon },
  { label: 'Service Health', href: '/service-health', Icon: HeartPulseIcon },
];

export default function OfflinePage() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Simplified static header — no API calls */}
      <header className="bg-primary-blue text-white px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <Image src="/icons/icon-72x72.png" alt="City of Edmonton" width={40} height={40} />
          <span className="font-sans text-lg font-semibold">Open City &amp; Technology</span>
        </div>
      </header>

      <main id="main-content" className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl w-full text-center py-16 md:py-24">
          {/* Offline hero */}
          <div className="relative mb-8">
            <p className="font-sans text-[8rem] md:text-[12rem] font-bold leading-none text-primary-blue/10 select-none">
              &#8230;
            </p>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-peaceful-light-blue flex items-center justify-center">
                <WifiOffIcon className="w-10 h-10 md:w-14 md:h-14 text-primary-blue" />
              </div>
            </div>
          </div>

          {/* Message */}
          <h1 className="font-sans text-3xl md:text-4xl font-bold text-primary-blue mb-4">
            You&apos;re Offline
          </h1>
          <p className="font-sans text-lg md:text-xl text-text-secondary max-w-lg mx-auto mb-10">
            It looks like you&apos;ve lost your internet connection.
            Some content may still be available from cache.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button size="lg" onClick={() => window.location.reload()}>
              <span className="flex items-center gap-2">
                <RefreshIcon className="w-5 h-5" />
                Try Again
              </span>
            </Button>
            <Button as="link" href="/" variant="outline" size="lg">
              <span className="flex items-center gap-2">
                <HomeIcon className="w-5 h-5" />
                Back to Home
              </span>
            </Button>
          </div>

          {/* Quick links */}
          <div className="border-t-2 border-structural-light-gray pt-10">
            <p className="font-sans text-sm font-semibold text-complement-grey-flannel uppercase tracking-wider mb-6">
              Try These Pages
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group flex flex-col items-center gap-2 p-4 rounded-lg bg-structural-light-gray hover:bg-peaceful-light-blue transition-colors duration-300"
                >
                  <link.Icon className="w-6 h-6 text-primary-blue group-hover:text-dark-blue transition-colors" />
                  <span className="font-sans text-sm font-semibold text-text-dark group-hover:text-primary-blue transition-colors">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Simplified static footer */}
      <footer className="bg-structural-light-gray px-4 sm:px-6 lg:px-8 py-6 text-center">
        <p className="font-sans text-sm text-complement-grey-flannel">
          City of Edmonton &mdash; Open City &amp; Technology
        </p>
      </footer>
    </div>
  );
}
