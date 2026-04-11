/**
 * Next.js instrumentation hook.
 *
 * Bootstraps OpenTelemetry on Node-runtime server startup. Edge runtime is
 * intentionally skipped — the OTel Node SDK relies on `node:async_hooks` and
 * other Node-only APIs that the Edge Runtime does not provide. From Edge code
 * (e.g. proxy.ts) the OTel API calls become no-ops, which is the correct
 * behavior — telemetry is emitted from Node code only.
 *
 * Set OTEL_SDK_DISABLED=true to skip telemetry bootstrap entirely (used in
 * tests, builds, and as a safety rollback).
 *
 * IMPORTANT: the SDK module is loaded via `webpackIgnore: true` so webpack
 * never tries to follow the import chain at build/dev time. The reason: the
 * OTel sdk-node meta-package statically `require()`s ALL OTLP exporters
 * (HTTP, gRPC, protobuf), and the gRPC chain pulls in `@grpc/grpc-js`,
 * which fails to compile under webpack with "Module not found: Can't
 * resolve 'stream'". With webpackIgnore, Node handles the import natively
 * at runtime — and since the OTel SDK packages are listed in
 * `serverExternalPackages` in next.config.ts, Node already has direct
 * filesystem access to them.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;
  if (process.env.OTEL_SDK_DISABLED === 'true') return;

  const { startTelemetry } = await import(
    /* webpackIgnore: true */ './lib/telemetry/sdk'
  );
  startTelemetry();
}
