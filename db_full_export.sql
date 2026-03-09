--
-- Full database export (schema + data)
-- Generated: 2026-03-09T15:18:08.793Z
-- Usage: psql -d <dbname> -f db_full_export.sql
--

-- Enum: PageTemplate
DO $$ BEGIN
  CREATE TYPE "PageTemplate" AS ENUM ('ITS_TEAM', 'SECTION', 'SUB_TEAM', 'CUSTOM');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Enum: Role
DO $$ BEGIN
  CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'TEAM_ADMIN', 'VIEWER');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Table: AccordionGroup
CREATE TABLE IF NOT EXISTS "AccordionGroup" (
  "id" TEXT NOT NULL,
  "teamId" TEXT,
  "groupId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- Table: AccordionLink
CREATE TABLE IF NOT EXISTS "AccordionLink" (
  "id" TEXT NOT NULL,
  "groupId" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "href" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- Table: AuditLog
CREATE TABLE IF NOT EXISTS "AuditLog" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "action" TEXT NOT NULL,
  "entity" TEXT NOT NULL,
  "entityId" TEXT NOT NULL,
  "changes" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "ipAddress" TEXT,
  "userAgent" TEXT
);

-- Table: DiagramLink
CREATE TABLE IF NOT EXISTS "DiagramLink" (
  "id" TEXT NOT NULL,
  "teamTabId" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "href" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- Table: Portfolio
CREATE TABLE IF NOT EXISTS "Portfolio" (
  "id" TEXT NOT NULL,
  "teamId" TEXT NOT NULL,
  "iconName" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "href" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "linkedTeamId" TEXT
);

-- Table: PortfolioSubpage
CREATE TABLE IF NOT EXISTS "PortfolioSubpage" (
  "id" TEXT NOT NULL,
  "portfolioId" TEXT NOT NULL,
  "parentTeam" TEXT NOT NULL,
  "parentTeamHref" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "iconName" TEXT NOT NULL,
  "showStatus" BOOLEAN NOT NULL DEFAULT true
);

-- Table: ServiceArea
CREATE TABLE IF NOT EXISTS "ServiceArea" (
  "id" TEXT NOT NULL,
  "teamId" TEXT NOT NULL,
  "serviceAreaId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "shortDescription" TEXT NOT NULL,
  "fullDescription" TEXT NOT NULL,
  "features" TEXT[],
  "icon" TEXT,
  "link" TEXT,
  "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- Table: SubpageContact
CREATE TABLE IF NOT EXISTS "SubpageContact" (
  "id" TEXT NOT NULL,
  "subpageId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- Table: SubpageInitiative
CREATE TABLE IF NOT EXISTS "SubpageInitiative" (
  "id" TEXT NOT NULL,
  "subpageId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "href" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- Table: SubpageQuickLink
CREATE TABLE IF NOT EXISTS "SubpageQuickLink" (
  "id" TEXT NOT NULL,
  "subpageId" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "href" TEXT NOT NULL,
  "isSecure" BOOLEAN NOT NULL DEFAULT false,
  "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- Table: SubpageService
CREATE TABLE IF NOT EXISTS "SubpageService" (
  "id" TEXT NOT NULL,
  "subpageId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "items" TEXT[],
  "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- Table: Team
CREATE TABLE IF NOT EXISTS "Team" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "teamName" TEXT NOT NULL,
  "teamShortName" TEXT NOT NULL,
  "pageTemplate" "PageTemplate" NOT NULL DEFAULT 'ITS_TEAM'::"PageTemplate",
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "isPublished" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "pageTitle" TEXT,
  "pageDescription" TEXT,
  "iconName" TEXT,
  "showStatus" BOOLEAN NOT NULL DEFAULT false,
  "parentId" TEXT
);

-- Table: TeamContact
CREATE TABLE IF NOT EXISTS "TeamContact" (
  "id" TEXT NOT NULL,
  "teamId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- Table: TeamInitiative
CREATE TABLE IF NOT EXISTS "TeamInitiative" (
  "id" TEXT NOT NULL,
  "teamId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "href" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- Table: TeamMember
CREATE TABLE IF NOT EXISTS "TeamMember" (
  "id" TEXT NOT NULL,
  "teamId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- Table: TeamPermission
CREATE TABLE IF NOT EXISTS "TeamPermission" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "teamId" TEXT NOT NULL
);

-- Table: TeamQuickLink
CREATE TABLE IF NOT EXISTS "TeamQuickLink" (
  "id" TEXT NOT NULL,
  "teamId" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "href" TEXT NOT NULL,
  "isSecure" BOOLEAN NOT NULL DEFAULT false,
  "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- Table: TeamService
CREATE TABLE IF NOT EXISTS "TeamService" (
  "id" TEXT NOT NULL,
  "teamId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "items" TEXT[],
  "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- Table: TeamTab
CREATE TABLE IF NOT EXISTS "TeamTab" (
  "id" TEXT NOT NULL,
  "teamId" TEXT NOT NULL,
  "tabId" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "videoTitle" TEXT NOT NULL,
  "videoDescription" TEXT NOT NULL,
  "videoUrl" TEXT NOT NULL,
  "diagramsTitle" TEXT NOT NULL,
  "diagramsDescription" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- Table: TrelloBoard
CREATE TABLE IF NOT EXISTS "TrelloBoard" (
  "id" TEXT NOT NULL,
  "teamId" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "href" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- Table: User
CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "role" "Role" NOT NULL DEFAULT 'VIEWER'::"Role",
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Table: WidgetDefinition
CREATE TABLE IF NOT EXISTS "WidgetDefinition" (
  "id" TEXT NOT NULL,
  "widgetType" TEXT NOT NULL,
  "label" TEXT NOT NULL,
  "description" TEXT,
  "icon" TEXT NOT NULL DEFAULT 'LayoutGrid'::text,
  "isEnabled" BOOLEAN NOT NULL DEFAULT true
);

-- Table: WidgetInstance
CREATE TABLE IF NOT EXISTS "WidgetInstance" (
  "id" TEXT NOT NULL,
  "teamId" TEXT NOT NULL,
  "widgetDefinitionId" TEXT NOT NULL,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "config" JSONB
);

-- Primary Keys
ALTER TABLE "AccordionGroup" ADD CONSTRAINT "AccordionGroup_pkey" PRIMARY KEY ("id") ;
ALTER TABLE "AccordionLink" ADD CONSTRAINT "AccordionLink_pkey" PRIMARY KEY ("id") ;
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id") ;
ALTER TABLE "DiagramLink" ADD CONSTRAINT "DiagramLink_pkey" PRIMARY KEY ("id") ;
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id") ;
ALTER TABLE "PortfolioSubpage" ADD CONSTRAINT "PortfolioSubpage_pkey" PRIMARY KEY ("id") ;
ALTER TABLE "ServiceArea" ADD CONSTRAINT "ServiceArea_pkey" PRIMARY KEY ("id") ;
ALTER TABLE "SubpageContact" ADD CONSTRAINT "SubpageContact_pkey" PRIMARY KEY ("id") ;
ALTER TABLE "SubpageInitiative" ADD CONSTRAINT "SubpageInitiative_pkey" PRIMARY KEY ("id") ;
ALTER TABLE "SubpageQuickLink" ADD CONSTRAINT "SubpageQuickLink_pkey" PRIMARY KEY ("id") ;
ALTER TABLE "SubpageService" ADD CONSTRAINT "SubpageService_pkey" PRIMARY KEY ("id") ;
ALTER TABLE "Team" ADD CONSTRAINT "Team_pkey" PRIMARY KEY ("id") ;
ALTER TABLE "TeamContact" ADD CONSTRAINT "TeamContact_pkey" PRIMARY KEY ("id") ;
ALTER TABLE "TeamInitiative" ADD CONSTRAINT "TeamInitiative_pkey" PRIMARY KEY ("id") ;
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id") ;
ALTER TABLE "TeamPermission" ADD CONSTRAINT "TeamPermission_pkey" PRIMARY KEY ("id") ;
ALTER TABLE "TeamQuickLink" ADD CONSTRAINT "TeamQuickLink_pkey" PRIMARY KEY ("id") ;
ALTER TABLE "TeamService" ADD CONSTRAINT "TeamService_pkey" PRIMARY KEY ("id") ;
ALTER TABLE "TeamTab" ADD CONSTRAINT "TeamTab_pkey" PRIMARY KEY ("id") ;
ALTER TABLE "TrelloBoard" ADD CONSTRAINT "TrelloBoard_pkey" PRIMARY KEY ("id") ;
ALTER TABLE "User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id") ;
ALTER TABLE "WidgetDefinition" ADD CONSTRAINT "WidgetDefinition_pkey" PRIMARY KEY ("id") ;
ALTER TABLE "WidgetInstance" ADD CONSTRAINT "WidgetInstance_pkey" PRIMARY KEY ("id") ;

-- Unique Constraints

-- Indexes
CREATE INDEX "AccordionGroup_teamId_idx" ON public."AccordionGroup" USING btree ("teamId");
CREATE INDEX "AuditLog_createdAt_idx" ON public."AuditLog" USING btree ("createdAt");
CREATE INDEX "AuditLog_entity_idx" ON public."AuditLog" USING btree (entity);
CREATE INDEX "AuditLog_userId_idx" ON public."AuditLog" USING btree ("userId");
CREATE INDEX "Portfolio_teamId_idx" ON public."Portfolio" USING btree ("teamId");
CREATE INDEX "ServiceArea_teamId_idx" ON public."ServiceArea" USING btree ("teamId");
CREATE INDEX "Team_parentId_idx" ON public."Team" USING btree ("parentId");
CREATE INDEX "TeamContact_teamId_idx" ON public."TeamContact" USING btree ("teamId");
CREATE INDEX "TeamInitiative_teamId_idx" ON public."TeamInitiative" USING btree ("teamId");
CREATE INDEX "TeamMember_teamId_idx" ON public."TeamMember" USING btree ("teamId");
CREATE INDEX "TeamPermission_teamId_idx" ON public."TeamPermission" USING btree ("teamId");
CREATE INDEX "TeamQuickLink_teamId_idx" ON public."TeamQuickLink" USING btree ("teamId");
CREATE INDEX "TeamService_teamId_idx" ON public."TeamService" USING btree ("teamId");
CREATE INDEX "TeamTab_teamId_idx" ON public."TeamTab" USING btree ("teamId");
CREATE INDEX "TrelloBoard_teamId_idx" ON public."TrelloBoard" USING btree ("teamId");
CREATE INDEX "WidgetInstance_teamId_sortOrder_idx" ON public."WidgetInstance" USING btree ("teamId", "sortOrder");

-- Foreign Keys
ALTER TABLE "AccordionGroup" ADD CONSTRAINT "AccordionGroup_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "AccordionLink" ADD CONSTRAINT "AccordionLink_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "AccordionGroup"("id") ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON UPDATE CASCADE ON DELETE RESTRICT;
ALTER TABLE "DiagramLink" ADD CONSTRAINT "DiagramLink_teamTabId_fkey" FOREIGN KEY ("teamTabId") REFERENCES "TeamTab"("id") ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_linkedTeamId_fkey" FOREIGN KEY ("linkedTeamId") REFERENCES "Team"("id") ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE "PortfolioSubpage" ADD CONSTRAINT "PortfolioSubpage_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "ServiceArea" ADD CONSTRAINT "ServiceArea_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "SubpageContact" ADD CONSTRAINT "SubpageContact_subpageId_fkey" FOREIGN KEY ("subpageId") REFERENCES "PortfolioSubpage"("id") ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "SubpageInitiative" ADD CONSTRAINT "SubpageInitiative_subpageId_fkey" FOREIGN KEY ("subpageId") REFERENCES "PortfolioSubpage"("id") ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "SubpageQuickLink" ADD CONSTRAINT "SubpageQuickLink_subpageId_fkey" FOREIGN KEY ("subpageId") REFERENCES "PortfolioSubpage"("id") ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "SubpageService" ADD CONSTRAINT "SubpageService_subpageId_fkey" FOREIGN KEY ("subpageId") REFERENCES "PortfolioSubpage"("id") ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "Team" ADD CONSTRAINT "Team_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Team"("id") ON UPDATE CASCADE ON DELETE SET NULL;
ALTER TABLE "TeamContact" ADD CONSTRAINT "TeamContact_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "TeamInitiative" ADD CONSTRAINT "TeamInitiative_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "TeamPermission" ADD CONSTRAINT "TeamPermission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "TeamPermission" ADD CONSTRAINT "TeamPermission_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "TeamQuickLink" ADD CONSTRAINT "TeamQuickLink_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "TeamService" ADD CONSTRAINT "TeamService_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "TeamTab" ADD CONSTRAINT "TeamTab_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "TrelloBoard" ADD CONSTRAINT "TrelloBoard_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "WidgetInstance" ADD CONSTRAINT "WidgetInstance_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE "WidgetInstance" ADD CONSTRAINT "WidgetInstance_widgetDefinitionId_fkey" FOREIGN KEY ("widgetDefinitionId") REFERENCES "WidgetDefinition"("id") ON UPDATE CASCADE ON DELETE RESTRICT;

-- ============================================================
-- DATA (FK checks deferred for safe insert ordering)
-- ============================================================

SET session_replication_role = replica;

-- User: 1 rows
INSERT INTO "User" ("id", "email", "name", "role", "createdAt", "updatedAt") VALUES ('cmlvenss100006en28dunyuef', 'dev@edmonton.ca', 'Dev Admin', 'SUPER_ADMIN', '2026-02-20T21:31:55.568Z', '2026-02-20T21:31:55.568Z');

-- WidgetDefinition: 14 rows
INSERT INTO "WidgetDefinition" ("id", "widgetType", "label", "description", "icon", "isEnabled") VALUES ('cmlvent82006s6en2wvs0n3lk', 'page_header', 'Page Header', 'Team name banner with support request button', 'Type', TRUE);
INSERT INTO "WidgetDefinition" ("id", "widgetType", "label", "description", "icon", "isEnabled") VALUES ('cmlvent87006t6en262m69xxi', 'portfolios', 'Our Portfolios', 'Grid of portfolio cards with icons, descriptions, and links', 'LayoutGrid', TRUE);
INSERT INTO "WidgetDefinition" ("id", "widgetType", "label", "description", "icon", "isEnabled") VALUES ('cmlvent8b006u6en2kdi07gw4', 'team_tabs', 'Team Overviews', 'Tabbed interface with video embeds and diagram links', 'Columns', TRUE);
INSERT INTO "WidgetDefinition" ("id", "widgetType", "label", "description", "icon", "isEnabled") VALUES ('cmlvent8f006v6en28yd2qbrv', 'accordion_links', 'Important Links', 'Collapsible accordion groups of categorized links', 'List', TRUE);
INSERT INTO "WidgetDefinition" ("id", "widgetType", "label", "description", "icon", "isEnabled") VALUES ('cmlvent8k006w6en2rahxh51w', 'work_tracking', 'Work Tracking Boards', 'Grid of external board cards (Trello, etc.)', 'ClipboardList', TRUE);
INSERT INTO "WidgetDefinition" ("id", "widgetType", "label", "description", "icon", "isEnabled") VALUES ('cmlvent8o006x6en2y4n9h6x5', 'ongoing_projects', 'Ongoing Projects', 'Hero block highlighting current projects with CTA', 'FileText', TRUE);
INSERT INTO "WidgetDefinition" ("id", "widgetType", "label", "description", "icon", "isEnabled") VALUES ('cmlvent8t006y6en25wevvyur', 'budget_spend', 'Budget & Spend', 'Budget overview card with link to financial reports', 'BarChart3', TRUE);
INSERT INTO "WidgetDefinition" ("id", "widgetType", "label", "description", "icon", "isEnabled") VALUES ('cmlvent8x006z6en2xjn2dp9g', 'team_members', 'Who We Are', 'Team member cards grid with contact info', 'Users', TRUE);
INSERT INTO "WidgetDefinition" ("id", "widgetType", "label", "description", "icon", "isEnabled") VALUES ('cmlvent9100706en2675mk5m8', 'service_areas', 'Service Areas', 'Service area cards with modal detail views', 'Layers', TRUE);
INSERT INTO "WidgetDefinition" ("id", "widgetType", "label", "description", "icon", "isEnabled") VALUES ('cmlvent9500716en28iuvvrf6', 'subteam_header', 'Sub-Team Header', 'Hero section with icon, title, and breadcrumb', 'LayoutGrid', TRUE);
INSERT INTO "WidgetDefinition" ("id", "widgetType", "label", "description", "icon", "isEnabled") VALUES ('cmlvent9a00726en242whxcpi', 'subteam_services', 'Our Services', 'Grid of service cards with bullet items', 'Briefcase', TRUE);
INSERT INTO "WidgetDefinition" ("id", "widgetType", "label", "description", "icon", "isEnabled") VALUES ('cmlvent9e00736en2hiuybqjx', 'subteam_initiatives', 'Current Initiatives', 'Initiative cards with descriptions and links', 'Rocket', TRUE);
INSERT INTO "WidgetDefinition" ("id", "widgetType", "label", "description", "icon", "isEnabled") VALUES ('cmlvent9i00746en23d9tce9k', 'subteam_contacts', 'Key Contacts', 'Sidebar contact cards with roles and emails', 'Users', TRUE);
INSERT INTO "WidgetDefinition" ("id", "widgetType", "label", "description", "icon", "isEnabled") VALUES ('cmlvent9n00756en2hbba30tu', 'subteam_quick_links', 'Quick Links', 'Sidebar quick links with descriptions', 'Link', TRUE);

-- Team: 34 rows
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmlvent6600616en2hs0z7mic', 'application-technology-services', 'Application Technology Services', 'Application Technology Services', 'SECTION', 3, TRUE, '2026-02-20T21:31:56.141Z', '2026-03-09T13:49:19.232Z', 'Application Technology Services', 'IT business solutions encompass a range of software, applications, programs, and services designed to assist in achieving business goals. From 311 to internal tools, we develop, implement, and support the applications that power City services.', NULL, FALSE, NULL);
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmlvent6i00686en299x0kho2', 'corporate-information-security', 'Corporate Information Security', 'Info Security', 'SECTION', 4, TRUE, '2026-02-20T21:31:56.152Z', '2026-02-20T21:31:56.152Z', 'Corporate Information Security', 'Protecting the City''s data, assets, and information from cyber threats. We safeguard citizen privacy and ensure the integrity of municipal operations against evolving risks through comprehensive security services, incident response, and continuous monitoring.', NULL, FALSE, NULL);
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmlvent6t006f6en2cjwul3e0', 'technology-planning', 'Technology Planning', 'Tech Planning', 'SECTION', 5, TRUE, '2026-02-20T21:31:56.162Z', '2026-02-20T21:31:56.162Z', 'Technology Planning', 'The Technology Planning and Business Engagement section enables the City to make informed technology decisions that provide value to our citizens, businesses and partners.', NULL, FALSE, NULL);
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmlvent73006k6en269eb9fx0', 'integrated-technology-solutions', 'Integrated Technology Solutions', 'ITS', 'SECTION', 6, TRUE, '2026-02-20T21:31:56.174Z', '2026-02-20T21:31:56.174Z', 'Integrated Technology Solutions', 'IT infrastructure serves as the underlying structure that supports all services and solutions within the City''s technology environment. We ensure that technology resources are always available and operate efficiently, forming the foundation for all digital services.', NULL, FALSE, NULL);
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmlventin008e6en2fbfvks30', 'network-services', 'Network Services', 'Network Services', 'SUB_TEAM', 0, TRUE, '2026-02-20T21:31:56.591Z', '2026-02-20T21:31:56.591Z', NULL, 'We provide the digital foundation for the City of Edmonton. Our team manages the core connectivity, security perimeter, and traffic management infrastructure that connects over 300 City facilities.', 'Network', TRUE, 'cmlvensul00016en27ro3bxrt');
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmlventl4008v6en2iz7ygp0g', 'data-centre', 'Data Centre', 'Data Centre', 'SUB_TEAM', 1, TRUE, '2026-02-20T21:31:56.680Z', '2026-02-20T21:31:56.680Z', NULL, 'We manage the City''s physical computing infrastructure, including on-premises data centres and colocation facilities, ensuring reliable, secure hosting for all City applications and services.', 'Building2', TRUE, 'cmlvensul00016en27ro3bxrt');
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmlventns009c6en24cffno5p', 'voice-mobility-iot', 'Voice, Mobility & IoT', 'Voice, Mobility & IoT', 'SUB_TEAM', 2, TRUE, '2026-02-20T21:31:56.776Z', '2026-02-20T21:31:56.776Z', NULL, 'We provide comprehensive communication services including wireline and VoIP phone systems, cellular wireless, machine-to-machine connectivity, and the City''s LoRaWAN IoT network infrastructure.', 'Phone', TRUE, 'cmlvensul00016en27ro3bxrt');
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmlventqv009t6en2pk5blh5c', 'service-desk', 'Service Desk', 'Service Desk', 'SUB_TEAM', 0, TRUE, '2026-02-20T21:31:56.887Z', '2026-02-20T21:31:56.887Z', NULL, 'We provide IT assistance via tickets and calls, offering remote troubleshooting and support to help City employees stay productive. Our team is available to assist with technical issues, service requests, and general IT inquiries.', 'Headphones', TRUE, 'cmlvenswo000s6en253u5ag6s');
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmlventtf00aa6en2l4uc4syn', 'desktop-support', 'Desktop Support', 'Desktop Support', 'SUB_TEAM', 1, TRUE, '2026-02-20T21:31:56.979Z', '2026-02-20T21:31:56.979Z', NULL, 'We provide in-person break-fix services for hardware and software issues across City facilities. Our field technicians are available to resolve complex issues that cannot be handled remotely.', 'Wrench', TRUE, 'cmlvenswo000s6en253u5ag6s');
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmlventvy00ar6en2gmjolwjb', 'desktop-administration', 'Desktop Administration', 'Desktop Administration', 'SUB_TEAM', 2, TRUE, '2026-02-20T21:31:57.070Z', '2026-02-20T21:31:57.070Z', NULL, 'We manage approximately 12,000 computing devices across the City, including operating system deployment, patch management, software distribution, and configuration management.', 'Monitor', TRUE, 'cmlvenswo000s6en253u5ag6s');
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmlventyy00b86en2yzuio14r', 'database', 'Database Management', 'Database Management', 'SUB_TEAM', 0, TRUE, '2026-02-20T21:31:57.178Z', '2026-02-20T21:31:57.178Z', NULL, 'We support the City''s database environment, ensuring data services are reliable, secure, and performant. Our team manages SQL Server, Oracle, and PostgreSQL platforms across the enterprise.', 'Database', TRUE, 'cmlvensya001e6en2la9l1uja');
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmlvenu2000bp6en2302jxreg', 'server-solutions', 'Server Solutions & Automation', 'Server Solutions & Automation', 'SUB_TEAM', 1, TRUE, '2026-02-20T21:31:57.288Z', '2026-02-20T21:31:57.288Z', NULL, 'We manage the City''s server infrastructure including operating systems, storage, printing, and data protection services, with a focus on automation and process improvements.', 'Server', TRUE, 'cmlvensya001e6en2la9l1uja');
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmlvenu5100c66en2zn8wq782', 'virtualization', 'Virtualization', 'Virtualization', 'SUB_TEAM', 2, TRUE, '2026-02-20T21:31:57.397Z', '2026-02-20T21:31:57.397Z', NULL, 'We manage the City''s virtualization platforms including VMware, Hyper-V, and container services, enabling efficient resource utilization and flexible infrastructure deployment.', 'Layers', TRUE, 'cmlvensya001e6en2la9l1uja');
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmmj7jxw500003ueeyg5y9xla', 'posse', 'Application Support for POSSE', 'POSSE', 'SUB_TEAM', 0, FALSE, '2026-03-09T13:19:26.549Z', '2026-03-09T13:19:26.549Z', NULL, 'Technical support, development and maintenance of the POSSE platform. POSSE (Public One Stop Service) is a powerful configurable enterprise platform and workflow engine that automates, integrates, monitors and enforces business process rules.

The term "configurable" simply means that POSSE can be changed to meet the needs of different business areas. POSSE is a corporate system used by all city departments, citizens and other external business partners.', NULL, FALSE, 'cmlvent6600616en2hs0z7mic');
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmmj7jxy300063uee60wsktdi', 'tacs', 'Application Support for TACS', 'TACS', 'SUB_TEAM', 1, FALSE, '2026-03-09T13:19:26.619Z', '2026-03-09T13:19:26.619Z', NULL, 'Provide full-in-house design and in-house application development for the Taxation and Collection System (TACS) application for the City of Edmonton.

The usage of TACS in the organization is to assess, bill, and collect property taxes and is responsible for approximately 60% of the City''s operating budget.', NULL, FALSE, 'cmlvent6600616en2hs0z7mic');
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmmj7jxys000c3ueewgkwk8v1', 'weblogic', 'Application Support for WebLogic', 'WebLogic', 'SUB_TEAM', 2, FALSE, '2026-03-09T13:19:26.644Z', '2026-03-09T13:19:26.644Z', NULL, 'Technical support and maintenance of the infrastructure. The Oracle Weblogic Server is a JAVA virtual machine that at the City of Edmonton is used to run Oracle Fusion Middleware.

The middleware allows for the development, deployment, and execution of Oracle applications (AMIS, CACTIS, Debentures, ETDS, MVCIS, PAC, TACS, TOPS).', NULL, FALSE, 'cmlvent6600616en2hs0z7mic');
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmmj7jxzh000i3ueec18blqgh', 'google-workspace', 'Application Support for Google Workspace', 'Google Workspace', 'SUB_TEAM', 3, FALSE, '2026-03-09T13:19:26.668Z', '2026-03-09T13:19:26.668Z', NULL, 'Google Workspace is a collection of cloud computing, productivity and collaboration tools, software and products developed and marketed by Google.

It provides comprehensive communication, collaboration, cloud storage, and content creation capabilities for all City of Edmonton employees.', NULL, FALSE, 'cmlvent6600616en2hs0z7mic');
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmmj7jy07000o3ueekqqkaldu', 'branch-solutions', 'Business Solutions for City Branches', 'Branch Solutions', 'SUB_TEAM', 4, FALSE, '2026-03-09T13:19:26.695Z', '2026-03-09T13:19:26.695Z', NULL, 'Technical support for the identified business areas'' applications. Services include troubleshooting, problem-solving, software updates, application upgrades and maintenance, application roadmapping, and low-code/no-code application creation.

We work directly with City branches to deliver tailored solutions that meet their unique business needs.', NULL, FALSE, 'cmlvent6600616en2hs0z7mic');
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmmj7jy0v000u3uee8wlua9uu', 'rapid-development', 'Rapid Development Services', 'Rapid Dev', 'SUB_TEAM', 5, FALSE, '2026-03-09T13:19:26.719Z', '2026-03-09T13:19:26.719Z', NULL, 'Rapid Development Services empower you to transform your business with unprecedented speed and efficiency. By leveraging an agile, iterative approach and cutting-edge tools like low-code platforms, we deliver the robust functionality of custom development without the traditional overhead.

Experience the power of streamlined workflows, captivating apps, and optimized processes, all within a fraction of the time and cost. Unlock your organization''s full potential and accelerate your path to success with Rapid Development Services.', NULL, FALSE, 'cmlvent6600616en2hs0z7mic');
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmmj7jy1k00103ueeiv6ao6ic', 'advisory-services', 'Cyber Security Advisory Services', 'Advisory Services', 'SUB_TEAM', 0, FALSE, '2026-03-09T13:19:26.744Z', '2026-03-09T13:19:26.744Z', NULL, 'The Cyber Security Advisory Services and Architecture team provides cyber security advice to all City of Edmonton (CoE) IT Service providers on CoE Cyber security specifications and best practices; and to all CoE business units for security requirements, risk assessments, scorecards, and risk acceptance.

You will need to reach out to the Cyber Security Advisory Services team if you are implementing or significantly changing the security posture of an existing system either on-premise or in the cloud where the system deals with: Operational Technology, politically and reputationally sensitive public facing systems, providing or managing access to CoE systems for non-CoE personnel, a system that is operationally critical or if it is going to contain Confidential (including FOIP) or Restricted information.', NULL, FALSE, 'cmlvent6i00686en299x0kho2');
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmmj7jy2800163ueeglmedj16', 'directory-services', 'Directory Services', 'Directory Services', 'SUB_TEAM', 1, FALSE, '2026-03-09T13:19:26.768Z', '2026-03-09T13:19:26.768Z', NULL, 'The Corporate Directory Service is the backbone for all Corporate network and technology assets. Without this critical service, employees and partners would not be able to access Corporate technology resources and assets.

We provide comprehensive directory and access management services to ensure secure and reliable access to all City technology resources.', NULL, FALSE, 'cmlvent6i00686en299x0kho2');
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmmj7jy32001c3ueeizv8zlfe', 'continuity-recovery', 'Continuity and Recovery Services', 'Continuity & Recovery', 'SUB_TEAM', 2, FALSE, '2026-03-09T13:19:26.798Z', '2026-03-09T13:19:26.798Z', NULL, 'Supporting the City in its delivery of uninterrupted critical services, Open City and Technology is responsible for ensuring that the technology required to deliver the CoE''s most critical services are available when needed most.

This is achieved through the Information Technology Disaster Recovery Program which aligns to the corporate Business Continuity Management Program.', NULL, FALSE, 'cmlvent6i00686en299x0kho2');
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmmj7jy3r001i3ueeey4vu4t9', 'incident-response', 'Cybersecurity Investigation & Incident Response', 'Incident Response', 'SUB_TEAM', 3, FALSE, '2026-03-09T13:19:26.823Z', '2026-03-09T13:19:26.823Z', NULL, 'Providing comprehensive cybersecurity investigation, incident response, and security operations services to protect the City from cyber threats.

We operate an internal SOC monitoring threats entering via email, network, endpoint, or cloud, working closely with Mandiant MDR SOC to remediate threats 24x7.', NULL, FALSE, 'cmlvent6i00686en299x0kho2');
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmmj7jy4e001o3ueekwomiocu', 'governance-compliance', 'Governance, Risk, Compliance, and Awareness', 'GRC & Awareness', 'SUB_TEAM', 4, FALSE, '2026-03-09T13:19:26.846Z', '2026-03-09T13:19:26.846Z', NULL, 'Providing governance, risk management, compliance, and awareness services to establish and maintain a strong cybersecurity posture across the City.

We create policies, deliver training, assess risks, and coordinate audits to ensure the City meets cybersecurity requirements and best practices.', NULL, FALSE, 'cmlvent6i00686en299x0kho2');
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmmj7jy51001u3ueemn6kud8t', 'identity-access', 'Digital Identity & Access Management', 'IAM', 'SUB_TEAM', 5, FALSE, '2026-03-09T13:19:26.869Z', '2026-03-09T13:19:26.869Z', NULL, 'Digital Identity & Access Management (IAM) operations provide comprehensive identity and access services for the City''s workforce.

From onboarding to offboarding, we manage digital identities and access rights, implementing modern security controls like Multi-Factor Authentication across all externally available workforce access.', NULL, FALSE, 'cmlvent6i00686en299x0kho2');
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmmj7jy5t00203uee0zur9xqv', 'technology-investment', 'Technology Investment & Financial Management', 'Tech Investment', 'SUB_TEAM', 0, FALSE, '2026-03-09T13:19:26.897Z', '2026-03-09T13:19:26.897Z', NULL, 'Technology Investment is responsible for the intake and governance of multi-stakeholder and complex technology projects (commonly referred to as Tier A). By taking an investment focused approach, our team helps align Tier A (over $75,000) projects to the City''s strategies and objectives, ensuring that the value from these projects is communicated and realized.

The team also manages the governance of Tier A technology projects by facilitating and coordinating regularly recurring meetings between directors, branch managers, and executives across the City of Edmonton.', NULL, FALSE, 'cmlvent6t006f6en2cjwul3e0');
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmmj7jy6e00263ueeqaum029o', 'business-engagement', 'Business Engagement', 'Business Engagement', 'SUB_TEAM', 1, FALSE, '2026-03-09T13:19:26.918Z', '2026-03-09T13:19:26.918Z', NULL, 'This team is the first point of contact for new technology initiatives and provides services such as business case consulting and review, strategy and portfolio management, and organization change management.

We oversee and manage the OCT intake process for all technology requests (Tier A, B, & C) and the OCT concurrence process with focus on building business engagement with stakeholders across the city.', NULL, FALSE, 'cmlvent6t006f6en2cjwul3e0');
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmmj7jy77002c3uee8xb2mznd', 'vendor-management', 'Vendor Management Office', 'VMO', 'SUB_TEAM', 2, FALSE, '2026-03-09T13:19:26.947Z', '2026-03-09T13:19:26.947Z', NULL, 'The Vendor Management Office (VMO) is responsible for the effective and proactive management of all Technology Related Vendors (TRV) and contracts associated with the delivery of computer hardware, software, and supporting services for the City of Edmonton.

The VMO currently supports, negotiates, and manages approximately 500 contracts over 400 different vendors and is responsible for approximately $30M annually in transactions on behalf of OCT and branches across the City.', NULL, FALSE, 'cmlvent6t006f6en2cjwul3e0');
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmmj7jy7y002i3ueeubtodm5a', 'it-asset-management', 'IT Asset Management', 'ITAM', 'SUB_TEAM', 3, FALSE, '2026-03-09T13:19:26.974Z', '2026-03-09T13:19:26.974Z', NULL, 'IT asset management (ITAM) provides an accurate account of technology asset lifecycle costs and risks in order to maximize the business value of technology strategy, architecture, funding, contractual and sourcing decisions.

This service includes financial, contractual and inventory services to support life cycle management and strategic decision making for the IT environment. Assets include all elements of software and hardware that are found in the business environment.', NULL, FALSE, 'cmlvent6t006f6en2cjwul3e0');
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmlvensul00016en27ro3bxrt', 'data-technology', 'Data Technology', 'Data Technology', 'ITS_TEAM', 0, TRUE, '2026-02-20T21:31:55.714Z', '2026-02-20T21:31:56.185Z', NULL, NULL, NULL, FALSE, 'cmlvent73006k6en269eb9fx0');
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmlvenswo000s6en253u5ag6s', 'partner-experience', 'Partner Experience', 'Partner Experience', 'ITS_TEAM', 1, TRUE, '2026-02-20T21:31:55.793Z', '2026-02-20T21:31:56.190Z', NULL, NULL, NULL, FALSE, 'cmlvent73006k6en269eb9fx0');
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmlvensya001e6en2la9l1uja', 'technology-infrastructure-operations', 'Technology Infrastructure Operations', 'Infrastructure Operations', 'ITS_TEAM', 2, TRUE, '2026-02-20T21:31:55.853Z', '2026-02-20T21:31:56.193Z', NULL, NULL, NULL, FALSE, 'cmlvent73006k6en269eb9fx0');
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmlvent7q006q6en244qn4p3h', 'service-delivery', 'Service Delivery and Analytics', 'Service Delivery', 'ITS_TEAM', 3, TRUE, '2026-02-20T21:31:56.197Z', '2026-02-20T21:31:56.197Z', NULL, NULL, NULL, FALSE, 'cmlvent73006k6en269eb9fx0');
INSERT INTO "Team" ("id", "slug", "teamName", "teamShortName", "pageTemplate", "sortOrder", "isPublished", "createdAt", "updatedAt", "pageTitle", "pageDescription", "iconName", "showStatus", "parentId") VALUES ('cmlvent7v006r6en2bupsvv2m', 'telecom-iot', 'Telecom and Internet of Things (IoT)', 'Telecom & IoT', 'ITS_TEAM', 4, TRUE, '2026-02-20T21:31:56.203Z', '2026-02-20T21:31:56.203Z', NULL, NULL, NULL, FALSE, 'cmlvent73006k6en269eb9fx0');

-- TeamPermission: (empty)

-- AuditLog: (empty)

-- Portfolio: 9 rows
INSERT INTO "Portfolio" ("id", "teamId", "iconName", "title", "description", "href", "sortOrder", "linkedTeamId") VALUES ('cmlvensuo00026en2be2oxi5r', 'cmlvensul00016en27ro3bxrt', 'Network', 'Network Services', 'Core network, connectivity, security perimeter, and traffic management.', '/data-technology/network-services', 0, 'cmlventin008e6en2fbfvks30');
INSERT INTO "Portfolio" ("id", "teamId", "iconName", "title", "description", "href", "sortOrder", "linkedTeamId") VALUES ('cmlvensuo00036en2el992hxu', 'cmlvensul00016en27ro3bxrt', 'Server', 'Data Centre', 'Compute, storage, backup, recovery, and hosting platforms.', '/data-technology/data-centre', 1, 'cmlventl4008v6en2iz7ygp0g');
INSERT INTO "Portfolio" ("id", "teamId", "iconName", "title", "description", "href", "sortOrder", "linkedTeamId") VALUES ('cmlvensuo00046en24u6vtwnv', 'cmlvensul00016en27ro3bxrt', 'Smartphone', 'Voice, Mobility & IoT', 'Corporate voice, mobile fleet, radio, and smart/connected devices.', '/data-technology/voice-mobility-iot', 2, 'cmlventns009c6en24cffno5p');
INSERT INTO "Portfolio" ("id", "teamId", "iconName", "title", "description", "href", "sortOrder", "linkedTeamId") VALUES ('cmlvensws000t6en20gpl14oj', 'cmlvenswo000s6en253u5ag6s', 'Headphones', 'Service Desk', 'IT assistance via tickets and calls, providing remote troubleshooting and support.', '/partner-experience/service-desk', 0, 'cmlventqv009t6en2pk5blh5c');
INSERT INTO "Portfolio" ("id", "teamId", "iconName", "title", "description", "href", "sortOrder", "linkedTeamId") VALUES ('cmlvensws000u6en21qv0szal', 'cmlvenswo000s6en253u5ag6s', 'Wrench', 'Desktop Support', 'In-person break-fix services for hardware and software issues.', '/partner-experience/desktop-support', 1, 'cmlventtf00aa6en2l4uc4syn');
INSERT INTO "Portfolio" ("id", "teamId", "iconName", "title", "description", "href", "sortOrder", "linkedTeamId") VALUES ('cmlvensws000v6en29a1f5f2v', 'cmlvenswo000s6en253u5ag6s', 'Monitor', 'Desktop Administration', 'Managing approximately 12,000 computing devices across the City.', '/partner-experience/desktop-administration', 2, 'cmlventvy00ar6en2gmjolwjb');
INSERT INTO "Portfolio" ("id", "teamId", "iconName", "title", "description", "href", "sortOrder", "linkedTeamId") VALUES ('cmlvensyb001f6en2it8cv9uf', 'cmlvensya001e6en2la9l1uja', 'Database', 'Database Management', 'Supporting the City database environment with reliable, secure data storage and retrieval.', '/technology-infrastructure-operations/database', 0, 'cmlventyy00b86en2yzuio14r');
INSERT INTO "Portfolio" ("id", "teamId", "iconName", "title", "description", "href", "sortOrder", "linkedTeamId") VALUES ('cmlvensyb001g6en2sqi6rjql', 'cmlvensya001e6en2la9l1uja', 'Server', 'Server Solutions & Automation', 'OS, storage, printing, data protection, and automated infrastructure management.', '/technology-infrastructure-operations/server-solutions', 1, 'cmlvenu2000bp6en2302jxreg');
INSERT INTO "Portfolio" ("id", "teamId", "iconName", "title", "description", "href", "sortOrder", "linkedTeamId") VALUES ('cmlvensyb001h6en2xz4wxgf8', 'cmlvensya001e6en2la9l1uja', 'Layers', 'Virtualization', 'Server infrastructure and virtualization platforms for efficient resource utilization.', '/technology-infrastructure-operations/virtualization', 2, 'cmlvenu5100c66en2zn8wq782');

-- TeamTab: 10 rows
INSERT INTO "TeamTab" ("id", "teamId", "tabId", "label", "videoTitle", "videoDescription", "videoUrl", "diagramsTitle", "diagramsDescription", "sortOrder") VALUES ('cmlvensut00056en234d08r19', 'cmlvensul00016en27ro3bxrt', 'network', 'Network', 'Network Architecture', 'Watch this overview of our core network services and architecture.', 'https://drive.google.com/file/d/1RyjeaKqtnKkBT9PhGvUTM1QmXbYvDWnW/preview', 'Network Diagrams', 'View detailed diagrams for core network segments.', 0);
INSERT INTO "TeamTab" ("id", "teamId", "tabId", "label", "videoTitle", "videoDescription", "videoUrl", "diagramsTitle", "diagramsDescription", "sortOrder") VALUES ('cmlvensv0000a6en20wtstdw1', 'cmlvensul00016en27ro3bxrt', 'voice-mobility', 'Voice & Mobility', 'Voice & Mobility Overview', 'Watch this overview of our corporate voice, mobile, and IoT services.', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'Service Diagrams', 'View detailed diagrams for core services.', 1);
INSERT INTO "TeamTab" ("id", "teamId", "tabId", "label", "videoTitle", "videoDescription", "videoUrl", "diagramsTitle", "diagramsDescription", "sortOrder") VALUES ('cmlvensv4000e6en24x66syx5', 'cmlvensul00016en27ro3bxrt', 'data-centre', 'Data Centre', 'Data Centre Architecture', 'Watch this overview of our compute, storage, and hosting platforms.', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'Platform Diagrams', 'View detailed diagrams for core platforms.', 2);
INSERT INTO "TeamTab" ("id", "teamId", "tabId", "label", "videoTitle", "videoDescription", "videoUrl", "diagramsTitle", "diagramsDescription", "sortOrder") VALUES ('cmlvensv8000i6en2spj9dmvi', 'cmlvensul00016en27ro3bxrt', 'app-delivery', 'Application Delivery', 'Application Delivery Overview', 'Watch this overview of our application delivery and support services.', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'Service Diagrams', 'View detailed diagrams for core services.', 3);
INSERT INTO "TeamTab" ("id", "teamId", "tabId", "label", "videoTitle", "videoDescription", "videoUrl", "diagramsTitle", "diagramsDescription", "sortOrder") VALUES ('cmlvenswu000w6en29e6ox1pw', 'cmlvenswo000s6en253u5ag6s', 'service-desk', 'Service Desk', 'Service Desk Overview', 'Watch this overview of our Service Desk operations and support services.', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'Service Diagrams', 'View detailed diagrams for Service Desk operations.', 0);
INSERT INTO "TeamTab" ("id", "teamId", "tabId", "label", "videoTitle", "videoDescription", "videoUrl", "diagramsTitle", "diagramsDescription", "sortOrder") VALUES ('cmlvenswy00106en26zn74zqd', 'cmlvenswo000s6en253u5ag6s', 'desktop-support', 'Desktop Support', 'Desktop Support Overview', 'Watch this overview of our Desktop Support services and processes.', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'Support Diagrams', 'View detailed diagrams for Desktop Support processes.', 1);
INSERT INTO "TeamTab" ("id", "teamId", "tabId", "label", "videoTitle", "videoDescription", "videoUrl", "diagramsTitle", "diagramsDescription", "sortOrder") VALUES ('cmlvensx200146en2v1gcf24h', 'cmlvenswo000s6en253u5ag6s', 'desktop-admin', 'Desktop Administration', 'Desktop Administration Overview', 'Watch this overview of our Desktop Administration and device management.', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'Administration Diagrams', 'View detailed diagrams for Desktop Administration.', 2);
INSERT INTO "TeamTab" ("id", "teamId", "tabId", "label", "videoTitle", "videoDescription", "videoUrl", "diagramsTitle", "diagramsDescription", "sortOrder") VALUES ('cmlvensyd001i6en2hwaabnya', 'cmlvensya001e6en2la9l1uja', 'database', 'Database', 'Database Management Overview', 'Watch this overview of our database management services and architecture.', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'Database Diagrams', 'View detailed diagrams for database infrastructure.', 0);
INSERT INTO "TeamTab" ("id", "teamId", "tabId", "label", "videoTitle", "videoDescription", "videoUrl", "diagramsTitle", "diagramsDescription", "sortOrder") VALUES ('cmlvensyi001m6en2fr1df3r6', 'cmlvensya001e6en2la9l1uja', 'server', 'Server Solutions', 'Server Solutions Overview', 'Watch this overview of our server solutions and automation services.', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'Server Diagrams', 'View detailed diagrams for server infrastructure.', 1);
INSERT INTO "TeamTab" ("id", "teamId", "tabId", "label", "videoTitle", "videoDescription", "videoUrl", "diagramsTitle", "diagramsDescription", "sortOrder") VALUES ('cmlvensyk001q6en2g62wzi6o', 'cmlvensya001e6en2la9l1uja', 'virtualization', 'Virtualization', 'Virtualization Overview', 'Watch this overview of our virtualization platforms and services.', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'Platform Diagrams', 'View detailed diagrams for virtualization platforms.', 2);

-- DiagramLink: 31 rows
INSERT INTO "DiagramLink" ("id", "teamTabId", "label", "href", "sortOrder") VALUES ('cmlvensuv00066en2qd8864gm', 'cmlvensut00056en234d08r19', 'Data Centre', '#', 0);
INSERT INTO "DiagramLink" ("id", "teamTabId", "label", "href", "sortOrder") VALUES ('cmlvensuv00076en2py4s3ail', 'cmlvensut00056en234d08r19', 'Campus', '#', 1);
INSERT INTO "DiagramLink" ("id", "teamTabId", "label", "href", "sortOrder") VALUES ('cmlvensuv00086en25x3skbpq', 'cmlvensut00056en234d08r19', 'Cloud', '#', 2);
INSERT INTO "DiagramLink" ("id", "teamTabId", "label", "href", "sortOrder") VALUES ('cmlvensuv00096en29wbv2q5v', 'cmlvensut00056en234d08r19', 'Partners', '#', 3);
INSERT INTO "DiagramLink" ("id", "teamTabId", "label", "href", "sortOrder") VALUES ('cmlvensv1000b6en21pe8iqtz', 'cmlvensv0000a6en20wtstdw1', 'Corporate Voice', '#', 0);
INSERT INTO "DiagramLink" ("id", "teamTabId", "label", "href", "sortOrder") VALUES ('cmlvensv1000c6en2x0ukkgzd', 'cmlvensv0000a6en20wtstdw1', 'Mobile Fleet', '#', 1);
INSERT INTO "DiagramLink" ("id", "teamTabId", "label", "href", "sortOrder") VALUES ('cmlvensv1000d6en2jz5ejrum', 'cmlvensv0000a6en20wtstdw1', 'IoT Platform', '#', 2);
INSERT INTO "DiagramLink" ("id", "teamTabId", "label", "href", "sortOrder") VALUES ('cmlvensv5000f6en2h30c3qya', 'cmlvensv4000e6en24x66syx5', 'Compute', '#', 0);
INSERT INTO "DiagramLink" ("id", "teamTabId", "label", "href", "sortOrder") VALUES ('cmlvensv5000g6en2b9u0bbnt', 'cmlvensv4000e6en24x66syx5', 'Storage & Backup', '#', 1);
INSERT INTO "DiagramLink" ("id", "teamTabId", "label", "href", "sortOrder") VALUES ('cmlvensv5000h6en2ps7xycj1', 'cmlvensv4000e6en24x66syx5', 'Hosting (PaaS/IaaS)', '#', 2);
INSERT INTO "DiagramLink" ("id", "teamTabId", "label", "href", "sortOrder") VALUES ('cmlvensvb000j6en2582xr301', 'cmlvensv8000i6en2spj9dmvi', 'CI/CD Pipeline', '#', 0);
INSERT INTO "DiagramLink" ("id", "teamTabId", "label", "href", "sortOrder") VALUES ('cmlvensvb000k6en2tf4zvhz3', 'cmlvensv8000i6en2spj9dmvi', 'App Support Model', '#', 1);
INSERT INTO "DiagramLink" ("id", "teamTabId", "label", "href", "sortOrder") VALUES ('cmlvensvb000l6en20730bcxm', 'cmlvensv8000i6en2spj9dmvi', 'Database Services', '#', 2);
INSERT INTO "DiagramLink" ("id", "teamTabId", "label", "href", "sortOrder") VALUES ('cmlvenswv000x6en28tig9uzt', 'cmlvenswu000w6en29e6ox1pw', 'Ticket Workflow', '#', 0);
INSERT INTO "DiagramLink" ("id", "teamTabId", "label", "href", "sortOrder") VALUES ('cmlvenswv000y6en2tsjy1og9', 'cmlvenswu000w6en29e6ox1pw', 'Escalation Process', '#', 1);
INSERT INTO "DiagramLink" ("id", "teamTabId", "label", "href", "sortOrder") VALUES ('cmlvenswv000z6en2mbj6eqp4', 'cmlvenswu000w6en29e6ox1pw', 'SLA Guidelines', '#', 2);
INSERT INTO "DiagramLink" ("id", "teamTabId", "label", "href", "sortOrder") VALUES ('cmlvenswz00116en27tgup0mx', 'cmlvenswy00106en26zn74zqd', 'Break-Fix Process', '#', 0);
INSERT INTO "DiagramLink" ("id", "teamTabId", "label", "href", "sortOrder") VALUES ('cmlvenswz00126en2t7qzw44f', 'cmlvenswy00106en26zn74zqd', 'Hardware Lifecycle', '#', 1);
INSERT INTO "DiagramLink" ("id", "teamTabId", "label", "href", "sortOrder") VALUES ('cmlvenswz00136en2myyryk3p', 'cmlvenswy00106en26zn74zqd', 'Field Support Areas', '#', 2);
INSERT INTO "DiagramLink" ("id", "teamTabId", "label", "href", "sortOrder") VALUES ('cmlvensx300156en2v37poo1c', 'cmlvensx200146en2v1gcf24h', 'Device Management', '#', 0);
INSERT INTO "DiagramLink" ("id", "teamTabId", "label", "href", "sortOrder") VALUES ('cmlvensx300166en21r6gbbgp', 'cmlvensx200146en2v1gcf24h', 'Patch Management', '#', 1);
INSERT INTO "DiagramLink" ("id", "teamTabId", "label", "href", "sortOrder") VALUES ('cmlvensx300176en2stwc39vx', 'cmlvensx200146en2v1gcf24h', 'Software Deployment', '#', 2);
INSERT INTO "DiagramLink" ("id", "teamTabId", "label", "href", "sortOrder") VALUES ('cmlvensyf001j6en2iqjpmimm', 'cmlvensyd001i6en2hwaabnya', 'Database Architecture', '#', 0);
INSERT INTO "DiagramLink" ("id", "teamTabId", "label", "href", "sortOrder") VALUES ('cmlvensyf001k6en2u185rmdr', 'cmlvensyd001i6en2hwaabnya', 'Backup & Recovery', '#', 1);
INSERT INTO "DiagramLink" ("id", "teamTabId", "label", "href", "sortOrder") VALUES ('cmlvensyf001l6en20iaaasxb', 'cmlvensyd001i6en2hwaabnya', 'High Availability', '#', 2);
INSERT INTO "DiagramLink" ("id", "teamTabId", "label", "href", "sortOrder") VALUES ('cmlvensyj001n6en2cw8try1f', 'cmlvensyi001m6en2fr1df3r6', 'Server Architecture', '#', 0);
INSERT INTO "DiagramLink" ("id", "teamTabId", "label", "href", "sortOrder") VALUES ('cmlvensyj001o6en2q1prw473', 'cmlvensyi001m6en2fr1df3r6', 'Storage Systems', '#', 1);
INSERT INTO "DiagramLink" ("id", "teamTabId", "label", "href", "sortOrder") VALUES ('cmlvensyj001p6en2uww1racd', 'cmlvensyi001m6en2fr1df3r6', 'Automation Workflows', '#', 2);
INSERT INTO "DiagramLink" ("id", "teamTabId", "label", "href", "sortOrder") VALUES ('cmlvensyp001r6en2dhrd9okj', 'cmlvensyk001q6en2g62wzi6o', 'VMware Infrastructure', '#', 0);
INSERT INTO "DiagramLink" ("id", "teamTabId", "label", "href", "sortOrder") VALUES ('cmlvensyp001s6en2hqu9o40h', 'cmlvensyk001q6en2g62wzi6o', 'Hyper-V Environment', '#', 1);
INSERT INTO "DiagramLink" ("id", "teamTabId", "label", "href", "sortOrder") VALUES ('cmlvensyp001t6en2s97jo0iz', 'cmlvensyk001q6en2g62wzi6o', 'Container Platforms', '#', 2);

-- TrelloBoard: 9 rows
INSERT INTO "TrelloBoard" ("id", "teamId", "title", "description", "href", "sortOrder") VALUES ('cmlvensve000m6en29j59mk1a', 'cmlvensul00016en27ro3bxrt', 'Network Services', 'High-level work priorities for the Network Services team.', 'https://trello.com/b/5qMgG2C2/network-services-work-priorities', 0);
INSERT INTO "TrelloBoard" ("id", "teamId", "title", "description", "href", "sortOrder") VALUES ('cmlvensve000n6en2c3jnum29', 'cmlvensul00016en27ro3bxrt', 'Fibre Project', 'Tracking for the ongoing Network Services Fibre project.', 'https://trello.com/b/iukW90n7/network-services-fibre', 1);
INSERT INTO "TrelloBoard" ("id", "teamId", "title", "description", "href", "sortOrder") VALUES ('cmlvensve000o6en2cx6e0pzc', 'cmlvensul00016en27ro3bxrt', 'Project/Initiatives requiring Network', 'Tracking other projects and initiatives that require Network team support.', 'https://trello.com/b/rlaQyc0m/projects-initiatives-requiring-network', 2);
INSERT INTO "TrelloBoard" ("id", "teamId", "title", "description", "href", "sortOrder") VALUES ('cmlvensx600186en2pyw7gwle', 'cmlvenswo000s6en253u5ag6s', 'Partner Experience', 'High-level work priorities for the Partner Experience team.', '#', 0);
INSERT INTO "TrelloBoard" ("id", "teamId", "title", "description", "href", "sortOrder") VALUES ('cmlvensx600196en2lthyn81u', 'cmlvenswo000s6en253u5ag6s', 'Service Desk Operations', 'Tracking Service Desk initiatives and improvements.', '#', 1);
INSERT INTO "TrelloBoard" ("id", "teamId", "title", "description", "href", "sortOrder") VALUES ('cmlvensx6001a6en21fyeeorc', 'cmlvenswo000s6en253u5ag6s', 'Desktop Projects', 'Tracking desktop support and administration projects.', '#', 2);
INSERT INTO "TrelloBoard" ("id", "teamId", "title", "description", "href", "sortOrder") VALUES ('cmlvensyq001u6en2lgh7y9sk', 'cmlvensya001e6en2la9l1uja', 'Infrastructure Operations', 'High-level work priorities for the Infrastructure Operations team.', '#', 0);
INSERT INTO "TrelloBoard" ("id", "teamId", "title", "description", "href", "sortOrder") VALUES ('cmlvensyq001v6en2va64tq33', 'cmlvensya001e6en2la9l1uja', 'Database Projects', 'Tracking for ongoing database projects and initiatives.', '#', 1);
INSERT INTO "TrelloBoard" ("id", "teamId", "title", "description", "href", "sortOrder") VALUES ('cmlvensyq001w6en2ng62d8t2', 'cmlvensya001e6en2la9l1uja', 'Server & Virtualization', 'Tracking server and virtualization projects.', '#', 2);

-- TeamMember: 9 rows
INSERT INTO "TeamMember" ("id", "teamId", "name", "title", "email", "sortOrder") VALUES ('cmlvensvo000p6en2q3vc7l09', 'cmlvensul00016en27ro3bxrt', 'First Last', 'Director, Data Technology', 'firstname.lastname@edmonton.ca', 0);
INSERT INTO "TeamMember" ("id", "teamId", "name", "title", "email", "sortOrder") VALUES ('cmlvensvo000q6en27naadsbu', 'cmlvensul00016en27ro3bxrt', 'First Last', 'Manager, Network Services', 'firstname.lastname@edmonton.ca', 1);
INSERT INTO "TeamMember" ("id", "teamId", "name", "title", "email", "sortOrder") VALUES ('cmlvensvo000r6en2twhvljtj', 'cmlvensul00016en27ro3bxrt', 'First Last', 'Manager, Data Centre & Voice', 'firstname.lastname@edmonton.ca', 2);
INSERT INTO "TeamMember" ("id", "teamId", "name", "title", "email", "sortOrder") VALUES ('cmlvensxc001b6en2d3znquxu', 'cmlvenswo000s6en253u5ag6s', 'First Last', 'Manager, Partner Experience', 'firstname.lastname@edmonton.ca', 0);
INSERT INTO "TeamMember" ("id", "teamId", "name", "title", "email", "sortOrder") VALUES ('cmlvensxc001c6en24ecfgl6n', 'cmlvenswo000s6en253u5ag6s', 'First Last', 'Team Lead, Service Desk', 'firstname.lastname@edmonton.ca', 1);
INSERT INTO "TeamMember" ("id", "teamId", "name", "title", "email", "sortOrder") VALUES ('cmlvensxc001d6en2z2auflhn', 'cmlvenswo000s6en253u5ag6s', 'First Last', 'Team Lead, Desktop Support', 'firstname.lastname@edmonton.ca', 2);
INSERT INTO "TeamMember" ("id", "teamId", "name", "title", "email", "sortOrder") VALUES ('cmlvensyr001x6en2vd0k9scw', 'cmlvensya001e6en2la9l1uja', 'First Last', 'Manager, Technology Infrastructure Operations', 'firstname.lastname@edmonton.ca', 0);
INSERT INTO "TeamMember" ("id", "teamId", "name", "title", "email", "sortOrder") VALUES ('cmlvensyr001y6en2r99bvvox', 'cmlvensya001e6en2la9l1uja', 'First Last', 'Team Lead, Database Management', 'firstname.lastname@edmonton.ca', 1);
INSERT INTO "TeamMember" ("id", "teamId", "name", "title", "email", "sortOrder") VALUES ('cmlvensyr001z6en2t3fpgdr1', 'cmlvensya001e6en2la9l1uja', 'First Last', 'Team Lead, Server Solutions', 'firstname.lastname@edmonton.ca', 2);

-- AccordionGroup: 4 rows
INSERT INTO "AccordionGroup" ("id", "teamId", "groupId", "title", "sortOrder") VALUES ('cmlvent5000506en2e6lxorbc', NULL, 'incident', 'Incident Management', 0);
INSERT INTO "AccordionGroup" ("id", "teamId", "groupId", "title", "sortOrder") VALUES ('cmlvent5e00586en2ifhvxaov', NULL, 'change', 'Change Management', 1);
INSERT INTO "AccordionGroup" ("id", "teamId", "groupId", "title", "sortOrder") VALUES ('cmlvent5n005h6en2tlx6zn1u', NULL, 'resource', 'Resource Management', 2);
INSERT INTO "AccordionGroup" ("id", "teamId", "groupId", "title", "sortOrder") VALUES ('cmlvent5x005r6en2t5fgxj2y', NULL, 'its-links', 'ITS Team Sites & Other Links', 3);

-- AccordionLink: 33 rows
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5100516en2e7x3glnr', 'cmlvent5000506en2e6lxorbc', 'Helix (Remedy) SmartIT', '#', 0);
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5100526en2sa019y7d', 'cmlvent5000506en2e6lxorbc', 'Helix (Remedy) DWP', '#', 1);
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5100536en2fi1j5r0n', 'cmlvent5000506en2e6lxorbc', 'Incident Management Process', '#', 2);
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5100546en2268hr21y', 'cmlvent5000506en2e6lxorbc', 'WO from Incident Ticket', '#', 3);
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5100556en24e4yp75d', 'cmlvent5000506en2e6lxorbc', 'Incident Management Flow Charts', '#', 4);
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5100566en21dmkwrcd', 'cmlvent5000506en2e6lxorbc', 'Problem Mgmt Process Guide', '#', 5);
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5100576en2if14b8tl', 'cmlvent5000506en2e6lxorbc', 'Root Cause Analysis (RCA)', '#', 6);
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5f00596en25wwwwnoc', 'cmlvent5e00586en2ifhvxaov', 'OCT Change Management', '#', 0);
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5f005a6en2vgwtbg2f', 'cmlvent5e00586en2ifhvxaov', 'OCT Schedule Outages', '#', 1);
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5f005b6en2r13kgaec', 'cmlvent5e00586en2ifhvxaov', 'Severity 1 Procedures', '#', 2);
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5f005c6en2av1l3lmf', 'cmlvent5e00586en2ifhvxaov', 'OCT Change Management Definitions', '#', 3);
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5f005d6en24vbcg8gs', 'cmlvent5e00586en2ifhvxaov', 'Change Approval - Form', '#', 4);
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5f005e6en2rx944lmg', 'cmlvent5e00586en2ifhvxaov', 'Work Order vs Change Ticket', '#', 5);
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5f005f6en2k3pdxzc2', 'cmlvent5e00586en2ifhvxaov', 'Remedy Definitions', '#', 6);
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5f005g6en27lbabgdn', 'cmlvent5e00586en2ifhvxaov', 'Change Ticket Cheat Sheet', '#', 7);
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5o005i6en2qhl37e3m', 'cmlvent5n005h6en2tlx6zn1u', 'Taleo', '#', 0);
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5o005j6en29cpjmx3l', 'cmlvent5n005h6en2tlx6zn1u', 'Recruitment Toolkit', '#', 1);
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5o005k6en2uud9wtr3', 'cmlvent5n005h6en2tlx6zn1u', 'Recruitment Approval Process User Guide', '#', 2);
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5o005l6en2tknmtamp', 'cmlvent5n005h6en2tlx6zn1u', 'Recruitment Approval Form', '#', 3);
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5o005m6en2smxzbid1', 'cmlvent5n005h6en2tlx6zn1u', 'SAP Time Entry Request', '#', 4);
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5o005n6en254ckml6x', 'cmlvent5n005h6en2tlx6zn1u', 'New Account Request', '#', 5);
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5o005o6en2wfbv6pe9', 'cmlvent5n005h6en2tlx6zn1u', 'Phone Request', '#', 6);
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5o005p6en2yq7c3n7o', 'cmlvent5n005h6en2tlx6zn1u', 'Offboarding Link', '#', 7);
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5o005q6en263uf4uhw', 'cmlvent5n005h6en2tlx6zn1u', 'Supervisor Offboarding Checklist', '#', 8);
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5y005s6en2w1hzhd65', 'cmlvent5x005r6en2t5fgxj2y', 'ITS Service Catalog', '#', 0);
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5y005t6en2ugtnxkqn', 'cmlvent5x005r6en2t5fgxj2y', 'Technology Infrastructure Operations', '#', 1);
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5y005u6en23jy7yfre', 'cmlvent5x005r6en2t5fgxj2y', 'Service Desk', '#', 2);
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5y005v6en2vq1l3qms', 'cmlvent5x005r6en2t5fgxj2y', 'Service Management Office', '#', 3);
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5y005w6en20x8eayrm', 'cmlvent5x005r6en2t5fgxj2y', 'Enterprise Commons Project', '#', 4);
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5y005x6en2gowpg77x', 'cmlvent5x005r6en2t5fgxj2y', 'OCT Employee Links', '#', 5);
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5y005y6en2btam7wjr', 'cmlvent5x005r6en2t5fgxj2y', 'Technology PMO', '#', 6);
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5y005z6en2gonx8ejh', 'cmlvent5x005r6en2t5fgxj2y', 'Open Data Portal', '#', 7);
INSERT INTO "AccordionLink" ("id", "groupId", "label", "href", "sortOrder") VALUES ('cmlvent5y00606en2tioryxhs', 'cmlvent5x005r6en2t5fgxj2y', 'Open City', '#', 8);

-- PortfolioSubpage: 9 rows
INSERT INTO "PortfolioSubpage" ("id", "portfolioId", "parentTeam", "parentTeamHref", "title", "description", "iconName", "showStatus") VALUES ('cmlvent0c00206en2whujcokz', 'cmlvensuo00026en2be2oxi5r', 'Data Technology', '/data-technology', 'Network Services', 'We provide the digital foundation for the City of Edmonton. Our team manages the core connectivity, security perimeter, and traffic management infrastructure that connects over 300 City facilities.', 'Network', TRUE);
INSERT INTO "PortfolioSubpage" ("id", "portfolioId", "parentTeam", "parentTeamHref", "title", "description", "iconName", "showStatus") VALUES ('cmlvent1c002c6en21s84yet7', 'cmlvensuo00036en2el992hxu', 'Data Technology', '/data-technology', 'Data Centre', 'We manage the City''s physical computing infrastructure, including on-premises data centres and colocation facilities, ensuring reliable, secure hosting for all City applications and services.', 'Building2', TRUE);
INSERT INTO "PortfolioSubpage" ("id", "portfolioId", "parentTeam", "parentTeamHref", "title", "description", "iconName", "showStatus") VALUES ('cmlvent27002o6en2d92bysq9', 'cmlvensuo00046en24u6vtwnv', 'Data Technology', '/data-technology', 'Voice, Mobility & IoT', 'We provide comprehensive communication services including wireline and VoIP phone systems, cellular wireless, machine-to-machine connectivity, and the City''s LoRaWAN IoT network infrastructure.', 'Phone', TRUE);
INSERT INTO "PortfolioSubpage" ("id", "portfolioId", "parentTeam", "parentTeamHref", "title", "description", "iconName", "showStatus") VALUES ('cmlvent2p00306en2vgsairgc', 'cmlvensws000t6en20gpl14oj', 'Partner Experience', '/partner-experience', 'Service Desk', 'We provide IT assistance via tickets and calls, offering remote troubleshooting and support to help City employees stay productive. Our team is available to assist with technical issues, service requests, and general IT inquiries.', 'Headphones', TRUE);
INSERT INTO "PortfolioSubpage" ("id", "portfolioId", "parentTeam", "parentTeamHref", "title", "description", "iconName", "showStatus") VALUES ('cmlvent30003c6en2b67c70bg', 'cmlvensws000u6en21qv0szal', 'Partner Experience', '/partner-experience', 'Desktop Support', 'We provide in-person break-fix services for hardware and software issues across City facilities. Our field technicians are available to resolve complex issues that cannot be handled remotely.', 'Wrench', TRUE);
INSERT INTO "PortfolioSubpage" ("id", "portfolioId", "parentTeam", "parentTeamHref", "title", "description", "iconName", "showStatus") VALUES ('cmlvent3b003o6en23y1fwt74', 'cmlvensws000v6en29a1f5f2v', 'Partner Experience', '/partner-experience', 'Desktop Administration', 'We manage approximately 12,000 computing devices across the City, including operating system deployment, patch management, software distribution, and configuration management.', 'Monitor', TRUE);
INSERT INTO "PortfolioSubpage" ("id", "portfolioId", "parentTeam", "parentTeamHref", "title", "description", "iconName", "showStatus") VALUES ('cmlvent3m00406en2hyhwox4p', 'cmlvensyb001f6en2it8cv9uf', 'Technology Infrastructure Operations', '/technology-infrastructure-operations', 'Database Management', 'We support the City''s database environment, ensuring data services are reliable, secure, and performant. Our team manages SQL Server, Oracle, and PostgreSQL platforms across the enterprise.', 'Database', TRUE);
INSERT INTO "PortfolioSubpage" ("id", "portfolioId", "parentTeam", "parentTeamHref", "title", "description", "iconName", "showStatus") VALUES ('cmlvent3y004c6en2s2u0wwow', 'cmlvensyb001g6en2sqi6rjql', 'Technology Infrastructure Operations', '/technology-infrastructure-operations', 'Server Solutions & Automation', 'We manage the City''s server infrastructure including operating systems, storage, printing, and data protection services, with a focus on automation and process improvements.', 'Server', TRUE);
INSERT INTO "PortfolioSubpage" ("id", "portfolioId", "parentTeam", "parentTeamHref", "title", "description", "iconName", "showStatus") VALUES ('cmlvent4g004o6en27uxy2g98', 'cmlvensyb001h6en2xz4wxgf8', 'Technology Infrastructure Operations', '/technology-infrastructure-operations', 'Virtualization', 'We manage the City''s virtualization platforms including VMware, Hyper-V, and container services, enabling efficient resource utilization and flexible infrastructure deployment.', 'Layers', TRUE);

-- SubpageService: 36 rows
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent0e00216en2g9zm5895', 'cmlvent0c00206en2whujcokz', 'Connectivity (LAN/WAN)', '{"Wired office connectivity","Fibre optic backbone","Site-to-site switching"}', 0);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent0e00226en26tipmf1y', 'cmlvent0c00206en2whujcokz', 'Wireless (Wi-Fi)', '{"Corporate Secure Wi-Fi","Guest/Public Wi-Fi","High-density event wireless"}', 1);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent0e00236en28v5in82m', 'cmlvent0c00206en2whujcokz', 'Security Perimeter', '{"Firewall management","VPN & Remote Access","Intrusion Detection"}', 2);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent0e00246en217q9khe5', 'cmlvent0c00206en2whujcokz', 'Load Balancing', '{"Application traffic management","F5 BigIP Administration","SSL Offloading"}', 3);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent1d002d6en2rpp5qrg9', 'cmlvent1c002c6en21s84yet7', 'Facility Management', '{"Primary data centre operations","Colocation site management","Physical security controls"}', 0);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent1d002e6en2imja174q', 'cmlvent1c002c6en21s84yet7', 'Power & Cooling', '{"UPS and generator systems","HVAC monitoring and control","Environmental sensors"}', 1);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent1d002f6en29ym5ftav', 'cmlvent1c002c6en21s84yet7', 'Rack & Cabling', '{"Server rack provisioning","Structured cabling standards","Cable management systems"}', 2);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent1d002g6en2drjrh7h4', 'cmlvent1c002c6en21s84yet7', 'Disaster Recovery', '{"Secondary site failover","Backup power testing","Business continuity planning"}', 3);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent29002p6en24cl100m8', 'cmlvent27002o6en2d92bysq9', 'Voice Services (VoIP)', '{"Cisco IP phone provisioning","Voicemail and unified messaging","Call centre solutions"}', 0);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent29002q6en2rm3wxllr', 'cmlvent27002o6en2d92bysq9', 'Cellular & M2M', '{"Corporate mobile device plans","Machine-to-machine connectivity","Fleet tracking integration"}', 1);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent29002r6en2qhvnyw3c', 'cmlvent27002o6en2d92bysq9', 'IoT Network', '{"LoRaWAN sensor network","Smart city device management","Environmental monitoring sensors"}', 2);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent29002s6en2b8fmroxq', 'cmlvent27002o6en2d92bysq9', 'Collaboration Tools', '{"Video conferencing systems","Digital signage (Appspace)","Meeting room technology"}', 3);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent2p00316en27zz979ys', 'cmlvent2p00306en2vgsairgc', 'Incident Support', '{"Ticket submission and tracking","Phone support (780-496-8000)","Live chat assistance"}', 0);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent2q00326en2d2ff7gnn', 'cmlvent2p00306en2vgsairgc', 'Remote Troubleshooting', '{"Remote desktop support","Password resets","Software assistance"}', 1);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent2q00336en2s6k83spi', 'cmlvent2p00306en2vgsairgc', 'Service Requests', '{"Account provisioning","Access requests","Software installation"}', 2);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent2q00346en29shss1ey', 'cmlvent2p00306en2vgsairgc', 'Knowledge Base', '{"Self-service articles","How-to guides","FAQ documentation"}', 3);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent31003d6en2rvmunic5', 'cmlvent30003c6en2b67c70bg', 'Hardware Support', '{"Computer repairs","Peripheral troubleshooting","Hardware replacement"}', 0);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent31003e6en2a1b1vw6c', 'cmlvent30003c6en2b67c70bg', 'Software Support', '{"Application troubleshooting","Software installation","Configuration issues"}', 1);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent31003f6en26klraeqk', 'cmlvent30003c6en2b67c70bg', 'Workspace Setup', '{"New employee setup","Desk relocations","Equipment deployment"}', 2);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent31003g6en2a5r61km0', 'cmlvent30003c6en2b67c70bg', 'Field Services', '{"On-site support visits","Multi-facility coverage","Emergency response"}', 3);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent3c003p6en2q23vrfxg', 'cmlvent3b003o6en23y1fwt74', 'Device Management', '{"Endpoint provisioning","Device inventory","Asset tracking"}', 0);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent3c003q6en28m7yany8', 'cmlvent3b003o6en23y1fwt74', 'Patch Management', '{"Security updates","OS patching","Compliance reporting"}', 1);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent3c003r6en2o1ivbzst', 'cmlvent3b003o6en23y1fwt74', 'Software Deployment', '{"Application packaging","Automated deployment","License management"}', 2);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent3c003s6en20wz09qa5', 'cmlvent3b003o6en23y1fwt74', 'Configuration Management', '{"Group Policy management","Standard images","Security baselines"}', 3);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent3m00416en2zxae3s1t', 'cmlvent3m00406en2hyhwox4p', 'Database Administration', '{"SQL Server management","Oracle database support","PostgreSQL operations"}', 0);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent3n00426en226ozbhdi', 'cmlvent3m00406en2hyhwox4p', 'Performance Optimization', '{"Query tuning and analysis","Index management","Resource monitoring"}', 1);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent3n00436en2e6uc3g1r', 'cmlvent3m00406en2hyhwox4p', 'High Availability', '{"Always-On clustering","Database replication","Failover configuration"}', 2);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent3n00446en2eciiuq55', 'cmlvent3m00406en2hyhwox4p', 'Security & Compliance', '{"Access control management","Data encryption","Audit logging"}', 3);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent41004d6en2ke172u9i', 'cmlvent3y004c6en2s2u0wwow', 'Operating Systems', '{"Windows Server administration","Linux server management","OS patching and updates"}', 0);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent41004e6en276xngd5u', 'cmlvent3y004c6en2s2u0wwow', 'Storage Solutions', '{"SAN/NAS management","Storage provisioning","Capacity planning"}', 1);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent41004f6en2uwtv32fm', 'cmlvent3y004c6en2s2u0wwow', 'Data Protection', '{"Backup operations","Disaster recovery","Data replication"}', 2);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent41004g6en2ly4pbeyi', 'cmlvent3y004c6en2s2u0wwow', 'Print Services', '{"Print server management","Printer deployment","Print queue administration"}', 3);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent4h004p6en234aa3728', 'cmlvent4g004o6en27uxy2g98', 'VMware Infrastructure', '{"vSphere cluster management","VM provisioning","Resource allocation"}', 0);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent4h004q6en2bxgpgacq', 'cmlvent4g004o6en27uxy2g98', 'Hyper-V Services', '{"Microsoft virtualization","Failover clustering","Live migration"}', 1);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent4h004r6en2iuewl56v', 'cmlvent4g004o6en27uxy2g98', 'Virtual Desktop (VDI)', '{"Horizon desktop pools","Application virtualization","Remote access solutions"}', 2);
INSERT INTO "SubpageService" ("id", "subpageId", "title", "items", "sortOrder") VALUES ('cmlvent4h004s6en2ygta2jlp', 'cmlvent4g004o6en27uxy2g98', 'Container Services', '{"Kubernetes orchestration","Container registry","Microservices hosting"}', 3);

