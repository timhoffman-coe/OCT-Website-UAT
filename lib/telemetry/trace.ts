/**
 * Manual span creation helper.
 *
 * Most spans are created automatically by `@opentelemetry/auto-instrumentations-node`
 * (HTTP servers/clients, Postgres, MSSQL, fetch, etc.). This helper is for
 * the cases where you want to create a custom span around a unit of work
 * that auto-instrumentation doesn't see — e.g. an in-process AI inference
 * call, a complex business operation, or a long-running computation.
 *
 * USAGE:
 *   import { trace } from '@/lib/logger';
 *
 *   const result = await trace.span('chat.intent-detection', async (span) => {
 *     span.setAttribute('intent', 'project_lookup');
 *     return await detectIntent(query);
 *   });
 *
 * The span is automatically ended (success or error) and any thrown error
 * is recorded on the span before being re-thrown.
 */
import { trace as otelTrace, SpanStatusCode, type Span } from '@opentelemetry/api';

const TRACER_NAME = 'coe-website';

function tracer() {
  return otelTrace.getTracer(TRACER_NAME);
}

export const trace = {
  /**
   * Create a span around an async operation. Records errors on the span and
   * sets the status accordingly. Re-throws so callers see the original error.
   */
  async span<T>(
    name: string,
    fn: (span: Span) => Promise<T>,
    attributes?: Record<string, string | number | boolean>,
  ): Promise<T> {
    return tracer().startActiveSpan(name, { attributes }, async (span) => {
      try {
        const result = await fn(span);
        span.setStatus({ code: SpanStatusCode.OK });
        return result;
      } catch (err) {
        span.recordException(err as Error);
        span.setStatus({
          code: SpanStatusCode.ERROR,
          message: err instanceof Error ? err.message : String(err),
        });
        throw err;
      } finally {
        span.end();
      }
    });
  },

  /** Get the current trace ID, if any. Useful for log correlation. */
  currentTraceId(): string | undefined {
    const ctx = otelTrace.getActiveSpan()?.spanContext();
    return ctx?.traceId;
  },

  /** Get the current span ID, if any. */
  currentSpanId(): string | undefined {
    const ctx = otelTrace.getActiveSpan()?.spanContext();
    return ctx?.spanId;
  },
};
