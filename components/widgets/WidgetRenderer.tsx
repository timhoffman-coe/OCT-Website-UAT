import { isSidebarWidget } from '@/lib/widget-template-map';
import PageHeaderWidget from './PageHeaderWidget';
import PortfoliosWidget from './PortfoliosWidget';
import TeamTabsWidget from './TeamTabsWidget';
import AccordionLinksWidget from './AccordionLinksWidget';
import WorkTrackingWidget from './WorkTrackingWidget';
import OngoingProjectsWidget from './OngoingProjectsWidget';
import BudgetSpendWidget from './BudgetSpendWidget';
import TeamMembersWidget from './TeamMembersWidget';
import ServiceAreasWidget from './ServiceAreasWidget';
import WhoWeAreWidget from './WhoWeAreWidget';
import KeyInitiativesWidget from './KeyInitiativesWidget';
import SubTeamHeaderWidget from './SubTeamHeaderWidget';
import SubTeamServicesWidget from './SubTeamServicesWidget';
import SubTeamInitiativesWidget from './SubTeamInitiativesWidget';
import SubTeamContactsWidget from './SubTeamContactsWidget';
import SubTeamQuickLinksWidget from './SubTeamQuickLinksWidget';
// Project widgets
import ProjectHeader from '@/components/projects/ProjectHeader';
import ProjectGovernance from '@/components/projects/ProjectGovernance';
import ProjectObjectives from '@/components/projects/ProjectObjectives';
import ProjectFinancial from '@/components/projects/ProjectFinancial';
import ProjectTimeline from '@/components/projects/ProjectTimeline';
import ProjectStatusUpdateSection from '@/components/projects/ProjectStatusUpdate';
import type { Portfolio, TeamTab, AccordionItem, TrelloBoard, TeamMember } from '@/lib/data/its-shared';
import type { ServiceArea } from '@/components/SectionTemplate';
import type { ProjectStatus } from '@prisma/client';

export const DEFAULT_ITS_TEAM_WIDGETS = [
  'page_header',
  'portfolios',
  'team_tabs',
  'accordion_links',
  'work_tracking',
  'ongoing_projects',
  'budget_spend',
  'team_members',
] as const;

export const DEFAULT_SECTION_WIDGETS = [
  'service_areas',
] as const;

export const DEFAULT_SUB_TEAM_WIDGETS = [
  'subteam_header',
  'subteam_services',
  'subteam_initiatives',
  'subteam_contacts',
  'subteam_quick_links',
] as const;

export const DEFAULT_PROJECT_WIDGETS = [
  'project_header',
  'project_governance',
  'project_objectives',
  'project_financial',
  'project_timeline',
  'project_status_updates',
] as const;

export interface OngoingProjectSummary {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  status: string;
  progress: number;
  tags: { tag: { name: string; slug: string } }[];
}

export interface WidgetDataBag {
  teamName?: string;
  teamShortName?: string;
  portfolios?: Portfolio[];
  teamTabs?: TeamTab[];
  accordionItems?: AccordionItem[];
  trelloBoards?: TrelloBoard[];
  teamMembers?: TeamMember[];
  pageTitle?: string;
  pageDescription?: string;
  serviceAreas?: ServiceArea[];
  whoWeAreItems?: { title: string; description: string; linkText: string; linkUrl: string }[];
  keyInitiativeSlides?: { title: string; description: string; imageUrl?: string; imageAlt: string }[];
  widgetConfigs?: Record<string, Record<string, string>>;
  // Sub-team fields
  parentTeam?: string;
  parentTeamHref?: string;
  iconName?: string;
  showStatus?: boolean;
  services?: { title: string; items: string[] }[];
  initiatives?: { title: string; description: string; href: string }[];
  contacts?: { name: string; role: string; email: string }[];
  quickLinks?: { label: string; description: string; href: string; isSecure: boolean }[];
  ongoingProjects?: OngoingProjectSummary[];
  // Project fields
  projectTitle?: string;
  projectDescription?: string | null;
  projectStatus?: ProjectStatus;
  projectCode?: string | null;
  projectId?: string;
  canEditProject?: boolean;
  department?: string | null;
  branch?: string | null;
  projectSponsor?: string | null;
  projectManager?: string | null;
  octProgramManager?: string | null;
  octltRepresentative?: string | null;
  programManagerBusiness?: string | null;
  totalBudget?: string | null;
  fundingSources?: string | null;
  expenditureAuthority?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  progress?: number;
  milestones?: { id: string; name: string; date: Date | null; status: string }[];
  objectives?: { id: string; iconName: string | null; title: string; description: string }[];
  statusUpdates?: { id: string; content: string; createdAt: Date }[];
}

interface WidgetRendererProps {
  widgetOrder: string[];
  data: WidgetDataBag;
}

