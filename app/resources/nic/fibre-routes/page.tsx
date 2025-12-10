'use client';

import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const fibreRoutes = [
    { id: 'FIB-CORE-001', name: 'City Loop Main', status: 'Active', capacity: '288 strands', length: '45.2 km', location: 'Downtown' },
    { id: 'FIB-DIST-104', name: 'West Valley Distribution', status: 'Planned', capacity: '144 strands', length: '12.5 km', location: 'West Valley' },
    { id: 'FIB-ACC-209', name: 'Library & Civic Access', status: 'Active', capacity: '48 strands', length: '3.8 km', location: 'Civic Center' },
    { id: 'FIB-IND-332', name: 'North Industrial Spur', status: 'Maintenance', capacity: '96 strands', length: '8.1 km', location: 'Industrial Park' },
    { id: 'FIB-RES-401', name: 'Maplewood FTTx Feed', status: 'Active', capacity: '144 strands', length: '18.4 km', location: 'Maplewood' },
    { id: 'FIB-TRUNK-05', name: 'South Bridge Crossing', status: 'Inactive', capacity: '288 strands', length: '2.2 km', location: 'River Valley' },
];

const trafficData = [
    { time: '12 AM', value: 40 },
    { time: '4 AM', value: 30 },
    { time: '8 AM', value: 85 },
    { time: '12 PM', value: 70 },
    { time: '4 PM', value: 90 },
    { time: '8 PM', value: 60 },
    { time: '11 PM', value: 45 },
];

export default function FibreRoutes() {
    return (
        <div className="p-8 space-y-6">
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Fibre Optic Routes</h2>
                    <p className="text-gray-500">Manage backbone and distribution fibre assets</p>
                </div>
                <button className="flex items-center gap-2 bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-primary-blue/90 transition-colors font-medium text-sm">
                    <span className="material-symbols-outlined text-lg">add</span>
                    Add New Route
                </button>
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 flex-wrap flex-1">
                    <div className="relative min-w-[240px] max-w-sm flex-1">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                        <input
                            type="text"
                            placeholder="Search by route name, ID or region..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-transparent text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        <span className="material-symbols-outlined text-lg">filter_list</span>
                        <span>Filters</span>
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-500 hover:text-primary-blue hover:bg-gray-100 rounded-lg transition-colors">
                        <span className="material-symbols-outlined">ios_share</span>
                    </button>
                    <button className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <span className="material-symbols-outlined">delete</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Route List */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-4 font-semibold text-gray-900">Route ID</th>
                                    <th className="px-6 py-4 font-semibold text-gray-900">Name</th>
                                    <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
                                    <th className="px-6 py-4 font-semibold text-gray-900">Capacity</th>
                                    <th className="px-6 py-4 font-semibold text-gray-900">Length</th>
                                    <th className="px-6 py-4 font-semibold text-gray-900">Location</th>
                                    <th className="px-6 py-4 font-semibold text-gray-900"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {fibreRoutes.map((route) => (
                                    <tr key={route.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-primary-blue">{route.id}</td>
                                        <td className="px-6 py-4 text-gray-900">{route.name}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                          ${route.status === 'Active' ? 'bg-green-100 text-green-800 border-green-200' :
                                                    route.status === 'Planned' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                                                        route.status === 'Maintenance' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                                            'bg-gray-100 text-gray-800 border-gray-200'
                                                }`}>
                                                {route.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{route.capacity}</td>
                                        <td className="px-6 py-4 text-gray-500">{route.length}</td>
                                        <td className="px-6 py-4 text-gray-500">{route.location}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-gray-400 hover:text-gray-600">
                                                <span className="material-symbols-outlined">more_vert</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Selection Detail / Stats */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <h3 className="font-bold text-gray-900 mb-4">Total Fibre Mileage</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-gray-900">134.2</span>
                            <span className="text-gray-500">km</span>
                        </div>
                        <div className="mt-4 h-[150px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={trafficData}>
                                    <defs>
                                        <linearGradient id="colorFibre" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#2E7D32" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="value" stroke="#2E7D32" strokeWidth={3} fillOpacity={1} fill="url(#colorFibre)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-primary-blue to-blue-700 rounded-xl p-6 text-white shadow-md">
                        <h3 className="font-bold mb-2">Maintenance Schedule</h3>
                        <p className="text-blue-100 text-sm mb-4">Upcoming work on major active routes.</p>
                        <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm mb-2">
                            <div className="flex justify-between items-center text-sm font-medium">
                                <span>FIB-IND-332 Splicing</span>
                                <span className="bg-white/20 px-2 py-0.5 rounded text-xs">Tomorrow</span>
                            </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                            <div className="flex justify-between items-center text-sm font-medium">
                                <span>FIB-CORE-001 Inspection</span>
                                <span className="bg-white/20 px-2 py-0.5 rounded text-xs">Dec 15</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
