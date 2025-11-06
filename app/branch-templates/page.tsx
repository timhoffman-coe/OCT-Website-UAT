import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Branch Templates | Open City & Technology',
  description: 'Access branch templates and resources for Open City & Technology.',
};

export default function BranchTemplatesPage() {
  const templates = [
    {
      title: 'OCT Briefing Note',
      type: 'Google Doc Template',
      description: 'Standard template for creating briefing notes for Open City & Technology leadership and stakeholders.',
      url: 'https://docs.google.com/document/d/1nojr-66NKC8-9EOqHPGMsJjoBPi4CDVrMQw2rHbGO-o/copy',
      icon: '📄',
    },
    {
      title: 'OCT Memo',
      type: 'Google Doc Template',
      description: 'Standard template for creating internal memorandums for Open City & Technology communications.',
      url: 'https://docs.google.com/document/d/1pyFcj11qUA_jwqFDSNJ-PXAxhEseMOZ_DQk8vqntVfA/copy',
      icon: '📝',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="container mx-auto max-w-7xl py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-primary-blue mb-4 pb-3 border-b-2 border-[#F4F2F1]">
            Branch Templates
          </h1>
          <p className="font-serif text-lg md:text-xl text-[#495057] max-w-3xl mt-6">
            Access standardized templates and resources for Open City & Technology branch operations and communications.
          </p>
        </div>

        {/* Template Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {templates.map((template, index) => (
            <a
              key={index}
              href={template.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#D3ECEF] rounded-lg p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-primary-blue"
            >
              <div className="text-6xl mb-4">{template.icon}</div>
              <div className="mb-3">
                <span className="inline-block font-sans text-xs font-semibold bg-[#DDE3E6] text-[#495057] px-3 py-1 rounded-full">
                  {template.type}
                </span>
              </div>
              <h2 className="font-sans text-2xl font-bold text-[#212529] mb-3 group-hover:text-primary-blue transition-colors">
                {template.title}
              </h2>
              <p className="font-sans text-base text-[#495057] mb-6">
                {template.description}
              </p>
              <div className="flex items-center font-sans text-base font-semibold text-primary-blue">
                <span>Copy Template</span>
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

        {/* Usage Instructions */}
        <div className="bg-[#F4F2F1] rounded-lg p-8 mb-8">
          <h2 className="font-sans text-2xl font-bold text-[#212529] mb-4">
            How to Use These Templates
          </h2>
          <ol className="font-sans text-base text-[#495057] space-y-3 ml-6 list-decimal">
            <li>Click on any template card above to open the template in Google Docs</li>
            <li>The link will automatically create a copy of the template in your Google Drive</li>
            <li>Rename your copy and fill in the required information</li>
            <li>Follow the formatting and structure provided in the template</li>
            <li>Share or distribute your completed document as needed</li>
          </ol>
        </div>

        {/* Additional Information */}
        <div className="bg-[#D3ECEF] rounded-lg p-8">
          <h2 className="font-sans text-2xl font-bold text-[#212529] mb-4">
            Template Guidelines
          </h2>
          <p className="font-sans text-base text-[#495057] mb-4">
            These templates follow City of Edmonton branding and communication standards. Please maintain the formatting, structure, and style when using these templates to ensure consistency across all OCT communications.
          </p>
          <p className="font-sans text-base text-[#495057]">
            For questions about template usage or to request additional templates, please contact your supervisor or the OCT administrative team.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