-- SubpageInitiative: 18 rows
INSERT INTO "SubpageInitiative" ("id", "subpageId", "title", "description", "href", "sortOrder") VALUES ('cmlvent0j00256en24j24tn9v', 'cmlvent0c00206en2whujcokz', 'Next-Gen Firewall Upgrade', 'Replacing legacy edge hardware to improve throughput and security inspection capabilities.', '#', 0);
INSERT INTO "SubpageInitiative" ("id", "subpageId", "title", "description", "href", "sortOrder") VALUES ('cmlvent0j00266en21xtjvetr', 'cmlvent0c00206en2whujcokz', 'Fibre Expansion Phase 4', 'Extending dark fibre connectivity to new facilities in the southwest quadrant.', '#', 1);
INSERT INTO "SubpageInitiative" ("id", "subpageId", "title", "description", "href", "sortOrder") VALUES ('cmlvent1g002h6en2rhxw7xmz', 'cmlvent1c002c6en21s84yet7', 'Data Centre Consolidation', 'Migrating workloads from legacy facilities to modernized infrastructure.', '#', 0);
INSERT INTO "SubpageInitiative" ("id", "subpageId", "title", "description", "href", "sortOrder") VALUES ('cmlvent1g002i6en2iyo76uik', 'cmlvent1c002c6en21s84yet7', 'Green IT Initiative', 'Implementing energy-efficient cooling and power management solutions.', '#', 1);
INSERT INTO "SubpageInitiative" ("id", "subpageId", "title", "description", "href", "sortOrder") VALUES ('cmlvent2a002t6en2y74e753c', 'cmlvent27002o6en2d92bysq9', 'Smart City Sensor Expansion', 'Deploying additional LoRaWAN sensors for air quality and traffic monitoring.', '#', 0);
INSERT INTO "SubpageInitiative" ("id", "subpageId", "title", "description", "href", "sortOrder") VALUES ('cmlvent2a002u6en2hhax3nms', 'cmlvent27002o6en2d92bysq9', 'Unified Communications Migration', 'Transitioning to cloud-based collaboration and voice platforms.', '#', 1);
INSERT INTO "SubpageInitiative" ("id", "subpageId", "title", "description", "href", "sortOrder") VALUES ('cmlvent2r00356en2zylpmc4j', 'cmlvent2p00306en2vgsairgc', 'AI-Powered Support Chat', 'Implementing intelligent chatbot for faster resolution of common issues.', '#', 0);
INSERT INTO "SubpageInitiative" ("id", "subpageId", "title", "description", "href", "sortOrder") VALUES ('cmlvent2r00366en2l32nyz9a', 'cmlvent2p00306en2vgsairgc', 'Self-Service Portal Enhancement', 'Expanding self-service capabilities to reduce ticket volume and improve user experience.', '#', 1);
INSERT INTO "SubpageInitiative" ("id", "subpageId", "title", "description", "href", "sortOrder") VALUES ('cmlvent32003h6en20fo9hprn', 'cmlvent30003c6en2b67c70bg', 'Mobile Technician Program', 'Deploying mobile support teams for faster on-site response times.', '#', 0);
INSERT INTO "SubpageInitiative" ("id", "subpageId", "title", "description", "href", "sortOrder") VALUES ('cmlvent32003i6en2hrwe50g3', 'cmlvent30003c6en2b67c70bg', 'Hardware Lifecycle Management', 'Implementing proactive hardware refresh cycles to reduce break-fix incidents.', '#', 1);
INSERT INTO "SubpageInitiative" ("id", "subpageId", "title", "description", "href", "sortOrder") VALUES ('cmlvent3d003t6en2s6muj009', 'cmlvent3b003o6en23y1fwt74', 'Windows 11 Migration', 'Upgrading City devices to Windows 11 with improved security features.', '#', 0);
INSERT INTO "SubpageInitiative" ("id", "subpageId", "title", "description", "href", "sortOrder") VALUES ('cmlvent3d003u6en2c0odyux3', 'cmlvent3b003o6en23y1fwt74', 'Endpoint Detection & Response', 'Deploying advanced endpoint security monitoring across all managed devices.', '#', 1);
INSERT INTO "SubpageInitiative" ("id", "subpageId", "title", "description", "href", "sortOrder") VALUES ('cmlvent3o00456en2k44f5cwo', 'cmlvent3m00406en2hyhwox4p', 'Database Modernization', 'Migrating legacy databases to modern platforms with improved performance and security.', '#', 0);
INSERT INTO "SubpageInitiative" ("id", "subpageId", "title", "description", "href", "sortOrder") VALUES ('cmlvent3o00466en2k65ftfhu', 'cmlvent3m00406en2hyhwox4p', 'Automated Patching Program', 'Implementing automated database patching to ensure security compliance.', '#', 1);
INSERT INTO "SubpageInitiative" ("id", "subpageId", "title", "description", "href", "sortOrder") VALUES ('cmlvent42004h6en2o4kv79xg', 'cmlvent3y004c6en2s2u0wwow', 'Server Automation Program', 'Implementing infrastructure-as-code for automated server provisioning and configuration.', '#', 0);
INSERT INTO "SubpageInitiative" ("id", "subpageId", "title", "description", "href", "sortOrder") VALUES ('cmlvent42004i6en2if6nhi1o', 'cmlvent3y004c6en2s2u0wwow', 'Storage Tier Optimization', 'Migrating data to appropriate storage tiers based on access patterns and requirements.', '#', 1);
INSERT INTO "SubpageInitiative" ("id", "subpageId", "title", "description", "href", "sortOrder") VALUES ('cmlvent4i004t6en2rjzysra1', 'cmlvent4g004o6en27uxy2g98', 'Hybrid Cloud Integration', 'Extending virtualization platform to support hybrid cloud workloads.', '#', 0);
INSERT INTO "SubpageInitiative" ("id", "subpageId", "title", "description", "href", "sortOrder") VALUES ('cmlvent4i004u6en211vctzai', 'cmlvent4g004o6en27uxy2g98', 'VDI Refresh Project', 'Upgrading virtual desktop infrastructure for improved performance and user experience.', '#', 1);

