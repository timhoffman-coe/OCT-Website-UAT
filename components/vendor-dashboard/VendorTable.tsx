'use client';

import React from 'react';
import { Vendor, RiskLevel, VendorAnalysis } from './types';
import { STATUS_COLORS } from './constants';

interface VendorTableProps {
    vendors: Vendor[];
}

const VendorTable: React.FC<VendorTableProps> = ({ vendors }) => {

    // Logic to determine row status (Red/Yellow/Green)
    const analyzeVendor = (v: Vendor): VendorAnalysis => {
        const today = new Date();
        const expiryDate = new Date(v.contractEnd);
        const diffTime = Math.abs(expiryDate.getTime() - today.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const isExpiredOrFuture = expiryDate.getTime() - today.getTime(); // Negative if expired

        const budgetUtilization = (v.spendToDate / v.globalAmount) * 100;

        let status: VendorAnalysis['status'] = 'Good';

        // Critical Logic
        if (isExpiredOrFuture < (30 * 24 * 60 * 60 * 1000) || v.riskLevel === RiskLevel.High) {
            status = 'Critical';
        }
        // Attention Logic
        else if (isExpiredOrFuture < (90 * 24 * 60 * 60 * 1000) || budgetUtilization > 90) {
            status = 'Attention';
        }

        return {
            daysToExpiry: isExpiredOrFuture < 0 ? -diffDays : diffDays,
            budgetUtilization,
            status
        };
    };

    // Sort by Status severity then Expiry Date
    const sortedVendors = [...vendors].map(v => ({ ...v, analysis: analyzeVendor(v) })).sort((a, b) => {
        const severityMap = { 'Critical': 0, 'Attention': 1, 'Good': 2 };
        if (severityMap[a.analysis.status] !== severityMap[b.analysis.status]) {
            return severityMap[a.analysis.status] - severityMap[b.analysis.status];
        }
        return new Date(a.contractEnd).getTime() - new Date(b.contractEnd).getTime();
    });

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 uppercase tracking-wide text-sm">Detailed Action List</h3>
                <span className="text-xs text-slate-500 font-medium bg-white px-2 py-1 rounded border border-slate-200 shadow-sm">
                    Sorted by Priority
                </span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-xs uppercase font-medium text-slate-500">
                        <tr>
                            <th className="px-6 py-3 w-24">Status</th>
                            <th className="px-6 py-3">Vendor Name</th>
                            <th className="px-6 py-3">Contract Title</th>
                            <th className="px-6 py-3">Manager</th>
                            <th className="px-6 py-3">Expiry Date</th>
                            <th className="px-6 py-3">Spend (CAD)</th>
                            <th className="px-6 py-3">SPM</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {sortedVendors.map((vendor) => (
                            <tr key={vendor.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_COLORS[vendor.analysis.status]}`}>
                                        {vendor.analysis.status === 'Critical' && '🔴 Exp'}
                                        {vendor.analysis.status === 'Attention' && '🟡 Attn'}
                                        {vendor.analysis.status === 'Good' && '🟢 OK'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-medium text-slate-800">{vendor.name}</td>
                                <td className="px-6 py-4">{vendor.contractTitle}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                                            {vendor.manager.charAt(0)}
                                        </div>
                                        {vendor.manager}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={vendor.analysis.daysToExpiry < 90 ? 'text-orange-600 font-medium' : ''}>
                                        {vendor.contractEnd}
                                    </span>
                                    <div className="text-xs text-slate-400 mt-0.5">
                                        {vendor.analysis.daysToExpiry < 0 ? 'Expired' : `${vendor.analysis.daysToExpiry} days`}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-medium">${vendor.spendToDate.toLocaleString()}</span>
                                        <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
                                            <div
                                                className={`h-1.5 rounded-full ${vendor.analysis.budgetUtilization > 90 ? 'bg-red-500' : 'bg-blue-500'}`}
                                                style={{ width: `${Math.min(vendor.analysis.budgetUtilization, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className={`font-bold ${vendor.spmScore < 50 ? 'text-red-500' : vendor.spmScore < 80 ? 'text-yellow-600' : 'text-emerald-600'}`}>
                                            {vendor.spmScore}
                                        </div>
                                        <span className="text-xs text-slate-400">/ 100</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VendorTable;
