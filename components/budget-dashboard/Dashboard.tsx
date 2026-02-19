'use client';

import React, { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useBudgetTransactions } from './useBudgetTransactions';
import { PROGRAMS, TEAMS, CATEGORIES, YEARS } from './constants';
import { TransactionStatus, BudgetType } from './types';
import KPICard from './KPICard';
import { DollarSign, PieChart as PieIcon, Activity, TrendingUp, RefreshCw, Briefcase, BarChart3 } from 'lucide-react';

const BudgetPieCharts = dynamic(
  () => import('./BudgetPieCharts'),
  { ssr: false, loading: () => <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"><div className="h-64 bg-gray-100 rounded animate-pulse" /><div className="h-64 bg-gray-100 rounded animate-pulse" /><div className="h-64 bg-gray-100 rounded animate-pulse" /></div> }
);

interface DashboardProps {
    focusedType?: BudgetType;
}

const Dashboard: React.FC<DashboardProps> = ({ focusedType }) => {
    const { transactions, isLoading } = useBudgetTransactions();
    const [chartMode, setChartMode] = useState<BudgetType>(focusedType || BudgetType.CAPITAL);

    // Update chart mode if focusedType changes (e.g. navigation)
    useEffect(() => {
        if (focusedType) {
            setChartMode(focusedType);
        }
    }, [focusedType]);

    // Filter State
    const [filters, setFilters] = useState({
        program: '',
        team: '',
        category: '',
        purchaseYear: '',
        status: '',
    });

    // Derived Data
    const filteredData = useMemo(() => {
        return transactions.filter(t => {
            // If focusedType is provided (e.g. Capital Dashboard), filter out other types immediately
            if (focusedType && t.budgetType !== focusedType) return false;

            return (
                (!filters.program || t.program === filters.program) &&
                (!filters.team || t.team === filters.team) &&
                (!filters.category || t.category === filters.category) &&
                (!filters.purchaseYear || t.purchaseYear.toString() === filters.purchaseYear) &&
                (!filters.status || t.status === filters.status)
            );
        });
    }, [transactions, filters, focusedType]);

    // Calculations for KPIs
    const calculateStats = (data: typeof transactions) => {
        const totalApproved = data.reduce((acc, curr) => acc + curr.amountApproved, 0);
        const totalSpent = data.reduce((acc, curr) => acc + curr.amountSpent, 0);
        const fundsInAccrual = data
            .filter(t => t.status === TransactionStatus.ACCRUAL)
            .reduce((acc, curr) => acc + curr.amountApproved, 0);

        const initialFunding = totalApproved * 0.9;
        const supplemental = totalApproved * 0.1;

        return {
            totalApproved,
            totalSpent,
            unallocated: totalApproved - totalSpent,
            fundsInAccrual,
            initialFunding,
            supplemental,
            plannedSpending: totalApproved - totalSpent,
            percentSpent: totalApproved > 0 ? (totalSpent / totalApproved) * 100 : 0,
            additionalBusinessFunded: 0
        };
    };

    const capitalStats = useMemo(() => calculateStats(filteredData.filter(t => t.budgetType === BudgetType.CAPITAL)), [filteredData]);
    const operatingStats = useMemo(() => calculateStats(filteredData.filter(t => t.budgetType === BudgetType.OPERATING)), [filteredData]);

    // Chart Data Preparation (Based on Toggle)
    const chartData = useMemo(() => {
        // If focusedType is active, the filteredData is already filtered to that type. 
        // If not (Executive view), we still want to filter chart data based on the toggle (chartMode).

        const data = filteredData.filter(t => t.budgetType === chartMode);

        const fundingByProgram = new Map();
        const spendingByProgram = new Map();
        const spendingByYear = new Map();

        data.forEach(t => {
            fundingByProgram.set(t.program, (fundingByProgram.get(t.program) || 0) + t.amountApproved);
            spendingByProgram.set(t.program, (spendingByProgram.get(t.program) || 0) + t.amountSpent);
            spendingByYear.set(t.purchaseYear.toString(), (spendingByYear.get(t.purchaseYear.toString()) || 0) + t.amountSpent);
        });

        return {
            fundingByProgram: Array.from(fundingByProgram.entries()).map(([name, value]) => ({ name, value })),
            spendingByProgram: Array.from(spendingByProgram.entries()).map(([name, value]) => ({ name, value })),
            spendingByYear: Array.from(spendingByYear.entries()).map(([name, value]) => ({ name, value }))
        };
    }, [filteredData, chartMode]);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    };

    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const resetFilters = () => {
        setFilters({ program: '', team: '', category: '', purchaseYear: '', status: '' });
    };

    const getTitle = () => {
        if (focusedType === BudgetType.CAPITAL) return 'Capital Dashboard';
        if (focusedType === BudgetType.OPERATING) return 'Operating Dashboard';
        return 'Executive Overview';
    }

    const getDescription = () => {
        if (focusedType === BudgetType.CAPITAL) return 'Detailed analytics for Capital Expenditure (CapEx)';
        if (focusedType === BudgetType.OPERATING) return 'Detailed analytics for Operating Expenditure (OpEx)';
        return 'Combined financial overview for Capital and Operating budgets';
    }

    if (isLoading) {
        return <div className="p-8 text-center text-gray-500">Loading Dashboard Data...</div>;
    }

    return (
        <div className="w-full">

            {/* Header & Filters */}
            <div className="mb-8">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-[#212529] font-sans">{getTitle()}</h2>
                        <p className="text-gray-600 mt-2 font-serif">{getDescription()}</p>
                    </div>
                    <button
                        onClick={resetFilters}
                        className="flex items-center space-x-2 bg-white hover:bg-gray-50 text-[#005087] px-4 py-2 rounded-lg transition-colors border border-[#005087] shadow-sm font-sans font-semibold text-sm"
                    >
                        <RefreshCw size={16} />
                        <span>Reset View</span>
                    </button>
                </div>

                {/* Filter Bar */}
                <div className="bg-[#D3ECEF] p-4 rounded-xl border border-[#D3ECEF] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="relative">
                        <label className="text-xs font-bold text-[#193A5A] mb-1 block uppercase tracking-wide">Program</label>
                        <select
                            className="w-full bg-white border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-[#005087] focus:border-[#005087] block p-2.5"
                            value={filters.program}
                            onChange={(e) => handleFilterChange('program', e.target.value)}
                        >
                            <option value="">All Programs</option>
                            {PROGRAMS.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>

                    <div className="relative">
                        <label className="text-xs font-bold text-[#193A5A] mb-1 block uppercase tracking-wide">Team</label>
                        <select
                            className="w-full bg-white border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-[#005087] focus:border-[#005087] block p-2.5"
                            value={filters.team}
                            onChange={(e) => handleFilterChange('team', e.target.value)}
                        >
                            <option value="">All Teams</option>
                            {TEAMS.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>

                    <div className="relative">
                        <label className="text-xs font-bold text-[#193A5A] mb-1 block uppercase tracking-wide">Category</label>
                        <select
                            className="w-full bg-white border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-[#005087] focus:border-[#005087] block p-2.5"
                            value={filters.category}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                        >
                            <option value="">All Categories</option>
                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div className="relative">
                        <label className="text-xs font-bold text-[#193A5A] mb-1 block uppercase tracking-wide">Year</label>
                        <select
                            className="w-full bg-white border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-[#005087] focus:border-[#005087] block p-2.5"
                            value={filters.purchaseYear}
                            onChange={(e) => handleFilterChange('purchaseYear', e.target.value)}
                        >
                            <option value="">All Years</option>
                            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                    </div>

                    <div className="relative">
                        <label className="text-xs font-bold text-[#193A5A] mb-1 block uppercase tracking-wide">Status</label>
                        <select
                            className="w-full bg-white border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-[#005087] focus:border-[#005087] block p-2.5"
                            value={filters.status}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                        >
                            <option value="">All Statuses</option>
                            {Object.values(TransactionStatus).map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {/* Capital Budget Section */}
            {(!focusedType || focusedType === BudgetType.CAPITAL) && (
                <div className="mb-10">
                    <div className="flex items-center space-x-2 mb-4">
                        <Briefcase className="text-[#0081BC] w-6 h-6" />
                        <h3 className="text-xl font-bold text-[#005087] uppercase tracking-wide font-sans">Capital Budget (CapEx)</h3>
                    </div>

                    {/* KPI Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
                        <KPICard
                            title="Approved Funding"
                            value={formatCurrency(capitalStats.totalApproved)}
                            icon={<DollarSign className="w-5 h-5" />}
                            color="accent"
                        />
                        <KPICard
                            title="Allocated Capital"
                            value={formatCurrency(capitalStats.totalSpent)}
                            subValue={`${capitalStats.percentSpent.toFixed(1)}% of budget used`}
                            icon={<PieIcon className="w-5 h-5" />}
                            color={capitalStats.percentSpent > 90 ? 'danger' : 'success'}
                        />
                        <KPICard
                            title="Unallocated Capital"
                            value={formatCurrency(capitalStats.unallocated)}
                            icon={<Activity className="w-5 h-5" />}
                            color="warning"
                        />
                        <KPICard
                            title="Funds In Accrual"
                            value={formatCurrency(capitalStats.fundsInAccrual)}
                            icon={<TrendingUp className="w-5 h-5" />}
                            color="primary"
                        />
                    </div>

                    {/* Secondary KPI Row */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="text-xs text-gray-500 uppercase font-bold">Initial Approved</p>
                            <p className="text-lg font-bold text-[#212529]">{formatCurrency(capitalStats.initialFunding)}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="text-xs text-gray-500 uppercase font-bold">Adjustments</p>
                            <p className="text-lg font-bold text-[#212529]">{formatCurrency(capitalStats.supplemental)}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="text-xs text-gray-500 uppercase font-bold">Total Spent</p>
                            <p className="text-lg font-bold text-[#212529]">{formatCurrency(capitalStats.totalSpent)}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="text-xs text-gray-500 uppercase font-bold">Planned Spend</p>
                            <p className="text-lg font-bold text-[#212529]">{formatCurrency(capitalStats.plannedSpending)}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="text-xs text-gray-500 uppercase font-bold">% Spent</p>
                            <p className="text-lg font-bold text-[#212529]">{capitalStats.percentSpent.toFixed(1)}%</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <p className="text-xs text-gray-500 uppercase font-bold">Add. Funded</p>
                            <p className="text-lg font-bold text-[#212529]">{formatCurrency(0)}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Operating Budget Section */}
            {(!focusedType || focusedType === BudgetType.OPERATING) && (
                <div className={`mb-10 ${!focusedType ? 'pt-8 border-t border-gray-200' : ''}`}>
                    <div className="flex items-center space-x-2 mb-4">
                        <BarChart3 className="text-[#109D7E] w-6 h-6" />
                        <h3 className="text-xl font-bold text-[#005087] uppercase tracking-wide font-sans">Operating Budget (OpEx)</h3>
                    </div>

                    {/* OpEx KPI Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
                        <KPICard
                            title="Operating Budget"
                            value={formatCurrency(operatingStats.totalApproved)}
                            icon={<DollarSign className="w-5 h-5" />}
                            color="success"
                        />
                        <KPICard
                            title="Actual Spent"
                            value={formatCurrency(operatingStats.totalSpent)}
                            subValue={`${operatingStats.percentSpent.toFixed(1)}% of budget used`}
                            icon={<PieIcon className="w-5 h-5" />}
                            color={operatingStats.percentSpent > 90 ? 'danger' : 'success'}
                        />
                        <KPICard
                            title="Remaining Budget"
                            value={formatCurrency(operatingStats.unallocated)}
                            icon={<Activity className="w-5 h-5" />}
                            color="warning"
                        />
                        <KPICard
                            title="Accruals"
                            value={formatCurrency(operatingStats.fundsInAccrual)}
                            icon={<TrendingUp className="w-5 h-5" />}
                            color="primary"
                        />
                    </div>
                </div>
            )}

            {/* Charts Row */}
            <div className="pt-8 border-t border-gray-200">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-[#212529] uppercase tracking-wide font-sans">
                        Visual Analytics {focusedType ? ` - ${focusedType}` : ''}
                    </h3>

                    {/* Chart Toggle - Only show if no focusedType */}
                    {!focusedType && (
                        <div className="bg-gray-200 p-1 rounded-lg inline-flex">
                            <button
                                onClick={() => setChartMode(BudgetType.CAPITAL)}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${chartMode === BudgetType.CAPITAL ? 'bg-white text-[#0081BC] shadow' : 'text-gray-500 hover:text-gray-900'}`}
                            >
                                Capital
                            </button>
                            <button
                                onClick={() => setChartMode(BudgetType.OPERATING)}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${chartMode === BudgetType.OPERATING ? 'bg-white text-[#109D7E] shadow' : 'text-gray-500 hover:text-gray-900'}`}
                            >
                                Operating
                            </button>
                        </div>
                    )}
                </div>

                <BudgetPieCharts
                    fundingByProgram={chartData.fundingByProgram}
                    spendingByProgram={chartData.spendingByProgram}
                    spendingByYear={chartData.spendingByYear}
                    formatCurrency={formatCurrency}
                />
            </div>
        </div>
    );
};

export default Dashboard;
