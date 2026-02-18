'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, ExternalLink } from 'lucide-react';
import { createChildTeam } from '@/lib/actions/team-actions';

interface ChildTeam {
  id: string;
  slug: string;
  teamName: string;
  teamShortName: string;
  isPublished: boolean;
  sortOrder: number;
}

interface SubTeamsEditorProps {
  parentId: string;
  children: ChildTeam[];
}

export default function SubTeamsEditor({ parentId, children }: SubTeamsEditorProps) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [slug, setSlug] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamShortName, setTeamShortName] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleCreate = async () => {
    if (!slug.trim() || !teamName.trim() || !teamShortName.trim()) {
      setError('All fields are required.');
      return;
    }
    if (!/^[a-z0-9-]+$/.test(slug)) {
      setError('Slug must be lowercase letters, numbers, and hyphens only.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await createChildTeam(parentId, { slug, teamName, teamShortName });
      setSlug('');
      setTeamName('');
      setTeamShortName('');
      setShowForm(false);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to create team.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-sans text-xl font-semibold text-gray-900">
          Sub-Teams
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-sans font-medium text-white bg-primary-blue rounded hover:bg-primary-blue/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Create Team
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
          <h3 className="font-sans text-sm font-semibold text-gray-700 mb-3">New Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <div>
              <label className="block font-sans text-xs text-gray-500 mb-1">Team Name</label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g. Network Services"
                className="w-full px-3 py-1.5 border rounded text-sm font-sans"
              />
            </div>
            <div>
              <label className="block font-sans text-xs text-gray-500 mb-1">Short Name</label>
              <input
                type="text"
                value={teamShortName}
                onChange={(e) => setTeamShortName(e.target.value)}
                placeholder="e.g. Network"
                className="w-full px-3 py-1.5 border rounded text-sm font-sans"
              />
            </div>
            <div>
              <label className="block font-sans text-xs text-gray-500 mb-1">URL Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                placeholder="e.g. network-services"
                className="w-full px-3 py-1.5 border rounded text-sm font-sans font-mono"
              />
            </div>
          </div>
          {error && <p className="font-sans text-xs text-red-600 mb-2">{error}</p>}
          <div className="flex gap-2">
            <button
              onClick={handleCreate}
              disabled={saving}
              className="px-3 py-1.5 text-sm font-sans font-medium text-white bg-primary-blue rounded hover:bg-primary-blue/90 disabled:opacity-50 transition-colors"
            >
              {saving ? 'Creating...' : 'Create'}
            </button>
            <button
              onClick={() => { setShowForm(false); setError(''); }}
              className="px-3 py-1.5 text-sm font-sans text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Child Teams List */}
      {children.length === 0 ? (
        <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-8 text-center">
          <p className="font-sans text-sm text-gray-500">
            No sub-teams yet. Click &ldquo;Create Team&rdquo; to add one.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {children.map((child) => (
            <Link
              key={child.id}
              href={`/admin/teams/${child.id}`}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:border-primary-blue hover:shadow-sm transition-all group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-sans font-semibold text-primary-blue text-sm truncate group-hover:underline">
                    {child.teamName}
                  </h3>
                  <p className="font-sans text-xs text-gray-500 mt-0.5">/{child.slug}</p>
                </div>
                <div className="flex items-center gap-2 ml-2 flex-shrink-0">
                  <span
                    className={`text-xs font-sans px-1.5 py-0.5 rounded ${
                      child.isPublished
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {child.isPublished ? 'Published' : 'Draft'}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-primary-blue" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
