export interface App {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    status: 'production' | 'beta' | 'development';
    team: string;
    featured?: boolean;
    actionLabel?: string;
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
    { id: 'citizen', name: 'Citizen Services' },
    { id: 'data', name: 'Data & Analytics' },
];

export const appLibraryData: App[] = [
    {
        id: 'workspace-one',
        name: 'Workspace One Portal',
        description: 'Access City applications, virtual desktops, and remote access tools.',
        url: 'https://workspace.edmonton.ca',
        category: 'it',
        status: 'production',
        team: 'ITS',
        featured: true,
        actionLabel: 'Launch App',
    },
    {
        id: 'nic',
        name: 'Network Information Center',
        description: 'Centralized dashboard for network infrastructure, fibre routes, and tower management.',
        url: '/resources/nic',
        category: 'it',
        status: 'production',
        team: 'ITS',
        actionLabel: 'Open Portal',
    },
    {
        id: 'open-data-portal',
        name: 'Open Data Portal',
        description: 'Access open datasets published by the City of Edmonton for public use, research, and innovation.',
        url: 'https://data.edmonton.ca',
        category: 'data',
        status: 'production',
        team: 'ITS',
        actionLabel: 'Open Portal',
    },
];
