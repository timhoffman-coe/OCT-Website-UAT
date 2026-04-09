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

Four special permission tables control access to non-team content:
- `RoadmapPermission` — who can edit the Technology Roadmap
- `OctWebDevPermission` — who can view the OCT-Web-Dev documentation section
- `NewsPermission` — who can create and edit news posts

In all cases, SUPER_ADMIN users automatically have access without needing an explicit permission record.

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

Pages use a widget-based layout system. Each team has a set of `WidgetInstance` records that control which content sections appear and in what order. There are 16 widget types:

| Widget Type | Label | Template | Description |
|-------------|-------|----------|-------------|
| `page_header` | Page Header | ITS_TEAM | Team name banner with support request button |
| `portfolios` | Our Portfolios | ITS_TEAM | Grid of portfolio cards with icons and links |
| `team_tabs` | Team Overviews | ITS_TEAM | Tabbed interface with video embeds and diagram links |
| `accordion_links` | Important Links | ITS_TEAM | Collapsible accordion groups of categorized links |
| `work_tracking` | Work Tracking Boards | ITS_TEAM | Grid of external board cards (Trello, etc.) |
| `ongoing_projects` | Ongoing Projects | ITS_TEAM | Hero block highlighting current projects with CTA |
| `budget_spend` | Budget & Spend | ITS_TEAM | Budget overview card with link to financial reports |
| `team_members` | Who We Are | ITS_TEAM | Team member cards grid with contact info |
| `service_areas` | Service Areas | SECTION | Service area cards with modal detail views |
| `who_we_are` | Who We Are | SECTION | Two-column layout with video placeholder and accordion items |
| `key_initiatives` | Key Initiatives | SECTION | Carousel spotlight of key initiatives with images |
| `subteam_header` | Sub-Team Header | SUB_TEAM | Hero section with icon, title, and breadcrumb |
| `subteam_services` | Our Services | SUB_TEAM | Grid of service cards with bullet items |
| `subteam_initiatives` | Current Initiatives | SUB_TEAM | Initiative cards with descriptions and links |
| `subteam_contacts` | Key Contacts | SUB_TEAM | Sidebar contact cards with roles and emails |
| `subteam_quick_links` | Quick Links | SUB_TEAM | Sidebar quick links with descriptions |

Some widgets (`budget_spend`, `ongoing_projects`) are config-based — their heading, description, button text, and button link are stored as JSON config on the `WidgetInstance` rather than in separate database tables.

Widgets can be reordered via drag-and-drop in the admin UI through the Layout Editor. Default widgets are automatically created when a new team or portfolio is added. Widget availability is controlled per-template via a blocklist in `lib/widget-template-map.ts`.

### Key Data Models

```
User
  ├─ TeamPermission (per-team access grants)
  ├─ RoadmapPermission
  ├─ OctWebDevPermission
  ├─ NewsPermission
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

PageView (analytics tracking)
  ├─ path, teamSlug
  ├─ userAgent, referrer
  └─ createdAt
```

## How Content Editing Works

### Admin Interface (`/admin`)

The admin panel is a client-side React application with these main sections:

| Page | Purpose |
|------|---------|
| `/admin` | Dashboard showing team cards and recent activity |
| `/admin/teams/[teamId]` | Full content editor for a specific team |
| `/admin/users` | User management and role assignment |
| `/admin/news` | News post list with filtering and management |
| `/admin/news/new` | Create a new news post |
| `/admin/news/[slug]` | Edit an existing news post |
| `/admin/news-editors` | Manage news editor permissions (SUPER_ADMIN) |
| `/admin/analytics` | Page view analytics dashboard |
| `/admin/audit-log` | View and export change history |
| `/admin/roadmap-editors` | Manage roadmap editor permissions (SUPER_ADMIN) |
| `/admin/oct-web-dev-viewers` | Manage documentation viewer permissions (SUPER_ADMIN) |
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
| AccordionLinksEditor | Collapsible accordion groups of categorized links |
| ServiceAreaEditor | Service cards with features, icons, and links |
| WhoWeAreEditor | "Who We Are" description cards |
| KeyInitiativesEditor | Image carousel slides |
| SubTeamsEditor | Create and manage child teams |
| TeamServicesEditor | Service lists for sub-team pages |
| TeamInitiativesEditor | Project/initiative lists |
| TeamContactsEditor | Contact cards |
| TeamQuickLinksEditor | Resource link lists |
| LayoutEditor | Drag-and-drop widget reordering |
| NewsPostEditor | News articles with rich text, categories, and images |

