# Widget System

The widget system provides a flexible, drag-and-drop page layout for all CMS-managed pages. Each team page is composed of an ordered list of widgets that determine which content sections appear and in what order.

## Architecture

```
WidgetDefinition (22 types)
  │  Stores: widgetType, label, description, icon, isEnabled
  │  Seeded once via prisma/seed.ts or migration SQL
  │
  ▼
WidgetInstance (per-team or per-project)
  │  Stores: teamId?, projectId?, widgetDefinitionId, config (JSON), sortOrder
  │  Created automatically when teams/projects are added
  │
  ▼
WidgetRenderer (components/widgets/WidgetRenderer.tsx)
     Dispatches to the correct React component based on widgetType
```

- **WidgetDefinition** records are global — they define what widget types exist in the system.
- **WidgetInstance** records are per-entity — they define which widgets appear on a specific team or project page and in what order. Each instance has either `teamId` or `projectId` set (not both).
- The `config` JSON field on WidgetInstance stores settings for config-based widgets (e.g., heading, description, button text).

## Widget Types

| Widget Type | Label | Default Template | Description |
|-------------|-------|------------------|-------------|
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
| `project_header` | Project Header | PROJECT | Gradient hero with status, code, title, description |
| `project_governance` | Project Governance | PROJECT | 2-column grid of governance roles |
| `project_objectives` | Project Objectives | PROJECT | Objectives list with Lucide icons |
| `project_financial` | Financial Overview | PROJECT | Budget card with funding and authority |
| `project_timeline` | Project Timeline | PROJECT | Dates, progress bar, milestone timeline |
| `project_status_updates` | Status Updates | PROJECT | Latest status updates with timestamps |

## Template Blocklist

Not all widgets are available on all page templates. `lib/widget-template-map.ts` defines a blocklist:

| Template | Blocked Widgets |
|----------|----------------|
| **SECTION** | `subteam_header`, `subteam_services`, `subteam_initiatives`, `subteam_contacts`, `subteam_quick_links` |
| **ITS_TEAM** | `service_areas`, `subteam_header`, `subteam_services`, `subteam_initiatives`, `subteam_contacts`, `subteam_quick_links` |
| **SUB_TEAM** | `portfolios`, `service_areas`, all `project_*` widgets |
| **PROJECT** | All `page_header`, `portfolios`, `team_*`, `service_areas`, `who_we_are`, `key_initiatives`, `subteam_*`, `ongoing_projects`, `budget_spend`, `accordion_links`, `work_tracking` widgets |

If a widget type is in the blocklist for a template, it won't appear in the Layout Editor's "Add Widget" options for pages using that template.

## Sidebar vs. Main Content

Certain widgets render in a sidebar column instead of the main content area:

**SUB_TEAM sidebar** (1/3 width):
- `subteam_contacts`
- `subteam_quick_links`

**PROJECT sidebar** (4/12 width):
- `project_financial`
- `project_timeline`
- `project_status_updates`

The `isSidebarWidget()` function in `lib/widget-template-map.ts` identifies these.

## Config-Based Widgets

Most widgets pull their content from related database tables (e.g., `portfolios` reads from the `Portfolio` table). Two widgets are **config-based** — their content is stored as JSON in the `WidgetInstance.config` field:

- `budget_spend` — heading, description, buttonText, buttonLink
- `ongoing_projects` — heading, description, buttonText, buttonLink

## How Widgets Are Managed

### Admin UI (Layout Editor)

The Layout Editor (`components/admin/LayoutEditor.tsx`) provides:
- Drag-and-drop reordering via `@dnd-kit`
- Add/remove widgets (filtered by template blocklist)
- Inline editing of widget config (for config-based widgets)
- Each content widget expands into its dedicated editor component

### Default Widgets

When a new team is created, default widgets are automatically assigned based on the team's page template. When a new portfolio is created under an ITS_TEAM, its sub-team page gets default SUB_TEAM widgets.

### Server Actions

Widget operations go through two action files:
- `lib/actions/widget-actions.ts` — for team widget instances
- `lib/actions/project-widget-actions.ts` — for project widget instances

Both support: create, delete, reorder, update config, and reset to defaults. Each operation logs to the audit trail.

## Adding a New Widget Type

1. **Add the widget definition** to the seed data in `prisma/seed.ts` (in the `widgetDefinitions` array)
2. **Run the seed** to create the WidgetDefinition record: `npm run db:seed`
3. **Create the React component** in `components/widgets/` (e.g., `MyNewWidget.tsx`)
4. **Register it in WidgetRenderer** — add a case for the new `widgetType` in `components/widgets/WidgetRenderer.tsx`
5. **Update the template blocklist** in `lib/widget-template-map.ts` if the widget should be restricted to certain templates
6. **Create an editor component** in `components/admin/` if the widget needs admin-side editing beyond config JSON
7. **Add default assignment logic** in the team creation server action if the widget should be auto-added to new teams

## Key Files

| File | Purpose |
|------|---------|
| `prisma/seed.ts` | Widget type definitions (widgetDefinitions array) |
| `lib/widget-template-map.ts` | Template blocklist, sidebar detection |
| `lib/actions/widget-actions.ts` | CRUD server actions for widget instances |
| `components/widgets/WidgetRenderer.tsx` | Widget type → component dispatcher |
| `components/widgets/*.tsx` | Individual widget rendering components |
| `components/admin/LayoutEditor.tsx` | Admin drag-and-drop page builder |
