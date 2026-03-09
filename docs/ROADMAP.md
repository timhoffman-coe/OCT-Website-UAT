# OCT Website — Completion Roadmap

> **Last updated:** 2026-03-08
> **Project:** Open City & Technology (OCT) Intranet Website
> **Stack:** Next.js 16 · React 19 · PostgreSQL (Prisma) · MSSQL (Data Portal) · Google APIs · Tailwind CSS

---

## Current State Summary

The site has ~40+ pages covering OCT's five main sections (Technology Planning, Business Solutions, Integrated Technology Solutions, Project Management Office, Corporate Information Security), along with operational dashboards, an AI assistant, a CMS/admin panel, and various resource pages.

**What's working:**
- [x] All section landing pages render with content (some via DB, some via fallback/hardcoded data)
- [x] Service Health dashboard connected to Uptrends API (live data)
- [x] Budget dashboards pulling from Google Sheets CSV (with mock fallback)
- [x] CMS admin panel with full CRUD for teams, users, widgets, service areas
- [x] AI assistant (Gemini-powered) with Google Drive document context
- [x] Authentication middleware (IAP JWT + password fallback)
- [x] Role-based access control (SUPER_ADMIN, TEAM_ADMIN, VIEWER)

**What's not working or incomplete:**
- [ ] 5 dashboards display hardcoded/sample data with "NOT LIVE" banners
- [ ] 5 NIC sub-pages are stubs
- [ ] 1 page (`/about/how-oct-works`) has a layout but no content
- [ ] Multiple placeholder links (`href="#"`) across pages
- [ ] MSSQL Data Portal APIs exist but aren't connected to dashboards
- [ ] Zero test coverage
- [ ] No CI/CD pipeline
- [ ] No project documentation beyond default README
- [ ] 17 security findings (2 critical, 4 high)
- [ ] 10 performance findings (2 high)
- [ ] 12 enterprise best practice gaps (4 high)

---

## Phase 1 — Connect Dashboards to Real Data Sources

Priority: **P0 — Critical** | These dashboards exist but show fake/sample data. The MSSQL Data Portal is available and ready.

### 1.1 Configure MSSQL Data Portal Connection
> **Files:** `.env.local`, `lib/mssql.ts`, `app/api/data-portal/health/route.ts`

- [ ] Set real credentials in `.env.local` for `MSSQL_SERVER`, `MSSQL_DATABASE`, `MSSQL_PORT`, `MSSQL_DOMAIN`, `MSSQL_USER`, `MSSQL_PASSWORD`
- [ ] Verify connectivity via `/api/data-portal/health` endpoint
- [ ] Test NTLM authentication against the on-prem SQL Server
- [ ] Enable encryption on MSSQL connection (`encrypt: true` in `lib/mssql.ts:18` — see Security 5.2)

### 1.2 CIO Executive Dashboard
> **Files:** `app/cio-dashboard/page.tsx`, `components/dashboard/`

- [ ] Replace hardcoded sample data with live queries to MSSQL Data Portal
- [ ] Wire up incident trend charts to `/api/data-portal/incidents`
- [ ] Wire up budget metrics to `/api/data-portal/budget-actuals`
- [ ] Wire up service health summary to `/api/data-portal/service-health`
- [ ] Remove "SAMPLE DATA ONLY - NOT LIVE" warning banner

### 1.3 People Management Dashboard
> **Files:** `app/people-management/page.tsx`

- [ ] Identify real data source for HR data (overtime, sick time, vacation, org structure)
- [ ] Create API route or extend Data Portal for people/HR metrics
- [ ] Replace hardcoded sample arrays with live data fetching
- [ ] Remove "SAMPLE DATA ONLY - NOT LIVE" warning banner

### 1.4 Incident Management Dashboard
> **Files:** `app/incident-management/page.tsx`, `app/api/data-portal/incidents/route.ts`

- [ ] Connect to MSSQL `IncidentMetrics` table via `/api/data-portal/incidents`
- [ ] Replace randomly generated data with real incident data
- [ ] Add date range filtering using existing API query params

### 1.5 Asset Management Dashboard
> **Files:** `app/asset-management/page.tsx`

- [ ] Identify real data source for IT asset inventory
- [ ] Create API route or extend Data Portal for asset data
- [ ] Replace hardcoded financial metrics with live data
- [ ] Build out full asset tracking UI (currently minimal stub)

