import { unstable_cache } from 'next/cache';
import { getPool, sql } from '@/lib/mssql';
import type { OrgChartData, OrgPerson } from '@/app/org-chart/types';

const ROOT_NAME = 'Daryl Croft';
const ROOT_LEVEL = 2;
const MAX_LEVEL = 8;
const ONE_DAY_SECONDS = 86400;

interface PeopleRow {
  CURRENT_LEAF: string | null;
  FULL_NAME: string | null;
  EMPLOYEE_ID: string | null;
  LEAF_LEVEL: number | null;
  [key: string]: string | number | null;
}

async function fetchOrgChart(): Promise<OrgChartData> {
  const pool = await getPool();
  const result = await pool.request()
    .input('rootName', sql.NVarChar, ROOT_NAME)
    .query<PeopleRow>(`
      SELECT
        CURRENT_LEAF,
        FULL_NAME,
        EMPLOYEE_ID,
        LEAF_LEVEL,
        P_L2_REPORTS_TO_FULL_NAME, P_L3_REPORTS_TO_FULL_NAME,
        P_L4_REPORTS_TO_FULL_NAME, P_L5_REPORTS_TO_FULL_NAME,
        P_L6_REPORTS_TO_FULL_NAME, P_L7_REPORTS_TO_FULL_NAME,
        P_L8_REPORTS_TO_FULL_NAME,
        L2_PRIMARY_NETWORK_ID, L3_PRIMARY_NETWORK_ID,
        L4_PRIMARY_NETWORK_ID, L5_PRIMARY_NETWORK_ID,
        L6_PRIMARY_NETWORK_ID, L7_PRIMARY_NETWORK_ID,
        L8_PRIMARY_NETWORK_ID
      FROM [COE].[PERSON_REPORTING_TO_HIER_OCT_V]
      WHERE P_L${ROOT_LEVEL}_REPORTS_TO_FULL_NAME = @rootName
        AND CURRENT_LEAF IS NOT NULL
        AND LEAF_LEVEL > ${ROOT_LEVEL}
    `);

  return buildTree(result.recordset);
}

export const getOrgChart = unstable_cache(fetchOrgChart, ['org-chart'], {
  revalidate: ONE_DAY_SECONDS,
  tags: ['org-chart'],
});

function buildTree(rows: PeopleRow[]): OrgChartData {
  const nodes = new Map<string, OrgPerson>();
  const childKeys = new Map<string, Set<string>>();

  const getOrCreate = (id: string, name: string, employeeNumber?: string): OrgPerson => {
    const existing = nodes.get(id);
    if (existing) return existing;
    const node: OrgPerson = { id, name, title: '', employeeNumber, subordinates: [] };
    nodes.set(id, node);
    childKeys.set(id, new Set());
    return node;
  };

  const attach = (parent: OrgPerson, child: OrgPerson) => {
    const seen = childKeys.get(parent.id)!;
    if (seen.has(child.id)) return;
    seen.add(child.id);
    parent.subordinates!.push(child);
  };

  // Seed the root from the first row that has it (every filtered row will).
  const firstRow = rows[0];
  if (!firstRow) {
    return { root: { id: 'root', name: ROOT_NAME, title: '', subordinates: [] } };
  }
  const rootId = String(firstRow[`L${ROOT_LEVEL}_PRIMARY_NETWORK_ID`] ?? 'root');
  const root = getOrCreate(rootId, ROOT_NAME);

  for (const row of rows) {
    const leafLevel = row.LEAF_LEVEL;
    if (leafLevel == null || leafLevel <= ROOT_LEVEL) continue;

    let parent = root;

    // Intermediate managers between root and leaf.
    for (let x = ROOT_LEVEL + 1; x < leafLevel && x <= MAX_LEVEL; x++) {
      const mgrName = row[`P_L${x}_REPORTS_TO_FULL_NAME`] as string | null;
      const mgrId = row[`L${x}_PRIMARY_NETWORK_ID`] as string | null;
      if (!mgrName || !mgrId) continue;
      const mgrNode = getOrCreate(mgrId, mgrName);
      attach(parent, mgrNode);
      parent = mgrNode;
    }

    // The employee themself.
    const empName = row.FULL_NAME;
    if (!empName) continue;
    const empId =
      (row[`L${leafLevel}_PRIMARY_NETWORK_ID`] as string | null) ??
      row.EMPLOYEE_ID ??
      `${empName}-${leafLevel}`;
    const empNode = getOrCreate(empId, empName, row.EMPLOYEE_ID ?? undefined);
    attach(parent, empNode);
  }

  return { root };
}
