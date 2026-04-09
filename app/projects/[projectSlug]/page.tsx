import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WidgetRenderer from '@/components/widgets/WidgetRenderer';
import { DEFAULT_PROJECT_WIDGETS } from '@/components/widgets/WidgetRenderer';
import { fetchProjectBySlug } from '@/lib/data/fetch-project';
import { canEditProject } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import type { WidgetDataBag } from '@/components/widgets/WidgetRenderer';

export const revalidate = 3600;

interface ProjectPageProps {
  params: Promise<{ projectSlug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { projectSlug } = await params;
  const project = await fetchProjectBySlug(projectSlug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} | Projects | Open City & Technology`,
    description: project.description || `Details for project ${project.title}`,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { projectSlug } = await params;
  const project = await fetchProjectBySlug(projectSlug);

  if (!project || (!project.isPublished && !(await canEditProject(project.id)))) {
    notFound();
  }

  const canEdit = await canEditProject(project.id);

  // Fetch widget instances for this project
  const widgetInstances = await prisma.widgetInstance.findMany({
    where: { projectId: project.id },
    orderBy: { sortOrder: 'asc' },
    include: { widgetDefinition: { select: { widgetType: true } } },
  });

  // Use widget order from DB, or fall back to defaults
  const widgetOrder = widgetInstances.length > 0
    ? widgetInstances.map((wi) => wi.widgetDefinition.widgetType)
    : [...DEFAULT_PROJECT_WIDGETS];

  // Build WidgetDataBag from project data
  const dataBag: WidgetDataBag = {
    projectTitle: project.title,
    projectDescription: project.description,
    projectStatus: project.status,
    projectCode: project.projectCode,
    projectId: project.id,
    canEditProject: canEdit,
    department: project.department,
    branch: project.branch,
    projectSponsor: project.projectSponsor,
    projectManager: project.projectManager,
    octProgramManager: project.octProgramManager,
    octltRepresentative: project.octltRepresentative,
    programManagerBusiness: project.programManagerBusiness,
    totalBudget: project.totalBudget,
    fundingSources: project.fundingSources,
    expenditureAuthority: project.expenditureAuthority,
    startDate: project.startDate,
    endDate: project.endDate,
    progress: project.progress,
    milestones: project.milestones,
    objectives: project.objectives,
    statusUpdates: project.statusUpdates,
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <WidgetRenderer widgetOrder={widgetOrder} data={dataBag} />
      <Footer />
    </div>
  );
}