-- SubpageContact: 18 rows
INSERT INTO "SubpageContact" ("id", "subpageId", "name", "role", "email", "sortOrder") VALUES ('cmlvent0l00276en2uqdhwf83', 'cmlvent0c00206en2whujcokz', 'First Last', 'Manager, Network Services', 'firstname.lastname@edmonton.ca', 0);
INSERT INTO "SubpageContact" ("id", "subpageId", "name", "role", "email", "sortOrder") VALUES ('cmlvent0l00286en28qdn5p7a', 'cmlvent0c00206en2whujcokz', 'First Last', 'Lead Network Architect', 'firstname.lastname@edmonton.ca', 1);
INSERT INTO "SubpageContact" ("id", "subpageId", "name", "role", "email", "sortOrder") VALUES ('cmlvent1h002j6en2h6q46t8s', 'cmlvent1c002c6en21s84yet7', 'First Last', 'Manager, Data Centre Operations', 'firstname.lastname@edmonton.ca', 0);
INSERT INTO "SubpageContact" ("id", "subpageId", "name", "role", "email", "sortOrder") VALUES ('cmlvent1h002k6en23e9803k5', 'cmlvent1c002c6en21s84yet7', 'First Last', 'Facilities Coordinator', 'firstname.lastname@edmonton.ca', 1);
INSERT INTO "SubpageContact" ("id", "subpageId", "name", "role", "email", "sortOrder") VALUES ('cmlvent2b002v6en2zqmrmoy2', 'cmlvent27002o6en2d92bysq9', 'First Last', 'Manager, Telecom & IoT', 'firstname.lastname@edmonton.ca', 0);
INSERT INTO "SubpageContact" ("id", "subpageId", "name", "role", "email", "sortOrder") VALUES ('cmlvent2b002w6en2ibmajuyp', 'cmlvent27002o6en2d92bysq9', 'First Last', 'IoT Solutions Architect', 'firstname.lastname@edmonton.ca', 1);
INSERT INTO "SubpageContact" ("id", "subpageId", "name", "role", "email", "sortOrder") VALUES ('cmlvent2r00376en2k19gug6z', 'cmlvent2p00306en2vgsairgc', 'First Last', 'Manager, Service Desk', 'firstname.lastname@edmonton.ca', 0);
INSERT INTO "SubpageContact" ("id", "subpageId", "name", "role", "email", "sortOrder") VALUES ('cmlvent2r00386en26qoj266u', 'cmlvent2p00306en2vgsairgc', 'First Last', 'Team Lead, Service Desk', 'firstname.lastname@edmonton.ca', 1);
INSERT INTO "SubpageContact" ("id", "subpageId", "name", "role", "email", "sortOrder") VALUES ('cmlvent33003j6en2ntmkpwvj', 'cmlvent30003c6en2b67c70bg', 'First Last', 'Manager, Desktop Support', 'firstname.lastname@edmonton.ca', 0);
INSERT INTO "SubpageContact" ("id", "subpageId", "name", "role", "email", "sortOrder") VALUES ('cmlvent33003k6en2cxq7v88s', 'cmlvent30003c6en2b67c70bg', 'First Last', 'Team Lead, Field Services', 'firstname.lastname@edmonton.ca', 1);
INSERT INTO "SubpageContact" ("id", "subpageId", "name", "role", "email", "sortOrder") VALUES ('cmlvent3d003v6en2z7h6vj7y', 'cmlvent3b003o6en23y1fwt74', 'First Last', 'Manager, Desktop Administration', 'firstname.lastname@edmonton.ca', 0);
INSERT INTO "SubpageContact" ("id", "subpageId", "name", "role", "email", "sortOrder") VALUES ('cmlvent3d003w6en2lgog4ngq', 'cmlvent3b003o6en23y1fwt74', 'First Last', 'Senior Desktop Engineer', 'firstname.lastname@edmonton.ca', 1);
INSERT INTO "SubpageContact" ("id", "subpageId", "name", "role", "email", "sortOrder") VALUES ('cmlvent3p00476en2cslie095', 'cmlvent3m00406en2hyhwox4p', 'First Last', 'Manager, Database Services', 'firstname.lastname@edmonton.ca', 0);
INSERT INTO "SubpageContact" ("id", "subpageId", "name", "role", "email", "sortOrder") VALUES ('cmlvent3p00486en24ml7wclp', 'cmlvent3m00406en2hyhwox4p', 'First Last', 'Senior Database Administrator', 'firstname.lastname@edmonton.ca', 1);
INSERT INTO "SubpageContact" ("id", "subpageId", "name", "role", "email", "sortOrder") VALUES ('cmlvent43004j6en2z2l9n6dq', 'cmlvent3y004c6en2s2u0wwow', 'First Last', 'Manager, Server Solutions', 'firstname.lastname@edmonton.ca', 0);
INSERT INTO "SubpageContact" ("id", "subpageId", "name", "role", "email", "sortOrder") VALUES ('cmlvent43004k6en2muwo3upg', 'cmlvent3y004c6en2s2u0wwow', 'First Last', 'Senior Systems Administrator', 'firstname.lastname@edmonton.ca', 1);
INSERT INTO "SubpageContact" ("id", "subpageId", "name", "role", "email", "sortOrder") VALUES ('cmlvent4j004v6en2ci59q95u', 'cmlvent4g004o6en27uxy2g98', 'First Last', 'Manager, Virtualization Services', 'firstname.lastname@edmonton.ca', 0);
INSERT INTO "SubpageContact" ("id", "subpageId", "name", "role", "email", "sortOrder") VALUES ('cmlvent4j004w6en226idlnxa', 'cmlvent4g004o6en27uxy2g98', 'First Last', 'Senior Virtualization Engineer', 'firstname.lastname@edmonton.ca', 1);

