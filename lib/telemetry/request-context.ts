/**
 * Request-scoped log context via AsyncLocalStorage.
 *
 * USAGE in a Node-runtime route handler:
 *
 *   import { runWithRequestContext } from '@/lib/logger';
 *
 *   export async function POST(request: Request) {
 *     const correlationId = request.headers.get('x-correlation-id') ?? crypto.randomUUID();
 *     return runWithRequestContext(
 *       { correlationId, httpRequest: { requestMethod: 'POST', requestUrl: request.url } },
 *       async () => {
 *         // any logger.* call here automatically attaches correlationId + httpRequest
 *         logger.info('handling request');
 *         return Response.json({ ok: true });
 *       },
 *     );
 *   }
 *
 * EDGE RUNTIME: `node:async_hooks` is not available in Next.js middleware
 * (proxy.ts) or in any code marked with `export const runtime = 'edge'`.
 * The require() is wrapped in a try/catch so the module loads everywhere,
 * but on Edge the helpers degrade to a pass-through: `runWithRequestContext`
 * just calls `fn()` directly and `getRequestContext()` returns undefined.
 * Edge code should continue to propagate correlation IDs via response
 * headers as it does today.
 */

type LogContext = Record<string, unknown>;

interface AsyncLocalStorageLike<T> {
  run<R>(store: T, callback: () => R): R;
  getStore(): T | undefined;
}

let als: AsyncLocalStorageLike<LogContext> | null = null;

try {
  // Dynamic require so bundlers don't try to resolve node:async_hooks for Edge
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const asyncHooks = require('node:async_hooks') as {
    AsyncLocalStorage: new <T>() => AsyncLocalStorageLike<T>;
  };
  als = new asyncHooks.AsyncLocalStorage<LogContext>();
} catch {
  als = null; // Edge runtime — no-op shim below
}

export function runWithRequestContext<T>(
  context: LogContext,
  fn: () => T,
): T {
  if (!als) return fn();
  // Merge with any outer context so nested calls accumulate
  const outer = als.getStore() ?? {};
  return als.run({ ...outer, ...context }, fn);
}

export function getRequestContext(): LogContext | undefined {
  if (!als) return undefined;
  return als.getStore();
}
