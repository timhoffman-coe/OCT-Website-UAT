'use client';

import React from 'react';
import { AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { ClientResponsiveContainer } from '@/components/ClientOnly';
import { Search, Bell, Settings, TrendingUp, TrendingDown, XCircle, AlertTriangle, CheckCircle, Map, RadioTower, Briefcase, Users } from 'lucide-react';

const trafficData = [
    { time: '12 AM', value: 20 },
    { time: '2 AM', value: 60 },
    { time: '4 AM', value: 50 },
    { time: '6 AM', value: 30 },
    { time: '8 AM', value: 70 },
    { time: '10 AM', value: 40 },
    { time: '12 PM', value: 65 },
    { time: '2 PM', value: 80 },
    { time: '4 PM', value: 25 },
    { time: '6 PM', value: 15 },
    { time: '8 PM', value: 90 },
    { time: '10 PM', value: 45 },
    { time: 'Now', value: 70 },
];

const alarmData = [
    { name: 'Critical', value: 2, color: '#D32F2F' },
    { name: 'Major', value: 4, color: '#FFC107' },
    { name: 'Minor', value: 6, color: '#2E7D32' },
];

export default function NICDashboard() {
    return (
        <>
            {/* Top Header */}
            <header className="sticky top-0 z-20 flex items-center justify-between whitespace-nowrap border-b border-gray-200 px-8 py-3 bg-white h-16">
                <h2 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">Network Dashboard</h2>
                <div className="flex flex-1 justify-end items-center gap-4">
                    <label className="relative hidden md:block flex-grow max-w-md group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-blue w-4 h-4" />
                        <input
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 h-10 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue transition-all"
                            placeholder="Search devices, routes, contacts..."
                        />
                    </label>
                    <div className="flex gap-2">
                        <button className="flex items-center justify-center rounded-full h-10 w-10 text-gray-500 hover:bg-gray-100 transition-colors">
                            <Bell className="w-5 h-5" />
                        </button>
                        <button className="flex items-center justify-center rounded-full h-10 w-10 text-gray-500 hover:bg-gray-100 transition-colors">
                            <Settings className="w-5 h-5" />
                        </button>
                    </div>
                    <div
                        className="bg-primary-blue/10 text-primary-blue flex items-center justify-center rounded-full size-10 border border-gray-200 font-bold"
                    >
                        N
                    </div>
                </div>
            </header>

            <div className="p-8 space-y-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { label: 'Uptime', value: '99.98%', trend: '+0.1%', trendUp: true },
                        { label: 'Active Alarms', value: '3', trend: '-2%', trendUp: false, trendColor: 'text-red-600' },
                        { label: 'Avg. Latency', value: '45ms', trend: '+5%', trendUp: true },
                        { label: 'Bandwidth', value: '7.2 Gbps', trend: '+1.8%', trendUp: true }
                    ].map((stat, idx) => (
                        <div key={idx} className="flex flex-col gap-2 rounded-xl p-6 bg-white shadow-sm border border-gray-200">
                            <p className="text-base font-medium text-gray-500">{stat.label}</p>
                            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                            <p className={`text-sm font-medium flex items-center gap-1 ${stat.trendColor ? stat.trendColor : 'text-green-600'}`}>
                                {stat.trendUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                <span>{stat.trend}</span>
                            </p>
                        </div>
                    ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Traffic Chart */}
                    <div className="xl:col-span-2 flex flex-col rounded-xl p-6 bg-white shadow-sm border border-gray-200">
                        <div className="mb-6">
                            <p className="text-base font-medium text-gray-900">Network Traffic (Last 24 Hours)</p>
                            <div className="flex items-end gap-3 mt-1">
                                <p className="text-3xl font-bold text-gray-900">Avg. 5.8 Gbps</p>
                                <p className="text-green-600 text-sm font-medium flex items-center mb-1">
                                    <TrendingUp className="w-4 h-4" />
                                    <span>3.4%</span>
                                </p>
                            </div>
                        </div>
                        <div className="h-[250px] w-full">
                            <ClientResponsiveContainer width="100%" height="100%">
                                <AreaChart data={trafficData}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#005087" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#005087" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#005087"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorValue)"
                                    />
                                </AreaChart>
                            </ClientResponsiveContainer>
                        </div>
                        <div className="flex justify-between px-2 mt-2 text-xs font-semibold text-gray-500">
                            <span>12 AM</span>
                            <span>4 AM</span>
                            <span>8 AM</span>
                            <span>12 PM</span>
                            <span>4 PM</span>
                            <span>8 PM</span>
                            <span>Now</span>
                        </div>
                    </div>

                    {/* Alarms Gauge */}
                    <div className="flex flex-col rounded-xl p-6 bg-white shadow-sm border border-gray-200">
                        <div className="mb-2">
                            <p className="text-base font-medium text-gray-900">Live Alarm Summary</p>
                            <p className="text-3xl font-bold text-gray-900 mt-1">12 Total</p>
                            <p className="text-gray-500 text-sm">Real-time severity breakdown</p>
                        </div>
                        <div className="relative h-[220px] flex items-center justify-center">
                            <ClientResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={alarmData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {alarmData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ClientResponsiveContainer>
                            {/* Center Text */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="text-3xl font-bold text-gray-900">12</span>
                            </div>
                        </div>
                        <div className="flex justify-center gap-4 text-sm mt-2">
                            <div className="flex items-center gap-2 text-gray-700"><span className="w-3 h-3 rounded-full bg-red-600"></span>Critical</div>
                            <div className="flex items-center gap-2 text-gray-700"><span className="w-3 h-3 rounded-full bg-yellow-500"></span>Major</div>
                            <div className="flex items-center gap-2 text-gray-700"><span className="w-3 h-3 rounded-full bg-green-600"></span>Minor</div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Activity & Quick Access */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Activity Feed */}
                    <div className="rounded-xl bg-white shadow-sm border border-gray-200 overflow-hidden">
                        <div className="border-b border-gray-200 px-6">
                            <nav className="flex -mb-px space-x-6">
                                <button className="py-4 border-b-2 border-primary-blue font-medium text-primary-blue">Recent Alerts</button>
                                <button className="py-4 border-b-2 border-transparent font-medium text-gray-500 hover:text-gray-700">Maintenance Log</button>
                            </nav>
                        </div>
                        <ul className="p-6 space-y-6">
                            <li className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                                    <XCircle className="w-5 h-5 text-red-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Core Switch SW-01 is down</p>
                                    <p className="text-sm text-gray-500">2 minutes ago</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center shrink-0">
                                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">High latency on WAN link to Branch Office 3</p>
                                    <p className="text-sm text-gray-500">15 minutes ago</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Firewall FW-MAIN-A policy update successful</p>
                                    <p className="text-sm text-gray-500">1 hour ago</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Access */}
                    <div className="rounded-xl p-6 bg-white shadow-sm border border-gray-200">
                        <h3 className="text-base font-medium mb-4 text-gray-900">Quick Access</h3>
                        <div className="grid grid-cols-2 gap-4 h-[calc(100%-2.5rem)]">
                            {[
                                { Icon: Map, label: 'View Network Map' },
                                { Icon: RadioTower, label: 'Manage Towers' },
                                { Icon: Briefcase, label: 'Carrier Services' },
                                { Icon: Users, label: 'Team Directory' }
                            ].map((item, idx) => (
                                <a key={idx} href="#" className="flex flex-col items-center justify-center p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-center group">
                                    <item.Icon className="text-primary-blue w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
