'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Archive, RotateCcw, Trash2, AlertTriangle } from 'lucide-react';
import { restoreTeam, permanentlyDeleteTeam } from '@/lib/actions/team-actions';

interface ArchivedTeam {
  id: string;
  teamName: string;
  slug: string;
  pageTemplate: string;
  archivedAt: Date | null;
  parentId: string | null;
  parent: { teamName: string } | null;
  _count: { children: number };
}

function getTemplateLabel(template: string): string {
  switch (template) {
    case 'ITS_TEAM': return 'ITS Team';
    case 'SECTION': return 'Section';
    case 'SUB_TEAM': return 'Sub-Team';
    default: return 'Custom';
  }
}

export default function TrashClient({ teams }: { teams: ArchivedTeam[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [actionId, setActionId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<ArchivedTeam | null>(null);
  const [confirmText, setConfirmText] = useState('');

  function handleRestore(teamId: string) {
    setError('');
    setActionId(teamId);
    startTransition(async () => {
      try {
        await restoreTeam(teamId);
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to restore team.');
      } finally {
        setActionId(null);
      }
    });
  }

  function handlePermanentDelete() {
    if (!deleteConfirm) return;
    setError('');
    setActionId(deleteConfirm.id);
    startTransition(async () => {
      try {
        await permanentlyDeleteTeam(deleteConfirm.id);
        setDeleteConfirm(null);
        setConfirmText('');
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to delete team.');
      } finally {
        setActionId(null);
      }
    });
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="font-sans text-3xl font-bold text-primary-blue">
          Trash
        </h1>
        <p className="font-sans text-sm text-gray-500 mt-1">
          Archived teams can be restored or permanently deleted after 7 days.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
          <p className="font-sans text-sm text-red-800">{error}</p>
        </div>
      )}

      {teams.length === 0 ? (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-12 text-center">
          <Archive className="w-8 h-8 text-gray-400 mx-auto mb-3" />
          <p className="font-sans text-sm text-gray-500">No archived teams.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {teams.map((team) => {
            const archivedDate = team.archivedAt ? new Date(team.archivedAt) : null;
            const daysSinceArchived = archivedDate
              ? Math.floor((Date.now() - archivedDate.getTime()) / (1000 * 60 * 60 * 24))
              : 0;
            const canDelete = daysSinceArchived >= 7;

            return (
              <div
                key={team.id}
                className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-sans font-semibold text-gray-900">
                      {team.teamName}
                    </span>
                    <span className="text-[10px] font-sans px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">
                      {getTemplateLabel(team.pageTemplate)}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-gray-500 mt-0.5">
                    /{team.slug}
                    {team.parent && <> &middot; Parent: {team.parent.teamName}</>}
                    {team._count.children > 0 && <> &middot; {team._count.children} child team{team._count.children > 1 ? 's' : ''}</>}
                  </p>
                  <p className="font-sans text-xs text-gray-400 mt-0.5">
                    Archived {archivedDate?.toLocaleDateString()} ({daysSinceArchived} day{daysSinceArchived !== 1 ? 's' : ''} ago)
                  </p>
                </div>
                <div className="flex gap-2 ml-4 flex-shrink-0">
                  <button
                    onClick={() => handleRestore(team.id)}
                    disabled={isPending && actionId === team.id}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-sans font-medium text-primary-blue bg-blue-50 rounded hover:bg-blue-100 disabled:opacity-50 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    {isPending && actionId === team.id ? 'Restoring...' : 'Restore'}
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(team)}
                    disabled={!canDelete || isPending}
                    title={canDelete ? 'Permanently delete' : `Can delete after ${7 - daysSinceArchived} more day(s)`}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-sans font-medium text-red-600 bg-red-50 rounded hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Permanent Delete Confirmation Dialog */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => { setDeleteConfirm(null); setConfirmText(''); }}
          />
          <div className="flex min-h-full items-center justify-center p-4">
            <div
              className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-sans text-lg font-bold text-gray-900">Permanently Delete</h3>
                  <p className="font-sans text-sm text-red-600">This action cannot be undone.</p>
                </div>
              </div>
              <p className="font-sans text-sm text-gray-700 mb-4">
                All data for &ldquo;{deleteConfirm.teamName}&rdquo; including child teams, portfolios, service areas,
                contacts, and all other content will be permanently destroyed.
              </p>
              <div className="mb-4">
                <label className="block font-sans text-sm text-gray-700 mb-1">
                  Type <span className="font-semibold">{deleteConfirm.teamName}</span> to confirm:
                </label>
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder={deleteConfirm.teamName}
                  className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm font-sans focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => { setDeleteConfirm(null); setConfirmText(''); }}
                  className="px-3 py-1.5 text-sm font-sans text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePermanentDelete}
                  disabled={confirmText !== deleteConfirm.teamName || isPending}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-sans font-medium text-white bg-red-600 rounded hover:bg-red-700 disabled:opacity-50 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  {isPending ? 'Deleting...' : 'Delete Forever'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
