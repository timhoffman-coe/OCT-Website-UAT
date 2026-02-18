import ITSTeamPageTemplate from '@/components/its-shared/ITSTeamPageTemplate';
import { fetchITSTeamData } from '@/lib/data/fetch-team';
import { fetchWidgetOrder } from '@/lib/data/fetch-widgets';
import { dataTechnologyData } from '@/lib/data/data-technology';

export default async function DataTechnologyPage() {
  const [data, widgetOrder] = await Promise.all([
    fetchITSTeamData('data-technology'),
    fetchWidgetOrder('data-technology'),
  ]);
  return (
    <ITSTeamPageTemplate
      data={data || dataTechnologyData}
      widgetOrder={widgetOrder || undefined}
    />
  );
}
