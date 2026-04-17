# Database Schema Reference

> **Audience:** Developers  
> **Source of truth:** `prisma/schema.prisma`

## Database Connection

| Property | Development | Production |
|----------|-------------|------------|
| Engine | PostgreSQL 16 | PostgreSQL 16 |
| Database name | `coe_website` | `coe_cms` |
| User | `postgres` | `coe_admin` |
| Docker container | `coe-website-postgres-1` | `nextjs-site-postgres-1` |
| ORM | Prisma 7 with `@prisma/adapter-pg` driver adapter | Same |
| Connection string | `postgresql://postgres:<pw>@localhost:5432/coe_website` | `postgresql://coe_admin:<pw>@postgres:5432/coe_cms` |

The Prisma client is constructed with the `@prisma/adapter-pg` driver adapter (see `lib/prisma.ts`). The connection string is set via the `DATABASE_URL` environment variable.

---

## Enums

### Role

Controls CMS access level.

| Value | Description |
|-------|-------------|
| `SUPER_ADMIN` | Full access to all teams, settings, and permissions |
| `TEAM_ADMIN` | Can edit teams they have been granted access to |
| `VIEWER` | Read-only CMS access |

### PageTemplate

Determines which layout and components a team page renders.

| Value | Description |
|-------|-------------|
| `ITS_TEAM` | Standard team page with portfolios, tabs, and boards |
| `SECTION` | Top-level section page with service areas, Who We Are, and key initiatives |
| `SUB_TEAM` | Lightweight sub-team page with services, initiatives, contacts, and quick links |
| `CUSTOM` | Custom layout |

### ProjectStatus

Tracks the lifecycle stage of a project.

| Value |
|-------|
| `PLANNING` |
| `IN_PROGRESS` |
| `ON_HOLD` |
| `COMPLETED` |
| `CANCELLED` |

---

## Models

### 1. Auth & Permissions

#### User

Central identity table. Every CMS user has one row.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| email | String | Unique | User email (matched against IAP header) |
| name | String | Required | Display name |
| role | Role | Default `VIEWER` | Global access level |
| createdAt | DateTime | Default `now()` | Account creation timestamp |
| updatedAt | DateTime | Auto-updated | Last modification timestamp |

**Relations:** teamPermissions, auditLogs, roadmapPermission, octWebDevPermission, newsPermission, projectPermission, projectManagerAssignments

#### TeamPermission

Grants a user edit access to a specific team's content.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| userId | String | FK → User (CASCADE) | The user being granted access |
| teamId | String | FK → Team (CASCADE) | The team they can edit |

**Unique:** (userId, teamId)  
**Indexes:** teamId

#### RoadmapPermission

Grants a user access to view and edit the roadmap.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| userId | String | Unique, FK → User (CASCADE) | One permission per user |
| createdAt | DateTime | Default `now()` | When access was granted |

#### OctWebDevPermission

Grants a user access to the OCT Web Development documentation area.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| userId | String | Unique, FK → User (CASCADE) | One permission per user |
| createdAt | DateTime | Default `now()` | When access was granted |

**Table name override:** `"OctWebDevPermission"` (explicit `@@map`)

#### NewsPermission

Grants a user access to manage news articles.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| userId | String | Unique, FK → User (CASCADE) | One permission per user |
| createdAt | DateTime | Default `now()` | When access was granted |

#### ProjectPermission

Grants a user access to manage projects.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| userId | String | Unique, FK → User (CASCADE) | One permission per user |
| createdAt | DateTime | Default `now()` | When access was granted |

#### AuditLog

Records all CMS mutations for accountability.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| userId | String | FK → User | Who performed the action |
| action | String | Required | Action type (e.g. `CREATE`, `UPDATE`, `DELETE`) |
| entity | String | Required | Model name (e.g. `Team`, `Portfolio`) |
| entityId | String | Required | ID of the affected record |
| description | String | Optional | Human-readable summary |
| changes | Json | Default `{}` | Before/after diff of changed fields |
| status | String | Default `"SUCCESS"` | Outcome (`SUCCESS` or `FAILURE`) |
| ipAddress | String | Optional | Request IP address |
| userAgent | String | Optional | Request user-agent string |
| createdAt | DateTime | Default `now()` | When the action occurred |

**Indexes:** userId, entity, createdAt

---

### 2. Teams & Hierarchy

#### Team

