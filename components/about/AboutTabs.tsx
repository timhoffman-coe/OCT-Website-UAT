'use client';

import { useState } from 'react';

const keyActions = [
  {
    title: 'Foster Strategic Partnership',
    description: 'Establish and strengthen internal and external business-level relationships to ensure shared goals are understood, aligned and met. This integration moves OCT from being a technology service provider, to a key strategic partner and collaborator in achieving the city\'s overall objectives.'
  },
  {
    title: 'Mature Cybersecurity Posture and Capabilities',
    description: 'Enhance cyber security maturity and capabilities (especially in the areas of single sign on, privileged access management, identity access management application integration, and data leak protection) for operating sustainment, and to increase the base capabilities within the City\'s IT disaster recovery program.'
  },
  {
    title: 'Deploy Technology Tools Across the Corporation',
    description: 'Advance the deployment and adoption of new digital tools such as Artificial Intelligence (AI) to increase effective and efficient productivity across the organization.'
  },
  {
    title: 'Develop, Manage, and Renew Technology Applications',
    description: 'Develop and renew investments to manage and maintain the City\'s technology applications.'
  },
  {
    title: 'Expand, Manage and Renew Technology Infrastructure',
    description: 'IT infrastructure are assets that require similar investment and attention to ensure responsible lifecycle management is being practiced. This insures investment in technology does not become "technology debt" or a cyber security liability.'
  },
  {
    title: 'Maintain Technology Project Management Success',
    description: 'Continue to successfully manage technology-based projects for City business units.'
  },
  {
    title: 'Strengthen Corporate IT Governance',
    description: 'Strengthen decision making processes and authorities to ensure resources are prioritised towards digital solutions that benefit the entire City\'s ecosystem and long-term value.'
  }
];

const growthProjects = [
  { profile: '23-51-1905', name: 'Taxation Assessment Collections System (TACS) Transformation' },
  { profile: '19-18-1901', name: 'Information Security and Disaster Recovery Enhancements' },
  { profile: '19-51-1904', name: 'Next Generation 9-1-1 (NG911) IP Call Handling' },
  { profile: 'CM-18-1514', name: 'Technology Implementation' },
  { profile: '24-18-1000', name: 'OCT Cybersecurity Project' }
];

const renewalProjects = [
  { profile: 'CM-18-1510', name: 'Technology Applications - Renewal' },
  { profile: 'CM-18-1515', name: 'Technology Infrastructure - Renewal' }
];

