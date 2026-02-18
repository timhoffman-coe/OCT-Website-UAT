import ITSTeamPageTemplate from '@/components/its-shared/ITSTeamPageTemplate';
import { fetchITSTeamData } from '@/lib/data/fetch-team';
import { fetchWidgetOrder } from '@/lib/data/fetch-widgets';
import { technologyInfrastructureOperationsData } from '@/lib/data/technology-infrastructure-operations';

export default async function TechnologyInfrastructureOperationsPage() {
  const [data, widgetOrder] = await Promise.all([
    fetchITSTeamData('technology-infrastructure-operations'),
    fetchWidgetOrder('technology-infrastructure-operations'),
  ]);
  return (
    <ITSTeamPageTemplate
      data={data || technologyInfrastructureOperationsData}
      widgetOrder={widgetOrder || undefined}
    />
  );
}
