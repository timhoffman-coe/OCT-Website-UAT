'use server';

import { prisma } from '@/lib/prisma';
import { requireTeamAccess } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

// ============================================================
// Team Services
// ============================================================

export async function createTeamService(
  teamId: string,
  data: { title: string; items: string[] }
) {
  const user = await requireTeamAccess(teamId);
  const count = await prisma.teamService.count({ where: { teamId } });

  const service = await prisma.teamService.create({
    data: { ...data, teamId, sortOrder: count },
  });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'CREATE', entity: 'TeamService', entityId: service.id, description: `Created service '${data.title}'`, changes: data },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: teamId } });
  revalidatePath(`/admin/teams/${teamId}`);
  revalidatePath(`/${team.slug}`);
  return service;
}

export async function updateTeamService(
  serviceId: string,
  data: { title?: string; items?: string[]; sortOrder?: number }
) {
  const before = await prisma.teamService.findUniqueOrThrow({ where: { id: serviceId } });
  const user = await requireTeamAccess(before.teamId);

  const updated = await prisma.teamService.update({ where: { id: serviceId }, data });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'UPDATE', entity: 'TeamService', entityId: serviceId, description: `Updated service '${before.title}'`, changes: { before, after: updated } },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: before.teamId } });
  revalidatePath(`/admin/teams/${before.teamId}`);
  revalidatePath(`/${team.slug}`);
  return updated;
}

export async function deleteTeamService(serviceId: string) {
  const service = await prisma.teamService.findUniqueOrThrow({ where: { id: serviceId } });
  const user = await requireTeamAccess(service.teamId);

  await prisma.teamService.delete({ where: { id: serviceId } });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'DELETE', entity: 'TeamService', entityId: serviceId, description: `Deleted service '${service.title}'`, changes: service },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: service.teamId } });
  revalidatePath(`/admin/teams/${service.teamId}`);
  revalidatePath(`/${team.slug}`);
}

// ============================================================
// Team Initiatives
// ============================================================

export async function createTeamInitiative(
  teamId: string,
  data: { title: string; description: string; href: string }
) {
  const user = await requireTeamAccess(teamId);
  const count = await prisma.teamInitiative.count({ where: { teamId } });

  const initiative = await prisma.teamInitiative.create({
    data: { ...data, teamId, sortOrder: count },
  });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'CREATE', entity: 'TeamInitiative', entityId: initiative.id, description: `Created initiative '${data.title}'`, changes: data },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: teamId } });
  revalidatePath(`/admin/teams/${teamId}`);
  revalidatePath(`/${team.slug}`);
  return initiative;
}

export async function updateTeamInitiative(
  initiativeId: string,
  data: { title?: string; description?: string; href?: string; sortOrder?: number }
) {
  const before = await prisma.teamInitiative.findUniqueOrThrow({ where: { id: initiativeId } });
  const user = await requireTeamAccess(before.teamId);

  const updated = await prisma.teamInitiative.update({ where: { id: initiativeId }, data });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'UPDATE', entity: 'TeamInitiative', entityId: initiativeId, description: `Updated initiative '${before.title}'`, changes: { before, after: updated } },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: before.teamId } });
  revalidatePath(`/admin/teams/${before.teamId}`);
  revalidatePath(`/${team.slug}`);
  return updated;
}

export async function deleteTeamInitiative(initiativeId: string) {
  const initiative = await prisma.teamInitiative.findUniqueOrThrow({ where: { id: initiativeId } });
  const user = await requireTeamAccess(initiative.teamId);

  await prisma.teamInitiative.delete({ where: { id: initiativeId } });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'DELETE', entity: 'TeamInitiative', entityId: initiativeId, description: `Deleted initiative '${initiative.title}'`, changes: initiative },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: initiative.teamId } });
  revalidatePath(`/admin/teams/${initiative.teamId}`);
  revalidatePath(`/${team.slug}`);
}

