'use client';

import { useState, useTransition } from 'react';
import { createServiceArea, updateServiceArea, deleteServiceArea } from '@/lib/actions/service-area-actions';
import Link from 'next/link';
import { Pencil, Trash2, Plus, Save, X, ExternalLink } from 'lucide-react';

interface ServiceArea {
  id: string;
  serviceAreaId: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  icon: string | null;
  link: string | null;
  sortOrder: number;
  linkedTeamId: string | null;
  linkedTeam: { id: string; teamName: string; isPublished: boolean } | null;
}

export default function ServiceAreaEditor({
  teamId,
  areas,
}: {
  teamId: string;
  areas: ServiceArea[];
}) {
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    features: '',
    icon: '',
  });

  function startEdit(a: ServiceArea) {
    setEditing(a.id);
    setForm({
      title: a.title,
      shortDescription: a.shortDescription,
      fullDescription: a.fullDescription,
      features: a.features.join(', '),
      icon: a.icon || '',
    });
  }

  function handleSave(areaId: string) {
    startTransition(async () => {
      await updateServiceArea(areaId, {
        title: form.title,
        shortDescription: form.shortDescription,
        fullDescription: form.fullDescription,
        features: form.features.split(',').map((f) => f.trim()).filter(Boolean),
        icon: form.icon,
      });
      setEditing(null);
    });
  }

  function handleCreate() {
    startTransition(async () => {
      await createServiceArea(teamId, {
        title: form.title,
        shortDescription: form.shortDescription,
        fullDescription: form.fullDescription,
        features: form.features.split(',').map((f) => f.trim()).filter(Boolean),
        icon: form.icon,
      });
      setAdding(false);
      setForm({
        title: '',
        shortDescription: '',
        fullDescription: '',
        features: '',
        icon: '',
      });
    });
  }

  function handleDelete(areaId: string) {
    if (!confirm('Delete this service area?')) return;
    startTransition(async () => {
      await deleteServiceArea(areaId);
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-sans text-lg font-semibold text-gray-900">
          Service Areas ({areas.length})
        </h2>
        <button
          onClick={() => {
            setAdding(true);
            setForm({
              title: '',
              shortDescription: '',
              fullDescription: '',
              features: '',
              icon: '',
            });
          }}
          className="flex items-center gap-1 bg-primary-blue text-white text-sm font-sans px-3 py-1.5 rounded hover:bg-dark-blue transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Service Area
        </button>
      </div>

      <div className="space-y-3">
        {areas.map((a) => (
          <div key={a.id} className="bg-white border border-gray-200 rounded-lg p-4">
            {editing === a.id ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-sans text-xs text-gray-500 mb-1">Title</label>
                    <input
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-xs text-gray-500 mb-1">Short Description</label>
                    <input
                      value={form.shortDescription}
                      onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-sans text-xs text-gray-500 mb-1">Full Description</label>
                  <textarea
                    value={form.fullDescription}
                    onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
                    rows={3}
                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                  />
                </div>
                <div>
                  <label className="block font-sans text-xs text-gray-500 mb-1">Features (comma-separated)</label>
                  <input
                    value={form.features}
                    onChange={(e) => setForm({ ...form, features: e.target.value })}
                    placeholder="Feature 1, Feature 2, Feature 3"
                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                  />
                </div>
                <div>
                  <label className="block font-sans text-xs text-gray-500 mb-1">Icon (optional)</label>
                  <input
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave(a.id)}
                    disabled={isPending}
                    className="flex items-center gap-1 bg-primary-blue text-white text-sm px-3 py-1.5 rounded hover:bg-dark-blue disabled:opacity-50"
                  >
                    <Save className="w-3 h-3" /> Save
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="flex items-center gap-1 text-gray-600 text-sm px-3 py-1.5 rounded hover:bg-gray-100"
                  >
                    <X className="w-3 h-3" /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    {a.icon && (
                      <span className="font-sans text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                        {a.icon}
                      </span>
                    )}
                    <span className="font-sans font-semibold text-gray-900">{a.title}</span>
                    <span className="font-sans text-xs text-gray-400">({a.serviceAreaId})</span>
                  </div>
                  <p className="font-sans text-sm text-gray-500 mt-1">{a.shortDescription}</p>
                  {a.features.length > 0 && (
                    <p className="font-sans text-xs text-gray-400 mt-1">
                      Features: {a.features.join(', ')}
                    </p>
                  )}
                  {a.linkedTeam ? (
                    <div className="flex items-center gap-2 mt-2">
                      <Link
                        href={`/admin/teams/${a.linkedTeam.id}`}
                        className="font-sans text-xs text-primary-blue hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Edit Sub-Team Page
                      </Link>
                      <span
                        className={`text-xs font-sans px-1.5 py-0.5 rounded ${
                          a.linkedTeam.isPublished
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {a.linkedTeam.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  ) : a.link ? (
                    <p className="font-sans text-xs text-gray-400 mt-1">{a.link}</p>
                  ) : null}
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button
                    onClick={() => startEdit(a)}
                    className="p-1.5 text-gray-400 hover:text-primary-blue rounded hover:bg-gray-100"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(a.id)}
                    disabled={isPending}
                    className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-gray-100 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Add Form */}
        {adding && (
          <div className="bg-white border-2 border-dashed border-primary-blue rounded-lg p-4 space-y-3">
            <div>
              <label className="block font-sans text-xs text-gray-500 mb-1">Title</label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
              />
            </div>
            <div>
              <label className="block font-sans text-xs text-gray-500 mb-1">Short Description</label>
              <input
                value={form.shortDescription}
                onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
              />
            </div>
            <div>
              <label className="block font-sans text-xs text-gray-500 mb-1">Full Description</label>
              <textarea
                value={form.fullDescription}
                onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
                rows={3}
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
              />
            </div>
            <div>
              <label className="block font-sans text-xs text-gray-500 mb-1">Features (comma-separated)</label>
              <input
                value={form.features}
                onChange={(e) => setForm({ ...form, features: e.target.value })}
                placeholder="Feature 1, Feature 2, Feature 3"
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
              />
            </div>
            <div>
              <label className="block font-sans text-xs text-gray-500 mb-1">Icon (optional)</label>
              <input
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
              />
            </div>
            <p className="font-sans text-xs text-gray-400">
              A linked sub-team page will be auto-created as a draft.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleCreate}
                disabled={isPending || !form.title}
                className="flex items-center gap-1 bg-primary-blue text-white text-sm px-3 py-1.5 rounded hover:bg-dark-blue disabled:opacity-50"
              >
                <Plus className="w-3 h-3" /> Create
              </button>
              <button
                onClick={() => setAdding(false)}
                className="flex items-center gap-1 text-gray-600 text-sm px-3 py-1.5 rounded hover:bg-gray-100"
              >
                <X className="w-3 h-3" /> Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
