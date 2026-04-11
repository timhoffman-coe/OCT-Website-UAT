import { NextResponse } from 'next/server';
import { logger, runWithRequestContext, metrics } from '@/lib/logger';

const log = logger.child({ module: 'client-error' });

/**
 * POST /api/log-error
 * Receives client-side errors (e.g. from error boundaries) and writes them
 * through the structured server-side logger. Rate-limited in middleware.
 *
 * Uses runWithRequestContext so any nested log call automatically inherits
 * the correlation ID and request metadata. Also bumps a counter so the
 * metrics pipeline can track client error volume per route.
 */
export async function POST(request: Request) {
  const correlationId =
    request.headers.get('x-correlation-id') ?? crypto.randomUUID();
  const userAgent = request.headers.get('user-agent') ?? undefined;
  const remoteIp =
    request.headers.get('x-real-ip') ??
    request.headers.get('x-forwarded-for') ??
    undefined;

  return runWithRequestContext(
    {
      correlationId,
      httpRequest: {
        requestMethod: 'POST',
        requestUrl: request.url,
        userAgent,
        remoteIp,
      },
    },
    async () => {
      try {
        const body = await request.json();

        const message =
          typeof body.message === 'string'
            ? body.message.slice(0, 1000)
            : 'Unknown client error';

        const digest =
          typeof body.digest === 'string'
            ? body.digest.slice(0, 100)
            : undefined;

        const url =
          typeof body.url === 'string' ? body.url.slice(0, 500) : undefined;

        const errorModule =
          typeof body.module === 'string'
            ? body.module.slice(0, 100)
            : undefined;

        log.error('Client error', {
          clientMessage: message,
          digest,
          url,
          module: errorModule,
        });

        metrics.counter('coe.client_errors', {
          module: errorModule ?? 'unknown',
        });

        return NextResponse.json({ ok: true });
      } catch {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
      }
    },
  );
}
