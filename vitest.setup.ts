import '@testing-library/jest-dom/vitest';

// Disable the OpenTelemetry SDK during tests so the logger bridge / metrics
// helpers stay as no-ops and never try to reach a collector. The OTel API
// is still callable — it just won't have a registered provider, which is
// the documented "safe to call from anywhere" behavior.
process.env.OTEL_SDK_DISABLED = 'true';

// Global mock for next/headers
vi.mock('next/headers', () => ({
  headers: vi.fn(() => new Headers()),
}));

// Global mock for next/cache
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn(),
}));
