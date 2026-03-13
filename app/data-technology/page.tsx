import ITSTeamPageTemplate from '@/components/its-shared/ITSTeamPageTemplate';
import { fetchUnifiedTeamData } from '@/lib/data/fetch-team';
import { fetchWidgetOrder } from '@/lib/data/fetch-widgets';
import { dataTechnologyData } from '@/lib/data/data-technology';
import type { WidgetDataBag } from '@/components/widgets/WidgetRenderer';

export const revalidate = 3600; // ISR: cache for 1 hour, on-demand invalidation via revalidatePath in server actions

const fallbackDataBag: WidgetDataBag = {
  teamName: dataTechnologyData.teamName,
  teamShortName: dataTechnologyData.teamShortName,
  portfolios: dataTechnologyData.portfolios,
  teamTabs: dataTechnologyData.teamTabs,
  trelloBoards: dataTechnologyData.trelloBoards,
  teamMembers: dataTechnologyData.teamMembers,
  accordionItems: dataTechnologyData.accordionItems,
};

export default async function DataTechnologyPage() {
  const [result, widgetOrder] = await Promise.all([
    fetchUnifiedTeamData('data-technology'),
    fetchWidgetOrder('data-technology'),
  ]);
  return (
    <ITSTeamPageTemplate
      dataBag={result?.dataBag || fallbackDataBag}
      widgetOrder={widgetOrder || undefined}
    />
  );
}
