'use client';

import React from 'react';
import { Vendor } from './types';
import { Landmark, FileText, CalendarClock, AlertCircle } from 'lucide-react';

interface ForecastSectionProps {
    vendors: Vendor[];
}

const ForecastSection: React.FC<ForecastSectionProps> = ({ vendors }) => {
    const today = new Date();

    // --- RFP Pipeline Logic ---
    // RFP Required, not yet expired (or recently expired), sorted by contract end
    const rfpPipeline = vendors
        .filter(v => v.rfpRequired)
        .map(v => {
            // Calculate "RFP Launch" date (6 months before expiry)
            const expiry = new Date(v.contractEnd);
            const launchDate = new Date(expiry);
            launchDate.setMonth(launchDate.getMonth() - 6);
            return { ...v, rfpLaunchDate: launchDate, expiryDate: expiry };
        })
        .sort((a, b) => a.expiryDate.getTime() - b.expiryDate.getTime())
        .slice(0, 5); // Show top 5

    // --- Executive Committee Forecast Logic ---
    // Has councilDate, sorted by date (upcoming first)
    const committeeForecast = vendors
        .filter(v => v.councilDate)
        .map(v => ({ ...v, dateObj: new Date(v.councilDate!) }))
        .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())
        .filter(v => v.dateObj >= new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000))); // Show future + last 7 days

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const getLaunchStatus = (launchDate: Date, expiryDate: Date) => {
        if (today > expiryDate) return { text: "Contract Expired", color: "text-red-600 bg-red-50" };
        if (today > launchDate) return { text: "RFP Overdue", color: "text-orange-600 bg-orange-50" };

        const diffTime = launchDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 30) return { text: "Start Now", color: "text-yellow-600 bg-yellow-50" };
        return { text: `Start in ${diffDays}d`, color: "text-slate-500 bg-slate-50" };
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

            {/* RFP Pipeline Panel */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 rounded-t-xl">
                    <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-indigo-600" />
                        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Upcoming RFP Pipeline</h3>
                    </div>
                    <span className="text-xs font-medium text-slate-500">6 Month Lead Time</span>
                </div>

                <div className="p-0 flex-1">
                    {rfpPipeline.length === 0 ? (
                        <div className="p-8 text-center text-slate-400 text-sm">No RFPs required for current selection.</div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {rfpPipeline.map(v => {
                                const status = getLaunchStatus(v.rfpLaunchDate, v.expiryDate);
                                return (
                                    <div key={v.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1">
                                                <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-semibold text-slate-800">{v.name}</h4>
                                                <p className="text-xs text-slate-500">{v.contractTitle}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${status.color}`}>
                                                {status.text}
                                            </span>
                                            <span className="text-xs text-slate-400">
                                                Exp: {formatDate(v.expiryDate)}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Executive Committee Panel */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 rounded-t-xl">
                    <div className="flex items-center gap-2">
                        <Landmark className="w-5 h-5 text-purple-600" />
                        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Exec. Committee Forecast</h3>
                    </div>
                    <span className="text-xs font-medium text-slate-500">Council Presentations</span>
                </div>

                <div className="p-0 flex-1">
                    {committeeForecast.length === 0 ? (
                        <div className="p-8 flex flex-col items-center justify-center text-slate-400 text-sm gap-2">
                            <CalendarClock className="w-8 h-8 opacity-20" />
                            <span>No upcoming council presentations found.</span>
                            <span className="text-xs opacity-75">Ensure "Council Date" column exists in sheet.</span>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {committeeForecast.map(v => {
                                const isPast = v.dateObj < today;
                                const isUrgent = !isPast && (v.dateObj.getTime() - today.getTime()) < (7 * 24 * 60 * 60 * 1000);

                                return (
                                    <div key={v.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg border ${isUrgent ? 'bg-red-50 border-red-100 text-red-700' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                                                <span className="text-xs font-bold uppercase">{v.dateObj.toLocaleDateString('en-US', { month: 'short' })}</span>
                                                <span className="text-lg font-bold leading-none">{v.dateObj.getDate()}</span>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-semibold text-slate-800">{v.name}</h4>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-xs text-slate-500">Budget: ${(v.globalAmount / 1000).toFixed(0)}k</p>
                                                    {isUrgent && (
                                                        <span className="flex items-center gap-0.5 text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                                                            <AlertCircle className="w-3 h-3" /> URGENT
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs font-medium text-slate-600 block">{v.manager}</span>
                                            <span className="text-[10px] text-slate-400 uppercase tracking-wide">{v.corpStructure}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default ForecastSection;
