import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: { findUnique: vi.fn() },
    octWebDevPermission: {
      findUnique: vi.fn(),
      findUniqueOrThrow: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
    },
    auditLog: { create: vi.fn() },
  },
}));
vi.mock('@/lib/auth', () => ({
  requireSuperAdmin: vi.fn(),
}));

import { prisma } from '@/lib/prisma';
import { requireSuperAdmin } from '@/lib/auth';
import { addOctWebDevViewer, removeOctWebDevViewer } from './oct-web-dev-permission-actions';

const adminUser = { id: 'admin-1', email: 'admin@edmonton.ca', role: 'SUPER_ADMIN' };

describe('addOctWebDevViewer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(requireSuperAdmin).mockResolvedValue(adminUser as never);
  });

  it('creates permission and audit log for existing user', async () => {
    const user = { id: 'user-1', email: 'dev@edmonton.ca', name: 'Dev User' };
    vi.mocked(prisma.user.findUnique).mockResolvedValue(user as never);
    vi.mocked(prisma.octWebDevPermission.findUnique).mockResolvedValue(null as never);
    vi.mocked(prisma.octWebDevPermission.create).mockResolvedValue({ id: 'perm-1', userId: 'user-1' } as never);
    vi.mocked(prisma.auditLog.create).mockResolvedValue({} as never);

    const result = await addOctWebDevViewer('dev@edmonton.ca');

    expect(result).toEqual({ id: 'perm-1', userId: 'user-1' });
    expect(prisma.octWebDevPermission.create).toHaveBeenCalledWith({
      data: { userId: 'user-1' },
    });
    expect(prisma.auditLog.create).toHaveBeenCalledWith({
      data: {
        userId: 'admin-1',
        action: 'CREATE',
        entity: 'OctWebDevPermission',
        entityId: 'perm-1',
        changes: { email: 'dev@edmonton.ca', userName: 'Dev User' },
      },
    });
  });

  it('throws when user not found', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(null as never);
    await expect(addOctWebDevViewer('nobody@edmonton.ca')).rejects.toThrow(
      'User not found'
    );
  });

  it('throws when user already has permission', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue({ id: 'user-1' } as never);
    vi.mocked(prisma.octWebDevPermission.findUnique).mockResolvedValue({ id: 'existing' } as never);
    await expect(addOctWebDevViewer('dev@edmonton.ca')).rejects.toThrow(
      'already has OCT-Web-Dev view access'
    );
  });
});

describe('removeOctWebDevViewer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(requireSuperAdmin).mockResolvedValue(adminUser as never);
  });

  it('deletes permission and creates audit log', async () => {
    vi.mocked(prisma.octWebDevPermission.findUniqueOrThrow).mockResolvedValue({
      id: 'perm-1',
      user: { email: 'dev@edmonton.ca', name: 'Dev User' },
    } as never);
    vi.mocked(prisma.octWebDevPermission.delete).mockResolvedValue({} as never);
    vi.mocked(prisma.auditLog.create).mockResolvedValue({} as never);

    await removeOctWebDevViewer('perm-1');

    expect(prisma.octWebDevPermission.delete).toHaveBeenCalledWith({
      where: { id: 'perm-1' },
    });
    expect(prisma.auditLog.create).toHaveBeenCalledWith({
      data: {
        userId: 'admin-1',
        action: 'DELETE',
        entity: 'OctWebDevPermission',
        entityId: 'perm-1',
        changes: { email: 'dev@edmonton.ca', name: 'Dev User' },
      },
    });
  });

  it('throws when permission not found', async () => {
    vi.mocked(prisma.octWebDevPermission.findUniqueOrThrow).mockRejectedValue(
      new Error('Record not found')
    );
    await expect(removeOctWebDevViewer('nonexistent')).rejects.toThrow('Record not found');
  });
});
