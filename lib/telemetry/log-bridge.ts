/**
 * Log bridge: lib/logger.ts → OpenTelemetry Logs API + console.
 *
 * Every log emitted via the public `logger.*` API flows through `emitLog`,
 * which:
 *
 *   1. Filters by configured LOG_LEVEL.
 *   2. Merges request-context (ALS) → bound child context → call-site data.
 *   3. Walks the merged data to extract Error instances into plain objects
 *      (so we get message/stack/cause/own-props in the output).
 *   4. Sanitizes for sensitive keys, depth, circular refs, string size.
 *   5. Emits to the OTel Logs API (which the SDK exports via OTLP/HTTP to
 *      whatever collector is configured).
 *   6. ALSO writes to console — pretty in dev, JSON in prod. This preserves
 *      backward-compat with developers reading `docker logs -f` AND with any
 *      log shipper that scrapes container stdout.
 *
 * The OTel Logs API is a no-op when no LoggerProvider is registered (e.g.
 * during tests with OTEL_SDK_DISABLED=true), so calls are always safe.
 */
import { logs, SeverityNumber } from '@opentelemetry/api-logs';
import { trace as otelTrace } from '@opentelemetry/api';
import { sanitize } from './sanitize';
import { walkAndExtractErrors } from './errors';
import { getRequestContext } from './request-context';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
export type LogLevelOrSilent = LogLevel | 'SILENT';

export interface LogContext {
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Level filtering
// ---------------------------------------------------------------------------

const LEVEL_VALUES: Record<LogLevelOrSilent, number> = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  SILENT: 4,
};

function getConfiguredLevel(): LogLevelOrSilent {
  const envLevel = (
    typeof process !== 'undefined' ? process.env?.LOG_LEVEL : undefined
  )?.toUpperCase() as LogLevelOrSilent | undefined;

  if (envLevel && envLevel in LEVEL_VALUES) return envLevel;

  const isProduction =
    typeof process !== 'undefined' && process.env?.NODE_ENV === 'production';

  return isProduction ? 'INFO' : 'DEBUG';
}

export function shouldEmit(level: LogLevel): boolean {
  return LEVEL_VALUES[level] >= LEVEL_VALUES[getConfiguredLevel()];
}

// ---------------------------------------------------------------------------
// Severity mapping
// ---------------------------------------------------------------------------

const SEVERITY_NUMBER: Record<LogLevel, SeverityNumber> = {
  DEBUG: SeverityNumber.DEBUG,
  INFO: SeverityNumber.INFO,
  WARN: SeverityNumber.WARN,
  ERROR: SeverityNumber.ERROR,
};

// ---------------------------------------------------------------------------
// OTel logger handle
// ---------------------------------------------------------------------------

const OTEL_LOGGER_NAME = 'coe-website';

function otelLogger() {
  return logs.getLogger(OTEL_LOGGER_NAME);
}

// ---------------------------------------------------------------------------
// Console output (preserves the existing dev/prod behavior)
// ---------------------------------------------------------------------------

function isProduction(): boolean {
  return (
    typeof process !== 'undefined' && process.env?.NODE_ENV === 'production'
  );
}

function writeToConsole(
  level: LogLevel,
  message: string,
  sanitized: Record<string, unknown> | undefined,
): void {
  if (isProduction()) {
    const entry: Record<string, unknown> = {
      severity: level,
      message,
      timestamp: new Date().toISOString(),
    };
    if (sanitized) entry.data = sanitized;

    const json = JSON.stringify(entry);
    if (level === 'ERROR') {
      // eslint-disable-next-line no-console -- logger is the canonical console wrapper
      console.error(json);
    } else {
      // eslint-disable-next-line no-console -- logger is the canonical console wrapper
      console.log(json);
    }
    return;
  }

  // Dev: pretty output. Pass '' as third arg when no data — preserves
  // long-standing behavior that the test suite asserts on.
  const prefix = `[${level}]`;
  const ctx = sanitized ?? '';
  if (level === 'ERROR') {
    // eslint-disable-next-line no-console -- logger is the canonical console wrapper
    console.error(prefix, message, ctx);
  } else if (level === 'WARN') {
    // eslint-disable-next-line no-console -- logger is the canonical console wrapper
    console.warn(prefix, message, ctx);
  } else if (level === 'DEBUG') {
    // eslint-disable-next-line no-console -- logger is the canonical console wrapper
    console.debug(prefix, message, ctx);
  } else {
    // eslint-disable-next-line no-console -- logger is the canonical console wrapper
    console.log(prefix, message, ctx);
  }
}

