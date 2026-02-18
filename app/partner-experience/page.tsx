import ITSTeamPageTemplate from '@/components/its-shared/ITSTeamPageTemplate';
import { fetchITSTeamData } from '@/lib/data/fetch-team';
import { fetchWidgetOrder } from '@/lib/data/fetch-widgets';
import { partnerExperienceData } from '@/lib/data/partner-experience';

export default async function PartnerExperiencePage() {
  const [data, widgetOrder] = await Promise.all([
    fetchITSTeamData('partner-experience'),
    fetchWidgetOrder('partner-experience'),
  ]);
  return (
    <ITSTeamPageTemplate
      data={data || partnerExperienceData}
      widgetOrder={widgetOrder || undefined}
    />
  );
}
