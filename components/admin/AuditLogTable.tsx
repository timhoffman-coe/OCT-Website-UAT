'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface AuditLog {
  id: string;
  action: string;
  entity: string;
  entityId: string;
  description: string | null;
  changes: unknown;
  createdAt: string;
  user: { name: string; email: string };
}

function ActionBadge({ action }: { action: string }) {
  const colors: Record<string, string> = {
    CREATE: 'bg-green-100 text-green-800',
    CREATE_CHILD_TEAM: 'bg-green-100 text-green-800',
    ADD_WIDGET: 'bg-green-100 text-green-800',
    UPDATE: 'bg-blue-100 text-blue-800',
    UPDATE_WIDGET_CONFIG: 'bg-blue-100 text-blue-800',
    REORDER_WIDGETS: 'bg-blue-100 text-blue-800',
    RESET_WIDGETS: 'bg-blue-100 text-blue-800',
    DELETE: 'bg-red-100 text-red-800',
    REMOVE_WIDGET: 'bg-red-100 text-red-800',
    ARCHIVE: 'bg-amber-100 text-amber-800',
    RESTORE: 'bg-purple-100 text-purple-800',
    LOGIN: 'bg-gray-100 text-gray-800',
    LOGIN_FAILED: 'bg-red-100 text-red-800',
    ACCESS_DENIED: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${colors[action] || 'bg-gray-100 text-gray-800'}`}>
      {action}
    </span>
  );
}

function ChangesDetail({ changes }: { changes: unknown }) {
  if (!changes || (typeof changes === 'object' && Object.keys(changes as object).length === 0)) {
    return <span className="text-gray-400 text-xs">No details</span>;
  }

  return (
    <pre className="text-xs text-gray-600 bg-gray-50 rounded p-3 mt-2 overflow-x-auto max-h-64 overflow-y-auto whitespace-pre-wrap break-words">
      {JSON.stringify(changes, null, 2)}
    </pre>
  );
}

export default function AuditLogTable({ logs }: { logs: AuditLog[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="w-full text-sm font-sans">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-8 px-2 py-3" />
            <th className="text-left px-4 py-3 text-gray-600 font-semibold">Time</th>
            <th className="text-left px-4 py-3 text-gray-600 font-semibold">User</th>
            <th className="text-left px-4 py-3 text-gray-600 font-semibold">Action</th>
            <th className="text-left px-4 py-3 text-gray-600 font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <>
              <tr
                key={log.id}
                className="border-t border-gray-100 cursor-pointer hover:bg-gray-50/50 transition-colors"
                onClick={() => setExpandedId(expandedId === log.id ? null : log.id)}
              >
                <td className="px-2 py-2.5 text-gray-400">
                  {expandedId === log.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </td>
                <td className="px-4 py-2.5 text-gray-500 whitespace-nowrap">
                  {new Date(log.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-2.5 text-gray-900">
                  <div>{log.user.name}</div>
                  <div className="text-xs text-gray-400">{log.user.email}</div>
                </td>
                <td className="px-4 py-2.5">
                  <ActionBadge action={log.action} />
                </td>
                <td className="px-4 py-2.5 text-gray-700">
                  {log.description || (
                    <span className="text-gray-400">
                      {log.entity} <span className="font-mono text-xs">{log.entityId.slice(0, 8)}...</span>
                    </span>
                  )}
                </td>
              </tr>
              {expandedId === log.id && (
                <tr key={`${log.id}-detail`} className="bg-gray-50/50">
                  <td colSpan={5} className="px-6 py-3">
                    <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 mb-2">
                      <div><span className="font-semibold">Entity:</span> {log.entity}</div>
                      <div><span className="font-semibold">Entity ID:</span> <span className="font-mono">{log.entityId}</span></div>
                    </div>
                    <div className="text-xs font-semibold text-gray-500 mb-1">Changes:</div>
                    <ChangesDetail changes={log.changes} />
                  </td>
                </tr>
              )}
            </>
          ))}
          {logs.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                No audit log entries yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
