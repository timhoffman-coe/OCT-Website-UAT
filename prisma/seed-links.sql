-- Populate Links page with existing hardcoded data
-- Run via: docker exec -it nextjs-site-postgres-1 psql -U coe_admin -d coe_cms -f seed-links.sql

-- Category 1: Incident & Problem Management
WITH cat1 AS (
  INSERT INTO "LinkCategory" (id, title, subtitle, "iconBg", "iconColor", "isTeamGrid", "sortOrder", "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Incident & Problem Management', '7 resources', 'bg-red-50', 'text-edmonton-error', false, 0, NOW(), NOW())
  RETURNING id
)
INSERT INTO "LinkItem" (id, "categoryId", name, url, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, cat1.id, name, url, ord, NOW(), NOW()
FROM cat1, (VALUES
  ('Helix (Remedy) SmartIT', '#', 0),
  ('Helix (Remedy) DWP', '#', 1),
  ('Incident Management Process', '#', 2),
  ('WO from Incident Ticket', '#', 3),
  ('Incident Management Flow Charts', '#', 4),
  ('Problem Mgmt Process Guide', '#', 5),
  ('Root Cause Analysis (RCA)', '#', 6)
) AS v(name, url, ord);

-- Category 2: Change Management
WITH cat2 AS (
  INSERT INTO "LinkCategory" (id, title, subtitle, "iconBg", "iconColor", "isTeamGrid", "sortOrder", "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Change Management', '8 resources', 'bg-blue-50', 'text-process-blue', false, 1, NOW(), NOW())
  RETURNING id
)
INSERT INTO "LinkItem" (id, "categoryId", name, url, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, cat2.id, name, url, ord, NOW(), NOW()
FROM cat2, (VALUES
  ('OCT Change Management', '#', 0),
  ('OCT Schedule Outages', '#', 1),
  ('Severity 1 Procedures', '#', 2),
  ('OCT Change Management Definitions', '#', 3),
  ('Change Approval - Form', '#', 4),
  ('Work Order vs Change Ticket', '#', 5),
  ('Remedy Definitions', '#', 6),
  ('Change Ticket Cheat Sheet', '#', 7)
) AS v(name, url, ord);

-- Category 3: Resource Management
WITH cat3 AS (
  INSERT INTO "LinkCategory" (id, title, subtitle, "iconBg", "iconColor", "isTeamGrid", "sortOrder", "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, 'Resource Management', '9 resources', 'bg-amber-50', 'text-edmonton-warning', false, 2, NOW(), NOW())
  RETURNING id
)
INSERT INTO "LinkItem" (id, "categoryId", name, url, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, cat3.id, name, url, ord, NOW(), NOW()
FROM cat3, (VALUES
  ('Taleo', '#', 0),
  ('Recruitment Toolkit', '#', 1),
  ('Recruitment Approval Process User Guide', '#', 2),
  ('Recruitment Approval Form', '#', 3),
  ('SAP Time Entry Request', '#', 4),
  ('New Account Request', '#', 5),
  ('Phone Request', '#', 6),
  ('Offboarding Link', '#', 7),
  ('Supervisor Offboarding Checklist', '#', 8)
) AS v(name, url, ord);

-- Category 4: OCT Team Sites & Resources (grid layout)
WITH cat4 AS (
  INSERT INTO "LinkCategory" (id, title, subtitle, "iconBg", "iconColor", "isTeamGrid", "sortOrder", "createdAt", "updatedAt")
  VALUES (gen_random_uuid()::text, 'OCT Team Sites & Resources', '9 resources', 'bg-purple-50', 'text-purple-600', true, 3, NOW(), NOW())
  RETURNING id
)
INSERT INTO "LinkItem" (id, "categoryId", name, url, "sortOrder", "createdAt", "updatedAt")
SELECT gen_random_uuid()::text, cat4.id, name, url, ord, NOW(), NOW()
FROM cat4, (VALUES
  ('OCT Service Catalog', '#', 0),
  ('Technology Infrastructure Operations', '#', 1),
  ('Service Desk', '#', 2),
  ('Service Management Office', '#', 3),
  ('Enterprise Commons Project', '#', 4),
  ('OCT Employee Links', '#', 5),
  ('Technology PMO', '#', 6),
  ('Open Data Portal', 'https://data.edmonton.ca', 7),
  ('Open City', '#', 8)
) AS v(name, url, ord);
