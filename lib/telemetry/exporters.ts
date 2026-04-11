/**
 * OTLP exporter factories for traces, metrics, and logs.
 *
 * The exporters use OTLP/HTTP (port 4318 by default) rather than gRPC to
 * avoid the @grpc/grpc-js native dependency and to work through more network
 * configurations. The OTel SDK reads endpoint, headers, protocol, and
 * compression from standard OTEL_EXPORTER_OTLP_* env vars automatically —
 * we pass empty config and let the SDK do its thing.
 *
 * Per-signal endpoint overrides are also picked up automatically:
 *   OTEL_EXPORTER_OTLP_TRACES_ENDPOINT
 *   OTEL_EXPORTER_OTLP_METRICS_ENDPOINT
 *   OTEL_EXPORTER_OTLP_LOGS_ENDPOINT
 *
 * Headers (e.g. for authenticated collectors):
 *   OTEL_EXPORTER_OTLP_HEADERS=key1=val1,key2=val2
 */
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';

export function createTraceExporter(): OTLPTraceExporter {
  return new OTLPTraceExporter();
}

export function createMetricExporter(): OTLPMetricExporter {
  return new OTLPMetricExporter();
}

export function createLogExporter(): OTLPLogExporter {
  return new OTLPLogExporter();
}
