# API Reference

This application exposes 21 API routes grouped by feature area. All routes use the `GET` method unless noted otherwise.

## Health & Status

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/health` | Public | Application health check |
| GET | `/api/data-portal/health` | Public | MSSQL database health check |

### GET /api/health

Checks PostgreSQL (via `SELECT 1`) and MSSQL connectivity. Returns 200 if PostgreSQL is healthy, 503 otherwise. MSSQL unavailability does not degrade overall status.

```json
{
  "status": "healthy | degraded",
  "checks": {
    "postgres": "healthy | error",
    "mssql": "healthy | unavailable | error"
  },
  "timestamp": "2026-03-12T..."
}
```

### GET /api/data-portal/health

Checks MSSQL connection with `SELECT 1 AS connected`. Returns 200 if connected, 503 on error. Error details are logged server-side and never exposed to the client.

```json
{
  "status": "connected | error",
  "timestamp": "2026-03-12T..."
}
```

---

## Authentication

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/admin-login` | Public (dev only) | Password-based dev login |

### POST /api/admin-login

Dev-only endpoint. Returns 403 in production (when `DEV_BYPASS_IAP` is not set). Rate-limited to 5 requests per minute per IP.

**Request body:**
```json
{
  "password": "string"
}
```

**Success response (200):**
```json
{
  "ok": true
}
```

Sets an `admin_session` cookie (httpOnly, secure in production, sameSite=strict, 8-hour expiry). The token is a time-based SHA256 hash that rotates every 8 hours.

**Error responses:** 401 (invalid password), 403 (not dev mode)

---

## Logging

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/log-error` | Public | Client-side error reporting |

### POST /api/log-error

Receives errors from client-side error boundaries and logs them server-side. Rate-limited to 10 requests per minute per IP.

**Request body:**
```json
{
  "message": "string (required, max 1000 chars)",
  "digest": "string (optional, max 100 chars)",
  "url": "string (optional, max 500 chars)",
  "module": "string (optional, max 100 chars)"
}
```

**Headers:** `x-correlation-id` (used for log tracing)

**Response (200):**
```json
{
  "ok": true
}
```

---

## AI Chat

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/chat` | Public | AI-powered assistant |

### POST /api/chat

Powered by Google Gemini 2.5 Flash. Classifies user intent (HR, IT, SiteSearch, General) and routes to the appropriate knowledge base. Rate-limited to 20 requests per minute per IP. Includes a circuit breaker that triggers after 3 failures with a 60-second cooldown.

**Request body:**
```json
{
  "question": "string (required, max 2000 chars)",
  "history": [
    {
      "role": "user | assistant",
      "content": "string (max 5000 chars)"
    }
  ]
}
```

History is optional, limited to 20 messages (last 10 used for context).

**Response (200):**
```json
{
  "response": "string"
}
```

---

## CMS — Teams

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/cms/teams` | requireUser | List accessible teams |
| GET | `/api/cms/teams/[teamId]` | requireTeamAccess | Full team detail |

### GET /api/cms/teams

Returns all teams the current user can access. SUPER_ADMIN sees all teams; other roles see only teams they have `TeamPermission` for. Cache: `private, max-age=30`.

```json
[
  {
    "id": "string",
    "teamName": "string",
    "slug": "string",
    "sortOrder": 0,
    "_count": {
      "portfolios": 0,
      "teamMembers": 0,
      "serviceAreas": 0
    }
  }
]
```

### GET /api/cms/teams/[teamId]

Returns full team detail including all nested content. Requires SUPER_ADMIN or TEAM_ADMIN with `TeamPermission` for this team.

```json
{
  "id": "string",
  "teamName": "string",
  "portfolios": [],
  "teamTabs": [],
  "trelloBoards": [],
  "teamMembers": [],
  "serviceAreas": [],
  "accordionGroups": []
}
```

---

## CMS — Users

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/cms/users` | requireSuperAdmin | List all users |

### GET /api/cms/users

Returns all users with their team permissions and roles. Cache: `private, no-store`.

```json
[
  {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "SUPER_ADMIN | TEAM_ADMIN | VIEWER",
    "createdAt": "ISO timestamp",
    "teamPermissions": [
      {
        "teamId": "string",
        "team": {
          "id": "string",
          "teamName": "string",
          "slug": "string"
        }
      }
    ]
  }
]
```

---

## CMS — Audit Log

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/cms/audit-log` | requireUser (TEAM_ADMIN+) | Paginated audit logs |
| GET | `/api/cms/audit-log/export` | requireSuperAdmin | Export logs as file |

### GET /api/cms/audit-log

Returns paginated audit log entries. VIEWER role is blocked (403). Cache: `private, max-age=10`.

**Query parameters:**

| Param | Default | Description |
|-------|---------|-------------|
| `entity` | — | Filter by entity type (e.g., "Team", "Portfolio") |
| `teamId` | — | Filter by team ID (auto-sets entity to "Team") |
| `limit` | 50 | Records per page (max 100) |
| `offset` | 0 | Pagination offset |

```json
{
  "logs": [
    {
      "id": "string",
      "entity": "string",
      "entityId": "string",
      "action": "CREATE | UPDATE | DELETE",
      "status": "string",
      "beforeData": {},
      "afterData": {},
      "createdAt": "ISO timestamp",
      "user": {
        "email": "string",
        "name": "string"
      }
    }
  ],
  "total": 0
}
```

### GET /api/cms/audit-log/export

Exports audit logs as a downloadable file. Returns with `Content-Disposition: attachment` header.

**Query parameters:**

| Param | Default | Description |
|-------|---------|-------------|
| `format` | json | `json` or `csv` |
| `from` | — | Start date (YYYY-MM-DD) |
| `to` | — | End date (YYYY-MM-DD) |

---

## CMS — OCT-Web-Dev

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/cms/oct-web-dev/check-access` | Public | Check viewer permission |
| GET | `/api/cms/oct-web-dev/content` | requireOctWebDevAccess | Main checklist content |
| GET | `/api/cms/oct-web-dev/docs/[slug]` | requireOctWebDevAccess | Documentation by slug |

