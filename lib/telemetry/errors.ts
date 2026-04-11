/**
 * Error → plain-object extraction.
 *
 * Eliminates the repeated `error instanceof Error ? error.message : String(error)`
 * pattern at call sites. The logger walks `data` before sanitization and
 * replaces any Error instance with an extracted plain object containing
 * `message`, `name`, `stack`, and any custom own-properties (still subject
 * to sensitive-key redaction in the sanitize step).
 *
 * `cause` chains are walked up to depth 3 to capture wrapped errors without
 * risk of infinite recursion.
 */

const MAX_CAUSE_DEPTH = 3;

interface ExtractedError {
  message: string;
  name: string;
  stack?: string;
  cause?: ExtractedError | unknown;
  [key: string]: unknown;
}

function extractError(err: Error, depth = 0): ExtractedError {
  const out: ExtractedError = {
    name: err.name,
    message: err.message,
  };
  if (err.stack) out.stack = err.stack;

  // Walk .cause chain (Error.cause is standard since ES2022)
  const cause = (err as Error & { cause?: unknown }).cause;
  if (cause !== undefined) {
    if (cause instanceof Error && depth < MAX_CAUSE_DEPTH) {
      out.cause = extractError(cause, depth + 1);
    } else {
      out.cause = cause;
    }
  }

  // Preserve custom subclass own-props (e.g. ZodError.issues)
  for (const key of Object.getOwnPropertyNames(err)) {
    if (key === 'name' || key === 'message' || key === 'stack' || key === 'cause') {
      continue;
    }
    out[key] = (err as unknown as Record<string, unknown>)[key];
  }

  return out;
}

/**
 * Walk a data object and replace any Error instances with extracted form.
 * Returns a new object — does not mutate the input. Circular references
 * are detected via a WeakSet and replaced with the string '[Circular]'
 * (sanitize.ts performs the same check downstream, but doing it here too
 * prevents a stack overflow before we get there).
 */
export function walkAndExtractErrors(
  data: Record<string, unknown>,
): Record<string, unknown> {
  const seen = new WeakSet<object>();
  return walkValue(data, seen) as Record<string, unknown>;
}

function walkValue(value: unknown, seen: WeakSet<object>): unknown {
  if (value instanceof Error) {
    return extractError(value);
  }
  if (value === null || typeof value !== 'object') {
    return value;
  }
  if (seen.has(value as object)) {
    return '[Circular]';
  }
  seen.add(value as object);

  if (Array.isArray(value)) {
    return value.map((item) => walkValue(item, seen));
  }
  if (value.constructor === Object) {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = walkValue(v, seen);
    }
    return out;
  }
  return value;
}

export type { ExtractedError };
