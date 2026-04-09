# Projects System

The Projects system allows the OCT Branch to showcase and track projects and initiatives. Projects are standalone entities with their own dedicated pages, a widget-based visual editor (identical to team pages), and a two-tier permission model for project managers.

## Architecture Overview

Projects follow the same widget-based page builder pattern as team pages:

```
Project (database model)
  ├─ ProjectMilestone[]     (timeline milestones)
  ├─ ProjectObjective[]     (goals with icons)
  ├─ ProjectStatusUpdate[]  (status history)
  ├─ ProjectTag[]           (via join table, for filtering)
  ├─ ProjectManagerAssignment[]  (per-project edit access)
  └─ WidgetInstance[]        (layout configuration — shared with teams)
```

Public pages render at `/projects` (listing) and `/projects/[slug]` (detail).
Admin pages live at `/admin/projects`.

## Data Model

### Project

| Field | Type | Description |
|-------|------|-------------|
| `slug` | String (unique) | URL-safe identifier |
| `projectCode` | String? | Display code (e.g., PRJ-2024-0892) |
| `title` | String | Project name |
| `description` | String? | Brief description |
| `status` | Enum | PLANNING, IN_PROGRESS, ON_HOLD, COMPLETED, CANCELLED |
| `department` | String? | Owning department |
| `branch` | String? | Owning branch |
| `projectSponsor` | String? | Executive sponsor |
| `projectManager` | String? | Project manager name |
| `octProgramManager` | String? | OCT program manager (MRP) |
| `octltRepresentative` | String? | OCTLT representative |
| `programManagerBusiness` | String? | Business-side program manager |
| `totalBudget` | String? | Budget display (e.g., "$18.4M") |
| `fundingSources` | String? | Funding sources description |
| `expenditureAuthority` | String? | Who controls spending |
| `startDate` | DateTime? | Project start |
| `endDate` | DateTime? | Project end |
| `progress` | Int (0–100) | Completion percentage |
| `isPublished` | Boolean | Whether visible on public site |
| `archivedAt` | DateTime? | Soft delete timestamp |

### Related Models

| Model | Fields | Purpose |
|-------|--------|---------|
| `ProjectMilestone` | name, date, status (completed/current/upcoming), sortOrder | Timeline milestones |
| `ProjectObjective` | title, description, iconName, sortOrder | Project goals |
| `ProjectStatusUpdate` | content, createdAt | Status history entries |
| `ProjectTag` | name, slug | Tags for filtering and categorization |
| `ProjectTagAssignment` | projectId, tagId | Many-to-many join |
| `ProjectManagerAssignment` | userId, projectId | Per-project edit access |
| `ProjectPermission` | userId | Global project admin access |

## Permissions

Projects use a two-tier permission model:

| Level | Who | Access |
|-------|-----|--------|
| **Global** | SUPER_ADMIN or user with `ProjectPermission` | Can create, edit, delete, and manage ALL projects. Can assign project managers. |
| **Per-Project** | User with `ProjectManagerAssignment` for a specific project | Can edit only their assigned project(s). Cannot create new projects or manage other projects. |

Permission functions in `lib/auth.ts`:
- `canEditProjects()` — checks global access
- `requireProjectAccess()` — enforces global access (throws if denied)
- `canEditProject(projectId)` — checks global OR per-project access
- `requireProjectEditAccess(projectId)` — enforces project-level access

### Managing Permissions

- **Global editors**: Managed at `/admin/project-editors` (SUPER_ADMIN only)
- **Per-project managers**: Assigned from the project edit page's "Managers" tab (requires global project access)

## Widget System Integration

Projects use the same `WidgetInstance` table as teams. The `WidgetInstance` model has both `teamId` (nullable) and `projectId` (nullable) — exactly one is set per instance.

### Project Widget Types

| Widget Type | Label | Layout | Description |
|-------------|-------|--------|-------------|
| `project_header` | Project Header | Full-width | Gradient hero with status badge, project code, title, description |
| `project_governance` | Project Governance | Main content | 2-column grid of governance roles |
| `project_objectives` | Project Objectives | Main content | Objectives list with Lucide icons |
| `project_financial` | Financial Overview | Sidebar | Budget, funding sources, expenditure authority |
| `project_timeline` | Project Timeline | Sidebar | Start/end dates, progress bar, milestones |
| `project_status_updates` | Status Updates | Sidebar | Latest status updates with timestamps |

### Sidebar Layout

Project pages use a 12-column grid (8 main + 4 sidebar), matching the mockup design. Sidebar widgets are defined in `lib/widget-template-map.ts`:
- `project_financial`
- `project_timeline`
- `project_status_updates`

### Template Blocklist

Project widgets are blocked on all team templates (SECTION, ITS_TEAM, SUB_TEAM), and team widgets are blocked on the PROJECT template. This is enforced in `lib/widget-template-map.ts`.

