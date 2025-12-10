'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PortfolioCard from '@/components/its-shared/PortfolioCard';
import TeamTabs from '@/components/its-shared/TeamTabs';
import AccordionSection from '@/components/its-shared/AccordionSection';
import WorkTrackingCard from '@/components/its-shared/WorkTrackingCard';
import OrgCard from '@/components/its-shared/OrgCard';
import { ITSTeamPageData, sharedImportantLinks } from '@/lib/data/its-shared';

interface ITSTeamPageTemplateProps {
  data: ITSTeamPageData;
}

export default function ITSTeamPageTemplate({ data }: ITSTeamPageTemplateProps) {
  const { teamName, teamShortName, portfolios, teamTabs, trelloBoards, teamMembers } = data;

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main>
        {/* Page Header */}
        <section className="bg-white border-b-[3px] border-primary-blue py-6 px-[5%]">
          <div className="container mx-auto max-w-7xl flex flex-wrap justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="font-sans text-3xl md:text-4xl font-bold text-primary-blue">
                  {teamName}
                </h1>
                <p className="font-sans text-sm text-gray-600 mt-1">
                  Integrated Technology Services (ITS) &middot; Open City & Technology (OCT)
                </p>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <a
                href="#"
                className="inline-block bg-primary-blue text-white font-sans font-semibold px-6 py-3 rounded hover:bg-dark-blue transition-colors duration-300 mb-2"
              >
                Submit a Support Request
              </a>
              <p className="font-sans text-xs text-gray-600">
                For urgent incidents, call 780-123-4567
              </p>
            </div>
          </div>
        </section>

        {/* Our Portfolios */}
        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="font-sans text-2xl md:text-3xl font-bold text-primary-blue mb-6 pb-2 border-b-2 border-[#F4F2F1]">
            Our Portfolios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((portfolio, index) => (
              <PortfolioCard key={index} {...portfolio} />
            ))}
          </div>
        </section>

        {/* Team Overviews */}
        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="font-sans text-2xl md:text-3xl font-bold text-primary-blue mb-6 pb-2 border-b-2 border-[#F4F2F1]">
            Team Overviews
          </h2>
          <TeamTabs tabs={teamTabs} />
        </section>

        {/* Important Links */}
        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="font-sans text-2xl md:text-3xl font-bold text-primary-blue mb-6 pb-2 border-b-2 border-[#F4F2F1]">
            Important Links
          </h2>
          <AccordionSection items={sharedImportantLinks} />
        </section>

        {/* Work Tracking Boards */}
        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="font-sans text-2xl md:text-3xl font-bold text-primary-blue mb-6 pb-2 border-b-2 border-[#F4F2F1]">
            Work Tracking Boards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trelloBoards.map((board, index) => (
              <WorkTrackingCard key={index} {...board} />
            ))}
          </div>
        </section>

        {/* Ongoing Projects Hero Block */}
        <section>
          <div className="bg-primary-blue text-white text-center py-3 font-sans font-bold text-lg tracking-wide">
            ONGOING PROJECTS
          </div>
          <div className="bg-[#F4F2F1] py-10 px-[5%]">
            <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="order-2 md:order-1">
                <h3 className="font-sans text-2xl md:text-3xl font-bold text-primary-blue mb-4">
                  Projects
                </h3>
                <p className="font-sans text-gray-600 mb-6">
                  See the list of all current Projects for the {teamName} Team. This list is
                  only projects run through the PMO. For other work requests, see either Remedy or
                  Trello.
                </p>
                <a
                  href="#"
                  className="inline-block bg-primary-blue text-white font-sans font-semibold px-6 py-3 rounded hover:bg-dark-blue transition-colors duration-300"
                >
                  View Project List
                </a>
              </div>
              <div className="order-1 md:order-2">
                <div className="bg-primary-blue rounded-lg flex items-center justify-center h-64 md:h-80">
                  <span className="text-[#D3ECEF] font-sans text-lg">
                    {teamShortName} Projects
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Budget & Spend */}
        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-[#DDE3E6] rounded-lg p-10 text-center">
            <h3 className="font-sans text-2xl font-semibold text-gray-900 mb-4">
              Budget & Spend
            </h3>
            <p className="font-sans text-gray-600 max-w-xl mx-auto mb-6">
              View current-year approved budget, YTD spend, and financial forecasts for {teamName} portfolios.
            </p>
            <a
              href="#"
              className="inline-block bg-[#DDE3E6] border-2 border-[#DDE3E6] text-gray-900 font-sans font-semibold px-6 py-3 rounded hover:bg-[#c8d0d3] transition-colors duration-300"
            >
              Open Budget Report
            </a>
          </div>
        </section>

        {/* Who We Are */}
        <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <h2 className="font-sans text-2xl md:text-3xl font-bold text-primary-blue mb-6 pb-2 border-b-2 border-[#F4F2F1]">
            Who We Are
          </h2>
          <p className="font-sans text-gray-600 max-w-2xl mb-8">
            Our team is organized by portfolio. For general inquiries, please use the support
            request button. For portfolio-specific questions or escalations, you can contact the
            leads below.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <OrgCard key={index} {...member} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
