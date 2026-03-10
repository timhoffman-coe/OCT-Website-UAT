export const flags = {
  dataPortal: process.env.FF_DATA_PORTAL === 'true',
  vendorDashboard: process.env.FF_VENDOR_DASHBOARD === 'true',
} as const;
