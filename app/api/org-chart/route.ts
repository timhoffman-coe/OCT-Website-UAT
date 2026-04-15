import { NextResponse } from 'next/server';
import { getOrgChart } from '@/lib/data/org-chart';
import { logger } from '@/lib/logger';

export const revalidate = 86400; // 24h — HR data changes infrequently

export async function GET() {
  try {
    const data = await getOrgChart();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
      },
    });
  } catch (error) {
    logger.error('Org chart fetch error', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json({ error: 'Failed to fetch org chart' }, { status: 500 });
  }
}
