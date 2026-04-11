/**
 * Build the OpenTelemetry Resource describing this service.
 *
 * Resource attributes are emitted with every span, metric, and log record so
 * downstream backends (AppDynamics, Splunk, Trellix, Aria) can group and
 * filter telemetry by service identity. We use semantic-convention constants
 * (never bare strings) to stay aligned with the OTel spec.
 *
 * NodeSDK is configured with `autoDetectResources: true` (the default), which
 * runs the env / process / host detectors and merges them into this resource.
 * Per the Resource.merge() contract the detected attributes win on collision,
 * so OTEL_SERVICE_NAME / OTEL_RESOURCE_ATTRIBUTES set by ops will override our
 * in-code defaults — exactly what we want.
 */
import * as os from 'node:os';
import { resourceFromAttributes, type Resource } from '@opentelemetry/resources';
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from '@opentelemetry/semantic-conventions';
import {
  ATTR_DEPLOYMENT_ENVIRONMENT_NAME,
  ATTR_HOST_NAME,
} from '@opentelemetry/semantic-conventions/incubating';

const DEFAULT_SERVICE_NAME = 'coe-website';

export function buildResource(): Resource {
  const serviceVersion =
    process.env.OTEL_SERVICE_VERSION ??
    process.env.npm_package_version ??
    '0.0.0';
  const deploymentEnv =
    process.env.NODE_ENV === 'production' ? 'production' : 'development';

  return resourceFromAttributes({
    [ATTR_SERVICE_NAME]: DEFAULT_SERVICE_NAME,
    [ATTR_SERVICE_VERSION]: serviceVersion,
    [ATTR_DEPLOYMENT_ENVIRONMENT_NAME]: deploymentEnv,
    [ATTR_HOST_NAME]: os.hostname(),
  });
}
