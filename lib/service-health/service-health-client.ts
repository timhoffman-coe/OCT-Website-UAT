import { fetchFromIAPService } from './iap-client';
import { API_ENDPOINTS, CACHE_TTL_SECONDS, MOCK_DASHBOARD_DATA } from './constants';
import type {
  UptrendsMonitorGroup,
  UptrendsGroupStatus,
  UptrendsStatusCode,
  ServiceGroup,
  ServiceStatus,
  ServiceHealthDashboardData,
} from './types';

// Simple in-memory cache (server-side, single Node.js process)
let cache: { data: ServiceHealthDashboardData; timestamp: number } | null = null;

function mapUptrendsStatus(status: UptrendsStatusCode): ServiceStatus {
  switch (status) {
    case 'Ok': return 'operational';
    case 'Warning':
    case 'Unconfirmed': return 'degraded';
    case 'Error': return 'outage';
    case 'Maintenance': return 'maintenance';
    case 'NoData':
    default: return 'unknown';
  }
}

function deriveOverallStatus(groups: ServiceGroup[]): ServiceStatus {
  if (groups.some(g => g.status === 'outage')) return 'outage';
  if (groups.some(g => g.status === 'degraded')) return 'degraded';
  if (groups.some(g => g.status === 'maintenance')) return 'maintenance';
  if (groups.every(g => g.status === 'operational')) return 'operational';
  return 'degraded';
}

function generateStatusMessage(name: string, status: ServiceStatus): string {
  switch (status) {
    case 'operational': return `${name} is functioning normally.`;
    case 'degraded': return `${name} is experiencing performance issues.`;
    case 'outage': return `${name} is currently offline.`;
    case 'maintenance': return `${name} is under scheduled maintenance.`;
    default: return `${name} status is unknown.`;
  }
}

export async function fetchServiceHealthData(): Promise<ServiceHealthDashboardData> {
  // Return cached data if fresh
  if (cache && (Date.now() - cache.timestamp) < CACHE_TTL_SECONDS * 1000) {
    return { ...cache.data, isFromCache: true };
  }

  try {
    // Fetch all monitor groups
    const groupsResponse = await fetchFromIAPService(API_ENDPOINTS.MONITOR_GROUPS);
    if (!groupsResponse.ok) {
      throw new Error(`Monitor groups API returned ${groupsResponse.status}`);
    }
    const monitorGroups: UptrendsMonitorGroup[] = await groupsResponse.json();

    // Fetch status for each group in parallel (skip the "All" meta-group)
    const statusPromises = monitorGroups
      .filter(g => !g.IsAll)
      .map(async (group): Promise<ServiceGroup> => {
        try {
          const statusResponse = await fetchFromIAPService(
            API_ENDPOINTS.GROUP_STATUS(group.MonitorGroupGuid)
          );
          if (!statusResponse.ok) {
            throw new Error(`Status API returned ${statusResponse.status}`);
          }
          const statusData: UptrendsGroupStatus = await statusResponse.json();

          const groupStatus = mapUptrendsStatus(statusData.OverallStatus);
          const avgUptime = statusData.Monitors.length > 0
            ? statusData.Monitors.reduce((sum, m) => sum + m.UptimePercentage, 0) / statusData.Monitors.length
            : 100;

          return {
            id: group.MonitorGroupGuid,
            name: group.Description,
            status: groupStatus,
            message: generateStatusMessage(group.Description, groupStatus),
            uptimePercentage: Math.round(avgUptime * 100) / 100,
            monitors: statusData.Monitors.map(m => ({
              id: m.MonitorGuid,
              name: m.MonitorName,
              status: mapUptrendsStatus(m.Status),
              uptimePercentage: m.UptimePercentage,
              responseTimeMs: m.ResponseTimeMs,
              lastCheck: m.LastCheck,
            })),
            lastUpdated: new Date().toISOString(),
          };
        } catch (err) {
          console.error(`Failed to fetch status for group ${group.Description}:`, err);
          return {
            id: group.MonitorGroupGuid,
            name: group.Description,
            status: 'unknown',
            message: `Unable to retrieve status for ${group.Description}.`,
            uptimePercentage: 0,
            monitors: [],
            lastUpdated: new Date().toISOString(),
          };
        }
      });

    const groups = await Promise.all(statusPromises);

    const result: ServiceHealthDashboardData = {
      groups,
      overallStatus: deriveOverallStatus(groups),
      lastFetched: new Date().toISOString(),
      isFromCache: false,
    };

    cache = { data: result, timestamp: Date.now() };
    return result;
  } catch (error) {
    console.error('Failed to fetch service health data, using mock data:', error);
    return MOCK_DASHBOARD_DATA;
  }
}
