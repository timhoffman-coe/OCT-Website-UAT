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
  widgetInstances: {
    orderBy: { sortOrder: 'asc' as const },
    include: { widgetDefinition: true },
  },
};

export default async function EditProjectPage({ params }: Props) {
  const { projectId } = await params;

  console.log('[EditProjectPage] Loading project:', projectId);

  try {
    await requireProjectEditAccess(projectId);
    console.log('[EditProjectPage] Auth passed');
  } catch (err) {
    console.error('[EditProjectPage] Auth failed:', err);
    throw err;
  }

  let project;
  let widgetDefinitions;
  try {
    [project, widgetDefinitions] = await Promise.all([
      prisma.project.findUnique({
        where: { id: projectId },
        include: projectInclude,
      }),
      prisma.widgetDefinition.findMany({
        where: { isEnabled: true },
        orderBy: { label: 'asc' },
      }),
    ]);
    console.log('[EditProjectPage] Fetched project:', !!project, 'widgets:', project?.widgetInstances?.length, 'definitions:', widgetDefinitions.length);
  } catch (err) {
    console.error('[EditProjectPage] Fetch failed:', err);
    throw err;
  }

  if (!project) notFound();

  // Auto-create default widget instances if project has none
  if (project.widgetInstances.length === 0) {
    console.log('[EditProjectPage] No widget instances, creating defaults...');
    try {
      const defs = await prisma.widgetDefinition.findMany({
        where: { widgetType: { in: PROJECT_DEFAULT_WIDGETS } },
      });
      console.log('[EditProjectPage] Found', defs.length, 'widget definitions for defaults');
      const defMap = new Map(defs.map((d) => [d.widgetType, d]));
      for (let i = 0; i < PROJECT_DEFAULT_WIDGETS.length; i++) {
        const def = defMap.get(PROJECT_DEFAULT_WIDGETS[i]);
        if (def) {
          await prisma.widgetInstance.create({
            data: { projectId: project.id, widgetDefinitionId: def.id, sortOrder: i },
          });
          console.log('[EditProjectPage] Created widget:', PROJECT_DEFAULT_WIDGETS[i]);
        } else {
          console.warn('[EditProjectPage] Missing definition for:', PROJECT_DEFAULT_WIDGETS[i]);
        }
      }
      // Re-fetch
      project = await prisma.project.findUniqueOrThrow({
        where: { id: projectId },
        include: projectInclude,
      });
      console.log('[EditProjectPage] Re-fetched, now has', project.widgetInstances.length, 'widgets');
    } catch (err) {
      console.error('[EditProjectPage] Widget creation failed:', err);
      throw err;
    }
  }

  console.log('[EditProjectPage] Rendering ProjectDetailClient');
  return <ProjectDetailClient project={project} widgetDefinitions={widgetDefinitions} />;
}
