import { requireProjectEditAccess } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ProjectDetailClient from '@/components/admin/ProjectDetailClient';

const PROJECT_DEFAULT_WIDGETS = [
  'project_header', 'project_governance', 'project_objectives',
  'project_financial', 'project_timeline', 'project_status_updates',
];

interface Props {
  params: Promise<{ projectId: string }>;
}

const projectInclude = {
  milestones: { orderBy: { sortOrder: 'asc' as const } },
  objectives: { orderBy: { sortOrder: 'asc' as const } },
  statusUpdates: { orderBy: { createdAt: 'desc' as const }, take: 10 },
  tags: { include: { tag: true } },
  widgetInstances: {
    orderBy: { sortOrder: 'asc' as const },
    include: { widgetDefinition: true },
  },
};

export default async function EditProjectPage({ params }: Props) {
  const { projectId } = await params;
  await requireProjectEditAccess(projectId);

  // eslint-disable-next-line prefer-const
  let [project, widgetDefinitions] = await Promise.all([
    prisma.project.findUnique({
      where: { id: projectId },
      include: projectInclude,
    }),
    prisma.widgetDefinition.findMany({
      where: { isEnabled: true },
      orderBy: { label: 'asc' },
    }),
  ]);

  if (!project) notFound();

  // Auto-create default widget instances if project has none
  if (project.widgetInstances.length === 0) {
    const defs = await prisma.widgetDefinition.findMany({
      where: { widgetType: { in: PROJECT_DEFAULT_WIDGETS } },
    });
    const defMap = new Map(defs.map((d) => [d.widgetType, d]));
    for (let i = 0; i < PROJECT_DEFAULT_WIDGETS.length; i++) {
      const def = defMap.get(PROJECT_DEFAULT_WIDGETS[i]);
      if (def) {
        await prisma.widgetInstance.create({
          data: { projectId: project.id, widgetDefinitionId: def.id, sortOrder: i },
        });
      }
    }
    // Re-fetch with widget instances populated
    project = await prisma.project.findUniqueOrThrow({
      where: { id: projectId },
      include: projectInclude,
    });
  }

  return <ProjectDetailClient project={project} widgetDefinitions={widgetDefinitions} />;
}
