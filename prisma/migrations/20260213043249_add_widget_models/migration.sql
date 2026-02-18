-- CreateTable
CREATE TABLE "WidgetDefinition" (
    "id" TEXT NOT NULL,
    "widgetType" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT NOT NULL DEFAULT 'LayoutGrid',
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "WidgetDefinition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WidgetInstance" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "widgetDefinitionId" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "config" JSONB,

    CONSTRAINT "WidgetInstance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WidgetDefinition_widgetType_key" ON "WidgetDefinition"("widgetType");

-- CreateIndex
CREATE INDEX "WidgetInstance_teamId_sortOrder_idx" ON "WidgetInstance"("teamId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "WidgetInstance_teamId_widgetDefinitionId_key" ON "WidgetInstance"("teamId", "widgetDefinitionId");

-- AddForeignKey
ALTER TABLE "WidgetInstance" ADD CONSTRAINT "WidgetInstance_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WidgetInstance" ADD CONSTRAINT "WidgetInstance_widgetDefinitionId_fkey" FOREIGN KEY ("widgetDefinitionId") REFERENCES "WidgetDefinition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
