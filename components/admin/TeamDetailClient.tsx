'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Archive, RotateCcw } from 'lucide-react';
import { restoreTeam } from '@/lib/actions/team-actions';
import LayoutEditor from './LayoutEditor';
import SubTeamsEditor from './SubTeamsEditor';
import TeamHistory from './TeamHistory';
import TeamServicesEditor from './TeamServicesEditor';
import TeamInitiativesEditor from './TeamInitiativesEditor';
import TeamContactsEditor from './TeamContactsEditor';
import TeamQuickLinksEditor from './TeamQuickLinksEditor';

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
  archivedAt: Date | null;
  iconName: string | null;
  portfolios: Array<{
    id: string;
    iconName: string;
    title: string;
    description: string;
    href: string;
    sortOrder: number;
    linkedTeamId: string | null;
    linkedTeam: { id: string; teamName: string; isPublished: boolean } | null;
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
  teamServices: Array<{
    id: string;
    title: string;
    items: string[];
    sortOrder: number;
  }>;
  teamInitiatives: Array<{
    id: string;
    title: string;
    description: string;
    href: string;
    sortOrder: number;
  }>;
  teamContacts: Array<{
    id: string;
    name: string;
    role: string;
    email: string;
    sortOrder: number;
  }>;
  teamQuickLinks: Array<{
    id: string;
    label: string;
    description: string;
    href: string;
    isSecure: boolean;
    sortOrder: number;
  }>;
  children: Array<{
    id: string;
    slug: string;
    teamName: string;
    teamShortName: string;
    isPublished: boolean;
    sortOrder: number;
  }>;
  parent: { id: string; teamName: string; slug: string } | null;
};

interface TeamDetailClientProps {
  team: TeamWithRelations;
  widgetDefinitions: WidgetDefinitionData[];
}

const SECTION_WIDGET_TYPES = ['service_areas'];
const SUB_TEAM_WIDGET_TYPES = ['subteam_header', 'subteam_services', 'subteam_initiatives', 'subteam_contacts', 'subteam_quick_links'];

function getTemplateLabel(template: string): string {
  switch (template) {
    case 'ITS_TEAM': return 'ITS Team Page';
    case 'SECTION': return 'Section Page';
    case 'SUB_TEAM': return 'Sub-Team Page';
    default: return 'Custom Page';
  }
}

export default function TeamDetailClient({ team, widgetDefinitions }: TeamDetailClientProps) {
  const router = useRouter();
  const [isRestoring, startRestoreTransition] = useTransition();

  const filteredDefinitions = (() => {
    switch (team.pageTemplate) {
      case 'SECTION':
        return widgetDefinitions.filter((d) => SECTION_WIDGET_TYPES.includes(d.widgetType));
      case 'SUB_TEAM':
        return widgetDefinitions.filter((d) => SUB_TEAM_WIDGET_TYPES.includes(d.widgetType));
      default:
        return widgetDefinitions.filter(
          (d) => !SECTION_WIDGET_TYPES.includes(d.widgetType) && !SUB_TEAM_WIDGET_TYPES.includes(d.widgetType)
        );
    }
  })();

  return (
    <div className="p-8">
      {/* Back to parent breadcrumb */}
      {team.parent && (
        <Link
          href={`/admin/teams/${team.parent.id}`}
          className="inline-flex items-center gap-1.5 font-sans text-sm text-gray-500 hover:text-primary-blue mb-4 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to {team.parent.teamName}
        </Link>
      )}

      {/* Archived Banner */}
      {team.archivedAt && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Archive className="w-5 h-5 text-red-600" />
            <div>
              <p className="font-sans text-sm font-semibold text-red-800">This team is archived</p>
              <p className="font-sans text-xs text-red-600">
                Archived on {new Date(team.archivedAt).toLocaleDateString()}. Not visible on the public site or admin sidebar.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              startRestoreTransition(async () => {
                await restoreTeam(team.id);
                router.refresh();
              });
            }}
            disabled={isRestoring}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-sans font-medium text-white bg-red-600 rounded hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {isRestoring ? 'Restoring...' : 'Restore'}
          </button>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="font-sans text-3xl font-bold text-primary-blue">
            {team.teamName}
          </h1>
          {team.archivedAt ? (
            <span className="text-xs font-sans px-2 py-0.5 rounded bg-red-100 text-red-800">
              Archived
            </span>
          ) : (
            <span
              className={`text-xs font-sans px-2 py-0.5 rounded ${
                team.isPublished
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {team.isPublished ? 'Published' : 'Draft'}
            </span>
          )}
        </div>
        <p className="font-sans text-sm text-gray-500">
          /{team.slug} &middot; {getTemplateLabel(team.pageTemplate)}
        </p>
      </div>

      <LayoutEditor
        teamId={team.id}
        teamSlug={team.slug}
        teamName={team.teamName}
        teamShortName={team.teamShortName}
        isPublished={team.isPublished}
        instances={team.widgetInstances}
        definitions={filteredDefinitions}
        portfolios={team.portfolios}
        teamTabs={team.teamTabs}
        trelloBoards={team.trelloBoards}
        teamMembers={team.teamMembers}
        serviceAreas={team.serviceAreas}
        accordionGroups={team.accordionGroups}
        teamDescription={team.pageDescription}
        teamIconName={team.iconName}
        parentTeamName={team.parent?.teamName ?? null}
        parentTeamSlug={team.parent?.slug ?? null}
        teamServices={team.teamServices}
        teamInitiatives={team.teamInitiatives}
        teamContacts={team.teamContacts}
        teamQuickLinks={team.teamQuickLinks}
        hasChildren={team.children.length > 0}
        isArchived={!!team.archivedAt}
      />

      {/* Sub-Teams section for SECTION pages */}
      {team.pageTemplate === 'SECTION' && (
        <SubTeamsEditor parentId={team.id} children={team.children} />
      )}

      {/* Sub-Team content editors */}
      {team.pageTemplate === 'SUB_TEAM' && (
        <div className="mt-8 space-y-8">
          <div className="border-t border-gray-200 pt-8">
            <h2 className="font-sans text-xl font-bold text-gray-900 mb-6">Sub-Team Content</h2>
            <div className="space-y-8">
              <TeamServicesEditor teamId={team.id} services={team.teamServices} />
              <TeamInitiativesEditor teamId={team.id} initiatives={team.teamInitiatives} />
              <TeamContactsEditor teamId={team.id} contacts={team.teamContacts} />
              <TeamQuickLinksEditor teamId={team.id} quickLinks={team.teamQuickLinks} />
            </div>
          </div>
        </div>
      )}

      {/* Change History */}
      <TeamHistory teamId={team.id} />
    </div>
  );
}
