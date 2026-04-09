import { requireProjectAccess } from '@/lib/auth';
import NewProjectForm from '@/components/admin/NewProjectForm';

export default async function NewProjectPage() {
  await requireProjectAccess();

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="font-sans text-2xl font-bold text-gray-900 mb-1">New Project</h1>
      <p className="font-sans text-sm text-gray-500 mb-6">Create a new project. You can add details after creation.</p>
      <NewProjectForm />
    </div>
  );
}
