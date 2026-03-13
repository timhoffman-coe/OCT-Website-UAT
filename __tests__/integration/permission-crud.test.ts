import { describe, it, expect, vi, beforeEach } from 'vitest';

// Stateful mock to simulate real DB behavior
const permissionStore = new Map<string, { id: string; userId: string }>();
const auditLogs: Array<{ action: string; entity: string; entityId: string }> = [];
let nextPermId = 1;

vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn((args: { where: { email: string } }) => {
        if (args.where.email === 'dev@edmonton.ca') {
          return Promise.resolve({ id: 'user-1', email: 'dev@edmonton.ca', name: 'Dev User' });
        }
        return Promise.resolve(null);
      }),
    },
    octWebDevPermission: {
      findUnique: vi.fn((args: { where: { userId?: string; id?: string } }) => {
        const key = args.where.userId || args.where.id;
        return Promise.resolve(key ? permissionStore.get(key) || null : null);
      }),
      findUniqueOrThrow: vi.fn((args: { where: { id: string }; include?: unknown }) => {
        const perm = permissionStore.get(args.where.id);
        if (!perm) return Promise.reject(new Error('Record not found'));
        return Promise.resolve({
          ...perm,
          user: { email: 'dev@edmonton.ca', name: 'Dev User' },
        });
      }),
      create: vi.fn((args: { data: { userId: string } }) => {
        const id = `perm-${nextPermId++}`;
        const perm = { id, userId: args.data.userId };
        permissionStore.set(args.data.userId, perm);
        permissionStore.set(id, perm);
        return Promise.resolve(perm);
      }),
      delete: vi.fn((args: { where: { id: string } }) => {
        const perm = permissionStore.get(args.where.id);
        if (perm) {
          permissionStore.delete(perm.userId);
          permissionStore.delete(perm.id);
        }
        return Promise.resolve(perm);
      }),
    },
    auditLog: {
      create: vi.fn((args: { data: { action: string; entity: string; entityId: string } }) => {
        auditLogs.push({
          action: args.data.action,
          entity: args.data.entity,
          entityId: args.data.entityId,
        });
        return Promise.resolve({});
      }),
    },
  },
}));

vi.mock('@/lib/auth', () => ({
  requireSuperAdmin: vi.fn(() =>
    Promise.resolve({ id: 'admin-1', email: 'admin@edmonton.ca', role: 'SUPER_ADMIN' })
  ),
}));

import { addOctWebDevViewer, removeOctWebDevViewer } from '@/lib/actions/oct-web-dev-permission-actions';

describe('Permission CRUD integration', () => {
  beforeEach(() => {
    permissionStore.clear();
    auditLogs.length = 0;
    nextPermId = 1;
  });

  it('completes full add → remove lifecycle with audit trail', async () => {
    // Step 1: Add a viewer
    const permission = await addOctWebDevViewer('dev@edmonton.ca');
    expect(permission.id).toBe('perm-1');
    expect(permission.userId).toBe('user-1');

    // Verify audit log for creation
    expect(auditLogs).toHaveLength(1);
    expect(auditLogs[0]).toEqual({
      action: 'CREATE',
      entity: 'OctWebDevPermission',
      entityId: 'perm-1',
    });

    // Step 2: Verify the permission exists
    expect(permissionStore.has('user-1')).toBe(true);

    // Step 3: Remove the viewer
    await removeOctWebDevViewer('perm-1');

    // Verify audit log for deletion
    expect(auditLogs).toHaveLength(2);
    expect(auditLogs[1]).toEqual({
      action: 'DELETE',
      entity: 'OctWebDevPermission',
      entityId: 'perm-1',
    });

    // Step 4: Verify permission is gone
    expect(permissionStore.has('user-1')).toBe(false);
    expect(permissionStore.has('perm-1')).toBe(false);
  });

  it('prevents adding duplicate permissions', async () => {
    // First add succeeds
    await addOctWebDevViewer('dev@edmonton.ca');

    // Second add should fail
    await expect(addOctWebDevViewer('dev@edmonton.ca')).rejects.toThrow(
      'already has OCT-Web-Dev view access'
    );

    // Only one audit log entry
    expect(auditLogs).toHaveLength(1);
  });

  it('fails to add non-existent user', async () => {
    await expect(addOctWebDevViewer('nobody@edmonton.ca')).rejects.toThrow('User not found');
    expect(auditLogs).toHaveLength(0);
  });

  it('fails to remove non-existent permission', async () => {
    await expect(removeOctWebDevViewer('fake-id')).rejects.toThrow('Record not found');
    expect(auditLogs).toHaveLength(0);
  });
});
