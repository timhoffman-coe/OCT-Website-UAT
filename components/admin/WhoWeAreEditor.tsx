'use client';

import { useState, useTransition } from 'react';
import { createWhoWeAreItem, updateWhoWeAreItem, deleteWhoWeAreItem } from '@/lib/actions/who-we-are-actions';
import { Pencil, Trash2, Plus, Save, X } from 'lucide-react';

interface WhoWeAreItem {
  id: string;
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
  sortOrder: number;
}

export default function WhoWeAreEditor({
  teamId,
  items,
}: {
  teamId: string;
  items: WhoWeAreItem[];
}) {
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState({
    title: '',
    description: '',
    linkText: '',
    linkUrl: '',
  });

  function startEdit(item: WhoWeAreItem) {
    setEditing(item.id);
    setForm({
      title: item.title,
      description: item.description,
      linkText: item.linkText,
      linkUrl: item.linkUrl,
    });
  }

  function handleSave(itemId: string) {
    startTransition(async () => {
      await updateWhoWeAreItem(itemId, {
        title: form.title,
        description: form.description,
        linkText: form.linkText || 'Learn More',
        linkUrl: form.linkUrl,
      });
      setEditing(null);
    });
  }

  function handleCreate() {
    startTransition(async () => {
      await createWhoWeAreItem(teamId, {
        title: form.title,
        description: form.description,
        linkText: form.linkText || undefined,
        linkUrl: form.linkUrl,
      });
      setAdding(false);
      setForm({ title: '', description: '', linkText: '', linkUrl: '' });
    });
  }

  function handleDelete(itemId: string) {
    if (!confirm('Delete this item?')) return;
    startTransition(async () => {
      await deleteWhoWeAreItem(itemId);
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-sans text-lg font-semibold text-gray-900">
          Accordion Items ({items.length})
        </h2>
        <button
          onClick={() => {
            setAdding(true);
            setForm({ title: '', description: '', linkText: '', linkUrl: '' });
          }}
          className="flex items-center gap-1 bg-primary-blue text-white text-sm font-sans px-3 py-1.5 rounded hover:bg-dark-blue transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4">
            {editing === item.id ? (
              <div className="space-y-3">
                <div>
                  <label className="block font-sans text-xs text-gray-500 mb-1">Title</label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                  />
                </div>
                <div>
                  <label className="block font-sans text-xs text-gray-500 mb-1">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={3}
                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-sans text-xs text-gray-500 mb-1">Link Text</label>
                    <input
                      value={form.linkText}
                      onChange={(e) => setForm({ ...form, linkText: e.target.value })}
                      placeholder="Learn More"
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-xs text-gray-500 mb-1">Link URL</label>
                    <input
                      value={form.linkUrl}
                      onChange={(e) => setForm({ ...form, linkUrl: e.target.value })}
                      placeholder="/some-page"
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave(item.id)}
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
                  <span className="font-sans font-semibold text-gray-900">{item.title}</span>
                  <p className="font-sans text-sm text-gray-500 mt-1">{item.description}</p>
                  <p className="font-sans text-xs text-gray-400 mt-1">
                    {item.linkText} → {item.linkUrl}
                  </p>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button
                    onClick={() => startEdit(item)}
                    className="p-1.5 text-gray-400 hover:text-primary-blue rounded hover:bg-gray-100"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
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
              <label className="block font-sans text-xs text-gray-500 mb-1">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-sans text-xs text-gray-500 mb-1">Link Text (optional)</label>
                <input
                  value={form.linkText}
                  onChange={(e) => setForm({ ...form, linkText: e.target.value })}
                  placeholder="Learn More"
                  className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                />
              </div>
              <div>
                <label className="block font-sans text-xs text-gray-500 mb-1">Link URL</label>
                <input
                  value={form.linkUrl}
                  onChange={(e) => setForm({ ...form, linkUrl: e.target.value })}
                  placeholder="/some-page"
                  className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCreate}
                disabled={isPending || !form.title || !form.linkUrl}
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
