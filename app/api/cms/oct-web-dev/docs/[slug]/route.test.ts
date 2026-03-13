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

function makeRequest(slug: string) {
  const request = new Request(`http://localhost/api/cms/oct-web-dev/docs/${slug}`);
  const params = Promise.resolve({ slug });
  return { request, params };
}

describe('GET /api/cms/oct-web-dev/docs/[slug]', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns document content for valid slug', async () => {
    vi.mocked(requireOctWebDevAccess).mockResolvedValue({} as never);
    mockReadFileSync.mockReturnValue('# CI/CD Pipeline');
    const { request, params } = makeRequest('cicd-pipeline');
    const res = await GET(request, { params });
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({ content: '# CI/CD Pipeline' });
  });

  it('returns 404 for invalid slug', async () => {
    vi.mocked(requireOctWebDevAccess).mockResolvedValue({} as never);
    const { request, params } = makeRequest('nonexistent-doc');
    const res = await GET(request, { params });
    expect(res.status).toBe(404);
    const json = await res.json();
    expect(json).toEqual({ error: 'Document not found' });
  });

  it('returns 403 when forbidden', async () => {
    vi.mocked(requireOctWebDevAccess).mockRejectedValue(new Error('Forbidden: No access'));
    const { request, params } = makeRequest('cicd-pipeline');
    const res = await GET(request, { params });
    expect(res.status).toBe(403);
    const json = await res.json();
    expect(json).toEqual({ error: 'Access denied' });
  });

  it('returns 500 on file read error', async () => {
    vi.mocked(requireOctWebDevAccess).mockResolvedValue({} as never);
    mockReadFileSync.mockImplementation(() => {
      throw new Error('ENOENT');
    });
    const { request, params } = makeRequest('cicd-pipeline');
    const res = await GET(request, { params });
    expect(res.status).toBe(500);
    const json = await res.json();
    expect(json).toEqual({ error: 'Failed to load document' });
  });

  it('works for all allowed slugs', async () => {
    vi.mocked(requireOctWebDevAccess).mockResolvedValue({} as never);
    mockReadFileSync.mockReturnValue('content');

    const allowedSlugs = [
      'cicd-pipeline',
      'prisma-migration-workflow',
      'cms-overview',
      'api-reference',
      'architecture-overview',
      'development-setup',
      'deployment-guide',
      'cms-admin-guide',
    ];

    for (const slug of allowedSlugs) {
      const { request, params } = makeRequest(slug);
      const res = await GET(request, { params });
      expect(res.status).toBe(200);
    }
  });
});
