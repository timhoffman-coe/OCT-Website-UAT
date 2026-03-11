import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { fetchUnifiedTeamData } from '@/lib/data/fetch-team';
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
    where: { slug: teamSlug, isPublished: true, archivedAt: null },
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

  const [result, widgetOrder] = await Promise.all([
    fetchUnifiedTeamData(teamSlug),
    fetchWidgetOrder(teamSlug),
  ]);

  if (!result) notFound();

  const { dataBag, pageTitle, pageDescription, pageTemplate } = result;

  if (pageTemplate === 'SECTION') {
    return (
      <SectionTemplate
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        dataBag={dataBag}
        widgetOrder={widgetOrder || undefined}
      />
    );
  } else {
    return (
      <ITSTeamPageTemplate
        dataBag={dataBag}
        widgetOrder={widgetOrder || undefined}
      />
    );
  }
}
