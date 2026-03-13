import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('env validation', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it('passes validation with valid DATABASE_URL', async () => {
    process.env.DATABASE_URL = 'postgresql://user:pass@localhost:5432/db';
    const { env } = await import('./env');
    expect(env.DATABASE_URL).toBe('postgresql://user:pass@localhost:5432/db');
  });

  it('warns but does not crash when DATABASE_URL is missing', async () => {
    delete process.env.DATABASE_URL;
    // The module logs a warning but returns process.env as fallback
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'debug').mockImplementation(() => {});
    const { env } = await import('./env');
    // Should still return an env object (fallback to process.env)
    expect(env).toBeDefined();
    warnSpy.mockRestore();
  });

  it('validates optional fields when present', async () => {
    process.env.DATABASE_URL = 'postgresql://user:pass@localhost:5432/db';
    process.env.NODE_ENV = 'test';
    process.env.LOG_LEVEL = 'DEBUG';
    const { env } = await import('./env');
    expect(env.NODE_ENV).toBe('test');
    expect(env.LOG_LEVEL).toBe('DEBUG');
  });
});