Core content entity. Teams form a parent-child hierarchy: Section → Team → Sub-team.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| slug | String | Unique | URL path segment (e.g. `enterprise-architecture`) |
| teamName | String | Required | Full display name |
| teamShortName | String | Required | Abbreviated name for navigation |
| pageTemplate | PageTemplate | Default `ITS_TEAM` | Controls which layout renders |
| sortOrder | Int | Default 0 | Display order among siblings |
| isPublished | Boolean | Default `true` | Whether the page is publicly visible |
| archivedAt | DateTime | Optional | Soft-delete timestamp |
| createdAt | DateTime | Default `now()` | Creation timestamp |
| updatedAt | DateTime | Auto-updated | Last modification timestamp |
| pageTitle | String | Optional | Title override (SECTION pages) |
| pageDescription | String | Optional | Description (SECTION pages) |
| iconName | String | Optional | Lucide icon name (SUB_TEAM pages) |
| showStatus | Boolean | Default `false` | Show service health status (SUB_TEAM pages) |
| parentId | String | Optional, FK → Team (SET NULL) | Parent team for hierarchy |

**Self-relation:** `"TeamHierarchy"` — parent/children  
**Indexes:** slug (unique), parentId

#### Portfolio

Card items displayed on ITS_TEAM pages, linking to sub-pages or external URLs.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| teamId | String | FK → Team (CASCADE) | Owning team |
| iconName | String | Required | Lucide icon name |
| title | String | Required | Card title |
| description | String | Required | Card description |
| href | String | Required | Link destination |
| sortOrder | Int | Default 0 | Display order |
| linkedTeamId | String | Optional, Unique, FK → Team (SET NULL) | Links to another team's data |

**Indexes:** teamId

#### TeamTab

Tabbed content sections within a team page, each with a video and diagram links.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| teamId | String | FK → Team (CASCADE) | Owning team |
| tabId | String | Required | Programmatic tab identifier |
| label | String | Required | Tab label text |
| videoTitle | String | Required | Video section title |
| videoDescription | String | Required | Video section description |
| videoUrl | String | Required | Embedded video URL |
| diagramsTitle | String | Required | Diagrams section title |
| diagramsDescription | String | Required | Diagrams section description |
| sortOrder | Int | Default 0 | Tab display order |

**Indexes:** teamId

#### DiagramLink

Individual links within a TeamTab's diagrams section.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| teamTabId | String | FK → TeamTab (CASCADE) | Parent tab |
| label | String | Required | Link text |
| href | String | Required | Link URL |
| sortOrder | Int | Default 0 | Display order |

#### TrelloBoard

Links to Trello boards displayed on team pages.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| teamId | String | FK → Team (CASCADE) | Owning team |
| title | String | Required | Board title |
| description | String | Required | Board description |
| href | String | Required | Trello board URL |
| sortOrder | Int | Default 0 | Display order |

**Indexes:** teamId

#### TeamMember

People listed on a team page.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| teamId | String | FK → Team (CASCADE) | Owning team |
| name | String | Required | Full name |
| title | String | Required | Job title |
| email | String | Required | Contact email |
| sortOrder | Int | Default 0 | Display order |

**Indexes:** teamId

---

### 3. Team Content

#### AccordionGroup

Collapsible link groups (e.g. "Important Links") on team pages.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| teamId | String | Optional, FK → Team (CASCADE) | Owning team (null for global groups) |
| groupId | String | Required | Programmatic identifier |
| title | String | Required | Accordion heading |
| sortOrder | Int | Default 0 | Display order |

**Indexes:** teamId

#### AccordionLink

Individual links within an accordion group.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| groupId | String | FK → AccordionGroup (CASCADE) | Parent group |
| label | String | Required | Link text |
| href | String | Required | Link URL |
| sortOrder | Int | Default 0 | Display order |

#### ServiceArea

Service area cards on SECTION template pages.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| teamId | String | FK → Team (CASCADE) | Owning section team |
| serviceAreaId | String | Required | Programmatic identifier |
| title | String | Required | Service area name |
| shortDescription | String | Required | Brief description for card view |
| fullDescription | String | Required | Detailed description |
| features | String[] | Array | List of feature bullet points |
| icon | String | Optional | Lucide icon name |
| link | String | Optional | External link |
| sortOrder | Int | Default 0 | Display order |
| linkedTeamId | String | Optional, Unique, FK → Team (SET NULL) | Links to a team's page |

**Indexes:** teamId

#### TeamService

