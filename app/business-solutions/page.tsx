import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Business Solutions | Open City & Technology',
  description: 'Developing, implementing, and supporting the applications that power City services.',
};

export default function BusinessSolutionsPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <main className="container mx-auto max-w-7xl py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-complement-spring-mist rounded-lg shadow-xl p-8 md:p-12 mb-12">
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-white mb-4">
            Business Solutions
          </h1>
          <p className="font-serif text-xl text-white/90">
            Building the software that serves our citizens and staff.
          </p>
        </div>

        {/* Overview Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-8">
          <h2 className="font-sans text-3xl font-bold text-gray-800 mb-6">
            Overview
          </h2>
          <p className="font-sans text-lg text-gray-700 mb-4">
            IT business solutions, often referred to as IT solutions, encompass a range of software, applications, programs, and services designed to assist in achieving business goals and overcoming specific challenges. These solutions are tailored to support different business areas, and different aspects of their operations, helping streamline their processes.
          </p>
        </div>

        {/* Services Section */}
        <div className="space-y-8">
          <h2 className="font-sans text-3xl font-bold text-gray-800">
            Our Services
          </h2>

          {/* POSSE */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="font-sans text-2xl font-bold text-complement-sea-green mb-4">
              Application Support for POSSE
            </h3>
            <p className="font-sans text-gray-700">
              Technical support, development and maintenance of the POSSE platform. POSSE (Public One Stop Service) is a powerful configurable enterprise platform and workflow engine that automates, integrates, monitors and enforces business process rules. The term "configurable" simply means that POSSE can be changed to meet the needs of different business areas. POSSE is a corporate system used by all city departments, citizens and other external business partners.
            </p>
          </div>

          {/* TACS */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="font-sans text-2xl font-bold text-complement-sea-green mb-4">
              Application Support for TACS
            </h3>
            <p className="font-sans text-gray-700">
              Provide full-in-house design and in-house application development for the Taxation and Collection System (TACS) application for the City of Edmonton. The usage of TACS in the organization is to assess, bill, and collect property taxes and is responsible for approximately 60% of the City's operating budget.
            </p>
          </div>

          {/* WebLogic */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="font-sans text-2xl font-bold text-complement-sea-green mb-4">
              Application Support for WebLogic
            </h3>
            <p className="font-sans text-gray-700">
              Technical support and maintenance of the infrastructure. The Oracle Weblogic Server is a JAVA virtual machine that at the City of Edmonton is used to run Oracle Fusion Middleware. The middleware allows for the development, deployment, and execution of Oracle applications (AMIS, CACTIS, Debentures, ETDS, MVCIS, PAC, TACS, TOPS).
            </p>
          </div>

          {/* Google Workspace */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="font-sans text-2xl font-bold text-complement-sea-green mb-4">
              Application Support for Google Workspace
            </h3>
            <p className="font-sans text-gray-700 mb-4">
              <strong>Google Workspace</strong> is a collection of cloud computing, productivity and collaboration tools, software and products developed and marketed by Google. It includes:
            </p>
            <ul className="font-sans text-gray-700 space-y-2 list-disc list-inside ml-4">
              <li><strong>Communication and Collaboration:</strong> Gmail, Google Contacts, Google Calendar, Google Meet, and Google Chat.</li>
              <li><strong>Cloud Storage:</strong> Google Drive.</li>
              <li><strong>Content Creation:</strong> Google Docs Editors suite (Google Docs, Google Sheets, Google Slides, Google Forms, Google Drawings, Google Sites, and Google Keep).</li>
            </ul>
          </div>

          {/* Business Solutions for Branches */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="font-sans text-2xl font-bold text-complement-sea-green mb-4">
              Business Solutions for City of Edmonton Branches
            </h3>
            <p className="font-sans text-gray-700">
              Technical support for the identified business areas' applications. Services include troubleshooting, problem-solving, software updates, application upgrades and maintenance, application roadmapping, and low-code/no-code application creation.
            </p>
          </div>

          {/* Rapid Development */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="font-sans text-2xl font-bold text-complement-sea-green mb-4">
              Rapid Development Services
            </h3>
            <p className="font-sans text-gray-700">
              Rapid Development Services empower you to transform your business with unprecedented speed and efficiency. By leveraging an agile, iterative approach and cutting-edge tools like low-code platforms, we deliver the robust functionality of custom development without the traditional overhead. Experience the power of streamlined workflows, captivating apps, and optimized processes, all within a fraction of the time and cost. Unlock your organization's full potential and accelerate your path to success with Rapid Development Services.
            </p>
          </div>
        </div>

        {/* Leadership Contact */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="font-sans text-2xl font-bold text-gray-800 mb-4">
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-sans text-sm font-semibold text-complement-empire-blue uppercase">Director</p>
              <p className="font-sans text-lg font-bold text-gray-800">Robert Dufresne</p>
              <a href="mailto:robert.dufresne@edmonton.ca" className="font-sans text-sm text-complement-sea-green hover:text-primary-blue">robert.dufresne@edmonton.ca</a>
            </div>
            <div>
              <p className="font-sans text-sm font-semibold text-complement-empire-blue uppercase">Program Managers</p>
              <p className="font-sans text-gray-800">Matthew Raven, Margaret Cieslak-Olmos, Ken Merkel</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
