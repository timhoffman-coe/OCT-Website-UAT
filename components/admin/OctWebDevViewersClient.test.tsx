import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

vi.mock('@/lib/actions/oct-web-dev-permission-actions', () => ({
  addOctWebDevViewer: vi.fn(),
  removeOctWebDevViewer: vi.fn(),
}));

import OctWebDevViewersClient from './OctWebDevViewersClient';
import { addOctWebDevViewer } from '@/lib/actions/oct-web-dev-permission-actions';

const mockViewers = [
  {
    id: 'perm-1',
    createdAt: new Date('2025-01-15'),
    user: { id: 'user-1', email: 'dev@edmonton.ca', name: 'Dev User', role: 'VIEWER' },
  },
];

const mockUsers = [
  { id: 'user-1', email: 'dev@edmonton.ca', name: 'Dev User', role: 'VIEWER' },
  { id: 'user-2', email: 'new@edmonton.ca', name: 'New User', role: 'TEAM_ADMIN' },
  { id: 'user-3', email: 'admin@edmonton.ca', name: 'Admin User', role: 'SUPER_ADMIN' },
];

describe('OctWebDevViewersClient', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the viewer list', () => {
    render(<OctWebDevViewersClient viewers={mockViewers} users={mockUsers} />);
    expect(screen.getByText('Dev User')).toBeInTheDocument();
    expect(screen.getByText('dev@edmonton.ca')).toBeInTheDocument();
    expect(screen.getByText('OCT-Web-Dev Viewers (1)')).toBeInTheDocument();
  });

  it('shows empty state when no viewers', () => {
    render(<OctWebDevViewersClient viewers={[]} users={mockUsers} />);
    expect(screen.getByText(/No viewers added yet/)).toBeInTheDocument();
  });

  it('filters out SUPER_ADMIN and existing viewers from available users', () => {
    render(<OctWebDevViewersClient viewers={mockViewers} users={mockUsers} />);
    const select = screen.getByRole('combobox');
    const options = Array.from(select.querySelectorAll('option'));
    const optionTexts = options.map(o => o.textContent);
    // Should only show user-2 (New User). user-1 already has access, user-3 is SUPER_ADMIN
    expect(optionTexts).toContain('New User (new@edmonton.ca)');
    expect(optionTexts).not.toContain('Dev User (dev@edmonton.ca)');
    expect(optionTexts).not.toContain('Admin User (admin@edmonton.ca)');
  });

  it('disables add button when no user selected', () => {
    render(<OctWebDevViewersClient viewers={mockViewers} users={mockUsers} />);
    const addButton = screen.getByRole('button', { name: /Add/i });
    expect(addButton).toBeDisabled();
  });

  it('calls addOctWebDevViewer on add', async () => {
    const user = userEvent.setup();
    vi.mocked(addOctWebDevViewer).mockResolvedValue({ id: 'perm-new', userId: 'user-2' } as never);

    render(<OctWebDevViewersClient viewers={mockViewers} users={mockUsers} />);
    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'user-2');

    const addButton = screen.getByRole('button', { name: /Add/i });
    await user.click(addButton);

    expect(addOctWebDevViewer).toHaveBeenCalledWith('new@edmonton.ca');
  });

  it('shows the super admin note', () => {
    render(<OctWebDevViewersClient viewers={mockViewers} users={mockUsers} />);
    expect(screen.getByText(/Super Admins automatically have/)).toBeInTheDocument();
  });
});