### GET /api/cms/oct-web-dev/check-access

Returns whether the current user can view the OCT-Web-Dev section. Never returns 403 — returns `{ canView: false }` on error.

```json
{
  "canView": true
}
```

### GET /api/cms/oct-web-dev/content

Reads the main checklist markdown from `content/oct-web-dev.md` on disk.

```json
{
  "content": "markdown string"
}
```

### GET /api/cms/oct-web-dev/docs/[slug]

Reads a documentation file by slug. Only whitelisted slugs are allowed — returns 404 for unknown slugs.

**Available slugs:** `cicd-pipeline`, `prisma-migration-workflow`, `cms-overview`, `api-reference`, `architecture-overview`, `development-setup`, `deployment-guide`, `cms-admin-guide`

```json
{
  "content": "markdown string"
}
```

---

## Roadmap

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/cms/roadmap/check-access` | Public | Check edit permission |
| GET | `/api/roadmap/sections` | Public | All roadmap data |

### GET /api/cms/roadmap/check-access

Returns whether the current user can edit the roadmap. Returns `{ canEdit: false }` on error.

```json
{
  "canEdit": true
}
```

### GET /api/roadmap/sections

Returns all roadmap sections with their projects, ordered by `sortOrder`.

```json
[
  {
    "id": "string",
    "title": "string",
    "sortOrder": 0,
    "projects": [
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "sortOrder": 0
      }
    ]
  }
]
```

---

## Service Health

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/service-health` | Public | Aggregated service health |
| GET | `/api/service-health/groups` | Public | Monitor groups |
| GET | `/api/service-health/[groupId]` | Public | Group status detail |

### GET /api/service-health

Fetches aggregated service health data. Cache: `public, max-age=30, stale-while-revalidate=60`.

### GET /api/service-health/groups

Fetches monitor groups from the upstream IAP-protected service. Cache: `public, max-age=300, stale-while-revalidate=600`.

### GET /api/service-health/[groupId]

Fetches status for a specific monitor group. Returns 400 if `groupId` is empty or exceeds 100 characters. Cache: `public, max-age=30, stale-while-revalidate=60`.

---

## Data Portal

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/data-portal/service-health` | Public | MSSQL service health records |
| GET | `/api/data-portal/incidents` | Public | Incident metrics |
| GET | `/api/data-portal/budget-actuals` | Public | Budget vs. actuals |

### GET /api/data-portal/service-health

Returns service health records from the MSSQL Data Portal. Revalidation: 60 seconds.

```json
{
  "data": [],
  "timestamp": "ISO timestamp",
  "rowCount": 0
}
```

### GET /api/data-portal/incidents

Returns incident metrics for a date range. Revalidation: 300 seconds.

**Query parameters:**

| Param | Default | Description |
|-------|---------|-------------|
| `startDate` | 30 days ago | Start date (YYYY-MM-DD) |
| `endDate` | Today | End date (YYYY-MM-DD) |

```json
{
  "data": [],
  "timestamp": "ISO timestamp",
  "rowCount": 0
}
```

### GET /api/data-portal/budget-actuals

Returns budget vs. actual financial data for a fiscal year. Revalidation: 300 seconds.

**Query parameters:**

| Param | Default | Description |
|-------|---------|-------------|
| `year` | Current year | Fiscal year (2000–2100) |

Returns 400 if year is invalid.

```json
{
  "data": [],
  "timestamp": "ISO timestamp",
  "rowCount": 0
}
```

---

## Authentication Summary

| Auth Level | Routes | Description |
|-----------|--------|-------------|
| Public | 15 | No authentication required |
| requireUser | 2 | Authenticated user; role-based filtering |
| requireTeamAccess | 1 | SUPER_ADMIN or TEAM_ADMIN with team permission |
| requireSuperAdmin | 2 | SUPER_ADMIN role only |
| requireOctWebDevAccess | 2 | SUPER_ADMIN or user with OctWebDevPermission |

## Rate Limiting

Rate limits are enforced in `middleware.ts` using an in-memory per-IP tracker.

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/chat` | 20 requests | 60 seconds |
| `/api/admin-login` | 5 requests | 60 seconds |
| `/api/log-error` | 10 requests | 60 seconds |

Exceeding the limit returns **429 Too Many Requests**.

## Middleware

The middleware runs on these paths: `/admin/*`, `/api/cms/*`, `/api/chat`, `/api/admin-login`, `/api/log-error`.

It handles:
- **Correlation IDs** — generated or propagated via `x-correlation-id` header
- **Rate limiting** — per-IP tracking with automatic stale entry cleanup (>10,000 entries)
- **Authentication** — IAP JWT verification (production) or dev bypass with optional password gate
- **IP extraction** — reads `x-real-ip` (GCP load balancer), falls back to `x-forwarded-for`
