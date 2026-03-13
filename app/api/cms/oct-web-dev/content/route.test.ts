import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockReadFileSync } = vi.hoisted(() => ({
  mockReadFileSync: vi.fn(),
}));

vi.mock('fs', () => ({
  default: { readFileSync: mockReadFileSync },
  readFileSync: mockReadFileSync,
}));

vi.mock('@/lib/auth', () => ({
  requireOctWebDevAccess: vi.fn(),
}));

import { GET } from './route';
import { requireOctWebDevAccess } from '@/lib/auth';

describe('GET /api/cms/oct-web-dev/content', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns markdown content when authorized', async () => {
    vi.mocked(requireOctWebDevAccess).mockResolvedValue({} as never);
    mockReadFileSync.mockReturnValue('# Test Content');
    const res = await GET();
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({ content: '# Test Content' });
  });

  it('returns 403 when forbidden', async () => {
    vi.mocked(requireOctWebDevAccess).mockRejectedValue(new Error('Forbidden: No access'));
    const res = await GET();
    expect(res.status).toBe(403);
    const json = await res.json();
    expect(json).toEqual({ error: 'Access denied' });
  });

  it('returns 500 on file read error', async () => {
    vi.mocked(requireOctWebDevAccess).mockResolvedValue({} as never);
    mockReadFileSync.mockImplementation(() => {
      throw new Error('ENOENT');
    });
    const res = await GET();
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json).toEqual({ error: 'Failed to load content' });
  });
});
