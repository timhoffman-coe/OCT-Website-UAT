export enum Role {
    ADMIN = 'Admin',
    EDITOR = 'Editor',
    VIEWER = 'Viewer',
}

export enum BudgetType {
    CAPITAL = 'Capital',
    OPERATING = 'Operating',
}

export enum TransactionStatus {
    ACTUAL_SAP = 'Actual in SAP',
    PLANNED = 'Planned',
    CREDIT_CARD = 'Credit Card',
    PENDING = 'Pending Approval',
    ACCRUAL = 'In Accrual',
}

export enum DeploymentStatus {
    NOT_STARTED = 'Not Started',
    IN_PROGRESS = 'In Progress',
    COMPLETED = 'Completed',
    CANCELLED = 'Cancelled',
}

export interface Transaction {
    id: string;
    program: string;
    team: string;
    category: string;
    nwaNumber: string;
    projectName: string;
    woNumber: string;
    poNumber: string;
    amountApproved: number;
    amountSpent: number;
    purchaseYear: number;
    status: TransactionStatus;
    deploymentStatus: DeploymentStatus;
    budgetType: BudgetType;
    createdAt: string;
}

export interface FilterState {
    program: string;
    team: string;
    category: string;
    purchaseYear: string;
    status: string;
}
