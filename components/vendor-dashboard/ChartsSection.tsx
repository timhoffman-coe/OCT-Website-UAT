'use client';

import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    Cell, ScatterChart, Scatter, ZAxis, ReferenceLine, PieChart, Pie, Legend
} from 'recharts';
import { Vendor, RiskLevel, CorpStructure } from './types';

interface ChartsSectionProps {
    vendors: Vendor[];
}

const ChartsSection: React.FC<ChartsSectionProps> = ({ vendors }) => {

    // --- Chart A Data Preparation (Top 5 Spend vs Budget) ---
    const spendData = [...vendors]
        .sort((a, b) => b.spendToDate - a.spendToDate)
        .slice(0, 5)
        .map(v => ({
            name: v.name,
            spend: v.spendToDate,
            remaining: Math.max(0, v.globalAmount - v.spendToDate),
            utilization: (v.spendToDate / v.globalAmount) * 100
        }));

    // --- Chart B Data Preparation (Renewal Timeline - next 6 months) ---
    const today = new Date();
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(today.getMonth() + 6);

    const renewalData = vendors
        .filter(v => {
            const d = new Date(v.contractEnd);
            return d >= today && d <= sixMonthsFromNow;
        })
        .sort((a, b) => new Date(a.contractEnd).getTime() - new Date(b.contractEnd).getTime())
        .map(v => ({
            name: v.name,
            daysLeft: Math.ceil((new Date(v.contractEnd).getTime() - today.getTime()) / (1000 * 3600 * 24)),
            rfpRequired: v.rfpRequired,
            date: v.contractEnd
        }));

    // --- Chart C Data Preparation (Sourcing Type) ---
    const sourcingDataMap = vendors.reduce((acc, curr) => {
        acc[curr.sourcingType] = (acc[curr.sourcingType] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const sourcingPieData = Object.entries(sourcingDataMap).map(([name, value]) => ({ name, value }));
    const SOURCING_COLORS = ['#3b82f6', '#8b5cf6', '#ec4899']; // Blue, Violet, Pink

    // --- Chart D Data Preparation (Risk Matrix) ---
    // Map Risk Level to Y-Axis numeric value
    const riskMap = { [RiskLevel.Low]: 1, [RiskLevel.Medium]: 2, [RiskLevel.High]: 3 };

    const scatterData = vendors.map(v => ({
        x: v.spmScore,
        y: riskMap[v.riskLevel],
        z: v.globalAmount, // Bubble size based on budget
        name: v.name,
        riskLevel: v.riskLevel
    }));

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white p-2 border border-slate-200 shadow-md rounded text-xs">
                    <p className="font-bold">{data.name}</p>
                    <p>SPM: {data.x}</p>
                    <p>Risk: {data.riskLevel}</p>
                    <p>Budget: ${data.z?.toLocaleString()}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

            {/* Chart A: Burn Rate */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h4 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider border-b border-slate-100 pb-2">
                    Chart A: Spend vs Budget (Top Vendors)
                </h4>
                <div className="h-64 w-full text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={spendData} margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} />
                            <XAxis type="number" tickFormatter={(val) => `$${val / 1000}k`} />
                            <YAxis dataKey="name" type="category" width={80} />
                            <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                            <Bar dataKey="spend" stackId="a" fill="#3b82f6" name="Spend" radius={[0, 4, 4, 0]} barSize={20}>
                                {spendData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.utilization > 90 ? '#ef4444' : '#3b82f6'} />
                                ))}
                            </Bar>
                            <Bar dataKey="remaining" stackId="a" fill="#e2e8f0" name="Remaining Budget" radius={[0, 4, 4, 0]} barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Chart B: Renewal Timeline */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h4 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider border-b border-slate-100 pb-2">
                    Chart B: Renewal Timeline (Next 6 Mo)
                </h4>
                <div className="h-64 w-full text-xs">
                    {renewalData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart layout="vertical" data={renewalData} margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={80} />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            const d = payload[0].payload;
                                            return (
                                                <div className="bg-white p-2 border border-slate-200 shadow rounded text-xs">
                                                    <strong>{d.name}</strong>
                                                    <p>Expires: {d.date}</p>
                                                    <p>{d.rfpRequired ? '⚠️ RFP Required' : 'Standard Renewal'}</p>
                                                </div>
                                            )
                                        }
                                        return null;
                                    }}
                                />
                                <Bar dataKey="daysLeft" barSize={15} radius={[0, 4, 4, 0]}>
                                    {renewalData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.rfpRequired ? '#f59e0b' : '#10b981'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-full flex items-center justify-center text-slate-400 italic">
                            No renewals in the next 6 months.
                        </div>
                    )}
                </div>
            </div>

            {/* Chart E: Sourcing Breakdown (New) */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h4 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider border-b border-slate-100 pb-2">
                    Chart C: Contracts by Sourcing Type
                </h4>
                <div className="h-64 w-full text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={sourcingPieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={0}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                                nameKey="name"
                            >
                                {sourcingPieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={SOURCING_COLORS[index % SOURCING_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend layout="vertical" verticalAlign="middle" align="right" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Chart D: Risk Matrix */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h4 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider border-b border-slate-100 pb-2">
                    Chart D: Risk Matrix (SPM vs Risk)
                </h4>
                <div className="h-64 w-full text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" dataKey="x" name="SPM Score" domain={[0, 100]} label={{ value: 'SPM Score (Higher is Better)', position: 'bottom', offset: 0 }} />
                            <YAxis
                                type="number"
                                dataKey="y"
                                name="Risk Level"
                                domain={[0, 4]}
                                ticks={[1, 2, 3]}
                                tickFormatter={(val) => val === 1 ? 'Low' : val === 2 ? 'Med' : 'High'}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <ZAxis type="number" dataKey="z" range={[50, 400]} name="Budget" />
                            <ReferenceLine x={50} stroke="red" strokeDasharray="3 3" label="Low SPM Threshold" />
                            <Scatter name="Vendors" data={scatterData} fill="#8884d8">
                                {scatterData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.riskLevel === RiskLevel.High ? '#ef4444' : entry.riskLevel === RiskLevel.Medium ? '#f59e0b' : '#10b981'} />
                                ))}
                            </Scatter>
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
};

export default ChartsSection;
