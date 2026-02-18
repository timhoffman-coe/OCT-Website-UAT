import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WidgetRenderer, { DEFAULT_ITS_TEAM_WIDGETS } from '@/components/widgets/WidgetRenderer';
import type { WidgetDataBag } from '@/components/widgets/WidgetRenderer';
import type { ITSTeamPageData } from '@/lib/data/its-shared';
import { sharedImportantLinks } from '@/lib/data/its-shared';

interface ITSTeamPageTemplateProps {
  data: ITSTeamPageData;
  widgetOrder?: string[];
}

export default function ITSTeamPageTemplate({ data, widgetOrder }: ITSTeamPageTemplateProps) {
  const order = widgetOrder || [...DEFAULT_ITS_TEAM_WIDGETS];

  const dataBag: WidgetDataBag = {
    teamName: data.teamName,
    teamShortName: data.teamShortName,
    portfolios: data.portfolios,
    teamTabs: data.teamTabs,
    accordionItems: data.accordionItems || sharedImportantLinks,
    trelloBoards: data.trelloBoards,
    teamMembers: data.teamMembers,
    widgetConfigs: data.widgetConfigs,
  };

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <main>
        <WidgetRenderer widgetOrder={order} data={dataBag} />
      </main>
      <Footer />
    </div>
  );
}
