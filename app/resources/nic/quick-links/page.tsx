'use client';

import React from 'react';

const links = [
    { icon: 'dns', title: 'IPAM Portal', desc: 'IP Address Management Login', url: '#' },
    { icon: 'router', title: 'Cisco Prime', desc: 'Network Infrastructure Management', url: '#' },
    { icon: 'speed', title: 'SolarWinds', desc: 'Performance Monitoring Dashboard', url: '#' },
    { icon: 'security', title: 'Firewall Admin', desc: 'Palo Alto Panorama', url: '#' },
    { icon: 'cloud', title: 'Azure Portal', desc: 'Cloud Networking Config', url: '#' },
    { icon: 'description', title: 'Documentation', desc: 'Network Topology Diagrams', url: '#' },
    { icon: 'support', title: 'ServiceNow', desc: 'ITSM Ticket Management', url: '#' },
    { icon: 'forum', title: 'Slack #network-ops', desc: 'Operations Channel', url: '#' },
];

export default function QuickLinks() {
    return (
        <div className="p-8 space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">External Tools & Resources</h2>
                    <p className="text-gray-500">Quick access to essential network management platforms</p>
                </div>
                <button className="flex items-center gap-2 bg-primary-blue text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary-blue/90 transition-colors shadow-sm">
                    <span className="material-symbols-outlined text-lg">add</span>
                    <span>Add New Link</span>
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center mb-6">
                <div className="flex-1 min-w-[240px]">
                    <div className="relative h-12 w-full">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                        <input
                            type="text"
                            placeholder="Search by title or description"
                            className="w-full h-full pl-12 pr-4 rounded-lg border-0 bg-white shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-blue text-gray-900"
                        />
                    </div>
                </div>
                <div className="flex gap-2 overflow-x-auto py-1">
                    <button className="flex items-center gap-1 px-4 py-2 rounded-lg bg-primary-blue/10 text-primary-blue font-medium text-sm whitespace-nowrap">
                        Category: All <span className="material-symbols-outlined text-lg">arrow_drop_down</span>
                    </button>
                    {['Monitoring Tool', 'Carrier Portal', 'Dashboards'].map((cat) => (
                        <button key={cat} className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 font-medium text-sm whitespace-nowrap hover:bg-gray-50">
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {links.map((link, idx) => (
                    <a key={idx} href={link.url} className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center hover:shadow-md hover:border-primary-blue transition-all">
                        <div className="w-14 h-14 rounded-full bg-blue-50 text-primary-blue flex items-center justify-center mb-4 group-hover:bg-primary-blue group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-3xl">{link.icon}</span>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">{link.title}</h3>
                        <p className="text-sm text-gray-500 mb-4">{link.desc}</p>
                        <span className="text-primary-blue text-sm font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            Launch
                            <span className="material-symbols-outlined text-sm">open_in_new</span>
                        </span>
                    </a>
                ))}
            </div>
        </div>
    );
}
