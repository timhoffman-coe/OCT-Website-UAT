'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function PeopleManagementPage() {
    // Sample Data
    const overtimeData = [
        { month: 'Jun', hours: 120 },
        { month: 'Jul', hours: 150 },
        { month: 'Aug', hours: 180 },
        { month: 'Sep', hours: 140 },
        { month: 'Oct', hours: 200 },
        { month: 'Nov', hours: 160 },
    ];

    const sickTimeData = [
        { name: 'Tech Planning', hours: 45 },
        { name: 'Biz Solutions', hours: 80 },
        { name: 'Integrated Tech', hours: 120 },
        { name: 'PMO', hours: 30 },
        { name: 'Corp Security', hours: 25 },
    ];

    const vacationData = [
        { name: 'Tech Planning', days: 12 },
        { name: 'Biz Solutions', days: 25 },
        { name: 'Integrated Tech', days: 40 },
        { name: 'PMO', days: 8 },
        { name: 'Corp Security', days: 5 },
    ];

    return (
        <div className="bg-white min-h-screen">
            <Header />

            {/* Sample Data Warning Banner */}
            <div className="bg-red-600 text-white text-center py-3 px-4">
                <p className="font-sans text-lg font-bold uppercase tracking-wide">
                    ⚠️ SAMPLE DATA ONLY - NOT LIVE ⚠️
                </p>
            </div>

            <main className="container mx-auto max-w-7xl py-12 md:py-16 px-4 sm:px-6 lg:px-8">
                {/* Page Title */}
                <div className="mb-12">
                    <h1 className="font-sans text-4xl md:text-5xl font-bold text-primary-blue mb-4 pb-3 border-b-2 border-[#F4F2F1]">
                        People Management Dashboard
                    </h1>
                    <p className="font-serif text-lg md:text-xl text-[#495057] max-w-3xl mt-6">
                        Overview of organizational structure, workforce capacity, and leave management.
                    </p>
                </div>

                <div className="space-y-12">

                    {/* Org Chart Section */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                        <h2 className="font-sans text-2xl font-bold text-[#212529] mb-8 border-b pb-2">
                            Organizational Structure
                        </h2>
                        <div className="flex flex-col items-center">
                            {/* Branch Chief */}
                            <div className="bg-primary-blue text-white px-6 py-3 rounded-lg shadow-md mb-8 text-center w-64">
                                <p className="font-bold text-lg">Branch Manager</p>
                                <p className="text-sm opacity-90">Open City & Technology</p>
                            </div>

                            {/* Connector Line */}
                            <div className="w-0.5 h-8 bg-gray-300 -mt-8 mb-8"></div>

                            {/* Horizontal Line */}
                            <div className="w-full max-w-4xl h-0.5 bg-gray-300 mb-8 relative">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-gray-300 -mt-4"></div>
                            </div>

                            {/* Sections */}
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-6xl">
                                {[
                                    'Technology Planning',
                                    'Business Solutions',
                                    'Integrated Technology Solutions',
                                    'Project Management Office',
                                    'Corporate Information Security'
                                ].map((section, index) => (
                                    <div key={index} className="flex flex-col items-center relative">
                                        {/* Connector from horizontal line */}
                                        <div className="w-0.5 h-8 bg-gray-300 -mt-8 mb-2 absolute top-0"></div>

                                        <div className="bg-white border-2 border-[#D3ECEF] p-4 rounded-lg shadow-sm text-center w-full h-full flex flex-col justify-center mt-2 hover:border-primary-blue transition-colors">
                                            <p className="font-semibold text-gray-800 text-sm">{section}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Charts Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* Branch Overtime */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="font-sans text-xl font-bold text-[#212529] mb-6">
                                Branch Overtime (Last 6 Months)
                            </h3>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={overtimeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorOvertime" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#005087" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#005087" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="hours" stroke="#005087" fillOpacity={1} fill="url(#colorOvertime)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Branch Sick Time */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <h3 className="font-sans text-xl font-bold text-[#212529] mb-6">
                                Branch Sick Time (Hours)
                            </h3>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={sickTimeData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" angle={-15} textAnchor="end" interval={0} height={60} />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="hours" fill="#EA5853" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Branch Excess Vacation */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:col-span-2">
                            <h3 className="font-sans text-xl font-bold text-[#212529] mb-6">
                                Branch Excess Vacation (&gt;50 Days Accrued)
                            </h3>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={vacationData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="days" fill="#FAB840" radius={[4, 4, 0, 0]} name="Excess Days" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
