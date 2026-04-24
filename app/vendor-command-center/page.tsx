'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { LayoutDashboard, Loader2, Database, AlertCircle } from 'lucide-react';
import FilterBar from '@/components/vendor-dashboard/FilterBar';
import KPIGrid from '@/components/vendor-dashboard/KPIGrid';
import ChartsSection from '@/components/vendor-dashboard/ChartsSection';
import VendorTable from '@/components/vendor-dashboard/VendorTable';
import AIInsights from '@/components/vendor-dashboard/AIInsights';
import ForecastSection from '@/components/vendor-dashboard/ForecastSection';
import { MOCK_VENDORS } from '@/components/vendor-dashboard/constants';
import { DashboardFilters, KPIData, RiskLevel, Vendor } from '@/components/vendor-dashboard/types';
import { fetchSheetData } from './actions';
import { reportError } from '@/lib/report-client-error';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DashboardDisclaimer from '@/components/DashboardDisclaimer';

export default function VendorCommandCenter() {
    const [vendors, setVendors] = useState<Vendor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUsingMock, setIsUsingMock] = useState(false);
    const [filters, setFilters] = useState<DashboardFilters>({
        manager: 'All',
        corpStructure: 'All',
        year: 'All',
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchSheetData();
                if (data.length > 0) {
                    setVendors(data);
                    setIsUsingMock(false);
                } else {
                    // Fallback if sheet is empty but accessible
                    reportError('Sheet data empty, using mock', { module: 'vendor-dashboard' });
                    setVendors(MOCK_VENDORS);
                    setIsUsingMock(true);
                }
            } catch (error) {
                reportError(error instanceof Error ? error : String(error), { module: 'vendor-dashboard' });
                setVendors(MOCK_VENDORS);
                setIsUsingMock(true);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    // --- Filtering Logic ---
    const filteredVendors = useMemo(() => {
        return vendors.filter(v => {
            const matchManager = filters.manager === 'All' || v.manager === filters.manager;
            const matchStructure = filters.corpStructure === 'All' || v.corpStructure === filters.corpStructure;

            // Simple year logic: check if contract overlaps with selected year
            let matchYear = true;
            if (filters.year !== 'All') {
                const startYear = new Date(v.contractStart).getFullYear().toString();
                const endYear = new Date(v.contractEnd).getFullYear().toString();
                matchYear = startYear <= filters.year && endYear >= filters.year;
            }

            return matchManager && matchStructure && matchYear;
        });
    }, [vendors, filters]);

    // --- Aggregation Logic for KPIs ---
    const kpiData: KPIData = useMemo(() => {
        const today = new Date();
        const future90d = new Date();
        future90d.setDate(today.getDate() + 90);

        return filteredVendors.reduce((acc, curr) => {
            // Total Spend
            acc.totalSpend += curr.spendToDate;

            // Total Savings
            acc.totalSavings += curr.savings || 0;

            // Total Contracts Count (based on filters)
            acc.totalContracts += 1;

            // Active Contracts (End date > today)
            if (new Date(curr.contractEnd) > today) {
                acc.activeContracts += 1;
            }

            // Renewals within 90 days
            const endDate = new Date(curr.contractEnd);
            if (endDate >= today && endDate <= future90d) {
                acc.renewals90d += 1;
            }

            // High Risk
            if (curr.riskLevel === RiskLevel.High) {
                acc.highRiskCount += 1;
            }

            return acc;
        }, {
            totalSpend: 0,
            totalSavings: 0,
            activeContracts: 0,
            totalContracts: 0,
            renewals90d: 0,
            highRiskCount: 0
        });
    }, [filteredVendors]);

    // Get Critical vendors for AI context (High risk OR expiring soon)
    const criticalVendors = useMemo(() => {
        const today = new Date();
        const future30d = new Date();
        future30d.setDate(today.getDate() + 30);

        return filteredVendors.filter(v =>
            v.riskLevel === RiskLevel.High ||
            (new Date(v.contractEnd) >= today && new Date(v.contractEnd) <= future30d)
        );
    }, [filteredVendors]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Header />
                <main id="main-content" className="animate-pulse p-4 md:p-8">
                    <div className="max-w-7xl mx-auto mb-8">
                        <div className="h-8 w-64 bg-gray-300 rounded mb-4" />
                    </div>
                    <div className="max-w-7xl mx-auto space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="bg-white rounded-lg shadow p-4">
                                    <div className="h-4 w-20 bg-gray-200 rounded mb-2" />
                                    <div className="h-8 w-12 bg-gray-300 rounded mb-1" />
                                    <div className="h-3 w-16 bg-gray-200 rounded" />
                                </div>
                            ))}
                        </div>
                        <div className="bg-white rounded-lg shadow p-4">
                            <div className="space-y-3">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="flex gap-4 items-center">
                                        <div className="h-4 w-40 bg-gray-200 rounded" />
                                        <div className="h-4 flex-1 bg-gray-100 rounded" />
                                        <div className="h-4 w-24 bg-gray-200 rounded" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
            <DashboardDisclaimer dashboardName="Vendor Command Centre" />
            <Header />

            {isUsingMock && (
                <div className="bg-red-600 text-white text-center py-3 px-4">
                    <p className="font-sans text-lg font-bold uppercase tracking-wide">
                        ⚠️ SAMPLE DATA ONLY - NOT LIVE ⚠️
                    </p>
                </div>
            )}

            {/* Dashboard Header - Custom for this page */}
            <div className="bg-white border-b border-slate-200 shadow-sm mt-16 md:mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-600 p-2 rounded-lg">
                            <LayoutDashboard className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">Vendor Command Center</h1>
                            {isUsingMock ? (
                                <div className="flex items-center gap-1 text-xs text-amber-600 font-medium mt-1">
                                    <AlertCircle className="w-3 h-3" />
                                    Using Mock Data (Sheet Unavailable)
                                </div>
                            ) : (
                                <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium mt-1">
                                    <Database className="w-3 h-3" />
                                    Connected to Live Sheet
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-slate-500 hidden md:block">
                            Last updated: {new Date().toLocaleDateString()}
                        </div>
                        <div className="h-8 w-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs">
                            IT
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">

                {/* Filters */}
                <FilterBar filters={filters} setFilters={setFilters} />

                {/* AI Section */}
                <AIInsights kpiData={kpiData} criticalVendors={criticalVendors} />

                {/* KPIs */}
                <KPIGrid data={kpiData} />

                {/* Charts */}
                <ChartsSection vendors={filteredVendors} />

                {/* Forecasts */}
                <ForecastSection vendors={filteredVendors} />

                {/* Action Table */}
                <VendorTable vendors={filteredVendors} />

            </main>

            <Footer />
        </div>
    );
}