function renderWidget(widgetType: string, data: WidgetDataBag, index: number) {
  switch (widgetType) {
    case 'page_header':
      return data.teamName ? (
        <PageHeaderWidget key={index} teamName={data.teamName} config={data.widgetConfigs?.page_header} />
      ) : null;

    case 'portfolios':
      return data.portfolios?.length ? (
        <PortfoliosWidget key={index} portfolios={data.portfolios} />
      ) : null;

    case 'team_tabs':
      return data.teamTabs?.length ? (
        <TeamTabsWidget key={index} teamTabs={data.teamTabs} />
      ) : null;

    case 'accordion_links':
      return data.accordionItems?.length ? (
        <AccordionLinksWidget key={index} items={data.accordionItems} />
      ) : null;

    case 'work_tracking':
      return data.trelloBoards?.length ? (
        <WorkTrackingWidget key={index} trelloBoards={data.trelloBoards} />
      ) : null;

    case 'ongoing_projects':
      return data.teamName ? (
        <OngoingProjectsWidget
          key={index}
          teamName={data.teamName}
          teamShortName={data.teamShortName || data.teamName}
          config={data.widgetConfigs?.ongoing_projects}
          projects={data.ongoingProjects}
        />
      ) : null;

    case 'budget_spend':
      return data.teamName ? (
        <BudgetSpendWidget key={index} teamName={data.teamName} config={data.widgetConfigs?.budget_spend} />
      ) : null;

    case 'team_members':
      return data.teamMembers?.length ? (
        <TeamMembersWidget key={index} teamMembers={data.teamMembers} />
      ) : null;

    case 'service_areas':
      return data.serviceAreas?.length ? (
        <ServiceAreasWidget key={index} serviceAreas={data.serviceAreas} />
      ) : null;

    case 'who_we_are':
      return data.whoWeAreItems?.length ? (
        <WhoWeAreWidget key={index} items={data.whoWeAreItems} />
      ) : null;

    case 'key_initiatives':
      return data.keyInitiativeSlides?.length ? (
        <KeyInitiativesWidget key={index} slides={data.keyInitiativeSlides} />
      ) : null;

    case 'subteam_header':
      return data.teamName && data.iconName && data.parentTeam && data.parentTeamHref ? (
        <SubTeamHeaderWidget
          key={index}
          teamName={data.teamName}
          description={data.pageDescription || ''}
          iconName={data.iconName}
          parentTeam={data.parentTeam}
          parentTeamHref={data.parentTeamHref}
        />
      ) : null;

    case 'subteam_services':
      return data.services?.length ? (
        <SubTeamServicesWidget key={index} services={data.services} />
      ) : null;

    case 'subteam_initiatives':
      return data.initiatives?.length ? (
        <SubTeamInitiativesWidget key={index} initiatives={data.initiatives} />
      ) : null;

    case 'subteam_contacts':
      return data.contacts?.length ? (
        <SubTeamContactsWidget key={index} contacts={data.contacts} />
      ) : null;

    case 'subteam_quick_links':
      return data.quickLinks?.length ? (
        <SubTeamQuickLinksWidget key={index} quickLinks={data.quickLinks} />
      ) : null;

    // ── Project Widgets ──────────────────────────────────
    case 'project_header':
      return data.projectTitle ? (
        <ProjectHeader
          key={index}
          title={data.projectTitle}
          description={data.projectDescription}
          status={data.projectStatus || 'PLANNING'}
          projectCode={data.projectCode}
          canEdit={data.canEditProject}
          projectId={data.projectId}
        />
      ) : null;

    case 'project_governance':
      return (
        <ProjectGovernance
          key={index}
          department={data.department}
          branch={data.branch}
          projectSponsor={data.projectSponsor}
          projectManager={data.projectManager}
          octProgramManager={data.octProgramManager}
          octltRepresentative={data.octltRepresentative}
          programManagerBusiness={data.programManagerBusiness}
        />
      );

    case 'project_objectives':
      return data.objectives?.length ? (
        <ProjectObjectives key={index} objectives={data.objectives} />
      ) : null;

    case 'project_financial':
      return (
        <ProjectFinancial
          key={index}
          totalBudget={data.totalBudget}
          fundingSources={data.fundingSources}
          expenditureAuthority={data.expenditureAuthority}
        />
      );

    case 'project_timeline':
      return (
        <ProjectTimeline
          key={index}
          startDate={data.startDate ?? null}
          endDate={data.endDate ?? null}
          progress={data.progress ?? 0}
          milestones={data.milestones || []}
        />
      );

    case 'project_status_updates':
      return data.statusUpdates?.length ? (
        <ProjectStatusUpdateSection key={index} updates={data.statusUpdates} />
      ) : null;

    default:
      return null;
  }
}

export default function WidgetRenderer({ widgetOrder, data }: WidgetRendererProps) {
  const mainWidgets = widgetOrder.filter((w) => !isSidebarWidget(w));
  const sidebarWidgets = widgetOrder.filter((w) => isSidebarWidget(w));

  // If there are sidebar widgets, render a 2-column layout
  if (sidebarWidgets.length > 0) {
    // Header widgets render full-width above the grid
    const headerWidgets = mainWidgets.filter((w) => w === 'subteam_header' || w === 'project_header');
    const contentWidgets = mainWidgets.filter((w) => w !== 'subteam_header' && w !== 'project_header');

    // Use 8/4 split for project pages, 2/1 for sub-team pages
    const isProjectLayout = widgetOrder.some(w => w.startsWith('project_'));
    const gridClass = isProjectLayout
      ? 'grid grid-cols-1 lg:grid-cols-12 gap-8'
      : 'grid grid-cols-1 lg:grid-cols-3 gap-8';
    const mainClass = isProjectLayout ? 'lg:col-span-8 space-y-8' : 'lg:col-span-2';
    const sideClass = isProjectLayout ? 'lg:col-span-4 space-y-8' : 'space-y-6';

    return (
      <>
        {headerWidgets.map((widgetType, index) => renderWidget(widgetType, data, index))}
        <div className={isProjectLayout ? 'max-w-6xl mx-auto px-8 -mt-8 pb-20' : ''}>
          <div className={gridClass}>
            <div className={mainClass}>
              {contentWidgets.map((widgetType, index) =>
                renderWidget(widgetType, data, headerWidgets.length + index)
              )}
            </div>
            <aside className={sideClass}>
              {sidebarWidgets.map((widgetType, index) =>
                renderWidget(widgetType, data, mainWidgets.length + index)
              )}
            </aside>
          </div>
        </div>
      </>
    );
  }

  // No sidebar widgets — render sequentially as before
  return (
    <>
      {widgetOrder.map((widgetType, index) => renderWidget(widgetType, data, index))}
    </>
  );
}
