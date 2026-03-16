'use client';

import React from 'react';
import { Plus, Search, ChevronDown, Mail, Phone } from 'lucide-react';

const team = [
    { id: 1, name: 'Sarah Jenkins', role: 'Network Architect', dept: 'Infrastructure Strategy', email: 'sarah.jenkins@edmonton.ca', phone: '780-555-0101', status: 'Online' },
    { id: 2, name: 'David Chen', role: 'NOC Lead', dept: 'Operations', email: 'david.chen@edmonton.ca', phone: '780-555-0102', status: 'Busy' },
    { id: 3, name: 'Maria Rodriguez', role: 'Field Technician', dept: 'Site Services', email: 'maria.rodriguez@edmonton.ca', phone: '780-555-0103', status: 'Offline' },
    { id: 4, name: 'James Wilson', role: 'Security Analyst', dept: 'Cybersecurity', email: 'james.wilson@edmonton.ca', phone: '780-555-0104', status: 'Online' },
    { id: 5, name: 'Emily White', role: 'Project Manager', dept: 'PMO', email: 'emily.white@edmonton.ca', phone: '780-555-0105', status: 'Away' },
];

export default function TeamContacts() {
    return (
        <div className="p-8 space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Team Directory</h2>
                    <p className="text-gray-500">Key contacts for network operations and support</p>
                </div>
                <button className="flex items-center justify-center gap-2 bg-primary-blue text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary-blue/90 shadow-sm">
                    <Plus className="w-4 h-4" />
                    <span>Add New Contact</span>
                </button>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col gap-4 mb-8">
                <div className="relative w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search by name, role, or department..."
                        className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 bg-white text-gray-900 focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue"
                    />
                </div>

                <div className="flex items-center justify-between gap-4 overflow-x-auto">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-600 whitespace-nowrap">Filter by:</span>
                        {['All Departments', 'NOC', 'Field Ops', 'Engineering'].map((filter, idx) => (
                            <button key={filter} className={`px-4 h-9 rounded-lg border text-sm font-medium whitespace-nowrap flex items-center gap-1 hover:bg-gray-50 transition-colors ${idx === 0 ? 'bg-white border-gray-200 text-gray-800' : 'bg-white border-gray-200 text-gray-800'}`}>
                                {filter}
                                {idx === 0 && <ChevronDown className="w-4 h-4" />}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {team.map((member) => (
                    <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-start gap-4 hover:shadow-md transition-shadow">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600">
                                {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white 
                          ${member.status === 'Online' ? 'bg-green-500' :
                                    member.status === 'Busy' ? 'bg-red-500' :
                                        member.status === 'Away' ? 'bg-yellow-500' : 'bg-gray-400'}
                      `}></div>
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-gray-900 truncate">{member.name}</h3>
                            <p className="text-primary-blue text-sm font-medium mb-1">{member.role}</p>
                            <p className="text-gray-500 text-xs mb-3">{member.dept}</p>

                            <div className="space-y-1">
                                <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-blue transition-colors">
                                    <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                                    <span className="truncate">{member.email}</span>
                                </a>
                                <a href={`tel:${member.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-blue transition-colors">
                                    <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                                    <span>{member.phone}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
