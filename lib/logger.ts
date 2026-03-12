/**
 * Structured logging utility — SIEM-ready, Edge Runtime compatible.
 *
 * Features:
 *  - Configurable LOG_LEVEL via env var (DEBUG | INFO | WARN | ERROR | SILENT)
 *  - GCP Cloud Logging compatible JSON in production
 *  - Sensitive field sanitization
 *  - Correlation ID support for request tracing
 *  - Child loggers with bound context
 *  - Performance timing helpers
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
type LogLevelOrSilent = LogLevel | 'SILENT';

interface LogContext {
  [key: string]: unknown;
}

interface Logger {
  debug: (message: string, data?: LogContext) => void;
  info: (message: string, data?: LogContext) => void;
  warn: (message: string, data?: LogContext) => void;
  error: (message: string, data?: LogContext) => void;
  /** Create a child logger with bound context merged into every log entry */
  child: (context: LogContext) => Logger;
  /** Create a logger with a correlation ID baked into every entry */
  withCorrelationId: (correlationId: string) => Logger;
  /** Start a timer; call the returned function to log elapsed duration */
  startTimer: (label: string) => (extra?: LogContext) => void;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const LEVEL_VALUES: Record<LogLevelOrSilent, number> = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  SILENT: 4,
};

const SENSITIVE_KEYS = new Set([
  'password',
  'token',
  'apikey',
  'secret',
  'authorization',
  'cookie',
  'credential',
  'private_key',
  'client_secret',
]);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getConfiguredLevel(): LogLevelOrSilent {
  const envLevel = (
    typeof process !== 'undefined' ? process.env?.LOG_LEVEL : undefined
  )?.toUpperCase() as LogLevelOrSilent | undefined;

  if (envLevel && envLevel in LEVEL_VALUES) return envLevel;

  const isProduction =
    typeof process !== 'undefined' &&
    process.env?.NODE_ENV === 'production';

  return isProduction ? 'INFO' : 'DEBUG';
}

function shouldEmit(level: LogLevel): boolean {
  return LEVEL_VALUES[level] >= LEVEL_VALUES[getConfiguredLevel()];
}

function sanitize(data: Record<string, unknown>): Record<string, unknown> {
  const cleaned: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (SENSITIVE_KEYS.has(key.toLowerCase())) {
      cleaned[key] = '[REDACTED]';
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      cleaned[key] = sanitize(value as Record<string, unknown>);
    } else {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

function emit(
  level: LogLevel,
  message: string,
  data?: LogContext,
  boundContext?: LogContext,
) {
  if (!shouldEmit(level)) return;

  const merged = { ...boundContext, ...data };
  const sanitized = Object.keys(merged).length > 0 ? sanitize(merged) : undefined;

  const isProduction =
    typeof process !== 'undefined' &&
    process.env?.NODE_ENV === 'production';

  if (isProduction) {
    // Structured JSON for GCP Cloud Logging / SIEM ingestion
    const entry: Record<string, unknown> = {
      severity: level,
      message,
      timestamp: new Date().toISOString(),
    };

    // GCP-recognized fields
    if (sanitized?.correlationId) {
      entry['logging.googleapis.com/trace'] = sanitized.correlationId;
    }
    if (sanitized?.module) {
      entry['logging.googleapis.com/labels'] = { module: sanitized.module };
    }

    if (sanitized) entry.data = sanitized;

    const json = JSON.stringify(entry);
    if (level === 'ERROR') {
      console.error(json);
    } else {
      console.log(json);
    }
  } else {
    // Pretty output for development
    const prefix = `[${level}]`;
    const ctx = sanitized ?? '';
    if (level === 'ERROR') {
      console.error(prefix, message, ctx);
    } else if (level === 'WARN') {
      console.warn(prefix, message, ctx);
    } else if (level === 'DEBUG') {
      console.debug(prefix, message, ctx);
    } else {
      console.log(prefix, message, ctx);
    }
  }
}

// ---------------------------------------------------------------------------
// Logger factory
// ---------------------------------------------------------------------------

function createLogger(boundContext?: LogContext): Logger {
  const ctx = boundContext ?? {};

  return {
    debug: (message, data) => emit('DEBUG', message, data, ctx),
    info: (message, data) => emit('INFO', message, data, ctx),
    warn: (message, data) => emit('WARN', message, data, ctx),
    error: (message, data) => emit('ERROR', message, data, ctx),

    child(context: LogContext): Logger {
      return createLogger({ ...ctx, ...context });
    },

    withCorrelationId(correlationId: string): Logger {
      return createLogger({ ...ctx, correlationId });
    },

    startTimer(label: string) {
      const start = performance.now();
      return (extra?: LogContext) => {
        const durationMs = Math.round(performance.now() - start);
        emit('INFO', label, { durationMs, ...extra }, ctx);
      };
    },
  };
}

// ---------------------------------------------------------------------------
// Singleton export
// ---------------------------------------------------------------------------

export const logger = createLogger();

export type { Logger, LogLevel, LogContext };
