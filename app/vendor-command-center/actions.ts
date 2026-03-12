'use server';

import { GoogleGenAI } from "@google/genai";
import { Vendor, KPIData } from '@/components/vendor-dashboard/types';
import { logger } from '@/lib/logger';

const log = logger.child({ module: 'vendor-actions' });

// Constants for Sheet Access
const SHEET_ID = '1U_xa5CS4pobPJyM1GaOz8SsqniXkOrhiB_xz181dBns';
const GID = '1525847539';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;

export const fetchSheetData = async (): Promise<Vendor[]> => {
    try {
        log.info('Fetching sheet data from server');

        const response = await fetch(CSV_URL, { cache: 'no-store' });

        if (!response.ok) {
            throw new Error(`Failed to fetch sheet: ${response.status} ${response.statusText}`);
        }

        const text = await response.text();
        const parsedData = parseCSV(text);

        log.info('Successfully parsed sheet data', { rows: parsedData.length });
        return parsedData;

    } catch (error) {
        log.error('Error fetching sheet data', { error: error instanceof Error ? error.message : String(error) });
        // Return empty array to trigger fallback on client
        return [];
    }
};

export const generateDashboardAnalysis = async (
    kpis: KPIData,
    criticalVendors: Vendor[]
): Promise<string> => {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;

    if (!apiKey) {
        return "API Key not configured. Please check your environment variables to enable AI insights.";
    }

    const ai = new GoogleGenAI({ apiKey });

    try {
        const criticalVendorSummary = criticalVendors.map(v =>
            `- ${v.name} (${v.contractTitle}): Expires ${v.contractEnd}, Risk: ${v.riskLevel}, Spend: $${v.spendToDate.toLocaleString()}`
        ).join('\n');

        const prompt = `
      Act as a Senior IT Procurement Officer. Analyze the following dashboard snapshot and provide a concise, 3-bullet executive summary of immediate actions required.
      
      Dashboard Stats:
      - Total Annual Spend: $${kpis.totalSpend.toLocaleString()}
      - Open Contracts: ${kpis.activeContracts}
      - Contracts Renewing in 90 Days: ${kpis.renewals90d}
      - High Risk Vendors: ${kpis.highRiskCount}

      Critical Vendors Requiring Attention:
      ${criticalVendorSummary}

      Format the output as a clean HTML list (<ul><li>...</li></ul>) without markdown code blocks. Focus on risk mitigation and budget preservation.
    `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                maxOutputTokens: 300,
                temperature: 0.4,
            }
        });

        return response.text || "No insights generated.";
    } catch (error) {
        log.error('Error calling Gemini API', { error: error instanceof Error ? error.message : String(error) });
        return "Unable to generate AI insights at this time. Please try again later.";
    }
};

// --- Helpers ---

const parseCSV = (csvText: string): Vendor[] => {
    const lines = csvText.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length < 2) return [];

    // Parse headers to map columns dynamically (case-insensitive)
    const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().trim());

    const vendors: Vendor[] = [];

    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (values.length < headers.length) continue;

        const row: any = {};
        headers.forEach((header, index) => {
            row[header] = values[index];
        });

        // Map CSV row to Vendor object
        try {
            // Helper to find value by possible header names
            const getValue = (keys: string[]) => {
                const key = keys.find(k => headers.includes(k));
                return key ? row[key] : '';
            };

            const name = getValue(['vendor name', 'vendor', 'name']);
            if (!name) continue; // Skip empty rows

            vendors.push({
                id: `row-${i}`,
                name: name,
                contractTitle: getValue(['contract title', 'title', 'contract', 'contract name']),
                manager: getValue(['contract manager', 'manager', 'owner']),
                corpStructure: mapCorpStructure(getValue(['corp structure lvl 2', 'corp structure', 'department', 'corp', 'level 2'])),
                sourcingType: mapSourcingType(getValue(['sourcing type', 'sourcing', 'source type', 'source'])),
                contractStart: parseDate(getValue(['contract start', 'start date', 'start'])),
                contractEnd: parseDate(getValue(['contract end', 'expiry date', 'end date', 'expiry'])),
                councilDate: parseOptionalDate(getValue(['council date', 'committee date', 'presentation date', 'council', 'ec date'])),
                globalAmount: parseCurrency(getValue(['global amount', 'global amount (cad)', 'budget', 'amount'])),
                spendToDate: parseCurrency(getValue(['spend to date', 'spend to date (sap ecc)', 'spend', 'actual'])),
                savings: parseCurrency(getValue(['savings', 'cost savings', 'cost avoidance', 'saved'])),
                spmScore: parseInt(getValue(['spm', 'spm score', 'score'])) || 0,
                riskLevel: mapRiskLevel(getValue(['risk level', 'risk assessment', 'risk'])),
                rfpRequired: parseBoolean(getValue(['rfp required', 'rfp', 'rfp planning'])),
                description: getValue(['description', 'notes', 'comments'])
            });
        } catch (e) {
            log.warn('Skipping invalid row', { row: i, error: e instanceof Error ? e.message : String(e) });
        }
    }

    return vendors;
};

