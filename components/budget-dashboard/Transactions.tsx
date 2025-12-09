'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useBudgetTransactions } from './useBudgetTransactions';
import { Transaction, Role, BudgetType } from './types';
import TransactionForm from './TransactionForm';
import { Plus, Search, Download, Edit2, Trash2, ArrowUpDown } from 'lucide-react';
import { PROGRAMS } from './constants';

type SortKey = keyof Transaction;

interface TransactionsProps {
    forcedType?: BudgetType;
}

const Transactions: React.FC<TransactionsProps> = ({ forcedType }) => {
    const { transactions } = useBudgetTransactions();

    // Mock roles/actions since we don't have full CRUD yet
    const [localTransactions, setLocalTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        if (transactions.length > 0) {
            // Initial sync
            setLocalTransactions(transactions);
        }
    }, [transactions]);

    // Mock CRUD
    const addTransaction = (t: Transaction) => setLocalTransactions(prev => [t, ...prev]);
    const updateTransaction = (t: Transaction) => setLocalTransactions(prev => prev.map(p => p.id === t.id ? t : p));
    const deleteTransaction = (id: string) => setLocalTransactions(prev => prev.filter(p => p.id !== id));

    const currentUserRole = Role.ADMIN; // Mock role

    // State
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: 'asc' | 'desc' } | null>(null);
    const [programFilter, setProgramFilter] = useState('');

    // Reset filters if route changes
    useEffect(() => {
        setSearchTerm('');
        setProgramFilter('');
    }, [forcedType]);

    // Permissions
    const canEdit = currentUserRole === Role.ADMIN || currentUserRole === Role.EDITOR;
    const canDelete = currentUserRole === Role.ADMIN;

    // Handlers
    const handleAdd = () => {
        setEditingTransaction(null);
        setIsFormOpen(true);
    };

    const handleEdit = (transaction: Transaction) => {
        setEditingTransaction(transaction);
        setIsFormOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this record?')) {
            deleteTransaction(id);
        }
    };

    const handleSave = (transaction: Transaction) => {
        if (editingTransaction) {
            updateTransaction(transaction);
        } else {
            addTransaction(transaction);
        }
    };

    const handleSort = (key: SortKey) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleExport = () => {
        const headers = ['ID', 'Type', 'Program', 'Team', 'Category', 'Project', 'Approved Funding', 'Allocated / Spent', 'Status', 'Deployment', 'Year'];
        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + processedData.map(t => {
                return [t.id, t.budgetType, t.program, t.team, t.category, `"${t.projectName}"`, t.amountApproved, t.amountSpent, t.status, t.deploymentStatus, t.purchaseYear].join(",");
            }).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `transactions_${forcedType || 'all'}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Logic
    const processedData = useMemo(() => {
        let data = [...localTransactions];

        // Force Type Filter (Route based)
        if (forcedType) {
            data = data.filter(t => t.budgetType === forcedType);
        }

        // Search
        if (searchTerm) {
            const lower = searchTerm.toLowerCase();
            data = data.filter(t =>
                t.projectName.toLowerCase().includes(lower) ||
                (t.woNumber && t.woNumber.toLowerCase().includes(lower)) ||
                (t.poNumber && t.poNumber.toLowerCase().includes(lower)) ||
                (t.nwaNumber && t.nwaNumber.toLowerCase().includes(lower))
            );
        }

        // Program Filter
        if (programFilter) {
            data = data.filter(t => t.program === programFilter);
        }

        // Sort
        if (sortConfig) {
            data.sort((a, b) => {
                // @ts-ignore
                const aVal = a[sortConfig.key];
                // @ts-ignore
                const bVal = b[sortConfig.key];

                if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return data;
    }, [localTransactions, searchTerm, sortConfig, programFilter, forcedType]);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
    };

    const getPageTitle = () => {
        if (forcedType === BudgetType.CAPITAL) return 'Capital (CapEx) Entries';
        if (forcedType === BudgetType.OPERATING) return 'Operating (OpEx) Entries';
        return 'Transaction Register';
    };

    return (
        <div className="bg-gray-50 h-full flex flex-col font-sans">
            <div className="bg-white border-b border-gray-200 px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-0 z-10 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 font-sans">{getPageTitle()}</h1>
                    <p className="text-sm text-gray-500 font-serif">Manage {forcedType ? forcedType.toLowerCase() : 'all budget'} line items</p>
                </div>

                <div className="flex items-center space-x-3 w-full md:w-auto">
                    {/* Search */}
                    <div className="relative group w-full md:w-64">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400 group-focus-within:text-[#0081BC]" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search Projects, PO, WO..."
                            className="pl-10 block w-full border-gray-300 rounded-md focus:ring-[#0081BC] focus:border-[#0081BC] sm:text-sm h-10 border"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={handleExport}
                        className="p-2 text-gray-600 hover:text-[#0081BC] border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        title="Export CSV"
                    >
                        <Download size={20} />
                    </button>

                    {canEdit && (
                        <button
                            onClick={handleAdd}
                            className="flex items-center space-x-2 bg-[#0081BC] hover:bg-[#005087] text-white px-4 py-2 rounded-md transition-colors shadow-sm"
                        >
                            <Plus size={18} />
                            <span className="font-medium">Add Entry</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Quick Filters */}
            <div className="px-6 py-3 bg-white border-b border-gray-200 flex gap-2 overflow-x-auto">
                <button
                    onClick={() => setProgramFilter('')}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${!programFilter ? 'bg-[#193A5A] text-white border-[#193A5A]' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}
                >
                    All Programs
                </button>
                {PROGRAMS.map(p => (
                    <button
                        key={p}
                        onClick={() => setProgramFilter(p)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors whitespace-nowrap ${programFilter === p ? 'bg-[#193A5A] text-white border-[#193A5A]' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}
                    >
                        {p}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="flex-1 overflow-auto p-6">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {[
                                    { label: 'Type', key: 'budgetType' },
                                    { label: 'Program', key: 'program' },
                                    { label: 'Team', key: 'team' },
                                    { label: 'Project Name', key: 'projectName' },
                                    { label: 'NWA #', key: 'nwaNumber' },
                                    { label: 'Approved', key: 'amountApproved' },
                                    { label: 'Spent', key: 'amountSpent' },
                                    { label: 'Status', key: 'status' }
                                ].map(({ label, key }) => (
                                    <th
                                        key={label}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none group"
                                        onClick={() => handleSort(key as SortKey)}
                                    >
                                        <div className="flex items-center space-x-1">
                                            <span>{label}</span>
                                            <ArrowUpDown size={12} className={`text-gray-400 ${sortConfig?.key === key ? 'text-[#0081BC]' : ''}`} />
                                        </div>
                                    </th>
                                ))}
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {processedData.length > 0 ? (
                                processedData.map((t) => (
                                    <tr key={t.id} className="hover:bg-blue-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                                            <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${t.budgetType === BudgetType.CAPITAL ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                                {t.budgetType === BudgetType.CAPITAL ? 'CapEx' : 'OpEx'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{t.program}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{t.team}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate" title={t.projectName}>
                                            <div>{t.projectName}</div>
                                            <div className="text-xs text-gray-400 mt-1 flex gap-2">
                                                {t.woNumber && <span>WO: {t.woNumber}</span>}
                                                {t.poNumber && <span>PO: {t.poNumber}</span>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-mono">{t.nwaNumber}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-mono">{formatCurrency(t.amountApproved)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-mono">{formatCurrency(t.amountSpent)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${t.status === 'Actual in SAP' ? 'bg-green-100 text-green-800' :
                                                    t.status === 'Planned' ? 'bg-yellow-100 text-yellow-800' :
                                                        t.status === 'Credit Card' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {t.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                {canEdit && (
                                                    <button onClick={() => handleEdit(t)} className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-100 rounded">
                                                        <Edit2 size={16} />
                                                    </button>
                                                )}
                                                {canDelete && (
                                                    <button onClick={() => handleDelete(t.id)} className="text-red-600 hover:text-red-900 p-1 hover:bg-red-100 rounded">
                                                        <Trash2 size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={9} className="px-6 py-10 text-center text-gray-500">
                                        No transactions found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <TransactionForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSave={handleSave}
                initialData={editingTransaction}
                forcedType={forcedType}
            />
        </div>
    );
};

export default Transactions;
