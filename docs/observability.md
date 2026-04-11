# Observability

The COE website is instrumented with **OpenTelemetry** for logs, traces, and metrics. All telemetry is exported via OTLP/HTTP to a collector endpoint configured by environment variables. The collector (managed by ops) decides which backends to forward to — **AppDynamics, Splunk, FireEye Trellix, Aria Operations**, or any other OTLP-compatible destination. The application code itself is vendor-neutral.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Next.js App (nextjs-site-app-1)                            │
│                                                             │
│   instrumentation.ts ──register()──► lib/telemetry/sdk.ts   │
│                                          │                  │
│                                          │ NodeSDK          │
│                                          ├─ Trace exporter  │
│                                          ├─ Metric reader   │
│                                          ├─ Log processor   │
│                                          └─ Auto-instrument │
│                                                             │
│   App code ──► @/lib/logger ──► OTel Logs API               │
│                       │                                     │
│                       └──────► console (dev pretty/prod JSON)│
└────────────┬────────────────────────────────────────────────┘
             │ OTLP/HTTP (4318)
             ▼
   ┌─────────────────────┐
   │  OTel Collector     │   ← managed by ops
   └──┬──────┬──────┬────┴┐
      │      │      │     │
      ▼      ▼      ▼     ▼
   AppD  Splunk  Trellix  Aria
```

## What we emit

### Logs

Every call through `@/lib/logger` produces both:

1. An **OTel LogRecord** sent over OTLP to the configured collector.
2. A **console line** — pretty-printed in dev, structured JSON in prod. Preserved for `docker logs -f` and for any stdout-scraping log shipper.

```ts
import { logger } from '@/lib/logger';

logger.info('Project loaded', { projectId: 42, slug: 'open-data' });
logger.error('DB query failed', { error: someError });   // auto-extracts stack/cause
```

Sensitive keys (`password`, `token`, `bearer`, `jwt`, `authorization`, etc.) are redacted automatically. Strings over 10 KB are truncated. Circular references are safely handled.

### Traces

Auto-instrumentation produces spans for:

- HTTP server (Next.js route handlers)
- HTTP / fetch / undici client calls
- PostgreSQL queries via `pg`
- MSSQL queries
- And many more — see [`@opentelemetry/auto-instrumentations-node`](https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/metapackages/auto-instrumentations-node).

For business operations that auto-instrumentation doesn't see, create a manual span:

```ts
import { trace } from '@/lib/logger';

const result = await trace.span('chat.classify-intent', async (span) => {
  span.setAttribute('intent', 'project_lookup');
  return await classifyIntent(question);
});
```

The span is auto-ended on success or error and any thrown exception is recorded on the span.

### Metrics

Counters, histograms, and gauges are emitted via the OTel Metrics API and pushed to the collector at the configured interval (default 60s).

```ts
import { metrics } from '@/lib/logger';

metrics.counter('coe.chat_requests', { intent: 'HR' });
metrics.histogram('coe.db.query_duration_ms', 42, { table: 'project' });
metrics.gauge('coe.queue.depth', 17);
```

Built-in metrics emitted automatically:

- `coe.timer.duration_ms` — every `logger.startTimer(label)()` call records to this histogram.
- `coe.client_errors` — bumped by `/api/log-error` for each client-side error report.
- `coe.chat_requests`, `coe.chat_errors`, `coe.chat_circuit_breaker_open` — chat route counters.

## Request-scoped context

For Node-runtime route handlers, wrap your handler in `runWithRequestContext` so every nested log call automatically inherits the correlation ID, HTTP request metadata, and any other context you set:

```ts
import { runWithRequestContext, logger } from '@/lib/logger';

