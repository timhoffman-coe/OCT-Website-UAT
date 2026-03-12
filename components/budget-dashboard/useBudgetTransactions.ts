import { useState, useEffect } from 'react';
import { Transaction, TransactionStatus, DeploymentStatus, BudgetType } from './types';
import { MOCK_TRANSACTIONS, GOOGLE_SHEET_CSV_URL } from './constants';
import { reportError } from '@/lib/report-client-error';

export const useBudgetTransactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Helper to parse CSV line respecting quotes
    const splitCSVLine = (line: string) => {
        const values = [];
        let current = '';
        let inQuotes = false;

        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                if (i + 1 < line.length && line[i + 1] === '"') {
                    current += '"';
                    i++;
                } else {
                    inQuotes = !inQuotes;
                }
            } else if (char === ',' && !inQuotes) {
                values.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        values.push(current);
        return values;
    };

    const parseCSV = (csvText: string): Transaction[] => {
        const lines = csvText.split(/\r?\n/).filter(line => line.trim() !== '');
        if (lines.length < 2) return [];

        // Parse headers to find column indices
        const headers = splitCSVLine(lines[0]).map(h => h.trim().toLowerCase());

        // Mapping helper with optional exclusion
        const getIndex = (keywords: string[], exclude?: string[]) => {
            return headers.findIndex(h => {
                const matchesKeyword = keywords.some(k => h.includes(k));
                const matchesExclude = exclude ? exclude.some(e => h.includes(e)) : false;
                return matchesKeyword && !matchesExclude;
            });
        };

        // Robust mapping for various naming conventions
        const idx = {
            id: getIndex(['id', 'uuid', 'record']),
            program: getIndex(['program', 'dept', 'department']),
            team: getIndex(['team', 'group', 'cost center']),
            category: getIndex(['category', 'expense', 'classification', 'type']),
            nwa: getIndex(['nwa', 'network', 'activity']),
            project: getIndex(['project', 'description', 'title', 'name']),
            wo: getIndex(['wo', 'work', 'work order', 'work_order']),
            po: getIndex(['po', 'purchase', 'purchase order', 'purchase_order']),
            approved: getIndex(['approved', 'funding', 'budget', 'amount_approved', 'initial']),
            spent: getIndex(['spent', 'actual', 'allocated', 'cost', 'amount_spent', 'spend']),
            year: getIndex(['year', 'fiscal', 'fy', 'date']),
            status: getIndex(['financial', 'status', 'state'], ['deploy']),
            deployStatus: getIndex(['deploy', 'implementation', 'progress']),
            budgetType: getIndex(['type', 'budget_type', 'capex', 'opex'])
        };

        return lines.slice(1).map((line) => {
            const vals = splitCSVLine(line).map(v => v.trim());

            const getValue = (index: number) => index !== -1 ? vals[index] : '';

            const mapStatus = (val: string): TransactionStatus => {
                const v = val.toLowerCase();
                if (v.includes('actual') || v.includes('allocated')) return TransactionStatus.ACTUAL_SAP;
                if (v.includes('plan') || v.includes('budget')) return TransactionStatus.PLANNED;
                if (v.includes('credit') || v.includes('card')) return TransactionStatus.CREDIT_CARD;
                if (v.includes('pending')) return TransactionStatus.PENDING;
                if (v.includes('accrual')) return TransactionStatus.ACCRUAL;
                return TransactionStatus.PLANNED;
            };

            const mapDeployStatus = (val: string): DeploymentStatus => {
                const v = val.toLowerCase();
                if (v.includes('progress') || v.includes('start')) return DeploymentStatus.IN_PROGRESS;
                if (v.includes('complet') || v.includes('done') || v.includes('finish')) return DeploymentStatus.COMPLETED;
                if (v.includes('cancel')) return DeploymentStatus.CANCELLED;
                return DeploymentStatus.NOT_STARTED;
            };

            const mapBudgetType = (val: string): BudgetType => {
                const v = val.toLowerCase();
                if (v.includes('op') || v.includes('exp')) return BudgetType.OPERATING;
                if (v.includes('cap') || v.includes('asset')) return BudgetType.CAPITAL;
                // Fallback logic: check category if explicit type is missing
                const cat = getValue(idx.category).toLowerCase();
                if (cat.includes('maintenance') || cat.includes('subscription') || cat.includes('license')) return BudgetType.OPERATING;
                return BudgetType.CAPITAL;
            };

            // Clean currency strings
            const cleanNumber = (val: string) => parseFloat(val.replace(/[^0-9.-]+/g, '')) || 0;

            return {
                id: getValue(idx.id) || Math.random().toString(36).substring(2, 9),
                program: getValue(idx.program) || 'Unassigned',
                team: getValue(idx.team) || 'Unassigned',
                category: getValue(idx.category) || 'Unassigned',
                nwaNumber: getValue(idx.nwa),
                projectName: getValue(idx.project) || 'Untitled Project',
                woNumber: getValue(idx.wo),
                poNumber: getValue(idx.po),
                amountApproved: cleanNumber(getValue(idx.approved)),
                amountSpent: cleanNumber(getValue(idx.spent)),
                purchaseYear: parseInt(getValue(idx.year)) || new Date().getFullYear(),
                status: mapStatus(getValue(idx.status)),
                deploymentStatus: mapDeployStatus(getValue(idx.deployStatus)),
                budgetType: mapBudgetType(getValue(idx.budgetType)),
                createdAt: new Date().toISOString()
            };
        });
    };

    useEffect(() => {
        const fetchSheetData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(GOOGLE_SHEET_CSV_URL);
                if (!response.ok) {
                    throw new Error(`Failed to fetch sheet data: ${response.statusText}`);
                }
                const text = await response.text();
                const parsedData = parseCSV(text);

                if (parsedData.length > 0) {
                    setTransactions(parsedData);
                } else {
                    reportError('Sheet is empty or failed to parse, using mock data', { module: 'budget-dashboard' });
                    setTransactions(MOCK_TRANSACTIONS);
                }
            } catch (error) {
                reportError(error instanceof Error ? error : String(error), { module: 'budget-dashboard' });
                // Fallback to mock data on error (e.g., CORS issues or private sheet)
                setTransactions(MOCK_TRANSACTIONS);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSheetData();
    }, []);

    return { transactions, isLoading };
};
