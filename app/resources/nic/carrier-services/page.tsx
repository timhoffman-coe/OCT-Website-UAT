'use client';

import React from 'react';

const carriers = [
    { id: 'CKT-TELUS-102', provider: 'Telus', type: 'DIA', speed: '10 Gbps', status: 'Active', expiry: '2026-08-15', location: 'City Hall' },
    { id: 'CKT-SHAW-554', provider: 'Shaw Business', type: 'Broadband', speed: '1 Gbps', status: 'Active', expiry: '2025-12-01', location: 'Fire Station 3' },
    { id: 'CKT-BELL-892', provider: 'Bell', type: 'MPLS', speed: '500 Mbps', status: 'Pending Renewal', expiry: '2024-11-30', location: 'Transit Garage' },
    { id: 'CKT-ZAYO-331', provider: 'Zayo', type: 'Dark Fibre', speed: 'Unlimited', status: 'Active', expiry: '2028-03-22', location: 'Data Center A' },
    { id: 'CKT-TELUS-105', provider: 'Telus', type: 'SIP Trunk', speed: '200 Channels', status: 'Maintenance', expiry: '2025-06-10', location: 'Police HQ' },
];

export default function CarrierServices() {
    return (
        <div className="p-8 space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Carrier Services</h2>
                    <p className="text-gray-500">Manage third-party circuits and service agreements</p>
                </div>
                <button className="flex items-center gap-2 bg-primary-blue text-white px-4 py-2 rounded-lg hover:bg-primary-blue/90 transition-colors font-medium text-sm">
                    <span className="material-symbols-outlined text-lg">add_link</span>
                    Add Circuit
                </button>
            </div>

            {/* Search & Filters */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                    <div className="lg:col-span-2">
                        <div className="relative flex items-center w-full h-12 rounded-lg border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-primary-blue/50 focus-within:border-primary-blue">
                            <div className="flex items-center justify-center pl-4 pr-2 bg-gray-50 h-full border-r border-gray-300">
                                <span className="material-symbols-outlined text-gray-500">search</span>
                            </div>
                            <input
                                type="text"
                                className="flex-1 h-full border-none bg-white px-4 text-sm text-gray-900 placeholder:text-gray-500 focus:ring-0"
                                placeholder="Search by carrier, circuit ID, location..."
                            />
                        </div>
                    </div>
                    <div className="lg:col-span-3 flex flex-wrap items-center gap-2">
                        {['Carrier', 'Service Type', 'Status', 'Location'].map((filter) => (
                            <button key={filter} className="flex h-10 items-center gap-2 px-4 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                {filter}
                                <span className="material-symbols-outlined text-lg text-gray-500">arrow_drop_down</span>
                            </button>
                        ))}
                        <button className="text-sm font-medium text-primary-blue hover:underline px-2">Clear Filters</button>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex gap-2">
                        <button className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50"><span className="material-symbols-outlined">view_column</span></button>
                        <button className="p-2 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50"><span className="material-symbols-outlined">filter_list</span></button>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 text-white text-sm font-bold hover:opacity-90">
                        <span className="material-symbols-outlined text-lg">download</span>
                        <span>Export to CSV</span>
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-4 font-semibold text-gray-900">Circuit ID</th>
                                <th className="px-6 py-4 font-semibold text-gray-900">Provider</th>
                                <th className="px-6 py-4 font-semibold text-gray-900">Type</th>
                                <th className="px-6 py-4 font-semibold text-gray-900">Speed</th>
                                <th className="px-6 py-4 font-semibold text-gray-900">Location</th>
                                <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
                                <th className="px-6 py-4 font-semibold text-gray-900">Contract Expiry</th>
                                <th className="px-6 py-4 font-semibold text-gray-900"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {carriers.map((carrier) => (
                                <tr key={carrier.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-primary-blue">{carrier.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {/* Placeholder Logos */}
                                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-600">
                                                {carrier.provider[0]}
                                            </div>
                                            <span className="text-gray-900">{carrier.provider}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{carrier.type}</td>
                                    <td className="px-6 py-4 text-gray-500">{carrier.speed}</td>
                                    <td className="px-6 py-4 text-gray-500">{carrier.location}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                                ${carrier.status === 'Active' ? 'bg-green-100 text-green-800 border-green-200' :
                                                carrier.status === 'Pending Renewal' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                                                    'bg-gray-100 text-gray-800 border-gray-200'}
                            `}>
                                            {carrier.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 font-mono">{carrier.expiry}</td>
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
        </div>
    );
}
