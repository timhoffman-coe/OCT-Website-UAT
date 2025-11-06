import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Policies, Directives, & Procedures | Open City & Technology',
  description: 'Access technology policies, directives, and procedures for Open City & Technology.',
};

export default function PoliciesPage() {
  const policies = [
    {
      title: 'Acceptable Use of Communication Technology',
      type: 'Directive & Procedure',
      code: 'A1429D',
      description: 'Guidelines for appropriate and responsible use of City communication technology resources.',
      url: 'https://www.edmonton.ca/city_government/documents/acceptable_use_of_communication_technology_A1429D_administrative_directive.pdf',
      icon: '📱',
    },
    {
      title: 'IT Hardware & Software - Non Standard Request',
      type: 'Directive & Procedure',
      code: 'A1442B',
      description: 'Process and requirements for requesting non-standard IT hardware and software.',
      url: 'https://www.edmonton.ca/city_government/documents/PDF/IT-Hardware-and-Software-Non-Standard-Request-A1442B.pdf',
      icon: '💻',
    },
    {
      title: 'IT Investment & Architecture',
      type: 'Directive & Procedure',
      code: 'A1457',
      description: 'Framework for IT investment decisions and enterprise architecture governance.',
      url: 'https://www.edmonton.ca/city_government/documents/PoliciesDirectives/A1457_IT_Investment_and_Architecture_Directive%281%29.pdf',
      icon: '🏛️',
    },
    {
      title: 'Open City Policy',
      type: 'Policy',
      code: 'C581',
      description: 'City policy promoting openness, transparency, and public access to data and information.',
      url: 'https://www.edmonton.ca/city_government/documents/PoliciesDirectives/C581.pdf',
      icon: '🌐',
    },
    {
      title: 'Overtime and Afterhours',
      type: 'Standard Operating Procedures',
      code: 'SOP',
      description: 'Procedures for managing overtime and after-hours support for technology services.',
      url: 'https://docs.google.com/document/d/1Qlt4E2G8jhZMhJ0NFGsq8t0hlBfQEB5TXCk2Sbg3jDE/edit',
      icon: '🕐',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="container mx-auto max-w-7xl py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-primary-blue mb-4 pb-3 border-b-2 border-[#F4F2F1]">
            Policies, Directives, & Procedures
          </h1>
          <p className="font-serif text-lg md:text-xl text-[#495057] max-w-3xl mt-6">
            Access official technology policies, administrative directives, and operational procedures that guide technology governance and operations across the City.
          </p>
        </div>

        {/* Policy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {policies.map((policy, index) => (
            <a
              key={index}
              href={policy.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#D3ECEF] rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-primary-blue"
            >
              <div className="text-5xl mb-4">{policy.icon}</div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-block font-sans text-xs font-semibold bg-primary-blue text-white px-3 py-1 rounded-full">
                  {policy.code}
                </span>
                <span className="inline-block font-sans text-xs font-semibold bg-[#DDE3E6] text-[#495057] px-3 py-1 rounded-full">
                  {policy.type}
                </span>
              </div>
              <h2 className="font-sans text-xl font-bold text-[#212529] mb-3 group-hover:text-primary-blue transition-colors">
                {policy.title}
              </h2>
              <p className="font-sans text-base text-[#495057] mb-4">
                {policy.description}
              </p>
              <div className="flex items-center font-sans text-base font-semibold text-primary-blue">
                <span>View Document</span>
                <svg
                  className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Additional Information */}
        <div className="bg-[#F4F2F1] rounded-lg p-8">
          <h2 className="font-sans text-2xl font-bold text-[#212529] mb-4">
            About These Policies
          </h2>
          <p className="font-sans text-base text-[#495057] mb-4">
            These policies, directives, and procedures establish the governance framework for technology services at the City of Edmonton. They ensure consistent, secure, and compliant technology operations while supporting our strategic objectives.
          </p>
          <p className="font-sans text-base text-[#495057]">
            For questions about policy interpretation or compliance, please contact the Technology Planning section or your supervisor.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