### Default Widgets

When a project is created, all 6 project widgets are automatically added in order. If a project has no widget instances (e.g., created before the widget system was added), they are auto-created on the first admin page load.

## Admin Interface

### Project List (`/admin/projects`)

Shows all projects (or only assigned projects for per-project managers). Includes search by title/code and status filtering.

### Project Editor (`/admin/projects/[projectId]`)

Uses the same `LayoutEditor` component as team pages. Each widget has:
- **Drag handle** — reorder widgets
- **Inline preview** — shows the widget with current data (or placeholder data if empty)
- **Edit button** (pencil icon) — opens the widget editor modal
- **Preview button** (eye icon) — shows widget layout schematic
- **Remove button** — removes the widget from the layout

Widget editors for projects:

| Editor Component | Widget | What It Edits |
|-----------------|--------|---------------|
| `ProjectHeaderEditor` | `project_header` | Title, description, status, project code |
| `ProjectGovernanceEditor` | `project_governance` | All 7 governance role fields |
| `ProjectFinancialEditor` | `project_financial` | Budget, funding sources, authority |
| `ProjectObjectivesEditor` | `project_objectives` | CRUD list of objectives with icons |
| `ProjectMilestonesEditor` | `project_timeline` | Start/end dates, progress, milestone CRUD |
| `ProjectStatusUpdatesEditor` | `project_status_updates` | Add/delete status updates |

### Create Project (`/admin/projects/new`)

Simple form: title, description, project code, status. Redirects to the full editor after creation.

### Project Editors (`/admin/project-editors`)

SUPER_ADMIN-only page to grant/revoke global project edit access (same pattern as News Editors).

## Ongoing Projects Widget

The existing `ongoing_projects` widget on team pages has been upgraded to display real project data. The widget config supports:

| Config Key | Type | Description |
|------------|------|-------------|
| `mode` | `"manual"` or `"tag"` | How projects are selected |
| `projectIds` | JSON string array | Specific project IDs (manual mode) |
| `tagSlug` | String | Tag slug to filter by (tag mode) |
| `maxProjects` | Number string | Max projects to display (default 6) |
| `heading` | String | Widget heading text |
| `showViewAll` | Boolean string | Show "View All Projects" link |

When no projects are configured, the widget falls back to the original CTA layout with a link to `/projects`.

## Public Pages

### Listing Page (`/projects`)

Server-rendered with ISR (1 hour). Shows all published projects as cards with:
- Status badge
- Title and description
- Progress bar
- Tags

Supports filtering by tag via query parameter (`/projects?tag=network`).

### Detail Page (`/projects/[slug]`)

Renders using `WidgetRenderer` with the project's widget instance order. Falls back to default widget order if no instances exist. The page layout matches the mockup design:
- Full-width gradient header
- 8-column main content (governance, objectives)
- 4-column sidebar (financial, timeline, status updates)

## Key Files

| File | Purpose |
|------|---------|
| `prisma/schema.prisma` | Project, Milestone, Objective, StatusUpdate, Tag, Permission, ManagerAssignment models |
| `lib/auth.ts` | `canEditProjects()`, `canEditProject()`, `requireProjectAccess()`, `requireProjectEditAccess()` |
| `lib/data/fetch-project.ts` | Data fetching: by slug, by ID, list with filters, widget config resolution |
| `lib/actions/project-actions.ts` | CRUD for projects, milestones, objectives, status updates, tags |
| `lib/actions/project-widget-actions.ts` | Widget CRUD for projects (add, remove, reorder, reset defaults) |
| `lib/actions/project-permission-actions.ts` | Grant/revoke global project permissions |
| `lib/actions/project-manager-actions.ts` | Assign/remove per-project managers |
| `lib/actions/project-tag-actions.ts` | Tag CRUD |
| `lib/widget-template-map.ts` | PROJECT template blocklist, project sidebar widgets |
| `components/projects/*.tsx` | 7 display components (Header, Governance, Objectives, Financial, Timeline, StatusUpdate, Card) |
| `components/admin/Project*Editor.tsx` | 6 widget editor components |
| `components/admin/ProjectDetailClient.tsx` | Maps project data to LayoutEditor props |
| `components/widgets/WidgetRenderer.tsx` | Renders project widgets via switch cases |
| `components/admin/LayoutEditor.tsx` | Shared layout editor (supports both teams and projects) |
| `app/projects/page.tsx` | Public project listing page |
| `app/projects/[projectSlug]/page.tsx` | Public project detail page |
| `app/admin/projects/page.tsx` | Admin project list |
| `app/admin/projects/new/page.tsx` | Create project form |
| `app/admin/projects/[projectId]/page.tsx` | Project editor (LayoutEditor integration) |
| `app/admin/project-editors/page.tsx` | Global permission management |
