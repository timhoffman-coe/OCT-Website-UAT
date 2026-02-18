'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { createPortfolio, updatePortfolio, deletePortfolio } from '@/lib/actions/portfolio-actions';
import { availableIcons } from '@/lib/icon-resolver';
import { Pencil, Trash2, Plus, Save, X, ExternalLink } from 'lucide-react';

interface Portfolio {
  id: string;
  iconName: string;
  title: string;
  description: string;
  href: string;
  sortOrder: number;
  linkedTeamId: string | null;
  linkedTeam: { id: string; teamName: string; isPublished: boolean } | null;
  subpage: { id: string } | null;
}

export default function PortfolioEditor({
  teamId,
  portfolios,
}: {
  teamId: string;
  portfolios: Portfolio[];
}) {
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState({
    iconName: 'Server',
    title: '',
    description: '',
  });

  function startEdit(p: Portfolio) {
    setEditing(p.id);
    setForm({ iconName: p.iconName, title: p.title, description: p.description });
  }

  function handleSave(portfolioId: string) {
    startTransition(async () => {
      await updatePortfolio(portfolioId, form);
      setEditing(null);
    });
  }

  function handleCreate() {
    startTransition(async () => {
      await createPortfolio(teamId, form);
      setAdding(false);
      setForm({ iconName: 'Server', title: '', description: '' });
    });
  }

  function handleDelete(portfolioId: string) {
    if (!confirm('Delete this portfolio and its linked sub-team page? This cannot be undone.')) return;
    startTransition(async () => {
      await deletePortfolio(portfolioId);
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-sans text-lg font-semibold text-gray-900">
          Portfolios ({portfolios.length})
        </h2>
        <button
          onClick={() => {
            setAdding(true);
            setForm({ iconName: 'Server', title: '', description: '' });
          }}
          className="flex items-center gap-1 bg-primary-blue text-white text-sm font-sans px-3 py-1.5 rounded hover:bg-dark-blue transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Portfolio
        </button>
      </div>

      <div className="space-y-3">
        {portfolios.map((p) => (
          <div key={p.id} className="bg-white border border-gray-200 rounded-lg p-4">
            {editing === p.id ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-sans text-xs text-gray-500 mb-1">Icon</label>
                    <select
                      value={form.iconName}
                      onChange={(e) => setForm({ ...form, iconName: e.target.value })}
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                    >
                      {availableIcons.map((icon) => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-sans text-xs text-gray-500 mb-1">Title</label>
                    <input
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-sans text-xs text-gray-500 mb-1">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={2}
                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave(p.id)}
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
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                      {p.iconName}
                    </span>
                    <span className="font-sans font-semibold text-gray-900">{p.title}</span>
                  </div>
                  <p className="font-sans text-sm text-gray-500 mt-1">{p.description}</p>
                  {p.linkedTeam ? (
                    <div className="flex items-center gap-2 mt-2">
                      <Link
                        href={`/admin/teams/${p.linkedTeam.id}`}
                        className="font-sans text-xs text-primary-blue hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Edit Sub-Team Page
                      </Link>
                      <span
                        className={`text-xs font-sans px-1.5 py-0.5 rounded ${
                          p.linkedTeam.isPublished
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {p.linkedTeam.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  ) : (
                    <p className="font-sans text-xs text-gray-400 mt-1">{p.href}</p>
                  )}
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button
                    onClick={() => startEdit(p)}
                    className="p-1.5 text-gray-400 hover:text-primary-blue rounded hover:bg-gray-100"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
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
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-sans text-xs text-gray-500 mb-1">Icon</label>
                <select
                  value={form.iconName}
                  onChange={(e) => setForm({ ...form, iconName: e.target.value })}
                  className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                >
                  {availableIcons.map((icon) => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-sans text-xs text-gray-500 mb-1">Title</label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                />
              </div>
            </div>
            <div>
              <label className="block font-sans text-xs text-gray-500 mb-1">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={2}
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
