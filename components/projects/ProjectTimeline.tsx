'use client';

interface Milestone {
  id: string;
  name: string;
  date: Date | null;
  status: string;
}

interface ProjectTimelineProps {
  startDate?: Date | null;
  endDate?: Date | null;
  progress: number;
  milestones: Milestone[];
}

function formatDate(date: Date | null): string {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }).toUpperCase();
}

function formatMilestoneDate(date: Date | null): string {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
}

export default function ProjectTimeline({ startDate, endDate, progress, milestones }: ProjectTimelineProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <h2 className="text-[#173858] font-black uppercase text-xs tracking-widest mb-6">Project Timeline</h2>

      <div className="flex justify-between items-center mb-6">
        <div className="text-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase">Start</p>
          <p className={`font-bold ${startDate ? 'text-[#173858]' : 'text-gray-300 italic'}`}>{formatDate(startDate ?? null)}</p>
        </div>
        <div className="flex-1 px-4">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-[#003962] transition-all" style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}></div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase">End</p>
          <p className={`font-bold ${endDate ? 'text-[#173858]' : 'text-gray-300 italic'}`}>{formatDate(endDate ?? null)}</p>
        </div>
      </div>

      {milestones.length > 0 ? (
        <div className="space-y-6">
          {milestones.map((milestone, idx) => (
            <div key={milestone.id} className="relative pl-6">
              {milestone.status === 'completed' && (
                <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-[#003962]"></div>
              )}
              {milestone.status === 'current' && (
                <div className="absolute left-0 top-1 w-2 h-2 rounded-full border-2 border-[#003962] bg-white"></div>
              )}
              {milestone.status === 'upcoming' && (
                <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-gray-300"></div>
              )}
              {idx < milestones.length - 1 && (
                <div className="absolute left-[3px] top-3 w-[2px] h-full bg-gray-200"></div>
              )}
              <p className={`text-[10px] font-bold uppercase ${milestone.status === 'current' ? 'text-[#003962]' : 'text-gray-400'}`}>
                {milestone.status === 'completed' && 'Completed'}
                {milestone.status === 'current' && 'Current Phase'}
                {milestone.status === 'upcoming' && 'Upcoming'}
                {milestone.date && ` - ${formatMilestoneDate(milestone.date)}`}
              </p>
              <p className="text-sm font-bold text-[#173858]">{milestone.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-300 italic text-center py-4">No milestones added yet</p>
      )}
    </div>
  );
}
