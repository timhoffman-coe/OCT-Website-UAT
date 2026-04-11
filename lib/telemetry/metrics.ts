/**
 * Thin metric helper API over the OpenTelemetry Metrics API.
 *
 * USAGE:
 *   import { metrics } from '@/lib/logger';
 *
 *   metrics.counter('http.server.errors', { route: '/api/chat' });
 *   metrics.histogram('db.query.duration_ms', 42, { table: 'project' });
 *   metrics.gauge('queue.depth', 17);
 *
 * Instruments are created lazily and cached by name. The OTel Metrics API
 * is a no-op when no MeterProvider is registered (e.g. tests with
 * OTEL_SDK_DISABLED=true), so calls are always safe.
 */
import { metrics as otelMetrics } from '@opentelemetry/api';
import type { Counter, Histogram } from '@opentelemetry/api';

const METER_NAME = 'coe-website';

const counters = new Map<string, Counter>();
const histograms = new Map<string, Histogram>();

// Observable gauges register a callback rather than emitting on demand.
// We track current values per (name, attribute-key) and report them on
// the meter's collection cycle.
const gaugeValues = new Map<string, Map<string, number>>();
const gaugeAttrs = new Map<string, Map<string, Record<string, string | number>>>();
const registeredGauges = new Set<string>();

function meter() {
  return otelMetrics.getMeter(METER_NAME);
}

function getCounter(name: string): Counter {
  let c = counters.get(name);
  if (!c) {
    c = meter().createCounter(name);
    counters.set(name, c);
  }
  return c;
}

function getHistogram(name: string): Histogram {
  let h = histograms.get(name);
  if (!h) {
    h = meter().createHistogram(name);
    histograms.set(name, h);
  }
  return h;
}

function attrKey(attrs?: Record<string, string | number>): string {
  if (!attrs) return '';
  return Object.entries(attrs)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join(',');
}

function ensureGauge(name: string): void {
  if (registeredGauges.has(name)) return;
  registeredGauges.add(name);
  const observable = meter().createObservableGauge(name);
  observable.addCallback((result) => {
    const values = gaugeValues.get(name);
    const attrsMap = gaugeAttrs.get(name);
    if (!values) return;
    for (const [k, v] of values.entries()) {
      result.observe(v, attrsMap?.get(k) ?? {});
    }
  });
}

export const metrics = {
  /** Increment a counter by `value` (default 1). */
  counter(
    name: string,
    attrs?: Record<string, string | number>,
    value = 1,
  ): void {
    getCounter(name).add(value, attrs);
  },

  /** Record a single observation into a histogram. */
  histogram(
    name: string,
    value: number,
    attrs?: Record<string, string | number>,
  ): void {
    getHistogram(name).record(value, attrs);
  },

  /** Set the current value of a gauge. Read on the next collection cycle. */
  gauge(
    name: string,
    value: number,
    attrs?: Record<string, string | number>,
  ): void {
    ensureGauge(name);
    const k = attrKey(attrs);
    if (!gaugeValues.has(name)) gaugeValues.set(name, new Map());
    if (!gaugeAttrs.has(name)) gaugeAttrs.set(name, new Map());
    gaugeValues.get(name)!.set(k, value);
    if (attrs) gaugeAttrs.get(name)!.set(k, attrs);
  },
};

/** Test-only: clear cached instruments so each test starts clean. */
export function __resetMetrics(): void {
  counters.clear();
  histograms.clear();
  gaugeValues.clear();
  gaugeAttrs.clear();
  registeredGauges.clear();
}
