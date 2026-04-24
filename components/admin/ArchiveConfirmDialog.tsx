'use client';

import { useState, useTransition, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Archive, AlertTriangle } from 'lucide-react';
import { archiveTeam, getArchiveImpact } from '@/lib/actions/team-actions';
import { useFocusTrap } from '@/hooks/useFocusTrap';

interface ArchiveConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  teamId: string;
  teamName: string;
  hasChildren: boolean;
}

export default function ArchiveConfirmDialog({
  isOpen,
  onClose,
  teamId,
  teamName,
  hasChildren,
}: ArchiveConfirmDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(dialogRef, isOpen);
  const router = useRouter();
  const [confirmText, setConfirmText] = useState('');
  const [impact, setImpact] = useState<Awaited<ReturnType<typeof getArchiveImpact>> | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  // Load impact data when dialog opens
  const loadImpact = async () => {
    if (impact) return;
    setLoading(true);
    try {
      const data = await getArchiveImpact(teamId);
      setImpact(data);
    } catch {
      setError('Failed to load impact data.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Trigger load on first render when open
  if (!impact && !loading && !error) {
    loadImpact();
  }

  const canConfirm = hasChildren ? confirmText === teamName : true;

  function handleArchive() {
    setError('');
    startTransition(async () => {
      try {
        await archiveTeam(teamId);
        onClose();
        router.refresh();
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to archive team.');
      }
    });
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="archive-dialog-title"
          className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 id="archive-dialog-title" className="font-sans text-lg font-bold text-gray-900">Archive Team</h3>
              <p className="font-sans text-sm text-gray-500">This action can be undone from the Trash page.</p>
            </div>
          </div>

          {loading && (
            <p className="font-sans text-sm text-gray-500 mb-4">Loading impact summary...</p>
          )}

          {impact && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-4">
              <p className="font-sans text-sm font-semibold text-gray-800 mb-2">
                Archiving &ldquo;{impact.teamName}&rdquo; will affect:
              </p>
              <ul className="font-sans text-sm text-gray-600 space-y-1">
                {impact.childTeams > 0 && (
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    {impact.childTeams} child team{impact.childTeams > 1 ? 's' : ''} (also archived)
                  </li>
                )}
                {impact.portfolios > 0 && (
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    {impact.portfolios} portfolio{impact.portfolios > 1 ? 's' : ''}
                  </li>
                )}
                {impact.serviceAreas > 0 && (
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    {impact.serviceAreas} service area{impact.serviceAreas > 1 ? 's' : ''}
                  </li>
                )}
                {impact.services > 0 && (
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    {impact.services} service{impact.services > 1 ? 's' : ''}
                  </li>
                )}
                {impact.contacts > 0 && (
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    {impact.contacts} contact{impact.contacts > 1 ? 's' : ''}
                  </li>
                )}
                {impact.teamMembers > 0 && (
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    {impact.teamMembers} team member{impact.teamMembers > 1 ? 's' : ''}
                  </li>
                )}
              </ul>
            </div>
          )}

          {hasChildren && (
            <div className="mb-4">
              <label className="block font-sans text-sm text-gray-700 mb-1">
                Type <span className="font-semibold">{teamName}</span> to confirm:
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder={teamName}
                className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm font-sans focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
              />
            </div>
          )}

          {error && (
            <p className="font-sans text-xs text-red-600 mb-3">{error}</p>
          )}

          <div className="flex gap-2 justify-end">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-sm font-sans text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleArchive}
              disabled={isPending || !canConfirm || loading}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-sans font-medium text-white bg-red-600 rounded hover:bg-red-700 disabled:opacity-50 transition-colors"
            >
              <Archive className="w-3.5 h-3.5" />
              {isPending ? 'Archiving...' : 'Archive Team'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
