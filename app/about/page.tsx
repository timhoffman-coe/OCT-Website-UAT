import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import AboutTabs from '@/components/about/AboutTabs';

export const metadata = {
  title: 'About | Open City & Technology',
  description: 'Learn about the Open City and Technology branch at the City of Edmonton.',
};

export default function AboutPage() {
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
                At the City of Edmonton, we continuously seek opportunities to understand, harness, and leverage technology&apos;s ever expanding capabilities to improve quality of life for all Edmontonians.
              </p>
              <p>
                Our Open City and Technology branch is a key part in supporting the organization to deliver safe, secure and reliable data and efficient technology solutions for our business partners to optimize processes and deliver excellent services. The team is responsible for managing and maintaining the City&apos;s technology infrastructure, ensuring technology investments are prioritized, integrated and managed, and that technology is available and operates efficiently and effectively through process improvements and automation. The branch works with all business areas across the organization to make informed technology decisions that provide value to Edmontonians.
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
            <strong>Technology and Data</strong> - The City of Edmonton&apos;s technology and data are leveraged to enable quality decision-making and enhance innovative service delivery.
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
        <AboutTabs />

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
                    that prioritizes economic, corporate, and business needs is crucial to ensure delivery of high value initiatives. Open City and Technology will strengthen strategic partnerships, increase alignment with business and corporate strategy, enhance citizen focus, and provide a system wide view to continuously improve the effectiveness of the City&apos;s technology investments.
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
