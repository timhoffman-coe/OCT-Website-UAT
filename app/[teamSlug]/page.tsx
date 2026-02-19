import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { fetchSectionData } from '@/lib/data/fetch-team';
import { fetchITSTeamData } from '@/lib/data/fetch-team';
import { fetchWidgetOrder } from '@/lib/data/fetch-widgets';
import SectionTemplate from '@/components/SectionTemplate';
import ITSTeamPageTemplate from '@/components/its-shared/ITSTeamPageTemplate';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ teamSlug: string }>;
}): Promise<Metadata> {
  const { teamSlug } = await params;
  const team = await prisma.team.findUnique({
    where: { slug: teamSlug, isPublished: true },
    select: { teamName: true, pageDescription: true },
  });

  if (!team) return {};

  return {
    title: team.teamName,
    description: team.pageDescription || `Learn about ${team.teamName} at the City of Edmonton.`,
  };
}

export default async function DynamicTeamPage({
  params,
}: {
  params: Promise<{ teamSlug: string }>;
}) {
  const { teamSlug } = await params;

  const team = await prisma.team.findUnique({
    where: { slug: teamSlug, isPublished: true },
    select: { pageTemplate: true, teamName: true },
  });

  if (!team) notFound();

  if (team.pageTemplate === 'SECTION') {
    const [data, widgetOrder] = await Promise.all([
      fetchSectionData(teamSlug),
      fetchWidgetOrder(teamSlug),
    ]);
    return (
      <SectionTemplate
        pageTitle={data?.pageTitle || team.teamName}
        pageDescription={data?.pageDescription || ''}
        serviceAreas={data?.serviceAreas || []}
        widgetOrder={widgetOrder || undefined}
      />
    );
  } else {
    const [data, widgetOrder] = await Promise.all([
      fetchITSTeamData(teamSlug),
      fetchWidgetOrder(teamSlug),
    ]);
    if (!data) notFound();
    return (
      <ITSTeamPageTemplate
        data={data}
        widgetOrder={widgetOrder || undefined}
      />
    );
  }
}
