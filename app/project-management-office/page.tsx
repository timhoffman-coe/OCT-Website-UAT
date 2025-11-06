import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Project Management Office | Open City & Technology',
  description: 'Ensuring technology projects are delivered on time, on budget, and meet strategic goals.',
};

export default function ProjectManagementOfficePage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <main className="container mx-auto max-w-7xl py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-complement-sunrise rounded-lg shadow-xl p-8 md:p-12 mb-12">
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-white mb-4">
            Project Management Office
          </h1>
          <p className="font-serif text-xl text-gray-800/90">
            Delivering excellence in technology projects.
          </p>
        </div>

        {/* Overview Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-8">
          <h2 className="font-sans text-3xl font-bold text-gray-800 mb-6">
            Overview
          </h2>
          <p className="font-sans text-lg text-gray-700 mb-4">
            The Technology Project Management Office (PMO) is a service organization that delivers and supports technology projects approved by the City's Business Technology Governance. The PMO is principally responsible for planning and controlling the tactical execution of technology projects approved by the City's Technology Investment Governance.
          </p>
          <p className="font-sans text-lg text-gray-700">
            Through centralized project delivery, the PMO develops and follows standardized processes and techniques that build a culture focused on results.
          </p>
        </div>

        {/* What We Want & Why It Matters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="font-sans text-2xl font-bold text-complement-sea-green mb-4">
              What We Want
            </h2>
            <ul className="font-sans text-gray-700 space-y-3 list-disc list-inside">
              <li>To be a key contributor to achieving the outcomes of the City's Business Technology Strategy, and to become recognized as a leader in delivering technology projects that improve the lives of Edmontonians.</li>
              <li>To create a culture of project management professionalism that enables an environment of predictable, effective, measurable and disciplined project management.</li>
              <li>To deliver technology projects on schedule, within scope and budget and of maximal value to the organization.</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="font-sans text-2xl font-bold text-complement-sea-green mb-4">
              Why It Matters
            </h2>
            <p className="font-sans text-gray-700">
              Centralized project delivery increases the City's ability to successfully deliver technology projects with maximal value to the organization.
            </p>
          </div>
        </div>

        {/* Key Capabilities */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="font-sans text-3xl font-bold text-gray-800 mb-6">
            Our Capabilities
          </h2>
          <p className="font-sans text-gray-700 mb-6">
            The PMO increases the City's ability to:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-complement-sea-green pl-4">
              <h3 className="font-sans font-semibold text-gray-800 mb-2">Meet customer needs and expectations</h3>
            </div>
            <div className="border-l-4 border-complement-sea-green pl-4">
              <h3 className="font-sans font-semibold text-gray-800 mb-2">Facilitate better decision making</h3>
              <p className="font-sans text-sm text-gray-700">Throughout a project's lifecycle by maintaining and providing timely and accurate project data</p>
            </div>
            <div className="border-l-4 border-complement-sea-green pl-4">
              <h3 className="font-sans font-semibold text-gray-800 mb-2">Ensure stakeholder understanding</h3>
              <p className="font-sans text-sm text-gray-700">Sponsors, executives, and other project stakeholders inside and outside OCT understand their roles and responsibilities in contributing to projects' success</p>
            </div>
            <div className="border-l-4 border-complement-sea-green pl-4">
              <h3 className="font-sans font-semibold text-gray-800 mb-2">Ensure quality control</h3>
              <p className="font-sans text-sm text-gray-700">Project deliverables abide by quality control measures</p>
            </div>
            <div className="border-l-4 border-complement-sea-green pl-4">
              <h3 className="font-sans font-semibold text-gray-800 mb-2">Increase probability of success</h3>
              <p className="font-sans text-sm text-gray-700">Executing projects successfully, on schedule, within scope and budget</p>
            </div>
            <div className="border-l-4 border-complement-sea-green pl-4">
              <h3 className="font-sans font-semibold text-gray-800 mb-2">Proactively manage risks</h3>
              <p className="font-sans text-sm text-gray-700">Manage and reduce project risks before they become issues</p>
            </div>
          </div>
        </div>

        {/* Leadership Contact */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="font-sans text-2xl font-bold text-gray-800 mb-4">
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-sans text-sm font-semibold text-complement-empire-blue uppercase">Director</p>
              <p className="font-sans text-lg font-bold text-gray-800">Nisreen Hussain</p>
              <a href="mailto:nisreen.hussain@edmonton.ca" className="font-sans text-sm text-complement-sea-green hover:text-primary-blue">nisreen.hussain@edmonton.ca</a>
            </div>
            <div>
              <p className="font-sans text-sm font-semibold text-complement-empire-blue uppercase">Program Managers</p>
              <p className="font-sans text-gray-800">Liviu Jalba, Shengxi Jin</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="font-sans text-sm text-gray-600 italic">
              Note: A technology project is any project that plans or implements changes in the City's technology ecosystem.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
