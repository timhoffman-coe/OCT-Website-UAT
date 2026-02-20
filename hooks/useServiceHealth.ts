'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { ServiceHealthDashboardData } from '@/lib/service-health/types';
import { MOCK_DASHBOARD_DATA } from '@/lib/service-health/constants';

const POLL_INTERVAL_MS = 30_000;

export function useServiceHealth(pollInterval = POLL_INTERVAL_MS) {
  const [data, setData] = useState<ServiceHealthDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasRealData = useRef(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/api/service-health');
      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }
      const result: ServiceHealthDashboardData = await response.json();
      setData(result);
      setError(null);
      hasRealData.current = true;
    } catch (err) {
      console.error('Failed to fetch service health data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      // Only fall back to mock data if we never received real data
      if (!hasRealData.current) {
        setData(MOCK_DASHBOARD_DATA);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, pollInterval);
    return () => clearInterval(interval);
  }, [fetchData, pollInterval]);

  return { data, isLoading, error, refetch: fetchData };
}
