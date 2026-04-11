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
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== 'nodejs') return;
  if (process.env.OTEL_SDK_DISABLED === 'true') return;

  const { startTelemetry } = await import('./lib/telemetry/sdk');
  startTelemetry();
}
