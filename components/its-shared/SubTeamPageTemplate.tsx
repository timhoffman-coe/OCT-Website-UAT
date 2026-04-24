import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WidgetRenderer, { DEFAULT_SUB_TEAM_WIDGETS } from '@/components/widgets/WidgetRenderer';
import type { WidgetDataBag } from '@/components/widgets/WidgetRenderer';

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

interface SubTeamPageTemplateProps {
  dataBag: WidgetDataBag;
  widgetOrder?: string[];
}

export default function SubTeamPageTemplate({ dataBag, widgetOrder }: SubTeamPageTemplateProps) {
  const order = widgetOrder || [...DEFAULT_SUB_TEAM_WIDGETS];

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main id="main-content">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <WidgetRenderer widgetOrder={order} data={dataBag} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
