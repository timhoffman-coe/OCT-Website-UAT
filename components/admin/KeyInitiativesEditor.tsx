'use client';

import { useState, useTransition } from 'react';
import { createKeyInitiativeSlide, updateKeyInitiativeSlide, deleteKeyInitiativeSlide } from '@/lib/actions/key-initiative-actions';
import { Pencil, Trash2, Plus, Save, X } from 'lucide-react';

interface KeyInitiativeSlide {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  imageAlt: string;
  sortOrder: number;
}

export default function KeyInitiativesEditor({
  teamId,
  slides,
}: {
  teamId: string;
  slides: KeyInitiativeSlide[];
}) {
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [form, setForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    imageAlt: '',
  });

  function startEdit(slide: KeyInitiativeSlide) {
    setEditing(slide.id);
    setForm({
      title: slide.title,
      description: slide.description,
      imageUrl: slide.imageUrl || '',
      imageAlt: slide.imageAlt,
    });
  }

  function handleSave(slideId: string) {
    startTransition(async () => {
      await updateKeyInitiativeSlide(slideId, {
        title: form.title,
        description: form.description,
        imageUrl: form.imageUrl || undefined,
        imageAlt: form.imageAlt,
      });
      setEditing(null);
    });
  }

  function handleCreate() {
    startTransition(async () => {
      await createKeyInitiativeSlide(teamId, {
        title: form.title,
        description: form.description,
        imageUrl: form.imageUrl || undefined,
        imageAlt: form.imageAlt || undefined,
      });
      setAdding(false);
      setForm({ title: '', description: '', imageUrl: '', imageAlt: '' });
    });
  }

  function handleDelete(slideId: string) {
    if (!confirm('Delete this slide?')) return;
    startTransition(async () => {
      await deleteKeyInitiativeSlide(slideId);
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-sans text-lg font-semibold text-gray-900">
          Initiative Slides ({slides.length})
        </h2>
        <button
          onClick={() => {
            setAdding(true);
            setForm({ title: '', description: '', imageUrl: '', imageAlt: '' });
          }}
          className="flex items-center gap-1 bg-primary-blue text-white text-sm font-sans px-3 py-1.5 rounded hover:bg-dark-blue transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Slide
        </button>
      </div>

      <div className="space-y-3">
        {slides.map((slide) => (
          <div key={slide.id} className="bg-white border border-gray-200 rounded-lg p-4">
            {editing === slide.id ? (
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
                    <label className="block font-sans text-xs text-gray-500 mb-1">Image URL (optional)</label>
                    <input
                      value={form.imageUrl}
                      onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-xs text-gray-500 mb-1">Image Alt Text</label>
                    <input
                      value={form.imageAlt}
                      onChange={(e) => setForm({ ...form, imageAlt: e.target.value })}
                      placeholder="Description of the image"
                      className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave(slide.id)}
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
                  <span className="font-sans font-semibold text-gray-900">{slide.title}</span>
                  <p className="font-sans text-sm text-gray-500 mt-1">{slide.description}</p>
                  {slide.imageUrl && (
                    <p className="font-sans text-xs text-gray-400 mt-1">{slide.imageUrl}</p>
                  )}
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button
                    onClick={() => startEdit(slide)}
                    className="p-1.5 text-gray-400 hover:text-primary-blue rounded hover:bg-gray-100"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(slide.id)}
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
                <label className="block font-sans text-xs text-gray-500 mb-1">Image URL (optional)</label>
                <input
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                />
              </div>
              <div>
                <label className="block font-sans text-xs text-gray-500 mb-1">Image Alt Text (optional)</label>
                <input
                  value={form.imageAlt}
                  onChange={(e) => setForm({ ...form, imageAlt: e.target.value })}
                  placeholder="Description of the image"
                  className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm font-sans"
                />
              </div>
            </div>
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
