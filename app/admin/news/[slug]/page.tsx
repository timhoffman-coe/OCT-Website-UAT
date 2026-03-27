import { notFound } from 'next/navigation';
import { requireNewsAccess } from '@/lib/auth';
import { getPostBySlug } from '@/lib/news';
import NewsPostEditor from '@/components/admin/NewsPostEditor';

export default async function EditNewsPostPage({ params }: { params: Promise<{ slug: string }> }) {
  await requireNewsAccess();

  const { slug } = await params;
  const post = getPostBySlug(slug, { includeDrafts: true });

  if (!post) {
    notFound();
  }

  return (
    <div className="p-6 max-w-6xl">
      <h1 className="font-sans text-2xl font-bold text-gray-900 mb-4">Edit Post</h1>
      <NewsPostEditor mode="edit" post={post} />
    </div>
  );
}
