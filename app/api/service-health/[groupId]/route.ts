import { NextRequest, NextResponse } from 'next/server';
import { fetchFromIAPService } from '@/lib/service-health/iap-client';
import { API_ENDPOINTS } from '@/lib/service-health/constants';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ groupId: string }> }
) {
  const { groupId } = await params;

  if (!groupId || groupId.length > 100) {
    return NextResponse.json({ error: 'Invalid group ID' }, { status: 400 });
  }

  try {
    const response = await fetchFromIAPService(API_ENDPOINTS.GROUP_STATUS(groupId));
    if (!response.ok) {
      throw new Error(`Upstream API returned ${response.status}`);
    }
    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, max-age=30, stale-while-revalidate=60',
      },
    });
  } catch (error) {
    console.error(`Group status API error for ${groupId}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch group status' },
      { status: 500 }
    );
  }
}
