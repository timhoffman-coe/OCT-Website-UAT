-- AlterEnum
ALTER TYPE "PageTemplate" ADD VALUE 'SUB_TEAM';

-- AlterTable
ALTER TABLE "AuditLog" ADD COLUMN     "ipAddress" TEXT,
ADD COLUMN     "userAgent" TEXT;

-- AlterTable
ALTER TABLE "Portfolio" ADD COLUMN     "linkedTeamId" TEXT;

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "archivedAt" TIMESTAMP(3),
ADD COLUMN     "iconName" TEXT,
ADD COLUMN     "showStatus" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "RoadmapPermission" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoadmapPermission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamService" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "items" TEXT[],
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TeamService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamInitiative" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TeamInitiative_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamContact" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TeamContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamQuickLink" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "isSecure" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TeamQuickLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WhoWeAreItem" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "linkText" TEXT NOT NULL DEFAULT 'Learn More',
    "linkUrl" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "WhoWeAreItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KeyInitiativeSlide" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "imageAlt" TEXT NOT NULL DEFAULT '',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "KeyInitiativeSlide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoadmapSection" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoadmapSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoadmapProject" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "startYear" INTEGER NOT NULL,
    "endYear" INTEGER NOT NULL,
    "startQuarter" INTEGER NOT NULL,
    "endQuarter" INTEGER NOT NULL,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoadmapProject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RoadmapPermission_userId_key" ON "RoadmapPermission"("userId");

-- CreateIndex
CREATE INDEX "TeamService_teamId_idx" ON "TeamService"("teamId");

-- CreateIndex
CREATE INDEX "TeamInitiative_teamId_idx" ON "TeamInitiative"("teamId");

-- CreateIndex
CREATE INDEX "TeamContact_teamId_idx" ON "TeamContact"("teamId");

-- CreateIndex
CREATE INDEX "TeamQuickLink_teamId_idx" ON "TeamQuickLink"("teamId");

-- CreateIndex
CREATE INDEX "WhoWeAreItem_teamId_idx" ON "WhoWeAreItem"("teamId");

-- CreateIndex
CREATE INDEX "KeyInitiativeSlide_teamId_idx" ON "KeyInitiativeSlide"("teamId");

-- CreateIndex
CREATE INDEX "RoadmapProject_sectionId_idx" ON "RoadmapProject"("sectionId");

-- CreateIndex
CREATE INDEX "AccordionGroup_teamId_idx" ON "AccordionGroup"("teamId");

-- CreateIndex
CREATE INDEX "AuditLog_userId_idx" ON "AuditLog"("userId");

-- CreateIndex
CREATE INDEX "AuditLog_entity_idx" ON "AuditLog"("entity");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_linkedTeamId_key" ON "Portfolio"("linkedTeamId");

-- CreateIndex
CREATE INDEX "Portfolio_teamId_idx" ON "Portfolio"("teamId");

-- CreateIndex
CREATE INDEX "ServiceArea_teamId_idx" ON "ServiceArea"("teamId");

-- CreateIndex
CREATE INDEX "Team_parentId_idx" ON "Team"("parentId");

-- CreateIndex
CREATE INDEX "TeamMember_teamId_idx" ON "TeamMember"("teamId");

-- CreateIndex
CREATE INDEX "TeamPermission_teamId_idx" ON "TeamPermission"("teamId");

-- CreateIndex
CREATE INDEX "TeamTab_teamId_idx" ON "TeamTab"("teamId");

-- CreateIndex
CREATE INDEX "TrelloBoard_teamId_idx" ON "TrelloBoard"("teamId");

-- AddForeignKey
ALTER TABLE "RoadmapPermission" ADD CONSTRAINT "RoadmapPermission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_linkedTeamId_fkey" FOREIGN KEY ("linkedTeamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamService" ADD CONSTRAINT "TeamService_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamInitiative" ADD CONSTRAINT "TeamInitiative_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamContact" ADD CONSTRAINT "TeamContact_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamQuickLink" ADD CONSTRAINT "TeamQuickLink_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WhoWeAreItem" ADD CONSTRAINT "WhoWeAreItem_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeyInitiativeSlide" ADD CONSTRAINT "KeyInitiativeSlide_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoadmapProject" ADD CONSTRAINT "RoadmapProject_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "RoadmapSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