export default function AboutTabs() {
  const [activeTab, setActiveTab] = useState<'actions' | 'projects' | 'performance'>('actions');

  return (
    <>
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center border-b border-structural-gray-blue mb-12">
        <button
          onClick={() => setActiveTab('actions')}
          className={`px-8 py-4 text-sm font-bold uppercase tracking-widest border-b-2 transition-all ${
            activeTab === 'actions'
              ? 'border-process-blue text-dark-blue bg-process-blue/5'
              : 'border-transparent text-text-secondary hover:text-dark-blue'
          }`}
        >
          Key Actions
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-8 py-4 text-sm font-bold uppercase tracking-widest border-b-2 transition-all ${
            activeTab === 'projects'
              ? 'border-process-blue text-dark-blue bg-process-blue/5'
              : 'border-transparent text-text-secondary hover:text-dark-blue'
          }`}
        >
          Capital Projects
        </button>
        <button
          onClick={() => setActiveTab('performance')}
          className={`px-8 py-4 text-sm font-bold uppercase tracking-widest border-b-2 transition-all ${
            activeTab === 'performance'
              ? 'border-process-blue text-dark-blue bg-process-blue/5'
              : 'border-transparent text-text-secondary hover:text-dark-blue'
          }`}
        >
          Performance
        </button>
      </div>

      {/* Key Actions Tab */}
      {activeTab === 'actions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {keyActions.map((action, idx) => (
            <div key={idx} className="bg-structural-light-gray rounded-3xl p-10 border border-structural-gray-blue">
              <div className="w-14 h-14 bg-dark-blue rounded-xl flex items-center justify-center mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-dark-blue mb-4">{action.title}</h3>
              <p className="text-text-secondary leading-relaxed text-sm">{action.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Capital Projects Tab */}
      {activeTab === 'projects' && (
        <div>
          <p className="text-text-secondary mb-8 text-lg">
            The City&apos;s capital investments align with the City&apos;s strategic direction. The full list can be found in the{' '}
            <a
              href="https://www.edmonton.ca/city_government/budget-and-finances"
              target="_blank"
              rel="noopener noreferrer"
              className="text-process-blue hover:text-dark-blue underline"
            >
              2023-2026 Capital Budget
            </a>.
          </p>

          <h3 className="text-xl font-bold text-dark-blue mb-4">Growth Projects</h3>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full">
              <thead>
                <tr className="border-b-2 border-dark-blue">
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-text-secondary">Profile No.</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-text-secondary">Profile Name</th>
                </tr>
              </thead>
              <tbody>
                {growthProjects.map((project, idx) => (
                  <tr key={idx} className="border-b border-structural-gray-blue hover:bg-structural-light-gray transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-dark-blue">{project.profile}</td>
                    <td className="px-4 py-3 text-sm text-text-secondary">{project.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-bold text-dark-blue mb-4">Renewal Projects</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b-2 border-dark-blue">
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-text-secondary">Profile No.</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-text-secondary">Profile Name</th>
                </tr>
              </thead>
              <tbody>
                {renewalProjects.map((project, idx) => (
                  <tr key={idx} className="border-b border-structural-gray-blue hover:bg-structural-light-gray transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-dark-blue">{project.profile}</td>
                    <td className="px-4 py-3 text-sm text-text-secondary">{project.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === 'performance' && (
        <div>
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl text-center border-b-4 border-dark-blue shadow-sm">
              <span className="text-4xl font-black text-dark-blue block mb-2">1.75%</span>
              <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">OCT Budget % (2024)</span>
            </div>
            <div className="bg-white p-8 rounded-2xl text-center border-b-4 border-process-blue shadow-sm">
              <span className="text-4xl font-black text-process-blue block mb-2">$4,034</span>
              <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">IT Spend/FTE (2024)</span>
            </div>
            <div className="bg-white p-8 rounded-2xl text-center border-b-4 border-primary-blue shadow-sm">
              <span className="text-4xl font-black text-primary-blue block mb-2">5.10%</span>
              <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">2026 Budget Target</span>
            </div>
            <div className="bg-white p-8 rounded-2xl text-center border-b-4 border-edmonton-warning shadow-sm">
              <span className="text-4xl font-black text-edmonton-warning block mb-2">$10-12K</span>
              <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">2026 Spend Target</span>
            </div>
          </div>

          {/* Performance Table */}
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full">
              <thead>
                <tr className="border-b-2 border-dark-blue">
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest text-text-secondary">Measure</th>
                  <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-widest text-text-secondary">2022</th>
                  <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-widest text-text-secondary">2023</th>
                  <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-widest text-text-secondary">2024</th>
                  <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-widest text-text-secondary">2026 Target</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-structural-gray-blue">
                  <td className="px-4 py-3 text-sm font-medium text-dark-blue">OCT Budget as % of Operational Budget</td>
                  <td className="px-4 py-3 text-center text-sm text-text-secondary">1.76%</td>
                  <td className="px-4 py-3 text-center text-sm text-text-secondary">1.78%</td>
                  <td className="px-4 py-3 text-center text-sm text-text-secondary">1.75%</td>
                  <td className="px-4 py-3 text-center text-sm font-bold text-dark-blue">5.10%</td>
                </tr>
                <tr className="border-b border-structural-gray-blue">
                  <td className="px-4 py-3 text-sm font-medium text-dark-blue">IT Spend per City FTE</td>
                  <td className="px-4 py-3 text-center text-sm text-text-secondary">$4,269</td>
                  <td className="px-4 py-3 text-center text-sm text-text-secondary">$4,134</td>
                  <td className="px-4 py-3 text-center text-sm text-text-secondary">$4,034</td>
                  <td className="px-4 py-3 text-center text-sm font-bold text-dark-blue">$10,212-$12,032</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Explanatory Text */}
          <div className="space-y-4 text-text-secondary text-sm leading-relaxed">
            <p>
              <strong className="text-dark-blue">OCT Budget as % of Operational Budget:</strong> This measure demonstrates IT support for employees and residents. Measurements from an agnostic third party indicate the ratio of IT FTE to City FTE is ideally approximately 3.6%. Other departments outside OCT may assume information technology functions independently.
            </p>
            <p>
              <strong className="text-dark-blue">IT Spend per City FTE:</strong> The average IT spending per employee benchmark is $10,212 and the City of Edmonton is much lower at $4,034 per employee. This result does not account for the City&apos;s full spend on IT due to the existence of shadow IT.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
