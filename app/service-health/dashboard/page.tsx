'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DashboardDisclaimer from '@/components/DashboardDisclaimer';
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
    Wrench,
    HelpCircle,
    ArrowRight,
    ChevronLeft,
    type LucideIcon
} from 'lucide-react';
import Link from 'next/link';
import { AreaChart, Area } from 'recharts';
import { ClientResponsiveContainer } from '@/components/ClientOnly';
import { useServiceHealth } from '@/hooks/useServiceHealth';
import type { ServiceStatus } from '@/lib/service-health/types';
import { SERVICE_ICON_MAP } from '@/lib/service-health/constants';

// Icon lookup table
const iconComponents: Record<string, LucideIcon> = {
    Shield, Users, Briefcase, CreditCard, Flame, Network, FileText, Database, Bus,
};

function getIconForService(name: string): LucideIcon {
    const iconName = SERVICE_ICON_MAP[name];
    return (iconName && iconComponents[iconName]) || Database;
}

// Generate sparkline data from uptime percentage
function generateSparklineData(uptimePercent: number, status: ServiceStatus) {
    const baseVal = uptimePercent * 0.9;
    const volatility = status === 'operational' ? 5 : status === 'degraded' ? 15 : 25;
    const data = [];
    for (let i = 0; i < 20; i++) {
        const y = Math.max(10, Math.min(90, baseVal + Math.sin(i) * volatility + (i % 3) * 2));
        data.push({ x: i, y });
    }
    return data;
}

// Overall status display config
const overallStatusConfig: Record<ServiceStatus, { label: string; color: string; bg: string }> = {
    operational: { label: 'All Operational', color: 'text-complement-sea-green', bg: 'bg-complement-sea-green' },
    degraded: { label: 'Partial Outage', color: 'text-complement-sunrise', bg: 'bg-complement-sunrise' },
    outage: { label: 'Major Outage', color: 'text-red-600', bg: 'bg-red-600' },
    maintenance: { label: 'Maintenance', color: 'text-primary-blue', bg: 'bg-primary-blue' },
    unknown: { label: 'Status Unknown', color: 'text-complement-grey-flannel', bg: 'bg-complement-grey-flannel' },
};

const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
        case 'operational':
            return <CheckCircle className="text-complement-sea-green" size={24} />;
        case 'degraded':
            return <AlertTriangle className="text-complement-sunrise" size={24} />;
        case 'outage':
            return <XCircle className="text-red-600" size={24} />;
        case 'maintenance':
            return <Wrench className="text-primary-blue" size={24} />;
        case 'unknown':
            return <HelpCircle className="text-complement-grey-flannel" size={24} />;
        default:
            return null;
    }
};

const StatusBadge = ({ status }: { status: string }) => {
    const colorMap: Record<string, string> = {
        operational: 'text-complement-sea-green',
        degraded: 'text-complement-sunrise',
        outage: 'text-red-600',
        maintenance: 'text-primary-blue',
        unknown: 'text-complement-grey-flannel',
    };
    const color = colorMap[status] || 'text-complement-grey-flannel';
    return (
        <div className={`flex items-center gap-2 text-sm font-medium ${color}`}>
            <StatusIcon status={status} />
        </div>
    );
};

const Sparkline = ({ data, status }: { data: { x: number; y: number }[]; status: string }) => {
    const colorMap: Record<string, string> = {
        operational: '#109D7E',
        degraded: '#FAB840',
        outage: '#DC2626',
        maintenance: '#004A8F',
        unknown: '#6B7280',
    };
    const color = colorMap[status] || '#6B7280';

    return (
        <div className="w-full h-16">
            <ClientResponsiveContainer width="100%" height="100%">
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
            </ClientResponsiveContainer>
        </div>
    );
};

function LoadingSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white border border-structural-gray-blue rounded-xl p-5 animate-pulse">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-gray-200 rounded" />
                            <div className="h-5 w-32 bg-gray-200 rounded" />
                        </div>
                        <div className="w-6 h-6 bg-gray-200 rounded-full" />
                    </div>
                    <div className="h-4 w-full bg-gray-200 rounded mb-4" />
                    <div className="h-16 bg-gray-100 rounded" />
                </div>
            ))}
        </div>
    );
}

export default function ServiceHealthDashboard() {
    const { data, isLoading, error } = useServiceHealth();

    const services = data?.groups.map(group => ({
        id: group.id,
        name: group.name,
        icon: getIconForService(group.name),
        status: group.status,
        message: group.message,
        data: generateSparklineData(group.uptimePercentage, group.status),
    })) ?? [];

    const overall = data ? overallStatusConfig[data.overallStatus] : null;

    return (
        <div className="bg-white min-h-screen font-sans">
            <DashboardDisclaimer dashboardName="Service Health Dashboard" />
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
                            {overall && (
                                <div className="flex items-center gap-3 bg-white border border-structural-gray-blue rounded-lg px-4 py-2 shadow-sm">
                                    <div className="relative flex h-3 w-3">
                                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${overall.bg} opacity-75`}></span>
                                        <span className={`relative inline-flex rounded-full h-3 w-3 ${overall.bg}`}></span>
                                    </div>
                                    <span className={`font-semibold ${overall.color}`}>{overall.label}</span>
                                </div>
                            )}
                            {error && (
                                <span className="text-xs text-complement-grey-flannel">Using cached data</span>
                            )}
                            <a className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary-blue transition-colors" href="#">
                                <span>View Incident Log</span>
                                <ArrowRight size={16} />
                            </a>
                        </div>
                    </header>

                    {/* Grid Content */}
                    {isLoading ? (
                        <LoadingSkeleton />
                    ) : (
                        <main id="main-content" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                    )}

                </div>
            </div>

            <Footer />
        </div>
    );
}
