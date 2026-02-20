import { NextResponse } from 'next/server';
import { fetchFromIAPService } from '@/lib/service-health/iap-client';
import { API_ENDPOINTS } from '@/lib/service-health/constants';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const response = await fetchFromIAPService(API_ENDPOINTS.MONITOR_GROUPS_WITH_AUTH);
    if (!response.ok) {
      throw new Error(`Upstream API returned ${response.status}`);
    }
    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Monitor groups API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch monitor groups' },
      { status: 500 }
    );
  }
}
