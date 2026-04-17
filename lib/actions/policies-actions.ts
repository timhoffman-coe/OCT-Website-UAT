'use server';

import { prisma } from '@/lib/prisma';
import { requirePoliciesAccess } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

function revalidatePolicies() {
  revalidatePath('/policies');
  revalidatePath('/admin/policies');
}

// ── Policy CRUD ──────────────────────────────────────────

interface PolicyData {
  title: string;
  type: string;
  code: string;
  category: string;
  description: string;
  url: string;
  featured?: boolean;
}

export async function createPolicy(data: PolicyData) {
  const user = await requirePoliciesAccess();

  // Enforce at-most-one featured
  if (data.featured) {
    await prisma.policy.updateMany({
      where: { featured: true },
      data: { featured: false },
    });
  }

  const maxSort = await prisma.policy.aggregate({
    _max: { sortOrder: true },
  });

  const policy = await prisma.policy.create({
    data: {
      title: data.title,
      type: data.type,
      code: data.code,
      category: data.category,
      description: data.description,
      url: data.url,
      featured: data.featured ?? false,
      sortOrder: (maxSort._max.sortOrder ?? 0) + 1,
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'CREATE',
      entity: 'Policy',
      entityId: policy.id,
      description: `Created policy '${data.title}'`,
      changes: { ...data },
    },
  });

  revalidatePolicies();
  return policy;
}

export async function updatePolicy(id: string, data: Partial<PolicyData>) {
  const user = await requirePoliciesAccess();

  const before = await prisma.policy.findUniqueOrThrow({ where: { id } });

  // Enforce at-most-one featured
  if (data.featured) {
    await prisma.policy.updateMany({
      where: { featured: true, id: { not: id } },
      data: { featured: false },
    });
  }

  const updated = await prisma.policy.update({
    where: { id },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.type !== undefined && { type: data.type }),
      ...(data.code !== undefined && { code: data.code }),
      ...(data.category !== undefined && { category: data.category }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.url !== undefined && { url: data.url }),
      ...(data.featured !== undefined && { featured: data.featured }),
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'UPDATE',
      entity: 'Policy',
      entityId: id,
      description: `Updated policy '${before.title}'`,
      changes: { before, after: updated },
    },
  });

  revalidatePolicies();
  return updated;
}

export async function deletePolicy(id: string) {
  const user = await requirePoliciesAccess();

  const policy = await prisma.policy.findUniqueOrThrow({ where: { id } });

  await prisma.policy.delete({ where: { id } });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'DELETE',
      entity: 'Policy',
      entityId: id,
      description: `Deleted policy '${policy.title}'`,
      changes: policy,
    },
  });

  revalidatePolicies();
}

export async function reorderPolicies(orderedIds: string[]) {
  const user = await requirePoliciesAccess();

  await prisma.$transaction(
    orderedIds.map((id, index) =>
      prisma.policy.update({ where: { id }, data: { sortOrder: index } })
    )
  );

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'UPDATE',
      entity: 'Policy',
      entityId: 'bulk',
      description: `Reordered ${orderedIds.length} policies`,
      changes: { orderedIds },
    },
  });

  revalidatePolicies();
}
