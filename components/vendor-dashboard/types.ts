export enum RiskLevel {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
}

export enum CorpStructure {
    IT_Ops = 'IT Ops',
    Marketing = 'Marketing',
    HR = 'HR',
    Operations = 'Operations',
    Engineering = 'Engineering',
}

export type SourcingType = 'Competitive' | 'Sole Source' | 'Single Source';

export interface Vendor {
    id: string;
    name: string;
    contractTitle: string;
    manager: string;
    corpStructure: CorpStructure;
    sourcingType: SourcingType;
    contractStart: string; // ISO Date
    contractEnd: string; // ISO Date
    councilDate?: string; // ISO Date
    globalAmount: number; // Budget
    spendToDate: number; // Actual
    savings: number;
    spmScore: number; // 0-100
    riskLevel: RiskLevel;
    rfpRequired: boolean;
    description: string;
}

export interface VendorAnalysis {
    daysToExpiry: number;
    budgetUtilization: number;
    status: 'Critical' | 'Attention' | 'Good';
}

export interface DashboardFilters {
    manager: string | 'All';
    corpStructure: string | 'All';
    year: string | 'All';
}

export interface KPIData {
    totalSpend: number;
    totalSavings: number;
    activeContracts: number;
    totalContracts: number;
    renewals90d: number;
    highRiskCount: number;
}
