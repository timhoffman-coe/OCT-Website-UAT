import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

export const metadata = {
  title: 'OCT Generative AI Resources | Open City & Technology',
  description: 'Generative AI resources and guidelines for the City of Edmonton.',
};

export default function AIResourcesPage() {
  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main id="main-content" className="container mx-auto max-w-7xl py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-primary-blue mb-4 pb-3 border-b-2 border-structural-gray-blue">
            OCT Generative AI Resources
          </h1>
        </div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* One City AI Resource Card - 1/3 width */}
          <div className="lg:col-span-1">
            <div className="bg-structural-gray-blue border-2 border-primary-blue rounded-lg p-6 h-full">
              <a
                href="https://onecity.edmonton.ca/technology/artificial-intelligence"
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:opacity-80 transition-opacity duration-200"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="flex-shrink-0 mb-4">
                    <svg aria-hidden="true" className="w-16 h-16 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-sans text-xl font-bold text-primary-blue mb-3">
                      City of Edmonton AI Resources
                    </h2>
                    <p className="font-serif text-sm text-text-secondary mb-4">
                      Visit the City&apos;s primary page on Artificial Intelligence on One City.
                    </p>
                    <div className="flex items-center justify-center text-primary-blue font-semibold text-sm">
                      <span>Visit One City</span>
                      <svg aria-hidden="true" className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>

            </div>
          </div>

          {/* Google Gemini Resources Card - 2/3 width */}
          <div className="lg:col-span-2">
            <div className="bg-white border-2 border-primary-blue rounded-lg p-8 h-full">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <Image
                    src="/images/logos/gemini-logo.webp"
                    alt="Gemini Logo"
                    width={64}
                    height={64}
                    sizes="64px"
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="font-sans text-2xl font-bold text-primary-blue mb-3">
                    Google Resources for Gemini
                  </h2>
                  <p className="font-serif text-base text-text-secondary mb-4">
                    Explore Google Workspace AI resources, including guides, tutorials, and best practices for using Gemini effectively in your work. Learn how to leverage AI-powered features across Google Workspace applications.
                  </p>
                  <div className="flex flex-col gap-3">
                    <a
                      href="https://workspace.google.com/resources/ai/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary-blue font-semibold hover:opacity-80 transition-opacity"
                    >
                      <span>Gemini Resources for Everyone</span>
                      <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    <a
                      href="https://support.google.com/docs/answer/13952129"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary-blue font-semibold hover:opacity-80 transition-opacity"
                    >
                      <span>Get started with Google Workspace with Gemini</span>
                      <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>

        {/* CoE Gemini Prompt Repository */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2">
            <a
              href="https://sites.google.com/edmonton.ca/geminipromptrepository/home"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white border-2 border-primary-blue rounded-lg p-8 h-full hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <Image
                    src="/images/logos/gemini-logo.webp"
                    alt="Gemini Logo"
                    width={64}
                    height={64}
                    sizes="64px"
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="font-sans text-2xl font-bold text-primary-blue mb-3">
                    CoE Gemini Prompt Repository
                  </h2>
                  <p className="font-serif text-base text-text-secondary mb-4">
                    Browse and contribute to the Centre of Excellence&apos;s curated collection of Gemini prompts. Find ready-to-use prompts for common tasks across City business areas.
                  </p>
                  <div className="flex items-center text-primary-blue font-semibold">
                    <span>Explore Prompts</span>
                    <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* CoE Generative AI Standard Card - 1/3 width */}
          <div className="lg:col-span-1">
            <a
              href="https://portal-onecity.edmonton.ca/sites/default/files/box-files/GenerativeAIStandard.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-structural-gray-blue border-2 border-primary-blue rounded-lg p-6 h-full hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex flex-col items-center text-center">
                <div className="flex-shrink-0 mb-4">
                  <svg aria-hidden="true" className="w-16 h-16 text-primary-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h2 className="font-sans text-xl font-bold text-primary-blue mb-3">
                  CoE Generative AI Standard
                </h2>
                <p className="font-serif text-sm text-text-secondary mb-4">
                  Review the City of Edmonton&apos;s official standard for Generative AI use.
                </p>
                <div className="flex items-center text-primary-blue font-semibold text-sm">
                  <span>View Standard (PDF)</span>
                  <svg aria-hidden="true" className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* City Approved Google AI Tools */}
        <div className="mb-8">
          <h2 className="font-sans text-2xl font-bold text-primary-blue mb-6">
            City Approved Google AI Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Gemini Card */}
            <a
              href="https://gemini.google.com/app"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border-2 border-primary-blue rounded-lg p-6 hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-3">
                  <Image
                    src="/images/logos/gemini-logo.webp"
                    alt="Gemini Logo"
                    width={48}
                    height={48}
                    sizes="48px"
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h3 className="font-sans text-lg font-bold text-primary-blue mb-2">
                  Gemini
                </h3>
                <div className="flex items-center text-primary-blue text-sm font-semibold">
                  <span>Launch Tool</span>
                  <svg aria-hidden="true" className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </a>

            {/* NotebookLM Card */}
            <a
              href="https://notebooklm.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border-2 border-primary-blue rounded-lg p-6 hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-3">
                  <Image
                    src="/images/logos/notebooklm-icon.webp"
                    alt="NotebookLM Logo"
                    width={48}
                    height={48}
                    sizes="48px"
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h3 className="font-sans text-lg font-bold text-primary-blue mb-2">
                  NotebookLM
                </h3>
                <div className="flex items-center text-primary-blue text-sm font-semibold">
                  <span>Launch Tool</span>
                  <svg aria-hidden="true" className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </a>

            {/* Vids Card */}
            <a
              href="https://vids.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border-2 border-primary-blue rounded-lg p-6 hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-3">
                  <Image
                    src="/images/logos/Google_Vid_Logo.webp"
                    alt="Google Vids Logo"
                    width={48}
                    height={48}
                    sizes="48px"
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h3 className="font-sans text-lg font-bold text-primary-blue mb-2">
                  Vids
                </h3>
                <div className="flex items-center text-primary-blue text-sm font-semibold">
                  <span>Launch Tool</span>
                  <svg aria-hidden="true" className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </a>

            {/* Google AI Studio Card */}
            <a
              href="https://aistudio.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border-2 border-primary-blue rounded-lg p-6 hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-3">
                  <Image
                    src="/images/logos/Google_AI_Studio_icon.webp"
                    alt="Google AI Studio Logo"
                    width={48}
                    height={48}
                    sizes="48px"
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h3 className="font-sans text-lg font-bold text-primary-blue mb-2">
                  Google AI Studio
                </h3>
                <div className="flex items-center text-primary-blue text-sm font-semibold">
                  <span>Launch Tool</span>
                  <svg aria-hidden="true" className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
