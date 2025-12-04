'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  BarChart3,
  Search,
  Pencil,
  ClipboardList,
  LayoutDashboard,
  AlertTriangle,
  Clock,
  FileText,
  FolderOpen,
  BookOpen,
  ExternalLink,
  ListChecks
} from 'lucide-react';

// Icon components for custom icons that match the screenshot
const TrendIcon = () => (
  <svg className="w-8 h-8 text-primary-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 17l6-6 4 4 8-8" />
    <path d="M17 7h4v4" />
  </svg>
);

const ProjectsIcon = () => (
  <svg className="w-8 h-8 text-primary-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
  </svg>
);

const RiskIcon = () => (
  <svg className="w-8 h-8 text-primary-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M12 18v-6" />
    <path d="M12 12h.01" />
  </svg>
);

const EngagementsIcon = () => (
  <svg className="w-8 h-8 text-primary-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <circle cx="4" cy="6" r="1" fill="currentColor" />
    <circle cx="4" cy="12" r="1" fill="currentColor" />
    <circle cx="4" cy="18" r="1" fill="currentColor" />
  </svg>
);

const TimeMachineIcon = () => (
  <svg className="w-8 h-8 text-primary-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
    <path d="M2 12h2" />
  </svg>
);

const ArchiveIcon = () => (
  <svg className="w-8 h-8 text-primary-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="4" />
    <path d="M3 7v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" />
    <path d="M10 12h4" />
  </svg>
);

interface LinkItem {
  title: string;
  href: string;
  description?: string;
  subLinks?: { title: string; href: string }[];
}

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  items: {
    icon: React.ReactNode;
    content: React.ReactNode;
  }[];
  bgColor?: string;
}

