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
    <div className="bg-white min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <header className="px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center flex flex-col items-center">
          <div className="max-w-4xl">
            <span className="text-process-blue font-bold text-[0.6875rem] uppercase tracking-widest mb-4 block">Our Vision 2024</span>
            <h1 className="font-sans text-5xl md:text-6xl font-bold text-dark-blue leading-tight tracking-tight mb-8">
              About Open City &amp; Technology
            </h1>
            <p className="text-text-secondary text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto">
              Open City and Technology (OCT) works across the corporation to ensure technology investment is prioritized, managed, and governed to realize the greatest benefit to citizens.
            </p>
          </div>
        </header>

        {/* Branch Manager Message */}
        <section className="px-4 sm:px-6 lg:px-8 py-24 bg-structural-light-gray">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-2/5">
              <div className="relative">
                <Image
                  src="/images/Daryl.webp"
                  alt="Daryl Croft, Branch Manager"
                  width={500}
                  height={625}
                  className="relative rounded-xl shadow-2xl w-full aspect-[4/5] object-cover object-top"
                  priority
                />
              </div>
            </div>
            <div className="w-full md:w-3/5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-12 h-12 text-process-blue mb-6">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <h2 className="text-3xl font-bold text-dark-blue mb-6">A Message from our Branch Manager</h2>
              <div className="text-text-secondary space-y-4 leading-relaxed mb-8">
                <p>
                  At the City of Edmonton, we continuously seek opportunities to understand, harness, and leverage technology&apos;s ever expanding capabilities to improve quality of life for all Edmontonians.
                </p>
                <p>
                  Our Open City and Technology branch is a key part in supporting the organization to deliver safe, secure and reliable data and efficient technology solutions for our business partners to optimize processes and deliver excellent services. The team is responsible for managing and maintaining the City&apos;s technology infrastructure, ensuring technology investments are prioritized, integrated and managed, and that technology is available and operates efficiently and effectively through process improvements and automation.
                </p>
                <p>
                  Over the last few years, technology has played a bigger role than ever in our lives. From working remotely to learning to use online services in new ways, many have experienced a shift in how we use technology to connect with the world around us.
                </p>
                <p>
                  The City of Edmonton is a place where agile and secure technology deployment is a core consideration in program and service delivery. We prioritize innovation and adaptability, with a proactive approach to cybersecurity.
                </p>
                <p>
                  Open City and Technology is an essential component for the City of Edmonton to deliver effective and efficient services. As technology continues to advance, the role of the branch will only become more critical in ensuring the City can meet and exceed the evolving needs of Edmontonians now and in the future.
                </p>
              </div>
              <div>
                <p className="font-bold text-dark-blue">Daryl Croft</p>
                <p className="text-process-blue font-bold text-[0.6875rem] uppercase tracking-widest">Branch Manager, OC&amp;T</p>
              </div>
            </div>
          </div>
        </section>

        {/* Branch Overview & Corporate Outcome */}
        <section className="px-4 sm:px-6 lg:px-8 py-24 md:py-32 bg-dark-blue text-white">
          <div className="grid md:grid-cols-2 gap-20 max-w-7xl mx-auto items-center">
            <div>
              <span className="text-process-blue font-bold text-[0.6875rem] uppercase tracking-widest mb-4 block">Branch Mandate</span>
              <h2 className="text-4xl font-bold leading-tight mb-8">Strategic Alignment</h2>
              <p className="text-white/60 text-lg leading-relaxed mb-10">
                The branch is unique in the provisioning of key services to the corporation while simultaneously supporting the delivery of technology that fosters economic and social activity outside of the organization. Ultimately, this branch brings together creative, innovative, and nimble solution delivery with the operational expertise needed to meet the changing needs of citizens.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-6 rounded-xl bg-white/5 border border-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-process-blue flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-white text-lg">Interconnected Systems</h4>
                    <p className="text-sm text-white/50">Bridging departmental silos through unified data architecture.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 rounded-xl bg-white/5 border border-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-process-blue flex-shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-white text-lg">Trust &amp; Security</h4>
                    <p className="text-sm text-white/50">Protecting civic data through industry-leading cybersecurity frameworks.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center bg-white/5 rounded-3xl p-12 md:p-16 border border-white/5 text-center md:text-left">
              <span className="text-white/50 font-bold text-xs uppercase tracking-widest mb-6 block">Corporate Outcome</span>
              <p className="text-3xl font-bold leading-tight italic mb-8">
                &ldquo;Technology and Data — The City of Edmonton&apos;s technology and data are leveraged to enable quality decision-making and enhance innovative service delivery.&rdquo;
              </p>
              <div className="h-1 w-24 bg-process-blue mx-auto md:mx-0" />
            </div>
          </div>
        </section>

        {/* Strategic Framework (Tabbed) */}
        <section className="px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-dark-blue mb-4">Strategic Framework</h2>
              <div className="h-1.5 w-16 bg-process-blue mx-auto" />
            </div>
            <AboutTabs />
          </div>
        </section>

        {/* Emerging Context */}
        <section className="px-4 sm:px-6 lg:px-8 py-24 md:py-32 bg-structural-light-gray border-t border-structural-gray-blue">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl font-bold text-dark-blue mb-4">Emerging Context</h2>
              <p className="text-text-secondary text-lg">Anticipating the landscape of tomorrow&apos;s digital city.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-16">
              {/* Opportunities */}
              <div className="bg-white p-12 rounded-3xl shadow-sm">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-green-100 text-edmonton-success rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-dark-blue">Emerging Opportunities</h3>
                </div>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-process-blue flex-shrink-0 mt-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <div>
                      <h4 className="font-bold text-dark-blue mb-1">Effective use of technology</h4>
                      <p className="text-text-secondary text-sm">That prioritizes economic, corporate, and business needs to ensure delivery of high value initiatives. OCT will strengthen strategic partnerships, increase alignment with business and corporate strategy, enhance citizen focus, and provide a system wide view to continuously improve the effectiveness of the City&apos;s technology investments.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-process-blue flex-shrink-0 mt-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <div>
                      <h4 className="font-bold text-dark-blue mb-1">Streamlining digital services</h4>
                      <p className="text-text-secondary text-sm">Can improve resident access to and experience of City services. In collaboration with the My Alberta Digital Identity (MADI) group, the City is exploring the creation of citizen digital identities to validate and authenticate citizens accessing City services.</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Risks */}
              <div className="bg-white p-12 rounded-3xl shadow-sm">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 bg-red-100 text-edmonton-error rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-dark-blue">Emerging Risks</h3>
                </div>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-edmonton-error flex-shrink-0 mt-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
                    </svg>
                    <div>
                      <h4 className="font-bold text-dark-blue mb-1">Growing technology debt and sprawl</h4>
                      <p className="text-text-secondary text-sm">In the absence of a single decision making body with authority to meaningfully coordinate and align technology investments across the corporation, both the risks and costs associated with technology debt and sprawl will continue to grow.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-edmonton-error flex-shrink-0 mt-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
                    </svg>
                    <div>
                      <h4 className="font-bold text-dark-blue mb-1">Increasing deficit of technical knowledge</h4>
                      <p className="text-text-secondary text-sm">The inability of Administration to tie job descriptions to evolving technology certification and skills is creating a widening gap, as expectations for better and more efficient digital services grow.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-edmonton-error flex-shrink-0 mt-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
                    </svg>
                    <div>
                      <h4 className="font-bold text-dark-blue mb-1">Cyber attacks against digital assets</h4>
                      <p className="text-text-secondary text-sm">As technology evolves so will the ways bad actors exploit those technologies. This is a global threat that underlines all technology related activities and is managed corporately by OCT.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
