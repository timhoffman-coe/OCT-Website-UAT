import ITSTeamPageTemplate from '@/components/its-shared/ITSTeamPageTemplate';
import { fetchITSTeamData } from '@/lib/data/fetch-team';
import { technologyInfrastructureOperationsData } from '@/lib/data/technology-infrastructure-operations';

export default async function TechnologyInfrastructureOperationsPage() {
  const data =
    (await fetchITSTeamData('technology-infrastructure-operations')) ||
    technologyInfrastructureOperationsData;
  return <ITSTeamPageTemplate data={data} />;
}
