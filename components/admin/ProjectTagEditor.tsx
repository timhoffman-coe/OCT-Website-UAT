'use client';

import { useState, useTransition, useEffect } from 'react';
import { Tag, Plus, X, Loader2 } from 'lucide-react';
import { getAllTags, createTag } from '@/lib/actions/project-tag-actions';
import { updateProjectTags } from '@/lib/actions/project-actions';

interface TagData {
  id: string;
  name: string;
  slug: string;
}

interface ProjectTagEditorProps {
  projectId: string;
  initialTags: { tag: TagData }[];
  readOnly?: boolean;
}

export default function ProjectTagEditor({ projectId, initialTags, readOnly = false }: ProjectTagEditorProps) {
  const [assignedTagIds, setAssignedTagIds] = useState<Set<string>>(
    () => new Set(initialTags.map((t) => t.tag.id))
  );
  const [allTags, setAllTags] = useState<TagData[]>([]);
  const [newTagName, setNewTagName] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [loaded, setLoaded] = useState(false);

  // Load all available tags on first interaction
  useEffect(() => {
    if (showDropdown && !loaded) {
      getAllTags().then((tags) => {
        setAllTags(tags);
        setLoaded(true);
      });
    }
  }, [showDropdown, loaded]);

  const assignedTags = allTags.length > 0
    ? allTags.filter((t) => assignedTagIds.has(t.id))
    : initialTags.map((t) => t.tag);

  const availableTags = allTags.filter((t) => !assignedTagIds.has(t.id));

  function handleToggleTag(tagId: string, add: boolean) {
    const next = new Set(assignedTagIds);
    if (add) next.add(tagId);
    else next.delete(tagId);
    setAssignedTagIds(next);
    startTransition(async () => {
      await updateProjectTags(projectId, Array.from(next));
    });
  }

  function handleCreateAndAssign() {
    const name = newTagName.trim();
    if (!name) return;
    setNewTagName('');
    startTransition(async () => {
      const tag = await createTag(name);
      setAllTags((prev) => [...prev, tag].sort((a, b) => a.name.localeCompare(b.name)));
      const next = new Set(assignedTagIds);
      next.add(tag.id);
      setAssignedTagIds(next);
      await updateProjectTags(projectId, Array.from(next));
    });
  }

  return (
    <div className="relative">
      <label className="block font-sans text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
        Tags
      </label>

      {/* Assigned tags */}
      <div className="flex flex-wrap gap-1.5 mb-2 min-h-[28px]">
        {assignedTags.map((tag) => (
          <span
            key={tag.id}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-blue/10 text-primary-blue text-xs font-medium font-sans"
          >
            <Tag size={10} />
            {tag.name}
            {!readOnly && (
              <button
                onClick={() => handleToggleTag(tag.id, false)}
                className="ml-0.5 hover:text-red-600 transition-colors"
                aria-label={`Remove tag ${tag.name}`}
              >
                <X size={10} />
              </button>
            )}
          </span>
        ))}
        {assignedTags.length === 0 && (
          <span className="font-sans text-xs text-gray-400 italic">No tags assigned</span>
        )}
        {isPending && <Loader2 size={14} className="animate-spin text-gray-400" />}
      </div>

      {/* Add tag button + dropdown */}
      {!readOnly && (
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-sans font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Plus size={12} /> Add Tag
          </button>

          {showDropdown && (
            <div className="absolute z-20 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg">
              {/* Create new tag */}
              <div className="p-2 border-b border-gray-100">
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleCreateAndAssign()}
                    placeholder="New tag name..."
                    className="flex-1 px-2 py-1 text-xs border border-gray-200 rounded font-sans focus:ring-1 focus:ring-primary-blue focus:border-primary-blue outline-none"
                  />
                  <button
                    onClick={handleCreateAndAssign}
                    disabled={!newTagName.trim() || isPending}
                    className="px-2 py-1 text-xs bg-primary-blue text-white rounded hover:bg-dark-blue disabled:opacity-50 font-sans"
                  >
                    Create
                  </button>
                </div>
              </div>

              {/* Available tags list */}
              <div className="max-h-48 overflow-y-auto p-1">
                {!loaded ? (
                  <div className="flex items-center justify-center py-3">
                    <Loader2 size={14} className="animate-spin text-gray-400" />
                  </div>
                ) : availableTags.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-3 font-sans">
                    {allTags.length === 0 ? 'No tags yet — create one above' : 'All tags assigned'}
                  </p>
                ) : (
                  availableTags.map((tag) => (
                    <button
                      key={tag.id}
                      onClick={() => handleToggleTag(tag.id, true)}
                      className="w-full text-left px-2.5 py-1.5 text-xs font-sans text-gray-700 rounded hover:bg-gray-50 transition-colors flex items-center gap-1.5"
                    >
                      <Tag size={10} className="text-gray-400" />
                      {tag.name}
                    </button>
                  ))
                )}
              </div>

              {/* Close */}
              <div className="p-1.5 border-t border-gray-100">
                <button
                  onClick={() => setShowDropdown(false)}
                  className="w-full text-center text-[10px] text-gray-400 hover:text-gray-600 font-sans"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
