import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Integrated Technology Solutions | Open City & Technology',
  description: 'Managing the core infrastructure, networks, and systems that keep the City connected.',
};

export default function IntegratedTechnologySolutionsPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <main className="container mx-auto max-w-7xl py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-complement-sea-green rounded-lg shadow-xl p-8 md:p-12 mb-12">
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-white mb-4">
            Integrated Technology Solutions
          </h1>
          <p className="font-serif text-xl text-white/90">
            The foundation for all digital services.
          </p>
        </div>

        {/* Overview Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-8">
          <h2 className="font-sans text-3xl font-bold text-gray-800 mb-6">
            Overview
          </h2>
          <p className="font-sans text-lg text-gray-700">
            IT infrastructure is like the blueprint or foundation of a building, consisting of various parts such as computers, software, and networks. It serves as the underlying structure that supports all the services and solutions within an organization's technology environment. Integrated Technology Solutions ensures that servers, storage, backup, database, and workspace technology are always available and operate efficiently through process improvements and automation.
          </p>
        </div>

        {/* Services Section */}
        <div className="space-y-8">
          <h2 className="font-sans text-3xl font-bold text-gray-800">
            Our Services
          </h2>

          {/* Technology Infrastructure Operations */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="font-sans text-2xl font-bold text-complement-sea-green mb-4">
              Technology Infrastructure Operations
            </h3>
            <p className="font-sans text-gray-700 mb-4">
              Technology Infrastructure Operations ensures that servers, storage, backup, database, and workspace technology are always available and operate efficiently through process improvements and automation.
            </p>
            <div className="space-y-3">
              <div>
                <p className="font-sans font-semibold text-gray-800 mb-2">Database Management</p>
                <p className="font-sans text-gray-700">The Database Management team provides critical services supporting the City's database environment.</p>
              </div>
              <div>
                <p className="font-sans font-semibold text-gray-800 mb-2">Server Solutions & Automation</p>
                <p className="font-sans text-gray-700">The Server Solutions & Automation team provides critical services supporting the City's Storage, Server Operating Systems, Printing and Data Protection.</p>
              </div>
              <div>
                <p className="font-sans font-semibold text-gray-800 mb-2">Virtualization</p>
                <p className="font-sans text-gray-700">The Virtualization team provides critical services supporting the City's Server infrastructure and Virtualization platform.</p>
              </div>
            </div>
          </div>

          {/* Telecom and IoT */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="font-sans text-2xl font-bold text-complement-sea-green mb-4">
              Telecom and Internet of Things (IoT)
            </h3>
            <div className="space-y-4 font-sans text-gray-700">
              <div>
                <p className="font-semibold mb-2">Telecommunications</p>
                <p>Telecommunications provides various communication services including wireline & VoIP (Voice over IP) phone, cellular wireless, M2M (machine to machine), LoRaWAN IoT network and a Cisco Call Center solution to serve and support all City business areas. More information can be found in the team's web site: <a href="https://sites.google.com/edmonton.ca/voice-mobility-iot/home?authuser=0" target="_blank" rel="noopener noreferrer" className="text-complement-sea-green hover:text-primary-blue underline">Voice, Mobility & IoT</a></p>
              </div>
              <div>
                <p className="font-semibold mb-2">Internet of Things (IoT)</p>
                <p>The Internet of Things (IoT) generally refers to networked devices embedded with sensors, software, allowing them to collect and share data from the world around us that can be processed and utilized for various purposes. More information can be found in <a href="https://sites.google.com/edmonton.ca/iot/home" target="_blank" rel="noopener noreferrer" className="text-complement-sea-green hover:text-primary-blue underline">COE IoT Hub</a>.</p>
              </div>
            </div>
          </div>

          {/* Data Technology */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="font-sans text-2xl font-bold text-complement-sea-green mb-4">
              Data Technology
            </h3>
            <p className="font-sans text-gray-700 mb-4">
              Data Technology is a core component of the Integrated Technology Solutions (ITS) team, dedicated to enabling City of Edmonton employees and citizens to seamlessly connect with technology, applications, and each other.
            </p>
            <div className="space-y-3">
              <div>
                <p className="font-sans font-semibold text-gray-800 mb-2">Connecting Technologies</p>
                <p className="font-sans text-gray-700">The Connecting Technologies team oversees Application Delivery Controllers, cloud tenancies, Appspace (digital signage and space management), and digital faxing solutions, ensuring secure and efficient application delivery and connectivity.</p>
              </div>
              <div>
                <p className="font-sans font-semibold text-gray-800 mb-2">Data Center</p>
                <p className="font-sans text-gray-700">Manages the City's on-prem and colocation data center facilities, overseeing power, cooling, rack elevations, and asset management, including Rogers EDC1, Rogers EDC2, and City Hall.</p>
              </div>
              <div>
                <p className="font-sans font-semibold text-gray-800 mb-2">Network</p>
                <p className="font-sans text-gray-700">OCT's Network team manages the data center and campus networks, overseeing approximately 1,000 switches, 1,400 wireless access points, and 300 km of dark fiber networks across all City facilities, including recreation centers, fire stations, and office towers.</p>
              </div>
            </div>
          </div>

          {/* Partner Experience */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="font-sans text-2xl font-bold text-complement-sea-green mb-4">
              Partner Experience
            </h3>
            <p className="font-sans text-gray-700 mb-4">
              Partner Experience delivers essential user assistance and manages our computing environment through several key functional areas to help our internal customers provide services to our citizens.
            </p>
            <div className="space-y-3">
              <div>
                <p className="font-sans font-semibold text-gray-800 mb-2">Service Desk</p>
                <p className="font-sans text-gray-700">Provides IT assistance via support tickets and calls, remotely resolving issues and providing active assistance for a wide variety of technical areas and tasks.</p>
              </div>
              <div>
                <p className="font-sans font-semibold text-gray-800 mb-2">Desktop Support</p>
                <p className="font-sans text-gray-700">Provides in person break fix to all of our City sites as the bridge from the Service Desk.</p>
              </div>
              <div>
                <p className="font-sans font-semibold text-gray-800 mb-2">Desktop Administration</p>
                <p className="font-sans text-gray-700">Handles the management of all of our computing devices (~12,000) to ensure look, feel and standardization. Manage the operating systems, patching of the devices to ensure they are safe and secure. Additionally, they handle the support of deployment of software to make sure all software is functioning properly on the 12,000 devices in the environment through automated deployments and loading custom configurations of software to allow for instant use of the software as opposed to user configuration. Desktop Administration also provides tools to empower technical teams to support their various applications on all of our devices as well.</p>
              </div>
            </div>
          </div>

          {/* Service Delivery and Analytics */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="font-sans text-2xl font-bold text-complement-sea-green mb-4">
              Service Delivery and Analytics
            </h3>
            <div className="space-y-4">
              <div>
                <p className="font-sans font-semibold text-gray-800 mb-2">Service Management Office</p>
                <p className="font-sans text-gray-700">The SMO is instrumental in both operational and business-facing aspects of IT service delivery. Operationally, it focuses on Change, Problem, and Incident Management processes, enhancing visibility to enable proactive planning and efficient issue resolution. On the business-facing side, the SMO manages the Digital Workplace Catalog and Work Order process to streamline service requests for all City of Edmonton staff and align IT services with business needs. The SMO supports the Remedy ITSM platform, which at its core leverages the Configuration Management Database (CMDB) to define relationships between IT assets, applications, employees, support teams, and the services delivered by OCT.</p>
              </div>
              <div>
                <p className="font-sans font-semibold text-gray-800 mb-2">Monitoring & Analytics</p>
                <p className="font-sans text-gray-700">The Monitoring & Analytics team provides reliable monitoring platforms and services to OCT and the business, including IT infrastructure, datacenter & campus networks, as well as applications and user interfaces. They facilitate rapid response to operational issues via modern alerting and notification platforms, and provide crucial visibility to key stakeholders with various data analysis tools, dashboards, and reporting services. The Monitoring & Analytics team's services continually adapt and improve to ensure alignment with the rapidly-evolving technology landscape within OCT, leveraging modern technology such as AI and custom integrations to provide accurate and relevant data to their customers.</p>
              </div>
            </div>
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
              <p className="font-sans text-lg font-bold text-gray-800">Mike Fryer</p>
              <a href="mailto:mike.fryer@edmonton.ca" className="font-sans text-sm text-complement-sea-green hover:text-primary-blue">mike.fryer@edmonton.ca</a>
            </div>
            <div>
              <p className="font-sans text-sm font-semibold text-complement-empire-blue uppercase">Program Managers & Technical Lead</p>
              <p className="font-sans text-gray-800">Josh McGillis, Patrick Lau, Tim Hoffman, Alex Noot, Kevin Wang</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
