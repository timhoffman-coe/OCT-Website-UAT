'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Breadcrumb from './Breadcrumb';
import GeminiSearch from './GeminiSearch';
import { CometButton } from './CometButton';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const isScrolledRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        // Add hysteresis to prevent flickering
        // Collapse when scrolling down past 50px
        // Expand when scrolling up past 10px
        if (currentScrollY > 50 && !isScrolledRef.current) {
          setIsScrolled(true);
          isScrolledRef.current = true;
        } else if (currentScrollY < 10 && isScrolledRef.current) {
          setIsScrolled(false);
          isScrolledRef.current = false;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Check initial state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };



  return (
    <>
      <header className={`bg-primary-blue shadow-lg z-50 fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out ${isScrolled ? 'py-0' : ''}`}>
        <div className="w-full max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? 'py-2' : 'py-6'}`}>
            {/* Logo and Branch ID - hidden when scrolled on desktop */}
            <div className={`flex items-center space-x-6 transition-all duration-300 ${isScrolled ? 'md:hidden' : ''}`}>
              {/* Edmonton Logo */}
              <a href="/" title="City of Edmonton Home">
                <Image
                  src="/images/EDM_logo_Blue.webp"
                  alt="City of Edmonton Logo"
                  width={56}
                  height={56}
                  sizes="56px"
                  className="h-14 w-14"
                  priority
                />
              </a>

              {/* Branch & Dept Name */}
              <div>
                <h1 className="font-sans text-xl font-bold text-white">Open City & Technology</h1>
                <h2 className="font-sans text-sm font-light text-gray-200" style={{ letterSpacing: '0.5px' }}>FINANCIAL AND CORPORATE SERVICES</h2>
              </div>
            </div>

            {/* Compact brand shown when scrolled on desktop */}
            {isScrolled && (
              <div className="hidden md:flex items-center space-x-4">
                <a href="/" className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors">
                  <Image
                    src="/images/EDM_logo_Blue.webp"
                    alt="City of Edmonton Logo"
                    width={32}
                    height={32}
                    sizes="32px"
                    className="h-8 w-8"
                  />
                  <span className="font-sans text-sm font-semibold">OCT</span>
                </a>

                {/* Assistant Bubble */}
                <CometButton
                  onClick={() => setChatOpen(true)}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border-0" // remove border, component handles it.
                  title="Ask OCT Assistant"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-300">
                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-gray-100">Ask OCT...</span>
                </CometButton>
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-200 hover:text-white"
                aria-label="Open menu"
                aria-expanded={mobileMenuOpen}
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/" className="font-sans text-base font-medium text-white hover:text-gray-300">Home</a>

              {/* About Us Dropdown */}
              <div className="relative group">
                <a href="/about" className="font-sans text-base font-medium text-white hover:text-gray-300 flex items-center space-x-1 py-2">
                  <span>About Us</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
                <div className="hidden group-hover:block absolute z-10 top-full w-64 bg-white rounded-md shadow-lg py-1">
                  <a href="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Branch Overview</a>
                  <a href="/leadership" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Our Leadership</a>
                  <a href="/roadmap" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Technology Roadmap</a>
                  <a href="/about/oct-architecture" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">OCT Architecture</a>
                  <div className="border-t border-gray-200 my-1"></div>
                  <div className="relative group/sections">
                    <a href="/services" className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between">
                      <span>Sections</span>
                      <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <div className="hidden group-hover/sections:block absolute left-full top-0 ml-0 w-72 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                      <a href="/technology-planning" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">Technology Planning</a>
                      <a href="/business-solutions" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">Business Solutions</a>
                      <div className="relative group/its">
                        <a href="/integrated-technology-solutions" className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 flex items-center justify-between">
                          <span>Integrated Technology Solutions</span>
                          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </a>
                        <div className="hidden group-hover/its:block absolute left-full top-0 ml-0 w-72 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                          <a href="/integrated-technology-solutions" className="block px-4 py-2 text-sm font-semibold text-primary-blue hover:bg-gray-100 border-b border-gray-200">View All ITS Teams</a>
                          <a href="/technology-infrastructure-operations" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">Technology Infrastructure Operations</a>
                          <a href="/data-technology" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">Data Technology</a>
                          <a href="/partner-experience" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">Partner Experience</a>
                          <a href="/service-delivery" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">Service Delivery and Analytics</a>
                        </div>
                      </div>
                      <a href="/project-management-office" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">Project Management Office</a>
                      <a href="/corporate-information-security" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">Corporate Information Security</a>
                    </div>
                  </div>
                  <a href="/services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View All Teams</a>
                </div>
              </div>

              {/* Dashboards Dropdown */}
              <div className="relative group">
                <a href="/dashboards" className="font-sans text-base font-medium text-white hover:text-gray-300 flex items-center space-x-1 py-2">
                  <span>Dashboards</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
                <div className="hidden group-hover:block absolute z-10 top-full w-72 bg-white rounded-md shadow-lg py-1">
                  <a href="/dashboards" className="block px-4 py-2 text-sm font-semibold text-primary-blue hover:bg-gray-100 border-b border-gray-200">View All Dashboards</a>
                  <a href="/service-health" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Service & Infrastructure Health</a>
                  <a href="/budget" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Budget & Financial</a>
                  <a href="/people-management" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">People Management</a>
                  <a href="/asset-management" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Asset Management</a>
                  <a href="/incident-management" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Incident & Service Management</a>
                  <a href="/vendor-command-center" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Vendor Command Center</a>
                  <a href="/cio-dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Leadership</a>
                </div>
              </div>

              {/* Resources Dropdown */}
              <div className="relative group">
                <div className="font-sans text-base font-medium text-white hover:text-gray-300 flex items-center space-x-1 cursor-pointer py-2">
                  <span>Resources</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="hidden group-hover:block absolute z-10 right-0 top-full w-56 bg-white rounded-md shadow-lg py-1">
                  <a href="/resources/app-library" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">App Library</a>
                  <a href="/resources/nic" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Network Information Center</a>

                  <a href="/branch-templates" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Branch Templates</a>
                  <a href="/technology-strategies" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Technology Strategies</a>
                  <a href="/budget" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Budget & Spend</a>
                  <a href="/org-chart" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">OCT Org Chart</a>
                  <a href="/ai-resources" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">AI Resources</a>
                  <a href="https://data.edmonton.ca" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Open Data Portal</a>
                  <a href="/links" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Links</a>
                </div>
              </div>

              {/* Contact Link */}
              <a href="/contact" className="font-sans text-base font-medium text-white hover:text-gray-300">Contact</a>

              {/* Service Health Button */}
              <a
                href="/service-health"
                className="font-sans text-base font-semibold bg-white text-primary-blue px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                Service Health
              </a>
            </nav>
          </div>

          {/* Breadcrumb and Search Bar Section - hidden when scrolled on desktop */}
          <div className={`border-t border-white/20 py-2 transition-all duration-300 overflow-hidden ${isScrolled ? 'md:max-h-0 md:py-0 md:border-t-0' : 'max-h-20'}`}>
            <div className="flex items-center justify-between">
              {/* Breadcrumb - Left (hidden on mobile) */}
              <Breadcrumb />

              {/* Search - Right (full width on mobile) */}
              <GeminiSearch isOpen={chatOpen} onOpenChange={setChatOpen} />
            </div>
          </div>
        </div>

        {/* Mobile Menu (Dropdown) */}
        <div className={`md:hidden ${mobileMenuOpen ? '' : 'hidden'} absolute top-full left-0 right-0 bg-white shadow-lg`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="/" className="font-sans block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Home</a>

            {/* Mobile About Us */}
            <div>
              <button
                onClick={() => toggleDropdown('mobile-about')}
                className="font-sans w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 flex justify-between items-center"
              >
                <span>About Us</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className={`${openDropdown === 'mobile-about' ? '' : 'hidden'} mt-1 pl-4`}>
                <a href="/about" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Branch Overview</a>
                <a href="/leadership" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Our Leadership</a>
                <a href="/roadmap" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Technology Roadmap</a>
                <a href="/about/oct-architecture" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">OCT Architecture</a>
                <div className="border-t border-gray-200 my-2"></div>
                <button
                  onClick={() => toggleDropdown('mobile-sections')}
                  className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center justify-between"
                >
                  <span>Sections</span>
                  <svg className={`h-4 w-4 transition-transform ${openDropdown === 'mobile-sections' ? 'rotate-90' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className={`${openDropdown === 'mobile-sections' ? '' : 'hidden'} bg-gray-50 rounded-md mt-1`}>
                  <a href="/technology-planning" className="block px-5 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">Technology Planning</a>
                  <a href="/business-solutions" className="block px-5 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">Business Solutions</a>
                  <button
                    onClick={() => toggleDropdown('mobile-its')}
                    className="w-full text-left px-5 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 flex items-center justify-between"
                  >
                    <span>Integrated Technology Solutions</span>
                    <svg className={`h-4 w-4 transition-transform ${openDropdown === 'mobile-its' ? 'rotate-90' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className={`${openDropdown === 'mobile-its' ? '' : 'hidden'} bg-gray-100 rounded-md ml-4 mt-1`}>
                    <a href="/integrated-technology-solutions" className="block px-5 py-2 rounded-md text-sm font-semibold text-primary-blue hover:bg-gray-200">View All ITS Teams</a>
                    <a href="/technology-infrastructure-operations" className="block px-5 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-200">Technology Infrastructure Operations</a>
                    <a href="/data-technology" className="block px-5 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-200">Data Technology</a>
                    <a href="/partner-experience" className="block px-5 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-200">Partner Experience</a>
                    <a href="/service-delivery" className="block px-5 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-200">Service Delivery and Analytics</a>
                  </div>
                  <a href="/project-management-office" className="block px-5 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">Project Management Office</a>
                  <a href="/corporate-information-security" className="block px-5 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">Corporate Information Security</a>
                </div>
                <a href="/services" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">View All Teams</a>
              </div>
            </div>

            {/* Mobile Dashboards */}
            <div>
              <button
                onClick={() => toggleDropdown('mobile-dashboards')}
                className="font-sans w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 flex justify-between items-center"
              >
                <span>Dashboards</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className={`${openDropdown === 'mobile-dashboards' ? '' : 'hidden'} mt-1 pl-4`}>
                <a href="/dashboards" className="block px-3 py-2 rounded-md text-sm font-semibold text-primary-blue hover:bg-gray-50 border-b border-gray-200 mb-1">View All Dashboards</a>
                <a href="#" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Service & Infrastructure Health</a>
                <a href="/budget" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Budget & Financial</a>
                <a href="#" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">People Management</a>
                <a href="#" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Asset Management</a>
                <a href="#" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Incident & Service Management</a>
                <a href="/vendor-command-center" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Vendor Command Center</a>
                <a href="#" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Leadership</a>
              </div>
            </div>

            {/* Mobile Resources */}
            <div>
              <button
                onClick={() => toggleDropdown('mobile-resources')}
                className="font-sans w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 flex justify-between items-center"
              >
                <span>Resources</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className={`${openDropdown === 'mobile-resources' ? '' : 'hidden'} mt-1 pl-4`}>
                <a href="/resources/app-library" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">App Library</a>

                <a href="/branch-templates" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Branch Templates</a>
                <a href="/technology-strategies" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Technology Strategies</a>
                <a href="/budget" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Budget & Spend</a>
                <a href="/org-chart" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">OCT Org Chart</a>
                <a href="/ai-resources" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">AI Resources</a>
                <a href="https://data.edmonton.ca" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Open Data Portal</a>
                <a href="/links" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Links</a>
              </div>
            </div>

            {/* Mobile Contact */}
            <a href="/contact" className="font-sans block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Contact</a>

            {/* Mobile Service Health Button */}
            <a
              href="/service-health"
              className="font-sans block mx-3 my-2 text-center bg-primary-blue text-white px-4 py-2 rounded-md hover:bg-complement-empire-blue transition-colors font-semibold"
            >
              Service Health
            </a>
          </div>
        </div>
      </header>
      {/* Spacer to prevent content from being hidden behind fixed header */}
      <div className={`transition-all duration-300 ${isScrolled ? 'h-16' : 'h-32 md:h-36'}`} />
    </>
  );
}
