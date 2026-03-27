import { requireNewsAccess } from '@/lib/auth';
import NewsPostEditor from '@/components/admin/NewsPostEditor';

export default async function NewNewsPostPage() {
  await requireNewsAccess();

  return (
    <div className="p-6 max-w-6xl">
      <h1 className="font-sans text-2xl font-bold text-gray-900 mb-4">New Post</h1>
      <NewsPostEditor mode="create" />
    </div>
  );
}
