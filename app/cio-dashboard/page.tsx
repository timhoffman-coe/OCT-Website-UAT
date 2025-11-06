'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MetricCard from '@/components/dashboard/MetricCard';
import IncidentsTrendChart from '@/components/dashboard/IncidentsTrendChart';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function CIODashboardPage() {

  const timeAccountingData = [
    { name: 'Service Desk', hours: 8200 },
    { name: 'Network Ops', hours: 6500 },
    { name: 'App Dev', hours: 7100 },
    { name: 'Project Mgmt', hours: 4500 },
    { name: 'Security Ops', hours: 5300 },
  ];

  const spendData = [
    { name: 'Software Licensing', value: 4.2 },
    { name: 'Personnel', value: 3.8 },
    { name: 'Cloud Infrastructure', value: 2.5 },
    { name: 'Telecom', value: 1.8 },
    { name: 'Consulting', value: 1.1 },
  ];

  const COLORS = ['#2F63AD', '#9947AE', '#61BEB2', '#109D7E', '#B1C034', '#FAB840', '#EA5853', '#839899'];

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      {/* Sample Data Warning Banner */}
      <div className="bg-red-600 text-white text-center py-3 px-4">
        <p className="font-sans text-lg font-bold uppercase tracking-wide">
          ⚠️ SAMPLE DATA ONLY - NOT LIVE ⚠️
        </p>
      </div>

      {/* Dashboard Header */}
      <div className="bg-white shadow-sm p-4">
        <h1 className="font-sans text-2xl font-bold text-primary-blue">Chief Information Officer Dashboard</h1>
      </div>

      <main className="p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Critical Systems Performance */}
          <div className="bg-white rounded-lg shadow-lg md:col-span-2 lg:col-span-4 p-4">
            <h2 className="font-sans text-lg font-bold text-primary-blue mb-4">Critical Systems & Service Performance</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <MetricCard title="Citizen Systems Uptime" value="99.98%" subtitle="Last 30 days" valueColor="text-complement-sea-green" />
              <MetricCard title="Internal Systems Uptime" value="99.95%" subtitle="AD, Network, DNS" valueColor="text-complement-sea-green" />
              <MetricCard title="Active P1/P2 Incidents" value="3" subtitle="Real-time count" valueColor="text-complement-sunrise" />
              <MetricCard title="End-User CSAT" value="4.8/5" subtitle="Post-ticket surveys" valueColor="text-primary-blue" />
            </div>
          </div>

          {/* Major Incidents Trend */}
          <div className="bg-white rounded-lg shadow-lg p-4 lg:col-span-2">
            <h3 className="font-sans text-base font-semibold text-gray-600 border-b border-gray-200 pb-3 mb-4">Major Incidents Trend (Last 30 Days)</h3>
            <div className="h-72">
              <IncidentsTrendChart />
            </div>
          </div>

          {/* SLA Performance */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="font-sans text-base font-semibold text-gray-600 border-b border-gray-200 pb-3 mb-4">SLA Performance</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">OCT tickets past threshold:</p>
              <p className="text-5xl font-bold text-center text-red-600">12</p>
              <p className="text-xs text-center text-gray-400">Currently in Remedy</p>
            </div>
          </div>

          {/* Service Level Targets */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="font-sans text-base font-semibold text-gray-600 border-b border-gray-200 pb-3 mb-4">Service Level Targets</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span>ITS Uptime:</span> <span className="font-bold text-complement-sea-green">99.8%</span></div>
              <div className="flex justify-between"><span>App Availability:</span> <span className="font-bold text-complement-sea-green">99.9%</span></div>
              <div className="flex justify-between"><span>Helpdesk Response:</span> <span className="font-bold text-complement-sunrise">92%</span></div>
            </div>
          </div>

          {/* Budget Burn Rates */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="font-sans text-base font-semibold text-gray-600 border-b border-gray-200 pb-3 mb-4">Operating Budget</h3>
            <div className="text-center space-y-2">
              <div className="flex justify-between text-sm"><span>Plan:</span><span>65.7%</span></div>
              <div className="flex justify-between text-sm"><span>Actual:</span><span>68.0%</span></div>
              <div className="mt-4">
                <span className="text-2xl font-bold text-complement-sunrise">+3.5%</span>
                <p className="text-sm text-gray-500">Variance</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="font-sans text-base font-semibold text-gray-600 border-b border-gray-200 pb-3 mb-4">Capital Budget</h3>
            <div className="text-center space-y-2">
              <div className="flex justify-between text-sm"><span>Plan:</span><span>42.7%</span></div>
              <div className="flex justify-between text-sm"><span>Actual:</span><span>42.0%</span></div>
              <div className="mt-4">
                <span className="text-2xl font-bold text-complement-sea-green">-1.8%</span>
                <p className="text-sm text-gray-500">Variance</p>
              </div>
            </div>
          </div>

          {/* Top 5 Spend Categories */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="font-sans text-base font-semibold text-gray-600 border-b border-gray-200 pb-3 mb-4">Top 5 Spend Categories (YTD)</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spendData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {spendData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value}M`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Contract Renewals */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="font-sans text-base font-semibold text-gray-600 border-b border-gray-200 pb-3 mb-4">Upcoming Contract Renewals</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between items-center p-2 bg-red-50 rounded">
                <div><p className="font-semibold">Microsoft E5</p><p className="text-xs text-gray-500">Vendor: Microsoft</p></div>
                <div className="text-red-600 font-bold">15 Days</div>
              </li>
              <li className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                <div><p className="font-semibold">ServiceNow Platform</p><p className="text-xs text-gray-500">Vendor: ServiceNow</p></div>
                <div className="text-yellow-600 font-bold">42 Days</div>
              </li>
              <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <div><p className="font-semibold">Network Switches</p><p className="text-xs text-gray-500">Vendor: Cisco</p></div>
                <div className="text-gray-700">75 Days</div>
              </li>
            </ul>
          </div>

          {/* Project Portfolio Health */}
          <div className="bg-white rounded-lg shadow-lg p-4 lg:col-span-2">
            <h3 className="font-sans text-base font-semibold text-gray-600 border-b border-gray-200 pb-3 mb-4">Capital Project Portfolio Health</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-4xl font-bold text-green-700">18</p>
                <p className="text-sm font-semibold text-green-800">On Track</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-4xl font-bold text-yellow-700">6</p>
                <p className="text-sm font-semibold text-yellow-800">At Risk</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <p className="text-4xl font-bold text-red-700">2</p>
                <p className="text-sm font-semibold text-red-800">Off Track</p>
              </div>
            </div>
          </div>

          {/* Strategic Initiatives */}
          <div className="bg-white rounded-lg shadow-lg p-4 lg:col-span-2">
            <h3 className="font-sans text-base font-semibold text-gray-600 border-b border-gray-200 pb-3 mb-4">Key Strategic Initiatives - Milestone Status</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold mb-1">DAS in the Tunnels</p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-primary-blue h-4 rounded-full" style={{width: '75%'}}></div>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">ServiceNow Implementation</p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-primary-blue h-4 rounded-full" style={{width: '40%'}}></div>
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">Cloud Migration Strategy</p>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-primary-blue h-4 rounded-full" style={{width: '90%'}}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Metrics */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="font-sans text-base font-semibold text-gray-600 border-b border-gray-200 pb-3 mb-4">Critical Vulnerability Remediation</h3>
            <div className="text-center">
              <p className="text-5xl font-bold text-complement-sea-green">96%</p>
              <p className="text-sm text-gray-500">Patched within 30 days</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="font-sans text-base font-semibold text-gray-600 border-b border-gray-200 pb-3 mb-4">Phishing Test Failure Rate</h3>
            <div className="text-center">
              <p className="text-5xl font-bold text-complement-sunrise">8.2%</p>
              <p className="text-sm text-gray-500">Last campaign</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="font-sans text-base font-semibold text-gray-600 border-b border-gray-200 pb-3 mb-4">Backup Success Rate (24h)</h3>
            <div className="text-center">
              <p className="text-5xl font-bold text-complement-sea-green">99.7%</p>
              <p className="text-sm text-red-600">1 Critical Failure</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="font-sans text-base font-semibold text-gray-600 border-b border-gray-200 pb-3 mb-4">Top Risk Register Items</h3>
            <ul className="text-sm space-y-2">
              <li><span className="font-semibold">Aging Network Core:</span> <span className="text-red-600">Increasing</span></li>
              <li><span className="font-semibold">Vendor Lock-in:</span> <span className="text-yellow-600">Holding Flat</span></li>
              <li><span className="font-semibold">Data Governance:</span> <span className="text-green-600">Decreasing</span></li>
            </ul>
          </div>

          {/* Staffing */}
          <div className="bg-white rounded-lg shadow-lg p-4 lg:col-span-2">
            <h3 className="font-sans text-base font-semibold text-gray-600 border-b border-gray-200 pb-3 mb-4">Staffing Overview</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold">185</p>
                <p className="text-sm font-semibold text-gray-500">Filled Positions</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-complement-sunrise">15</p>
                <p className="text-sm font-semibold text-gray-500">Vacant Positions</p>
              </div>
              <div>
                <p className="text-3xl font-bold">45d</p>
                <p className="text-sm font-semibold text-gray-500">Avg. Vacancy Age</p>
              </div>
            </div>
          </div>

          {/* Time Accounting */}
          <div className="bg-white rounded-lg shadow-lg p-4 lg:col-span-2">
            <h3 className="font-sans text-base font-semibold text-gray-600 border-b border-gray-200 pb-3 mb-4">Time Accounting (Last Month)</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeAccountingData}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="hours" fill="#2F63AD" />
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
