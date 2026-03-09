export const flags = {
  roadmapEditing: process.env.FF_ROADMAP_EDITING === 'true',
  dataPortal: process.env.FF_DATA_PORTAL === 'true',
  vendorDashboard: process.env.FF_VENDOR_DASHBOARD === 'true',
} as const;
