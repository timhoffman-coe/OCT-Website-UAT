'use client';

import { useState, useEffect, useTransition } from 'react';
import { Save, Loader2, Tag, FolderKanban, X, Check } from 'lucide-react';
import { getAllTags } from '@/lib/actions/project-tag-actions';
import { updateWidgetConfig } from '@/lib/actions/widget-actions';

interface TagData {
  id: string;
  name: string;
  slug: string;
}

interface ProjectSummary {
  id: string;
  title: string;
  projectCode: string | null;
  slug: string;
  isPublished: boolean;
}

interface OngoingProjectsConfigFormProps {
  instanceId: string;
  currentConfig: Record<string, string>;
  onSaved: (config: Record<string, string>) => void;
}

async function fetchAdminProjects(): Promise<ProjectSummary[]> {
  const res = await fetch('/api/cms/projects-list');
  if (!res.ok) return [];
  return res.json();
}

export default function OngoingProjectsConfigForm({
  instanceId,
  currentConfig,
  onSaved,
}: OngoingProjectsConfigFormProps) {
  const [mode, setMode] = useState<'none' | 'tag' | 'manual'>(
    (currentConfig.mode as 'tag' | 'manual') || 'none'
  );
  const [tagSlug, setTagSlug] = useState(currentConfig.tagSlug || '');
  const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>(() => {
    try {
      return currentConfig.projectIds ? JSON.parse(currentConfig.projectIds) : [];
    } catch {
      return [];
    }
  });
  const [maxProjects, setMaxProjects] = useState(currentConfig.maxProjects || '6');

  // Fallback CTA fields
  const [bannerText, setBannerText] = useState(currentConfig.bannerText || '');
  const [heading, setHeading] = useState(currentConfig.heading || '');
  const [description, setDescription] = useState(currentConfig.description || '');
  const [buttonText, setButtonText] = useState(currentConfig.buttonText || '');
  const [buttonLink, setButtonLink] = useState(currentConfig.buttonLink || '');

  const [tags, setTags] = useState<TagData[]>([]);
  const [projects, setProjects] = useState<ProjectSummary[]>([]);
  const [loadingTags, setLoadingTags] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [saving, startSaving] = useTransition();

  // Load tags when tag mode is selected
  useEffect(() => {
    if (mode === 'tag' && tags.length === 0) {
      setLoadingTags(true);
      getAllTags().then((t) => {
        setTags(t);
        setLoadingTags(false);
      });
    }
  }, [mode, tags.length]);

  // Load projects when manual mode is selected
  useEffect(() => {
    if (mode === 'manual' && projects.length === 0) {
      setLoadingProjects(true);
      fetchAdminProjects().then((p) => {
        setProjects(p);
        setLoadingProjects(false);
      });
    }
  }, [mode, projects.length]);

  function handleSave() {
    const config: Record<string, string> = {};

    if (mode !== 'none') {
      config.mode = mode;
      if (mode === 'tag' && tagSlug) config.tagSlug = tagSlug;
      if (mode === 'manual' && selectedProjectIds.length > 0) {
        config.projectIds = JSON.stringify(selectedProjectIds);
      }
      const max = parseInt(maxProjects);
      if (max && max !== 6) config.maxProjects = String(max);
    }

    // Fallback CTA fields
    if (bannerText.trim()) config.bannerText = bannerText.trim();
    if (heading.trim()) config.heading = heading.trim();
    if (description.trim()) config.description = description.trim();
    if (buttonText.trim()) config.buttonText = buttonText.trim();
    if (buttonLink.trim()) config.buttonLink = buttonLink.trim();

    startSaving(async () => {
      await updateWidgetConfig(instanceId, config);
      onSaved(config);
    });
  }

  function toggleProject(projectId: string) {
    setSelectedProjectIds((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    );
  }

  return (
    <div className="space-y-5">
      {/* ── Project Source ── */}
      <div>
        <h4 className="font-sans text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Project Source
        </h4>
        <p className="font-sans text-xs text-gray-400 mb-3">
          Choose how projects are selected for this widget. Without a source, the widget shows a CTA banner instead.
        </p>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <button
            onClick={() => setMode('none')}
            className={`px-3 py-2 rounded-lg border text-xs font-sans font-medium transition-colors ${
              mode === 'none'
                ? 'border-primary-blue bg-primary-blue/5 text-primary-blue'
                : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            CTA Only
          </button>
          <button
            onClick={() => setMode('tag')}
            className={`px-3 py-2 rounded-lg border text-xs font-sans font-medium transition-colors flex items-center justify-center gap-1.5 ${
              mode === 'tag'
                ? 'border-primary-blue bg-primary-blue/5 text-primary-blue'
                : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            <Tag size={12} /> By Tag
          </button>
          <button
            onClick={() => setMode('manual')}
            className={`px-3 py-2 rounded-lg border text-xs font-sans font-medium transition-colors flex items-center justify-center gap-1.5 ${
              mode === 'manual'
                ? 'border-primary-blue bg-primary-blue/5 text-primary-blue'
                : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}
          >
            <FolderKanban size={12} /> Manual
          </button>
        </div>

        {/* Tag selector */}
        {mode === 'tag' && (
          <div className="space-y-2">
            <label className="block font-sans text-xs text-gray-500">Select a tag to filter projects</label>
            {loadingTags ? (
              <div className="flex items-center gap-2 py-2">
                <Loader2 size={14} className="animate-spin text-gray-400" />
                <span className="font-sans text-xs text-gray-400">Loading tags...</span>
              </div>
            ) : tags.length === 0 ? (
              <p className="font-sans text-xs text-gray-400 italic py-2">
                No tags exist yet. Create tags on individual project pages first.
              </p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {tags.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => setTagSlug(tag.slug === tagSlug ? '' : tag.slug)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-sans font-medium transition-colors ${
                      tagSlug === tag.slug
                        ? 'bg-primary-blue text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Tag size={10} />
                    {tag.name}
                    {tagSlug === tag.slug && <Check size={10} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Manual project selector */}
        {mode === 'manual' && (
          <div className="space-y-2">
            <label className="block font-sans text-xs text-gray-500">
              Select projects to display ({selectedProjectIds.length} selected)
            </label>
            {loadingProjects ? (
              <div className="flex items-center gap-2 py-2">
                <Loader2 size={14} className="animate-spin text-gray-400" />
                <span className="font-sans text-xs text-gray-400">Loading projects...</span>
              </div>
            ) : projects.length === 0 ? (
              <p className="font-sans text-xs text-gray-400 italic py-2">
                No projects found. Create projects first.
              </p>
            ) : (
              <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg divide-y divide-gray-100">
                {projects.map((project) => {
                  const isSelected = selectedProjectIds.includes(project.id);
                  return (
                    <button
                      key={project.id}
                      onClick={() => toggleProject(project.id)}
                      className={`w-full text-left px-3 py-2 flex items-center gap-2.5 transition-colors ${
                        isSelected ? 'bg-primary-blue/5' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-primary-blue border-primary-blue'
                            : 'border-gray-300'
                        }`}
                      >
                        {isSelected && <Check size={10} className="text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans text-xs font-medium text-gray-900 truncate">
                          {project.title}
                        </p>
                        {project.projectCode && (
                          <p className="font-sans text-[10px] text-gray-400">{project.projectCode}</p>
                        )}
                      </div>
                      {!project.isPublished && (
                        <span className="text-[9px] px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded font-medium">
                          Draft
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
            {selectedProjectIds.length > 0 && (
              <button
                onClick={() => setSelectedProjectIds([])}
                className="text-xs text-gray-400 hover:text-gray-600 font-sans flex items-center gap-1"
              >
                <X size={10} /> Clear selection
              </button>
            )}
          </div>
        )}

        {/* Max projects */}
        {mode !== 'none' && (
          <div className="mt-3">
            <label className="block font-sans text-xs text-gray-500 mb-1">Max projects to display</label>
            <input
              type="number"
              value={maxProjects}
              onChange={(e) => setMaxProjects(e.target.value)}
              min={1}
              max={20}
              className="w-20 border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
            />
          </div>
        )}
      </div>

      {/* ── Fallback CTA Settings ── */}
      <div>
        <h4 className="font-sans text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Fallback CTA Settings
        </h4>
        <p className="font-sans text-xs text-gray-400 mb-3">
          {mode === 'none'
            ? 'These settings control the CTA banner that will be shown.'
            : 'If no matching projects are found, a CTA banner is shown instead. Leave empty for defaults.'}
        </p>
        <div className="space-y-3">
          <div>
            <label className="block font-sans text-xs text-gray-500 mb-1">Banner Text</label>
            <input
              value={bannerText}
              onChange={(e) => setBannerText(e.target.value)}
              placeholder="ONGOING PROJECTS"
              className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
            />
          </div>
          <div>
            <label className="block font-sans text-xs text-gray-500 mb-1">Heading</label>
            <input
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              placeholder="Projects"
              className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
            />
          </div>
          <div>
            <label className="block font-sans text-xs text-gray-500 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="See the list of all current Projects for the Team..."
              rows={3}
              className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
            />
          </div>
          <div>
            <label className="block font-sans text-xs text-gray-500 mb-1">Button Text</label>
            <input
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              placeholder="View Project List"
              className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
            />
          </div>
          <div>
            <label className="block font-sans text-xs text-gray-500 mb-1">Button Link</label>
            <input
              value={buttonLink}
              onChange={(e) => setButtonLink(e.target.value)}
              placeholder="https://..."
              className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
            />
          </div>
        </div>
      </div>

      <p className="font-sans text-xs text-gray-400">
        Leave fields empty to use the default value shown in the placeholder.
      </p>
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-1 bg-primary-blue text-white text-sm px-3 py-1.5 rounded hover:bg-dark-blue disabled:opacity-50"
        >
          <Save className="w-3 h-3" /> Save Settings
        </button>
      </div>
    </div>
  );
}
