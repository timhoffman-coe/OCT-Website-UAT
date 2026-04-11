# Environment Variables Reference

All environment variables are validated at startup using a Zod schema in `lib/env.ts`. Only `DATABASE_URL` is required — all others are optional and enable specific features.

## Database

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | **Yes** | PostgreSQL connection string (e.g., `postgresql://user:pass@host:5432/db`) |

## Authentication

| Variable | Required | Description |
|----------|----------|-------------|
| `IAP_AUDIENCE` | Prod | Expected audience claim for IAP JWT verification |
| `DEV_BYPASS_IAP` | Dev | Set to `true` to skip IAP authentication in development |
| `DEV_USER_EMAIL` | Dev | Email address for the auto-authenticated dev user |
| `DEV_USER_NAME` | No | Display name for the dev user |
| `ADMIN_PASSWORD` | No | Optional password gate for shared dev servers (enables `/login` page) |
| `ADMIN_EMAIL` | No | Email associated with password login |

In **production**, Google Cloud IAP handles authentication. The app verifies the IAP JWT and extracts the user's email. No passwords or sessions are managed by the app.

In **development** with `DEV_BYPASS_IAP=true`, the request interceptor (`proxy.ts`) automatically sets the `x-user-email` header to `DEV_USER_EMAIL`. If `ADMIN_PASSWORD` is also set, users must enter the password at `/login` first.

## AI Assistant (Gemini)

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | No | Google Gemini API key for the AI chat assistant |

Without this key, the `/api/chat` endpoint will return an error. The AI assistant uses Gemini 2.5 Flash for intent classification and response generation.

## Google Cloud

| Variable | Required | Description |
|----------|----------|-------------|
| `GOOGLE_APPLICATION_CREDENTIALS` | Prod | Path to GCP service account JSON (set to `/tmp/service-account.json` in production by `entrypoint.js`) |
| `GCP_PROJECT_ID` | Prod | GCP project ID for Secret Manager (triggers secret fetching at startup) |
| `HR_POLICIES_FOLDER_ID` | No | Google Drive folder ID containing HR/CSU 52 policy documents |
| `SERVICE_DESK_FOLDER_ID` | No | Google Drive folder ID containing IT service desk documentation |

In production, `entrypoint.js` uses `GCP_PROJECT_ID` to fetch secrets from Google Secret Manager before starting the app. In development, these are set manually in `.env.local`.

## MSSQL Data Portal

| Variable | Required | Description |
|----------|----------|-------------|
| `MSSQL_SERVER` | No | SQL Server hostname (supports named instances: `server\instance`) |
| `MSSQL_DATABASE` | No | Database name |
| `MSSQL_PORT` | No | Port number (default: 1433, ignored when using named instances) |
| `MSSQL_DOMAIN` | No | Windows domain for NTLM authentication |
| `MSSQL_USER` | No | Username (supports `DOMAIN\user` format — domain is auto-extracted) |
| `MSSQL_PASSWORD` | No | Password |
| `MSSQL_ENCRYPT` | No | Enable TLS encryption (`true`/`false`, default: `true`) |
| `MSSQL_TRUST_CERT` | No | Trust self-signed certificates (`true`/`false`, default: `false`) |

These variables are only needed if you're working on Data Portal features (budget actuals, incidents, service health from MSSQL). The connection uses NTLM authentication when `MSSQL_DOMAIN` is set, otherwise falls back to SQL Server default auth. See the Data Portal document for details.

## Service Health

| Variable | Required | Description |
|----------|----------|-------------|
| `SERVICEHEALTH_API_BASE_URL` | No | Base URL for the Uptrends service health API (must be a valid URL) |
| `SERVICEHEALTH_IAP_CLIENT_ID` | No | IAP OAuth client ID for authenticating to the service health API |

Both are required for live service health data. Without them, the service health dashboard falls back to mock data. See the Service Health document for details.

## Feature Flags

