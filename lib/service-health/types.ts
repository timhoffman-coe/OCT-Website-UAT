// ---- Raw Uptrends API Response Types ----

/** Response item from /api/uptrends/monitor-groups */
export interface UptrendsMonitorGroup {
  MonitorGroupGuid: string;
  Description: string;
  IsAll: boolean;
}

/** Response item from /api/uptrends/monitor-groups/with-authorizations-grouped */
export interface UptrendsMonitorGroupWithAuth {
  MonitorGroupGuid: string;
  Description: string;
  IsAll: boolean;
  Authorizations?: string[];
}

/** Response from /api/uptrends/GroupStatus?monitorGroupGuid=<guid> */
export interface UptrendsGroupStatus {
  MonitorGroupGuid: string;
  MonitorGroupDescription: string;
  Monitors: UptrendsMonitorStatus[];
  OverallStatus: UptrendsStatusCode;
}

export interface UptrendsMonitorStatus {
  MonitorGuid: string;
  MonitorName: string;
  Status: UptrendsStatusCode;
  LastCheck: string;
  UptimePercentage: number;
  ResponseTimeMs: number;
}

export type UptrendsStatusCode =
  | 'Ok'
  | 'Unconfirmed'
  | 'Warning'
  | 'Error'
  | 'NoData'
  | 'Maintenance';

// ---- Normalized Types for Dashboard ----

export type ServiceStatus = 'operational' | 'degraded' | 'outage' | 'maintenance' | 'unknown';

export interface ServiceGroup {
  id: string;
  name: string;
  status: ServiceStatus;
  message: string;
  uptimePercentage: number;
  monitors: MonitorSummary[];
  lastUpdated: string;
}

export interface MonitorSummary {
  id: string;
  name: string;
  status: ServiceStatus;
  uptimePercentage: number;
  responseTimeMs: number;
  lastCheck: string;
}

export interface ServiceHealthDashboardData {
  groups: ServiceGroup[];
  overallStatus: ServiceStatus;
  lastFetched: string;
  isFromCache: boolean;
}
