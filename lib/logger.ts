/**
 * Application logger — public API.
 *
 * Backed by OpenTelemetry under the hood. Every log call goes through the
 * bridge in `lib/telemetry/log-bridge.ts`, which:
 *   - Filters by LOG_LEVEL
 *   - Walks data for Error instances and extracts stack/cause/own-props
 *   - Sanitizes sensitive keys, depth-limits, handles circular refs
 *   - Emits to the OTel Logs API (which the configured OTLP exporter ships
 *     to whatever collector ops has set up — AppDynamics, Splunk, Trellix,
 *     Aria, or anything else)
 *   - ALSO writes to console (dev pretty / prod JSON) for `docker logs` and
 *     for stdout-scraping log shippers
 *
 * The public API surface is unchanged from the previous hand-rolled logger,
 * so all 21 existing import sites continue to work without modification.
 *
 * NEW HELPERS exported alongside `logger`:
 *   - runWithRequestContext / getRequestContext  (request-scoped attributes via ALS)
 *   - metrics                                     (counter / histogram / gauge helpers)
 *   - trace                                       (manual span creation)
 */

import { emitLog, type LogLevel, type LogContext } from './telemetry/log-bridge';
import {
  runWithRequestContext,
  getRequestContext,
} from './telemetry/request-context';
import { metrics } from './telemetry/metrics';
import { trace } from './telemetry/trace';

// ---------------------------------------------------------------------------
// Public Logger interface
// ---------------------------------------------------------------------------

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
// Logger factory
// ---------------------------------------------------------------------------

function createLogger(boundContext?: LogContext): Logger {
  const ctx = boundContext ?? {};

  return {
    debug: (message, data) => emitLog('DEBUG', message, data, ctx),
    info: (message, data) => emitLog('INFO', message, data, ctx),
    warn: (message, data) => emitLog('WARN', message, data, ctx),
    error: (message, data) => emitLog('ERROR', message, data, ctx),

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
        emitLog('INFO', label, { durationMs, ...extra }, ctx);
        // Also record into a histogram so metrics backends see it.
        metrics.histogram('coe.timer.duration_ms', durationMs, { label });
      };
    },
  };
}

// ---------------------------------------------------------------------------
// Singleton + named exports
// ---------------------------------------------------------------------------

export const logger = createLogger();

export {
  runWithRequestContext,
  getRequestContext,
  metrics,
  trace,
};

export type { Logger, LogLevel, LogContext };
