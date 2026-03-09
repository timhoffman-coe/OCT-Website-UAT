import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as fs from 'fs';
import 'dotenv/config';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Helper: escape a SQL string value
function esc(val: unknown): string {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
  if (typeof val === 'number') return String(val);
  if (val instanceof Date) return `'${val.toISOString()}'`;
  if (Array.isArray(val)) {
    const items = val.map((v) => `'${String(v).replace(/'/g, "''")}'`).join(',');
    return `ARRAY[${items}]`;
  }
  if (typeof val === 'object') return `'${JSON.stringify(val).replace(/'/g, "''")}'`;
  return `'${String(val).replace(/'/g, "''")}'`;
}

function toInsert(table: string, rows: Record<string, unknown>[]): string {
  if (rows.length === 0) return `-- ${table}: no data\n`;
  const cols = Object.keys(rows[0]);
  const lines = rows.map((row) => {
    const vals = cols.map((c) => esc(row[c])).join(', ');
    return `INSERT INTO "${table}" (${cols.map((c) => `"${c}"`).join(', ')}) VALUES (${vals});`;
  });
  return `-- ${table} (${rows.length} rows)\n${lines.join('\n')}\n`;
}

async function main() {
  const out: string[] = [];
  out.push('-- Full database export');
  out.push(`-- Generated: ${new Date().toISOString()}`);
  out.push('-- Import order respects foreign key dependencies\n');
  out.push('BEGIN;\n');

  // 1. Users (no FK deps)
  const users = await prisma.user.findMany();
  out.push(toInsert('User', users));

  // 2. Teams (self-referencing — insert parents first, then children)
  const allTeams = await prisma.team.findMany({ orderBy: [{ parentId: 'asc' }, { sortOrder: 'asc' }] });
  const rootTeams = allTeams.filter((t) => !t.parentId);
  const childTeams = allTeams.filter((t) => t.parentId);
  out.push('-- Team (parents first, then children)');
  out.push(toInsert('Team', [...rootTeams, ...childTeams]));

  // 3. TeamPermission
  const teamPermissions = await prisma.teamPermission.findMany();
  out.push(toInsert('TeamPermission', teamPermissions));

  // 4. AuditLog
  const auditLogs = await prisma.auditLog.findMany({ orderBy: { createdAt: 'asc' } });
  out.push(toInsert('AuditLog', auditLogs));

  // 5. Portfolio
  const portfolios = await prisma.portfolio.findMany({ orderBy: { sortOrder: 'asc' } });
  out.push(toInsert('Portfolio', portfolios));

  // 6. TeamTab
  const teamTabs = await prisma.teamTab.findMany({ orderBy: { sortOrder: 'asc' } });
  out.push(toInsert('TeamTab', teamTabs));

  // 7. DiagramLink
  const diagramLinks = await prisma.diagramLink.findMany({ orderBy: { sortOrder: 'asc' } });
  out.push(toInsert('DiagramLink', diagramLinks));

  // 8. TrelloBoard
  const trelloBoards = await prisma.trelloBoard.findMany({ orderBy: { sortOrder: 'asc' } });
  out.push(toInsert('TrelloBoard', trelloBoards));

  // 9. TeamMember
  const teamMembers = await prisma.teamMember.findMany({ orderBy: { sortOrder: 'asc' } });
  out.push(toInsert('TeamMember', teamMembers));

  // 10. AccordionGroup
  const accordionGroups = await prisma.accordionGroup.findMany({ orderBy: { sortOrder: 'asc' } });
  out.push(toInsert('AccordionGroup', accordionGroups));

  // 11. AccordionLink
  const accordionLinks = await prisma.accordionLink.findMany({ orderBy: { sortOrder: 'asc' } });
  out.push(toInsert('AccordionLink', accordionLinks));

  // 12. PortfolioSubpage
  const subpages = await prisma.portfolioSubpage.findMany();
  out.push(toInsert('PortfolioSubpage', subpages));

  // 13. SubpageService
  const subpageServices = await prisma.subpageService.findMany({ orderBy: { sortOrder: 'asc' } });
  out.push(toInsert('SubpageService', subpageServices));

  // 14. SubpageInitiative
  const subpageInitiatives = await prisma.subpageInitiative.findMany({ orderBy: { sortOrder: 'asc' } });
  out.push(toInsert('SubpageInitiative', subpageInitiatives));

  // 15. SubpageContact
  const subpageContacts = await prisma.subpageContact.findMany({ orderBy: { sortOrder: 'asc' } });
  out.push(toInsert('SubpageContact', subpageContacts));

  // 16. SubpageQuickLink
  const subpageQuickLinks = await prisma.subpageQuickLink.findMany({ orderBy: { sortOrder: 'asc' } });
  out.push(toInsert('SubpageQuickLink', subpageQuickLinks));

  // 17. ServiceArea
  const serviceAreas = await prisma.serviceArea.findMany({ orderBy: { sortOrder: 'asc' } });
  out.push(toInsert('ServiceArea', serviceAreas));

  // 18. WidgetDefinition
  const widgetDefs = await prisma.widgetDefinition.findMany();
  out.push(toInsert('WidgetDefinition', widgetDefs));

  // 19. WidgetInstance
  const widgetInstances = await prisma.widgetInstance.findMany({ orderBy: { sortOrder: 'asc' } });
  out.push(toInsert('WidgetInstance', widgetInstances));

  // 20. TeamService
  const teamServices = await prisma.teamService.findMany({ orderBy: { sortOrder: 'asc' } });
  out.push(toInsert('TeamService', teamServices));

  // 21. TeamInitiative
  const teamInitiatives = await prisma.teamInitiative.findMany({ orderBy: { sortOrder: 'asc' } });
  out.push(toInsert('TeamInitiative', teamInitiatives));

  // 22. TeamContact
  const teamContacts = await prisma.teamContact.findMany({ orderBy: { sortOrder: 'asc' } });
  out.push(toInsert('TeamContact', teamContacts));

  // 23. TeamQuickLink
  const teamQuickLinks = await prisma.teamQuickLink.findMany({ orderBy: { sortOrder: 'asc' } });
  out.push(toInsert('TeamQuickLink', teamQuickLinks));

  out.push('\nCOMMIT;\n');

  const outputPath = 'db_export.sql';
  fs.writeFileSync(outputPath, out.join('\n'), 'utf-8');
  console.log(`Export complete: ${outputPath}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
