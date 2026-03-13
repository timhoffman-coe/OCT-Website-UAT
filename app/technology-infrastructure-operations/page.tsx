import ITSTeamPageTemplate from '@/components/its-shared/ITSTeamPageTemplate';
import { fetchUnifiedTeamData } from '@/lib/data/fetch-team';
import { fetchWidgetOrder } from '@/lib/data/fetch-widgets';
import { technologyInfrastructureOperationsData } from '@/lib/data/technology-infrastructure-operations';
import type { WidgetDataBag } from '@/components/widgets/WidgetRenderer';

export const revalidate = 3600; // ISR: cache for 1 hour, on-demand invalidation via revalidatePath in server actions

const fallbackDataBag: WidgetDataBag = {
  teamName: technologyInfrastructureOperationsData.teamName,
  teamShortName: technologyInfrastructureOperationsData.teamShortName,
  portfolios: technologyInfrastructureOperationsData.portfolios,
  teamTabs: technologyInfrastructureOperationsData.teamTabs,
  trelloBoards: technologyInfrastructureOperationsData.trelloBoards,
  teamMembers: technologyInfrastructureOperationsData.teamMembers,
  accordionItems: technologyInfrastructureOperationsData.accordionItems,
};

export default async function TechnologyInfrastructureOperationsPage() {
  const [result, widgetOrder] = await Promise.all([
    fetchUnifiedTeamData('technology-infrastructure-operations'),
    fetchWidgetOrder('technology-infrastructure-operations'),
  ]);
  return (
    <ITSTeamPageTemplate
      dataBag={result?.dataBag || fallbackDataBag}
      widgetOrder={widgetOrder || undefined}
    />
  );
}