Services offered by a SUB_TEAM page.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| teamId | String | FK → Team (CASCADE) | Owning team |
| title | String | Required | Service category name |
| items | String[] | Array | Individual service items |
| sortOrder | Int | Default 0 | Display order |

**Indexes:** teamId

#### TeamInitiative

Key initiatives displayed on SUB_TEAM pages.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| teamId | String | FK → Team (CASCADE) | Owning team |
| title | String | Required | Initiative name |
| description | String | Required | Initiative description |
| href | String | Required | Link to more information |
| sortOrder | Int | Default 0 | Display order |

**Indexes:** teamId

#### TeamContact

Contact people listed on SUB_TEAM pages.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| teamId | String | FK → Team (CASCADE) | Owning team |
| name | String | Required | Contact name |
| role | String | Required | Contact role/title |
| email | String | Required | Contact email |
| sortOrder | Int | Default 0 | Display order |

**Indexes:** teamId

#### TeamQuickLink

Quick-access links on SUB_TEAM pages.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| teamId | String | FK → Team (CASCADE) | Owning team |
| label | String | Required | Link text |
| description | String | Required | Link description |
| href | String | Required | Link URL |
| isSecure | Boolean | Default `false` | Requires authentication to access |
| sortOrder | Int | Default 0 | Display order |

**Indexes:** teamId

#### WhoWeAreItem

"Who We Are" cards on SECTION template pages.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| teamId | String | FK → Team (CASCADE) | Owning section team |
| title | String | Required | Card title |
| description | String | Required | Card description |
| linkText | String | Default `"Learn More"` | Call-to-action text |
| linkUrl | String | Required | Card link destination |
| sortOrder | Int | Default 0 | Display order |

**Indexes:** teamId

#### KeyInitiativeSlide

Carousel slides on SECTION template pages.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| teamId | String | FK → Team (CASCADE) | Owning section team |
| title | String | Required | Slide title |
| description | String | Required | Slide description |
| imageUrl | String | Optional | Background image URL |
| imageAlt | String | Default `""` | Image alt text |
| sortOrder | Int | Default 0 | Display order |

**Indexes:** teamId

---

### 4. Portfolio Subpages

Detailed pages for individual portfolio items. Each subpage mirrors the SUB_TEAM layout with services, initiatives, contacts, and quick links.

#### PortfolioSubpage

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| portfolioId | String | Unique, FK → Portfolio (CASCADE) | One subpage per portfolio |
| parentTeam | String | Required | Display name of parent team |
| parentTeamHref | String | Required | Link back to parent team page |
| title | String | Required | Subpage title |
| description | String | Required | Subpage description |
| iconName | String | Required | Lucide icon name |
| showStatus | Boolean | Default `true` | Show service health status |

#### SubpageService

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| subpageId | String | FK → PortfolioSubpage (CASCADE) | Parent subpage |
| title | String | Required | Service category name |
| items | String[] | Array | Individual service items |
| sortOrder | Int | Default 0 | Display order |

#### SubpageInitiative

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| subpageId | String | FK → PortfolioSubpage (CASCADE) | Parent subpage |
| title | String | Required | Initiative name |
| description | String | Required | Initiative description |
| href | String | Required | Link to more information |
| sortOrder | Int | Default 0 | Display order |

#### SubpageContact

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| subpageId | String | FK → PortfolioSubpage (CASCADE) | Parent subpage |
| name | String | Required | Contact name |
| role | String | Required | Contact role/title |
| email | String | Required | Contact email |
| sortOrder | Int | Default 0 | Display order |

#### SubpageQuickLink

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| subpageId | String | FK → PortfolioSubpage (CASCADE) | Parent subpage |
| label | String | Required | Link text |
| description | String | Required | Link description |
| href | String | Required | Link URL |
| isSecure | Boolean | Default `false` | Requires authentication |
| sortOrder | Int | Default 0 | Display order |

---

### 5. Widget System

A flexible page-builder layer. Widget definitions describe available widget types; widget instances attach a specific widget to a team or project page.

#### WidgetDefinition

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| widgetType | String | Unique | Programmatic type key (e.g. `project_header`) |
| label | String | Required | Human-readable name |
| description | String | Optional | Widget description |
| icon | String | Default `"LayoutGrid"` | Lucide icon name |
| isEnabled | Boolean | Default `true` | Whether the widget is available for use |

