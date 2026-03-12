# Architecture Overview

## Technology Stack

| Technology | Version | Role |
|------------|---------|------|
| Next.js | 16 | App Router, API routes, server actions, SSR |
| React | 19 | UI components |
| Prisma | 7 | ORM for PostgreSQL |
| PostgreSQL | 16 | Primary database |
| @prisma/adapter-pg | — | Driver adapter for Prisma client |
| MSSQL (tedious) | — | Data Portal queries to on-prem SQL Server |
| Tailwind CSS | 4 | Styling |
| TypeScript | — | Type safety |
| Google Gemini | 2.5 Flash | AI chat assistant |
| @dnd-kit | — | Drag-and-drop widget reordering |
| DOMPurify | — | HTML sanitization |
| Lucide React | — | Icon library |
| Docker | — | Containerized dev and prod environments |
| Nginx | — | Reverse proxy (production) |

## Directory Structure

```
app/
  [teamSlug]/             Dynamic CMS team pages
  [teamSlug]/[subTeamSlug]/  Sub-team pages
  admin/                  CMS admin interface
  api/                    API routes (21 endpoints)
  layout.tsx              Root layout (fonts, metadata, PWA)
  globals.css             Tailwind + custom styles

components/
  admin/                  CMS editor components (21 files)
  widgets/                Public-facing widget renderers
  Header.tsx, Footer.tsx  Shared layout components

lib/
  actions/                Server actions (CRUD operations)
  data/                   Data fetching utilities
  hooks/                  React hooks
  auth.ts                 Authentication & authorization
  audit.ts                Audit logging
  prisma.ts               Prisma client with pg adapter
  logger.ts               Structured logging
  env.ts                  Environment validation
  mssql.ts                MSSQL connection pool

prisma/
  schema.prisma           Data model definition
  migrations/             Migration files
  seed.ts                 Database seeding

content/                  Static markdown files
docs/                     Project documentation
public/                   Static assets, PWA manifest
middleware.ts             Auth, rate limiting, correlation IDs
```

## Frontend Architecture

### Page Templates

Public pages are rendered from CMS data via dynamic routes:

- `app/[teamSlug]/page.tsx` — SECTION and ITS_TEAM pages
- `app/[teamSlug]/[subTeamSlug]/page.tsx` — SUB_TEAM pages

All CMS pages use `force-dynamic` (no static generation) so content changes are immediately visible.

### Widget System

Page layout is driven by `WidgetInstance` records in the database. Each team has a set of widgets that control which content sections appear and in what order. There are 16 widget types (e.g., `page_header`, `portfolios`, `service_areas`, `team_members`). Widgets can be reordered via drag-and-drop in the admin panel.

### Fonts

- **Open Sans** (400, 600, 700) — body text
- **PT Serif** (400, 700) — headings

Loaded via Google Fonts with `next/font` optimization.

## Backend Architecture

### API Routes

21 API endpoints under `app/api/` handle health checks, authentication, AI chat, CMS data, service health, and Data Portal queries. See the API Reference document for full details.

### Server Actions

Located in `lib/actions/`. Handle all content CRUD operations (teams, portfolios, members, services, etc.). Each action:
1. Verifies authorization
2. Validates input
3. Persists changes via Prisma
4. Logs the change to the audit trail
5. Calls `revalidatePath()` to refresh public pages

### Middleware

`middleware.ts` runs on `/admin/*`, `/api/cms/*`, `/api/chat`, `/api/admin-login`, and `/api/log-error`. It handles:

1. **Correlation IDs** — generates or propagates `x-correlation-id` for request tracing
2. **Rate limiting** — per-IP in-memory tracking (chat: 20/min, login: 5/min, error: 10/min)
3. **Authentication** — IAP JWT verification (production) or dev bypass

## Database Layer

### PostgreSQL (Primary)

Prisma ORM connects via the `@prisma/adapter-pg` driver adapter. The client is lazily initialized in `lib/prisma.ts` using a proxy pattern to avoid build-time failures when the database is unavailable.

Key models: `User`, `Team`, `TeamPermission`, `Portfolio`, `TeamMember`, `ServiceArea`, `WidgetInstance`, `AuditLog`, and many content-type models. See the CMS Overview document for the full data model.

### MSSQL (Data Portal)

An on-prem SQL Server database is accessed via the `tedious` driver (`lib/mssql.ts`) for Data Portal features: service health, incident metrics, and budget data.

## Authentication Flow

```
Request
  │
  ▼
Middleware
  │
  ├─ Production: Verify IAP JWT (x-goog-iap-jwt-assertion)
  │  via Google JWKS endpoint
  │
  └─ Development: DEV_BYPASS_IAP=true
     Sets x-user-email from env var
  │
  ▼
x-user-email header set
  │
  ▼
lib/auth.ts → getCurrentUser()
  │
  ├─ Looks up User by email in PostgreSQL
  ├─ Includes teamPermissions, roadmapPermission, octWebDevPermission
  │
  ▼
Role-based authorization
  │
  ├─ SUPER_ADMIN: Full access
  ├─ TEAM_ADMIN: Assigned teams + children
  └─ VIEWER: Read-only on assigned teams
```

In production, Google Cloud IAP handles the actual authentication. The application only needs to verify the JWT and look up the user — it never handles passwords or sessions in production.

In development, an optional password gate (`ADMIN_PASSWORD` env var) provides a login page at `/login` that sets an `admin_session` cookie.

## Key Configuration Files

| File | Purpose |
|------|---------|
| `next.config.ts` | Standalone output, security headers, remote image patterns |
| `prisma.config.js` | Schema path, seed command, shadow database URL |
| `tsconfig.json` | ES2022 target, strict mode, `@/*` path alias |
| `eslint.config.mjs` | Next.js core web vitals + TypeScript rules |
| `postcss.config.mjs` | Tailwind CSS 4 via `@tailwindcss/postcss` |
| `middleware.ts` | Auth, rate limiting, correlation IDs |
| `docker-compose.dev.yml` | Local development environment |
| `docker-compose.yml` | Production environment |
| `Dockerfile` | Multi-stage production build |
| `Dockerfile.dev` | Development container with hot reload |
