import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

// Mock all heavy dependencies
vi.mock('next/dynamic', () => ({
  default: () => {
    const MockComponent = () => <div data-testid="mock-arch-flow">Architecture Flow</div>;
    MockComponent.displayName = 'MockDynamic';
    return MockComponent;
  },
}));

vi.mock('@/components/Header', () => ({
  default: () => <header data-testid="header">Header</header>,
}));

vi.mock('@/components/Footer', () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}));

import OctWebDevPage from './page';

function mockFetch(responses: Record<string, { ok: boolean; json: () => unknown }>) {
  return vi.fn((url: string) => {
    for (const [pattern, response] of Object.entries(responses)) {
      if (url.includes(pattern)) {
        return Promise.resolve({
          ok: response.ok,
          json: () => Promise.resolve(response.json()),
        });
      }
    }
    return Promise.resolve({ ok: false, json: () => Promise.resolve({}) });
  });
}

describe('OctWebDevPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading state initially', () => {
    global.fetch = vi.fn(() => new Promise(() => {})) as unknown as typeof fetch;
    render(<OctWebDevPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows access restricted when canView is false', async () => {
    global.fetch = mockFetch({
      'check-access': { ok: true, json: () => ({ canView: false }) },
    }) as unknown as typeof fetch;

    render(<OctWebDevPage />);
    await waitFor(() => {
      expect(screen.getByText('Access Restricted')).toBeInTheDocument();
    });
  });

  it('renders tabs when user has access', async () => {
    const sampleContent = `# Project
## Phase 1
### Setup
- [x] Task one
- [ ] Task two
## Phase 2
### Build
- [ ] Task three
`;

    global.fetch = mockFetch({
      'check-access': { ok: true, json: () => ({ canView: true }) },
      'content': { ok: true, json: () => ({ content: sampleContent }) },
      'docs/': { ok: true, json: () => ({ content: '# Doc' }) },
    }) as unknown as typeof fetch;

    render(<OctWebDevPage />);
    await waitFor(() => {
      expect(screen.getByText('Design')).toBeInTheDocument();
      expect(screen.getByText('Docs')).toBeInTheDocument();
      expect(screen.getByText('Progress')).toBeInTheDocument();
    });
  });

  it('displays overall progress percentage', async () => {
    const sampleContent = `# Project
## Phase 1
- [x] Done
- [x] Done too
- [ ] Not done
`;

    global.fetch = mockFetch({
      'check-access': { ok: true, json: () => ({ canView: true }) },
      'content': { ok: true, json: () => ({ content: sampleContent }) },
      'docs/': { ok: true, json: () => ({ content: '# Doc' }) },
    }) as unknown as typeof fetch;

    render(<OctWebDevPage />);
    await waitFor(() => {
      expect(screen.getByText('67%')).toBeInTheDocument();
      expect(screen.getByText('2 of 3 tasks')).toBeInTheDocument();
    });
  });

  it('correctly parses multiple phases with accurate counts', async () => {
    const sampleContent = `# Project Title
## Foundation
### Setup
- [x] Task A
- [x] Task B
### Config
- [x] Task C
- [ ] Task D
## Security
### Auth
- [ ] Task E
- [ ] Task F
- [ ] Task G
`;

    global.fetch = mockFetch({
      'check-access': { ok: true, json: () => ({ canView: true }) },
      'content': { ok: true, json: () => ({ content: sampleContent }) },
      'docs/': { ok: true, json: () => ({ content: '# Doc' }) },
    }) as unknown as typeof fetch;

    render(<OctWebDevPage />);
    // 3 done out of 7 total = 43%
    await waitFor(() => {
      expect(screen.getByText('43%')).toBeInTheDocument();
      expect(screen.getByText('3 of 7 tasks')).toBeInTheDocument();
    });
  });
});