// ============================================================
// Team Contacts
// ============================================================

export async function createTeamContact(
  teamId: string,
  data: { name: string; role: string; email: string }
) {
  const user = await requireTeamAccess(teamId);
  const count = await prisma.teamContact.count({ where: { teamId } });

  const contact = await prisma.teamContact.create({
    data: { ...data, teamId, sortOrder: count },
  });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'CREATE', entity: 'TeamContact', entityId: contact.id, description: `Created contact '${data.name}'`, changes: data },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: teamId } });
  revalidatePath(`/admin/teams/${teamId}`);
  revalidatePath(`/${team.slug}`);
  return contact;
}

export async function updateTeamContact(
  contactId: string,
  data: { name?: string; role?: string; email?: string; sortOrder?: number }
) {
  const before = await prisma.teamContact.findUniqueOrThrow({ where: { id: contactId } });
  const user = await requireTeamAccess(before.teamId);

  const updated = await prisma.teamContact.update({ where: { id: contactId }, data });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'UPDATE', entity: 'TeamContact', entityId: contactId, description: `Updated contact '${before.name}'`, changes: { before, after: updated } },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: before.teamId } });
  revalidatePath(`/admin/teams/${before.teamId}`);
  revalidatePath(`/${team.slug}`);
  return updated;
}

export async function deleteTeamContact(contactId: string) {
  const contact = await prisma.teamContact.findUniqueOrThrow({ where: { id: contactId } });
  const user = await requireTeamAccess(contact.teamId);

  await prisma.teamContact.delete({ where: { id: contactId } });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'DELETE', entity: 'TeamContact', entityId: contactId, description: `Deleted contact '${contact.name}'`, changes: contact },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: contact.teamId } });
  revalidatePath(`/admin/teams/${contact.teamId}`);
  revalidatePath(`/${team.slug}`);
}

// ============================================================
// Team Quick Links
// ============================================================

export async function createTeamQuickLink(
  teamId: string,
  data: { label: string; description: string; href: string; isSecure: boolean }
) {
  const user = await requireTeamAccess(teamId);
  const count = await prisma.teamQuickLink.count({ where: { teamId } });

  const link = await prisma.teamQuickLink.create({
    data: { ...data, teamId, sortOrder: count },
  });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'CREATE', entity: 'TeamQuickLink', entityId: link.id, description: `Created quick link '${data.label}'`, changes: data },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: teamId } });
  revalidatePath(`/admin/teams/${teamId}`);
  revalidatePath(`/${team.slug}`);
  return link;
}

export async function updateTeamQuickLink(
  linkId: string,
  data: { label?: string; description?: string; href?: string; isSecure?: boolean; sortOrder?: number }
) {
  const before = await prisma.teamQuickLink.findUniqueOrThrow({ where: { id: linkId } });
  const user = await requireTeamAccess(before.teamId);

  const updated = await prisma.teamQuickLink.update({ where: { id: linkId }, data });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'UPDATE', entity: 'TeamQuickLink', entityId: linkId, description: `Updated quick link '${before.label}'`, changes: { before, after: updated } },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: before.teamId } });
  revalidatePath(`/admin/teams/${before.teamId}`);
  revalidatePath(`/${team.slug}`);
  return updated;
}

export async function deleteTeamQuickLink(linkId: string) {
  const link = await prisma.teamQuickLink.findUniqueOrThrow({ where: { id: linkId } });
  const user = await requireTeamAccess(link.teamId);

  await prisma.teamQuickLink.delete({ where: { id: linkId } });

  await prisma.auditLog.create({
    data: { userId: user.id, action: 'DELETE', entity: 'TeamQuickLink', entityId: linkId, description: `Deleted quick link '${link.label}'`, changes: link },
  });

  const team = await prisma.team.findUniqueOrThrow({ where: { id: link.teamId } });
  revalidatePath(`/admin/teams/${link.teamId}`);
  revalidatePath(`/${team.slug}`);
}
