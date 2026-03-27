'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { NewsPost, NewsCategory } from '@/lib/news.types';
import { deleteNewsPost, publishNewsPost, unpublishNewsPost } from '@/lib/actions/news-actions';
import { Plus, Pencil, Trash2, Eye, EyeOff, Newspaper, FileText, Send, Clock } from 'lucide-react';

const CATEGORY_STYLES: Record<NewsCategory, string> = {
  Strategy: 'bg-[#005087]/10 text-[#005087]',
  Infrastructure: 'bg-[#0081BC]/10 text-[#0081BC]',
  Community: 'bg-[#1D8348]/10 text-[#1D8348]',
  Spotlight: 'bg-[#F5A623]/10 text-[#93700F]',
};

export default function NewsListClient({ posts: initialPosts }: { posts: NewsPost[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  const publishedCount = posts.filter(p => !p.draft).length;
  const draftCount = posts.filter(p => p.draft).length;
  const featuredPost = posts.find(p => p.featured);
  const nonFeaturedPosts = posts.filter(p => !p.featured);

  const handleDelete = (slug: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setError('');
    startTransition(async () => {
      try {
        await deleteNewsPost(slug);
        setPosts(prev => prev.filter(p => p.slug !== slug));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete post');
      }
    });
  };

  const handleTogglePublish = (slug: string, isDraft: boolean) => {
    setError('');
    startTransition(async () => {
      try {
        if (isDraft) {
          await publishNewsPost(slug);
        } else {
          await unpublishNewsPost(slug);
        }
        setPosts(prev =>
          prev.map(p => (p.slug === slug ? { ...p, draft: !isDraft } : p))
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update post');
      }
    });
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-6">
          <Newspaper size={36} className="text-gray-300" />
        </div>
        <h2 className="font-sans text-xl font-bold text-gray-900 mb-2">No stories yet</h2>
        <p className="font-sans text-sm text-gray-500 mb-6 text-center max-w-sm">
          Create your first news article to share branch updates, milestones, and spotlights with the team.
        </p>
        <Link
          href="/admin/news/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#005087] text-white rounded-lg text-sm font-sans font-semibold hover:bg-[#193A5A] transition-all hover:shadow-lg"
        >
          <Plus size={18} />
          Create First Post
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-lg bg-[#005087]/10 flex items-center justify-center">
            <FileText size={20} className="text-[#005087]" />
          </div>
          <div>
            <p className="font-sans text-2xl font-black text-gray-900">{posts.length}</p>
            <p className="font-sans text-[11px] uppercase tracking-wider font-semibold text-gray-400">Total Posts</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-lg bg-green-50 flex items-center justify-center">
            <Send size={20} className="text-green-600" />
          </div>
          <div>
            <p className="font-sans text-2xl font-black text-gray-900">{publishedCount}</p>
            <p className="font-sans text-[11px] uppercase tracking-wider font-semibold text-gray-400">Published</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-lg bg-yellow-50 flex items-center justify-center">
            <Clock size={20} className="text-yellow-600" />
          </div>
          <div>
            <p className="font-sans text-2xl font-black text-gray-900">{draftCount}</p>
            <p className="font-sans text-[11px] uppercase tracking-wider font-semibold text-gray-400">Drafts</p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-sans text-lg font-bold text-gray-900">All Articles</h2>
        <Link
          href="/admin/news/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#005087] text-white rounded-lg text-sm font-sans font-semibold hover:bg-[#193A5A] transition-all hover:shadow-lg active:scale-95"
        >
          <Plus size={16} />
          New Post
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-600 font-sans">{error}</p>
        </div>
      )}

      {/* Featured Post Hero */}
      {featuredPost && (
        <Link href={`/admin/news/${featuredPost.slug}`} className="block group">
          <div className="relative aspect-[21/9] w-full rounded-xl overflow-hidden bg-gray-200">
            {featuredPost.image && (
              <img
                src={featuredPost.image}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#005087] text-white rounded">
                Featured
              </span>
              {featuredPost.draft ? (
                <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-yellow-400 text-yellow-900 rounded">
                  Draft
                </span>
              ) : (
                <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-green-400 text-green-900 rounded">
                  Published
                </span>
              )}
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur rounded-lg text-xs font-sans font-semibold text-gray-900">
                <Pencil size={12} />
                Edit
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <span className={`inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded mb-3 ${CATEGORY_STYLES[featuredPost.category]}`}>
                {featuredPost.category}
              </span>
              <h3 className="font-sans text-2xl lg:text-3xl font-bold text-white mb-2 leading-tight">
                {featuredPost.title}
              </h3>
              <p className="font-sans text-sm text-white/70">
                {featuredPost.author} &middot; {formatDate(featuredPost.date)}
              </p>
            </div>
          </div>
        </Link>
      )}

      {/* Post Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {nonFeaturedPosts.map(post => (
          <div
            key={post.slug}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
          >
            {/* Card Image */}
            <Link href={`/admin/news/${post.slug}`} className="block relative aspect-[16/10] bg-gray-100 overflow-hidden">
              {post.image ? (
                <img src={post.image} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                  <Newspaper size={32} className="text-gray-200" />
                </div>
              )}
              {/* Category badge */}
              <span className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded backdrop-blur-sm ${CATEGORY_STYLES[post.category]}`}>
                {post.category}
              </span>
              {/* Status badge */}
              {post.draft ? (
                <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-yellow-400/90 text-yellow-900 rounded backdrop-blur-sm">
                  Draft
                </span>
              ) : (
                <span className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-green-400/90 text-green-900 rounded backdrop-blur-sm">
                  Live
                </span>
              )}
            </Link>

            {/* Card Body */}
            <div className="p-4 flex flex-col flex-1">
              <Link href={`/admin/news/${post.slug}`} className="group">
                <h3 className="font-sans text-sm font-bold text-gray-900 leading-snug mb-1.5 line-clamp-2 group-hover:text-[#005087] transition-colors">
                  {post.title}
                </h3>
              </Link>
              <p className="font-sans text-xs text-gray-500 mb-2">
                {post.author} &middot; {formatDate(post.date)}
              </p>
              <p className="font-sans text-xs text-gray-400 leading-relaxed line-clamp-2 mb-4">
                {post.description}
              </p>

              {/* Actions */}
              <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={() => handleTogglePublish(post.slug, post.draft)}
                  disabled={isPending}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-sans font-semibold transition-colors disabled:opacity-50 ${
                    post.draft
                      ? 'text-[#005087] hover:bg-[#005087]/10'
                      : 'text-yellow-700 hover:bg-yellow-50'
                  }`}
                >
                  {post.draft ? <Eye size={12} /> : <EyeOff size={12} />}
                  {post.draft ? 'Publish' : 'Unpublish'}
                </button>
                <div className="flex items-center gap-1">
                  <Link
                    href={`/admin/news/${post.slug}`}
                    className="p-1.5 text-gray-400 hover:text-[#005087] hover:bg-[#005087]/10 rounded transition-colors"
                    title="Edit"
                  >
                    <Pencil size={13} />
                  </Link>
                  <button
                    onClick={() => handleDelete(post.slug, post.title)}
                    disabled={isPending}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