#### WidgetInstance

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| teamId | String | Optional, FK → Team (CASCADE) | Team page this widget belongs to |
| projectId | String | Optional, FK → Project (CASCADE) | Project page this widget belongs to |
| widgetDefinitionId | String | FK → WidgetDefinition (RESTRICT) | Which widget type |
| sortOrder | Int | Default 0 | Display order on the page |
| config | Json | Optional | Widget-specific configuration data |

**Unique:** (teamId, widgetDefinitionId), (projectId, widgetDefinitionId) — one instance per widget type per page  
**Indexes:** (teamId, sortOrder), (projectId, sortOrder)  
**Note:** Deleting a WidgetInstance does not delete its WidgetDefinition (RESTRICT).

---

### 6. Projects

#### Project

Top-level project entity with governance, financial, and timeline metadata.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| slug | String | Unique | URL path segment |
| projectCode | String | Optional | Internal project code |
| title | String | Required | Project name |
| description | String | Optional | Project description |
| status | ProjectStatus | Default `PLANNING` | Current lifecycle stage |
| department | String | Optional | Owning department |
| branch | String | Optional | Owning branch |
| projectSponsor | String | Optional | Executive sponsor name |
| projectManager | String | Optional | Project manager name |
| octProgramManager | String | Optional | OCT program manager name |
| octltRepresentative | String | Optional | OCTLT representative name |
| programManagerBusiness | String | Optional | Business program manager name |
| totalBudget | String | Optional | Total budget amount |
| fundingSources | String | Optional | Funding source description |
| expenditureAuthority | String | Optional | Expenditure authority details |
| startDate | DateTime | Optional | Project start date |
| endDate | DateTime | Optional | Project end date |
| progress | Int | Default 0 | Completion percentage (0–100) |
| isPublished | Boolean | Default `false` | Whether publicly visible |
| archivedAt | DateTime | Optional | Soft-delete timestamp |
| createdAt | DateTime | Default `now()` | Creation timestamp |
| updatedAt | DateTime | Auto-updated | Last modification timestamp |

**Indexes:** status, isPublished

#### ProjectMilestone

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| projectId | String | FK → Project (CASCADE) | Parent project |
| name | String | Required | Milestone name |
| date | DateTime | Optional | Target or completion date |
| status | String | Default `"upcoming"` | One of: `completed`, `current`, `upcoming` |
| sortOrder | Int | Default 0 | Display order |

**Indexes:** projectId

#### ProjectObjective

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| projectId | String | FK → Project (CASCADE) | Parent project |
| iconName | String | Optional | Lucide icon name |
| title | String | Required | Objective title |
| description | String | Required | Objective description |
| sortOrder | Int | Default 0 | Display order |

**Indexes:** projectId

#### ProjectStatusUpdate

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| projectId | String | FK → Project (CASCADE) | Parent project |
| content | String | Required | Update text |
| createdAt | DateTime | Default `now()` | When the update was posted |

**Indexes:** projectId, createdAt

#### ProjectTag

Reusable tags for categorizing projects.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| name | String | Unique | Tag display name |
| slug | String | Unique | URL-safe tag identifier |

#### ProjectTagAssignment

Many-to-many join between projects and tags.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| projectId | String | FK → Project (CASCADE) | Tagged project |
| tagId | String | FK → ProjectTag (CASCADE) | Applied tag |

**Unique:** (projectId, tagId)  
**Indexes:** tagId

#### ProjectManagerAssignment

Links CMS users to projects they manage, granting them edit access.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| userId | String | FK → User (CASCADE) | Assigned user |
| projectId | String | FK → Project (CASCADE) | Managed project |
| createdAt | DateTime | Default `now()` | When the assignment was created |

**Unique:** (userId, projectId)  
**Indexes:** projectId

---

### 7. Roadmap

#### RoadmapSection

Groups roadmap projects into color-coded sections.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| title | String | Required | Section heading |
| color | String | Required | Display color (hex or CSS name) |
| sortOrder | Int | Default 0 | Display order |
| createdAt | DateTime | Default `now()` | Creation timestamp |
| updatedAt | DateTime | Auto-updated | Last modification timestamp |

#### RoadmapProject

Individual items on the roadmap timeline.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| sectionId | String | FK → RoadmapSection (CASCADE) | Parent section |
| name | String | Required | Project name |
| owner | String | Required | Responsible person or team |
| startYear | Int | Required | Start year |
| endYear | Int | Required | End year |
| startQuarter | Int | Required | Start quarter (1–4) |
| endQuarter | Int | Required | End quarter (1–4) |
| progress | Int | Default 0 | Completion percentage (0–100) |
| description | String | Optional | Project description |
| sortOrder | Int | Default 0 | Display order within section |
| createdAt | DateTime | Default `now()` | Creation timestamp |
| updatedAt | DateTime | Auto-updated | Last modification timestamp |

