-- AlterTable: make teamId optional
ALTER TABLE "WidgetInstance" ALTER COLUMN "teamId" DROP NOT NULL;

-- AddColumn: projectId
ALTER TABLE "WidgetInstance" ADD COLUMN "projectId" TEXT;

-- CreateIndex: unique constraint for project widgets
CREATE UNIQUE INDEX "WidgetInstance_projectId_widgetDefinitionId_key" ON "WidgetInstance"("projectId", "widgetDefinitionId");

-- CreateIndex: sort order index for project widgets
CREATE INDEX "WidgetInstance_projectId_sortOrder_idx" ON "WidgetInstance"("projectId", "sortOrder");

-- AddForeignKey: project relation
ALTER TABLE "WidgetInstance" ADD CONSTRAINT "WidgetInstance_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Insert project widget definitions
INSERT INTO "WidgetDefinition" ("id", "widgetType", "label", "description", "icon", "isEnabled") VALUES
  (gen_random_uuid()::text, 'project_header', 'Project Header', 'Gradient hero with status badge, project code, title, and description', 'FileText', true),
  (gen_random_uuid()::text, 'project_governance', 'Project Governance', '2-column grid showing department, branch, and governance roles', 'Users', true),
  (gen_random_uuid()::text, 'project_objectives', 'Project Objectives', 'List of objectives with icons, titles, and descriptions', 'Target', true),
  (gen_random_uuid()::text, 'project_financial', 'Financial Overview', 'Budget card with total budget, funding sources, and expenditure authority', 'DollarSign', true),
  (gen_random_uuid()::text, 'project_timeline', 'Project Timeline', 'Dates, progress bar, and milestone timeline', 'Calendar', true),
  (gen_random_uuid()::text, 'project_status_updates', 'Status Updates', 'Latest project status updates with timestamps', 'MessageSquare', true);
