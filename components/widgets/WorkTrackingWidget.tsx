import WorkTrackingCard from '@/components/its-shared/WorkTrackingCard';
import type { TrelloBoard } from '@/lib/data/its-shared';

interface WorkTrackingWidgetProps {
  trelloBoards: TrelloBoard[];
}

export default function WorkTrackingWidget({ trelloBoards }: WorkTrackingWidgetProps) {
  if (trelloBoards.length === 0) return null;
  return (
    <section className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="font-sans text-2xl md:text-3xl font-bold text-primary-blue mb-6 pb-2 border-b-2 border-structural-gray-blue">
        Work Tracking Boards
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trelloBoards.map((board, index) => (
          <WorkTrackingCard key={index} {...board} />
        ))}
      </div>
    </section>
  );
}
