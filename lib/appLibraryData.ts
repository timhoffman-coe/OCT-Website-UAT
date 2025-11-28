export interface App {
    id: string;
    name: string;
    description: string;
    url: string;
    icon?: string; // URL to icon image or component name if using a library
    category: string;
}

export interface Category {
    id: string;
    name: string;
}

export const categories: Category[] = [
    { id: 'finance', name: 'Finance & Budget' },
    { id: 'hr', name: 'Human Resources' },
    { id: 'operations', name: 'Operations' },
    { id: 'it', name: 'IT Tools' },
    { id: 'productivity', name: 'Productivity' },
];

export const appLibraryData: App[] = [
    {
        id: 'budget-planner',
        name: 'Budget Planner',
        description: 'Plan and track department budgets for the fiscal year.',
        url: '#',
        category: 'finance',
    },
    {
        id: 'expense-reports',
        name: 'Expense Reports',
        description: 'Submit and approve employee expenses.',
        url: '#',
        category: 'finance',
    },
    {
        id: 'employee-portal',
        name: 'Employee Portal',
        description: 'Access pay stubs, benefits, and personal information.',
        url: '#',
        category: 'hr',
    },
    {
        id: 'leave-management',
        name: 'Leave Management',
        description: 'Request time off and view leave balances.',
        url: '#',
        category: 'hr',
    },
    {
        id: 'fleet-management',
        name: 'Fleet Management',
        description: 'Track vehicle maintenance and usage.',
        url: '#',
        category: 'operations',
    },
    {
        id: 'facility-booking',
        name: 'Facility Booking',
        description: 'Book meeting rooms and event spaces.',
        url: '#',
        category: 'operations',
    },
    {
        id: 'service-desk',
        name: 'IT Service Desk',
        description: 'Report technical issues and request IT services.',
        url: '#',
        category: 'it',
    },
    {
        id: 'password-reset',
        name: 'Password Reset',
        description: 'Self-service password reset tool.',
        url: '#',
        category: 'it',
    },
    {
        id: 'project-tracker',
        name: 'Project Tracker',
        description: 'Track project milestones and deliverables.',
        url: '#',
        category: 'productivity',
    },
    {
        id: 'document-center',
        name: 'Document Center',
        description: 'Central repository for corporate documents and templates.',
        url: '#',
        category: 'productivity',
    },
];
