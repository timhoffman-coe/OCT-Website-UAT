'use client';

import { useMemo, Component, type ReactNode } from 'react';
import LayoutEditor from './LayoutEditor';
import ProjectTagEditor from './ProjectTagEditor';

// Catches client errors and displays them instead of crashing + reloading
class ErrorCatcher extends Component<{ children: ReactNode }, { error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg m-8">
          <h2 className="font-bold text-red-800 text-lg mb-2">Client Error</h2>
          <pre className="text-sm text-red-700 whitespace-pre-wrap break-words">{this.state.error.message}</pre>
          <pre className="text-xs text-red-500 whitespace-pre-wrap break-words mt-4 max-h-64 overflow-auto">{this.state.error.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

type WidgetInstanceData = {
  id: string;
  sortOrder: number;
  config: unknown;
  widgetDefinition: {
    id: string;
    widgetType: string;
    label: string;
    icon: string;
  };
};

type WidgetDefinitionData = {
  id: string;
  widgetType: string;
  label: string;
  description: string | null;
  icon: string;
};

interface ProjectWithRelations {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  status: string;
  projectCode: string | null;
  isPublished: boolean;
  archivedAt: Date | null;
  department: string | null;
  branch: string | null;
  projectSponsor: string | null;
  projectManager: string | null;
  octProgramManager: string | null;
  octltRepresentative: string | null;
  programManagerBusiness: string | null;
  totalBudget: string | null;
  fundingSources: string | null;
  expenditureAuthority: string | null;
  startDate: Date | null;
  endDate: Date | null;
  progress: number;
  milestones: { id: string; name: string; date: Date | null; status: string; sortOrder: number }[];
  objectives: { id: string; iconName: string | null; title: string; description: string; sortOrder: number }[];
  statusUpdates: { id: string; content: string; createdAt: Date }[];
  tags: { tag: { id: string; name: string; slug: string } }[];
  widgetInstances: WidgetInstanceData[];
}

interface ProjectDetailClientProps {
  project: ProjectWithRelations;
  widgetDefinitions: WidgetDefinitionData[];
  readOnly?: boolean;
}

const EMPTY_ARRAY: never[] = [];

export default function ProjectDetailClient({ project, widgetDefinitions, readOnly = false }: ProjectDetailClientProps) {
  const projectData = useMemo(() => ({
    title: project.title,
    description: project.description,
    status: project.status,
    projectCode: project.projectCode,
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
  }), [project]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <h1 className="font-sans text-3xl font-bold text-primary-blue">
            {project.title}
          </h1>
          <span
            className={`text-xs font-sans px-2 py-0.5 rounded ${
              project.isPublished
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {project.isPublished ? 'Published' : 'Draft'}
          </span>
        </div>
        <p className="font-sans text-sm text-gray-500">
          /projects/{project.slug} &middot; Project Page
        </p>
        <div className="mt-3">
          <ProjectTagEditor
            projectId={project.id}
            initialTags={project.tags}
            readOnly={readOnly}
          />
        </div>
      </div>

      <ErrorCatcher>
      <LayoutEditor
        projectId={project.id}
        teamSlug={project.slug}
        teamName={project.title}
        teamShortName={project.projectCode || project.title}
        isPublished={project.isPublished}
        instances={project.widgetInstances}
        definitions={widgetDefinitions}
        pageTemplate="PROJECT"
        portfolios={EMPTY_ARRAY}
        teamTabs={EMPTY_ARRAY}
        trelloBoards={EMPTY_ARRAY}
        teamMembers={EMPTY_ARRAY}
        serviceAreas={EMPTY_ARRAY}
        accordionGroups={EMPTY_ARRAY}
        pageTitle={null}
        pageDescription={null}
        teamDescription={null}
        teamIconName={null}
        parentTeamName={null}
        parentTeamSlug={null}
        teamServices={EMPTY_ARRAY}
        teamInitiatives={EMPTY_ARRAY}
        teamContacts={EMPTY_ARRAY}
        teamQuickLinks={EMPTY_ARRAY}
        whoWeAreItems={EMPTY_ARRAY}
        keyInitiativeSlides={EMPTY_ARRAY}
        hasChildren={false}
        isArchived={!!project.archivedAt}
        readOnly={readOnly}
        projectData={projectData}
      />
      </ErrorCatcher>
    </div>
  );
}