Each team also has a **Team History** panel (via `TeamHistory` component) at the bottom of the team editor that shows a collapsible audit log of recent changes to that team.

## News Management System

The CMS includes a full news module for publishing articles on the public site. News posts are stored as Markdown files with YAML frontmatter in `content/news/`, not in the database.

### Data Model

Each news post has:

| Field | Type | Notes |
|-------|------|-------|
| `title` | string | Required, used to generate slug |
| `date` | string | Publish date (YYYY-MM-DD) |
| `category` | enum | Strategy, Infrastructure, Community, or Spotlight |
| `description` | string | Short summary shown on cards |
| `image` | string | URL path to hero/thumbnail image |
| `featured` | boolean | Only one post can be featured at a time |
| `author` | string | Required |
| `content` | string | Markdown body (edited via TipTap rich text editor) |
| `draft` | boolean | Drafts are hidden from the public site |

Files are named `YYYY-MM-DD-slug.md` and managed via `lib/news.ts`.

### Image Uploads

News posts support image uploads via `POST /api/cms/news/upload-image`:
- Accepted types: PNG, JPEG, WebP (max 5 MB)
- Stored in `public/images/news/` with timestamped filenames

### Permissions

News editing requires a `NewsPermission` record or SUPER_ADMIN role. Permissions are managed at `/admin/news-editors` by Super Admins.

### Key Files

| File | Purpose |
|------|---------|
| `lib/news.ts` | File-based CRUD for news posts |
| `lib/news.types.ts` | TypeScript types for news data |
| `lib/actions/news-actions.ts` | Server actions (create, update, delete, publish, unpublish) |
| `lib/actions/news-permission-actions.ts` | Grant/revoke news editor permissions |
| `components/admin/NewsPostEditor.tsx` | Rich text editor with image upload and category selection |
| `components/admin/RichTextEditor.tsx` | TipTap-based markdown editor (shared component) |
| `app/api/cms/news/upload-image/route.ts` | Image upload API |

## Page Analytics

The CMS tracks page views for all public pages via `proxy.ts` (the Next.js request interceptor). Each page load fires a server-side request to the `/api/track-view` endpoint, which records the view in the `PageView` database table.

The analytics dashboard at `/admin/analytics` shows:
- Total views (last 30 days and last 7 days)
- Daily page view chart
- Top 10 pages by view count
- Top 10 teams by view count
- 50 most recent individual page views

Page views older than 90 days are automatically cleaned up via `cleanupOldPageViews()` in `lib/page-views.ts`.

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

Most images and media are referenced by URL (e.g., `KeyInitiativeSlide.imageUrl`). External resources like Trello boards, videos, and diagrams are stored as links.

The one exception is **news post images**, which support direct file upload via `POST /api/cms/news/upload-image`. Uploaded images are stored in `public/images/news/` with timestamped filenames (PNG, JPEG, WebP; max 5 MB).

## Key Files

| File/Directory | Purpose |
|----------------|---------|
| `prisma/schema.prisma` | Complete data model definition |
| `proxy.ts` | Request interceptor (auth, rate limiting, page view tracking) |
| `lib/auth.ts` | Authentication and authorization functions |
| `lib/audit.ts` | Audit logging utilities |
| `lib/prisma.ts` | Prisma client setup with pg adapter |
| `lib/actions/` | Server actions for all CRUD operations |
| `lib/data/fetch-team.ts` | Data fetching for public pages |
| `lib/news.ts` | File-based news post storage and retrieval |
| `lib/page-views.ts` | Page view recording and cleanup |
| `lib/widget-template-map.ts` | Widget availability rules per page template |
| `app/admin/` | Admin interface pages |
| `components/admin/` | All editor components |
| `components/widgets/` | Public-facing widget components |
| `app/api/cms/` | CMS API routes |
| `content/news/` | Markdown news post files |
