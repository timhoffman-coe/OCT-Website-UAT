import { NextResponse } from 'next/server';
import { fetchServiceHealthData } from '@/lib/service-health/service-health-client';
import { logger } from '@/lib/logger';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await fetchServiceHealthData();

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, max-age=30, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    logger.error('Service health API error', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json(
      { error: 'Failed to fetch service health data' },
      { status: 500 }
    );
  }
}
