'use client';

import React from 'react';
import { KPIData } from './types';
import { DollarSign, FileText, AlertTriangle, ShieldAlert, PiggyBank, Files } from 'lucide-react';

interface KPIGridProps {
    data: KPIData;
}

const KPIGrid: React.FC<KPIGridProps> = ({ data }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
            {/* Total Spend */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Spend</p>
                        <h3 className="text-xl font-bold text-slate-800 mt-1">
                            ${(data.totalSpend / 1000000).toFixed(1)}M
                        </h3>
                    </div>
                    <div className="p-1.5 bg-blue-50 rounded-lg">
                        <DollarSign className="w-5 h-5 text-blue-600" />
                    </div>
                </div>
                <div className="mt-2 text-xs text-slate-400">
                    Source: SAP ECC
                </div>
            </div>

            {/* Cost Savings */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Cost Savings</p>
                        <h3 className="text-xl font-bold text-emerald-600 mt-1">
                            ${(data.totalSavings / 1000).toFixed(0)}k
                        </h3>
                    </div>
                    <div className="p-1.5 bg-emerald-50 rounded-lg">
                        <PiggyBank className="w-5 h-5 text-emerald-600" />
                    </div>
                </div>
                <div className="mt-2 text-xs text-slate-400">
                    YTD Realized
                </div>
            </div>

            {/* Active Contracts */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Contracts</p>
                        <h3 className="text-xl font-bold text-slate-800 mt-1">
                            {data.activeContracts}
                        </h3>
                    </div>
                    <div className="p-1.5 bg-indigo-50 rounded-lg">
                        <FileText className="w-5 h-5 text-indigo-600" />
                    </div>
                </div>
                <div className="mt-2 text-xs text-emerald-600 font-medium">
                    Currently Valid
                </div>
            </div>

            {/* Total Contracts */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Contracts</p>
                        <h3 className="text-xl font-bold text-slate-800 mt-1">
                            {data.totalContracts}
                        </h3>
                    </div>
                    <div className="p-1.5 bg-slate-50 rounded-lg">
                        <Files className="w-5 h-5 text-slate-600" />
                    </div>
                </div>
                <div className="mt-2 text-xs text-slate-400">
                    All Records
                </div>
            </div>

            {/* Renewals */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden">
                {data.renewals90d > 0 && (
                    <div className="absolute top-0 right-0 w-12 h-12 bg-yellow-400 opacity-10 rounded-bl-full -mr-6 -mt-6 pointer-events-none"></div>
                )}
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Renewals (90d)</p>
                        <h3 className={`text-xl font-bold mt-1 ${data.renewals90d > 0 ? 'text-yellow-600' : 'text-slate-800'}`}>
                            {data.renewals90d}
                        </h3>
                    </div>
                    <div className={`p-1.5 rounded-lg ${data.renewals90d > 0 ? 'bg-yellow-50' : 'bg-slate-50'}`}>
                        <AlertTriangle className={`w-5 h-5 ${data.renewals90d > 0 ? 'text-yellow-600' : 'text-slate-400'}`} />
                    </div>
                </div>
                <div className="mt-2 text-xs text-slate-500">
                    Require Action
                </div>
            </div>

            {/* High Risk */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">High Risk Vend</p>
                        <h3 className={`text-xl font-bold mt-1 ${data.highRiskCount > 0 ? 'text-red-600' : 'text-slate-800'}`}>
                            {data.highRiskCount}
                        </h3>
                    </div>
                    <div className={`p-1.5 rounded-lg ${data.highRiskCount > 0 ? 'bg-red-50' : 'bg-slate-50'}`}>
                        <ShieldAlert className={`w-5 h-5 ${data.highRiskCount > 0 ? 'text-red-600' : 'text-slate-400'}`} />
                    </div>
                </div>
                <div className="mt-2 text-xs text-slate-500">
                    Check SPM
                </div>
            </div>
        </div>
    );
};

export default KPIGrid;
