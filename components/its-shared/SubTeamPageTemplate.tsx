import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle } from 'lucide-react';
import SubTeamHeaderWidget from '@/components/widgets/SubTeamHeaderWidget';
import SubTeamServicesWidget from '@/components/widgets/SubTeamServicesWidget';
import SubTeamInitiativesWidget from '@/components/widgets/SubTeamInitiativesWidget';
import SubTeamContactsWidget from '@/components/widgets/SubTeamContactsWidget';
import SubTeamQuickLinksWidget from '@/components/widgets/SubTeamQuickLinksWidget';

export interface SubTeamPageData {
  teamName: string;
  description: string;
  iconName: string;
  showStatus: boolean;
  parentTeam: string;
  parentTeamHref: string;
  services: { title: string; items: string[] }[];
  initiatives: { title: string; description: string; href: string }[];
  contacts: { name: string; role: string; email: string }[];
  quickLinks: { label: string; description: string; href: string; isSecure: boolean }[];
}

const MAIN_WIDGETS = new Set(['subteam_services', 'subteam_initiatives']);
const SIDEBAR_WIDGETS = new Set(['subteam_contacts', 'subteam_quick_links']);

interface SubTeamPageTemplateProps {
  data: SubTeamPageData;
  widgetOrder?: string[];
}

export default function SubTeamPageTemplate({ data, widgetOrder }: SubTeamPageTemplateProps) {
  const order = widgetOrder || [
    'subteam_header',
    'subteam_services',
    'subteam_initiatives',
    'subteam_contacts',
    'subteam_quick_links',
  ];

  const headerWidgets = order.filter((w) => w === 'subteam_header');
  const mainWidgets = order.filter((w) => MAIN_WIDGETS.has(w));
  const sidebarWidgets = order.filter((w) => SIDEBAR_WIDGETS.has(w));

  function renderWidget(widgetType: string) {
    switch (widgetType) {
      case 'subteam_header':
        return (
          <SubTeamHeaderWidget
            key="subteam_header"
            teamName={data.teamName}
            description={data.description}
            iconName={data.iconName}
            parentTeam={data.parentTeam}
            parentTeamHref={data.parentTeamHref}
          />
        );
      case 'subteam_services':
        return <SubTeamServicesWidget key="subteam_services" services={data.services} />;
      case 'subteam_initiatives':
        return <SubTeamInitiativesWidget key="subteam_initiatives" initiatives={data.initiatives} />;
      case 'subteam_contacts':
        return <SubTeamContactsWidget key="subteam_contacts" contacts={data.contacts} />;
      case 'subteam_quick_links':
        return <SubTeamQuickLinksWidget key="subteam_quick_links" quickLinks={data.quickLinks} />;
      default:
        return null;
    }
  }

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main>
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Header (full-width) */}
          {headerWidgets.map(renderWidget)}

          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content (2/3) */}
            <div className="lg:col-span-2">
              {mainWidgets.map(renderWidget)}
            </div>

            {/* Sidebar (1/3) */}
            <aside className="space-y-6">
              {sidebarWidgets.map(renderWidget)}

              {/* System Status */}
              {data.showStatus && (
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
