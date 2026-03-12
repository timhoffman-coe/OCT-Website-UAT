# OCT-Web-Dev

## Foundation

### Application Setup
- [x] Next.js 16 application with App Router
- [x] React 19 with TypeScript
- [x] PostgreSQL database with Prisma ORM
- [x] Docker containerization (app, postgres, nginx)
- [x] Tailwind CSS styling

### Authentication & Access Control
- [x] Google Cloud IAP authentication integration
- [x] Role-based access control (SUPER_ADMIN, TEAM_ADMIN, VIEWER)
- [x] Password fallback auth disabled in production
- [x] Rate-limited admin login endpoint
- [x] Secure session cookies (strict sameSite, 8hr maxAge)

### CMS & Admin Panel
- [x] Admin dashboard with team hierarchy
- [x] Full CRUD for teams, users, widgets, service areas
- [x] Team page editor with SECTION, ITS_TEAM, SUB_TEAM templates
- [x] Widget-based layout system with drag-and-drop reordering
- [x] Reusable widgets across all page tiers
- [x] User management interface
- [x] Audit logging system
- [x] Roadmap editor permissions management
- [x] OCT-Web-Dev viewer permissions management

### Pages & Content
- [x] All 5 section landing pages (Tech Planning, Business Solutions, ITS, PMO, CIS)
- [x] ITS sub-team pages (Data Tech, Partner Exp, Service Delivery, Tech Infra Ops)
- [x] Home, About, Services, Contact, Leadership, Org Chart pages
- [x] Search page with content index
- [x] Links, Policies, Technology Strategies pages
- [x] AI Resources and Branch Templates pages
- [x] NIC landing page with sub-page stubs
- [x] How OCT Works interactive architecture diagram (React Flow)
- [x] Dynamic team/sub-team slug routes

### Dashboards
- [x] CIO Executive Dashboard (sample data)
- [x] Service Health monitoring (live Uptrends API)
- [x] Budget & Financial tracking (Google Sheets CSV)
- [x] People Management dashboard (sample data)
- [x] Incident Management dashboard (sample data)
- [x] Asset Management dashboard (sample data)
- [x] Vendor Command Center (mock data)
- [x] "NOT LIVE" disclaimer banners on sample data pages

### Technology Roadmap
- [x] Interactive Gantt-chart roadmap view
- [x] Quarterly and 4-year view modes
- [x] Roadmap editor permissions

### AI Assistant
- [x] Gemini-powered OCT Assistant
- [x] Google Drive document context integration
- [x] Circuit breaker for API failures

### Security Hardening
- [x] Security headers (CSP, HSTS, X-Frame-Options, etc.)
- [x] IP spoofing protection in rate limiter
- [x] MSSQL connection encryption enabled
- [x] Brute force protection on admin login
- [x] Error message sanitization
- [x] XSS protection with DOMPurify
- [x] CSRF mitigation via sameSite strict + CORS
- [x] Login events logged with IP and user agent

### Performance & Infrastructure
- [x] Structured logging (JSON in prod, GCP compatible)
- [x] Error boundaries (global + admin)
- [x] Environment variable validation with Zod
- [x] Feature flags system
- [x] Health check endpoint (Postgres + MSSQL)
- [x] Database indexes on key tables
- [x] MSSQL connection pool tuning
- [x] Cache headers on API routes
- [x] TypeScript strict mode, ES2022 target

## Connect Dashboards to Real Data Sources

### Configure MSSQL Data Portal Connection
- [ ] Set real credentials for MSSQL connection
- [ ] Verify connectivity via /api/data-portal/health endpoint
- [ ] Test NTLM authentication against on-prem SQL Server
- [ ] Enable encryption on MSSQL connection

### CIO Executive Dashboard
- [ ] Replace hardcoded sample data with live MSSQL queries
- [ ] Wire up incident trend charts
- [ ] Wire up budget metrics
- [ ] Wire up service health summary
- [ ] Remove "SAMPLE DATA ONLY - NOT LIVE" banner

### People Management Dashboard
- [ ] Identify real data source for HR data
- [ ] Create API route for people/HR metrics
- [ ] Replace hardcoded sample arrays with live data
- [ ] Remove "SAMPLE DATA ONLY - NOT LIVE" banner

### Incident Management Dashboard
- [ ] Connect to MSSQL IncidentMetrics table
- [ ] Replace randomly generated data with real incident data
- [ ] Add date range filtering

