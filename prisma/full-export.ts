import pg from 'pg';
import * as fs from 'fs';
import 'dotenv/config';

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });

function escVal(val: unknown): string {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'boolean') return val ? 'TRUE' : 'FALSE';
  if (typeof val === 'number' || typeof val === 'bigint') return String(val);
  if (val instanceof Date) return `'${val.toISOString()}'`;
  // pg returns arrays as JS arrays
  if (Array.isArray(val)) {
    if (val.length === 0) return "'{}'";
    const items = val.map((v) => `"${String(v).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`).join(',');
    return `'{${items}}'`;
  }
  if (typeof val === 'object') {
    return `'${JSON.stringify(val).replace(/'/g, "''")}'`;
  }
  return `'${String(val).replace(/'/g, "''")}'`;
}

async function main() {
  await client.connect();
  const out: string[] = [];

  out.push('--');
  out.push('-- Full database export (schema + data)');
  out.push(`-- Generated: ${new Date().toISOString()}`);
  out.push('-- Usage: psql -d <dbname> -f db_full_export.sql');
  out.push('--');
  out.push('');

  // ============================================================
  // 1. ENUMS
  // ============================================================
  const enumsRes = await client.query(`
    SELECT t.typname, e.enumlabel, e.enumsortorder
    FROM pg_type t
    JOIN pg_enum e ON t.oid = e.enumtypid
    JOIN pg_namespace n ON t.typnamespace = n.oid
    WHERE n.nspname = 'public'
    ORDER BY t.typname, e.enumsortorder
  `);
  const enums = new Map<string, string[]>();
  for (const row of enumsRes.rows) {
    if (!enums.has(row.typname)) enums.set(row.typname, []);
    enums.get(row.typname)!.push(row.enumlabel);
  }
  for (const [name, labels] of enums) {
    out.push(`-- Enum: ${name}`);
    out.push(`DO $$ BEGIN`);
    out.push(`  CREATE TYPE "${name}" AS ENUM (${labels.map((l) => `'${l}'`).join(', ')});`);
    out.push(`EXCEPTION WHEN duplicate_object THEN NULL;`);
    out.push(`END $$;`);
    out.push('');
  }

  // ============================================================
  // 2. TABLES (DDL)
  // ============================================================
  // Get all tables
  const tablesRes = await client.query(`
    SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    ORDER BY table_name
  `);
  const tableNames = tablesRes.rows.map((r) => r.table_name).filter((t) => t !== '_prisma_migrations');

  for (const table of tableNames) {
    // Get column definitions
    const colsRes = await client.query(`
      SELECT column_name, data_type, udt_name, is_nullable, column_default,
             character_maximum_length
      FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = $1
      ORDER BY ordinal_position
    `, [table]);

    out.push(`-- Table: ${table}`);
    out.push(`CREATE TABLE IF NOT EXISTS "${table}" (`);
    const colDefs: string[] = [];
    for (const col of colsRes.rows) {
      let type: string;
      if (col.data_type === 'ARRAY') {
        // Get the element type
        const elemType = col.udt_name.replace(/^_/, '');
        type = `${elemType}[]`;
        if (elemType === 'text') type = 'TEXT[]';
      } else if (col.data_type === 'USER-DEFINED') {
        type = `"${col.udt_name}"`;
      } else if (col.data_type === 'character varying') {
        type = col.character_maximum_length ? `VARCHAR(${col.character_maximum_length})` : 'TEXT';
      } else if (col.data_type === 'timestamp without time zone') {
        type = 'TIMESTAMP(3)';
      } else if (col.data_type === 'integer') {
        type = 'INTEGER';
      } else if (col.data_type === 'boolean') {
        type = 'BOOLEAN';
      } else if (col.data_type === 'text') {
        type = 'TEXT';
      } else if (col.data_type === 'jsonb') {
        type = 'JSONB';
      } else {
        type = col.data_type.toUpperCase();
      }

      let def = `  "${col.column_name}" ${type}`;
      if (col.is_nullable === 'NO') def += ' NOT NULL';
      if (col.column_default !== null) def += ` DEFAULT ${col.column_default}`;
      colDefs.push(def);
    }
    out.push(colDefs.join(',\n'));
    out.push(');');
    out.push('');
  }

  // ============================================================
  // 3. PRIMARY KEYS
  // ============================================================
  const pkRes = await client.query(`
    SELECT tc.table_name, kcu.column_name
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema
    WHERE tc.table_schema = 'public' AND tc.constraint_type = 'PRIMARY KEY'
    ORDER BY tc.table_name
  `);
  const pks = new Map<string, string[]>();
  for (const row of pkRes.rows) {
    if (!pks.has(row.table_name)) pks.set(row.table_name, []);
    pks.get(row.table_name)!.push(row.column_name);
  }
  out.push('-- Primary Keys');
  for (const [table, cols] of pks) {
    if (table === '_prisma_migrations') continue;
    out.push(`ALTER TABLE "${table}" ADD CONSTRAINT "${table}_pkey" PRIMARY KEY (${cols.map((c) => `"${c}"`).join(', ')}) ;`);
  }
  out.push('');

  // ============================================================
  // 4. UNIQUE CONSTRAINTS
  // ============================================================
  const uqRes = await client.query(`
    SELECT tc.table_name, tc.constraint_name, kcu.column_name
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema
    WHERE tc.table_schema = 'public' AND tc.constraint_type = 'UNIQUE'
    ORDER BY tc.table_name, tc.constraint_name, kcu.ordinal_position
  `);
  const uqs = new Map<string, Map<string, string[]>>();
  for (const row of uqRes.rows) {
    if (row.table_name === '_prisma_migrations') continue;
    if (!uqs.has(row.table_name)) uqs.set(row.table_name, new Map());
    const tbl = uqs.get(row.table_name)!;
    if (!tbl.has(row.constraint_name)) tbl.set(row.constraint_name, []);
    tbl.get(row.constraint_name)!.push(row.column_name);
  }
  out.push('-- Unique Constraints');
  for (const [table, constraints] of uqs) {
    for (const [name, cols] of constraints) {
      out.push(`ALTER TABLE "${table}" ADD CONSTRAINT "${name}" UNIQUE (${cols.map((c) => `"${c}"`).join(', ')}) ;`);
    }
  }
  out.push('');

  // ============================================================
  // 5. INDEXES
  // ============================================================
  const idxRes = await client.query(`
    SELECT indexname, indexdef
    FROM pg_indexes
    WHERE schemaname = 'public'
      AND indexname NOT LIKE '%_pkey'
      AND indexname NOT LIKE '%_key'
      AND tablename != '_prisma_migrations'
    ORDER BY tablename, indexname
  `);
  out.push('-- Indexes');
  for (const row of idxRes.rows) {
    out.push(`${row.indexdef};`);
  }
  out.push('');

  // ============================================================
  // 6. FOREIGN KEYS
  // ============================================================
  const fkRes = await client.query(`
    SELECT
      tc.table_name,
      tc.constraint_name,
      kcu.column_name,
      ccu.table_name AS foreign_table,
      ccu.column_name AS foreign_column,
      rc.delete_rule
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage ccu
      ON ccu.constraint_name = tc.constraint_name AND ccu.table_schema = tc.table_schema
    JOIN information_schema.referential_constraints rc
      ON rc.constraint_name = tc.constraint_name AND rc.constraint_schema = tc.table_schema
    WHERE tc.table_schema = 'public' AND tc.constraint_type = 'FOREIGN KEY'
    ORDER BY tc.table_name
  `);
  out.push('-- Foreign Keys');
  for (const row of fkRes.rows) {
    if (row.table_name === '_prisma_migrations') continue;
    let onDelete = '';
    if (row.delete_rule !== 'NO ACTION') onDelete = ` ON DELETE ${row.delete_rule}`;
    out.push(`ALTER TABLE "${row.table_name}" ADD CONSTRAINT "${row.constraint_name}" FOREIGN KEY ("${row.column_name}") REFERENCES "${row.foreign_table}"("${row.foreign_column}") ON UPDATE CASCADE${onDelete};`);
  }
  out.push('');

  // ============================================================
  // 7. DATA — insert order respects FKs
  // ============================================================
  // Topological order: independent tables first
  const insertOrder = [
    'User',
    'WidgetDefinition',
    'Team',           // self-referencing, but parents inserted first
    'TeamPermission',
    'AuditLog',
    'Portfolio',
    'TeamTab',
    'DiagramLink',
    'TrelloBoard',
    'TeamMember',
    'AccordionGroup',
    'AccordionLink',
    'PortfolioSubpage',
    'SubpageService',
    'SubpageInitiative',
    'SubpageContact',
    'SubpageQuickLink',
    'ServiceArea',
    'WidgetInstance',
    'TeamService',
    'TeamInitiative',
    'TeamContact',
    'TeamQuickLink',
  ];

  out.push('-- ============================================================');
  out.push('-- DATA (FK checks deferred for safe insert ordering)');
  out.push('-- ============================================================');
  out.push('');
  out.push('SET session_replication_role = replica;');
  out.push('');

  for (const table of insertOrder) {
    // For Team: order parents before children
    const orderBy = table === 'Team' ? 'ORDER BY "parentId" NULLS FIRST, "sortOrder"' : '';
    const res = await client.query(`SELECT * FROM "${table}" ${orderBy}`);
    if (res.rows.length === 0) {
      out.push(`-- ${table}: (empty)`);
      out.push('');
      continue;
    }
    const cols = res.fields.map((f) => f.name);
    out.push(`-- ${table}: ${res.rows.length} rows`);
    for (const row of res.rows) {
      const vals = cols.map((c) => escVal(row[c]));
      out.push(`INSERT INTO "${table}" (${cols.map((c) => `"${c}"`).join(', ')}) VALUES (${vals.join(', ')});`);
    }
    out.push('');
  }

  out.push('SET session_replication_role = DEFAULT;');
  out.push('');

  // ============================================================
  // 8. Prisma migrations record (if exists)
  // ============================================================
  try {
    const migrationsRes = await client.query(`SELECT * FROM "_prisma_migrations" ORDER BY "started_at"`);
    if (migrationsRes.rows.length > 0) {
      out.push('-- ============================================================');
      out.push('-- Prisma migration history');
      out.push('-- ============================================================');
      out.push(`CREATE TABLE IF NOT EXISTS "_prisma_migrations" (`);
      out.push(`  "id" VARCHAR(36) NOT NULL PRIMARY KEY,`);
      out.push(`  "checksum" VARCHAR(64) NOT NULL,`);
      out.push(`  "finished_at" TIMESTAMPTZ,`);
      out.push(`  "migration_name" VARCHAR(255) NOT NULL,`);
      out.push(`  "logs" TEXT,`);
      out.push(`  "rolled_back_at" TIMESTAMPTZ,`);
      out.push(`  "started_at" TIMESTAMPTZ NOT NULL DEFAULT now(),`);
      out.push(`  "applied_steps_count" INTEGER NOT NULL DEFAULT 0`);
      out.push(`);`);
      out.push('');
      for (const row of migrationsRes.rows) {
        const cols = migrationsRes.fields.map((f) => f.name);
        const vals = cols.map((c) => escVal(row[c]));
        out.push(`INSERT INTO "_prisma_migrations" (${cols.map((c) => `"${c}"`).join(', ')}) VALUES (${vals.join(', ')});`);
      }
      out.push('');
    }
  } catch {
    // No migrations table — using db push, skip
  }

  const outputPath = 'db_full_export.sql';
  fs.writeFileSync(outputPath, out.join('\n'), 'utf-8');
  console.log(`Full export complete: ${outputPath} (${out.length} lines)`);
}

main().catch(console.error).finally(() => client.end());
