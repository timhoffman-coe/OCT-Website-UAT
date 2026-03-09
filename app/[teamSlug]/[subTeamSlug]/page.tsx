import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { fetchSubTeamData } from '@/lib/data/fetch-team';
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

  const [data, widgetOrder] = await Promise.all([
    fetchSubTeamData(subTeamSlug),
    fetchWidgetOrder(subTeamSlug),
  ]);

  if (!data) notFound();

  return (
    <SubTeamPageTemplate
      data={data}
      widgetOrder={widgetOrder || undefined}
    />
  );
}
