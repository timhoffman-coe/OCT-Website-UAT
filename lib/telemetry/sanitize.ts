/**
 * Sanitize structured log/attribute data before it leaves the process.
 *
 * Responsibilities:
 *  - Redact sensitive keys by name (case-insensitive)
 *  - Recurse into objects AND arrays
 *  - Protect against circular references via WeakSet seen-tracking
 *  - Enforce a depth limit to prevent runaway recursion
 *  - Truncate very long strings to prevent log bombs
 *
 * Sanitization is best-effort defense in depth — the primary safeguard is
 * never logging sensitive data in the first place. We deliberately do NOT
 * regex-scrub values (emails, card numbers, etc.) — that approach is brittle
 * and expensive. Key-name redaction catches the common cases reliably.
 */

const SENSITIVE_KEYS = new Set([
  // Auth
  'password',
  'passwd',
  'pwd',
  'secret',
  'token',
  'apikey',
  'api_key',
  'x-api-key',
  'authorization',
  'auth',
  'bearer',
  'jwt',
  'cookie',
  'set-cookie',
  'session',
  'sessionid',
  'session_id',
  'credential',
  'access_token',
  'refresh_token',
  'private_key',
  'client_secret',
  // PII
  'ssn',
  'creditcard',
  'credit_card',
]);

const MAX_DEPTH = 8;
const MAX_STRING_LENGTH = 10_000;

function truncateString(value: string): string {
  if (value.length <= MAX_STRING_LENGTH) return value;
  const dropped = value.length - MAX_STRING_LENGTH;
  return `${value.slice(0, MAX_STRING_LENGTH)}...[truncated ${dropped} chars]`;
}

function sanitizeValue(
  value: unknown,
  depth: number,
  seen: WeakSet<object>,
): unknown {
  if (value === null || value === undefined) return value;

  if (typeof value === 'string') return truncateString(value);

  if (
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'bigint'
  ) {
    return value;
  }

  if (typeof value === 'function' || typeof value === 'symbol') {
    return `[${typeof value}]`;
  }

  if (typeof value !== 'object') return value;

  if (depth >= MAX_DEPTH) return '[Object]';

  // Circular reference protection
  if (seen.has(value as object)) return '[Circular]';
  seen.add(value as object);

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item, depth + 1, seen));
  }

  // Plain objects (and Error instances after extraction)
  const out: Record<string, unknown> = {};
  for (const [key, v] of Object.entries(value as Record<string, unknown>)) {
    if (SENSITIVE_KEYS.has(key.toLowerCase())) {
      out[key] = '[REDACTED]';
    } else {
      out[key] = sanitizeValue(v, depth + 1, seen);
    }
  }
  return out;
}

export function sanitize(
  data: Record<string, unknown>,
): Record<string, unknown> {
  const seen = new WeakSet<object>();
  return sanitizeValue(data, 0, seen) as Record<string, unknown>;
}

/** Exposed for tests. */
export const __SANITIZE_INTERNALS = {
  SENSITIVE_KEYS,
  MAX_DEPTH,
  MAX_STRING_LENGTH,
};
