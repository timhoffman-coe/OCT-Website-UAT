import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('feature-flags', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('dataPortal is true when FF_DATA_PORTAL=true', async () => {
    process.env.FF_DATA_PORTAL = 'true';
    const { flags } = await import('./feature-flags');
    expect(flags.dataPortal).toBe(true);
  });

  it('dataPortal is false when FF_DATA_PORTAL is not set', async () => {
    delete process.env.FF_DATA_PORTAL;
    const { flags } = await import('./feature-flags');
    expect(flags.dataPortal).toBe(false);
  });

  it('vendorDashboard is true when FF_VENDOR_DASHBOARD=true', async () => {
    process.env.FF_VENDOR_DASHBOARD = 'true';
    const { flags } = await import('./feature-flags');
    expect(flags.vendorDashboard).toBe(true);
  });

  it('vendorDashboard is false when FF_VENDOR_DASHBOARD=false', async () => {
    process.env.FF_VENDOR_DASHBOARD = 'false';
    const { flags } = await import('./feature-flags');
    expect(flags.vendorDashboard).toBe(false);
  });
});