export async function POST(request: Request) {
  return runWithRequestContext(
    {
      correlationId: request.headers.get('x-correlation-id') ?? crypto.randomUUID(),
      httpRequest: {
        requestMethod: 'POST',
        requestUrl: request.url,
      },
    },
    async () => {
      logger.info('handling request');   // automatically includes correlationId + httpRequest
      // ...
    },
  );
}
```

`runWithRequestContext` is implemented with Node's `AsyncLocalStorage` so the context is available at any depth without manual threading.

**Edge runtime caveat**: `proxy.ts` and any code marked `runtime = 'edge'` cannot use `runWithRequestContext` (Edge has no `node:async_hooks`). On Edge, the helper degrades to a pass-through. Edge code should continue to propagate correlation IDs via the `x-correlation-id` response header as it does today.

## Pointing at a collector

All endpoint and authentication configuration uses the standard OpenTelemetry environment variables. See [environment-variables.md](deployment/environment-variables.md) for the complete list.

Common patterns:

```bash
# Local dev — use the sidecar collector started by docker-compose.dev.yml
OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4318

# Staging — central collector, no auth
OTEL_EXPORTER_OTLP_ENDPOINT=https://otel-staging.internal.example.com

# Production — central collector with bearer auth
OTEL_EXPORTER_OTLP_ENDPOINT=https://otel.internal.example.com
OTEL_EXPORTER_OTLP_HEADERS=authorization=Bearer <token>

# CI / build — disable telemetry entirely
OTEL_SDK_DISABLED=true
```

## Local dev collector

A minimal OpenTelemetry Collector runs as a sidecar in `docker-compose.dev.yml`. It receives OTLP/HTTP on port 4318 and writes everything to its own stdout via the `debug` exporter — no real backend wired up. View the collector output with:

```bash
docker compose -f docker-compose.dev.yml logs -f otel-collector
```

The collector configuration is in [otel-collector-config.yaml](../otel-collector-config.yaml). To experiment with a real backend locally, edit that file to add a different exporter (e.g. `splunk_hec`, `otlphttp`) and the corresponding pipeline.

## Disabling telemetry

Set `OTEL_SDK_DISABLED=true` to skip the SDK bootstrap entirely. Console logs continue to work, the OTel API calls become no-ops, and no network connections to a collector are attempted. This is the safe rollback path and is the default in tests (set in [vitest.setup.ts](../vitest.setup.ts)).

## Recipes

### Add a new metric

```ts
import { metrics } from '@/lib/logger';
metrics.counter('coe.feature_x_used', { variant: 'A' });
```

That's it. The instrument is created lazily on first use and cached. No registration boilerplate.

### Add a new manual span

```ts
import { trace } from '@/lib/logger';
const result = await trace.span('feature.expensive-op', async (span) => {
  span.setAttribute('input.size', input.length);
  return await doExpensiveWork(input);
});
```

### Correlate logs with traces

When auto-instrumentation creates a span around an HTTP request handler, all log calls inside that request automatically carry `trace_id` and `span_id` attributes. The collector preserves these so backends like Splunk and AppDynamics can pivot from a log line to the full trace.

### Add a new structured log field

Just pass it in `data`:

```ts
logger.info('Project published', {
  projectId: project.id,
  publishedBy: user.email,
  publishedAt: new Date().toISOString(),
});
```

The field is sanitized, attached as an OTel log attribute, and shipped to the collector.

## Production wiring (TBD by ops)

Production endpoint, auth headers, and the collector config itself are operational concerns. When ready:

1. Set `OTEL_EXPORTER_OTLP_ENDPOINT` and `OTEL_EXPORTER_OTLP_HEADERS` in `docker-compose.prod.yml` to point at the production collector.
2. Configure the collector pipeline (separately, by ops) to fan data out to the relevant backends.
3. Redeploy. No application code change required.

## Files

- [instrumentation.ts](../instrumentation.ts) — Next.js bootstrap hook
- [lib/logger.ts](../lib/logger.ts) — public API (thin bridge over OTel)
- [lib/telemetry/](../lib/telemetry/) — SDK setup, exporters, bridge internals
- [otel-collector-config.yaml](../otel-collector-config.yaml) — local dev collector pipeline
- [docs/deployment/environment-variables.md](deployment/environment-variables.md) — full env var reference
