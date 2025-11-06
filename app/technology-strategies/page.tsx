import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Technology Strategies | Open City & Technology',
  description: 'View technology strategies, roadmaps, and strategic initiatives for Open City & Technology.',
};

export default function TechnologyStrategiesPage() {
  const strategies = [
    {
      title: 'Business Technology Strategy',
      description: 'The City of Edmonton\'s comprehensive strategy for aligning technology investments with business objectives and driving digital transformation.',
      url: 'https://www.edmonton.ca/sites/default/files/public-files/assets/Business_Technology_Strategy.pdf',
      year: '2020-2024',
      icon: '📋',
    },
    {
      title: 'Edmonton\'s Digital Action Plan',
      description: 'A forward-looking plan to leverage digital technologies and data to improve city services and enhance citizen experiences.',
      url: 'https://www.edmonton.ca/sites/default/files/public-files/documents/CoE_Digital-Action-Plan.pdf',
      year: '2019-2022',
      icon: '🚀',
    },
    {
      title: 'OCT 2019-2022 Business Plan',
      description: 'Open City & Technology\'s strategic business plan outlining key priorities, initiatives, and performance targets for technology services.',
      url: 'https://drive.google.com/file/d/1RbhDRsiyXMZT9TBPpnA073-8Wp5WDvHv/view?ts=5d5c252a',
      year: '2019-2022',
      icon: '📊',
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="container mx-auto max-w-7xl py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-primary-blue mb-4 pb-3 border-b-2 border-[#F4F2F1]">
            Technology Strategies
          </h1>
          <p className="font-serif text-lg md:text-xl text-[#495057] max-w-3xl mt-6">
            Explore strategic technology plans, roadmaps, and key initiatives that guide the future of technology services for the City of Edmonton.
          </p>
        </div>

        {/* Strategy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {strategies.map((strategy, index) => (
            <a
              key={index}
              href={strategy.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#D3ECEF] rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-transparent hover:border-primary-blue"
            >
              <div className="text-5xl mb-4">{strategy.icon}</div>
              <div className="mb-3">
                <span className="inline-block font-sans text-xs font-semibold bg-primary-blue text-white px-3 py-1 rounded-full">
                  {strategy.year}
                </span>
              </div>
              <h2 className="font-sans text-xl font-bold text-[#212529] mb-3 group-hover:text-primary-blue transition-colors">
                {strategy.title}
              </h2>
              <p className="font-sans text-base text-[#495057] mb-4">
                {strategy.description}
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
            About These Strategies
          </h2>
          <p className="font-sans text-base text-[#495057] mb-4">
            These strategic documents provide the framework for technology planning, investment, and governance across the City of Edmonton. They outline our vision for digital transformation and guide decision-making to ensure technology serves the needs of citizens and staff.
          </p>
          <p className="font-sans text-base text-[#495057]">
            For questions about these strategies or to learn more about upcoming initiatives, please contact the Technology Planning section.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