// ---------------------------------------------------------------------------
// Public emit
// ---------------------------------------------------------------------------

/**
 * Internal: emit a log record. Called by the public Logger interface.
 *
 * @param level     Severity level.
 * @param message   Human-readable log message.
 * @param data      Call-site attributes.
 * @param bound     Attributes bound via child() / withCorrelationId().
 */
export function emitLog(
  level: LogLevel,
  message: string,
  data?: LogContext,
  bound?: LogContext,
): void {
  if (!shouldEmit(level)) return;

  // Merge order: ALS → bound → data. Explicit data wins on collision.
  const requestCtx = getRequestContext();
  const merged: LogContext = {
    ...(requestCtx ?? {}),
    ...(bound ?? {}),
    ...(data ?? {}),
  };

  const hasContent = Object.keys(merged).length > 0;
  const withErrors = hasContent
    ? walkAndExtractErrors(merged)
    : undefined;
  const sanitized = withErrors ? sanitize(withErrors) : undefined;

  // 1) OTel Logs API → OTLP exporter → collector (no-op if SDK disabled)
  emitToOtel(level, message, sanitized);

  // 2) Console (dev pretty, prod JSON) — preserved for stdout shippers and dev
  writeToConsole(level, message, sanitized);
}

function emitToOtel(
  level: LogLevel,
  message: string,
  sanitized: Record<string, unknown> | undefined,
): void {
  // Auto-attach trace_id / span_id from the active span if there is one.
  // The OTel SDK normally does this automatically, but only when called
  // inside a span context — explicit attributes ensure correlation works
  // even from outside auto-instrumented code paths.
  const spanCtx = otelTrace.getActiveSpan()?.spanContext();
  const attributes: Record<string, unknown> = { ...(sanitized ?? {}) };
  if (spanCtx) {
    attributes['trace_id'] = spanCtx.traceId;
    attributes['span_id'] = spanCtx.spanId;
  }

  try {
    otelLogger().emit({
      severityNumber: SEVERITY_NUMBER[level],
      severityText: level,
      body: message,
      // OTel attributes only accept primitive values; coerce nested structures
      // to JSON strings so the collector still gets them intact.
      attributes: coerceAttributes(attributes),
    });
  } catch {
    // Never let logging itself crash the app.
  }
}

/**
 * OTel attribute values must be string | number | boolean | array of those.
 * Nested objects get JSON-stringified so the collector receives the full
 * structure (and downstream backends like Splunk index it as JSON).
 */
function coerceAttributes(
  obj: Record<string, unknown>,
): Record<string, string | number | boolean | Array<string | number | boolean>> {
  const out: Record<
    string,
    string | number | boolean | Array<string | number | boolean>
  > = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) continue;
    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    ) {
      out[key] = value;
    } else if (Array.isArray(value)) {
      // Only homogenous primitive arrays are valid OTel attributes; otherwise
      // stringify.
      const allPrimitive = value.every(
        (v) =>
          typeof v === 'string' ||
          typeof v === 'number' ||
          typeof v === 'boolean',
      );
      out[key] = allPrimitive
        ? (value as Array<string | number | boolean>)
        : JSON.stringify(value);
    } else {
      try {
        out[key] = JSON.stringify(value);
      } catch {
        out[key] = '[Unserializable]';
      }
    }
  }
  return out;
}