const Section = ({ icon, title, items, bgColor = 'bg-white' }: SectionProps) => (
  <div className="mb-0">
    {/* Section Header */}
    <div className="bg-[#D3ECEF] px-6 py-4 flex items-center gap-3 border-b border-[#B8D4D9]">
      <div className="text-primary-blue">{icon}</div>
      <h2 className="font-sans text-xl font-semibold text-primary-blue">{title}</h2>
    </div>

    {/* Section Content */}
    <div className={`${bgColor} px-6 py-6`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {items.map((item, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex-shrink-0 text-primary-blue">{item.icon}</div>
            <div className="flex-1">{item.content}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ExternalLinkComponent = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-primary-blue hover:text-dark-blue underline decoration-1 underline-offset-2 hover:decoration-2 transition-all"
  >
    {children}
  </a>
);

export default function ProjectManagementOfficePage() {
  return (
    <div className="bg-white min-h-screen">
      <Header />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <div className="bg-white py-12">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-sans text-4xl md:text-5xl font-bold text-primary-blue text-center mb-2 pb-3 border-b-4 border-primary-blue inline-block w-full">
              Technology Project Management Office
            </h1>
          </div>
        </div>

        {/* I would like to... Header */}
        <div className="bg-primary-blue py-4">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-sans text-2xl font-bold text-white">I would like to ...</h2>
          </div>
        </div>

        {/* Sections Container */}
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">

          {/* Section 1: Review the technology project portfolio at a high level */}
          <Section
            icon={<TrendIcon />}
            title="Review the technology project portfolio at a high level"
            items={[
              {
                icon: <ListChecks className="w-8 h-8" />,
                content: (
                  <div>
                    <p className="font-sans font-semibold text-primary-blue mb-1">
                      <ExternalLinkComponent href="#">ELT Watchlist</ExternalLinkComponent>
                      {' & '}
                      <ExternalLinkComponent href="#">Tech Projects</ExternalLinkComponent>
                    </p>
                    <p className="font-serif text-sm text-[#495057]">
                      Watchlist reports display project health and summaries of recent progress.
                    </p>
                  </div>
                ),
              },
              {
                icon: <LayoutDashboard className="w-8 h-8" />,
                content: (
                  <div>
                    <p className="font-sans font-semibold mb-1">
                      <ExternalLinkComponent href="#">Projects Dashboard</ExternalLinkComponent>
                    </p>
                    <p className="font-serif text-sm text-[#495057]">
                      A user friendly, interactive, and data-rich view of current projects&apos; financial and schedule info.
                    </p>
                  </div>
                ),
              },
              {
                icon: <RiskIcon />,
                content: (
                  <div>
                    <p className="font-sans font-semibold mb-1">
                      <ExternalLinkComponent href="#">Active Risk Register</ExternalLinkComponent>
                    </p>
                    <p className="font-serif text-sm text-[#495057]">
                      A portfolio-level view of all active project risks.
                    </p>
                  </div>
                ),
              },
            ]}
          />

          {/* Section 2: Examine technology projects in greater detail */}
          <Section
            icon={<Search className="w-6 h-6" />}
            title="Examine technology projects in greater detail"
            items={[
              {
                icon: <EngagementsIcon />,
                content: (
                  <div>
                    <p className="font-sans font-semibold mb-1">
                      <ExternalLinkComponent href="#">Engagements</ExternalLinkComponent>
                    </p>
                    <p className="font-serif text-sm text-[#495057] mb-2">
                      Listing of all projects with links to associated repositories, since 2015.
                      You can also try our{' '}
                      <ExternalLinkComponent href="#">PMO-On-The-Go App</ExternalLinkComponent>
                      , an open-to-all one-stop-shop for project info.
                    </p>
                  </div>
                ),
              },
              {
                icon: <TimeMachineIcon />,
                content: (
                  <div>
                    <p className="font-sans font-semibold mb-1">
                      <ExternalLinkComponent href="#">Time Machine</ExternalLinkComponent>
                    </p>
                    <p className="font-serif text-sm text-[#495057]">
                      Snapshots of the technology project portfolio, as well as lists of changes on individual projects over time. Includes detailed financial, health, and schedule data since May 2020.
                    </p>
                  </div>
                ),
              },
              {
                icon: <ArchiveIcon />,
                content: (
                  <div>
                    <p className="font-sans font-semibold mb-1">
                      <ExternalLinkComponent href="#">Status Reports Archive</ExternalLinkComponent>
                    </p>
                    <p className="font-serif text-sm text-[#495057] mb-3">
                      A repository of technology project status reports, since 2018.
                    </p>
                    <p className="font-sans font-semibold mb-1">
                      <ExternalLinkComponent href="#">Recent Status Reports</ExternalLinkComponent>
                    </p>
                    <p className="font-serif text-sm text-[#495057]">
                      Get a listing of the most recent status reports straight from OnePlan.
                    </p>
                  </div>
                ),
              },
            ]}
          />

          {/* Section 3: Get help with steering or managing a project */}
          <Section
            icon={<Pencil className="w-6 h-6" />}
            title="Get help with steering or managing a project"
            items={[
              {
                icon: <ClipboardList className="w-8 h-8" />,
                content: (
                  <div>
                    <p className="font-sans font-semibold text-primary-blue mb-2">
                      <ExternalLinkComponent href="#">Project Framework</ExternalLinkComponent>
                    </p>
                    <ul className="font-serif text-sm text-[#495057] space-y-1">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary-blue rounded-full flex-shrink-0"></span>
                        <ExternalLinkComponent href="#">Overview</ExternalLinkComponent>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary-blue rounded-full flex-shrink-0"></span>
                        <ExternalLinkComponent href="#">Responsibility Matrix</ExternalLinkComponent>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary-blue rounded-full flex-shrink-0"></span>
                        <ExternalLinkComponent href="#">Guides</ExternalLinkComponent>
                        {' & '}
                        <ExternalLinkComponent href="#">Samples</ExternalLinkComponent>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary-blue rounded-full flex-shrink-0"></span>
                        <ExternalLinkComponent href="#">Standards</ExternalLinkComponent>
                        {' & '}
                        <ExternalLinkComponent href="#">Processes</ExternalLinkComponent>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary-blue rounded-full flex-shrink-0"></span>
                        <ExternalLinkComponent href="#">Video Tutorials</ExternalLinkComponent>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary-blue rounded-full flex-shrink-0"></span>
                        <ExternalLinkComponent href="#">Sponsor Orientation</ExternalLinkComponent>
                      </li>
                    </ul>
                  </div>
                ),
              },
              {
                icon: (
                  <div className="w-8 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#217346">
                      <path d="M21.17 3H7.83A1.83 1.83 0 0 0 6 4.83v14.34A1.83 1.83 0 0 0 7.83 21h13.34A1.83 1.83 0 0 0 23 19.17V4.83A1.83 1.83 0 0 0 21.17 3zM12 17l-3.5-3.5 1.41-1.41L12 14.17l4.59-4.58L18 11l-6 6z"/>
                      <path d="M1 7v13h5v-2H3V9h3V7H1z" opacity="0.3"/>
                    </svg>
                  </div>
                ),
                content: (
                  <div>
                    <p className="font-sans font-semibold text-primary-blue mb-2">
                      <ExternalLinkComponent href="#">OnePlan PPM</ExternalLinkComponent>
                    </p>
                    <ul className="font-serif text-sm text-[#495057] space-y-1">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary-blue rounded-full flex-shrink-0"></span>
                        <ExternalLinkComponent href="#">Request Access</ExternalLinkComponent>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary-blue rounded-full flex-shrink-0"></span>
                        <ExternalLinkComponent href="#">Documentation</ExternalLinkComponent>
                      </li>
                    </ul>
                  </div>
                ),
              },
              {
                icon: (
                  <div className="w-8 h-8 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#0078D4">
                      <path d="M22.2 18.2L19.4 9c-.4-1.4-1.8-2.3-3.2-2.3H12V3h-2v3.7H7.8c-1.4 0-2.7.9-3.2 2.3L1.8 18.2c-.3 1.1.5 2.1 1.6 2.1h17.2c1.1 0 1.9-1 1.6-2.1zM12 16c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"/>
                    </svg>
                  </div>
                ),
                content: (
                  <div>
                    <p className="font-sans font-semibold text-primary-blue mb-2">
                      <ExternalLinkComponent href="#">Azure DevOps</ExternalLinkComponent>
                    </p>
                    <ul className="font-serif text-sm text-[#495057] space-y-1">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary-blue rounded-full flex-shrink-0"></span>
                        <ExternalLinkComponent href="#">Request Access</ExternalLinkComponent>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary-blue rounded-full flex-shrink-0"></span>
                        <ExternalLinkComponent href="#">Documentation</ExternalLinkComponent>
                      </li>
                    </ul>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
