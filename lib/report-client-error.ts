/**
 * Client-safe error reporting helper.
 * Sends errors to /api/log-error so they flow through the structured
 * server-side logger. Safe to import in 'use client' components.
 */

interface ErrorContext {
  /** Which module or component the error originated from */
  module?: string;
  /** Next.js error digest (provided by error boundaries) */
  digest?: string;
}

export function reportError(
  error: Error | string,
  context?: ErrorContext,
): void {
  try {
    const message = error instanceof Error ? error.message : error;
    const url = typeof window !== 'undefined' ? window.location.href : undefined;

    // Fire-and-forget — don't block the UI on error reporting
    fetch('/api/log-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        url,
        ...context,
      }),
    }).catch(() => {
      // Silently swallow — can't do much if error reporting itself fails
    });
  } catch {
    // Guard against any unexpected throw in the reporting path
  }
}
