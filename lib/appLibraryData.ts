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
        id: 'workspace-one',
        name: 'Workspace One Portal',
        description: 'Access City applications, virtual desktops, and remote access tools.',
        url: 'https://workspace.edmonton.ca',
        category: 'it',
    },
    {
        id: 'nic',
        name: 'Network Information Center',
        description: 'Centralized dashboard for network infrastructure, fibre routes, and tower management.',
        url: '/resources/nic',
        category: 'it',
    },
];
