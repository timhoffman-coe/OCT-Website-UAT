import { z } from 'zod';
import { logger } from '@/lib/logger';

const envSchema = z.object({
  // Database (required)
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

  // AI
  GEMINI_API_KEY: z.string().min(1).optional(),

  // Authentication
  ADMIN_PASSWORD: z.string().min(1).optional(),
  ADMIN_EMAIL: z.string().email().optional(),
  IAP_AUDIENCE: z.string().optional(),
  DEV_BYPASS_IAP: z.enum(['true', 'false']).optional(),
  DEV_USER_EMAIL: z.string().email().optional(),
  DEV_USER_NAME: z.string().optional(),

  // MSSQL Data Portal
  MSSQL_SERVER: z.string().optional(),
  MSSQL_DATABASE: z.string().optional(),
  MSSQL_PORT: z.string().regex(/^\d+$/, 'Must be a number').optional(),
  MSSQL_DOMAIN: z.string().optional(),
  MSSQL_USER: z.string().optional(),
  MSSQL_PASSWORD: z.string().optional(),
  MSSQL_ENCRYPT: z.enum(['true', 'false']).optional(),
  MSSQL_TRUST_CERT: z.enum(['true', 'false']).optional(),

  // Google
  HR_POLICIES_FOLDER_ID: z.string().optional(),
  SERVICE_DESK_FOLDER_ID: z.string().optional(),
  GOOGLE_APPLICATION_CREDENTIALS: z.string().optional(),

  // Service Health
  SERVICEHEALTH_API_BASE_URL: z.string().url().optional(),
  SERVICEHEALTH_IAP_CLIENT_ID: z.string().optional(),

  // Feature Flags
  FF_ROADMAP_EDITING: z.enum(['true', 'false']).optional(),
  FF_DATA_PORTAL: z.enum(['true', 'false']).optional(),
  FF_VENDOR_DASHBOARD: z.enum(['true', 'false']).optional(),

  // Logging
  LOG_LEVEL: z.enum(['DEBUG', 'INFO', 'WARN', 'ERROR', 'SILENT']).optional(),

  // OpenTelemetry — all optional. Logger and telemetry code MUST read these
  // via process.env directly (not through this module) to avoid a circular
  // import: this file imports `logger` above.
  OTEL_SDK_DISABLED: z.enum(['true', 'false']).optional(),
  OTEL_SERVICE_NAME: z.string().optional(),
  OTEL_SERVICE_VERSION: z.string().optional(),
  OTEL_EXPORTER_OTLP_ENDPOINT: z.string().url().optional(),
  OTEL_EXPORTER_OTLP_HEADERS: z.string().optional(),
  OTEL_EXPORTER_OTLP_PROTOCOL: z.string().optional(),
  OTEL_EXPORTER_OTLP_TRACES_ENDPOINT: z.string().url().optional(),
  OTEL_EXPORTER_OTLP_METRICS_ENDPOINT: z.string().url().optional(),
  OTEL_EXPORTER_OTLP_LOGS_ENDPOINT: z.string().url().optional(),
  OTEL_RESOURCE_ATTRIBUTES: z.string().optional(),
  OTEL_TRACES_SAMPLER: z.string().optional(),
  OTEL_TRACES_SAMPLER_ARG: z.string().optional(),
  OTEL_LOG_LEVEL: z.string().optional(),
  OTEL_METRIC_EXPORT_INTERVAL: z.string().regex(/^\d+$/, 'Must be a number').optional(),

  // System
  NODE_ENV: z.enum(['development', 'production', 'test']).optional(),
});

export type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    const formatted = result.error.issues
      .map((i) => `  ${i.path.join('.')}: ${i.message}`)
      .join('\n');
    logger.warn('Environment validation failed', { issues: formatted });
    // Don't crash during build — only fail at runtime when vars are actually needed
    return process.env as unknown as Env;
  }
  return result.data;
}

export const env = validateEnv();
