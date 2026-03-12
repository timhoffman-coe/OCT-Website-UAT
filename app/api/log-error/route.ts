import { NextResponse } from 'next/server';
import { logger } from '@/lib/logger';

const log = logger.child({ module: 'client-error' });

/**
 * POST /api/log-error
 * Receives client-side errors (e.g. from error boundaries) and writes them
 * through the structured server-side logger. Rate-limited in middleware.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const message =
      typeof body.message === 'string'
        ? body.message.slice(0, 1000)
        : 'Unknown client error';

    const digest =
      typeof body.digest === 'string' ? body.digest.slice(0, 100) : undefined;

    const url =
      typeof body.url === 'string' ? body.url.slice(0, 500) : undefined;

    const module =
      typeof body.module === 'string' ? body.module.slice(0, 100) : undefined;

    const correlationId = request.headers.get('x-correlation-id') ?? undefined;

    log.error('Client error', {
      clientMessage: message,
      digest,
      url,
      module,
      correlationId,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
