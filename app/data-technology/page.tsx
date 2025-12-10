'use client';

import ITSTeamPageTemplate from '@/components/its-shared/ITSTeamPageTemplate';
import { dataTechnologyData } from '@/lib/data/data-technology';

export default function DataTechnologyPage() {
  return <ITSTeamPageTemplate data={dataTechnologyData} />;
}
