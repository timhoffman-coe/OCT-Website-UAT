# Policies System

The Policies system provides a CMS-managed directory of policies and procedures on the public `/policies` page. Policies include directives, standard operating procedures, and formal policies — each with a type, category, code identifier, and external URL. Editors can be delegated without requiring Super Admin access.

## Architecture Overview

The Policies system uses a flat data model:

```
Policy (database model — flat list, no parent-child)

PoliciesPermission (per-user edit access)
```

The public page renders at `/policies`. The admin interface lives at `/admin/policies` (content management) and `/admin/policies-editors` (permission management).

## Data Model

### Policy

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (cuid) | Primary key |
| `title` | String | Policy name (e.g., "Acceptable Use of Communication Technology") |
| `type` | String | One of: `Directive & Procedure`, `Policy`, `Standard Operating Procedures` |
| `code` | String | Policy code (e.g., `A1429D`, `C581`, `SOP`) |
| `category` | String | One of: `security`, `infrastructure`, `governance`, `personnel` |
| `description` | String | Brief description of the policy |
| `url` | String | External URL to the policy document (PDF, Google Doc, etc.) |
| `featured` | Boolean | If true, displayed prominently in the Featured Directives section |
| `sortOrder` | Int | Display order on the public page |
| `createdAt` | DateTime | Record creation timestamp |
| `updatedAt` | DateTime | Last modification timestamp |

### PoliciesPermission

| Field | Type | Description |
|-------|------|-------------|
| `id` | String (cuid) | Primary key |
| `userId` | String (unique) | Foreign key to User (cascade delete) |
| `createdAt` | DateTime | When the permission was granted |

## Permissions

The Policies system uses a single-tier permission model:

| Level | Who | Access |
|-------|-----|--------|
| **Full access** | SUPER_ADMIN or user with `PoliciesPermission` | Can create, edit, delete, and reorder all policies |

Permission functions in `lib/auth.ts`:
- `canEditPolicies()` — returns true if user has access
- `requirePoliciesAccess()` — enforces access (throws if denied)

### Managing Permissions

Policies editors are managed at `/admin/policies-editors` (SUPER_ADMIN only). Select a user from the dropdown and click Add. Super Admins automatically have access.

## Featured Policy Logic

At most one policy can be featured at a time. When creating or updating a policy with `featured: true`, the system automatically un-features any existing featured policy. The featured policy appears as a dark hero card in the Featured Directives section of the public page.

## Policy Types

| Type | Badge Color | Example |
|------|-------------|---------|
| `Directive & Procedure` | Blue | A1429D — Acceptable Use of Communication Technology |
| `Policy` | Green | C581 — Open City Policy |
| `Standard Operating Procedures` | Amber | SOP — Overtime and Afterhours |

## Policy Categories

| Category | Label | Description |
|----------|-------|-------------|
| `security` | Security & Risk | Cybersecurity and risk management policies |
| `infrastructure` | Infrastructure | IT hardware, software, and infrastructure policies |
| `governance` | Data Governance | Data management, investment, and architecture governance |
| `personnel` | Personnel | HR-related procedures for technology staff |

## Admin Interface

### Policies Manager (`/admin/policies`)

The main management page shows all policies as cards. Each card displays the title, code, type badge, category badge, featured star (if applicable), description, and URL.

Available actions:
- **Add Policy** — create a new policy with all required fields
- **Edit** (pencil icon) — modify policy fields inline
- **Delete** (trash icon) — remove a policy with confirmation
- **Reorder** (arrow icons) — move policies up or down

The inline form includes:
- Title and Code text inputs
- Type dropdown (3 options)
- Category dropdown (4 options)
- Featured checkbox with warning note
- Description textarea
- URL input

### Policies Editors (`/admin/policies-editors`)

SUPER_ADMIN-only page for granting and revoking policies edit access. Uses a dropdown of existing users (filtered to exclude those who already have access and Super Admins).

## Public Page

### Policies & Procedures (`/policies`)

The public page uses a server/client component split:
- **Server component** (`app/policies/page.tsx`) — fetches policies from the database, passes to client
- **Client component** (`components/PoliciesClient.tsx`) — handles interactive UI (search, category filtering)

Page sections:
1. **Sidebar** — category filters (Overview, Security & Risk, Infrastructure, Data Governance, Personnel) and search
2. **Hero** — page title and description
3. **Featured Directives** — hero card for the featured policy, plus two regular cards
4. **Policy Domains** — four category cards with dynamic policy counts
5. **All Policies** — filterable, searchable list of all policies
6. **Portal Health** — compliance stats and active policy count
7. **Quick Resources** — links to policy template, compliance hotline, FAQ

External URLs open in a new tab with `noopener noreferrer`.

## Server Actions

All CRUD operations are in `lib/actions/policies-actions.ts`. Every action:
1. Calls `requirePoliciesAccess()` to enforce permissions
2. Performs the database operation
3. Creates an audit log entry
4. Revalidates both `/policies` and `/admin/policies`

| Action | Description |
|--------|-------------|
| `createPolicy(data)` | Create a policy with auto-incremented sortOrder; enforces at-most-one featured |
| `updatePolicy(id, data)` | Partial update of policy fields; enforces at-most-one featured |
| `deletePolicy(id)` | Delete a policy |
| `reorderPolicies(orderedIds)` | Batch update sortOrder via transaction |

## Key Files

| File | Purpose |
|------|---------|
| `prisma/schema.prisma` | Policy, PoliciesPermission models |
| `lib/auth.ts` | `canEditPolicies()`, `requirePoliciesAccess()` |
| `lib/actions/policies-actions.ts` | CRUD for policies (4 actions) |
| `lib/actions/policies-permission-actions.ts` | Grant/revoke policies editor permissions |
| `components/admin/PoliciesManagerClient.tsx` | Admin UI for managing policies |
| `components/admin/PoliciesEditorsClient.tsx` | Admin UI for managing editor permissions |
| `components/PoliciesClient.tsx` | Public page interactive UI (search, filtering) |
| `app/admin/policies/page.tsx` | Admin policies manager page |
| `app/admin/policies-editors/page.tsx` | Admin policies editors page |
| `app/policies/page.tsx` | Public policies page (server component wrapper) |
| `prisma/migrations/20260417100000_add_policies_cms/migration.sql` | Database migration |
