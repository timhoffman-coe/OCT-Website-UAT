'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<'actions' | 'projects' | 'performance'>('actions');
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

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <main className="p-4 md:p-8 lg:p-12">
        {/* Page Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-blue mb-6">
            About Open City and Technology
          </h1>
        </div>

        {/* Message from Branch Manager */}
        <div className="max-w-7xl mx-auto mb-8 bg-white rounded-lg shadow-lg p-8">
          <h2 className="font-sans text-2xl font-bold text-primary-blue mb-6">
            Message from the Branch Manager
          </h2>
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Portrait */}
            <div className="flex-shrink-0">
              <div className="w-48 h-64 md:w-56 md:h-72 relative rounded-lg overflow-hidden shadow-md">
                <Image
                  src="/images/Daryl.webp"
                  alt="Daryl Croft, Branch Manager"
                  fill
                  sizes="(max-width: 768px) 192px, 224px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Message Content */}
            <div className="font-sans text-gray-700 space-y-4 flex-1">
              <p>
                At the City of Edmonton, we continuously seek opportunities to understand, harness, and leverage technology's ever expanding capabilities to improve quality of life for all Edmontonians.
              </p>
              <p>
                Our Open City and Technology branch is a key part in supporting the organization to deliver safe, secure and reliable data and efficient technology solutions for our business partners to optimize processes and deliver excellent services. The team is responsible for managing and maintaining the City's technology infrastructure, ensuring technology investments are prioritized, integrated and managed, and that technology is available and operates efficiently and effectively through process improvements and automation. The branch works with all business areas across the organization to make informed technology decisions that provide value to Edmontonians.
              </p>
              <p>
                Over the last few years, technology has played a bigger role than ever in our lives. From working remotely to learning to use online services in new ways, many have experienced a shift in how we use technology to connect with the world around us.
              </p>
              <p>
                The City of Edmonton is a place where agile and secure technology deployment is a core consideration in program and service delivery. We prioritize innovation and adaptability, with a proactive approach to cybersecurity, and this approach allows us to continually embrace new technologies and developments in data.
              </p>
              <p>
                Open City and Technology is an essential component for the City of Edmonton to deliver effective and efficient services for Edmonton. As technology continues to advance, the role of the branch will only become more critical in ensuring the City of Edmonton can meet and exceed the evolving needs of Edmontonians now and in the future.
              </p>
            </div>
          </div>
        </div>

        {/* Corporate Outcome */}
        <div className="max-w-7xl mx-auto mb-8 bg-complement-empire-blue text-white rounded-lg shadow-lg p-6">
          <h2 className="font-sans text-xl font-bold mb-2">Corporate Outcome</h2>
          <p className="font-sans text-lg">
            <strong>Technology and Data</strong> - The City of Edmonton's technology and data are leveraged to enable quality decision-making and enhance innovative service delivery.
          </p>
        </div>

        {/* Branch Overview */}
        <div className="max-w-7xl mx-auto mb-8 bg-white rounded-lg shadow-lg p-8">
          <h2 className="font-sans text-2xl font-bold text-primary-blue mb-4">
            Branch Overview
          </h2>
          <div className="font-sans text-gray-700 space-y-4">
            <p>
              Open City and Technology (OCT) works across the corporation to ensure technology investment is prioritized, managed, and governed to realize the greatest benefit to citizens. OCT facilitates the delivery of effective, and efficient services while supporting the strategic outcomes of internal Business Partners and corporate strategy.
            </p>
            <p>
              The branch is unique in the provisioning of key services to the corporation while simultaneously supporting the delivery of technology that fosters economic and social activity outside of the organization. Ultimately, this branch brings together creative, innovative, and nimble solution delivery with the operational expertise needed to meet the changing needs of citizens.
            </p>
          </div>
        </div>

        {/* Tabbed Interface for Key Actions, Capital Projects, and Performance */}
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
                  The City's capital investments align with the City's strategic direction and are a balance of renewal and growth to maximize benefits, manage risk and maintain the services Edmontonians expect. The full list of capital projects can be found in the{' '}
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
                    <strong>Percent of Information Technology FTE to City FTE:</strong> This measure demonstrates IT support for employees and residents. Measurements from an agnostic third party indicate the ratio of Information Technology (IT) FTE to City FTE is ideally approximately 3.6%. Other departments and branches outside of the Open City and Technology Branch may assume information technology functions. This can include having dedicated FTEs building technology solutions (independent of the City's digital architecture and corporate priorities), to side-of-the-desk maintenance of department and branch applications.
                  </p>
                  <p>
                    <strong>Information Technology Spend per City FTE:</strong> Measurements from an agnostic third party indicates that the average Information Technology (IT) spending per employee is $10,212 and the City of Edmonton is much lower at $4,034 per employee. This measure indicates the amount of IT support the average employee receives. This result does not account for the City of Edmonton's full spend on IT due to the existence of shadow IT.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Emerging Opportunities and Risks */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Opportunities */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="font-sans text-xl font-bold text-complement-sea-green mb-4">
                Emerging Opportunities
              </h2>
              <div className="space-y-4 font-sans text-gray-700">
                <div className="border-l-4 border-complement-sea-green pl-4">
                  <p className="font-semibold mb-2">Effective use of technology</p>
                  <p>
                    that prioritizes economic, corporate, and business needs is crucial to ensure delivery of high value initiatives. Open City and Technology will strengthen strategic partnerships, increase alignment with business and corporate strategy, enhance citizen focus, and provide a system wide view to continuously improve the effectiveness of the City's technology investments.
                  </p>
                </div>
                <div className="border-l-4 border-complement-sea-green pl-4">
                  <p className="font-semibold mb-2">Streamlining the delivery of personalized digital services</p>
                  <p>
                    can improve resident access to and experience of City services. In collaboration with the My Alberta Digital Identity (MADI) group at the Government of Alberta, the City is exploring the creation of citizen digital identities to validate and authenticate citizens accessing City services and improve user experience through a streamlined data solution.
                  </p>
                </div>
              </div>
            </div>

            {/* Risks */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="font-sans text-xl font-bold text-red-600 mb-4">
                Emerging Risks
              </h2>
              <div className="space-y-4 font-sans text-gray-700">
                <div className="border-l-4 border-red-600 pl-4">
                  <p className="font-semibold mb-2">Growing technology debt and sprawl</p>
                  <p>
                    In the absence of a single decision making body with authority to meaningfully coordinate and align technology investments across the corporation, both the risks and costs associated with technology debt and sprawl will continue to grow.
                  </p>
                </div>
                <div className="border-l-4 border-red-600 pl-4">
                  <p className="font-semibold mb-2">Increasing deficit technical knowledge and skills</p>
                  <p>
                    As the expectations of Edmontonians, elected officials and City leaders for better and more efficient digital services, so too does the need for the appropriate skills and certifications of the staff that work in the digital space. The inability of Administration to tie job descriptions to evolving technology certification and skills is a barrier that is greeting a widening gap in this space.
                  </p>
                </div>
                <div className="border-l-4 border-red-600 pl-4">
                  <p className="font-semibold mb-2">Detection, prevention and response to cyber attacks</p>
                  <p>
                    against digital assets (information and critical infrastructure). As technology evolves so will the ways bad actors exploit those technologies. This a global threat that underlines all technology related activities at the City of Edmonton and is managed corporately by OCT, underscoring the importance of strengthened governance, authorities and line of sight on shadow IT functions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
