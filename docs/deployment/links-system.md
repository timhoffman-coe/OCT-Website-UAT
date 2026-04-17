# Links System

The Links system provides a CMS-managed directory of important resources on the public `/links` page. Links are organized into categories, each with configurable styling, and can be maintained by delegated editors without requiring Super Admin access.

## Architecture Overview

The Links system uses a simple parent-child data model:

```
LinkCategory (database model)
  └─ LinkItem[]     (individual links within the category)

LinksPermission     (per-user edit access)
```

The public page renders at `/links`. The admin interface lives at `/admin/links` (content management) and `/admin/links-editors` (permission management).

## Data Model

### LinkCategory

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (cuid) | Primary key |
| `title` | String | Category heading (e.g., "Change Management") |
| `subtitle` | String | Description text (e.g., "8 resources") |
| `iconBg` | String | Tailwind background class for the icon (e.g., `bg-blue-50`) |
| `iconColor` | String | Tailwind text color class for the icon (e.g., `text-process-blue`) |
| `isTeamGrid` | Boolean | If true, renders links as a compact tag grid instead of cards |
| `sortOrder` | Int | Display order on the public page |
| `createdAt` | DateTime | Record creation timestamp |
| `updatedAt` | DateTime | Last modification timestamp |

### LinkItem

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (cuid) | Primary key |
| `categoryId` | String | Foreign key to LinkCategory (cascade delete) |
| `name` | String | Display name for the link |
| `url` | String | Link URL (external or internal) |
| `sortOrder` | Int | Display order within the category |
| `createdAt` | DateTime | Record creation timestamp |
| `updatedAt` | DateTime | Last modification timestamp |

### LinksPermission

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (cuid) | Primary key |
| `userId` | String (unique) | Foreign key to User (cascade delete) |
| `createdAt` | DateTime | When the permission was granted |

## Permissions

The Links system uses a single-tier permission model:

| Level | Who | Access |
|-------|-----|--------|
| **Full access** | SUPER_ADMIN or user with `LinksPermission` | Can create, edit, delete, and reorder all categories and links |

Permission functions in `lib/auth.ts`:
- `canEditLinks()` — returns true if user has access
- `requireLinksAccess()` — enforces access (throws if denied)

### Managing Permissions

Links editors are managed at `/admin/links-editors` (SUPER_ADMIN only). Select a user from the dropdown and click Add. Super Admins automatically have access.

## Display Modes

Categories support two display modes, controlled by the `isTeamGrid` field:

### Standard Card Layout (default)

Links render as individual cards in a 4-column responsive grid. Each card shows the link name with a link icon and an external link indicator.

### Grid Layout (`isTeamGrid: true`)

Links render as compact tag tiles in a 5-column responsive grid. Each tile shows only the link name. Suitable for team sites and resource directories.

## Styling Options

Category icons are configurable through two fields:

| Icon Background | Icon Color |
|-----------------|------------|
| `bg-red-50` | `text-edmonton-error` |
| `bg-blue-50` | `text-process-blue` |
| `bg-amber-50` | `text-edmonton-warning` |
| `bg-purple-50` | `text-purple-600` |
| `bg-green-50` | `text-green-600` |
| `bg-orange-50` | `text-orange-600` |
| `bg-teal-50` | `text-teal-600` |

These are Tailwind CSS classes applied to the icon container on the public page.

## Admin Interface

### Links Manager (`/admin/links`)

The main management page shows all categories as expandable cards. Each category displays its title, subtitle, icon preview, and link count.

Available actions:
- **Add Category** — create a new category with title, subtitle, colors, and layout mode
- **Edit** (pencil icon) — modify category fields inline
- **Delete** (trash icon) — remove a category and all its links
- **Reorder** (arrow icons) — move categories up or down

Within each expanded category:
- **Add link** — create a new link with name and URL
- **Edit** (pencil icon) — modify link name and URL inline
- **Delete** (trash icon) — remove a single link
- **Reorder** (arrow icons) — move links up or down within the category

### Links Editors (`/admin/links-editors`)

SUPER_ADMIN-only page for granting and revoking links edit access. Uses a dropdown of existing users (filtered to exclude those who already have access and Super Admins).

## Public Page

### Links Directory (`/links`)

Server-rendered page that fetches all categories and links from the database, ordered by `sortOrder`. Each category renders as an HTML `<details>` accordion element.

External links (URLs starting with `http`) open in a new tab with `noopener noreferrer`.

If no categories exist in the database, the page shows an empty state message.

## Server Actions

All CRUD operations are in `lib/actions/links-actions.ts`. Every action:
1. Calls `requireLinksAccess()` to enforce permissions
2. Performs the database operation
3. Creates an audit log entry
4. Revalidates both `/links` and `/admin/links`

| Action | Description |
|--------|-------------|
| `createLinkCategory(data)` | Create a category with auto-incremented sortOrder |
| `updateLinkCategory(id, data)` | Partial update of category fields |
| `deleteLinkCategory(id)` | Delete category (cascade deletes links) |
| `reorderLinkCategories(orderedIds)` | Batch update sortOrder via transaction |
| `createLinkItem(categoryId, data)` | Create a link with auto-incremented sortOrder |
| `updateLinkItem(id, data)` | Partial update of link fields |
| `deleteLinkItem(id)` | Delete a single link |
| `reorderLinkItems(categoryId, orderedIds)` | Batch update sortOrder via transaction |

## Key Files

| File | Purpose |
|------|---------|
| `prisma/schema.prisma` | LinkCategory, LinkItem, LinksPermission models |
| `lib/auth.ts` | `canEditLinks()`, `requireLinksAccess()` |
| `lib/actions/links-actions.ts` | CRUD for categories and links (8 actions) |
| `lib/actions/links-permission-actions.ts` | Grant/revoke links editor permissions |
| `components/admin/LinksManagerClient.tsx` | Admin UI for managing categories and links |
| `components/admin/LinksEditorsClient.tsx` | Admin UI for managing editor permissions |
| `app/admin/links/page.tsx` | Admin links manager page |
| `app/admin/links-editors/page.tsx` | Admin links editors page |
| `app/links/page.tsx` | Public links directory page |
| `prisma/migrations/20260417000000_add_links_cms/migration.sql` | Database migration |
