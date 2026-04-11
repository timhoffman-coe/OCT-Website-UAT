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

  // -------------------------------------------------------------------------
  // Existing tests — must keep passing under the new bridge
  // -------------------------------------------------------------------------

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

  // -------------------------------------------------------------------------
  // NEW: Error object auto-extraction
  // -------------------------------------------------------------------------

  it('auto-extracts message/name/stack from Error instances', async () => {
    process.env.NODE_ENV = 'development';
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { logger } = await import('./logger');
    logger.error('boom', { error: new Error('oops') });
    const data = spy.mock.calls[0][2] as Record<string, unknown>;
    const err = data.error as Record<string, unknown>;
    expect(err.message).toBe('oops');
    expect(err.name).toBe('Error');
    expect(typeof err.stack).toBe('string');
  });

  it('walks Error cause chain to depth 3', async () => {
    process.env.NODE_ENV = 'development';
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { logger } = await import('./logger');
    const root = new Error('root');
    const mid = new Error('mid', { cause: root });
    const top = new Error('top', { cause: mid });
    logger.error('chain', { error: top });
    const data = spy.mock.calls[0][2] as Record<string, unknown>;
    const err = data.error as Record<string, unknown>;
    expect(err.message).toBe('top');
    const cause1 = err.cause as Record<string, unknown>;
    expect(cause1.message).toBe('mid');
    const cause2 = cause1.cause as Record<string, unknown>;
    expect(cause2.message).toBe('root');
  });

  it('preserves custom Error subclass own-properties', async () => {
    process.env.NODE_ENV = 'development';
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    class ValidationError extends Error {
      issues: string[];
      constructor(msg: string, issues: string[]) {
        super(msg);
        this.name = 'ValidationError';
        this.issues = issues;
      }
    }
    const { logger } = await import('./logger');
    logger.error('bad input', {
      error: new ValidationError('failed', ['a', 'b']),
    });
    const data = spy.mock.calls[0][2] as Record<string, unknown>;
    const err = data.error as Record<string, unknown>;
    expect(err.name).toBe('ValidationError');
    expect(err.issues).toEqual(['a', 'b']);
  });

  // -------------------------------------------------------------------------
  // NEW: Expanded sanitization
  // -------------------------------------------------------------------------

  it('redacts expanded sensitive key list', async () => {
    process.env.NODE_ENV = 'development';
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const { logger } = await import('./logger');
    logger.info('test', {
      bearer: 'b',
      jwt: 'j',
      sessionId: 's',
      access_token: 'a',
      'x-api-key': 'k',
      apiKey: 'p',
    });
    const data = spy.mock.calls[0][2] as Record<string, unknown>;
    expect(data.bearer).toBe('[REDACTED]');
    expect(data.jwt).toBe('[REDACTED]');
    expect(data.sessionId).toBe('[REDACTED]');
    expect(data.access_token).toBe('[REDACTED]');
    expect(data['x-api-key']).toBe('[REDACTED]');
    expect(data.apiKey).toBe('[REDACTED]');
  });

  it('recurses into arrays of objects when sanitizing', async () => {
    process.env.NODE_ENV = 'development';
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const { logger } = await import('./logger');
    logger.info('test', {
      users: [
        { name: 'a', password: 'x' },
        { name: 'b', token: 'y' },
      ],
    });
    const data = spy.mock.calls[0][2] as Record<string, unknown>;
    const users = data.users as Array<Record<string, unknown>>;
    expect(users[0].password).toBe('[REDACTED]');
    expect(users[0].name).toBe('a');
    expect(users[1].token).toBe('[REDACTED]');
    expect(users[1].name).toBe('b');
  });

  it('handles circular references without throwing', async () => {
    process.env.NODE_ENV = 'development';
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const { logger } = await import('./logger');
    const obj: Record<string, unknown> = { name: 'test' };
    obj.self = obj;
    expect(() => logger.info('circ', { obj })).not.toThrow();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('enforces depth limit on deeply nested objects', async () => {
    process.env.NODE_ENV = 'development';
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    // Build a 20-deep nest
    let nested: Record<string, unknown> = { leaf: 'reached' };
    for (let i = 0; i < 20; i++) {
      nested = { child: nested };
    }
    const { logger } = await import('./logger');
    logger.info('deep', { nested });
    const data = spy.mock.calls[0][2] as Record<string, unknown>;
    // Walk down — eventually we should hit '[Object]'
    let cursor: unknown = data.nested;
    for (let i = 0; i < 15; i++) {
      if (cursor === '[Object]') break;
      cursor = (cursor as Record<string, unknown>).child;
    }
    expect(cursor === '[Object]' || cursor === undefined).toBe(true);
  });

  it('truncates very long strings', async () => {
    process.env.NODE_ENV = 'development';
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const { logger } = await import('./logger');
    const huge = 'x'.repeat(15_000);
    logger.info('big', { payload: huge });
    const data = spy.mock.calls[0][2] as Record<string, unknown>;
    expect(typeof data.payload).toBe('string');
    expect((data.payload as string).length).toBeLessThan(huge.length);
    expect((data.payload as string)).toContain('[truncated');
  });

  // -------------------------------------------------------------------------
  // NEW: Request context (AsyncLocalStorage)
  // -------------------------------------------------------------------------

  it('runWithRequestContext propagates correlationId to nested logs', async () => {
    process.env.NODE_ENV = 'development';
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const { logger, runWithRequestContext } = await import('./logger');
    runWithRequestContext({ correlationId: 'abc-123' }, () => {
      logger.info('inside');
    });
    const data = spy.mock.calls[0][2] as Record<string, unknown>;
    expect(data.correlationId).toBe('abc-123');
  });

  it('explicit data overrides request context on key collision', async () => {
    process.env.NODE_ENV = 'development';
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const { logger, runWithRequestContext } = await import('./logger');
    runWithRequestContext({ correlationId: 'from-ctx' }, () => {
      logger.info('inside', { correlationId: 'from-call' });
    });
    const data = spy.mock.calls[0][2] as Record<string, unknown>;
    expect(data.correlationId).toBe('from-call');
  });

  it('child context merges with request context', async () => {
    process.env.NODE_ENV = 'development';
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const { logger, runWithRequestContext } = await import('./logger');
    runWithRequestContext({ correlationId: 'abc' }, () => {
      const child = logger.child({ module: 'auth' });
      child.info('login');
    });
    const data = spy.mock.calls[0][2] as Record<string, unknown>;
    expect(data.correlationId).toBe('abc');
    expect(data.module).toBe('auth');
  });

  it('runWithRequestContext invokes the callback exactly once', async () => {
    const { runWithRequestContext } = await import('./logger');
    const fn = vi.fn(() => 42);
    const result = runWithRequestContext({ x: 1 }, fn);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(result).toBe(42);
  });

  // -------------------------------------------------------------------------
  // NEW: Metrics helpers (no-op when SDK disabled, but should not throw)
  // -------------------------------------------------------------------------

  it('metrics.counter is callable without throwing', async () => {
    const { metrics } = await import('./logger');
    expect(() => metrics.counter('test.counter')).not.toThrow();
    expect(() => metrics.counter('test.counter', { tag: 'a' })).not.toThrow();
  });

  it('metrics.histogram is callable without throwing', async () => {
    const { metrics } = await import('./logger');
    expect(() => metrics.histogram('test.histogram', 42)).not.toThrow();
    expect(() => metrics.histogram('test.histogram', 99, { tag: 'b' })).not.toThrow();
  });

  it('metrics.gauge is callable without throwing', async () => {
    const { metrics } = await import('./logger');
    expect(() => metrics.gauge('test.gauge', 7)).not.toThrow();
  });

  // -------------------------------------------------------------------------
  // NEW: trace helpers
  // -------------------------------------------------------------------------

  it('trace.span runs the callback and returns its value', async () => {
    const { trace } = await import('./logger');
    const result = await trace.span('test.span', async () => {
      return 'hello';
    });
    expect(result).toBe('hello');
  });

  it('trace.span re-throws errors from the callback', async () => {
    const { trace } = await import('./logger');
    await expect(
      trace.span('test.span', async () => {
        throw new Error('inner failure');
      }),
    ).rejects.toThrow('inner failure');
  });
});