### 1.6 Vendor Command Center
> **Files:** `app/vendor-command-center/page.tsx`, `app/vendor-command-center/actions.ts`, `components/vendor-dashboard/`

- [ ] Connect to real vendor data source (Google Sheets or MSSQL)
- [ ] Replace `MOCK_VENDORS` constant with live data fetching
- [ ] Verify Google Sheets integration in `app/vendor-command-center/actions.ts` works in production
- [ ] Ensure AI Insights panel has real data to analyze

### 1.7 Budget Dashboard Hardening
> **Files:** `app/budget/dashboard/page.tsx`, `app/budget/capital/page.tsx`, `app/budget/operating/page.tsx`, `app/budget/transactions/page.tsx`, `components/budget-dashboard/`

- [ ] Verify Google Sheets CSV endpoint works reliably in production
- [ ] Add proper error handling when Sheets are unavailable (currently falls back silently to mock)
- [ ] Consider migrating budget data to MSSQL for reliability

---

## Phase 2 — Complete Stub & Incomplete Pages

Priority: **P1** | Pages that exist in navigation but have no real content.

### 2.1 NIC Sub-Pages (5 pages)
> All under `app/resources/nic/` — currently stub pages.

- [ ] **Carrier Services** (`carrier-services/page.tsx`) — Carrier service listings, contracts, coverage details
- [ ] **Fibre Routes** (`fibre-routes/page.tsx`) — Fibre route maps, capacity, status
- [ ] **Quick Links** (`quick-links/page.tsx`) — NIC-specific quick reference links
- [ ] **Team Contacts** (`team-contacts/page.tsx`) — NIC team directory and contact info
- [ ] **Wireless Towers** (`wireless-towers/page.tsx`) — Tower locations, status, specifications

### 2.2 How OCT Works — Network Architecture Map
> **Files:** `app/about/how-oct-works/page.tsx`, `components/oct-architecture/`

The page exists with a full interactive React Flow architecture diagram (landing zones, drill-down sub-diagrams for Security Gateway, SaaS Cloud, IaaS Cloud, COE Internal, Partner Networks, Campus Network). Remaining work:

- [ ] Complete the network map with any missing infrastructure zones or services
- [ ] Add additional drill-down sub-diagrams for zones that don't have them yet (e.g., user groups are `clickable: false`)
- [ ] Verify all service nodes reflect current infrastructure accurately
- [ ] Add labels/descriptions to edges showing protocol/connection types where relevant

### 2.3 Fix Placeholder Links
- [ ] Audit `/links` page (`app/links/page.tsx`) — replace all `href="#"` with real URLs
- [ ] Audit `/project-management-office` page (`app/project-management-office/page.tsx`) — replace placeholder resource links
- [ ] Audit all other pages for remaining `href="#"` placeholders

### 2.4 Service Delivery Content
> **Files:** `app/service-delivery/page.tsx`

- [ ] Replace fallback data with real team member names, emails, and roles
- [ ] Populate Service Management Office, Monitoring & Analytics, and Digital Workplace Catalog sub-sections

---

## Phase 3 — Team Pages & CMS Content Population

Priority: **P1** | Move all team pages from hardcoded/fallback data to CMS-driven content.

### 3.1 Section Pages (5 main sections)
For each section, ensure CMS data is populated and the page renders from DB:

- [ ] **Technology Planning** (`app/technology-planning/page.tsx`) — 4 service areas: Technology Investment, Business Engagement, Vendor Management, IT Asset Management
- [ ] **Business Solutions** (`app/business-solutions/page.tsx`) — 6 service areas: POSSE, TACS, WebLogic, Google Workspace, Branch Solutions, Rapid Development
- [ ] **Integrated Technology Solutions** (`app/integrated-technology-solutions/page.tsx`) — 5 service areas: Infrastructure Ops, Telecom/IoT, Data Technology, Partner Experience, Service Delivery
- [ ] **Project Management Office** (`app/project-management-office/page.tsx`) — Project Management Services, Portfolio Management, Project Delivery
- [ ] **Corporate Information Security** (`app/corporate-information-security/page.tsx`) — 6 service areas: Advisory, Directory Services, Continuity/Recovery, Incident Response, GRC, Digital Identity

### 3.2 ITS Sub-Team Pages
Ensure these pull from the database instead of using fallback/hardcoded data:

