'use client';

import ITSTeamPageTemplate from '@/components/its-shared/ITSTeamPageTemplate';
import { partnerExperienceData } from '@/lib/data/partner-experience';

export default function PartnerExperiencePage() {
  return <ITSTeamPageTemplate data={partnerExperienceData} />;
}
