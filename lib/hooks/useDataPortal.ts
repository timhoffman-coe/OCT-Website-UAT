import { useState, useEffect, useCallback } from 'react';
import { reportError } from '@/lib/report-client-error';
import type {
  DataPortalResponse,
  IncidentMetric,
  BudgetActual,
  ServiceHealthRecord,
  DateRange,
} from '@/lib/data/data-portal-types';

interface UseDataPortalResult<T> {
  data: T[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

function useDataPortalFetch<T>(url: string): UseDataPortalResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchKey, setFetchKey] = useState(0);

  const refetch = useCallback(() => setFetchKey(k => k + 1), []);

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- loading/error state before async fetch
    setIsLoading(true);
     
    setError(null);

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        return res.json() as Promise<DataPortalResponse<T>>;
      })
      .then(result => {
        if (!cancelled) {
          setData(result.data);
        }
      })
      .catch(err => {
        if (!cancelled) {
          reportError(err instanceof Error ? err : String(err), { module: 'data-portal' });
          setError(err.message);
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => { cancelled = true; };
  }, [url, fetchKey]);

  return { data, isLoading, error, refetch };
}

export function useIncidentMetrics(range?: DateRange): UseDataPortalResult<IncidentMetric> {
  const params = new URLSearchParams();
  if (range?.startDate) params.set('startDate', range.startDate);
  if (range?.endDate) params.set('endDate', range.endDate);
  const query = params.toString();
  return useDataPortalFetch<IncidentMetric>(`/api/data-portal/incidents${query ? `?${query}` : ''}`);
}

export function useBudgetActuals(fiscalYear?: number): UseDataPortalResult<BudgetActual> {
  const year = fiscalYear || new Date().getFullYear();
  return useDataPortalFetch<BudgetActual>(`/api/data-portal/budget-actuals?year=${year}`);
}

export function useServiceHealth(): UseDataPortalResult<ServiceHealthRecord> {
  return useDataPortalFetch<ServiceHealthRecord>('/api/data-portal/service-health');
}
