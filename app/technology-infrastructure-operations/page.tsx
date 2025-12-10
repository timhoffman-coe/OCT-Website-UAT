'use client';

import ITSTeamPageTemplate from '@/components/its-shared/ITSTeamPageTemplate';
import { technologyInfrastructureOperationsData } from '@/lib/data/technology-infrastructure-operations';

export default function TechnologyInfrastructureOperationsPage() {
  return <ITSTeamPageTemplate data={technologyInfrastructureOperationsData} />;
}
