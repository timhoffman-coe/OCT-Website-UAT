'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Archive, RotateCcw, Activity, ChevronDown, ChevronUp } from 'lucide-react';

interface ActivityLog {
  id: string;
  action: string;
  entity: string;
  entityId: string;
  createdAt: string;
  user: { name: string; email: string };
}

interface ActivityFeedProps {
  logs: ActivityLog[];
  showFullLogLink?: boolean;
}

const ACTION_CONFIG: Record<string, { icon: typeof Plus; verb: string; bg: string; text: string }> = {
  CREATE: { icon: Plus, verb: 'created', bg: 'bg-green-100', text: 'text-green-600' },
  UPDATE: { icon: Pencil, verb: 'updated', bg: 'bg-blue-100', text: 'text-blue-600' },
  DELETE: { icon: Trash2, verb: 'deleted', bg: 'bg-red-100', text: 'text-red-600' },
  ARCHIVE: { icon: Archive, verb: 'archived', bg: 'bg-amber-100', text: 'text-amber-600' },
  RESTORE: { icon: RotateCcw, verb: 'restored', bg: 'bg-purple-100', text: 'text-purple-600' },
};

const DEFAULT_CONFIG = { icon: Activity, verb: 'modified', bg: 'bg-gray-100', text: 'text-gray-600' };

function getRelativeTime(isoString: string): string {
  const now = Date.now();
  const then = new Date(isoString).getTime();
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return new Date(isoString).toLocaleDateString();
}

function formatEntity(entity: string): string {
  return entity
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

export default function DashboardActivityFeed({ logs, showFullLogLink = false }: ActivityFeedProps) {
  const [expanded, setExpanded] = useState(false);
  const INITIAL_COUNT = 8;
  const visibleLogs = expanded ? logs : logs.slice(0, INITIAL_COUNT);

  if (logs.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <Activity className="mx-auto mb-2 text-gray-300" size={32} />
        <p className="font-sans text-sm text-gray-400">No recent activity</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="divide-y divide-gray-100">
        {visibleLogs.map((log) => {
          const config = ACTION_CONFIG[log.action] || DEFAULT_CONFIG;
          const Icon = config.icon;

          return (
            <div key={log.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50/50 transition-colors">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full ${config.bg} ${config.text} flex items-center justify-center`}>
                <Icon size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans text-sm text-gray-900 truncate">
                  <span className="font-medium">{log.user.name}</span>
                  {' '}{config.verb}{' '}
                  <span className="text-gray-500">{formatEntity(log.entity)}</span>
                </p>
              </div>
              <span className="flex-shrink-0 font-sans text-xs text-gray-400">
                {getRelativeTime(log.createdAt)}
              </span>
            </div>
          );
        })}
      </div>

      {(logs.length > INITIAL_COUNT || showFullLogLink) && (
        <div className="flex items-center justify-between border-t border-gray-100 px-4 py-2.5 bg-gray-50/50">
          {logs.length > INITIAL_COUNT && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 font-sans text-xs text-gray-500 hover:text-primary-blue transition-colors"
            >
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              {expanded ? 'Show less' : `Show ${logs.length - INITIAL_COUNT} more`}
            </button>
          )}
          {showFullLogLink && (
            <Link
              href="/admin/audit-log"
              className="font-sans text-xs text-primary-blue hover:underline ml-auto"
            >
              View full audit log
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
