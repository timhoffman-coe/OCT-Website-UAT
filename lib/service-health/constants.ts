import type { ServiceGroup, ServiceHealthDashboardData } from './types';

export const SERVICEHEALTH_BASE_URL =
  process.env.SERVICEHEALTH_API_BASE_URL || 'https://servicehealth-prod.edmonton.ca';

export const API_ENDPOINTS = {
  MONITOR_GROUPS: `${SERVICEHEALTH_BASE_URL}/api/uptrends/monitor-groups`,
  MONITOR_GROUPS_WITH_AUTH: `${SERVICEHEALTH_BASE_URL}/api/uptrends/monitor-groups/with-authorizations-grouped`,
  GROUP_STATUS: (guid: string) =>
    `${SERVICEHEALTH_BASE_URL}/api/uptrends/GroupStatus?monitorGroupGuid=${encodeURIComponent(guid)}`,
};

/** Cache TTL in seconds */
export const CACHE_TTL_SECONDS = 30;

/** Map Uptrends group descriptions to lucide-react icon names */
export const SERVICE_ICON_MAP: Record<string, string> = {
  'CISO': 'Shield',
  'Citizen Services': 'Users',
  'Corporate Services': 'Briefcase',
  'Financial Services': 'CreditCard',
  'Fire Rescue': 'Flame',
  'Network Services': 'Network',
  'POSSE': 'FileText',
  'Enterprise Systems': 'Database',
  'Transit Services': 'Bus',
};

const MOCK_SERVICE_GROUPS: ServiceGroup[] = [
  { id: 'mock-ciso', name: 'CISO', status: 'operational', message: 'Security services are functioning normally.', uptimePercentage: 99.9, monitors: [], lastUpdated: new Date().toISOString() },
  { id: 'mock-citizen', name: 'Citizen Services', status: 'operational', message: 'Public-facing portals and services are online.', uptimePercentage: 99.8, monitors: [], lastUpdated: new Date().toISOString() },
  { id: 'mock-corporate', name: 'Corporate Services', status: 'operational', message: 'Internal services are functioning normally.', uptimePercentage: 99.5, monitors: [], lastUpdated: new Date().toISOString() },
  { id: 'mock-financial', name: 'Financial Services', status: 'operational', message: 'All payment and billing systems are normal.', uptimePercentage: 99.9, monitors: [], lastUpdated: new Date().toISOString() },
  { id: 'mock-fire', name: 'Fire Rescue', status: 'operational', message: 'Dispatch and rescue systems are online.', uptimePercentage: 99.9, monitors: [], lastUpdated: new Date().toISOString() },
  { id: 'mock-network', name: 'Network Services', status: 'operational', message: 'Core network infrastructure is stable.', uptimePercentage: 99.9, monitors: [], lastUpdated: new Date().toISOString() },
  { id: 'mock-posse', name: 'POSSE', status: 'operational', message: 'Permitting and licensing systems are working.', uptimePercentage: 99.7, monitors: [], lastUpdated: new Date().toISOString() },
  { id: 'mock-enterprise', name: 'Enterprise Systems', status: 'operational', message: 'ERP and CRM platforms are fully operational.', uptimePercentage: 99.8, monitors: [], lastUpdated: new Date().toISOString() },
  { id: 'mock-transit', name: 'Transit Services', status: 'operational', message: 'Real-time tracking and scheduling are online.', uptimePercentage: 99.6, monitors: [], lastUpdated: new Date().toISOString() },
];

export const MOCK_DASHBOARD_DATA: ServiceHealthDashboardData = {
  groups: MOCK_SERVICE_GROUPS,
  overallStatus: 'operational',
  lastFetched: new Date().toISOString(),
  isFromCache: false,
};
