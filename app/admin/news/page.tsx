import { requireNewsAccess } from '@/lib/auth';
import { getAllPosts } from '@/lib/news';
import NewsListClient from '@/components/admin/NewsListClient';

export default async function AdminNewsPage() {
  await requireNewsAccess();

  const posts = getAllPosts({ includeDrafts: true });

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-sans text-2xl font-bold text-gray-900 mb-1">News Posts</h1>
          <p className="font-sans text-sm text-gray-500">Create, edit, and manage branch news articles.</p>
        </div>
      </div>
      <NewsListClient posts={posts} />
    </div>
  );
}
