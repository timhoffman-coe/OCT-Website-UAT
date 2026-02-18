import TeamTabs from '@/components/its-shared/TeamTabs';
import type { TeamTab } from '@/lib/data/its-shared';

interface TeamTabsWidgetProps {
  teamTabs: TeamTab[];
}

export default function TeamTabsWidget({ teamTabs }: TeamTabsWidgetProps) {
  if (teamTabs.length === 0) return null;
  return (
    <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="font-sans text-2xl md:text-3xl font-bold text-primary-blue mb-6 pb-2 border-b-2 border-[#F4F2F1]">
        Team Overviews
      </h2>
      <TeamTabs tabs={teamTabs} />
    </section>
  );
}
