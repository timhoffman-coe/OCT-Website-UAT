'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Clock } from 'lucide-react';

interface AuditEntry {
  id: string;
  action: string;
  changes: Record<string, unknown> | null;
  createdAt: string;
  user: { name: string };
}

const ACTION_COLORS: Record<string, string> = {
  CREATE: 'bg-green-100 text-green-800',
  CREATE_CHILD_TEAM: 'bg-green-100 text-green-800',
  UPDATE: 'bg-blue-100 text-blue-800',
  ARCHIVE: 'bg-red-100 text-red-800',
  RESTORE: 'bg-purple-100 text-purple-800',
  DELETE: 'bg-red-100 text-red-800',
};

export default function TeamHistory({ teamId }: { teamId: string }) {
  const [entries, setEntries] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen || entries.length > 0) return;
    setLoading(true);
    fetch(`/api/cms/audit-log?teamId=${teamId}`)
      .then((r) => r.json())
      .then((data) => setEntries(data.logs || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [isOpen, teamId, entries.length]);

  return (
    <div className="mt-8 border-t border-gray-200 pt-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 font-sans text-sm font-semibold text-gray-700 hover:text-primary-blue transition-colors"
      >
        {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        <Clock className="w-4 h-4" />
        Change History
      </button>

      {isOpen && (
        <div className="mt-3">
          {loading && (
            <p className="font-sans text-sm text-gray-500">Loading history...</p>
          )}
          {!loading && entries.length === 0 && (
            <p className="font-sans text-sm text-gray-500">No history recorded yet.</p>
          )}
          {entries.length > 0 && (
            <div className="space-y-2">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedEntry(expandedEntry === entry.id ? null : entry.id)}
                    className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-sans font-semibold px-1.5 py-0.5 rounded ${
                          ACTION_COLORS[entry.action] || 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {entry.action}
                      </span>
                      <span className="font-sans text-sm text-gray-700">
                        {entry.user.name}
                      </span>
                    </div>
                    <span className="font-sans text-xs text-gray-400">
                      {new Date(entry.createdAt).toLocaleString()}
                    </span>
                  </button>
                  {expandedEntry === entry.id && entry.changes && (
                    <div className="px-3 pb-3 border-t border-gray-100">
                      <pre className="font-mono text-xs text-gray-600 bg-gray-50 rounded p-2 mt-2 overflow-x-auto max-h-48 overflow-y-auto">
                        {JSON.stringify(entry.changes, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
