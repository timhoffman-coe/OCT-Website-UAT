# Service Health Monitoring

The service health system provides a real-time dashboard of infrastructure and application status by integrating with an external Uptrends monitoring API.

## Architecture

```
Uptrends Monitoring
  │
  ▼
Service Health API (IAP-protected, external)
  │  Endpoints:
  │  - /api/uptrends/monitor-groups
  │  - /api/uptrends/monitor-groups/with-authorizations-grouped
  │  - /api/uptrends/GroupStatus?monitorGroupGuid=<guid>
  │
  ▼
IAP Client (lib/service-health/iap-client.ts)
  │  Acquires OIDC identity token via GCP service account
  │  10-second request timeout
  │
  ▼
Service Health Client (lib/service-health/service-health-client.ts)
  │  Fetches all groups, then status for each group in parallel
  │  Maps Uptrends status codes → normalized status
  │  In-memory cache (30-second TTL)
  │  Falls back to mock data on failure
  │
  ▼
API Routes (app/api/service-health/)
  │  GET /api/service-health        → Full dashboard data
  │  GET /api/service-health/groups → Monitor groups list
  │  GET /api/service-health/[groupId] → Single group status
  │
  ▼
Frontend Dashboard (app/service-health/)
```

## Status Mapping

Uptrends uses its own status codes. The client maps them to normalized statuses:

| Uptrends Status | Normalized Status | Meaning |
|-----------------|-------------------|---------|
| `Ok` | `operational` | Functioning normally |
| `Warning` | `degraded` | Performance issues |
| `Unconfirmed` | `degraded` | Potential issue being verified |
| `Error` | `outage` | Currently offline |
| `Maintenance` | `maintenance` | Scheduled maintenance |
| `NoData` | `unknown` | No monitoring data available |

### Overall Status Derivation

The overall dashboard status is derived from all groups using this priority:
1. If **any** group has `outage` → overall is `outage`
2. If **any** group has `degraded` → overall is `degraded`
3. If **any** group has `maintenance` → overall is `maintenance`
4. If **all** groups are `operational` → overall is `operational`
5. Otherwise → `degraded`

## Caching

The service health client uses a simple in-memory cache (single Node.js process):

- **TTL**: 30 seconds (configured in `constants.ts` as `CACHE_TTL_SECONDS`)
- Cached data is returned with `isFromCache: true`
- Cache is refreshed on the next request after TTL expires

API routes add their own `Cache-Control` headers:
- `/api/service-health` — `public, max-age=30, stale-while-revalidate=60`
- `/api/service-health/groups` — `public, max-age=300, stale-while-revalidate=600`
- `/api/service-health/[groupId]` — `public, max-age=30, stale-while-revalidate=60`

## Mock Fallback

If the external API is unreachable, the client returns mock data (`MOCK_DASHBOARD_DATA` in `constants.ts`) showing all services as operational. This prevents the dashboard from showing errors when the monitoring API is temporarily unavailable. Mock data includes 9 service groups: CISO, Citizen Services, Corporate Services, Financial Services, Fire Rescue, Network Services, POSSE, Enterprise Systems, and Transit Services.

## IAP Authentication

The external Service Health API is protected by Google Cloud IAP. To authenticate:

1. The `iap-client.ts` module creates a `GoogleAuth` instance
2. It requests an OIDC identity token targeted at `SERVICEHEALTH_IAP_CLIENT_ID`
3. The token is sent as a Bearer token in the request headers
4. In production, the GCE metadata server provides the service account credentials
5. In development, `GOOGLE_APPLICATION_CREDENTIALS` (service account JSON) is used

## Service Icon Mapping

Each service group name maps to a Lucide React icon for the dashboard UI (defined in `constants.ts`):

| Service | Icon |
|---------|------|
| CISO | Shield |
| Citizen Services | Users |
| Corporate Services | Briefcase |
| Financial Services | CreditCard |
| Fire Rescue | Flame |
| Network Services | Network |
| POSSE | FileText |
| Enterprise Systems | Database |
| Transit Services | Bus |

## Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `SERVICEHEALTH_API_BASE_URL` | Yes | Base URL of the Uptrends API service |
| `SERVICEHEALTH_IAP_CLIENT_ID` | Yes | IAP OAuth client ID for the API service |
| `GOOGLE_APPLICATION_CREDENTIALS` | Prod | Service account for IAP authentication |

Without these variables, all service health requests will fall back to mock data.

## Key Files

| File | Purpose |
|------|---------|
| `lib/service-health/types.ts` | TypeScript types for Uptrends API and normalized data |
| `lib/service-health/constants.ts` | API endpoints, cache TTL, icon map, mock data |
| `lib/service-health/iap-client.ts` | IAP-authenticated HTTP client |
| `lib/service-health/service-health-client.ts` | Main client: fetching, caching, status mapping |
| `app/api/service-health/route.ts` | Full dashboard data endpoint |
| `app/api/service-health/groups/route.ts` | Monitor groups list endpoint |
| `app/api/service-health/[groupId]/route.ts` | Single group status endpoint |