- [ ] Data Technology (`app/data-technology/page.tsx`)
- [ ] Partner Experience (`app/partner-experience/page.tsx`)
- [ ] Service Delivery (`app/service-delivery/page.tsx`)
- [ ] Technology Infrastructure Operations (`app/technology-infrastructure-operations/page.tsx`)

### 3.3 Team Member Directories
- [ ] Populate team members for all 5 sections via CMS admin
- [ ] Verify leadership page (`app/leadership/page.tsx`) reflects current org structure
- [ ] Update org chart (`app/org-chart/page.tsx`) with complete team hierarchy

### 3.4 Dynamic Team Routes
- [ ] Verify `app/[teamSlug]/page.tsx` renders correctly for all team slugs in DB
- [ ] Verify `app/[teamSlug]/[subTeamSlug]/page.tsx` renders for all sub-teams
- [ ] Add proper 404 handling for invalid slugs

### 3.5 Content Completeness Checklist
For each team page, ensure:

- [ ] Service area descriptions are accurate and complete
- [ ] Team contacts are populated with real names and emails
- [ ] Quick links point to real resources
- [ ] Initiatives/projects are current
- [ ] Trello board links are active (if applicable)

---

## Phase 4 — Infrastructure, Testing & DevOps

Priority: **P2** | Production readiness and maintainability.

### 4.1 Test Suite
> Currently **zero test coverage** across the entire project.

- [ ] Set up testing framework (Jest + React Testing Library or Vitest)
- [ ] Add unit tests for utility functions (`lib/auth.ts`, `lib/mssql.ts`, `lib/prisma.ts`)
- [ ] Add unit tests for API routes (data portal, service health, CMS, chat)
- [ ] Add component tests for key dashboard components
- [ ] Add integration tests for CMS CRUD operations
- [ ] Add E2E tests for critical user flows (navigation, search, admin login)

### 4.2 CI/CD Pipeline
- [ ] Set up GitHub Actions (or equivalent) for linting (`eslint`)
- [ ] Add type checking step (`tsc --noEmit`)
- [ ] Add unit/integration test step
- [ ] Add build verification step (`next build`)
- [ ] Configure deployment pipeline to target environment

### 4.3 Production Authentication
- [ ] Configure Google Cloud IAP for production (`IAP_AUDIENCE` env var)
- [ ] Remove or gate password-based fallback auth behind a feature flag
- [ ] Verify IAP JWT verification works with production JWKS endpoint
- [ ] Test RBAC flows (SUPER_ADMIN, TEAM_ADMIN, VIEWER) end-to-end

### 4.4 Environment Configuration
- [ ] Create `.env.example` with all required variables (without secrets)
- [ ] Document environment variable requirements
- [ ] Set up proper secret management for production credentials
- [ ] Remove hardcoded dev credentials from `.env.local` before deploy

### 4.5 Documentation
- [ ] API documentation for all `/api/*` routes
- [ ] Architecture overview (system diagram, data flow)
- [ ] Development setup guide (local dev, database seeding, prerequisites)
- [ ] Deployment guide (environment setup, database migration, IAP config)
- [ ] CMS admin user guide (how to manage teams, content, users)

### 4.6 PWA / Service Worker
> **File:** `next.config.ts:46-50`

- [ ] Validate `@serwist/next` service worker configuration
- [ ] Test offline behavior and caching strategy
- [ ] Verify manifest and icons for installability
- [ ] Configure production caching strategy (currently disabled outside dev)

### 4.7 Database
- [ ] Review Prisma migrations for production readiness
- [ ] Set up database backup strategy
- [ ] Add database health monitoring
- [ ] Configure connection pooling for production load

---

## Phase 5 — Security Hardening

Priority: **P0-P2 mixed** | 17 findings from codebase audit. Items marked with severity.

### 5.1 [CRITICAL] Hardcoded Secrets in Repository
> **File:** `.env.local` (lines 1-8)

The following secrets are committed to git and visible in repo history:
- `GEMINI_API_KEY=AIzaSy...` (line 1)
- `DATABASE_URL="postgresql://coe_admin:dev_password@..."` (line 8)
- `ADMIN_PASSWORD=oct-cms-2026`

