'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export default function IncidentManagementPage() {
    // Sample Data
    const openIncidentsData = Array.from({ length: 30 }, (_, i) => ({
        day: i + 1,
        open: 200 + Math.random() * 50,
        notUpdated30d: 20 + Math.random() * 10,
        notUpdated5d: 10 + Math.random() * 5,
    }));

    const indicatorsData = [
        { name: 'Number of new incidents', d1: 49, d2: 53, d3: 15, d4: 37, d5: 41, d6: 40, d7: 38, change: -2, trend: [40, 45, 30, 50, 40, 38] },
        { name: 'Number of resolved incidents', d1: 47, d2: 34, d3: 22, d4: 15, d5: 14, d6: 16, d7: 16, change: 2, trend: [40, 30, 20, 15, 16, 16] },
        { name: 'Incident backlog growth', d1: 2, d2: 19, d3: -7, d4: 22, d5: 27, d6: 24, d7: 24, change: -3, trend: [5, 20, -5, 25, 24, 24] },
        { name: 'Number of open incidents', d1: 202, d2: 221, d3: 214, d4: 201, d5: 190, d6: 174, d7: 174, change: -16, trend: [200, 220, 210, 190, 174, 174] },
    ];

    const newIncidentsData = Array.from({ length: 40 }, (_, i) => ({
        day: i + 1,
        critical: Math.random() * 5,
        high: Math.random() * 10,
        moderate: Math.random() * 15,
        low: Math.random() * 20,
        planning: Math.random() * 10,
    }));

    const priorityData = [
        { name: '1 - Critical', value: 2, color: '#E91E63' },
        { name: '2 - High', value: 4, color: '#9C27B0' },
        { name: '3 - Moderate', value: 5, color: '#FFC107' },
        { name: '4 - Low', value: 13, color: '#4CAF50' },
        { name: '5 - Planning', value: 14, color: '#2196F3' },
    ];

    return (
        <div className="bg-gray-50 min-h-screen font-sans">
            <Header />

            {/* Sample Data Warning Banner */}
            <div className="bg-red-600 text-white text-center py-3 px-4">
                <p className="font-sans text-lg font-bold uppercase tracking-wide">
                    ⚠️ SAMPLE DATA ONLY - NOT LIVE ⚠️
                </p>
            </div>

            <main className="container mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-8">

                {/* Tabs */}
                <div className="bg-white rounded-t-lg shadow-sm border-b border-gray-200 mb-6 flex">
                    <button className="px-6 py-3 text-sm font-medium text-gray-900 border-b-2 border-green-500">Incident Overview</button>
                    <button className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">Incident Open</button>
                    <button className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">Incident New</button>
                    <button className="px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700">Incident Resolved</button>
                </div>

                <div className="space-y-6">

                    {/* Open Incidents Chart */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Open incidents</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={openIncidentsData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorOpen" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#64B5F6" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#64B5F6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#9E9E9E' }} />
                                    <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#9E9E9E' }} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="open" stroke="#64B5F6" fillOpacity={1} fill="url(#colorOpen)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-center space-x-6 mt-4 text-xs text-gray-600">
                            <div className="flex items-center"><span className="w-3 h-3 bg-[#64B5F6] mr-2"></span>Open incidents</div>
                            <div className="flex items-center"><span className="w-3 h-3 bg-green-400 mr-2"></span>Open incidents not updated 30d</div>
                            <div className="flex items-center"><span className="w-3 h-3 bg-yellow-400 mr-2"></span>Open incidents not updated 5d</div>
                        </div>
                    </div>

                    {/* Basic Indicators Table */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic indicators</h3>
                        <table className="w-full min-w-[800px]">
                            <thead>
                                <tr className="text-left text-sm font-semibold text-gray-600 border-b">
                                    <th className="pb-3 pl-2">Name</th>
                                    <th className="pb-3 text-center">02 Apr</th>
                                    <th className="pb-3 text-center">02 Apr</th>
                                    <th className="pb-3 text-center">02 Apr</th>
                                    <th className="pb-3 text-center">02 Apr</th>
                                    <th className="pb-3 text-center">02 Apr</th>
                                    <th className="pb-3 text-center">02 Apr</th>
                                    <th className="pb-3 text-center">02 Apr</th>
                                    <th className="pb-3 text-center">Change</th>
                                    <th className="pb-3 text-center">Trend</th>
                                </tr>
                            </thead>
                            <tbody>
                                {indicatorsData.map((row, index) => (
                                    <tr key={index} className="border-b last:border-0 hover:bg-gray-50">
                                        <td className="py-4 pl-2 text-sm text-gray-700 flex items-center">
                                            <span className="text-gray-400 mr-2">☆</span> {row.name}
                                        </td>
                                        <td className="py-4 text-center text-sm text-gray-600">{row.d1}</td>
                                        <td className="py-4 text-center text-sm text-gray-600">{row.d2}</td>
                                        <td className="py-4 text-center text-sm text-gray-600">{row.d3}</td>
                                        <td className="py-4 text-center text-sm text-gray-600">{row.d4}</td>
                                        <td className="py-4 text-center text-sm text-gray-600">{row.d5}</td>
                                        <td className="py-4 text-center text-sm text-gray-600">{row.d6}</td>
                                        <td className="py-4 text-center text-sm text-gray-600">{row.d7}</td>
                                        <td className="py-4 text-center text-sm text-gray-600">{row.change}</td>
                                        <td className="py-4 text-center h-12 w-24">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <LineChart data={row.trend.map((val, i) => ({ val }))}>
                                                    <Line type="monotone" dataKey="val" stroke="#90CAF9" strokeWidth={2} dot={false} />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Bottom Row: New Incidents & Priority */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* New Incidents Stacked Bar */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">New incidents</h3>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={newIncidentsData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                        <XAxis dataKey="day" hide />
                                        <YAxis hide />
                                        <Tooltip />
                                        <Bar dataKey="planning" stackId="a" fill="#2196F3" />
                                        <Bar dataKey="low" stackId="a" fill="#4CAF50" />
                                        <Bar dataKey="moderate" stackId="a" fill="#FFC107" />
                                        <Bar dataKey="high" stackId="a" fill="#9C27B0" />
                                        <Bar dataKey="critical" stackId="a" fill="#E91E63" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs text-gray-600">
                                <div className="flex items-center"><span className="w-3 h-3 bg-[#2196F3] mr-2"></span>5 - Planning</div>
                                <div className="flex items-center"><span className="w-3 h-3 bg-[#4CAF50] mr-2"></span>4 - Low</div>
                                <div className="flex items-center"><span className="w-3 h-3 bg-[#FFC107] mr-2"></span>3 - Moderate</div>
                                <div className="flex items-center"><span className="w-3 h-3 bg-[#9C27B0] mr-2"></span>2 - High</div>
                                <div className="flex items-center"><span className="w-3 h-3 bg-[#E91E63] mr-2"></span>1 - Critical</div>
                            </div>
                        </div>

                        {/* New Incidents by Priority Donut */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">New incidents by priority</h3>
                            <div className="h-64 flex items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={priorityData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={2}
                                            dataKey="value"
                                        >
                                            {priorityData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs text-gray-600">
                                {priorityData.map((entry, index) => (
                                    <div key={index} className="flex items-center">
                                        <span className="w-3 h-3 mr-2" style={{ backgroundColor: entry.color }}></span>
                                        {entry.name}: {entry.value}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
}
