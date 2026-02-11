import ITSTeamPageTemplate from '@/components/its-shared/ITSTeamPageTemplate';
import { fetchITSTeamData } from '@/lib/data/fetch-team';
import { dataTechnologyData } from '@/lib/data/data-technology';

export default async function DataTechnologyPage() {
  const data = (await fetchITSTeamData('data-technology')) || dataTechnologyData;
  return <ITSTeamPageTemplate data={data} />;
}