### Asset Management Dashboard
- [ ] Identify real data source for IT asset inventory
- [ ] Create API route for asset data
- [ ] Replace hardcoded financial metrics with live data
- [ ] Build out full asset tracking UI

### Vendor Command Center
- [ ] Connect to real vendor data source
- [ ] Replace MOCK_VENDORS with live data fetching
- [ ] Verify Google Sheets integration works in production
- [ ] Ensure AI Insights panel has real data

### Budget Dashboard Hardening
- [ ] Verify Google Sheets CSV endpoint works reliably in production
- [ ] Add proper error handling when Sheets are unavailable
- [ ] Consider migrating budget data to MSSQL for reliability

## Complete Stub & Incomplete Pages

### NIC Sub-Pages
- [ ] Carrier Services
- [ ] Fibre Routes
- [ ] Quick Links
- [ ] Team Contacts
- [ ] Wireless Towers

### How OCT Works — Network Architecture Map
- [ ] Complete the network map with any missing infrastructure zones
- [ ] Add additional drill-down sub-diagrams for zones without them
- [ ] Verify all service nodes reflect current infrastructure
- [ ] Add labels/descriptions to edges showing protocol/connection types

### Fix Placeholder Links
- [ ] Audit /links page — replace all href="#" with real URLs
- [ ] Audit /project-management-office page — replace placeholder resource links
- [ ] Audit all other pages for remaining href="#" placeholders

### Service Delivery Content
- [ ] Replace fallback data with real team member names, emails, and roles
- [ ] Populate Service Management Office, Monitoring & Analytics, and Digital Workplace Catalog

## Team Pages & CMS Content Population

### Section Pages
- [ ] Technology Planning — 4 service areas
- [ ] Business Solutions — 6 service areas
- [ ] Integrated Technology Solutions — 5 service areas
- [ ] Project Management Office — 3 service areas
- [ ] Corporate Information Security — 6 service areas

### ITS Sub-Team Pages
- [ ] Data Technology
- [ ] Partner Experience
- [ ] Service Delivery
- [ ] Technology Infrastructure Operations

### Team Member Directories
- [ ] Populate team members for all 5 sections via CMS admin
- [ ] Verify leadership page reflects current org structure
- [ ] Update org chart with complete team hierarchy

### Dynamic Team Routes
- [ ] Verify [teamSlug] renders correctly for all team slugs
- [ ] Verify [teamSlug]/[subTeamSlug] renders for all sub-teams
- [ ] Add proper 404 handling for invalid slugs

### Content Completeness
- [ ] Service area descriptions are accurate and complete
- [ ] Team contacts populated with real names and emails
- [ ] Quick links point to real resources
- [ ] Initiatives/projects are current
- [ ] Trello board links are active

## Infrastructure, Testing & DevOps

### Test Suite
- [ ] Set up testing framework (Jest + React Testing Library or Vitest)
- [ ] Unit tests for utility functions
- [ ] Unit tests for API routes
- [ ] Component tests for key dashboard components
- [ ] Integration tests for CMS CRUD operations
- [ ] E2E tests for critical user flows

### CI/CD Pipeline
- [ ] Set up GitHub Actions for linting
- [ ] Add type checking step
- [ ] Add unit/integration test step
- [ ] Add build verification step
- [ ] Configure deployment pipeline

### Production Authentication
- [x] Configure Google Cloud IAP for production
- [x] Disable password-based fallback auth in production
- [ ] Verify IAP JWT verification with production JWKS endpoint
- [ ] Test RBAC flows end-to-end

### Environment Configuration
- [ ] Create .env.example with all required variables
- [ ] Document environment variable requirements
- [ ] Set up proper secret management for production
- [ ] Remove hardcoded dev credentials before deploy

