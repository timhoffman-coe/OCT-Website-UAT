import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// We need to test the module fresh each time to pick up env changes
describe('logger', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  it('emits debug logs in development', async () => {
    process.env.NODE_ENV = 'development';
    const spy = vi.spyOn(console, 'debug').mockImplementation(() => {});
    const { logger } = await import('./logger');
    logger.debug('test message');
    expect(spy).toHaveBeenCalledWith('[DEBUG]', 'test message', '');
  });

  it('suppresses debug logs in production (default INFO level)', async () => {
    process.env.NODE_ENV = 'production';
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const debugSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});
    const { logger } = await import('./logger');
    logger.debug('should not appear');
    expect(spy).not.toHaveBeenCalled();
    expect(debugSpy).not.toHaveBeenCalled();
  });

  it('emits info logs in production as structured JSON', async () => {
    process.env.NODE_ENV = 'production';
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const { logger } = await import('./logger');
    logger.info('deploy started');
    expect(spy).toHaveBeenCalledTimes(1);
    const json = JSON.parse(spy.mock.calls[0][0] as string);
    expect(json.severity).toBe('INFO');
    expect(json.message).toBe('deploy started');
    expect(json.timestamp).toBeDefined();
  });

  it('uses console.error for ERROR level', async () => {
    process.env.NODE_ENV = 'development';
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { logger } = await import('./logger');
    logger.error('something broke');
    expect(spy).toHaveBeenCalledWith('[ERROR]', 'something broke', '');
  });

  it('sanitizes sensitive keys', async () => {
    process.env.NODE_ENV = 'development';
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const { logger } = await import('./logger');
    logger.info('auth', { password: 'secret123', user: 'josh' });
    const data = spy.mock.calls[0][2] as Record<string, unknown>;
    expect(data.password).toBe('[REDACTED]');
    expect(data.user).toBe('josh');
  });

  it('sanitizes nested sensitive keys', async () => {
    process.env.NODE_ENV = 'development';
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const { logger } = await import('./logger');
    logger.info('auth', { credentials: { token: 'abc', name: 'test' } });
    const data = spy.mock.calls[0][2] as Record<string, unknown>;
    const nested = data.credentials as Record<string, unknown>;
    expect(nested.token).toBe('[REDACTED]');
    expect(nested.name).toBe('test');
  });

  it('child logger merges context', async () => {
    process.env.NODE_ENV = 'development';
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const { logger } = await import('./logger');
    const child = logger.child({ module: 'auth' });
    child.info('login');
    const data = spy.mock.calls[0][2] as Record<string, unknown>;
    expect(data.module).toBe('auth');
  });

  it('respects LOG_LEVEL env var', async () => {
    process.env.NODE_ENV = 'development';
    process.env.LOG_LEVEL = 'ERROR';
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { logger } = await import('./logger');
    logger.info('should not appear');
    logger.warn('should not appear');
    logger.error('should appear');
    expect(logSpy).not.toHaveBeenCalled();
    expect(warnSpy).not.toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalledTimes(1);
  });

  it('startTimer logs elapsed duration', async () => {
    process.env.NODE_ENV = 'development';
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const { logger } = await import('./logger');
    const stop = logger.startTimer('db-query');
    // Simulate a small delay
    stop({ rows: 42 });
    expect(spy).toHaveBeenCalledTimes(1);
    const data = spy.mock.calls[0][2] as Record<string, unknown>;
    expect(data).toHaveProperty('durationMs');
    expect(data.rows).toBe(42);
  });
});