-- SubpageQuickLink: 27 rows
INSERT INTO "SubpageQuickLink" ("id", "subpageId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvent0q00296en2ftia9a19', 'cmlvent0c00206en2whujcokz', 'Network Diagrams', 'Visio topologies for Data Centre and Campus.', '#', FALSE, 0);
INSERT INTO "SubpageQuickLink" ("id", "subpageId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvent0q002a6en27kxizt16', 'cmlvent0c00206en2whujcokz', 'SolarWinds Dashboard', 'Real-time uptime and bandwidth monitoring.', '#', FALSE, 1);
INSERT INTO "SubpageQuickLink" ("id", "subpageId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvent0q002b6en2z2xprsq5', 'cmlvent0c00206en2whujcokz', 'IP Address Management (IPAM)', 'Internal DNS and subnet allocation tool.', '#', TRUE, 2);
INSERT INTO "SubpageQuickLink" ("id", "subpageId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvent1k002l6en2wlza36d2', 'cmlvent1c002c6en21s84yet7', 'Data Centre Access Request', 'Submit requests for physical access to facilities.', '#', FALSE, 0);
INSERT INTO "SubpageQuickLink" ("id", "subpageId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvent1k002m6en2nao8jrjq', 'cmlvent1c002c6en21s84yet7', 'Environmental Monitoring', 'Temperature, humidity, and power dashboards.', '#', FALSE, 1);
INSERT INTO "SubpageQuickLink" ("id", "subpageId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvent1k002n6en2mkop4tpw', 'cmlvent1c002c6en21s84yet7', 'Rack Layout Diagrams', 'Current server placement and capacity.', '#', TRUE, 2);
INSERT INTO "SubpageQuickLink" ("id", "subpageId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvent2c002x6en2lhji8o6t', 'cmlvent27002o6en2d92bysq9', 'Phone Request Form', 'Request new VoIP phones or extensions.', '#', FALSE, 0);
INSERT INTO "SubpageQuickLink" ("id", "subpageId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvent2c002y6en21wsuwgte', 'cmlvent27002o6en2d92bysq9', 'IoT Device Portal', 'Manage and monitor connected devices.', '#', FALSE, 1);
INSERT INTO "SubpageQuickLink" ("id", "subpageId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvent2c002z6en23y6c2k5u', 'cmlvent27002o6en2d92bysq9', 'Cellular Plan Requests', 'Corporate mobile device and plan management.', '#', TRUE, 2);
INSERT INTO "SubpageQuickLink" ("id", "subpageId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvent2s00396en2vjfsjaac', 'cmlvent2p00306en2vgsairgc', 'Submit a Ticket', 'Create a new support request.', '#', FALSE, 0);
INSERT INTO "SubpageQuickLink" ("id", "subpageId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvent2s003a6en2uxfpckd9', 'cmlvent2p00306en2vgsairgc', 'Knowledge Base', 'Search self-help articles and guides.', '#', FALSE, 1);
INSERT INTO "SubpageQuickLink" ("id", "subpageId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvent2s003b6en2wszrmo8f', 'cmlvent2p00306en2vgsairgc', 'Track My Tickets', 'View status of your open requests.', '#', TRUE, 2);
INSERT INTO "SubpageQuickLink" ("id", "subpageId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvent34003l6en2sn83mkxs', 'cmlvent30003c6en2b67c70bg', 'Request On-Site Support', 'Schedule a technician visit.', '#', FALSE, 0);
INSERT INTO "SubpageQuickLink" ("id", "subpageId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvent34003m6en2atb49sab', 'cmlvent30003c6en2b67c70bg', 'Hardware Request Form', 'Request new or replacement hardware.', '#', FALSE, 1);
INSERT INTO "SubpageQuickLink" ("id", "subpageId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvent34003n6en2dtjku2qc', 'cmlvent30003c6en2b67c70bg', 'Equipment Return', 'Schedule equipment pickup or return.', '#', TRUE, 2);
INSERT INTO "SubpageQuickLink" ("id", "subpageId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvent3e003x6en2wkl6gvxj', 'cmlvent3b003o6en23y1fwt74', 'Software Request Form', 'Request new software installation.', '#', FALSE, 0);
INSERT INTO "SubpageQuickLink" ("id", "subpageId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvent3e003y6en2fqy4s02l', 'cmlvent3b003o6en23y1fwt74', 'Device Inventory', 'View managed device information.', '#', FALSE, 1);
INSERT INTO "SubpageQuickLink" ("id", "subpageId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvent3e003z6en2fjtmj8i8', 'cmlvent3b003o6en23y1fwt74', 'Patch Compliance Dashboard', 'View patch status across the organization.', '#', TRUE, 2);
INSERT INTO "SubpageQuickLink" ("id", "subpageId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvent3p00496en2yg07epvy', 'cmlvent3m00406en2hyhwox4p', 'Database Request Form', 'Request new databases or modifications.', '#', FALSE, 0);
INSERT INTO "SubpageQuickLink" ("id", "subpageId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvent3p004a6en2al14feo0', 'cmlvent3m00406en2hyhwox4p', 'Performance Dashboard', 'Monitor database health and metrics.', '#', FALSE, 1);
INSERT INTO "SubpageQuickLink" ("id", "subpageId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvent3p004b6en2tvohi31k', 'cmlvent3m00406en2hyhwox4p', 'Data Recovery Request', 'Submit data restoration requests.', '#', TRUE, 2);
INSERT INTO "SubpageQuickLink" ("id", "subpageId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvent47004l6en2tyi0n94x', 'cmlvent3y004c6en2s2u0wwow', 'Server Request Form', 'Request new servers or modifications.', '#', FALSE, 0);
INSERT INTO "SubpageQuickLink" ("id", "subpageId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvent47004m6en2u6jxv0tv', 'cmlvent3y004c6en2s2u0wwow', 'Storage Dashboard', 'Monitor storage capacity and usage.', '#', FALSE, 1);
INSERT INTO "SubpageQuickLink" ("id", "subpageId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvent47004n6en2gfpw7l29', 'cmlvent3y004c6en2s2u0wwow', 'Backup Restore Request', 'Submit file or system restoration requests.', '#', TRUE, 2);
INSERT INTO "SubpageQuickLink" ("id", "subpageId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvent4k004x6en2hbuqa4bx', 'cmlvent4g004o6en27uxy2g98', 'VM Request Form', 'Request new virtual machines.', '#', FALSE, 0);
INSERT INTO "SubpageQuickLink" ("id", "subpageId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvent4k004y6en2c1e13jxa', 'cmlvent4g004o6en27uxy2g98', 'vCenter Dashboard', 'Monitor virtualization infrastructure.', '#', FALSE, 1);
INSERT INTO "SubpageQuickLink" ("id", "subpageId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvent4k004z6en2yeb4s0um', 'cmlvent4g004o6en27uxy2g98', 'VDI Access Request', 'Request virtual desktop access.', '#', TRUE, 2);

-- ServiceArea: 21 rows
INSERT INTO "ServiceArea" ("id", "teamId", "serviceAreaId", "title", "shortDescription", "fullDescription", "features", "icon", "link", "sortOrder") VALUES ('cmlvent6700636en288zs0h85', 'cmlvent6600616en2hs0z7mic', 'tacs', 'Application Support for TACS', 'Full in-house design and development for the Taxation and Collection System (TACS) - responsible for approximately 60% of the City''s operating budget.', 'Provide full-in-house design and in-house application development for the Taxation and Collection System (TACS) application for the City of Edmonton.

The usage of TACS in the organization is to assess, bill, and collect property taxes and is responsible for approximately 60% of the City''s operating budget.', '{"Property tax assessment","Tax billing and collection","Responsible for ~60% of City operating budget","Full in-house development and support","Critical financial system"}', NULL, '/tacs', 1);
INSERT INTO "ServiceArea" ("id", "teamId", "serviceAreaId", "title", "shortDescription", "fullDescription", "features", "icon", "link", "sortOrder") VALUES ('cmlvent6700646en2x7wkcqme', 'cmlvent6600616en2hs0z7mic', 'weblogic', 'Application Support for WebLogic', 'Technical support and maintenance of Oracle WebLogic Server infrastructure that runs critical Oracle applications including AMIS, TACS, and TOPS.', 'Technical support and maintenance of the infrastructure. The Oracle Weblogic Server is a JAVA virtual machine that at the City of Edmonton is used to run Oracle Fusion Middleware.

The middleware allows for the development, deployment, and execution of Oracle applications (AMIS, CACTIS, Debentures, ETDS, MVCIS, PAC, TACS, TOPS).', '{"Oracle WebLogic Server infrastructure support","Oracle Fusion Middleware management","Support for 8+ critical Oracle applications","JAVA virtual machine environment","Application deployment and execution"}', NULL, '/weblogic', 2);
INSERT INTO "ServiceArea" ("id", "teamId", "serviceAreaId", "title", "shortDescription", "fullDescription", "features", "icon", "link", "sortOrder") VALUES ('cmlvent6700656en2yp2wyiye', 'cmlvent6600616en2hs0z7mic', 'google-workspace', 'Application Support for Google Workspace', 'Cloud-based productivity and collaboration tools including Gmail, Drive, Docs, Meet, and Calendar for all City employees.', 'Google Workspace is a collection of cloud computing, productivity and collaboration tools, software and products developed and marketed by Google.

It provides comprehensive communication, collaboration, cloud storage, and content creation capabilities for all City of Edmonton employees.', '{"Communication: Gmail, Contacts, Calendar, Meet, Chat","Cloud Storage: Google Drive","Content Creation: Docs, Sheets, Slides, Forms","Collaboration: Sites, Drawings, Keep","Enterprise-wide deployment"}', NULL, '/google-workspace', 3);
INSERT INTO "ServiceArea" ("id", "teamId", "serviceAreaId", "title", "shortDescription", "fullDescription", "features", "icon", "link", "sortOrder") VALUES ('cmlvent6700676en26lpu41fr', 'cmlvent6600616en2hs0z7mic', 'rapid-development', 'Rapid Development Services', 'Agile, iterative development using low-code platforms to deliver robust functionality with unprecedented speed and efficiency.', 'Rapid Development Services empower you to transform your business with unprecedented speed and efficiency. By leveraging an agile, iterative approach and cutting-edge tools like low-code platforms, we deliver the robust functionality of custom development without the traditional overhead.

Experience the power of streamlined workflows, captivating apps, and optimized processes, all within a fraction of the time and cost. Unlock your organization''s full potential and accelerate your path to success with Rapid Development Services.', '{"Agile, iterative development approach","Low-code platform utilization","Rapid application delivery","Reduced time and cost","Streamlined workflows and processes"}', NULL, '/rapid-development', 5);
INSERT INTO "ServiceArea" ("id", "teamId", "serviceAreaId", "title", "shortDescription", "fullDescription", "features", "icon", "link", "sortOrder") VALUES ('cmlvent6j00696en2fzd6bsyo', 'cmlvent6i00686en299x0kho2', 'advisory-services', 'Cyber Security Advisory Services', 'Providing cyber security advice on specifications, best practices, risk assessments, scorecards, and risk acceptance for all City systems.', 'The Cyber Security Advisory Services and Architecture team provides cyber security advice to all City of Edmonton (CoE) IT Service providers on CoE Cyber security specifications and best practices; and to all CoE business units for security requirements, risk assessments, scorecards, and risk acceptance.

You will need to reach out to the Cyber Security Advisory Services team if you are implementing or significantly changing the security posture of an existing system either on-premise or in the cloud where the system deals with: Operational Technology, politically and reputationally sensitive public facing systems, providing or managing access to CoE systems for non-CoE personnel, a system that is operationally critical or if it is going to contain Confidential (including FOIP) or Restricted information.', '{"Cyber security specifications and best practices","Security requirements and risk assessments","Security scorecards and risk acceptance","Operational Technology security","Public-facing system security consultation"}', NULL, '/advisory-services', 0);
INSERT INTO "ServiceArea" ("id", "teamId", "serviceAreaId", "title", "shortDescription", "fullDescription", "features", "icon", "link", "sortOrder") VALUES ('cmlvent6j006a6en25kxmdi3f', 'cmlvent6i00686en299x0kho2', 'directory-services', 'Directory Services', 'Managing the Corporate Directory Service - the backbone for all Corporate network and technology assets including Active Directory and PKI.', 'The Corporate Directory Service is the backbone for all Corporate network and technology assets. Without this critical service, employees and partners would not be able to access Corporate technology resources and assets.

We provide comprehensive directory and access management services to ensure secure and reliable access to all City technology resources.', '{"Active Directory management","Domain Groups and Policies management","Domain Controller management","PKI and SSL Certificate management","Secure File Transfer Protocol services","Azure environment access management"}', NULL, '/directory-services', 1);
INSERT INTO "ServiceArea" ("id", "teamId", "serviceAreaId", "title", "shortDescription", "fullDescription", "features", "icon", "link", "sortOrder") VALUES ('cmlvent6700666en2c4uztrz0', 'cmlvent6600616en2hs0z7mic', 'branch-solutions', 'Application Technology Services for City Branches', 'Technical support for branch-specific applications including troubleshooting, updates, upgrades, roadmapping, and low-code/no-code app creation.', 'Technical support for the identified business areas'' applications. Services include troubleshooting, problem-solving, software updates, application upgrades and maintenance, application roadmapping, and low-code/no-code application creation.

We work directly with City branches to deliver tailored solutions that meet their unique business needs.', '{"Application troubleshooting and problem-solving","Software updates and application upgrades","Application maintenance and support","Application roadmapping and planning","Low-code/no-code application development"}', NULL, '/branch-solutions', 4);
INSERT INTO "ServiceArea" ("id", "teamId", "serviceAreaId", "title", "shortDescription", "fullDescription", "features", "icon", "link", "sortOrder") VALUES ('cmlvent6j006c6en2ujxd0zk7', 'cmlvent6i00686en299x0kho2', 'incident-response', 'Cybersecurity Investigation & Incident Response', 'SOC monitoring, threat detection, incident response, vulnerability management, and malware forensics with 24x7 MDR service.', 'Providing comprehensive cybersecurity investigation, incident response, and security operations services to protect the City from cyber threats.

We operate an internal SOC monitoring threats entering via email, network, endpoint, or cloud, working closely with Mandiant MDR SOC to remediate threats 24x7.', '{"Vulnerability Assurance - iterative vulnerability management","Cybersecurity Operations Centre - 24x7 threat monitoring","Incident Management - MDR service with FireEye/Mandiant","Malware Forensics & Investigations","Computer forensics and employee investigations"}', NULL, '/incident-response', 3);
INSERT INTO "ServiceArea" ("id", "teamId", "serviceAreaId", "title", "shortDescription", "fullDescription", "features", "icon", "link", "sortOrder") VALUES ('cmlvent6j006d6en261gia2d2', 'cmlvent6i00686en299x0kho2', 'governance-compliance', 'Governance, Risk, Compliance, and Awareness', 'Creating cybersecurity policies, delivering awareness education, providing risk assessments, and coordinating security audits.', 'Providing governance, risk management, compliance, and awareness services to establish and maintain a strong cybersecurity posture across the City.

We create policies, deliver training, assess risks, and coordinate audits to ensure the City meets cybersecurity requirements and best practices.', '{"Cybersecurity policies and standards creation","Cybersecurity awareness and education","Consulting and risk assessment services","Internal and external audit coordination","Exercise design and implementation"}', NULL, '/governance-compliance', 4);
INSERT INTO "ServiceArea" ("id", "teamId", "serviceAreaId", "title", "shortDescription", "fullDescription", "features", "icon", "link", "sortOrder") VALUES ('cmlvent6j006e6en2wm4m515i', 'cmlvent6i00686en299x0kho2', 'identity-access', 'Digital Identity & Access Management', 'Enterprise IAM operations including user provisioning, offboarding, EIAM portal, and Multi-Factor Authentication implementation.', 'Digital Identity & Access Management (IAM) operations provide comprehensive identity and access services for the City''s workforce.

From onboarding to offboarding, we manage digital identities and access rights, implementing modern security controls like Multi-Factor Authentication across all externally available workforce access.', '{"New user digital ID creation and access provisioning","Employee offboarding and access removal","Enterprise IAM (EIAM) portal operation","Self-serve Digital ID services","Multi-Factor Authentication implementation"}', NULL, '/identity-access', 5);
INSERT INTO "ServiceArea" ("id", "teamId", "serviceAreaId", "title", "shortDescription", "fullDescription", "features", "icon", "link", "sortOrder") VALUES ('cmlvent6u006g6en2i72qrne5', 'cmlvent6t006f6en2cjwul3e0', 'technology-investment', 'Technology Investment & Financial Management', 'Managing the intake, evaluation, and governance of multi-stakeholder technology projects aligned with City strategies.', 'Technology Investment is responsible for the intake and governance of multi-stakeholder and complex technology projects (commonly referred to as Tier A). By taking an investment focused approach, our team helps align Tier A (over $75,000) projects to the City''s strategies and objectives, ensuring that the value from these projects is communicated and realized.

The team also manages the governance of Tier A technology projects by facilitating and coordinating regularly recurring meetings between directors, branch managers, and executives across the City of Edmonton.', '{"Technology Investment intake, evaluation, and prioritization","4-year Corporate Technology Capital budget planning","Financial Management Office - budget planning and reporting","Corporate Business Technology Governance support","People Services - staffing and FTE management"}', NULL, '/technology-investment', 0);
INSERT INTO "ServiceArea" ("id", "teamId", "serviceAreaId", "title", "shortDescription", "fullDescription", "features", "icon", "link", "sortOrder") VALUES ('cmlvent6u006h6en2rbxjg95o', 'cmlvent6t006f6en2cjwul3e0', 'business-engagement', 'Business Engagement', 'First point of contact for new technology initiatives, providing business case consulting and portfolio management.', 'This team is the first point of contact for new technology initiatives and provides services such as business case consulting and review, strategy and portfolio management, and organization change management.

We oversee and manage the OCT intake process for all technology requests (Tier A, B, & C) and the OCT concurrence process with focus on building business engagement with stakeholders across the city.', '{"Technology Intake - track and evaluate new requests","Technology Concurrence - guide OCT concurrence process","Business Case Review - quality assurance and validation","Organizational Change Management consultation","Strategy and Portfolio Management"}', NULL, '/business-engagement', 1);
INSERT INTO "ServiceArea" ("id", "teamId", "serviceAreaId", "title", "shortDescription", "fullDescription", "features", "icon", "link", "sortOrder") VALUES ('cmlvent6u006i6en2u1da4wzc', 'cmlvent6t006f6en2cjwul3e0', 'vendor-management', 'Vendor Management Office', 'Proactive management of technology vendors and contracts, supporting $30M annually in transactions.', 'The Vendor Management Office (VMO) is responsible for the effective and proactive management of all Technology Related Vendors (TRV) and contracts associated with the delivery of computer hardware, software, and supporting services for the City of Edmonton.

The VMO currently supports, negotiates, and manages approximately 500 contracts over 400 different vendors and is responsible for approximately $30M annually in transactions on behalf of OCT and branches across the City.', '{"Contract Lifecycle Management from initiation to termination","Advisory Services for procurement and negotiations","Procurement of IT hardware, software, and support","Financial Management and audit support","Vendor relationship management"}', NULL, '/vendor-management', 2);
INSERT INTO "ServiceArea" ("id", "teamId", "serviceAreaId", "title", "shortDescription", "fullDescription", "features", "icon", "link", "sortOrder") VALUES ('cmlvent6u006j6en27bija8dp', 'cmlvent6t006f6en2cjwul3e0', 'it-asset-management', 'IT Asset Management', 'Comprehensive lifecycle management of technology assets to maximize business value and ensure compliance.', 'IT asset management (ITAM) provides an accurate account of technology asset lifecycle costs and risks in order to maximize the business value of technology strategy, architecture, funding, contractual and sourcing decisions.

This service includes financial, contractual and inventory services to support life cycle management and strategic decision making for the IT environment. Assets include all elements of software and hardware that are found in the business environment.', '{"Purchase, lease, or rent hardware and software","Software installation and license compliance","Online hardware and software catalogs with self-service","Software audit and rationalization","Hardware delivery, installation, and configuration","Device rental and loaner pool management","Telephony and mobility device management"}', NULL, '/it-asset-management', 3);
INSERT INTO "ServiceArea" ("id", "teamId", "serviceAreaId", "title", "shortDescription", "fullDescription", "features", "icon", "link", "sortOrder") VALUES ('cmlvent73006l6en2gpn128uy', 'cmlvent73006k6en269eb9fx0', 'infrastructure-operations', 'Technology Infrastructure Operations', 'Ensuring servers, storage, backup, database, and workspace technology are always available through process improvements and automation.', 'Technology Infrastructure Operations ensures that servers, storage, backup, database, and workspace technology are always available and operate efficiently through process improvements and automation.

Our team provides critical services supporting the City''s database environment, storage and server operating systems, printing, data protection, server infrastructure, and virtualization platforms.', '{"Database Management - supporting City database environment","Server Solutions & Automation - OS, storage, printing, data protection","Virtualization - server infrastructure and platforms","Process improvements and automation","High availability and efficiency"}', NULL, '/technology-infrastructure-operations', 0);
INSERT INTO "ServiceArea" ("id", "teamId", "serviceAreaId", "title", "shortDescription", "fullDescription", "features", "icon", "link", "sortOrder") VALUES ('cmlvent73006m6en2ugzg9nve', 'cmlvent73006k6en269eb9fx0', 'telecom-iot', 'Telecom and Internet of Things (IoT)', 'Communication services including wireline, VoIP, cellular wireless, M2M, LoRaWAN IoT network and Cisco Call Center solutions.', 'Telecommunications provides various communication services including wireline & VoIP (Voice over IP) phone, cellular wireless, M2M (machine to machine), LoRaWAN IoT network and a Cisco Call Center solution to serve and support all City business areas.

The Internet of Things (IoT) refers to networked devices embedded with sensors and software, allowing them to collect and share data that can be processed and utilized for various purposes across the City.', '{"Wireline & VoIP phone services","Cellular wireless and M2M communications","LoRaWAN IoT network infrastructure","Cisco Call Center solutions","IoT device management and data collection"}', NULL, '/telecom-iot', 1);
INSERT INTO "ServiceArea" ("id", "teamId", "serviceAreaId", "title", "shortDescription", "fullDescription", "features", "icon", "link", "sortOrder") VALUES ('cmlvent73006n6en2peh60p8l', 'cmlvent73006k6en269eb9fx0', 'data-technology', 'Data Technology', 'Core networking, data center operations, and application delivery services enabling seamless connectivity across the City.', 'Data Technology is a core component of the Integrated Technology Solutions (ITS) team, dedicated to enabling City of Edmonton employees and citizens to seamlessly connect with technology, applications, and each other.

We manage the City''s network infrastructure, data center facilities, and application delivery platforms to ensure reliable, secure connectivity across all City operations.', '{"Connecting Technologies - ADCs, cloud, Appspace, digital faxing","Data Center - on-prem and colocation facility management","Network - 1,000+ switches, 1,400+ APs, 300 km fiber","Secure application delivery","City-wide connectivity infrastructure"}', NULL, '/data-technology', 2);
INSERT INTO "ServiceArea" ("id", "teamId", "serviceAreaId", "title", "shortDescription", "fullDescription", "features", "icon", "link", "sortOrder") VALUES ('cmlvent73006o6en2eo94wm8l', 'cmlvent73006k6en269eb9fx0', 'partner-experience', 'Partner Experience', 'User assistance and computing environment management including Service Desk, Desktop Support, and Desktop Administration.', 'Partner Experience delivers essential user assistance and manages our computing environment through several key functional areas to help our internal customers provide services to our citizens.

We provide comprehensive support from remote troubleshooting to in-person assistance, managing approximately 12,000 computing devices across the City.', '{"Service Desk - IT assistance via tickets and calls","Desktop Support - in-person break-fix services","Desktop Administration - ~12,000 device management","Operating system and patch management","Software deployment and configuration"}', NULL, '/partner-experience', 3);
INSERT INTO "ServiceArea" ("id", "teamId", "serviceAreaId", "title", "shortDescription", "fullDescription", "features", "icon", "link", "sortOrder") VALUES ('cmlvent73006p6en207lqjdq5', 'cmlvent73006k6en269eb9fx0', 'service-delivery', 'Service Delivery and Analytics', 'Service Management Office and Monitoring & Analytics providing process management, ITSM platform support, and comprehensive monitoring.', 'The Service Management Office (SMO) is instrumental in both operational and business-facing aspects of IT service delivery, focusing on Change, Problem, and Incident Management processes while managing the Digital Workplace Catalog and Work Order process.

Monitoring & Analytics provides reliable monitoring platforms for IT infrastructure, networks, applications, and user interfaces with modern alerting, dashboards, and AI-powered analysis tools.', '{"Change, Problem, and Incident Management","Digital Workplace Catalog management","CMDB and Remedy ITSM platform support","Infrastructure and application monitoring","AI-powered data analysis and dashboards"}', NULL, '/service-delivery', 4);
INSERT INTO "ServiceArea" ("id", "teamId", "serviceAreaId", "title", "shortDescription", "fullDescription", "features", "icon", "link", "sortOrder") VALUES ('cmlvent6700626en2632ajftb', 'cmlvent6600616en2hs0z7mic', 'posse', 'Application Support for POSSE', 'Technical support, development and maintenance of the POSSE platform - a powerful configurable enterprise platform and workflow engine that automates business processes.', 'Technical support, development and maintenance of the POSSE platform. POSSE (Public One Stop Service) is a powerful configurable enterprise platform and workflow engine that automates, integrates, monitors and enforces business process rules.

The term "configurable" simply means that POSSE can be changed to meet the needs of different business areas. POSSE is a corporate system used by all city departments, citizens and other external business partners.', '{"Enterprise platform and workflow engine","Business process automation and integration","Business process rule enforcement","Configurable to meet different business area needs","Used by all City departments and external partners"}', NULL, '/posse', 0);
INSERT INTO "ServiceArea" ("id", "teamId", "serviceAreaId", "title", "shortDescription", "fullDescription", "features", "icon", "link", "sortOrder") VALUES ('cmlvent6j006b6en2904qdll4', 'cmlvent6i00686en299x0kho2', 'continuity-recovery', 'Continuity and Recovery Services', 'IT Disaster Recovery Program ensuring critical services remain available through business continuity planning and crisis management.', 'Supporting the City in its delivery of uninterrupted critical services, Open City and Technology is responsible for ensuring that the technology required to deliver the CoE''s most critical services are available when needed most.

This is achieved through the Information Technology Disaster Recovery Program which aligns to the corporate Business Continuity Management Program.', '{"OCT business continuity planning","Crisis management planning and coordination","Disaster recovery training and awareness","Current state capability assessments","Improvement recommendations","Exercise design, implementation, and reporting","IT business continuity and DR audits"}', NULL, '/continuity-recovery', 2);

-- WidgetInstance: 169 rows
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventa400766en2n75ekgyb', 'cmlvent6600616en2hs0z7mic', 'cmlvent9100706en2675mk5m8', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventa900776en283nhovfz', 'cmlvent6i00686en299x0kho2', 'cmlvent9100706en2675mk5m8', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventae00786en2vzzg1ahc', 'cmlvent6t006f6en2cjwul3e0', 'cmlvent9100706en2675mk5m8', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventaj00796en2zlsnf36c', 'cmlvent73006k6en269eb9fx0', 'cmlvent9100706en2675mk5m8', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventan007a6en2cpwauybt', 'cmlvensul00016en27ro3bxrt', 'cmlvent82006s6en2wvs0n3lk', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventas007b6en2w769xvg5', 'cmlvensul00016en27ro3bxrt', 'cmlvent87006t6en262m69xxi', 1, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventaw007c6en2m70dfj9r', 'cmlvensul00016en27ro3bxrt', 'cmlvent8b006u6en2kdi07gw4', 2, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventb1007d6en2cro6bdq7', 'cmlvensul00016en27ro3bxrt', 'cmlvent8f006v6en28yd2qbrv', 3, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventb5007e6en27mln4swx', 'cmlvensul00016en27ro3bxrt', 'cmlvent8k006w6en2rahxh51w', 4, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventba007f6en2t2i0tzw1', 'cmlvensul00016en27ro3bxrt', 'cmlvent8o006x6en2y4n9h6x5', 5, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventbe007g6en2zth4hw8z', 'cmlvensul00016en27ro3bxrt', 'cmlvent8t006y6en25wevvyur', 6, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventbj007h6en2rn2k84se', 'cmlvensul00016en27ro3bxrt', 'cmlvent8x006z6en2xjn2dp9g', 7, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventbo007i6en2w6zu6iw3', 'cmlvenswo000s6en253u5ag6s', 'cmlvent82006s6en2wvs0n3lk', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventbs007j6en2525j6rkh', 'cmlvenswo000s6en253u5ag6s', 'cmlvent87006t6en262m69xxi', 1, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventbx007k6en2ca9tg1a4', 'cmlvenswo000s6en253u5ag6s', 'cmlvent8b006u6en2kdi07gw4', 2, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventc1007l6en2rzm3g430', 'cmlvenswo000s6en253u5ag6s', 'cmlvent8f006v6en28yd2qbrv', 3, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventc5007m6en2ypo5xja1', 'cmlvenswo000s6en253u5ag6s', 'cmlvent8k006w6en2rahxh51w', 4, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventca007n6en2i16c6q5h', 'cmlvenswo000s6en253u5ag6s', 'cmlvent8o006x6en2y4n9h6x5', 5, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventce007o6en2jg32po11', 'cmlvenswo000s6en253u5ag6s', 'cmlvent8t006y6en25wevvyur', 6, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventci007p6en2wzxwdoz8', 'cmlvenswo000s6en253u5ag6s', 'cmlvent8x006z6en2xjn2dp9g', 7, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventcn007q6en2if43pqgr', 'cmlvensya001e6en2la9l1uja', 'cmlvent82006s6en2wvs0n3lk', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventcr007r6en205sukt3l', 'cmlvensya001e6en2la9l1uja', 'cmlvent87006t6en262m69xxi', 1, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventcw007s6en2e76yzzqm', 'cmlvensya001e6en2la9l1uja', 'cmlvent8b006u6en2kdi07gw4', 2, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventd0007t6en2kbc9je7q', 'cmlvensya001e6en2la9l1uja', 'cmlvent8f006v6en28yd2qbrv', 3, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventd4007u6en280uro4z0', 'cmlvensya001e6en2la9l1uja', 'cmlvent8k006w6en2rahxh51w', 4, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventd9007v6en2suulgrcp', 'cmlvensya001e6en2la9l1uja', 'cmlvent8o006x6en2y4n9h6x5', 5, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventde007w6en28a85zpft', 'cmlvensya001e6en2la9l1uja', 'cmlvent8t006y6en25wevvyur', 6, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventdl007x6en2e9yjg6uz', 'cmlvensya001e6en2la9l1uja', 'cmlvent8x006z6en2xjn2dp9g', 7, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventdq007y6en2ourybxsm', 'cmlvent7q006q6en244qn4p3h', 'cmlvent82006s6en2wvs0n3lk', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventdw007z6en2g59jw95y', 'cmlvent7q006q6en244qn4p3h', 'cmlvent87006t6en262m69xxi', 1, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlvente100806en211rif57q', 'cmlvent7q006q6en244qn4p3h', 'cmlvent8b006u6en2kdi07gw4', 2, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlvente700816en2jof0e8p4', 'cmlvent7q006q6en244qn4p3h', 'cmlvent8f006v6en28yd2qbrv', 3, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventec00826en2rx6a5lrj', 'cmlvent7q006q6en244qn4p3h', 'cmlvent8k006w6en2rahxh51w', 4, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventei00836en2519f7nej', 'cmlvent7q006q6en244qn4p3h', 'cmlvent8o006x6en2y4n9h6x5', 5, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventen00846en2e8wpk7y9', 'cmlvent7q006q6en244qn4p3h', 'cmlvent8t006y6en25wevvyur', 6, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventes00856en20qyasfxy', 'cmlvent7q006q6en244qn4p3h', 'cmlvent8x006z6en2xjn2dp9g', 7, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventey00866en2vq9q75md', 'cmlvent7v006r6en2bupsvv2m', 'cmlvent82006s6en2wvs0n3lk', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventf200876en2pli6ud82', 'cmlvent7v006r6en2bupsvv2m', 'cmlvent87006t6en262m69xxi', 1, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventf600886en2hu4r0lhy', 'cmlvent7v006r6en2bupsvv2m', 'cmlvent8b006u6en2kdi07gw4', 2, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventfa00896en2iol881gi', 'cmlvent7v006r6en2bupsvv2m', 'cmlvent8f006v6en28yd2qbrv', 3, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventff008a6en2tlkvhgbp', 'cmlvent7v006r6en2bupsvv2m', 'cmlvent8k006w6en2rahxh51w', 4, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventfk008b6en2wtmt21u9', 'cmlvent7v006r6en2bupsvv2m', 'cmlvent8o006x6en2y4n9h6x5', 5, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventfp008c6en215bm6f45', 'cmlvent7v006r6en2bupsvv2m', 'cmlvent8t006y6en25wevvyur', 6, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventfu008d6en219gt6t82', 'cmlvent7v006r6en2bupsvv2m', 'cmlvent8x006z6en2xjn2dp9g', 7, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventk8008q6en250v6ea9i', 'cmlventin008e6en2fbfvks30', 'cmlvent9500716en28iuvvrf6', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventkd008r6en20t1jqcj8', 'cmlventin008e6en2fbfvks30', 'cmlvent9a00726en242whxcpi', 1, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventkj008s6en23u24dpl6', 'cmlventin008e6en2fbfvks30', 'cmlvent9e00736en2hiuybqjx', 2, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventkp008t6en2h8v3ksei', 'cmlventin008e6en2fbfvks30', 'cmlvent9i00746en23d9tce9k', 3, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventku008u6en2cwn036hd', 'cmlventin008e6en2fbfvks30', 'cmlvent9n00756en2hbba30tu', 4, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventmg00976en2jn1dmw6g', 'cmlventl4008v6en2iz7ygp0g', 'cmlvent9500716en28iuvvrf6', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventmp00986en2nkhhp2t7', 'cmlventl4008v6en2iz7ygp0g', 'cmlvent9a00726en242whxcpi', 1, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventmx00996en2xtqz7isr', 'cmlventl4008v6en2iz7ygp0g', 'cmlvent9e00736en2hiuybqjx', 2, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventn7009a6en2s74fxmlu', 'cmlventl4008v6en2iz7ygp0g', 'cmlvent9i00746en23d9tce9k', 3, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventng009b6en2902y8fcs', 'cmlventl4008v6en2iz7ygp0g', 'cmlvent9n00756en2hbba30tu', 4, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventpm009o6en22yqws0ps', 'cmlventns009c6en24cffno5p', 'cmlvent9500716en28iuvvrf6', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventpv009p6en27a40or2y', 'cmlventns009c6en24cffno5p', 'cmlvent9a00726en242whxcpi', 1, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventq5009q6en22jwjk6jb', 'cmlventns009c6en24cffno5p', 'cmlvent9e00736en2hiuybqjx', 2, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventqe009r6en232s8k6m8', 'cmlventns009c6en24cffno5p', 'cmlvent9i00746en23d9tce9k', 3, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventqm009s6en20bm3xp2k', 'cmlventns009c6en24cffno5p', 'cmlvent9n00756en2hbba30tu', 4, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventsd00a56en211zlf1mq', 'cmlventqv009t6en2pk5blh5c', 'cmlvent9500716en28iuvvrf6', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventsl00a66en2bqa91g54', 'cmlventqv009t6en2pk5blh5c', 'cmlvent9a00726en242whxcpi', 1, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventsr00a76en2zgoz2pop', 'cmlventqv009t6en2pk5blh5c', 'cmlvent9e00736en2hiuybqjx', 2, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventsy00a86en2ttvrhe5n', 'cmlventqv009t6en2pk5blh5c', 'cmlvent9i00746en23d9tce9k', 3, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventt500a96en2adx1iehn', 'cmlventqv009t6en2pk5blh5c', 'cmlvent9n00756en2hbba30tu', 4, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventur00am6en2gx2y57ht', 'cmlventtf00aa6en2l4uc4syn', 'cmlvent9500716en28iuvvrf6', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventuz00an6en29xrocb1r', 'cmlventtf00aa6en2l4uc4syn', 'cmlvent9a00726en242whxcpi', 1, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventv700ao6en26qx5vaqx', 'cmlventtf00aa6en2l4uc4syn', 'cmlvent9e00736en2hiuybqjx', 2, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventvf00ap6en21py4q9ix', 'cmlventtf00aa6en2l4uc4syn', 'cmlvent9i00746en23d9tce9k', 3, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventvm00aq6en28dv9ooin', 'cmlventtf00aa6en2l4uc4syn', 'cmlvent9n00756en2hbba30tu', 4, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventxm00b36en2l1ma8got', 'cmlventvy00ar6en2gmjolwjb', 'cmlvent9500716en28iuvvrf6', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventxv00b46en2k7j00qnn', 'cmlventvy00ar6en2gmjolwjb', 'cmlvent9a00726en242whxcpi', 1, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventy400b56en225kixott', 'cmlventvy00ar6en2gmjolwjb', 'cmlvent9e00736en2hiuybqjx', 2, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventyd00b66en2jpvf8hf4', 'cmlventvy00ar6en2gmjolwjb', 'cmlvent9i00746en23d9tce9k', 3, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlventym00b76en27iudch90', 'cmlventvy00ar6en2gmjolwjb', 'cmlvent9n00756en2hbba30tu', 4, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlvenu0w00bk6en29e4nzjd0', 'cmlventyy00b86en2yzuio14r', 'cmlvent9500716en28iuvvrf6', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlvenu1400bl6en2c7jft0ed', 'cmlventyy00b86en2yzuio14r', 'cmlvent9a00726en242whxcpi', 1, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlvenu1c00bm6en2xg1jq699', 'cmlventyy00b86en2yzuio14r', 'cmlvent9e00736en2hiuybqjx', 2, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlvenu1j00bn6en2z2ct4u7u', 'cmlventyy00b86en2yzuio14r', 'cmlvent9i00746en23d9tce9k', 3, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlvenu1r00bo6en20h0m3c8h', 'cmlventyy00b86en2yzuio14r', 'cmlvent9n00756en2hbba30tu', 4, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlvenu3o00c16en2ddc2u0o4', 'cmlvenu2000bp6en2302jxreg', 'cmlvent9500716en28iuvvrf6', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlvenu3x00c26en2of8mf8a8', 'cmlvenu2000bp6en2302jxreg', 'cmlvent9a00726en242whxcpi', 1, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlvenu4800c36en2wvi0wli1', 'cmlvenu2000bp6en2302jxreg', 'cmlvent9e00736en2hiuybqjx', 2, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlvenu4j00c46en2h608cxya', 'cmlvenu2000bp6en2302jxreg', 'cmlvent9i00746en23d9tce9k', 3, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlvenu4r00c56en2jqg5f1gq', 'cmlvenu2000bp6en2302jxreg', 'cmlvent9n00756en2hbba30tu', 4, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlvenu6t00ci6en2nkw68m8j', 'cmlvenu5100c66en2zn8wq782', 'cmlvent9500716en28iuvvrf6', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlvenu7300cj6en22aphcqnj', 'cmlvenu5100c66en2zn8wq782', 'cmlvent9a00726en242whxcpi', 1, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlvenu7c00ck6en24njg3vqm', 'cmlvenu5100c66en2zn8wq782', 'cmlvent9e00736en2hiuybqjx', 2, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlvenu7l00cl6en205spg8k0', 'cmlvenu5100c66en2zn8wq782', 'cmlvent9i00746en23d9tce9k', 3, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmlvenu7u00cm6en22thi6iwo', 'cmlvenu5100c66en2zn8wq782', 'cmlvent9n00756en2hbba30tu', 4, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jxwv00013uee96kilh7u', 'cmmj7jxw500003ueeyg5y9xla', 'cmlvent9500716en28iuvvrf6', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jxx300023ueebl319vv5', 'cmmj7jxw500003ueeyg5y9xla', 'cmlvent9a00726en242whxcpi', 1, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jxx700033uee86oltbsa', 'cmmj7jxw500003ueeyg5y9xla', 'cmlvent9e00736en2hiuybqjx', 2, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jxxc00043ueeh90a9puj', 'cmmj7jxw500003ueeyg5y9xla', 'cmlvent9i00746en23d9tce9k', 3, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jxxg00053ueeenipa02n', 'cmmj7jxw500003ueeyg5y9xla', 'cmlvent9n00756en2hbba30tu', 4, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jxy700073uee116i3la7', 'cmmj7jxy300063uee60wsktdi', 'cmlvent9500716en28iuvvrf6', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jxya00083ueeyia9g03e', 'cmmj7jxy300063uee60wsktdi', 'cmlvent9a00726en242whxcpi', 1, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jxyd00093ueeq2yqzcov', 'cmmj7jxy300063uee60wsktdi', 'cmlvent9e00736en2hiuybqjx', 2, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jxyg000a3ueeb0g7mvs0', 'cmmj7jxy300063uee60wsktdi', 'cmlvent9i00746en23d9tce9k', 3, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jxyj000b3ueed9dbmezo', 'cmmj7jxy300063uee60wsktdi', 'cmlvent9n00756en2hbba30tu', 4, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jxyw000d3ueeusnblrzh', 'cmmj7jxys000c3ueewgkwk8v1', 'cmlvent9500716en28iuvvrf6', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jxyz000e3uee3995u24d', 'cmmj7jxys000c3ueewgkwk8v1', 'cmlvent9a00726en242whxcpi', 1, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jxz2000f3ueey7xwvtf9', 'cmmj7jxys000c3ueewgkwk8v1', 'cmlvent9e00736en2hiuybqjx', 2, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jxz5000g3ueeb9ukduaa', 'cmmj7jxys000c3ueewgkwk8v1', 'cmlvent9i00746en23d9tce9k', 3, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jxz8000h3uee75r8hpe8', 'cmmj7jxys000c3ueewgkwk8v1', 'cmlvent9n00756en2hbba30tu', 4, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jxzl000j3ueesh81ct2c', 'cmmj7jxzh000i3ueec18blqgh', 'cmlvent9500716en28iuvvrf6', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jxzp000k3ueepio3cf3h', 'cmmj7jxzh000i3ueec18blqgh', 'cmlvent9a00726en242whxcpi', 1, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jxzs000l3ueeou43jet6', 'cmmj7jxzh000i3ueec18blqgh', 'cmlvent9e00736en2hiuybqjx', 2, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jxzv000m3ueeos20suq6', 'cmmj7jxzh000i3ueec18blqgh', 'cmlvent9i00746en23d9tce9k', 3, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jxzy000n3ueebnf5fpp7', 'cmmj7jxzh000i3ueec18blqgh', 'cmlvent9n00756en2hbba30tu', 4, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy0c000p3ueegsdfieib', 'cmmj7jy07000o3ueekqqkaldu', 'cmlvent9500716en28iuvvrf6', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy0f000q3ueer6nzwrkv', 'cmmj7jy07000o3ueekqqkaldu', 'cmlvent9a00726en242whxcpi', 1, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy0h000r3ueerpstggr5', 'cmmj7jy07000o3ueekqqkaldu', 'cmlvent9e00736en2hiuybqjx', 2, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy0k000s3ueeak6v5ezk', 'cmmj7jy07000o3ueekqqkaldu', 'cmlvent9i00746en23d9tce9k', 3, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy0n000t3ueeh6v3w8o1', 'cmmj7jy07000o3ueekqqkaldu', 'cmlvent9n00756en2hbba30tu', 4, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy0y000v3ueer684xpiy', 'cmmj7jy0v000u3uee8wlua9uu', 'cmlvent9500716en28iuvvrf6', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy11000w3ueek9qe4m2b', 'cmmj7jy0v000u3uee8wlua9uu', 'cmlvent9a00726en242whxcpi', 1, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy14000x3ueeg9exvb7a', 'cmmj7jy0v000u3uee8wlua9uu', 'cmlvent9e00736en2hiuybqjx', 2, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy17000y3uee36j4gh8i', 'cmmj7jy0v000u3uee8wlua9uu', 'cmlvent9i00746en23d9tce9k', 3, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy1a000z3uee4y1l50gg', 'cmmj7jy0v000u3uee8wlua9uu', 'cmlvent9n00756en2hbba30tu', 4, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy1n00113ueefn8odlln', 'cmmj7jy1k00103ueeiv6ao6ic', 'cmlvent9500716en28iuvvrf6', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy1r00123ueekmsuc5ly', 'cmmj7jy1k00103ueeiv6ao6ic', 'cmlvent9a00726en242whxcpi', 1, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy1u00133uee4m1jilco', 'cmmj7jy1k00103ueeiv6ao6ic', 'cmlvent9e00736en2hiuybqjx', 2, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy1x00143ueersglxyaz', 'cmmj7jy1k00103ueeiv6ao6ic', 'cmlvent9i00746en23d9tce9k', 3, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy2000153ueeqszfqts5', 'cmmj7jy1k00103ueeiv6ao6ic', 'cmlvent9n00756en2hbba30tu', 4, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy2b00173ueexnnvqz0k', 'cmmj7jy2800163ueeglmedj16', 'cmlvent9500716en28iuvvrf6', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy2f00183ueegejggj24', 'cmmj7jy2800163ueeglmedj16', 'cmlvent9a00726en242whxcpi', 1, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy2j00193ueeldtnt7qk', 'cmmj7jy2800163ueeglmedj16', 'cmlvent9e00736en2hiuybqjx', 2, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy2o001a3ueefxp7dz27', 'cmmj7jy2800163ueeglmedj16', 'cmlvent9i00746en23d9tce9k', 3, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy2s001b3ueegr8m2x27', 'cmmj7jy2800163ueeglmedj16', 'cmlvent9n00756en2hbba30tu', 4, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy36001d3ueesa1hkeiq', 'cmmj7jy32001c3ueeizv8zlfe', 'cmlvent9500716en28iuvvrf6', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy39001e3ueec5b6ygpx', 'cmmj7jy32001c3ueeizv8zlfe', 'cmlvent9a00726en242whxcpi', 1, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy3c001f3uees2r9xbwe', 'cmmj7jy32001c3ueeizv8zlfe', 'cmlvent9e00736en2hiuybqjx', 2, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy3f001g3ueey0c9qjtc', 'cmmj7jy32001c3ueeizv8zlfe', 'cmlvent9i00746en23d9tce9k', 3, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy3j001h3ueeezq71que', 'cmmj7jy32001c3ueeizv8zlfe', 'cmlvent9n00756en2hbba30tu', 4, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy3u001j3uee1zv7x9ez', 'cmmj7jy3r001i3ueeey4vu4t9', 'cmlvent9500716en28iuvvrf6', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy3x001k3ueeftztvvv9', 'cmmj7jy3r001i3ueeey4vu4t9', 'cmlvent9a00726en242whxcpi', 1, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy40001l3ueer4lizmij', 'cmmj7jy3r001i3ueeey4vu4t9', 'cmlvent9e00736en2hiuybqjx', 2, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy43001m3ueeotzmh0el', 'cmmj7jy3r001i3ueeey4vu4t9', 'cmlvent9i00746en23d9tce9k', 3, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy46001n3ueewba66wi0', 'cmmj7jy3r001i3ueeey4vu4t9', 'cmlvent9n00756en2hbba30tu', 4, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy4h001p3ueelss78n57', 'cmmj7jy4e001o3ueekwomiocu', 'cmlvent9500716en28iuvvrf6', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy4k001q3ueebdxg91ph', 'cmmj7jy4e001o3ueekwomiocu', 'cmlvent9a00726en242whxcpi', 1, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy4n001r3ueehukx9dr8', 'cmmj7jy4e001o3ueekwomiocu', 'cmlvent9e00736en2hiuybqjx', 2, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy4r001s3uee1jabaw5f', 'cmmj7jy4e001o3ueekwomiocu', 'cmlvent9i00746en23d9tce9k', 3, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy4t001t3ueensi2flyv', 'cmmj7jy4e001o3ueekwomiocu', 'cmlvent9n00756en2hbba30tu', 4, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy54001v3ueekjsvl3ul', 'cmmj7jy51001u3ueemn6kud8t', 'cmlvent9500716en28iuvvrf6', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy58001w3ueejlx0vhq3', 'cmmj7jy51001u3ueemn6kud8t', 'cmlvent9a00726en242whxcpi', 1, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy5a001x3ueeb76rmd6k', 'cmmj7jy51001u3ueemn6kud8t', 'cmlvent9e00736en2hiuybqjx', 2, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy5d001y3ueecpcravbi', 'cmmj7jy51001u3ueemn6kud8t', 'cmlvent9i00746en23d9tce9k', 3, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy5g001z3ueelievysmw', 'cmmj7jy51001u3ueemn6kud8t', 'cmlvent9n00756en2hbba30tu', 4, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy5w00213uees2z2rw4l', 'cmmj7jy5t00203uee0zur9xqv', 'cmlvent9500716en28iuvvrf6', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy5z00223uee88kiqabn', 'cmmj7jy5t00203uee0zur9xqv', 'cmlvent9a00726en242whxcpi', 1, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy6200233ueez2b3gr7w', 'cmmj7jy5t00203uee0zur9xqv', 'cmlvent9e00736en2hiuybqjx', 2, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy6400243ueeau95qjfb', 'cmmj7jy5t00203uee0zur9xqv', 'cmlvent9i00746en23d9tce9k', 3, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy6700253ueekitjw7g5', 'cmmj7jy5t00203uee0zur9xqv', 'cmlvent9n00756en2hbba30tu', 4, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy6i00273ueehn1gxb4a', 'cmmj7jy6e00263ueeqaum029o', 'cmlvent9500716en28iuvvrf6', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy6m00283ueeysi4la9e', 'cmmj7jy6e00263ueeqaum029o', 'cmlvent9a00726en242whxcpi', 1, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy6q00293ueerr1fp3dt', 'cmmj7jy6e00263ueeqaum029o', 'cmlvent9e00736en2hiuybqjx', 2, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy6u002a3ueewje9kt2l', 'cmmj7jy6e00263ueeqaum029o', 'cmlvent9i00746en23d9tce9k', 3, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy6y002b3ueev4y2t8o4', 'cmmj7jy6e00263ueeqaum029o', 'cmlvent9n00756en2hbba30tu', 4, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy79002d3ueehoht4xpr', 'cmmj7jy77002c3uee8xb2mznd', 'cmlvent9500716en28iuvvrf6', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy7d002e3ueevi7fngi8', 'cmmj7jy77002c3uee8xb2mznd', 'cmlvent9a00726en242whxcpi', 1, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy7h002f3uee57c1j8ij', 'cmmj7jy77002c3uee8xb2mznd', 'cmlvent9e00736en2hiuybqjx', 2, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy7k002g3ueey2v262jx', 'cmmj7jy77002c3uee8xb2mznd', 'cmlvent9i00746en23d9tce9k', 3, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy7o002h3ueepvxff6gq', 'cmmj7jy77002c3uee8xb2mznd', 'cmlvent9n00756en2hbba30tu', 4, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy83002j3ueehq03pn3e', 'cmmj7jy7y002i3ueeubtodm5a', 'cmlvent9500716en28iuvvrf6', 0, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy87002k3ueeq34q9vf3', 'cmmj7jy7y002i3ueeubtodm5a', 'cmlvent9a00726en242whxcpi', 1, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy8b002l3ueevxprm9eo', 'cmmj7jy7y002i3ueeubtodm5a', 'cmlvent9e00736en2hiuybqjx', 2, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy8f002m3ueekls3u61h', 'cmmj7jy7y002i3ueeubtodm5a', 'cmlvent9i00746en23d9tce9k', 3, NULL);
INSERT INTO "WidgetInstance" ("id", "teamId", "widgetDefinitionId", "sortOrder", "config") VALUES ('cmmj7jy8j002n3ueea7s4svmi', 'cmmj7jy7y002i3ueeubtodm5a', 'cmlvent9n00756en2hbba30tu', 4, NULL);

-- TeamService: 36 rows
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlventiy008f6en23ygux1bo', 'cmlventin008e6en2fbfvks30', 'Connectivity (LAN/WAN)', '{"Wired office connectivity","Fibre optic backbone","Site-to-site switching"}', 0);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlventj3008g6en2zet28xe7', 'cmlventin008e6en2fbfvks30', 'Wireless (Wi-Fi)', '{"Corporate Secure Wi-Fi","Guest/Public Wi-Fi","High-density event wireless"}', 1);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlventj7008h6en2cbd3umfl', 'cmlventin008e6en2fbfvks30', 'Security Perimeter', '{"Firewall management","VPN & Remote Access","Intrusion Detection"}', 2);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlventja008i6en2qr7zp9j2', 'cmlventin008e6en2fbfvks30', 'Load Balancing', '{"Application traffic management","F5 BigIP Administration","SSL Offloading"}', 3);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlventl9008w6en2yebhl8zf', 'cmlventl4008v6en2iz7ygp0g', 'Facility Management', '{"Primary data centre operations","Colocation site management","Physical security controls"}', 0);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlventlc008x6en2d925ac5x', 'cmlventl4008v6en2iz7ygp0g', 'Power & Cooling', '{"UPS and generator systems","HVAC monitoring and control","Environmental sensors"}', 1);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlventlf008y6en2is5hg7ek', 'cmlventl4008v6en2iz7ygp0g', 'Rack & Cabling', '{"Server rack provisioning","Structured cabling standards","Cable management systems"}', 2);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlventlj008z6en2edlccnxx', 'cmlventl4008v6en2iz7ygp0g', 'Disaster Recovery', '{"Secondary site failover","Backup power testing","Business continuity planning"}', 3);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlvento0009d6en2p6e4ftkp', 'cmlventns009c6en24cffno5p', 'Voice Services (VoIP)', '{"Cisco IP phone provisioning","Voicemail and unified messaging","Call centre solutions"}', 0);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlvento6009e6en2tmctr5ej', 'cmlventns009c6en24cffno5p', 'Cellular & M2M', '{"Corporate mobile device plans","Machine-to-machine connectivity","Fleet tracking integration"}', 1);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlventoc009f6en26d1ouhxl', 'cmlventns009c6en24cffno5p', 'IoT Network', '{"LoRaWAN sensor network","Smart city device management","Environmental monitoring sensors"}', 2);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlventoj009g6en2zx1wiy56', 'cmlventns009c6en24cffno5p', 'Collaboration Tools', '{"Video conferencing systems","Digital signage (Appspace)","Meeting room technology"}', 3);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlventr3009u6en2qvevguym', 'cmlventqv009t6en2pk5blh5c', 'Incident Support', '{"Ticket submission and tracking","Phone support (780-496-8000)","Live chat assistance"}', 0);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlventr6009v6en2u4t3omkc', 'cmlventqv009t6en2pk5blh5c', 'Remote Troubleshooting', '{"Remote desktop support","Password resets","Software assistance"}', 1);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlventra009w6en2746nifid', 'cmlventqv009t6en2pk5blh5c', 'Service Requests', '{"Account provisioning","Access requests","Software installation"}', 2);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlventrg009x6en2grrr650k', 'cmlventqv009t6en2pk5blh5c', 'Knowledge Base', '{"Self-service articles","How-to guides","FAQ documentation"}', 3);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlventtk00ab6en2hlp4hf31', 'cmlventtf00aa6en2l4uc4syn', 'Hardware Support', '{"Computer repairs","Peripheral troubleshooting","Hardware replacement"}', 0);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlventto00ac6en20rgzkrzx', 'cmlventtf00aa6en2l4uc4syn', 'Software Support', '{"Application troubleshooting","Software installation","Configuration issues"}', 1);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlventts00ad6en28uzzr6j0', 'cmlventtf00aa6en2l4uc4syn', 'Workspace Setup', '{"New employee setup","Desk relocations","Equipment deployment"}', 2);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlventtw00ae6en2ex8ftpn5', 'cmlventtf00aa6en2l4uc4syn', 'Field Services', '{"On-site support visits","Multi-facility coverage","Emergency response"}', 3);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlventw500as6en2isn6kl2u', 'cmlventvy00ar6en2gmjolwjb', 'Device Management', '{"Endpoint provisioning","Device inventory","Asset tracking"}', 0);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlventwa00at6en2iml3cbou', 'cmlventvy00ar6en2gmjolwjb', 'Patch Management', '{"Security updates","OS patching","Compliance reporting"}', 1);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlventwg00au6en2c0wrkirc', 'cmlventvy00ar6en2gmjolwjb', 'Software Deployment', '{"Application packaging","Automated deployment","License management"}', 2);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlventwl00av6en2tzcliclk', 'cmlventvy00ar6en2gmjolwjb', 'Configuration Management', '{"Group Policy management","Standard images","Security baselines"}', 3);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlventz400b96en27ek0j6z9', 'cmlventyy00b86en2yzuio14r', 'Database Administration', '{"SQL Server management","Oracle database support","PostgreSQL operations"}', 0);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlventzd00ba6en2juv036ut', 'cmlventyy00b86en2yzuio14r', 'Performance Optimization', '{"Query tuning and analysis","Index management","Resource monitoring"}', 1);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlventzm00bb6en2og7jfspy', 'cmlventyy00b86en2yzuio14r', 'High Availability', '{"Always-On clustering","Database replication","Failover configuration"}', 2);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlventzt00bc6en2o3785leg', 'cmlventyy00b86en2yzuio14r', 'Security & Compliance', '{"Access control management","Data encryption","Audit logging"}', 3);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlvenu2600bq6en2owz1aeph', 'cmlvenu2000bp6en2302jxreg', 'Operating Systems', '{"Windows Server administration","Linux server management","OS patching and updates"}', 0);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlvenu2a00br6en2cq6pefq2', 'cmlvenu2000bp6en2302jxreg', 'Storage Solutions', '{"SAN/NAS management","Storage provisioning","Capacity planning"}', 1);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlvenu2f00bs6en2xv8tyo6e', 'cmlvenu2000bp6en2302jxreg', 'Data Protection', '{"Backup operations","Disaster recovery","Data replication"}', 2);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlvenu2j00bt6en2olg0tih0', 'cmlvenu2000bp6en2302jxreg', 'Print Services', '{"Print server management","Printer deployment","Print queue administration"}', 3);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlvenu5700c76en2859uoz5j', 'cmlvenu5100c66en2zn8wq782', 'VMware Infrastructure', '{"vSphere cluster management","VM provisioning","Resource allocation"}', 0);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlvenu5c00c86en29gwdhgta', 'cmlvenu5100c66en2zn8wq782', 'Hyper-V Services', '{"Microsoft virtualization","Failover clustering","Live migration"}', 1);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlvenu5h00c96en24glyee59', 'cmlvenu5100c66en2zn8wq782', 'Virtual Desktop (VDI)', '{"Horizon desktop pools","Application virtualization","Remote access solutions"}', 2);
INSERT INTO "TeamService" ("id", "teamId", "title", "items", "sortOrder") VALUES ('cmlvenu5m00ca6en2i8p5moft', 'cmlvenu5100c66en2zn8wq782', 'Container Services', '{"Kubernetes orchestration","Container registry","Microservices hosting"}', 3);

-- TeamInitiative: 18 rows
INSERT INTO "TeamInitiative" ("id", "teamId", "title", "description", "href", "sortOrder") VALUES ('cmlventjf008j6en246xj669d', 'cmlventin008e6en2fbfvks30', 'Next-Gen Firewall Upgrade', 'Replacing legacy edge hardware to improve throughput and security inspection capabilities.', '#', 0);
INSERT INTO "TeamInitiative" ("id", "teamId", "title", "description", "href", "sortOrder") VALUES ('cmlventji008k6en27vioh2e0', 'cmlventin008e6en2fbfvks30', 'Fibre Expansion Phase 4', 'Extending dark fibre connectivity to new facilities in the southwest quadrant.', '#', 1);
INSERT INTO "TeamInitiative" ("id", "teamId", "title", "description", "href", "sortOrder") VALUES ('cmlventlm00906en2l3kakk5h', 'cmlventl4008v6en2iz7ygp0g', 'Data Centre Consolidation', 'Migrating workloads from legacy facilities to modernized infrastructure.', '#', 0);
INSERT INTO "TeamInitiative" ("id", "teamId", "title", "description", "href", "sortOrder") VALUES ('cmlventlq00916en2j5iyjklp', 'cmlventl4008v6en2iz7ygp0g', 'Green IT Initiative', 'Implementing energy-efficient cooling and power management solutions.', '#', 1);
INSERT INTO "TeamInitiative" ("id", "teamId", "title", "description", "href", "sortOrder") VALUES ('cmlventon009h6en28n01rcvo', 'cmlventns009c6en24cffno5p', 'Smart City Sensor Expansion', 'Deploying additional LoRaWAN sensors for air quality and traffic monitoring.', '#', 0);
INSERT INTO "TeamInitiative" ("id", "teamId", "title", "description", "href", "sortOrder") VALUES ('cmlventos009i6en246ei4r3o', 'cmlventns009c6en24cffno5p', 'Unified Communications Migration', 'Transitioning to cloud-based collaboration and voice platforms.', '#', 1);
INSERT INTO "TeamInitiative" ("id", "teamId", "title", "description", "href", "sortOrder") VALUES ('cmlventrk009y6en2zonsy5cp', 'cmlventqv009t6en2pk5blh5c', 'AI-Powered Support Chat', 'Implementing intelligent chatbot for faster resolution of common issues.', '#', 0);
INSERT INTO "TeamInitiative" ("id", "teamId", "title", "description", "href", "sortOrder") VALUES ('cmlventro009z6en2f3yyyq3j', 'cmlventqv009t6en2pk5blh5c', 'Self-Service Portal Enhancement', 'Expanding self-service capabilities to reduce ticket volume and improve user experience.', '#', 1);
INSERT INTO "TeamInitiative" ("id", "teamId", "title", "description", "href", "sortOrder") VALUES ('cmlventu000af6en2ogwwd3yf', 'cmlventtf00aa6en2l4uc4syn', 'Mobile Technician Program', 'Deploying mobile support teams for faster on-site response times.', '#', 0);
INSERT INTO "TeamInitiative" ("id", "teamId", "title", "description", "href", "sortOrder") VALUES ('cmlventu400ag6en2qg8047ea', 'cmlventtf00aa6en2l4uc4syn', 'Hardware Lifecycle Management', 'Implementing proactive hardware refresh cycles to reduce break-fix incidents.', '#', 1);
INSERT INTO "TeamInitiative" ("id", "teamId", "title", "description", "href", "sortOrder") VALUES ('cmlventwq00aw6en29kyeqkqn', 'cmlventvy00ar6en2gmjolwjb', 'Windows 11 Migration', 'Upgrading City devices to Windows 11 with improved security features.', '#', 0);
INSERT INTO "TeamInitiative" ("id", "teamId", "title", "description", "href", "sortOrder") VALUES ('cmlventwu00ax6en25ca54gi8', 'cmlventvy00ar6en2gmjolwjb', 'Endpoint Detection & Response', 'Deploying advanced endpoint security monitoring across all managed devices.', '#', 1);
INSERT INTO "TeamInitiative" ("id", "teamId", "title", "description", "href", "sortOrder") VALUES ('cmlventzy00bd6en2ulok3lap', 'cmlventyy00b86en2yzuio14r', 'Database Modernization', 'Migrating legacy databases to modern platforms with improved performance and security.', '#', 0);
INSERT INTO "TeamInitiative" ("id", "teamId", "title", "description", "href", "sortOrder") VALUES ('cmlvenu0300be6en2ox5ys29m', 'cmlventyy00b86en2yzuio14r', 'Automated Patching Program', 'Implementing automated database patching to ensure security compliance.', '#', 1);
INSERT INTO "TeamInitiative" ("id", "teamId", "title", "description", "href", "sortOrder") VALUES ('cmlvenu2n00bu6en239g7tqr4', 'cmlvenu2000bp6en2302jxreg', 'Server Automation Program', 'Implementing infrastructure-as-code for automated server provisioning and configuration.', '#', 0);
INSERT INTO "TeamInitiative" ("id", "teamId", "title", "description", "href", "sortOrder") VALUES ('cmlvenu2s00bv6en2tidna8ap', 'cmlvenu2000bp6en2302jxreg', 'Storage Tier Optimization', 'Migrating data to appropriate storage tiers based on access patterns and requirements.', '#', 1);
INSERT INTO "TeamInitiative" ("id", "teamId", "title", "description", "href", "sortOrder") VALUES ('cmlvenu5r00cb6en27dw1pvk7', 'cmlvenu5100c66en2zn8wq782', 'Hybrid Cloud Integration', 'Extending virtualization platform to support hybrid cloud workloads.', '#', 0);
INSERT INTO "TeamInitiative" ("id", "teamId", "title", "description", "href", "sortOrder") VALUES ('cmlvenu5w00cc6en29cxv7jhf', 'cmlvenu5100c66en2zn8wq782', 'VDI Refresh Project', 'Upgrading virtual desktop infrastructure for improved performance and user experience.', '#', 1);

-- TeamContact: 18 rows
INSERT INTO "TeamContact" ("id", "teamId", "name", "role", "email", "sortOrder") VALUES ('cmlventjm008l6en2qp4vt89j', 'cmlventin008e6en2fbfvks30', 'First Last', 'Manager, Network Services', 'firstname.lastname@edmonton.ca', 0);
INSERT INTO "TeamContact" ("id", "teamId", "name", "role", "email", "sortOrder") VALUES ('cmlventjq008m6en2ln32m1ex', 'cmlventin008e6en2fbfvks30', 'First Last', 'Lead Network Architect', 'firstname.lastname@edmonton.ca', 1);
INSERT INTO "TeamContact" ("id", "teamId", "name", "role", "email", "sortOrder") VALUES ('cmlventlt00926en2rzc7ih8j', 'cmlventl4008v6en2iz7ygp0g', 'First Last', 'Manager, Data Centre Operations', 'firstname.lastname@edmonton.ca', 0);
INSERT INTO "TeamContact" ("id", "teamId", "name", "role", "email", "sortOrder") VALUES ('cmlventlw00936en2dfnxv3c5', 'cmlventl4008v6en2iz7ygp0g', 'First Last', 'Facilities Coordinator', 'firstname.lastname@edmonton.ca', 1);
INSERT INTO "TeamContact" ("id", "teamId", "name", "role", "email", "sortOrder") VALUES ('cmlventow009j6en2npgwj8qz', 'cmlventns009c6en24cffno5p', 'First Last', 'Manager, Telecom & IoT', 'firstname.lastname@edmonton.ca', 0);
INSERT INTO "TeamContact" ("id", "teamId", "name", "role", "email", "sortOrder") VALUES ('cmlventp1009k6en2441uigya', 'cmlventns009c6en24cffno5p', 'First Last', 'IoT Solutions Architect', 'firstname.lastname@edmonton.ca', 1);
INSERT INTO "TeamContact" ("id", "teamId", "name", "role", "email", "sortOrder") VALUES ('cmlventrs00a06en2telouzqk', 'cmlventqv009t6en2pk5blh5c', 'First Last', 'Manager, Service Desk', 'firstname.lastname@edmonton.ca', 0);
INSERT INTO "TeamContact" ("id", "teamId", "name", "role", "email", "sortOrder") VALUES ('cmlventrw00a16en2lnrcrp6a', 'cmlventqv009t6en2pk5blh5c', 'First Last', 'Team Lead, Service Desk', 'firstname.lastname@edmonton.ca', 1);
INSERT INTO "TeamContact" ("id", "teamId", "name", "role", "email", "sortOrder") VALUES ('cmlventu700ah6en2bas4xfyq', 'cmlventtf00aa6en2l4uc4syn', 'First Last', 'Manager, Desktop Support', 'firstname.lastname@edmonton.ca', 0);
INSERT INTO "TeamContact" ("id", "teamId", "name", "role", "email", "sortOrder") VALUES ('cmlventub00ai6en27oxmky9t', 'cmlventtf00aa6en2l4uc4syn', 'First Last', 'Team Lead, Field Services', 'firstname.lastname@edmonton.ca', 1);
INSERT INTO "TeamContact" ("id", "teamId", "name", "role", "email", "sortOrder") VALUES ('cmlventwy00ay6en2lv5ishea', 'cmlventvy00ar6en2gmjolwjb', 'First Last', 'Manager, Desktop Administration', 'firstname.lastname@edmonton.ca', 0);
INSERT INTO "TeamContact" ("id", "teamId", "name", "role", "email", "sortOrder") VALUES ('cmlventx300az6en2kos0yd33', 'cmlventvy00ar6en2gmjolwjb', 'First Last', 'Senior Desktop Engineer', 'firstname.lastname@edmonton.ca', 1);
INSERT INTO "TeamContact" ("id", "teamId", "name", "role", "email", "sortOrder") VALUES ('cmlvenu0700bf6en24l7uccp3', 'cmlventyy00b86en2yzuio14r', 'First Last', 'Manager, Database Services', 'firstname.lastname@edmonton.ca', 0);
INSERT INTO "TeamContact" ("id", "teamId", "name", "role", "email", "sortOrder") VALUES ('cmlvenu0c00bg6en2kc3ejnp4', 'cmlventyy00b86en2yzuio14r', 'First Last', 'Senior Database Administrator', 'firstname.lastname@edmonton.ca', 1);
INSERT INTO "TeamContact" ("id", "teamId", "name", "role", "email", "sortOrder") VALUES ('cmlvenu2w00bw6en2ie3a1r6s', 'cmlvenu2000bp6en2302jxreg', 'First Last', 'Manager, Server Solutions', 'firstname.lastname@edmonton.ca', 0);
INSERT INTO "TeamContact" ("id", "teamId", "name", "role", "email", "sortOrder") VALUES ('cmlvenu3100bx6en2lxd7mgzn', 'cmlvenu2000bp6en2302jxreg', 'First Last', 'Senior Systems Administrator', 'firstname.lastname@edmonton.ca', 1);
INSERT INTO "TeamContact" ("id", "teamId", "name", "role", "email", "sortOrder") VALUES ('cmlvenu6100cd6en201zvzvxm', 'cmlvenu5100c66en2zn8wq782', 'First Last', 'Manager, Virtualization Services', 'firstname.lastname@edmonton.ca', 0);
INSERT INTO "TeamContact" ("id", "teamId", "name", "role", "email", "sortOrder") VALUES ('cmlvenu6600ce6en2tei8e0hz', 'cmlvenu5100c66en2zn8wq782', 'First Last', 'Senior Virtualization Engineer', 'firstname.lastname@edmonton.ca', 1);

-- TeamQuickLink: 27 rows
INSERT INTO "TeamQuickLink" ("id", "teamId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlventjv008n6en25tc2bu9c', 'cmlventin008e6en2fbfvks30', 'Network Diagrams', 'Visio topologies for Data Centre and Campus.', '#', FALSE, 0);
INSERT INTO "TeamQuickLink" ("id", "teamId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlventjy008o6en2g2o965t3', 'cmlventin008e6en2fbfvks30', 'SolarWinds Dashboard', 'Real-time uptime and bandwidth monitoring.', '#', FALSE, 1);
INSERT INTO "TeamQuickLink" ("id", "teamId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlventk2008p6en25et9rg3c', 'cmlventin008e6en2fbfvks30', 'IP Address Management (IPAM)', 'Internal DNS and subnet allocation tool.', '#', TRUE, 2);
INSERT INTO "TeamQuickLink" ("id", "teamId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlventm000946en25j10edge', 'cmlventl4008v6en2iz7ygp0g', 'Data Centre Access Request', 'Submit requests for physical access to facilities.', '#', FALSE, 0);
INSERT INTO "TeamQuickLink" ("id", "teamId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlventm400956en2vplp4dzd', 'cmlventl4008v6en2iz7ygp0g', 'Environmental Monitoring', 'Temperature, humidity, and power dashboards.', '#', FALSE, 1);
INSERT INTO "TeamQuickLink" ("id", "teamId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlventm800966en2t53m6363', 'cmlventl4008v6en2iz7ygp0g', 'Rack Layout Diagrams', 'Current server placement and capacity.', '#', TRUE, 2);
INSERT INTO "TeamQuickLink" ("id", "teamId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlventp5009l6en2gsvrbg15', 'cmlventns009c6en24cffno5p', 'Phone Request Form', 'Request new VoIP phones or extensions.', '#', FALSE, 0);
INSERT INTO "TeamQuickLink" ("id", "teamId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlventpa009m6en2qbu7znp8', 'cmlventns009c6en24cffno5p', 'IoT Device Portal', 'Manage and monitor connected devices.', '#', FALSE, 1);
INSERT INTO "TeamQuickLink" ("id", "teamId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlventpf009n6en2dbuy3wv1', 'cmlventns009c6en24cffno5p', 'Cellular Plan Requests', 'Corporate mobile device and plan management.', '#', TRUE, 2);
INSERT INTO "TeamQuickLink" ("id", "teamId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvents000a26en2uzg1wr7k', 'cmlventqv009t6en2pk5blh5c', 'Submit a Ticket', 'Create a new support request.', '#', FALSE, 0);
INSERT INTO "TeamQuickLink" ("id", "teamId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvents400a36en24c4oeaqy', 'cmlventqv009t6en2pk5blh5c', 'Knowledge Base', 'Search self-help articles and guides.', '#', FALSE, 1);
INSERT INTO "TeamQuickLink" ("id", "teamId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvents700a46en27axmbxuf', 'cmlventqv009t6en2pk5blh5c', 'Track My Tickets', 'View status of your open requests.', '#', TRUE, 2);
INSERT INTO "TeamQuickLink" ("id", "teamId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlventuf00aj6en285xezudl', 'cmlventtf00aa6en2l4uc4syn', 'Request On-Site Support', 'Schedule a technician visit.', '#', FALSE, 0);
INSERT INTO "TeamQuickLink" ("id", "teamId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlventui00ak6en2s8k509a6', 'cmlventtf00aa6en2l4uc4syn', 'Hardware Request Form', 'Request new or replacement hardware.', '#', FALSE, 1);
INSERT INTO "TeamQuickLink" ("id", "teamId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlventum00al6en2cb2no9ue', 'cmlventtf00aa6en2l4uc4syn', 'Equipment Return', 'Schedule equipment pickup or return.', '#', TRUE, 2);
INSERT INTO "TeamQuickLink" ("id", "teamId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlventx700b06en27gzbm1cu', 'cmlventvy00ar6en2gmjolwjb', 'Software Request Form', 'Request new software installation.', '#', FALSE, 0);
INSERT INTO "TeamQuickLink" ("id", "teamId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlventxb00b16en2ifkjwksw', 'cmlventvy00ar6en2gmjolwjb', 'Device Inventory', 'View managed device information.', '#', FALSE, 1);
INSERT INTO "TeamQuickLink" ("id", "teamId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlventxf00b26en237qss5he', 'cmlventvy00ar6en2gmjolwjb', 'Patch Compliance Dashboard', 'View patch status across the organization.', '#', TRUE, 2);
INSERT INTO "TeamQuickLink" ("id", "teamId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvenu0g00bh6en2mazmnl02', 'cmlventyy00b86en2yzuio14r', 'Database Request Form', 'Request new databases or modifications.', '#', FALSE, 0);
INSERT INTO "TeamQuickLink" ("id", "teamId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvenu0l00bi6en22pgzgwis', 'cmlventyy00b86en2yzuio14r', 'Performance Dashboard', 'Monitor database health and metrics.', '#', FALSE, 1);
INSERT INTO "TeamQuickLink" ("id", "teamId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvenu0q00bj6en2y1wnrh62', 'cmlventyy00b86en2yzuio14r', 'Data Recovery Request', 'Submit data restoration requests.', '#', TRUE, 2);
INSERT INTO "TeamQuickLink" ("id", "teamId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvenu3600by6en2tioxdim6', 'cmlvenu2000bp6en2302jxreg', 'Server Request Form', 'Request new servers or modifications.', '#', FALSE, 0);
INSERT INTO "TeamQuickLink" ("id", "teamId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvenu3b00bz6en2io0ctoiu', 'cmlvenu2000bp6en2302jxreg', 'Storage Dashboard', 'Monitor storage capacity and usage.', '#', FALSE, 1);
INSERT INTO "TeamQuickLink" ("id", "teamId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvenu3g00c06en20nsn45pm', 'cmlvenu2000bp6en2302jxreg', 'Backup Restore Request', 'Submit file or system restoration requests.', '#', TRUE, 2);
INSERT INTO "TeamQuickLink" ("id", "teamId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvenu6b00cf6en2dxhd10n1', 'cmlvenu5100c66en2zn8wq782', 'VM Request Form', 'Request new virtual machines.', '#', FALSE, 0);
INSERT INTO "TeamQuickLink" ("id", "teamId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvenu6g00cg6en2rh0hura4', 'cmlvenu5100c66en2zn8wq782', 'vCenter Dashboard', 'Monitor virtualization infrastructure.', '#', FALSE, 1);
INSERT INTO "TeamQuickLink" ("id", "teamId", "label", "description", "href", "isSecure", "sortOrder") VALUES ('cmlvenu6l00ch6en2ke9egllp', 'cmlvenu5100c66en2zn8wq782', 'VDI Access Request', 'Request virtual desktop access.', '#', TRUE, 2);

SET session_replication_role = DEFAULT;
