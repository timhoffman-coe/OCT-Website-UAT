/**
 * OpenTelemetry NodeSDK initialization.
 *
 * Called once on Next.js server startup from instrumentation.ts. Wires up:
 *   - Trace exporter (OTLP/HTTP)
 *   - Metric reader with periodic OTLP push
 *   - Log record processor (batch) feeding the OTLP log exporter
 *   - Auto-instrumentation for HTTP, fetch, pg, mssql, undici, etc.
 *
 * Idempotent: a second call returns immediately. SIGTERM triggers a graceful
 * shutdown so in-flight batches get flushed before the process exits.
 *
 * Disabled entirely when OTEL_SDK_DISABLED=true (which is the default in
 * tests via vitest.config.ts and the rollback path in production).
 */
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { BatchLogRecordProcessor } from '@opentelemetry/sdk-logs';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { buildResource } from './resource';
import {
  createTraceExporter,
  createMetricExporter,
  createLogExporter,
} from './exporters';

let sdk: NodeSDK | null = null;

function configureDiagLogger(): void {
  const level = (process.env.OTEL_LOG_LEVEL ?? 'warn').toUpperCase();
  const map: Record<string, DiagLogLevel> = {
    NONE: DiagLogLevel.NONE,
    ERROR: DiagLogLevel.ERROR,
    WARN: DiagLogLevel.WARN,
    INFO: DiagLogLevel.INFO,
    DEBUG: DiagLogLevel.DEBUG,
    VERBOSE: DiagLogLevel.VERBOSE,
    ALL: DiagLogLevel.ALL,
  };
  diag.setLogger(new DiagConsoleLogger(), map[level] ?? DiagLogLevel.WARN);
}

export function startTelemetry(): void {
  if (sdk) return; // idempotent
  if (process.env.OTEL_SDK_DISABLED === 'true') return;

  configureDiagLogger();

  sdk = new NodeSDK({
    resource: buildResource(),
    traceExporter: createTraceExporter(),
    metricReader: new PeriodicExportingMetricReader({
      exporter: createMetricExporter(),
      exportIntervalMillis: Number(
        process.env.OTEL_METRIC_EXPORT_INTERVAL ?? 60_000,
      ),
    }),
    logRecordProcessors: [new BatchLogRecordProcessor(createLogExporter())],
    instrumentations: [
      getNodeAutoInstrumentations({
        // fs is extraordinarily noisy in Next.js (template reads, RSC payloads)
        '@opentelemetry/instrumentation-fs': { enabled: false },
        '@opentelemetry/instrumentation-dns': { enabled: false },
        // We don't use winston/bunyan/pino — disabling avoids optional
        // peer-dependency resolution warnings during the Next.js build.
        '@opentelemetry/instrumentation-winston': { enabled: false },
        '@opentelemetry/instrumentation-bunyan': { enabled: false },
        '@opentelemetry/instrumentation-pino': { enabled: false },
      }),
    ],
  });

  sdk.start();

  const shutdown = () => {
    sdk
      ?.shutdown()
      .catch(() => {
        /* swallow — we're exiting */
      })
      .finally(() => {
        sdk = null;
      });
  };
  process.once('SIGTERM', shutdown);
  process.once('SIGINT', shutdown);
}

/** Test-only: tear down the SDK so each test starts clean. */
export async function stopTelemetry(): Promise<void> {
  if (!sdk) return;
  try {
    await sdk.shutdown();
  } finally {
    sdk = null;
  }
}
