'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Route, RadioTower, Network, Users, Link as LinkIcon, LogOut, LucideIcon } from 'lucide-react';

const Sidebar: React.FC = () => {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/resources/nic') return pathname === '/resources/nic';
        return pathname.startsWith(path);
    };

    const navItems: { path: string; Icon: LucideIcon; label: string }[] = [
        { path: '/resources/nic', Icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/resources/nic/fibre-routes', Icon: Route, label: 'Fibre Routes' },
        { path: '/resources/nic/wireless-towers', Icon: RadioTower, label: 'Wireless Towers' },
        { path: '/resources/nic/carrier-services', Icon: Network, label: 'Carrier Services' },
        { path: '/resources/nic/team-contacts', Icon: Users, label: 'Team Contacts' },
        { path: '/resources/nic/quick-links', Icon: LinkIcon, label: 'Quick Links' },
    ];

    return (
        <aside className="flex flex-col w-64 bg-white border-r border-gray-200 shrink-0 h-[calc(100vh-128px)] sticky top-[128px] z-30">
            <div className="flex flex-col h-full p-4">
                {/* Logo Section */}
                <div className="flex items-center gap-3 px-2 mb-8">
                    <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0 bg-primary-blue/10 text-primary-blue flex items-center justify-center font-bold"
                    >
                        NIC
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <h1 className="text-gray-900 text-base font-bold leading-normal truncate">Network Ops</h1>
                        <p className="text-gray-500 text-sm font-normal leading-normal truncate">Dashboard</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-2 flex-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`
                flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                ${isActive(item.path)
                                    ? 'bg-primary-blue/10 text-primary-blue font-semibold'
                                    : 'text-gray-700 hover:bg-gray-50'}
              `}
                        >
                            <item.Icon className="w-5 h-5" />
                            <p className="text-sm">{item.label}</p>
                        </Link>
                    ))}
                </nav>

                {/* Bottom Actions */}
                <div className="flex flex-col gap-2 mt-auto border-t border-gray-200 pt-4">
                    <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary-blue text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors mb-2 shadow-sm">
                        <span className="truncate">Report Issue</span>
                    </button>

                    <Link className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors" href="/">
                        <LogOut className="w-5 h-5" />
                        <p className="text-sm font-medium">Exit NIC</p>
                    </Link>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
