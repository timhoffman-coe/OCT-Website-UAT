import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/projects/ProjectCard';
import { fetchProjectsList } from '@/lib/data/fetch-project';
import { getAllTags } from '@/lib/actions/project-tag-actions';
import type { ProjectStatus } from '@prisma/client';
import Link from 'next/link';

export const revalidate = 3600;

export const metadata = {
  title: 'Projects | Open City & Technology',
  description: 'Explore projects and initiatives delivered by the Open City and Technology Branch.',
};

interface ProjectsPageProps {
  searchParams: Promise<{ tag?: string; status?: string; search?: string }>;
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const params = await searchParams;
  const projects = await fetchProjectsList({
    tagSlug: params.tag,
    status: params.status as ProjectStatus | undefined,
    search: params.search,
  });
  const tags = await getAllTags();

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />

      <main id="main-content" className="max-w-7xl mx-auto pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-[#003962] tracking-tight mb-2">Projects</h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Explore the projects and initiatives being delivered by the Open City and Technology Branch.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/projects"
            className={`text-xs px-3 py-1.5 rounded-md font-semibold transition-colors ${!params.tag && !params.status ? 'bg-[#003962] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
          >
            All
          </Link>
          {tags.map((tag) => (
            <Link
              key={tag.slug}
              href={`/projects?tag=${tag.slug}`}
              className={`text-xs px-3 py-1.5 rounded-md font-semibold transition-colors ${params.tag === tag.slug ? 'bg-[#003962] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            >
              {tag.name}
            </Link>
          ))}
        </div>

        {/* Project Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                slug={project.slug}
                title={project.title}
                description={project.description}
                status={project.status}
                progress={project.progress}
                tags={project.tags}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No projects found.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
