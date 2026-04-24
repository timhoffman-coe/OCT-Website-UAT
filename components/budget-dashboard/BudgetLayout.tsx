'use client';

import React, { useState } from 'react';
import { LayoutDashboard, TableProperties, Settings, WalletCards, UserCircle, Loader2, Briefcase, BarChart3, PieChart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useBudgetTransactions } from './useBudgetTransactions';
import { Role } from './types';

// Role Context Mock since we don't have a global auth provider yet for this scope
// In a real app, this would come from a Context Provider
const useRole = () => {
    const [currentUserRole, setRole] = useState<Role>(Role.ADMIN);
    return { currentUserRole, setRole };
}

interface LayoutProps {
    children: React.ReactNode;
}

const BudgetLayout: React.FC<LayoutProps> = ({ children }) => {
    const pathname = usePathname();
    const { isLoading } = useBudgetTransactions();
    const { currentUserRole, setRole } = useRole();

    const isActive = (path: string) => {
        // Exact match for root /budget/dashboard (Executive) or specific paths
        if (path === '/budget/dashboard' && pathname === '/budget/dashboard') return true;
        return pathname === path;
    };

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden font-sans relative">
            {/* Loading Overlay */}
            {isLoading && (
                <div className="absolute inset-0 z-50 bg-[#193A5A]/90 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                    <Loader2 className="w-12 h-12 animate-spin mb-4 text-[#0081BC]" />
                    <p className="text-lg font-medium">Syncing with Google Sheets...</p>
                </div>
            )}

            {/* Sidebar */}
            <aside className="w-64 bg-[#193A5A] text-slate-300 flex flex-col shadow-xl z-20 flex-shrink-0">
                <div className="p-6 flex items-center space-x-2 border-b border-[#005087]/50">
                    <div className="bg-[#0081BC] p-2 rounded-lg">
                        <WalletCards className="text-white w-6 h-6" />
                    </div>
                    <h1 className="text-xl font-bold text-white tracking-tight">Capital Tracker</h1>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">

                    {/* Analytics Section */}
                    <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Analytics</p>

                    <Link
                        href="/budget/dashboard"
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive('/budget/dashboard') ? 'bg-[#005087] text-white border-l-4 border-[#0081BC]' : 'hover:bg-[#005087]/50 hover:text-white border-l-4 border-transparent'
                            }`}
                    >
                        <LayoutDashboard size={20} />
                        <span className="font-medium">Executive Overview</span>
                    </Link>

                    <Link
                        href="/budget/capital"
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive('/budget/capital') ? 'bg-[#005087] text-white border-l-4 border-[#0081BC]' : 'hover:bg-[#005087]/50 hover:text-white border-l-4 border-transparent'
                            }`}
                    >
                        <Briefcase size={20} />
                        <span className="font-medium">Capital Dashboard</span>
                    </Link>

                    <Link
                        href="/budget/operating"
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive('/budget/operating') ? 'bg-[#005087] text-white border-l-4 border-[#109D7E]' : 'hover:bg-[#005087]/50 hover:text-white border-l-4 border-transparent'
                            }`}
                    >
                        <PieChart size={20} />
                        <span className="font-medium">Operating Dashboard</span>
                    </Link>

                    {/* Data Management Section */}
                    <div className="pt-6">
                        <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Data Management</p>
                        <Link
                            href="/budget/transactions"
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive('/budget/transactions') ? 'bg-[#005087] text-white border-l-4 border-[#99479A]' : 'hover:bg-[#005087]/50 hover:text-white border-l-4 border-transparent'
                                }`}
                        >
                            <TableProperties size={20} />
                            <span className="font-medium">Transaction Register</span>
                        </Link>
                    </div>

                    <div className="mt-auto border-t border-[#005087]/50 pt-4">
                        <button
                            className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-[#005087]/50 hover:text-white transition-colors text-left"
                        >
                            <Settings size={20} />
                            <span className="font-medium">Settings</span>
                        </button>
                    </div>
                </nav>

                {/* User Role Switcher Mock */}
                <div className="p-4 border-t border-[#005087]/50 bg-[#193A5A]">
                    <div className="flex items-center space-x-3 mb-3">
                        <UserCircle className="w-8 h-8 text-gray-400" />
                        <div>
                            <p className="text-sm font-medium text-white">Current User</p>
                            <p className="text-xs text-gray-400">{currentUserRole}</p>
                        </div>
                    </div>
                    <label className="text-xs text-gray-400 block mb-1">Switch Role (Demo):</label>
                    <select
                        className="w-full bg-[#005087]/50 border-none rounded text-xs text-slate-300 focus:ring-1 focus:ring-[#0081BC]"
                        value={currentUserRole}
                        onChange={(e) => setRole(e.target.value as Role)}
                    >
                        <option value={Role.ADMIN}>Admin</option>
                        <option value={Role.EDITOR}>Editor</option>
                        <option value={Role.VIEWER}>Viewer</option>
                    </select>
                </div>
            </aside>

            {/* Main Content */}
            <main id="main-content" className="flex-1 flex flex-col overflow-hidden relative">
                <div className="flex-1 overflow-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default BudgetLayout;
