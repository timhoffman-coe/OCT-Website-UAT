# Data Portal (MSSQL Integration)

The Data Portal provides financial and operational data from an on-premises SQL Server database. It powers budget, incident, and service health dashboards.

## Architecture

```
On-Prem SQL Server
  │  NTLM or SQL Server authentication
  │  Read-only queries
  │
  ▼
Connection Pool (lib/mssql.ts)
  │  Min: 2 connections, Max: 10
  │  Idle timeout: 30s
  │  Connection timeout: 15s
  │  Request timeout: 30s
  │  Global singleton (persists across requests)
  │
  ▼
Data Access Functions (lib/data/data-portal.ts)
  │  Parameterized queries (SQL injection safe)
  │  Typed results via generics
  │
  ▼
API Routes (app/api/data-portal/)
  │  GET /budget-actuals?year=2026
  │  GET /incidents?startDate=...&endDate=...
  │  GET /service-health
  │  GET /health
  │
  ▼
Frontend Dashboards
```

## Connection Configuration

The MSSQL connection (`lib/mssql.ts`) supports two authentication modes:

### NTLM Authentication (Windows domain)
When `MSSQL_DOMAIN` is set (or `MSSQL_USER` contains a backslash like `DOMAIN\user`):
- Authentication type: `ntlm`
- Domain is extracted automatically from either `MSSQL_DOMAIN` or the `MSSQL_USER` prefix

### SQL Server Authentication (default)
When no domain is configured:
- Authentication type: `default`
- Uses `MSSQL_USER` and `MSSQL_PASSWORD` directly

### Named Instances
If `MSSQL_SERVER` contains a backslash (e.g., `server\instance`):
- The server name and instance name are parsed automatically
- Port configuration is ignored (named instances use dynamic ports via SQL Server Browser)

### Connection Options

| Setting | Value | Notes |
|---------|-------|-------|
| Encryption | `true` (default) | TLS enabled unless `MSSQL_ENCRYPT=false` |
| Trust certificate | `false` (default) | Requires valid CA cert unless `MSSQL_TRUST_CERT=true` |
| Read-only intent | `true` | All connections are read-only |
| Pool min | 2 | Minimum connections maintained |
| Pool max | 10 | Maximum concurrent connections |
| Idle timeout | 30,000ms | Idle connections are released after 30s |
| Connection timeout | 15,000ms | Fails if connection not established in 15s |
| Request timeout | 30,000ms | Fails if query not completed in 30s |

## API Endpoints

### GET /api/data-portal/budget-actuals

Returns budget vs. actual financial data for a fiscal year.

| Parameter | Default | Validation |
|-----------|---------|------------|
| `year` | Current year | Must be 2000–2100 |

Revalidation: 300 seconds (5 minutes).

```json
{
  "data": [
    {
      "fiscalYear": 2026,
      "costCenter": "string",
      "program": "string",
      "category": "string",
      "approvedAmount": 0,
      "actualSpend": 0,
      "commitments": 0
    }
  ],
  "timestamp": "ISO timestamp",
  "rowCount": 0
}
```

### GET /api/data-portal/incidents

Returns incident metrics for a date range.

| Parameter | Default | Format |
|-----------|---------|--------|
| `startDate` | 30 days ago | YYYY-MM-DD |
| `endDate` | Today | YYYY-MM-DD |

Revalidation: 300 seconds (5 minutes).

```json
{
  "data": [
    {
      "date": "YYYY-MM-DD",
      "totalIncidents": 0,
      "resolvedIncidents": 0,
      "avgResolutionHours": 0,
      "category": "string",
      "priority": "string"
    }
  ],
  "timestamp": "ISO timestamp",
  "rowCount": 0
}
```

### GET /api/data-portal/service-health

Returns service health records from the MSSQL database (separate from the Uptrends-based `/api/service-health` endpoints).

Revalidation: 60 seconds (1 minute — needs freshest data).

```json
{
  "data": [
    {
      "serviceName": "string",
      "status": "string",
      "uptimePercent": 0,
      "lastChecked": "ISO timestamp",
      "responseTimeMs": 0
    }
  ],
  "timestamp": "ISO timestamp",
  "rowCount": 0
}
```

### GET /api/data-portal/health

Checks MSSQL connectivity with `SELECT 1 AS connected`. Returns 200 if connected, 503 on error. Error details are logged server-side only.

```json
{
  "status": "connected | error",
  "timestamp": "ISO timestamp"
}
```

## Feature Flag

The Data Portal is gated behind the `FF_DATA_PORTAL` feature flag (`lib/feature-flags.ts`). When disabled, Data Portal UI elements are hidden. The API endpoints remain accessible regardless of the flag.

## Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `MSSQL_SERVER` | Yes | SQL Server hostname (e.g., `server` or `server\instance`) |
| `MSSQL_DATABASE` | Yes | Database name |
| `MSSQL_PORT` | No | Port (default: 1433, ignored for named instances) |
| `MSSQL_DOMAIN` | No | Windows domain for NTLM auth |
| `MSSQL_USER` | Yes | Username (supports `DOMAIN\user` format) |
| `MSSQL_PASSWORD` | Yes | Password |
| `MSSQL_ENCRYPT` | No | TLS encryption (`true`/`false`, default: `true`) |
| `MSSQL_TRUST_CERT` | No | Trust self-signed certs (`true`/`false`, default: `false`) |
| `FF_DATA_PORTAL` | No | Feature flag to enable UI (`true`/`false`) |

## Troubleshooting

### Connection refused / timeout
- Verify the SQL Server hostname and port are reachable from the app container
- For named instances, ensure the SQL Server Browser service is running
- Check firewall rules allow traffic on port 1433 (or dynamic ports for named instances)

### NTLM authentication failures
- Verify the domain name is correct (case-sensitive on some configurations)
- Ensure the service account has read access to the target database
- If using `DOMAIN\user` format in `MSSQL_USER`, the domain will be extracted automatically — don't also set `MSSQL_DOMAIN`

### TLS/Certificate errors
- If the SQL Server uses a self-signed certificate, set `MSSQL_TRUST_CERT=true`
- To disable encryption entirely (not recommended), set `MSSQL_ENCRYPT=false`

### Health check fails but queries work
- The health check uses a new connection from the pool; check if the pool is exhausted (max 10 connections)
- Check request timeout — the health check uses the same 30s timeout as regular queries

## Key Files

| File | Purpose |
|------|---------|
| `lib/mssql.ts` | Connection pool setup, NTLM/default auth, named instance parsing |
| `lib/data/data-portal.ts` | Parameterized query functions (budget, incidents, service health) |
| `lib/data/data-portal-types.ts` | TypeScript types for query results |
| `app/api/data-portal/budget-actuals/route.ts` | Budget actuals endpoint |
| `app/api/data-portal/incidents/route.ts` | Incident metrics endpoint |
| `app/api/data-portal/service-health/route.ts` | MSSQL service health endpoint |
| `app/api/data-portal/health/route.ts` | MSSQL connectivity check |
