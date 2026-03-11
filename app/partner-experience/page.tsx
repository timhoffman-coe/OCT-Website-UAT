import ITSTeamPageTemplate from '@/components/its-shared/ITSTeamPageTemplate';
import { fetchUnifiedTeamData } from '@/lib/data/fetch-team';
import { fetchWidgetOrder } from '@/lib/data/fetch-widgets';
import { partnerExperienceData } from '@/lib/data/partner-experience';
import type { WidgetDataBag } from '@/components/widgets/WidgetRenderer';

const fallbackDataBag: WidgetDataBag = {
  teamName: partnerExperienceData.teamName,
  teamShortName: partnerExperienceData.teamShortName,
  portfolios: partnerExperienceData.portfolios,
  teamTabs: partnerExperienceData.teamTabs,
  trelloBoards: partnerExperienceData.trelloBoards,
  teamMembers: partnerExperienceData.teamMembers,
  accordionItems: partnerExperienceData.accordionItems,
};

export default async function PartnerExperiencePage() {
  const [result, widgetOrder] = await Promise.all([
    fetchUnifiedTeamData('partner-experience'),
    fetchWidgetOrder('partner-experience'),
  ]);
  return (
    <ITSTeamPageTemplate
      dataBag={result?.dataBag || fallbackDataBag}
      widgetOrder={widgetOrder || undefined}
    />
  );
}
