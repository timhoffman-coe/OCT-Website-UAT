import { NextResponse } from 'next/server';
import { fetchServiceHealthData } from '@/lib/service-health/service-health-client';

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
    console.error('Service health API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service health data' },
      { status: 500 }
    );
  }
}
