import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const SECTIONS = [
  {
    parentSlug: 'application-technology-services',
    children: [
      { slug: 'posse', shortName: 'POSSE' },
      { slug: 'tacs', shortName: 'TACS' },
      { slug: 'weblogic', shortName: 'WebLogic' },
      { slug: 'google-workspace', shortName: 'Google Workspace' },
      { slug: 'branch-solutions', shortName: 'Branch Solutions' },
      { slug: 'rapid-development', shortName: 'Rapid Dev' },
    ],
  },
  {
    parentSlug: 'corporate-information-security',
    children: [
      { slug: 'advisory-services', shortName: 'Advisory Services' },
      { slug: 'directory-services', shortName: 'Directory Services' },
      { slug: 'continuity-recovery', shortName: 'Continuity & Recovery' },
      { slug: 'incident-response', shortName: 'Incident Response' },
      { slug: 'governance-compliance', shortName: 'GRC & Awareness' },
      { slug: 'identity-access', shortName: 'IAM' },
    ],
  },
  {
    parentSlug: 'technology-planning',
    children: [
      { slug: 'technology-investment', shortName: 'Tech Investment' },
      { slug: 'business-engagement', shortName: 'Business Engagement' },
      { slug: 'vendor-management', shortName: 'VMO' },
      { slug: 'it-asset-management', shortName: 'ITAM' },
    ],
  },
];

const SUB_TEAM_WIDGET_TYPES = [
  'subteam_header',
  'subteam_services',
  'subteam_initiatives',
  'subteam_contacts',
  'subteam_quick_links',
];

async function main() {
  // Load widget definitions once
  const widgetDefs = await prisma.widgetDefinition.findMany({
    where: { widgetType: { in: SUB_TEAM_WIDGET_TYPES } },
  });
  const widgetDefMap = new Map(widgetDefs.map((d) => [d.widgetType, d.id]));

  if (widgetDefs.length !== SUB_TEAM_WIDGET_TYPES.length) {
    console.error('Missing widget definitions. Found:', widgetDefs.map((d) => d.widgetType));
    console.error('Expected:', SUB_TEAM_WIDGET_TYPES);
    process.exit(1);
  }

  let created = 0;
  let skipped = 0;

  for (const section of SECTIONS) {
    // Find parent team
    const parent = await prisma.team.findUnique({
      where: { slug: section.parentSlug },
      include: { serviceAreas: true },
    });

    if (!parent) {
      console.error(`Parent team not found: ${section.parentSlug}`);
      continue;
    }

    console.log(`\nProcessing: ${parent.teamName}`);

    for (const child of section.children) {
      // Check if child team already exists
      const existing = await prisma.team.findUnique({ where: { slug: child.slug } });
      if (existing) {
        console.log(`  SKIP: ${child.slug} (already exists)`);
        skipped++;
        continue;
      }

      // Find matching service area to get title and description
      const serviceArea = parent.serviceAreas.find((sa) => sa.serviceAreaId === child.slug);
      if (!serviceArea) {
        console.error(`  ERROR: No ServiceArea found with serviceAreaId="${child.slug}" on ${section.parentSlug}`);
        continue;
      }

      // Create the child team
      const team = await prisma.team.create({
        data: {
          slug: child.slug,
          teamName: serviceArea.title,
          teamShortName: child.shortName,
          pageTemplate: 'SUB_TEAM',
          pageDescription: serviceArea.fullDescription,
          sortOrder: serviceArea.sortOrder,
          isPublished: false,
          parentId: parent.id,
        },
      });

      // Create widget instances
      for (let i = 0; i < SUB_TEAM_WIDGET_TYPES.length; i++) {
        const defId = widgetDefMap.get(SUB_TEAM_WIDGET_TYPES[i]);
        if (!defId) continue;
        await prisma.widgetInstance.create({
          data: {
            teamId: team.id,
            widgetDefinitionId: defId,
            sortOrder: i,
          },
        });
      }

      // Update the ServiceArea link to point to the new child page
      await prisma.serviceArea.update({
        where: { id: serviceArea.id },
        data: { link: `/${child.slug}` },
      });

      console.log(`  CREATED: ${child.slug} (${serviceArea.title})`);
      created++;
    }
  }

  console.log(`\nDone! Created: ${created}, Skipped: ${skipped}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
