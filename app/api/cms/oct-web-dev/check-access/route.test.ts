import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/auth', () => ({
  canViewOctWebDev: vi.fn(),
}));
vi.mock('@/lib/logger', () => ({
  logger: { error: vi.fn(), info: vi.fn(), warn: vi.fn(), debug: vi.fn() },
}));

import { GET } from './route';
import { canViewOctWebDev } from '@/lib/auth';

describe('GET /api/cms/oct-web-dev/check-access', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns canView: true when user has access', async () => {
    vi.mocked(canViewOctWebDev).mockResolvedValue(true);
    const res = await GET();
    const json = await res.json();
    expect(json).toEqual({ canView: true });
  });

  it('returns canView: false when user does not have access', async () => {
    vi.mocked(canViewOctWebDev).mockResolvedValue(false);
    const res = await GET();
    const json = await res.json();
    expect(json).toEqual({ canView: false });
  });

  it('returns canView: false on error', async () => {
    vi.mocked(canViewOctWebDev).mockRejectedValue(new Error('DB down'));
    const res = await GET();
    const json = await res.json();
    expect(json).toEqual({ canView: false });
  });
});
