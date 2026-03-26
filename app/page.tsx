import Header from '@/components/Header';
import Link from 'next/link';
import Hero from '@/components/Hero';
import Sections from '@/components/Sections';

import GuidingPrinciples from '@/components/GuidingPrinciples';


import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { getAllPosts } from '@/lib/news';

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);
  return (
    <div className="bg-white">
      <Header />
      <Hero />

      <AnimatedSection>
        <Sections />
      </AnimatedSection>

      {/* Branch News & Updates */}
      <AnimatedSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-structural-gray-blue">
          {/* Main Column */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-black text-dark-blue tracking-tight">Branch News &amp; Updates</h2>
              <span className="h-[2px] flex-1 bg-structural-gray-blue mx-8 hidden sm:block" />
            </div>
            <div className="space-y-12">
              {latestPosts.map((post) => {
                const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                });
                return (
                  <Link key={post.slug} href={`/news/${post.slug}`}>
                    <article className="flex flex-col md:flex-row gap-8 group">
                      <div className="md:w-64 h-44 rounded-xl overflow-hidden shrink-0">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                      <div>
                        <div className="flex gap-3 mb-3">
                          <span className="text-[10px] font-black uppercase tracking-widest text-process-blue">{post.category}</span>
                          <span className="text-[10px] font-medium text-text-secondary">{formattedDate}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-dark-blue mb-3 group-hover:text-process-blue transition-colors">{post.title}</h3>
                        <p className="text-text-secondary leading-relaxed mb-4">{post.description}</p>
                      </div>
                    </article>
                  </Link>
                );
              })}
              <Link href="/news" className="inline-flex items-center gap-2 text-process-blue font-bold text-sm hover:text-primary-blue transition-colors">
                View all news
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="bg-structural-light-gray rounded-2xl p-8 sticky top-28">
              <h3 className="text-lg font-black text-dark-blue tracking-tight mb-6 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-process-blue">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                </svg>
                Quick Access
              </h3>
              <div className="space-y-2">
                <Link href="/contact" className="flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-md transition-all group">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-text-secondary group-hover:text-process-blue transition-colors">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                    </svg>
                    <span className="font-bold text-sm text-dark-blue">IT Help Desk</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-text-secondary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </Link>
                <Link href="/links" className="flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-md transition-all group">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-text-secondary group-hover:text-process-blue transition-colors">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                    </svg>
                    <span className="font-bold text-sm text-dark-blue">Internal Directory</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-text-secondary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </Link>
                <Link href="/leadership" className="flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-md transition-all group">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-text-secondary group-hover:text-process-blue transition-colors">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                    </svg>
                    <span className="font-bold text-sm text-dark-blue">Leadership Team</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-text-secondary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </Link>
                <Link href="/service-health" className="flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-md transition-all group">
                  <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-text-secondary group-hover:text-process-blue transition-colors">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                    </svg>
                    <span className="font-bold text-sm text-dark-blue">Service Health</span>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-text-secondary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </Link>
              </div>

              {/* Branch Policy Card */}
              <div className="mt-8 bg-dark-blue p-6 rounded-xl">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                </div>
                <h4 className="text-white font-bold mb-2">Technology Strategies</h4>
                <p className="text-xs text-white/50 leading-relaxed mb-6">Access the latest branch strategies, roadmaps, and planning documents.</p>
                <Link href="/technology-strategies" className="block w-full py-2 bg-process-blue text-white rounded font-bold text-[10px] uppercase tracking-widest text-center hover:bg-primary-blue transition-colors">
                  View Strategies
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </AnimatedSection>


      {/* Signature Section */}
      <section className="w-full bg-structural-light-gray py-24 px-6 border-t border-structural-gray-blue">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-dark-blue tracking-tighter mb-6">Building a Digital First City.</h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">We are more than just a technology branch; we are the engine of civic innovation, enabling Edmonton to serve its citizens with speed, transparency, and excellence.</p>
        </div>
      </section>

      <AnimatedSection>
        <GuidingPrinciples />
      </AnimatedSection>

      <Footer />
    </div>
  );
}
