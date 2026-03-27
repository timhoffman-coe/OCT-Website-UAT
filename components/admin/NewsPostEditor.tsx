'use client';

import { useState, useTransition, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createNewsPost, updateNewsPost } from '@/lib/actions/news-actions';
import { NewsPost, NewsCategory } from '@/lib/news.types';
import RichTextEditor from './RichTextEditor';
import { Save, Send, Upload, ArrowLeft, Image as ImageIcon, Calendar, User, Tag, Star } from 'lucide-react';

const CATEGORIES: NewsCategory[] = ['Strategy', 'Infrastructure', 'Community', 'Spotlight'];

const CATEGORY_STYLES: Record<NewsCategory, string> = {
  Strategy: 'bg-[#005087]/10 text-[#005087] border-[#005087]/20',
  Infrastructure: 'bg-[#0081BC]/10 text-[#0081BC] border-[#0081BC]/20',
  Community: 'bg-[#1D8348]/10 text-[#1D8348] border-[#1D8348]/20',
  Spotlight: 'bg-[#F5A623]/10 text-[#93700F] border-[#F5A623]/20',
};

interface NewsPostEditorProps {
  mode: 'create' | 'edit';
  post?: NewsPost;
}

export default function NewsPostEditor({ mode, post }: NewsPostEditorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: post?.title ?? '',
    date: post?.date ?? new Date().toISOString().split('T')[0],
    category: post?.category ?? ('Strategy' as NewsCategory),
    description: post?.description ?? '',
    image: post?.image ?? '',
    featured: post?.featured ?? false,
    author: post?.author ?? '',
    content: post?.content ?? '',
    draft: post?.draft ?? true,
  });

  const updateField = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch('/api/cms/news/upload-image', { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      updateField('image', data.path);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = (asDraft: boolean) => {
    if (!form.title.trim()) { setError('Title is required'); return; }
    if (!form.author.trim()) { setError('Author is required'); return; }
    setError('');

    const data = { ...form, draft: asDraft };
    startTransition(async () => {
      try {
        if (mode === 'create') {
          const result = await createNewsPost(data);
          router.push(`/admin/news/${result.slug}`);
        } else if (post) {
          const result = await updateNewsPost(post.slug, data);
          if (result.slug !== post.slug) {
            router.push(`/admin/news/${result.slug}`);
          }
        }
        setSaved(true);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to save');
      }
    });
  };

  return (
    <div className="space-y-5">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push('/admin/news')}
          className="flex items-center gap-1.5 text-sm font-sans text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to posts
        </button>
        <div className="flex items-center gap-2">
          {saved && (
            <span className="text-xs font-sans text-green-600 font-medium mr-2">Saved</span>
          )}
          <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded ${
            form.draft ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
          }`}>
            {form.draft ? 'Draft' : 'Published'}
          </span>
          <button
            onClick={() => handleSave(true)}
            disabled={isPending}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-sans font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 shadow-sm"
          >
            <Save size={14} />
            Save Draft
          </button>
          <button
            onClick={() => handleSave(false)}
            disabled={isPending}
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-sans font-semibold text-white bg-[#005087] rounded-lg hover:bg-[#193A5A] transition-all disabled:opacity-50 shadow-sm hover:shadow"
          >
            <Send size={14} />
            Publish
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-600 font-sans">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Main Content — Left */}
        <div className="lg:col-span-8 space-y-5">
          {/* Title */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <input
              type="text"
              value={form.title}
              onChange={e => updateField('title', e.target.value)}
              placeholder="Article title..."
              className="w-full text-2xl font-sans font-bold text-gray-900 placeholder:text-gray-300 border-0 p-0 focus:ring-0 outline-none"
            />
            <div className="mt-3">
              <textarea
                value={form.description}
                onChange={e => updateField('description', e.target.value)}
                rows={2}
                placeholder="Write a short summary that appears on cards and in search results..."
                className="w-full text-sm font-sans text-gray-500 placeholder:text-gray-300 border-0 p-0 focus:ring-0 outline-none resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Rich Text Editor */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100">
              <p className="font-sans text-xs font-semibold text-gray-400 uppercase tracking-wider">Article Content</p>
            </div>
            <div className="p-1">
              <RichTextEditor
                content={form.content}
                onChange={(md) => updateField('content', md)}
                placeholder="Start writing your article..."
              />
            </div>
          </div>
        </div>

        {/* Sidebar — Right */}
        <div className="lg:col-span-4 space-y-5">
          {/* Hero Image */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
              <ImageIcon size={14} className="text-gray-400" />
              <p className="font-sans text-xs font-semibold text-gray-400 uppercase tracking-wider">Hero Image</p>
            </div>
            <div className="p-4">
              {form.image ? (
                <div className="relative group mb-3">
                  <div className="aspect-[16/10] w-full rounded-lg overflow-hidden bg-gray-100">
                    <img src={form.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <button
                    onClick={() => updateField('image', '')}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1 bg-black/60 text-white text-[10px] font-bold rounded backdrop-blur"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-[16/10] w-full rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-[#005087] hover:bg-[#005087]/5 transition-all mb-3"
                >
                  <Upload size={24} className="text-gray-300 mb-2" />
                  <p className="font-sans text-xs text-gray-400 font-medium">Click to upload</p>
                  <p className="font-sans text-[10px] text-gray-300 mt-0.5">PNG, JPG, WebP up to 5MB</p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageUpload}
                className="hidden"
              />
              {form.image && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-sans font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <Upload size={12} />
                  {uploading ? 'Uploading...' : 'Replace Image'}
                </button>
              )}
              <input
                type="text"
                value={form.image}
                onChange={e => updateField('image', e.target.value)}
                placeholder="Or paste image URL..."
                className="w-full mt-2 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-sans text-gray-500 focus:ring-2 focus:ring-[#005087]/30 focus:border-[#005087] outline-none transition-all"
              />
            </div>
          </div>

          {/* Post Settings */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
              <Tag size={14} className="text-gray-400" />
              <p className="font-sans text-xs font-semibold text-gray-400 uppercase tracking-wider">Post Settings</p>
            </div>
            <div className="p-4 space-y-4">
              {/* Category */}
              <div>
                <label className="font-sans text-xs font-medium text-gray-600 mb-1.5 block">Category</label>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => updateField('category', cat)}
                      className={`px-3 py-2 rounded-lg text-xs font-sans font-semibold border transition-all ${
                        form.category === cat
                          ? CATEGORY_STYLES[cat] + ' border-current'
                          : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Author */}
              <div>
                <label className="font-sans text-xs font-medium text-gray-600 mb-1.5 flex items-center gap-1.5">
                  <User size={12} />
                  Author
                </label>
                <input
                  type="text"
                  value={form.author}
                  onChange={e => updateField('author', e.target.value)}
                  placeholder="Author name"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans focus:ring-2 focus:ring-[#005087]/30 focus:border-[#005087] outline-none transition-all"
                />
              </div>

              {/* Date */}
              <div>
                <label className="font-sans text-xs font-medium text-gray-600 mb-1.5 flex items-center gap-1.5">
                  <Calendar size={12} />
                  Publish Date
                </label>
                <input
                  type="date"
                  value={form.date}
                  onChange={e => updateField('date', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm font-sans focus:ring-2 focus:ring-[#005087]/30 focus:border-[#005087] outline-none transition-all"
                />
              </div>

              {/* Featured */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => updateField('featured', !form.featured)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    form.featured ? 'bg-[#005087]' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 rounded-full bg-white transition-transform shadow-sm ${
                      form.featured ? 'translate-x-4' : 'translate-x-0.5'
                    }`}
                  />
                </button>
                <label className="font-sans text-sm text-gray-700 flex items-center gap-1.5 cursor-pointer" onClick={() => updateField('featured', !form.featured)}>
                  <Star size={13} className={form.featured ? 'text-[#005087]' : 'text-gray-400'} />
                  Featured post
                </label>
              </div>
            </div>
          </div>

          {/* Slug Info (edit mode only) */}
          {mode === 'edit' && post && (
            <div className="bg-gray-50 rounded-xl border border-gray-200 px-5 py-3">
              <p className="font-sans text-[10px] uppercase tracking-wider font-semibold text-gray-400 mb-1">Permalink</p>
              <p className="font-sans text-xs text-gray-500 font-mono">/news/{post.slug}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