**Indexes:** sectionId

---

### 8. Analytics

#### PageView

Tracks anonymous page visits for the analytics dashboard.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | String | PK, cuid | Unique identifier |
| path | String | Required | URL path visited |
| teamSlug | String | Optional | Team slug (if a team page) |
| userAgent | String | Optional | Browser user-agent |
| referrer | String | Optional | Referring URL |
| createdAt | DateTime | Default `now()` | Visit timestamp |

**Indexes:** path, teamSlug, createdAt

---

## Relationship Diagram

```
User
 ├── TeamPermission[] ──→ Team
 ├── AuditLog[]
 ├── RoadmapPermission?
 ├── OctWebDevPermission?
 ├── NewsPermission?
 ├── ProjectPermission?
 └── ProjectManagerAssignment[] ──→ Project

Team (self-referencing hierarchy)
 ├── parent? ──→ Team
 ├── children[] ──→ Team
 ├── Portfolio[] ──→ PortfolioSubpage?
 │                    ├── SubpageService[]
 │                    ├── SubpageInitiative[]
 │                    ├── SubpageContact[]
 │                    └── SubpageQuickLink[]
 ├── TeamTab[] ──→ DiagramLink[]
 ├── TrelloBoard[]
 ├── TeamMember[]
 ├── AccordionGroup[] ──→ AccordionLink[]
 ├── ServiceArea[]
 ├── WidgetInstance[] ──→ WidgetDefinition
 ├── TeamService[]
 ├── TeamInitiative[]
 ├── TeamContact[]
 ├── TeamQuickLink[]
 ├── WhoWeAreItem[]
 └── KeyInitiativeSlide[]

Project
 ├── ProjectMilestone[]
 ├── ProjectObjective[]
 ├── ProjectStatusUpdate[]
 ├── ProjectTagAssignment[] ──→ ProjectTag
 ├── ProjectManagerAssignment[] ──→ User
 └── WidgetInstance[] ──→ WidgetDefinition

RoadmapSection
 └── RoadmapProject[]
```

## Cascade Rules Summary

| Rule | Applied To |
|------|-----------|
| **CASCADE** | Most parent-child relations — deleting a team deletes its portfolios, members, tabs, etc. |
| **SET NULL** | Team.parentId, Portfolio.linkedTeamId, ServiceArea.linkedTeamId — preserves the child record when the linked parent is removed |
| **RESTRICT** | WidgetInstance → WidgetDefinition — prevents deleting a widget type that is in use |

## Migration History

| Migration | Date | Changes |
|-----------|------|---------|
| `init` | 2026-02-12 | User, Team, Portfolio, TeamTab, DiagramLink, TrelloBoard, TeamMember, AccordionGroup, AccordionLink, PortfolioSubpage, Subpage* models, ServiceArea |
| `add_widget_models` | 2026-02-13 | WidgetDefinition, WidgetInstance |
| `add_team_parent_child` | 2026-02-18 | Team self-referencing hierarchy (parentId) |
| `add_missing_tables` | 2026-03-10 | TeamService, TeamInitiative, TeamContact, TeamQuickLink, WhoWeAreItem, KeyInitiativeSlide, RoadmapSection, RoadmapProject |
| `add_project_roadmap_permission` | 2026-03-11 | RoadmapPermission |
| `rename_oct_web_dev_permission` | 2026-03-11 | OctWebDevPermission table rename |
| `add_audit_log_status_and_required_changes` | 2026-03-12 | AuditLog.status, AuditLog.changes fields |
| `add_service_area_linked_team` | 2026-03-25 | ServiceArea.linkedTeamId |
| `add_page_view_tracking` | 2026-03-25 | PageView model |
| `add_news_permission` | 2026-03-27 | NewsPermission |
| `add_audit_log_description` | 2026-04-09 | AuditLog.description field |
| `add_projects` | 2026-04-09 | Project, ProjectMilestone, ProjectObjective, ProjectStatusUpdate, ProjectTag, ProjectTagAssignment, ProjectManagerAssignment, ProjectPermission |
| `widget_instance_project_support` | 2026-04-09 | WidgetInstance.projectId, project widget definitions |

For migration procedures see [Prisma Migration Workflow](prisma-migration-workflow.md).
