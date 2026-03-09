import { NextResponse } from 'next/server';
import { getServiceHealth } from '@/lib/data/data-portal';
import type { DataPortalResponse, ServiceHealthRecord } from '@/lib/data/data-portal-types';

export const revalidate = 60; // 1 min — near-real-time monitoring, needs freshest data

export async function GET() {
  try {
    const data = await getServiceHealth();

    const response: DataPortalResponse<ServiceHealthRecord> = {
      data,
      timestamp: new Date().toISOString(),
      rowCount: data.length,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Data portal service-health error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service health data' },
      { status: 500 }
    );
  }
}
