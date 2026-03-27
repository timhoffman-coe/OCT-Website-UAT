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
import type { Portfolio, TeamTab, AccordionItem, TrelloBoard, TeamMember } from '@/lib/data/its-shared';
import type { ServiceArea } from '@/components/SectionTemplate';

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

    default:
      return null;
  }
}

export default function WidgetRenderer({ widgetOrder, data }: WidgetRendererProps) {
  const mainWidgets = widgetOrder.filter((w) => !isSidebarWidget(w));
  const sidebarWidgets = widgetOrder.filter((w) => isSidebarWidget(w));

  // If there are sidebar widgets, render a 2-column layout
  if (sidebarWidgets.length > 0) {
    // Header widget renders full-width above the grid
    const headerWidgets = mainWidgets.filter((w) => w === 'subteam_header');
    const contentWidgets = mainWidgets.filter((w) => w !== 'subteam_header');

    return (
      <>
        {headerWidgets.map((widgetType, index) => renderWidget(widgetType, data, index))}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {contentWidgets.map((widgetType, index) =>
              renderWidget(widgetType, data, headerWidgets.length + index)
            )}
          </div>
          <aside className="space-y-6">
            {sidebarWidgets.map((widgetType, index) =>
              renderWidget(widgetType, data, mainWidgets.length + index)
            )}
          </aside>
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
