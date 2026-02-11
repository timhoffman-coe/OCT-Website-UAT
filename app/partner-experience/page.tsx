import ITSTeamPageTemplate from '@/components/its-shared/ITSTeamPageTemplate';
import { fetchITSTeamData } from '@/lib/data/fetch-team';
import { partnerExperienceData } from '@/lib/data/partner-experience';

export default async function PartnerExperiencePage() {
  const data = (await fetchITSTeamData('partner-experience')) || partnerExperienceData;
  return <ITSTeamPageTemplate data={data} />;
}
