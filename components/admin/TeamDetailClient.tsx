'use client';

import LayoutEditor from './LayoutEditor';

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

interface TeamDetailClientProps {
  team: TeamWithRelations;
  widgetDefinitions: WidgetDefinitionData[];
}

export default function TeamDetailClient({ team, widgetDefinitions }: TeamDetailClientProps) {
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

      <LayoutEditor
        teamId={team.id}
        teamSlug={team.slug}
        teamName={team.teamName}
        teamShortName={team.teamShortName}
        instances={team.widgetInstances}
        definitions={widgetDefinitions}
        portfolios={team.portfolios}
        teamTabs={team.teamTabs}
        trelloBoards={team.trelloBoards}
        teamMembers={team.teamMembers}
        serviceAreas={team.serviceAreas}
        accordionGroups={team.accordionGroups}
      />
    </div>
  );
}
