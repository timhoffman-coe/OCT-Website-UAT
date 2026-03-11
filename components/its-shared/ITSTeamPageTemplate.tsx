import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WidgetRenderer, { DEFAULT_ITS_TEAM_WIDGETS } from '@/components/widgets/WidgetRenderer';
import type { WidgetDataBag } from '@/components/widgets/WidgetRenderer';

interface ITSTeamPageTemplateProps {
  dataBag: WidgetDataBag;
  widgetOrder?: string[];
}

export default function ITSTeamPageTemplate({ dataBag, widgetOrder }: ITSTeamPageTemplateProps) {
  const order = widgetOrder || [...DEFAULT_ITS_TEAM_WIDGETS];

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
