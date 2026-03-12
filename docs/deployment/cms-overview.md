# Content Management System (CMS)

The CMS is the admin interface for managing all public-facing content on the OCT website. It lives at `/admin` and is built directly into the Next.js application — there is no separate CMS service.

## Technology Stack

| Technology | Role |
|------------|------|
| **Next.js 16** (App Router) | Server-side rendering, API routes, server actions |
| **React 19** | Admin UI components |
| **Prisma ORM** | Database schema, migrations, and queries |
| **PostgreSQL** | Primary data store |
| **@prisma/adapter-pg** | Driver adapter for Prisma client |
| **Tailwind CSS 4** | Styling |
| **TypeScript** | Type safety across the stack |
| **@dnd-kit** | Drag-and-drop widget and content reordering |
| **DOMPurify** | HTML sanitization for user content |
| **Lucide React** | Icon library used throughout the admin UI |

## Authentication & Authorization

### How Users Are Identified

In **production**, Google Cloud IAP (Identity-Aware Proxy) sits in front of the application. IAP verifies the user's Google identity and adds an `x-user-email` header to every request. The app reads this header and looks up the corresponding `User` record in the database.

In **development**, the `DEV_BYPASS_IAP` environment variable skips IAP verification and uses a configured email address instead.

### Role-Based Access Control

There are three roles:

| Role | Capabilities |
|------|-------------|
| **SUPER_ADMIN** | Full access to all teams, users, audit logs, trash, and special sections |
| **TEAM_ADMIN** | Can edit assigned teams and their children, manage delegated users |
| **VIEWER** | Read-only access to assigned teams in the admin panel |

Permissions are granted per-team through the `TeamPermission` table. A TEAM_ADMIN for a parent team automatically has access to its child teams.

Two special permission tables control access to non-team content:
- `RoadmapPermission` — who can edit the roadmap
- `OctWebDevPermission` — who can view this documentation section

## Data Architecture

### Team Hierarchy

Teams are the central organizing concept. Every page on the public website corresponds to a Team record. Teams form a parent-child hierarchy:

```
Section (e.g., "Digital Services")
  └─ ITS Team (e.g., "Enterprise Applications")
       └─ Sub-Team (e.g., "SAP Support")
```

Each team has a `pageTemplate` that determines what content types it supports:

| Template | Purpose | Content Types |
|----------|---------|---------------|
| **SECTION** | Top-level landing pages | Service areas, "Who We Are" cards, key initiative slides |
| **ITS_TEAM** | Main team pages | Portfolios, team tabs, Trello boards, team members, accordion links |
| **SUB_TEAM** | Detail pages under a team | Services, initiatives, contacts, quick links |
| **CUSTOM** | Reserved for future use | — |

### Widget System

Pages use a widget-based layout system. Each team has a set of `WidgetInstance` records that control which content sections appear and in what order. There are 16 widget types (e.g., `page_header`, `portfolios`, `service_areas`, `team_members`).

Widgets can be reordered via drag-and-drop in the admin UI through the Layout Editor. Default widgets are automatically created when a new team or portfolio is added.

### Key Data Models

```
User
  ├─ TeamPermission (per-team access grants)
  ├─ RoadmapPermission
  ├─ OctWebDevPermission
  └─ AuditLog (tracks all changes)

Team
  ├─ Parent/child hierarchy (parentId)
  ├─ WidgetInstance[] (layout configuration)
  ├─ Portfolio[] (ITS_TEAM)
  ├─ TeamTab[] → DiagramLink[] (ITS_TEAM)
  ├─ TrelloBoard[] (ITS_TEAM)
  ├─ TeamMember[] (ITS_TEAM)
  ├─ AccordionGroup[] → AccordionLink[] (ITS_TEAM)
  ├─ ServiceArea[] (SECTION)
  ├─ WhoWeAreItem[] (SECTION)
  ├─ KeyInitiativeSlide[] (SECTION)
  ├─ TeamService[] (SUB_TEAM)
  ├─ TeamInitiative[] (SUB_TEAM)
  ├─ TeamContact[] (SUB_TEAM)
  └─ TeamQuickLink[] (SUB_TEAM)
```