// Robust CSV Line Parser (handles quoted commas)
const parseCSVLine = (line: string): string[] => {
    const values: string[] = [];
    let currentValue = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (inQuotes) {
            if (char === '"') {
                if (i + 1 < line.length && line[i + 1] === '"') {
                    currentValue += '"';
                    i++;
                } else {
                    inQuotes = false;
                }
            } else {
                currentValue += char;
            }
        } else {
            if (char === '"') {
                inQuotes = true;
            } else if (char === ',') {
                values.push(currentValue.trim());
                currentValue = '';
            } else {
                currentValue += char;
            }
        }
    }
    values.push(currentValue.trim());
    return values;
};

import { CorpStructure, RiskLevel, SourcingType } from '@/components/vendor-dashboard/types';

const mapCorpStructure = (val: string): CorpStructure => {
    if (!val) return CorpStructure.IT_Ops;
    const v = val.toLowerCase();
    if (v.includes('it') || v.includes('ops')) return CorpStructure.IT_Ops;
    if (v.includes('marketing')) return CorpStructure.Marketing;
    if (v.includes('hr') || v.includes('human')) return CorpStructure.HR;
    if (v.includes('eng')) return CorpStructure.Engineering;
    if (v.includes('operation')) return CorpStructure.Operations;
    return CorpStructure.IT_Ops; // Default
};

const mapSourcingType = (val: string): SourcingType => {
    if (!val) return 'Competitive';
    const v = val.toLowerCase();
    if (v.includes('sole')) return 'Sole Source';
    if (v.includes('single')) return 'Single Source';
    return 'Competitive';
};

const mapRiskLevel = (val: string): RiskLevel => {
    if (!val) return RiskLevel.Low;
    const v = val.toLowerCase();
    if (v.includes('high')) return RiskLevel.High;
    if (v.includes('med')) return RiskLevel.Medium;
    return RiskLevel.Low;
};

const parseCurrency = (val: string): number => {
    if (!val) return 0;
    let cleanVal = val.replace(/[$,\s]/g, '');
    return parseFloat(cleanVal) || 0;
};

const parseBoolean = (val: string): boolean => {
    if (!val) return false;
    const v = val.toLowerCase();
    return v === 'true' || v === 'yes' || v === '1' || v === 'required' || v.includes('check') || v.includes('rfp');
};

const parseDate = (val: string): string => {
    if (!val) return new Date().toISOString().split('T')[0];
    try {
        const d = new Date(val);
        if (isNaN(d.getTime())) return new Date().toISOString().split('T')[0];
        return d.toISOString().split('T')[0];
    } catch {
        return new Date().toISOString().split('T')[0];
    }
};

const parseOptionalDate = (val: string): string | undefined => {
    if (!val) return undefined;
    try {
        const d = new Date(val);
        if (isNaN(d.getTime())) return undefined;
        return d.toISOString().split('T')[0];
    } catch {
        return undefined;
    }
};
