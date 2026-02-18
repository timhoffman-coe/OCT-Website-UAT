'use client';

import { useState } from 'react';
import PortfolioEditor from './PortfolioEditor';
import TeamMemberEditor from './TeamMemberEditor';
import TrelloBoardEditor from './TrelloBoardEditor';
import ServiceAreaEditor from './ServiceAreaEditor';
import TeamTabEditor from './TeamTabEditor';
import LayoutEditor from './LayoutEditor';
import AccordionLinksEditor from './AccordionLinksEditor';

type WidgetInstanceData = {
  id: string;
  sortOrder: number;
  config: unknown;
  widgetDefinition: {
    id: string;
    widgetType: string;
    label: string;
    icon: string;
  };
};

type WidgetDefinitionData = {
  id: string;
  widgetType: string;
  label: string;
  description: string | null;
  icon: string;
};

type TeamWithRelations = {
  id: string;
  slug: string;
  teamName: string;
  teamShortName: string;
  pageTemplate: string;
  pageTitle: string | null;
  pageDescription: string | null;
  isPublished: boolean;
  portfolios: Array<{
    id: string;
    iconName: string;
    title: string;
    description: string;
    href: string;
    sortOrder: number;
    subpage: { id: string } | null;
  }>;
  teamTabs: Array<{
    id: string;
    tabId: string;
    label: string;
    videoTitle: string;
    videoDescription: string;
    videoUrl: string;
    diagramsTitle: string;
    diagramsDescription: string;
    sortOrder: number;
    diagramLinks: Array<{ id: string; label: string; href: string; sortOrder: number }>;
  }>;
  trelloBoards: Array<{
    id: string;
    title: string;
    description: string;
    href: string;
    sortOrder: number;
  }>;
  teamMembers: Array<{
    id: string;
    name: string;
    title: string;
    email: string;
    sortOrder: number;
  }>;
  serviceAreas: Array<{
    id: string;
    serviceAreaId: string;
    title: string;
    shortDescription: string;
    fullDescription: string;
    features: string[];
    icon: string | null;
    link: string | null;
    sortOrder: number;
  }>;
  accordionGroups: Array<{
    id: string;
    groupId: string;
    title: string;
    sortOrder: number;
    links: Array<{ id: string; label: string; href: string; sortOrder: number }>;
  }>;
  widgetInstances: WidgetInstanceData[];
};

const ITS_TABS = ['Layout', 'Portfolios', 'Team Overviews', 'Boards', 'Links', 'Members'] as const;
const SECTION_TABS = ['Layout', 'Service Areas'] as const;

interface TeamDetailClientProps {
  team: TeamWithRelations;
  widgetDefinitions: WidgetDefinitionData[];
}

export default function TeamDetailClient({ team, widgetDefinitions }: TeamDetailClientProps) {
  const tabs = team.pageTemplate === 'ITS_TEAM' ? ITS_TABS : SECTION_TABS;
  const [activeTab, setActiveTab] = useState<string>(tabs[0]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="font-sans text-3xl font-bold text-primary-blue">
            {team.teamName}
          </h1>
          <span
            className={`text-xs font-sans px-2 py-0.5 rounded ${
              team.isPublished
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {team.isPublished ? 'Published' : 'Draft'}
          </span>
        </div>
        <p className="font-sans text-sm text-gray-500">
          /{team.slug} &middot;{' '}
          {team.pageTemplate === 'ITS_TEAM' ? 'ITS Team Page' : 'Section Page'}
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-sans text-sm pb-3 border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-primary-blue text-primary-blue font-semibold'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'Layout' && (
        <LayoutEditor
          teamId={team.id}
          teamSlug={team.slug}
          instances={team.widgetInstances}
          definitions={widgetDefinitions}
        />
      )}
      {activeTab === 'Portfolios' && (
        <PortfolioEditor teamId={team.id} portfolios={team.portfolios} />
      )}
      {activeTab === 'Team Overviews' && (
        <TeamTabEditor teamId={team.id} tabs={team.teamTabs} />
      )}
      {activeTab === 'Boards' && (
        <TrelloBoardEditor teamId={team.id} boards={team.trelloBoards} />
      )}
      {activeTab === 'Links' && (
        <AccordionLinksEditor teamId={team.id} groups={team.accordionGroups} />
      )}
      {activeTab === 'Members' && (
        <TeamMemberEditor teamId={team.id} members={team.teamMembers} />
      )}
      {activeTab === 'Service Areas' && (
        <ServiceAreaEditor teamId={team.id} areas={team.serviceAreas} />
      )}
    </div>
  );
}
