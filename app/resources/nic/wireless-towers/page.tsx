'use client';

import React from 'react';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, Tooltip } from 'recharts';
import { Sheet, Plus, Globe, RadioTower } from 'lucide-react';

const towers = [
    { id: 'TW-1001', name: 'Jasper Ave Hub', type: 'Rooftop', height: '45m', status: 'Active', coords: '53.5412° N, 113.4930° W' },
    { id: 'TW-1002', name: 'WEM Tower', type: 'Monopole', height: '60m', status: 'Active', coords: '53.5225° N, 113.6242° W' },
    { id: 'TW-1003', name: 'Strathcona Relay', type: 'Rooftop', height: '30m', status: 'Maintenance', coords: '53.5185° N, 113.4975° W' },
    { id: 'TW-1004', name: 'Capilano Node', type: 'Small Cell', height: '12m', status: 'Inactive', coords: '53.5410° N, 113.4250° W' },
    { id: 'TW-1005', name: 'Clareview Site', type: 'Lattice', height: '75m', status: 'Active', coords: '53.5950° N, 113.4150° W' },
    { id: 'TW-1006', name: 'Windermere Link', type: 'Monopole', height: '50m', status: 'Active', coords: '53.4350° N, 113.6000° W' },
];

const signalData = [
    { name: 'TW-1001', signal: 95 },
    { name: 'TW-1002', signal: 88 },
    { name: 'TW-1003', signal: 45 },
    { name: 'TW-1004', signal: 0 },
    { name: 'TW-1005', signal: 92 },
    { name: 'TW-1006', signal: 85 },
];

export default function WirelessTowers() {
    const [selectedTower, setSelectedTower] = React.useState(towers[0]);

    // Generate Map URL based on selected tower or default to Edmonton
    const getMapUrl = () => {
        if (selectedTower) {
            // Simple extraction of lat/lng from the string for mock purposes
            return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d307907.6644468229!2d-113.62330435!3d53.54612455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53a0224580deff23%3A0x411fa00c4af6155d!2sEdmonton%2C%20AB!5e0!3m2!1sen!2sca";
        }
        return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d307907.6644468229!2d-113.62330435!3d53.54612455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53a0224580deff23%3A0x411fa00c4af6155d!2sEdmonton%2C%20AB!5e0!3m2!1sen!2sca";
    };

    return (
        <div className="p-8 space-y-6">
            <header className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Wireless Towers</h2>
                    <p className="text-gray-500">Monitor base stations and small cell deployments</p>
                </div>
                <div className="flex gap-3">
                    <button
                        className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition-all shadow-sm"
                    >
                        <Sheet className="w-5 h-5 text-green-600" />
                        <span>Sync with Sheet</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 bg-primary-blue text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary-blue/90 transition-all shadow-md">
                        <Plus className="w-5 h-5" />
                        <span>Add New Tower</span>
                    </button>
                </div>
            </header>

            {/* Map & Grounding Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Google Map Embed */}
                <div className="lg:col-span-2 h-96 bg-gray-200 rounded-xl border border-gray-200 shadow-inner overflow-hidden relative group">
                    <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src={getMapUrl()}
                        allowFullScreen
                        loading="lazy"
                        title="Tower Map Location"
                        className="transition-opacity duration-500"
                    ></iframe>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm text-xs font-bold text-gray-800 border border-gray-200 pointer-events-none">
                        {selectedTower ? `Viewing: ${selectedTower.name}` : 'Viewing: Edmonton Overview'}
                    </div>
                </div>

                {/* AI Insights Panel */}
                <div className="h-96 rounded-xl border border-gray-200 bg-white shadow-sm flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50">
                        <div className="flex items-center gap-2 text-primary-blue">
                            <Globe className="w-5 h-5" />
                            <h3 className="font-bold text-sm uppercase tracking-wider">Location Intelligence</h3>
                        </div>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto">
                        <div className="prose text-sm text-gray-600 leading-relaxed">
                            Edmonton&apos;s flat terrain generally favors wireless propagation, but the North Saskatchewan River valley creates significant elevation changes (up to 60m depth) that can disrupt line-of-sight for small cells.
                            <br /><br />
                            Key considerations:
                            <ul className="list-disc pl-5 mt-2">
                                <li>Dense foliage in river valley parks attenuates 5GHz+ signals.</li>
                                <li>Downtown high-rises create canyon effects; rooftop macros preferred.</li>
                                <li>Winter icing on towers requires hardened radomes.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Tower List */}
                <div className="lg:col-span-2 space-y-4">
                    {towers.map((tower) => (
                        <div
                            key={tower.id}
                            className={`bg-white p-6 rounded-xl shadow-sm border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer transition-colors
                                ${selectedTower?.id === tower.id ? 'border-primary-blue ring-1 ring-primary-blue' : 'border-gray-200 hover:border-gray-300'}
                            `}
                            onClick={() => setSelectedTower(tower)}
                        >

                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0
                             ${tower.status === 'Active' ? 'bg-green-100 text-green-700' :
                                        tower.status === 'Maintenance' ? 'bg-amber-100 text-amber-700' :
                                            'bg-gray-100 text-gray-500'}
                         `}>
                                    <RadioTower className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{tower.name}</h3>
                                    <p className="text-sm text-gray-500">{tower.id} • {tower.type} • {tower.height}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                <div className="text-right">
                                    <p className="text-xs font-medium text-gray-400 uppercase">Coordinates</p>
                                    <p className="text-sm font-mono text-gray-600">{tower.coords}</p>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold border 
                               ${tower.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' :
                                        tower.status === 'Maintenance' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                            'bg-gray-50 text-gray-600 border-gray-200'}
                           `}>{tower.status}</div>
                            </div>

                        </div>
                    ))}
                </div>

                {/* Stats Column */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                        <h3 className="font-bold text-gray-900 mb-4">Signal Strength</h3>
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={signalData} layout="vertical" margin={{ left: -20 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} opacity={0.3} />
                                    <XAxis type="number" hide />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        cursor={{ fill: 'transparent' }}
                                    />
                                    <Bar dataKey="signal" fill="#005087" radius={[0, 4, 4, 0]} barSize={20} background={{ fill: '#f1f5f9' }} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