- [ ] Rotate the Gemini API key immediately
- [ ] Change the database password
- [ ] Add `.env.local` to `.gitignore` (verify it's not already tracked)
- [ ] Scrub secrets from git history using `git filter-repo` or BFG Repo-Cleaner
- [ ] Set up a secrets manager (GCP Secret Manager, Vault, or similar) for production

### 5.2 [CRITICAL] MSSQL Connection Unencrypted — FIXED
> **File:** `lib/mssql.ts` (lines 18-19)

- [x] Set `encrypt: true` in MSSQL connection config (defaults to `true`, override via `MSSQL_ENCRYPT=false`)
- [x] Set `trustServerCertificate: false` (defaults to `false`, override via `MSSQL_TRUST_CERT=true` for self-signed certs)
- [ ] Verify MSSQL server supports TLS and has a valid certificate

### 5.3 [HIGH] No Brute Force Protection on Admin Login — FIXED
> **File:** `middleware.ts`

- [x] Extend rate limiter in `middleware.ts` to cover `/api/admin-login` (5 attempts/60s)
- [x] Added `/api/admin-login` to middleware matcher config
- [ ] Log all login attempts (successful and failed) to the audit trail
- [ ] Consider adding CAPTCHA after repeated failures

### 5.4 [HIGH] IP Spoofing in Rate Limiter — FIXED
> **File:** `middleware.ts`

- [x] New `getClientIp()` helper prefers `x-real-ip` (set by GCP LB/IAP), falls back to last `x-forwarded-for` entry
- [x] Rate limiter keys namespaced per endpoint (`login:`, `chat:`) to prevent cross-pollution
- [x] Stale entry cleanup when map exceeds 10,000 entries (prevents memory leak)

### 5.5 [HIGH] Insecure Admin Session Cookie — FIXED
> **Files:** `app/api/admin-login/route.ts`, `middleware.ts`

- [x] Set `secure: true` on admin session cookie (in production)
- [x] Changed `sameSite` from `'lax'` to `'strict'`
- [x] Reduced `maxAge` from 30 days to 8 hours
- [x] Token now includes time-slot salt (rotates every 8h); middleware accepts current + previous slot to avoid edge-case lockouts

### 5.6 [HIGH] Missing Security Headers — FIXED
> **File:** `next.config.ts`

Added global `/:path*` header block with all standard security headers:

- [x] `Content-Security-Policy` (script-src, style-src, img-src, connect-src, frame-ancestors)
- [x] `X-Frame-Options: DENY`
- [x] `X-Content-Type-Options: nosniff`
- [x] `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- [x] `Referrer-Policy: strict-origin-when-cross-origin`
- [x] `Permissions-Policy` (camera, microphone, geolocation disabled)

> **Note:** CSP uses `'unsafe-inline'` and `'unsafe-eval'` for scripts (required by Next.js). Can be tightened with nonces later.

### 5.7 [MEDIUM] No CSRF Protection on Mutation Endpoints — MITIGATED
> **Files:** `app/api/admin-login/route.ts`, `app/api/cms/*/route.ts`

Existing protections: `sameSite: 'strict'` cookie (prevents cross-site requests), CORS restricts origin to `oct.edmonton.ca`, auth middleware requires valid session. Server Actions have built-in CSRF protection.

- [x] CSRF mitigated via `sameSite: 'strict'` + CORS origin restriction + auth middleware
- [ ] Consider adding explicit Origin header check as defense-in-depth for API routes

### 5.8 [MEDIUM] Data Exposure in Error Messages — FIXED
> **File:** `app/api/data-portal/health/route.ts`

- [x] Removed `MSSQL_DATABASE` and `MSSQL_SERVER` from success and error responses
- [x] Error messages sanitized — generic status returned to clients, details logged server-side
- [ ] Audit remaining API routes for information leakage in error responses

### 5.9 [MEDIUM] XSS Risk in AI-Generated Content — VERIFIED SAFE
> **File:** `components/vendor-dashboard/AIInsights.tsx`

- [x] DOMPurify is used consistently — only 1 `dangerouslySetInnerHTML` in codebase, already sanitized
- [x] CSP header added in 5.6 fix (includes `frame-ancestors 'none'`)
- [x] Audit complete — no additional XSS surface found

### 5.10 [MEDIUM] Missing Audit Trail for Security Events — PARTIALLY FIXED
> **Files:** `app/api/admin-login/route.ts`, `prisma/schema.prisma`

- [x] Login success and failure events now logged via structured logger (IP included)
- [x] Added `ipAddress` and `userAgent` fields to `AuditLog` Prisma model
- [ ] Add before/after values to audit log entries for data changes
- [ ] Log unauthorized access attempts (403 responses)

### 5.11 [MEDIUM] Credential Rotation Plan
- [ ] Document all API keys and credentials that need periodic rotation
- [ ] Set up rotation schedule (quarterly minimum for API keys)
- [ ] Automate credential rotation where possible
- [ ] Create incident response plan for compromised credentials

---

## Phase 6 — Performance Optimization

Priority: **P2** | 10 findings from codebase audit.

### 6.1 [HIGH] Memory Leak in Rate Limiter — FIXED
> **File:** `middleware.ts`

Fixed in the Phase 5 security fixes (rate limiter overhaul).

- [x] TTL-based cleanup for stale entries (prunes when map exceeds 10k)
- [x] Maximum size cap on rate limit map (10,000 entries)
- [ ] Consider using an external store (Redis) for distributed rate limiting in production

### 6.2 [HIGH] Missing Database Indexes — FIXED
> **File:** `prisma/schema.prisma`

- [x] Added `@@index([userId])` on AuditLog, plus `@@index([entity])` and `@@index([createdAt])`
- [x] Added `@@index([teamId])` on TeamPermission, Portfolio, TeamTab, TrelloBoard, TeamMember, AccordionGroup, ServiceArea, TeamService, TeamInitiative, TeamContact, TeamQuickLink
- [x] Added `@@index([parentId])` on Team model
- [x] `slug` already has `@unique` (which creates an index)
- [ ] Run `npx prisma migrate dev --name add-indexes` to apply
- [ ] Run `EXPLAIN ANALYZE` on common queries to verify index usage

### 6.3 [MEDIUM] No Client-Side Code Splitting
> 16 pages/components use `"use client"` directive, all loaded as full bundles.

- [ ] Audit which `"use client"` components can use `next/dynamic` with `ssr: false`
- [ ] Add dynamic imports for heavy components (Recharts charts, React Flow diagrams, chat window)
- [ ] Implement route-based code splitting for dashboard pages
- [ ] Use `React.lazy()` for modal components that aren't immediately visible
- [ ] Measure bundle sizes with `@next/bundle-analyzer` before and after

### 6.4 [MEDIUM] MSSQL Connection Pool Tuning — FIXED
> **File:** `lib/mssql.ts`

- [x] Set `min: 2` to maintain warm connections
- [x] Added `connectionTimeout: 15000` (15s) and `requestTimeout: 30000` (30s)
- [ ] Add connection pool monitoring (log pool size, wait times)

### 6.5 [MEDIUM] Missing Cache Headers on API Routes — FIXED
> **Files:** `app/api/cms/teams/route.ts`, `app/api/cms/users/route.ts`, `app/api/cms/audit-log/route.ts`

- [x] Teams: `Cache-Control: private, max-age=30`
- [x] Users: `Cache-Control: private, no-store` (sensitive data)
- [x] Audit log: `Cache-Control: private, max-age=10`

### 6.6 [MEDIUM] Inconsistent Data Revalidation — FIXED
> **Files:** `app/api/data-portal/incidents/route.ts`, `app/api/data-portal/budget-actuals/route.ts`, `app/api/data-portal/service-health/route.ts`

- [x] Documented revalidation strategy in route comments (service-health: 1 min near-real-time; incidents/budget: 5 min analytical)
- [ ] Consider using ISR (Incremental Static Regeneration) for dashboard pages

### 6.7 [MEDIUM] Image Optimization Gaps
> **File:** `next.config.ts` (lines 9-18)

Only `placehold.co` is configured as a remote image pattern. AVIF + WebP formats are enabled.

- [ ] Add all external image domains used by the site to `remotePatterns`
- [ ] Verify all images use `next/image` component (not raw `<img>` tags)
- [ ] Add `priority` prop to above-the-fold images
- [ ] Set appropriate `sizes` attribute for responsive images
- [ ] Audit for oversized images served without optimization

### 6.8 [LOW] Service Worker Not Production-Configured
> **File:** `next.config.ts` (lines 46-50)

```typescript
disable: process.env.NODE_ENV === "development"
```

Service worker only active in non-development, but no production caching strategy defined.

- [ ] Define cache-first strategy for static assets (CSS, JS, fonts)
- [ ] Define network-first strategy for API data
- [ ] Add offline fallback page
- [ ] Test service worker registration and update lifecycle

### 6.9 [LOW] Lighthouse Performance Audit
- [ ] Run Lighthouse CI on all major pages
- [ ] Target scores: Performance > 90, Accessibility > 90, Best Practices > 90
- [ ] Address Largest Contentful Paint (LCP) issues
- [ ] Address Cumulative Layout Shift (CLS) issues
- [ ] Minimize Total Blocking Time (TBT)

### 6.10 [LOW] Data Fetching Strategy Review
- [ ] Audit which pages should be SSR vs SSG vs ISR vs client-side
- [ ] Move static content pages to SSG where possible
- [ ] Use ISR for semi-dynamic content (team pages, service areas)
- [ ] Keep real-time dashboards as client-side with SWR/polling
- [ ] Add loading skeletons for all client-side data fetching

---

## Phase 7 — Enterprise Best Practices

Priority: **P2** | 12 findings from codebase audit.

### 7.1 [HIGH] Structured Logging — FIXED
> **File:** `lib/logger.ts`

- [x] Replaced with structured logger (JSON output in production, pretty console in dev)
- [x] Log levels: DEBUG, INFO, WARN, ERROR (DEBUG suppressed in production)
- [x] Sensitive field sanitization (password, token, apiKey, secret auto-redacted)
- [x] GCP Cloud Logging compatible (reads severity from JSON `severity` field)
- [ ] Add correlation/request IDs for tracing across API calls
- [ ] Migrate all `console.log`/`console.error` calls to use `logger`

### 7.2 [HIGH] Error Boundaries — FIXED
> **Files:** `app/error.tsx`, `app/admin/error.tsx`, `app/not-found.tsx` (already existed)

- [x] Added `app/error.tsx` — global error boundary with retry button and home link
- [x] Added `app/admin/error.tsx` — admin-specific error boundary
- [x] `app/not-found.tsx` already existed with full design
- [x] Error UI includes "Try Again" action
- [ ] Add error boundaries for individual dashboard pages
- [ ] Log caught errors to structured logging system

### 7.3 [HIGH] Environment Variable Validation — FIXED
> **File:** `lib/env.ts`

- [x] Created `lib/env.ts` with Zod schema validating all environment variables
- [x] Logs validation errors at startup (non-crashing to allow builds without all vars)
- [x] Typed `Env` export for TypeScript safety
- [x] Required vs optional variables distinguished
- [x] Format validation (URLs, email, port numbers, enum values)
- [ ] Incrementally migrate `process.env` references to import from `lib/env.ts`

### 7.4 [HIGH] Feature Flags — FIXED
> **File:** `lib/feature-flags.ts`

- [x] Created `lib/feature-flags.ts` — simple env-var based flags (`FF_ROADMAP_EDITING`, `FF_DATA_PORTAL`, `FF_VENDOR_DASHBOARD`)
- [x] Flag definitions added to `lib/env.ts` validation schema
- [ ] Gate incomplete features behind flags (roadmap RBAC, project editing)
- [ ] Document all feature flags and their purpose

### 7.5 [MEDIUM] Health Check Endpoints — FIXED
> **File:** `app/api/health/route.ts`

- [x] Added PostgreSQL connectivity check (Prisma `SELECT 1`)
- [x] Added MSSQL connectivity check (pool connection + `SELECT 1` with timeout)
- [ ] Add Gemini API availability check
- [ ] Add Service Health API (Uptrends) availability check
- [x] Return detailed status per dependency (healthy/degraded/error)
- [ ] Add `/api/health/ready` endpoint for Kubernetes/load balancer readiness probes
- [ ] Add `/api/health/live` endpoint for liveness probes

### 7.6 [MEDIUM] Graceful Degradation & Circuit Breakers — PARTIAL
> **File:** `app/api/chat/route.ts`

- [x] Implemented circuit breaker for Gemini API (3 failures → 1 min cooldown)
- [x] Added fallback response when Gemini circuit is open ("AI assistant is temporarily unavailable")
- [ ] Implement circuit breaker for MSSQL, Google Sheets, Uptrends
- [ ] Cache last-known-good data for dashboards when source is unreachable
- [ ] Add service status indicators in the UI (e.g., "Data as of 5 minutes ago")
- [x] Set reasonable timeouts on MSSQL calls (15s connect, 30s request in `lib/mssql.ts`)

### 7.7 [MEDIUM] Enhanced Audit Logging
> **File:** `prisma/schema.prisma` (lines 42-52)

The `AuditLog` model has `changes: Json?` (optional) with no before/after tracking and no failed operation logging.

- [ ] Make `changes` field required and structured: `{ before: {...}, after: {...} }`
- [ ] Log failed operations (unauthorized attempts, validation failures)
- [x] Added `ipAddress` and `userAgent` fields to `AuditLog` model (in Prisma schema)
- [ ] Add retention policy for audit logs (e.g., 1 year)
- [ ] Add audit log export capability for compliance

### 7.8 [MEDIUM] ESLint Configuration
> **File:** `eslint.config.mjs`

Only uses Next.js default configs. No custom rules for production quality.

- [x] Added `no-console` rule (warn level, allows `console.warn` and `console.error`)
- [ ] Add security-focused ESLint plugin (`eslint-plugin-security`)
- [ ] Add import sorting rules (`eslint-plugin-import`)
- [ ] Add accessibility rules (`eslint-plugin-jsx-a11y`) — if not already via Next.js config
- [ ] Add Prettier integration for consistent formatting

### 7.9 [MEDIUM] API Design Standards
- [ ] Add API versioning (`/api/v1/...`) for public-facing endpoints
- [ ] Standardize error response format: `{ error: string, code: string, details?: object }`
- [ ] Use consistent HTTP status codes (400 for validation, 401 for auth, 403 for authorization, 404 for not found, 500 for server errors)
- [ ] Add request/response type definitions shared between client and server
- [ ] Document all API endpoints with request/response schemas

### 7.10 [LOW] TypeScript Strictness
> **File:** `tsconfig.json`

`strict: true` is enabled (good), but target was ES2017 (old) and additional strict options are available.

- [x] Updated target from `ES2017` to `ES2022`
- [ ] Enable `noUncheckedIndexedAccess: true` (causes cascading errors — defer to dedicated PR)
- [ ] Enable `exactOptionalPropertyTypes: true` (causes cascading errors in Next.js — defer)

### 7.11 [LOW] Database Migration Strategy
- [ ] Document Prisma migration workflow for the team
- [ ] Set up migration CI check (ensure schema and migrations are in sync)
- [ ] Create seed data strategy for staging/production environments
- [ ] Add migration rollback procedures

### 7.12 [LOW] Incident Response Plan
- [ ] Document security incident response procedures
- [ ] Define escalation paths for different severity levels
- [ ] Create runbook for common operational issues (database down, API key compromised, etc.)
- [ ] Set up alerting for critical failures

---

## Phase 8 — Polish & Accessibility

Priority: **P3** | Final quality pass before full launch.

### 8.1 Remove Development Artifacts
- [ ] Remove all "SAMPLE DATA ONLY - NOT LIVE" warning banners (after Phase 1)
- [ ] Remove `DevelopmentDisclaimer` component usage where no longer needed
- [ ] Clean up debug files (`debug-drive-output.txt`, `iap-log.txt`)
- [ ] Remove dev bypass auth mode for production builds

### 8.2 UI/UX Audit
- [ ] Fix all disabled/non-functional buttons and form elements
- [ ] Audit `TransactionForm.tsx` disabled input field
- [ ] Enable commented-out roadmap features (RBAC, project editing) via feature flags
- [ ] Ensure consistent styling across all pages

### 8.3 Search Completeness
- [ ] Verify all pages are indexed in the search content index (`app/search/page.tsx`)
- [ ] Add newly created pages (NIC sub-pages, How OCT Works) to search index
- [ ] Test search results accuracy and relevance

### 8.4 Accessibility (WCAG 2.1 AA)
- [ ] Screen reader compatibility audit (NVDA, VoiceOver)
- [ ] Keyboard navigation testing (all interactive elements reachable via Tab)
- [ ] Color contrast verification (4.5:1 minimum for normal text)
- [ ] ARIA labels on all interactive elements (buttons, links, form fields)
- [ ] Focus management for modals and dynamic content
- [ ] Alt text on all images
- [ ] Proper heading hierarchy (h1 > h2 > h3, no skipped levels)
- [ ] Form labels associated with inputs

### 8.5 Mobile Responsiveness
- [ ] Test all pages at 320px, 375px, 768px, 1024px breakpoints
- [ ] Fix layout issues on tablets and phones
- [ ] Verify touch interactions on dashboards and charts
- [ ] Test navigation/menu behavior on small screens
- [ ] Ensure tables are horizontally scrollable on mobile

---

## Page Status Reference

| Page | Status | Data Source | Blocker |
|------|--------|-------------|---------|
| `/` (Home) | Complete | Static | — |
| `/about` | Complete | Static | — |
| `/about/how-oct-works` | Mostly Complete | React Flow | Finish network map |
| `/services` | Complete | Static | — |
| `/contact` | Complete | Static | — |
| `/leadership` | Complete | Static | Verify current |
| `/org-chart` | Complete | Static | Verify current |
| `/search` | Complete | Static index | Verify completeness |
| `/dashboards` | Complete | Links | — |
| `/technology-planning` | Complete | Static/CMS | Move to CMS |
| `/business-solutions` | Complete | Static/CMS | Move to CMS |
| `/integrated-technology-solutions` | Complete | Static/CMS | Move to CMS |
| `/project-management-office` | Complete | Static | Fix placeholder links |
| `/corporate-information-security` | Complete | Static/CMS | Move to CMS |
| `/data-technology` | Complete | DB + Fallback | Remove fallback |
| `/partner-experience` | Complete | DB + Fallback | Remove fallback |
| `/service-delivery` | Complete | DB + Fallback | Placeholder team names |
| `/technology-infrastructure-operations` | Complete | DB + Fallback | Remove fallback |
| `/cio-dashboard` | **Sample Data** | Hardcoded | Connect MSSQL |
| `/people-management` | **Sample Data** | Hardcoded | Identify data source |
| `/incident-management` | **Sample Data** | Random gen | Connect MSSQL |
| `/asset-management` | **Sample Data** | Hardcoded | Identify data source |
| `/vendor-command-center` | **Sample Data** | Mock vendors | Connect real source |
| `/budget/*` (4 pages) | Partial | Google Sheets | Harden connection |
| `/service-health` | **Live** | Uptrends API | — |
| `/service-health/dashboard` | **Live** | Uptrends API | — |
| `/resources/nic` | Complete | Static | — |
| `/resources/nic/carrier-services` | **Stub** | — | Needs build-out |
| `/resources/nic/fibre-routes` | **Stub** | — | Needs build-out |
| `/resources/nic/quick-links` | **Stub** | — | Needs build-out |
| `/resources/nic/team-contacts` | **Stub** | — | Needs build-out |
| `/resources/nic/wireless-towers` | **Stub** | — | Needs build-out |
| `/policies` | Complete | Static | — |
| `/links` | Complete | Static | Fix `href="#"` |
| `/roadmap` | Complete | Sample data | Update with real projects |
| `/technology-strategies` | Complete | Static | — |
| `/branch-templates` | Complete | Static | — |
| `/ai-resources` | Complete | Static | — |
| `/resources/app-library` | Complete | Static | — |
| `/oct-assistant` | Complete | Gemini API | — |
| `/admin` | Complete | PostgreSQL | — |
| `/login` | Complete | Password auth | Move to IAP |

---

## Findings Summary

| Category | Critical | High | Medium | Low | Total | Fixed |
|----------|----------|------|--------|-----|-------|-------|
| Security | ~~2~~ 1 | ~~4~~ 0 | ~~4~~ 0 | — | 10 | **9** |
| Performance | — | ~~2~~ 0 | ~~5~~ 2 | 3 | 10 | **5** |
| Enterprise | — | ~~4~~ 0 | ~~4~~ 1 | 4 | 12 | **7** |
| **Total** | **1** | **0** | **3** | **7** | **32** | **21** |

## Quick Stats

| Metric | Count |
|--------|-------|
| Total pages | ~45 |
| Fully complete | ~30 |
| Sample/mock data | 5 dashboards |
| Stub pages | 5 |
| Placeholder links | ~10+ |
| Test files | 0 |
| API routes | 12 |
| Prisma models | 19+ |
| Security findings | 10 (9 fixed) |
| Performance findings | 10 (5 fixed) |
| Enterprise gaps | 12 (7 fixed) |
