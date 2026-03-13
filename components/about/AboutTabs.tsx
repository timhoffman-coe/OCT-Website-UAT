'use client';

import { useState } from 'react';

const keyActions = [
  {
    title: 'Foster Strategic Partnership',
    description: 'Establish and strengthen internal and external business-level relationships to ensure shared goals are understood, aligned and met. This integration moves OCT from being a technology service provider, to a key strategic partner and collaborator in achieving the city\'s overall objectives. This action aligns with ELT\'s priority to deliver core services.'
  },
  {
    title: 'Mature Cybersecurity Posture and Capabilities',
    description: 'Enhance cyber security maturity and capabilities (especially in the areas of single sign on, privileged access management, identity access management application integration, and data leak protection) for operating sustainment, and to increase the base capabilities within the City\'s IT disaster recovery program. This action aligns with ELT\'s priority to advance safety and security.'
  },
  {
    title: 'Deploy Technology Tools Across the Corporation to drive continuous improvement',
    description: 'Advance the deployment and adoption of new digital tools such as Artificial Intelligence (AI) to increase effective and efficient productivity across the organization. This action aligns to ELT\'s priority to delivering core services.'
  },
  {
    title: 'Develop, Manage, and Renew Technology Applications',
    description: 'Develop and renew investments to manage and maintain the City\'s technology applications. This action aligns with ELT\'s priority to deliver core services.'
  },
  {
    title: 'Expand, Manage and Renew Technology Infrastructure',
    description: 'Although technology is not as visible as bridges and roads, IT infrastructure are assets that require similar investment and attention to ensure responsible lifecycle management is being practiced. This insures investment in technology does not become "technology debt" or a cyber security liability This action aligns with ELT\'s priority to deliver core services.'
  },
  {
    title: 'Maintain Technology Project Management Success',
    description: 'Continue to successfully manage technology-based projects for City business units. This action aligns with ELT\'s priority to deliver core services.'
  },
  {
    title: 'Strengthen Corporate IT Governance: Oversight and Accountability',
    description: 'Strengthen decision making processes and authorities to ensure resources are prioritised towards digital solutions that benefit the entire City\'s ecosystem and long-term value. This action aligns to ELT\'s priority of delivering core services and advancing safety and security.'
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
    <div className="max-w-7xl mx-auto mb-8">
      {/* Tab Navigation */}
      <div className="bg-gray-100 rounded-t-lg pt-2 px-2">
        <nav className="flex flex-wrap gap-1" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('actions')}
            className={`flex-1 min-w-0 py-4 px-4 text-center font-sans font-semibold text-sm sm:text-base transition-all rounded-t-lg border-t-2 border-x-2 ${
              activeTab === 'actions'
                ? 'bg-white text-primary-blue border-primary-blue shadow-md -mb-px pb-[calc(1rem+1px)]'
                : 'bg-gray-200 text-gray-600 border-gray-300 hover:bg-gray-300 hover:text-gray-800'
            }`}
          >
            Key Actions 2025-2026
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex-1 min-w-0 py-4 px-4 text-center font-sans font-semibold text-sm sm:text-base transition-all rounded-t-lg border-t-2 border-x-2 ${
              activeTab === 'projects'
                ? 'bg-white text-primary-blue border-primary-blue shadow-md -mb-px pb-[calc(1rem+1px)]'
                : 'bg-gray-200 text-gray-600 border-gray-300 hover:bg-gray-300 hover:text-gray-800'
            }`}
          >
            Capital Projects
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`flex-1 min-w-0 py-4 px-4 text-center font-sans font-semibold text-sm sm:text-base transition-all rounded-t-lg border-t-2 border-x-2 ${
              activeTab === 'performance'
                ? 'bg-white text-primary-blue border-primary-blue shadow-md -mb-px pb-[calc(1rem+1px)]'
                : 'bg-gray-200 text-gray-600 border-gray-300 hover:bg-gray-300 hover:text-gray-800'
            }`}
          >
            Performance
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-b-lg shadow-lg p-8">
        {/* Key Actions Tab */}
        {activeTab === 'actions' && (
          <div>
            <h2 className="font-sans text-2xl font-bold text-primary-blue mb-6">
              Key Actions for 2025-2026
            </h2>
            <div className="space-y-6">
              {keyActions.map((action, idx) => (
                <div key={idx} className="border-l-4 border-complement-sea-green pl-4">
                  <h3 className="font-sans text-lg font-bold text-gray-800 mb-2">
                    {action.title}
                  </h3>
                  <p className="font-sans text-gray-700">
                    {action.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Capital Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <h2 className="font-sans text-2xl font-bold text-primary-blue mb-4">
              Capital Projects
            </h2>
            <p className="font-sans text-gray-700 mb-6">
              The City&apos;s capital investments align with the City&apos;s strategic direction and are a balance of renewal and growth to maximize benefits, manage risk and maintain the services Edmontonians expect. The full list of capital projects can be found in the{' '}
              <a
                href="https://www.edmonton.ca/city_government/budget-and-finances"
                target="_blank"
                rel="noopener noreferrer"
                className="text-complement-sea-green hover:text-primary-blue underline"
              >
                2023-2026 Capital Budget
              </a>
              , which includes reports on each capital profile (search by profile number).
            </p>

            <h3 className="font-sans text-xl font-bold text-gray-800 mb-3">Growth Projects</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-gray-50 border border-gray-200">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="font-sans px-4 py-2 text-left text-gray-800 font-semibold">Profile No.</th>
                    <th className="font-sans px-4 py-2 text-left text-gray-800 font-semibold">Profile Name</th>
                  </tr>
                </thead>
                <tbody>
                  {growthProjects.map((project, idx) => (
                    <tr key={idx} className="border-t border-gray-200">
                      <td className="font-sans px-4 py-2 text-gray-700">{project.profile}</td>
                      <td className="font-sans px-4 py-2 text-gray-700">{project.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="font-sans text-xl font-bold text-gray-800 mb-3">Renewal Projects</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-50 border border-gray-200">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="font-sans px-4 py-2 text-left text-gray-800 font-semibold">Profile No.</th>
                    <th className="font-sans px-4 py-2 text-left text-gray-800 font-semibold">Profile Name</th>
                  </tr>
                </thead>
                <tbody>
                  {renewalProjects.map((project, idx) => (
                    <tr key={idx} className="border-t border-gray-200">
                      <td className="font-sans px-4 py-2 text-gray-700">{project.profile}</td>
                      <td className="font-sans px-4 py-2 text-gray-700">{project.name}</td>
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
            <h2 className="font-sans text-2xl font-bold text-primary-blue mb-4">
              Performance
            </h2>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-gray-50 border border-gray-200">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="font-sans px-4 py-2 text-left text-gray-800 font-semibold">Measure</th>
                    <th className="font-sans px-4 py-2 text-center text-gray-800 font-semibold">2022 Actual</th>
                    <th className="font-sans px-4 py-2 text-center text-gray-800 font-semibold">2023 Actual</th>
                    <th className="font-sans px-4 py-2 text-center text-gray-800 font-semibold">2024 Actual</th>
                    <th className="font-sans px-4 py-2 text-center text-gray-800 font-semibold">2026 Benchmark</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-200">
                    <td className="font-sans px-4 py-2 text-gray-700 font-semibold">OCT Budget as % of Operational Budget</td>
                    <td className="font-sans px-4 py-2 text-center text-gray-700">1.76%</td>
                    <td className="font-sans px-4 py-2 text-center text-gray-700">1.78%</td>
                    <td className="font-sans px-4 py-2 text-center text-gray-700">1.75%</td>
                    <td className="font-sans px-4 py-2 text-center text-gray-700">5.10%</td>
                  </tr>
                  <tr className="border-t border-gray-200">
                    <td className="font-sans px-4 py-2 text-gray-700 font-semibold">Information Technology Spend per City FTE</td>
                    <td className="font-sans px-4 py-2 text-center text-gray-700">$4,269</td>
                    <td className="font-sans px-4 py-2 text-center text-gray-700">$4,134</td>
                    <td className="font-sans px-4 py-2 text-center text-gray-700">$4,034</td>
                    <td className="font-sans px-4 py-2 text-center text-gray-700">$10,212-$12,032</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="space-y-4 font-sans text-gray-700">
              <p>
                <strong>Percent of Information Technology FTE to City FTE:</strong> This measure demonstrates IT support for employees and residents. Measurements from an agnostic third party indicate the ratio of Information Technology (IT) FTE to City FTE is ideally approximately 3.6%. Other departments and branches outside of the Open City and Technology Branch may assume information technology functions. This can include having dedicated FTEs building technology solutions (independent of the City&apos;s digital architecture and corporate priorities), to side-of-the-desk maintenance of department and branch applications.
              </p>
              <p>
                <strong>Information Technology Spend per City FTE:</strong> Measurements from an agnostic third party indicates that the average Information Technology (IT) spending per employee is $10,212 and the City of Edmonton is much lower at $4,034 per employee. This measure indicates the amount of IT support the average employee receives. This result does not account for the City of Edmonton&apos;s full spend on IT due to the existence of shadow IT.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
