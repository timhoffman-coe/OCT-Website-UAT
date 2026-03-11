'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DashboardDisclaimer from '@/components/DashboardDisclaimer';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function AssetManagementPage() {
    // Sample Data for Charts
    const spendTrendData = [
        { month: 'Apr', value: 0 },
        { month: 'May', value: 0 },
        { month: 'Jun', value: 0.5 },
        { month: 'Jul', value: 1.2 },
        { month: 'Aug', value: 1.8 },
        { month: 'Sep', value: 2.36 },
    ];

    const flatLineData = [
        { month: 'Apr', value: 0 },
        { month: 'Sep', value: 0 },
    ];

    const fulfillmentData = [
        { name: 'Hardware', value: 1 },
    ];

    const expiringContractsData = [
        { month: 'Apr', value: 9 },
        { month: 'May', value: 8 },
        { month: 'Jun', value: 7 },
        { month: 'Jul', value: 8 },
        { month: 'Aug', value: 9 },
        { month: 'Sep', value: 8.5 },
    ];

    const poolVsNewData = [
        { name: 'Hardware', value: 15 },
    ];

    const eolData = [
        { name: 'Hardware', value: 1 },
    ];

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <DashboardDisclaimer dashboardName="Asset Management" />
            <Header />

            {/* Sample Data Warning Banner */}
            <div className="bg-red-600 text-white text-center py-3 px-4">
                <p className="font-sans text-lg font-bold uppercase tracking-wide">
                    ⚠️ SAMPLE DATA ONLY - NOT LIVE ⚠️
                </p>
            </div>

            <main className="container mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-8">

                {/* Top Row: Spend & Savings */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Total Spend */}
                    <div className="bg-white p-6 rounded shadow-sm">
                        <h3 className="text-sm font-semibold text-gray-600 mb-1">Total spend</h3>
                        <p className="text-4xl font-light text-gray-800 mb-1">$2.36M</p>
                        <p className="text-xs text-gray-500 mb-4">— $0 (0%) since April 2023</p>
                        <div className="h-32">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={spendTrendData}>
                                    <Line type="monotone" dataKey="value" stroke="#29ABE2" strokeWidth={2} dot={{ r: 2 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-between mt-4 text-sm">
                            <div>
                                <p className="text-gray-500 text-xs">Data from May 2023</p>
                                <p className="font-semibold text-gray-700 mt-1">Software</p>
                                <p className="text-lg text-gray-800">$0</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-gray-700 mt-5">Hardware</p>
                                <p className="text-lg text-gray-800">$2.36M</p>
                            </div>
                        </div>
                    </div>

                    {/* Actual Savings */}
                    <div className="bg-white p-6 rounded shadow-sm">
                        <h3 className="text-sm font-semibold text-gray-600 mb-1">Actual savings</h3>
                        <p className="text-4xl font-light text-gray-800 mb-4">$0</p>
                        <div className="h-32">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={flatLineData}>
                                    <Line type="monotone" dataKey="value" stroke="#29ABE2" strokeWidth={2} dot={{ r: 2 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-500 text-xs">Data from May 2023</p>
                            <p className="font-semibold text-gray-700 mt-1">Software</p>
                            <p className="text-lg text-gray-800">$0</p>
                        </div>
                    </div>

                    {/* Potential Savings */}
                    <div className="bg-white p-6 rounded shadow-sm">
                        <h3 className="text-sm font-semibold text-gray-600 mb-1">Potential savings</h3>
                        <p className="text-4xl font-light text-gray-800 mb-4">$0</p>
                        <div className="h-32">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={flatLineData}>
                                    <Line type="monotone" dataKey="value" stroke="#29ABE2" strokeWidth={2} dot={{ r: 2 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-500 text-xs">Data from May 2023</p>
                            <p className="font-semibold text-gray-700 mt-1">Software</p>
                            <p className="text-lg text-gray-800">$0</p>
                        </div>
                    </div>
                </div>

                {/* Second Row: Fulfillment & Success Goals */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* Asset Fulfillment Time */}
                    <div className="bg-white p-6 rounded shadow-sm lg:col-span-2">
                        <h3 className="text-sm font-semibold text-gray-600 mb-4">Asset fulfillment time</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={fulfillmentData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <XAxis type="number" domain={[0, 1]} hide />
                                    <YAxis type="category" dataKey="name" hide />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#1CB0D3" barSize={150} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-center mt-2">
                            <div className="flex items-center">
                                <div className="w-3 h-3 bg-[#1CB0D3] mr-2"></div>
                                <span className="text-xs text-gray-500">Hardware</span>
                            </div>
                        </div>
                    </div>

                    {/* Success Goals Grid */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded shadow-sm">
                            <h3 className="text-xs font-semibold text-gray-600 mb-2">Completed hardware success goals</h3>
                            <p className="text-4xl font-light text-gray-800 mb-2">2</p>
                            <p className="text-xs text-gray-500">Updated at 13:38</p>
                        </div>
                        <div className="bg-white p-6 rounded shadow-sm">
                            <h3 className="text-xs font-semibold text-gray-600 mb-2">Completed software success goals</h3>
                            <p className="text-4xl font-light text-gray-800 mb-2">0</p>
                            <p className="text-xs text-gray-500">Updated at 13:38</p>
                        </div>
                        <div className="bg-white p-6 rounded shadow-sm">
                            <h3 className="text-xs font-semibold text-gray-600 mb-2">Hardware success savings</h3>
                            <p className="text-3xl font-light text-gray-800 mb-2">$1.61M</p>
                            <p className="text-xs text-gray-500">Updated at 13:38</p>
                        </div>
                        <div className="bg-white p-6 rounded shadow-sm">
                            <h3 className="text-xs font-semibold text-gray-600 mb-2">Software success savings</h3>
                            <p className="text-3xl font-light text-gray-800 mb-2">$0</p>
                            <p className="text-xs text-gray-500">Updated at 13:38</p>
                        </div>
                    </div>
                </div>

                {/* Third Row: Missing Assets, True-up, Contracts */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Missing Hardware Assets */}
                    <div className="bg-white p-6 rounded shadow-sm">
                        <h3 className="text-sm font-semibold text-gray-600 mb-1">Missing hardware assets</h3>
                        <p className="text-4xl font-light text-gray-800 mb-4">0</p>
                        <div className="h-32">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={flatLineData}>
                                    <Line type="monotone" dataKey="value" stroke="#29ABE2" strokeWidth={2} dot={{ r: 2 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-500 text-xs">Data from May 2023</p>
                        </div>
                    </div>

                    {/* Software True-up Cost */}
                    <div className="bg-white p-6 rounded shadow-sm">
                        <h3 className="text-sm font-semibold text-gray-600 mb-1">Software true-up cost</h3>
                        <p className="text-4xl font-light text-gray-800 mb-4">$0</p>
                        <div className="h-32">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={flatLineData}>
                                    <Line type="monotone" dataKey="value" stroke="#29ABE2" strokeWidth={2} dot={{ r: 2 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-500 text-xs">Data from May 2023</p>
                        </div>
                    </div>

                    {/* Expiring Contracts */}
                    <div className="bg-white p-6 rounded shadow-sm">
                        <h3 className="text-sm font-semibold text-gray-600 mb-1">Expiring contracts in next 90 days</h3>
                        <p className="text-4xl font-light text-gray-800 mb-1">7</p>
                        <p className="text-xs text-gray-500 mb-4">↓ -2 (-22.2%) since April 2023</p>
                        <div className="h-32">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={expiringContractsData}>
                                    <Line type="monotone" dataKey="value" stroke="#29ABE2" strokeWidth={2} dot={{ r: 2 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4">
                            <p className="text-gray-500 text-xs">Data from May 2023</p>
                        </div>
                    </div>
                </div>

                {/* Fourth Row: Pool vs New, EOL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Assets Pulled from Pool */}
                    <div className="bg-white p-6 rounded shadow-sm">
                        <h3 className="text-sm font-semibold text-gray-600 mb-4">Assets pulled from pool vs. net new purchase</h3>
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={poolVsNewData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <XAxis type="number" hide />
                                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={60} />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#1CB0D3" barSize={80} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* End of Life Models */}
                    <div className="bg-white p-6 rounded shadow-sm">
                        <h3 className="text-sm font-semibold text-gray-600 mb-4">End of life models in next 90 days</h3>
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={eolData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <XAxis type="number" hide />
                                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={60} />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#1CB0D3" barSize={80} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
}