| Variable | Required | Description |
|----------|----------|-------------|
| `FF_DATA_PORTAL` | No | Enable Data Portal features (`true`/`false`) |
| `FF_VENDOR_DASHBOARD` | No | Enable Vendor Dashboard features (`true`/`false`) |

Feature flags are consumed in `lib/feature-flags.ts` and default to `false` when not set. `FF_ROADMAP_EDITING` is defined in the Zod schema but not currently consumed by the feature flags module.

## Logging

| Variable | Required | Description |
|----------|----------|-------------|
| `LOG_LEVEL` | No | Minimum log level: `DEBUG`, `INFO`, `WARN`, `ERROR`, or `SILENT` |

The structured logger (`lib/logger.ts`) is backed by OpenTelemetry. Log entries include correlation IDs for request tracing and are emitted both to stdout (for `docker logs` and stdout-scraping shippers) and to the OTel Logs API for OTLP export.

## OpenTelemetry

The application instruments logs, traces, and metrics using OpenTelemetry. All telemetry is exported via OTLP/HTTP to a collector endpoint configured below. The collector (managed by ops) decides which backends to fan data out to — AppDynamics, Splunk, FireEye Trellix, Aria Operations, etc.

| Variable | Required | Description |
|----------|----------|-------------|
| `OTEL_SDK_DISABLED` | No | Set to `true` to skip OTel bootstrap entirely. Used in tests, builds, and as the rollback path. |
| `OTEL_SERVICE_NAME` | No | Overrides the `service.name` resource attribute (default `coe-website`). |
| `OTEL_SERVICE_VERSION` | No | Overrides the `service.version` resource attribute (default `npm_package_version`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | No | Base URL of the OTel collector (default `http://localhost:4318`). |
| `OTEL_EXPORTER_OTLP_HEADERS` | No | Auth headers for the collector, format `key1=val1,key2=val2`. |
| `OTEL_EXPORTER_OTLP_PROTOCOL` | No | `http/protobuf` (default) or `http/json`. |
| `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT` | No | Per-signal endpoint override for traces. |
| `OTEL_EXPORTER_OTLP_METRICS_ENDPOINT` | No | Per-signal endpoint override for metrics. |
| `OTEL_EXPORTER_OTLP_LOGS_ENDPOINT` | No | Per-signal endpoint override for logs. |
| `OTEL_RESOURCE_ATTRIBUTES` | No | Extra resource attributes, format `k1=v1,k2=v2`. |
| `OTEL_TRACES_SAMPLER` | No | Sampling strategy (default `parentbased_traceidratio`). |
| `OTEL_TRACES_SAMPLER_ARG` | No | Sampling ratio (e.g. `0.1` for 10%). |
| `OTEL_LOG_LEVEL` | No | SDK's own internal log level (`error`, `warn`, `info`, `debug`). |
| `OTEL_METRIC_EXPORT_INTERVAL` | No | Metrics push interval in milliseconds (default `60000`). |

These variables follow the standard OpenTelemetry environment variable spec, so any collector operator already familiar with OTel will recognize them.

## System

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | No | `development`, `production`, or `test` |

## Environment by Deployment Target

| Variable | Local Dev | Docker Dev | Production |
|----------|-----------|------------|------------|
| `DATABASE_URL` | `.env` | `docker-compose.dev.yml` | `docker-compose.prod.yml` |
| `DEV_BYPASS_IAP` | `.env.local` | `docker-compose.dev.yml` | Not set (uses IAP) |
| `GEMINI_API_KEY` | `.env.local` | `.env.local` | Google Secret Manager |
| `MSSQL_*` | `.env.local` | `.env.local` | `docker-compose.prod.yml` |
| `SERVICEHEALTH_*` | `.env.local` | `.env.local` | `docker-compose.prod.yml` |
| `GCP_PROJECT_ID` | Not set | Not set | `docker-compose.prod.yml` |
| Secrets | `.env.local` | `.env.local` | Google Secret Manager via `entrypoint.js` |

## Source of Truth

The canonical validation schema is in `lib/env.ts`. If you add a new environment variable, add it to the Zod schema there first.
