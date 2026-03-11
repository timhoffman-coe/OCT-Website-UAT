import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { fetchUnifiedTeamData } from '@/lib/data/fetch-team';
import { fetchWidgetOrder } from '@/lib/data/fetch-widgets';
import SubTeamPageTemplate from '@/components/its-shared/SubTeamPageTemplate';

export const dynamic = 'force-dynamic';

export default async function SubTeamPage({
  params,
}: {
  params: Promise<{ teamSlug: string; subTeamSlug: string }>;
}) {
  const { teamSlug, subTeamSlug } = await params;

  // Verify the sub-team exists and its parent matches the URL
  const subTeam = await prisma.team.findUnique({
    where: { slug: subTeamSlug, isPublished: true, archivedAt: null },
    select: {
      id: true,
      pageTemplate: true,
      parent: { select: { slug: true } },
    },
  });

  if (!subTeam || subTeam.parent?.slug !== teamSlug) notFound();

  const [result, widgetOrder] = await Promise.all([
    fetchUnifiedTeamData(subTeamSlug),
    fetchWidgetOrder(subTeamSlug),
  ]);

  if (!result) notFound();

  return (
    <SubTeamPageTemplate
      dataBag={result.dataBag}
      widgetOrder={widgetOrder || undefined}
    />
  );
}
