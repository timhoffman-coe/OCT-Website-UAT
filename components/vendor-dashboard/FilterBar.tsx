'use client';

import React from 'react';
import { DashboardFilters, CorpStructure } from './types';
import { MOCK_MANAGERS } from './constants';
import { Filter, Building2, Calendar, User } from 'lucide-react';

interface FilterBarProps {
    filters: DashboardFilters;
    setFilters: React.Dispatch<React.SetStateAction<DashboardFilters>>;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters }) => {
    const handleChange = (key: keyof DashboardFilters, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-700 font-semibold">
                <Filter className="w-5 h-5" />
                <span>Global Filters</span>
            </div>

            <div className="flex flex-wrap gap-4 w-full md:w-auto">
                {/* Contract Manager Filter */}
                <div className="relative group w-full md:w-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-4 w-4 text-slate-400" />
                    </div>
                    <select
                        value={filters.manager}
                        onChange={(e) => handleChange('manager', e.target.value)}
                        className="w-full md:w-48 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-slate-300 transition-colors cursor-pointer appearance-none text-slate-600"
                    >
                        <option value="All">All Managers</option>
                        {MOCK_MANAGERS.map(m => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>

                {/* Corp Structure Filter */}
                <div className="relative group w-full md:w-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building2 className="h-4 w-4 text-slate-400" />
                    </div>
                    <select
                        value={filters.corpStructure}
                        onChange={(e) => handleChange('corpStructure', e.target.value)}
                        className="w-full md:w-48 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-slate-300 transition-colors cursor-pointer appearance-none text-slate-600"
                    >
                        <option value="All">All Departments</option>
                        {Object.values(CorpStructure).map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                        ))}
                    </select>
                </div>

                {/* Year Filter */}
                <div className="relative group w-full md:w-auto">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-4 w-4 text-slate-400" />
                    </div>
                    <select
                        value={filters.year}
                        onChange={(e) => handleChange('year', e.target.value)}
                        className="w-full md:w-32 pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-slate-300 transition-colors cursor-pointer appearance-none text-slate-600"
                    >
                        <option value="All">All Years</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