### Documentation
- [ ] API documentation for all /api/* routes
- [ ] Architecture overview
- [ ] Development setup guide
- [ ] Deployment guide
- [ ] CMS admin user guide

### PWA / Service Worker
- [ ] Validate Serwist service worker configuration
- [ ] Test offline behavior and caching strategy
- [ ] Verify manifest and icons for installability
- [ ] Configure production caching strategy

### Database
- [ ] Review Prisma migrations for production readiness
- [ ] Set up database backup strategy
- [ ] Add database health monitoring
- [ ] Configure connection pooling for production load

## Security Hardening

### Hardcoded Secrets in Repository [CRITICAL]
- [ ] Rotate the Gemini API key
- [ ] Change the database password
- [ ] Add .env.local to .gitignore
- [ ] Scrub secrets from git history
- [ ] Set up a secrets manager for production

### MSSQL Connection Encryption
- [x] Set encrypt: true in MSSQL connection config
- [x] Set trustServerCertificate: false
- [ ] Verify MSSQL server supports TLS with valid certificate

### Brute Force Protection on Admin Login
- [x] Rate limiter covers /api/admin-login
- [x] Added /api/admin-login to middleware matcher
- [ ] Log all login attempts to audit trail
- [ ] Consider adding CAPTCHA after repeated failures

### IP Spoofing in Rate Limiter
- [x] getClientIp() prefers x-real-ip, falls back to last x-forwarded-for
- [x] Rate limiter keys namespaced per endpoint
- [x] Stale entry cleanup when map exceeds 10,000 entries

### Insecure Admin Session Cookie
- [x] Set secure: true on admin session cookie in production
- [x] Changed sameSite to strict
- [x] Reduced maxAge to 8 hours
- [x] Token includes time-slot salt

### Missing Security Headers
- [x] Content-Security-Policy
- [x] X-Frame-Options: DENY
- [x] X-Content-Type-Options: nosniff
- [x] Strict-Transport-Security
- [x] Referrer-Policy
- [x] Permissions-Policy

### CSRF Protection
- [x] Mitigated via sameSite strict + CORS + auth middleware
- [ ] Add explicit Origin header check as defense-in-depth

### Data Exposure in Error Messages
- [x] Removed sensitive info from API responses
- [x] Error messages sanitized
- [ ] Audit remaining API routes for information leakage

### XSS Risk in AI-Generated Content
- [x] DOMPurify used consistently
- [x] CSP header added
- [x] Audit complete — no additional XSS surface found

### Audit Trail for Security Events
- [x] Login success and failure events logged
- [x] Added ipAddress and userAgent fields to AuditLog
- [ ] Add before/after values to audit log entries
- [ ] Log unauthorized access attempts

### Credential Rotation Plan
- [ ] Document all API keys and credentials needing rotation
- [ ] Set up rotation schedule
- [ ] Automate credential rotation where possible
- [ ] Create incident response plan for compromised credentials

## Performance Optimization

### Memory Leak in Rate Limiter
- [x] TTL-based cleanup for stale entries
- [x] Maximum size cap on rate limit map
- [ ] Consider using Redis for distributed rate limiting

### Missing Database Indexes
- [x] Added indexes on AuditLog, TeamPermission, Portfolio, and related models
- [x] Added index on Team parentId
- [ ] Run prisma migrate to apply indexes
- [ ] Run EXPLAIN ANALYZE on common queries

### Client-Side Code Splitting
- [ ] Audit use client components for dynamic import opportunities
- [ ] Add dynamic imports for heavy components (Recharts, React Flow, chat)
- [ ] Implement route-based code splitting for dashboards
- [ ] Use React.lazy() for modal components
- [ ] Measure bundle sizes with @next/bundle-analyzer

### MSSQL Connection Pool Tuning
- [x] Set min: 2 for warm connections
- [x] Added connectionTimeout and requestTimeout
- [ ] Add connection pool monitoring

### Cache Headers on API Routes
- [x] Teams: private, max-age=30
- [x] Users: private, no-store
- [x] Audit log: private, max-age=10

### Data Revalidation Strategy
- [x] Documented revalidation strategy in route comments
- [ ] Consider using ISR for dashboard pages

### Image Optimization
- [ ] Add all external image domains to remotePatterns
- [ ] Verify all images use next/image component
- [ ] Add priority prop to above-the-fold images
- [ ] Set appropriate sizes attribute for responsive images
- [ ] Audit for oversized images

### Service Worker Production Config
- [ ] Define cache-first strategy for static assets
- [ ] Define network-first strategy for API data
- [ ] Add offline fallback page
- [ ] Test service worker lifecycle

### Lighthouse Performance Audit
- [ ] Run Lighthouse CI on all major pages
- [ ] Target scores: Performance > 90, Accessibility > 90, Best Practices > 90
- [ ] Address LCP, CLS, and TBT issues

### Data Fetching Strategy Review
- [ ] Audit pages for SSR vs SSG vs ISR vs client-side
- [ ] Move static content pages to SSG
- [ ] Use ISR for semi-dynamic content
- [ ] Add loading skeletons for all client-side data fetching

## Enterprise Best Practices

### Structured Logging
- [x] Structured logger with JSON output in production
- [x] Log levels: DEBUG, INFO, WARN, ERROR
- [x] Sensitive field sanitization
- [x] GCP Cloud Logging compatible
- [ ] Add correlation/request IDs for tracing
- [ ] Migrate all console.log calls to use logger

### Error Boundaries
- [x] Global error boundary with retry button
- [x] Admin-specific error boundary
- [x] 404 page with full design
- [ ] Add error boundaries for individual dashboard pages
- [ ] Log caught errors to structured logging

### Environment Variable Validation
- [x] Zod schema validating all environment variables
- [x] Typed Env export for TypeScript safety
- [x] Required vs optional variables distinguished
- [ ] Migrate process.env references to import from lib/env.ts

### Feature Flags
- [x] Env-var based flags (FF_ROADMAP_EDITING, FF_DATA_PORTAL, FF_VENDOR_DASHBOARD)
- [x] Flag definitions in env.ts validation schema
- [ ] Gate incomplete features behind flags
- [ ] Document all feature flags

### Health Check Endpoints
- [x] PostgreSQL connectivity check
- [x] MSSQL connectivity check
- [ ] Add Gemini API availability check
- [ ] Add Uptrends API availability check
- [ ] Add /api/health/ready and /api/health/live endpoints

### Graceful Degradation & Circuit Breakers
- [x] Circuit breaker for Gemini API
- [x] Fallback response when circuit is open
- [x] Reasonable timeouts on MSSQL calls
- [ ] Implement circuit breaker for MSSQL, Google Sheets, Uptrends
- [ ] Cache last-known-good data for dashboards
- [ ] Add service status indicators in UI

### Enhanced Audit Logging
- [ ] Make changes field required with before/after structure
- [ ] Log failed operations
- [x] Added ipAddress and userAgent fields
- [ ] Add retention policy for audit logs
- [ ] Add audit log export capability

### ESLint Configuration
- [x] Added no-console rule
- [ ] Add eslint-plugin-security
- [ ] Add eslint-plugin-import for sorting
- [ ] Add eslint-plugin-jsx-a11y
- [ ] Add Prettier integration

### API Design Standards
- [ ] Add API versioning (/api/v1/...)
- [ ] Standardize error response format
- [ ] Use consistent HTTP status codes
- [ ] Add shared request/response type definitions
- [ ] Document all API endpoints

### TypeScript Strictness
- [x] Updated target from ES2017 to ES2022
- [ ] Enable noUncheckedIndexedAccess
- [ ] Enable exactOptionalPropertyTypes

### Database Migration Strategy
- [ ] Document Prisma migration workflow
- [ ] Set up migration CI check
- [ ] Create seed data strategy
- [ ] Add migration rollback procedures

### Incident Response Plan
- [ ] Document security incident response procedures
- [ ] Define escalation paths
- [ ] Create runbook for common operational issues
- [ ] Set up alerting for critical failures

## Polish & Accessibility

### Remove Development Artifacts
- [ ] Remove all "SAMPLE DATA ONLY" warning banners (after dashboards are live)
- [ ] Remove DevelopmentDisclaimer component where no longer needed
- [ ] Clean up debug files
- [ ] Remove dev bypass auth mode for production builds

### UI/UX Audit
- [ ] Fix all disabled/non-functional buttons and form elements
- [ ] Audit TransactionForm disabled input field
- [ ] Enable commented-out roadmap features via feature flags
- [ ] Ensure consistent styling across all pages

### Search Completeness
- [ ] Verify all pages are indexed in search content index
- [ ] Add newly created pages to search index
- [ ] Test search results accuracy and relevance

### Accessibility (WCAG 2.1 AA)
- [ ] Screen reader compatibility audit
- [ ] Keyboard navigation testing
- [ ] Color contrast verification (4.5:1 minimum)
- [ ] ARIA labels on all interactive elements
- [ ] Focus management for modals and dynamic content
- [ ] Alt text on all images
- [ ] Proper heading hierarchy
- [ ] Form labels associated with inputs

### Mobile Responsiveness
- [ ] Test all pages at 320px, 375px, 768px, 1024px breakpoints
- [ ] Fix layout issues on tablets and phones
- [ ] Verify touch interactions on dashboards and charts
- [ ] Test navigation/menu behavior on small screens
- [ ] Ensure tables are horizontally scrollable on mobile

## Upcoming Tasks

- [ ] Main page: Add "Learn more about OCT" and Key Initiatives Spotlight sections
- [ ] Technology Roadmap: Add user roles for add/edit permissions and conditional rendering
- [ ] Finish updating diagram on "How OCT Works" page
- [ ] Tie in OCT Org Chart
