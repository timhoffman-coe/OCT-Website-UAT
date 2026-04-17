-- Populate Policies page with existing hardcoded data
-- Dev:  docker exec -i coe-website-postgres-1 psql -U coe_admin -d coe_cms < prisma/seed-policies.sql
-- Prod: docker exec -i nextjs-site-postgres-1 psql -U coe_admin -d coe_cms < prisma/seed-policies.sql

INSERT INTO "Policy" (id, title, type, code, category, description, url, featured, "sortOrder", "createdAt", "updatedAt")
VALUES
  (gen_random_uuid()::text, 'Acceptable Use of Communication Technology', 'Directive & Procedure', 'A1429D', 'infrastructure', 'Guidelines for appropriate and responsible use of City communication technology resources.', 'https://www.edmonton.ca/city_government/documents/acceptable_use_of_communication_technology_A1429D_administrative_directive.pdf', true, 0, NOW(), NOW()),
  (gen_random_uuid()::text, 'IT Hardware & Software - Non Standard Request', 'Directive & Procedure', 'A1442B', 'infrastructure', 'Process and requirements for requesting non-standard IT hardware and software.', 'https://www.edmonton.ca/city_government/documents/PDF/IT-Hardware-and-Software-Non-Standard-Request-A1442B.pdf', false, 1, NOW(), NOW()),
  (gen_random_uuid()::text, 'IT Investment & Architecture', 'Directive & Procedure', 'A1457', 'governance', 'Framework for IT investment decisions and enterprise architecture governance.', 'https://www.edmonton.ca/city_government/documents/PoliciesDirectives/A1457_IT_Investment_and_Architecture_Directive%281%29.pdf', false, 2, NOW(), NOW()),
  (gen_random_uuid()::text, 'Open City Policy', 'Policy', 'C581', 'governance', 'City policy promoting openness, transparency, and public access to data and information.', 'https://www.edmonton.ca/city_government/documents/PoliciesDirectives/C581.pdf', false, 3, NOW(), NOW()),
  (gen_random_uuid()::text, 'Overtime and Afterhours', 'Standard Operating Procedures', 'SOP', 'personnel', 'Procedures for managing overtime and after-hours support for technology services.', 'https://docs.google.com/document/d/1Qlt4E2G8jhZMhJ0NFGsq8t0hlBfQEB5TXCk2Sbg3jDE/edit', false, 4, NOW(), NOW());
