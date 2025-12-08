'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
    Shield,
    Users,
    Briefcase,
    CreditCard,
    Flame,
    Network,
    FileText,
    Database,
    Bus,
    CheckCircle,
    AlertTriangle,
    XCircle,
    ArrowRight,
    ChevronLeft
} from 'lucide-react';
import Link from 'next/link';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

// Static data for sparklines to avoid hydration mismatches with random generation
const generateStaticData = (baseVal: number, volatility: number) => {
    const data = [];
    for (let i = 0; i < 20; i++) {
        // Generate pseudo-random-looking but deterministic data
        const y = Math.max(10, Math.min(90, baseVal + Math.sin(i) * volatility + (i % 3) * 5));
        data.push({ x: i, y });
    }
    return data;
};

const operationalData = generateStaticData(70, 10);
const degradedData = generateStaticData(50, 20);
const outageData = generateStaticData(30, 15);

const services = [
    {
        id: 'ciso',
        name: 'CISO',
        icon: Shield,
        status: 'operational',
        message: 'Security services are functioning normally.',
        data: operationalData,
    },
    {
        id: 'citizen',
        name: 'Citizen Services',
        icon: Users,
        status: 'operational',
        message: 'Public-facing portals and services are online.',
        data: operationalData,
    },
    {
        id: 'corporate',
        name: 'Corporate Services',
        icon: Briefcase,
        status: 'degraded',
        message: 'Internal HR portal experiencing high latency.',
        data: degradedData,
    },
    {
        id: 'financial',
        name: 'Financial Services',
        icon: CreditCard,
        status: 'operational',
        message: 'All payment and billing systems are normal.',
        data: operationalData,
    },
    {
        id: 'fire',
        name: 'Fire Rescue',
        icon: Flame,
        status: 'outage',
        message: 'Dispatch system offline. Using backup protocol.',
        data: outageData,
    },
    {
        id: 'network',
        name: 'Network Services',
        icon: Network,
        status: 'operational',
        message: 'Core network infrastructure is stable.',
        data: operationalData,
    },
    {
        id: 'posse',
        name: 'POSSE',
        icon: FileText,
        status: 'operational',
        message: 'Permitting and licensing systems are working.',
        data: operationalData,
    },
    {
        id: 'enterprise',
        name: 'Enterprise Systems',
        icon: Database,
        status: 'operational',
        message: 'ERP and CRM platforms are fully operational.',
        data: operationalData,
    },
    {
        id: 'transit',
        name: 'Transit Services',
        icon: Bus,
        status: 'operational',
        message: 'Real-time tracking and scheduling are online.',
        data: operationalData,
    },
];

const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
        case 'operational':
            return <CheckCircle className="text-complement-sea-green" size={24} />;
        case 'degraded':
            return <AlertTriangle className="text-complement-sunrise" size={24} />;
        case 'outage':
            return <XCircle className="text-red-600" size={24} />;
        default:
            return null;
    }
};

const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
        case 'operational':
            return (
                <div className="flex items-center gap-2 text-sm font-medium text-complement-sea-green">
                    <StatusIcon status={status} />
                </div>
            );
        case 'degraded':
            return (
                <div className="flex items-center gap-2 text-sm font-medium text-complement-sunrise">
                    <StatusIcon status={status} />
                </div>
            );
        case 'outage':
            return (
                <div className="flex items-center gap-2 text-sm font-medium text-red-600">
                    <StatusIcon status={status} />
                </div>
            );
        default:
            return null;
    }
};

const Sparkline = ({ data, status }: { data: any[]; status: string }) => {
    let color = '#109D7E'; // sea-green
    if (status === 'degraded') color = '#FAB840'; // sunrise
    if (status === 'outage') color = '#DC2626'; // red-600

    return (
        <div className="w-full h-16">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id={`gradient-${status}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <Area
                        type="monotone"
                        dataKey="y"
                        stroke={color}
                        strokeWidth={2}
                        fillOpacity={1}
                        fill={`url(#gradient-${status})`}
                        isAnimationActive={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default function ServiceHealthDashboard() {
    return (
        <div className="bg-white min-h-screen font-sans">
            <Header />

            <div className="bg-structural-light-gray min-h-screen py-8 md:py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Page Header */}
                    <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
                        <div>
                            <Link href="/service-health" className="inline-flex items-center gap-1 text-primary-blue hover:text-dark-blue mb-2 font-medium transition-colors">
                                <ChevronLeft size={16} />
                                Back to Overview
                            </Link>
                            <h1 className="text-4xl font-bold text-primary-blue">Service Health</h1>
                            <p className="text-text-secondary mt-1">Real-time operational status of all services.</p>
                        </div>

                        <div className="mt-6 md:mt-0 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="flex items-center gap-3 bg-white border border-structural-gray-blue rounded-lg px-4 py-2 shadow-sm">
                                <div className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-complement-sunrise opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-complement-sunrise"></span>
                                </div>
                                <span className="font-semibold text-complement-sunrise">Partial Outage</span>
                            </div>
                            <a className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary-blue transition-colors" href="#">
                                <span>View Incident Log</span>
                                <ArrowRight size={16} />
                            </a>
                        </div>
                    </header>

                    {/* Grid Content */}
                    <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className={`
                  bg-white border rounded-xl p-5 flex flex-col justify-between group 
                  transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md
                  ${service.status === 'outage' ? 'border-red-200 hover:border-red-500' :
                                        service.status === 'degraded' ? 'border-yellow-200 hover:border-complement-sunrise' :
                                            'border-structural-gray-blue hover:border-primary-blue'}
                `}
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <service.icon className="text-text-secondary" size={24} />
                                            <h2 className="text-lg font-semibold text-text-dark">{service.name}</h2>
                                        </div>
                                        <StatusBadge status={service.status} />
                                    </div>
                                    <p className="text-text-secondary text-sm mb-4">{service.message}</p>
                                </div>
                                <Sparkline data={service.data} status={service.status} />
                            </div>
                        ))}
                    </main>

                </div>
            </div>

            <Footer />
        </div>
    );
}