## How Content Editing Works

### Admin Interface (`/admin`)

The admin panel is a client-side React application with these main sections:

| Page | Purpose |
|------|---------|
| `/admin` | Dashboard showing team cards and recent activity |
| `/admin/teams/[teamId]` | Full content editor for a specific team |
| `/admin/users` | User management and role assignment |
| `/admin/audit-log` | View and export change history |
| `/admin/trash` | Restore archived (soft-deleted) teams |

### Editing Flow

1. Navigate to a team in the admin sidebar
2. The team editor loads all content sections based on the team's template
3. Each section has a dedicated editor component (e.g., `PortfolioEditor`, `ServiceAreaEditor`)
4. Editors support inline editing — click a card to edit, then save or cancel
5. Content is saved via Next.js server actions that call Prisma to update the database
6. After saving, `revalidatePath()` is called to refresh the public page

### Content Types by Editor

| Editor | Creates/Edits |
|--------|--------------|
| PortfolioEditor | Portfolio cards that link to sub-team pages |
| TeamTabEditor | Video embeds and diagram link sections |
| TrelloBoardEditor | External Trello board links |
| TeamMemberEditor | Staff member cards |
| ServiceAreaEditor | Service cards with features, icons, and links |
| WhoWeAreEditor | "Who We Are" description cards |
| KeyInitiativesEditor | Image carousel slides |
| SubTeamsEditor | Create and manage child teams |
| TeamServicesEditor | Service lists for sub-team pages |
| TeamInitiativesEditor | Project/initiative lists |
| TeamContactsEditor | Contact cards |
| TeamQuickLinksEditor | Resource link lists |
| LayoutEditor | Drag-and-drop widget reordering |

## How Public Pages Are Rendered

Public pages use Next.js dynamic routes:

- `app/[teamSlug]/page.tsx` — renders SECTION and ITS_TEAM pages
- `app/[teamSlug]/[subTeamSlug]/page.tsx` — renders SUB_TEAM pages

The rendering flow:

1. Look up the team by slug (must be published and not archived)
2. Fetch all related content (portfolios, members, services, etc.)
3. Load the team's widget instances to determine layout order
4. Select the template component based on `pageTemplate`
5. Render widgets in the configured order

All pages use `force-dynamic` — there is no static generation. This ensures content changes are immediately visible.

## Audit Logging

Every content change (create, update, delete) is recorded in the `AuditLog` table:

- **Who** made the change (user ID and email)
- **What** changed (entity type, entity ID, before/after JSON diff)
- **When** it happened (timestamp)
- **Status** of the operation (success/failure)
- **Context** (IP address, user agent)

Audit logs can be viewed at `/admin/audit-log` and exported to JSON or CSV. A retention policy automatically cleans up logs older than 90 days.

## Media Handling

The CMS does **not** include file upload functionality. Images are referenced by URL (e.g., `KeyInitiativeSlide.imageUrl`). External resources like Trello boards, videos, and diagrams are stored as links.

## Key Files

| File/Directory | Purpose |
|----------------|---------|
| `prisma/schema.prisma` | Complete data model definition |
| `lib/auth.ts` | Authentication and authorization functions |
| `lib/audit.ts` | Audit logging utilities |
| `lib/prisma.ts` | Prisma client setup with pg adapter |
| `lib/actions/` | Server actions for all CRUD operations |
| `lib/data/fetch-team.ts` | Data fetching for public pages |
| `app/admin/` | Admin interface pages |
| `components/admin/` | All editor components |
| `components/widgets/` | Public-facing widget components |
| `app/api/cms/` | CMS API routes |
