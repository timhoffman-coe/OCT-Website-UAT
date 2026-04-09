import { NextRequest, NextResponse } from 'next/server';
import { getIncidentMetrics } from '@/lib/data/data-portal';
import { logger } from '@/lib/logger';
import type { DataPortalResponse, IncidentMetric } from '@/lib/data/data-portal-types';

export const dynamic = 'force-dynamic';
export const revalidate = 300; // 5 min — analytical data, freshness less critical than health monitoring

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const startDate = searchParams.get('startDate') || new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0];
    const endDate = searchParams.get('endDate') || new Date().toISOString().split('T')[0];

    const data = await getIncidentMetrics({ startDate, endDate });

    const response: DataPortalResponse<IncidentMetric> = {
      data,
      timestamp: new Date().toISOString(),
      rowCount: data.length,
    };

    return NextResponse.json(response);
  } catch (error) {
    logger.error('Data portal incidents error', { error: error instanceof Error ? error.message : String(error) });
    return NextResponse.json(
      { error: 'Failed to fetch incident metrics' },
      { status: 500 }
    );
  }
}
