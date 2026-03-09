const SENSITIVE_KEYS = new Set(['password', 'token', 'apiKey', 'secret', 'authorization', 'cookie']);

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

type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

function emit(level: LogLevel, message: string, data?: Record<string, unknown>) {
  const isProduction = process.env.NODE_ENV === 'production';
  const sanitized = data ? sanitize(data) : undefined;

  if (isProduction) {
    // Structured JSON for GCP Cloud Logging / log aggregators
    const entry: Record<string, unknown> = {
      severity: level,
      message,
      timestamp: new Date().toISOString(),
    };
    if (sanitized) entry.data = sanitized;

    // GCP Cloud Logging reads severity from the JSON field
    if (level === 'ERROR') {
      console.error(JSON.stringify(entry));
    } else {
      console.log(JSON.stringify(entry));
    }
  } else {
    // Pretty output for development
    const prefix = `[${level}]`;
    if (level === 'ERROR') {
      console.error(prefix, message, sanitized ?? '');
    } else if (level === 'WARN') {
      console.warn(prefix, message, sanitized ?? '');
    } else if (level === 'DEBUG') {
      console.debug(prefix, message, sanitized ?? '');
    } else {
      console.log(prefix, message, sanitized ?? '');
    }
  }
}

export const logger = {
  debug: (message: string, data?: Record<string, unknown>) => {
    if (process.env.NODE_ENV !== 'production') {
      emit('DEBUG', message, data);
    }
  },
  info: (message: string, data?: Record<string, unknown>) => emit('INFO', message, data),
  warn: (message: string, data?: Record<string, unknown>) => emit('WARN', message, data),
  error: (message: string, data?: Record<string, unknown>) => emit('ERROR', message, data),
};
