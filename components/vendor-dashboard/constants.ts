import { Vendor, CorpStructure, RiskLevel, SourcingType } from './types';

// Helper to generate dates relative to today
const addDays = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
};

export const MOCK_MANAGERS = ['J. Doe', 'S. Smith', 'B. Lee', 'A. Gupta', 'M. Chen'];

export const MOCK_VENDORS: Vendor[] = [
    {
        id: 'v1',
        name: 'Oracle',
        contractTitle: 'DB License Enterprise',
        manager: 'J. Doe',
        corpStructure: CorpStructure.IT_Ops,
        sourcingType: 'Sole Source',
        contractStart: '2023-01-01',
        contractEnd: addDays(25), // Critical: Expiring < 30 days
        councilDate: addDays(10), // Approaching Council Date
        globalAmount: 200000,
        spendToDate: 150000,
        savings: 15000,
        spmScore: 45, // Low SPM
        riskLevel: RiskLevel.High,
        rfpRequired: true,
        description: 'Core database licensing for legacy systems.'
    },
    {
        id: 'v2',
        name: 'Microsoft',
        contractTitle: 'Azure Cloud Services',
        manager: 'S. Smith',
        corpStructure: CorpStructure.Engineering,
        sourcingType: 'Competitive',
        contractStart: '2023-06-01',
        contractEnd: addDays(80), // Attention: Expiring < 90 days
        globalAmount: 1200000,
        spendToDate: 1150000, // Attention: > 90% spend
        savings: 50000,
        spmScore: 88,
        riskLevel: RiskLevel.Low,
        rfpRequired: false,
        description: 'Cloud infrastructure hosting and compute.'
    },
    {
        id: 'v3',
        name: 'Salesforce',
        contractTitle: 'CRM Seat Lic',
        manager: 'J. Doe',
        corpStructure: CorpStructure.Marketing,
        sourcingType: 'Single Source',
        contractStart: '2024-01-15',
        contractEnd: addDays(300),
        globalAmount: 500000,
        spendToDate: 85000,
        savings: 25000,
        spmScore: 92,
        riskLevel: RiskLevel.Low,
        rfpRequired: false,
        description: 'Sales and marketing CRM platform.'
    },
    {
        id: 'v4',
        name: 'AWS',
        contractTitle: 'Hosting Infrastructure',
        manager: 'B. Lee',
        corpStructure: CorpStructure.Engineering,
        sourcingType: 'Competitive',
        contractStart: '2023-03-20',
        contractEnd: addDays(180),
        globalAmount: 800000,
        spendToDate: 200000,
        savings: 80000,
        spmScore: 95,
        riskLevel: RiskLevel.Low,
        rfpRequired: false,
        description: 'Secondary cloud provider for redundancy.'
    },
    {
        id: 'v5',
        name: 'ServiceNow',
        contractTitle: 'ITSM Platform',
        manager: 'M. Chen',
        corpStructure: CorpStructure.IT_Ops,
        sourcingType: 'Competitive',
        contractStart: '2022-11-01',
        contractEnd: addDays(15), // Critical Expiry
        councilDate: addDays(-5), // Just passed
        globalAmount: 350000,
        spendToDate: 340000, // Critical Spend
        savings: 0,
        spmScore: 78,
        riskLevel: RiskLevel.Medium,
        rfpRequired: true,
        description: 'IT Service Management ticketing system.'
    },
    {
        id: 'v6',
        name: 'Workday',
        contractTitle: 'HRIS System',
        manager: 'A. Gupta',
        corpStructure: CorpStructure.HR,
        sourcingType: 'Single Source',
        contractStart: '2023-05-10',
        contractEnd: addDays(400),
        globalAmount: 600000,
        spendToDate: 300000,
        savings: 45000,
        spmScore: 85,
        riskLevel: RiskLevel.Low,
        rfpRequired: false,
        description: 'Human resources information system.'
    },
    {
        id: 'v7',
        name: 'Atlassian',
        contractTitle: 'Jira/Confluence',
        manager: 'S. Smith',
        corpStructure: CorpStructure.Engineering,
        sourcingType: 'Sole Source',
        contractStart: '2023-08-01',
        contractEnd: addDays(60), // Attention
        councilDate: addDays(45), // Upcoming Council
        globalAmount: 150000,
        spendToDate: 100000,
        savings: 5000,
        spmScore: 90,
        riskLevel: RiskLevel.Low,
        rfpRequired: true,
        description: 'Project management and documentation tools.'
    },
    {
        id: 'v8',
        name: 'Zoom',
        contractTitle: 'Video Conferencing',
        manager: 'B. Lee',
        corpStructure: CorpStructure.Operations,
        sourcingType: 'Competitive',
        contractStart: '2024-02-01',
        contractEnd: addDays(365),
        globalAmount: 80000,
        spendToDate: 10000,
        savings: 12000,
        spmScore: 98,
        riskLevel: RiskLevel.Low,
        rfpRequired: false,
        description: 'Enterprise video communication.'
    },
    {
        id: 'v9',
        name: 'Slack',
        contractTitle: 'Messaging Platform',
        manager: 'B. Lee',
        corpStructure: CorpStructure.Operations,
        sourcingType: 'Single Source',
        contractStart: '2024-01-01',
        contractEnd: addDays(330),
        globalAmount: 120000,
        spendToDate: 40000,
        savings: 8000,
        spmScore: 96,
        riskLevel: RiskLevel.Low,
        rfpRequired: false,
        description: 'Internal communication tool.'
    },
    {
        id: 'v10',
        name: 'Unknown Vendor X',
        contractTitle: 'Legacy Support',
        manager: 'J. Doe',
        corpStructure: CorpStructure.IT_Ops,
        sourcingType: 'Sole Source',
        contractStart: '2020-01-01',
        contractEnd: addDays(5),
        councilDate: addDays(2), // Very soon
        globalAmount: 50000,
        spendToDate: 49000,
        savings: 0,
        spmScore: 30, // Low SPM
        riskLevel: RiskLevel.High, // High Risk
        rfpRequired: true,
        description: 'Legacy hardware support, needs replacement.'
    },
    {
        id: 'v11',
        name: 'Adobe',
        contractTitle: 'Creative Cloud',
        manager: 'M. Chen',
        corpStructure: CorpStructure.Marketing,
        sourcingType: 'Single Source',
        contractStart: '2023-09-01',
        contractEnd: addDays(120),
        globalAmount: 250000,
        spendToDate: 240000, // High spend utilization
        savings: 10000,
        spmScore: 82,
        riskLevel: RiskLevel.Medium,
        rfpRequired: false,
        description: 'Creative software suite.'
    },
    {
        id: 'v12',
        name: 'Cisco',
        contractTitle: 'Network Hardware',
        manager: 'A. Gupta',
        corpStructure: CorpStructure.IT_Ops,
        sourcingType: 'Competitive',
        contractStart: '2022-06-15',
        contractEnd: addDays(45), // Attention
        globalAmount: 900000,
        spendToDate: 700000,
        savings: 120000,
        spmScore: 89,
        riskLevel: RiskLevel.Medium,
        rfpRequired: true,
        description: 'Networking infrastructure hardware and support.'
    }
];

export const STATUS_COLORS: Record<string, string> = {
    Critical: 'bg-red-100 text-red-800 border-red-200',
    Attention: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Good: 'bg-emerald-100 text-emerald-800 border-emerald-200',
};

export const RISK_COLORS: Record<string, string> = {
    High: 'text-red-600',
    Medium: 'text-yellow-600',
    Low: 'text-emerald-600',
};
