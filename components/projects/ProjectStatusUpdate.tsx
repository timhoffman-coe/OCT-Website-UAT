'use client';

interface StatusUpdate {
  id: string;
  content: string;
  createdAt: Date;
}

interface ProjectStatusUpdateProps {
  updates: StatusUpdate[];
}

function formatUpdateDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

export default function ProjectStatusUpdateSection({ updates }: ProjectStatusUpdateProps) {
  const latest = updates[0];

  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <h2 className="text-[#173858] font-black uppercase text-xs tracking-widest mb-4">Latest Status Update</h2>
      {latest ? (
        <>
          <div className="bg-blue-50/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#003962]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span className="text-[10px] font-bold text-[#005087] uppercase">Updated {formatUpdateDate(latest.createdAt)}</span>
            </div>
            <p className="text-sm text-[#173858] italic leading-relaxed">&ldquo;{latest.content}&rdquo;</p>
          </div>
          {updates.length > 1 && (
            <div className="mt-4 space-y-3">
              {updates.slice(1).map((update) => (
                <div key={update.id} className="text-xs text-gray-500">
                  <span className="font-bold uppercase">{formatUpdateDate(update.createdAt)}</span>
                  <p className="text-gray-600 mt-0.5">{update.content}</p>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="text-sm text-gray-300 italic text-center py-4">No status updates yet</p>
      )}
    </div>
  );
}
