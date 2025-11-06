'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <header className="bg-primary-blue shadow-lg z-20 relative">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo and Branch ID */}
          <div className="flex items-center space-x-6">
            {/* Edmonton Logo */}
            <a href="/" title="City of Edmonton Home">
              <Image
                src="/images/EDM_logo_Blue.png"
                alt="City of Edmonton Logo"
                width={56}
                height={56}
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
              <div className="font-sans text-base font-medium text-white hover:text-gray-300 flex items-center space-x-1 cursor-pointer py-2">
                <span>About Us</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="hidden group-hover:block absolute z-10 top-full w-64 bg-white rounded-md shadow-lg py-1">
                <a href="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Branch Overview</a>
                <a href="/leadership" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Our Leadership</a>
                <div className="border-t border-gray-200 my-1"></div>
                <div className="relative group/sections">
                  <div className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between cursor-pointer">
                    <span>Sections</span>
                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="hidden group-hover/sections:block absolute left-full top-0 ml-0 w-64 bg-white rounded-md shadow-lg py-1 border border-gray-200">
                    <a href="/technology-planning" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">Technology Planning</a>
                    <a href="/business-solutions" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">Business Solutions</a>
                    <a href="/integrated-technology-solutions" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">Integrated Technology Solutions</a>
                    <a href="/project-management-office" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">Project Management Office</a>
                    <a href="/corporate-information-security" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">Corporate Information Security</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Dropdown */}
            <div className="relative group">
              <a href="/services" className="font-sans text-base font-medium text-white hover:text-gray-300 flex items-center space-x-1 py-2">
                <span>Services</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              <div className="hidden group-hover:block absolute z-10 top-full w-72 bg-white rounded-md shadow-lg py-1">
                <a href="/services" className="block px-4 py-2 text-sm font-semibold text-primary-blue hover:bg-gray-100 border-b border-gray-200">View All Services</a>
                <a href="/technology-planning" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Technology Investment & Governance</a>
                <a href="/technology-planning" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Business Engagement & Intake</a>
                <a href="/technology-planning" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Vendor & Contract Management</a>
                <a href="/technology-planning" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">IT Asset Management</a>
                <a href="/business-solutions" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Application Development & Support</a>
                <a href="/integrated-technology-solutions" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Technology Infrastructure Operations</a>
                <a href="/integrated-technology-solutions" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Network & Data Center Operations</a>
                <a href="/integrated-technology-solutions" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Voice, Mobility, & IoT</a>
                <a href="/integrated-technology-solutions" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Desktop & End-User Support</a>
                <a href="/integrated-technology-solutions" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Service Management & Monitoring</a>
                <a href="/project-management-office" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Project Management Services</a>
                <a href="/corporate-information-security" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Cybersecurity & Risk Management</a>
                <a href="/corporate-information-security" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Identity & Access Management</a>
                <a href="/business-solutions" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Artificial Intelligence</a>
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
                <a href="/policies" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Policies, Directives, & Procedures</a>
                <a href="/branch-templates" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Branch Templates</a>
                <a href="/technology-strategies" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Technology Strategies</a>
                <a href="/budget" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Budget & Spend</a>
                <a href="/org-chart" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">OCT Org Chart</a>
                <a href="/dashboards" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboards</a>
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
                <a href="/integrated-technology-solutions" className="block px-5 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">Integrated Technology Solutions</a>
                <a href="/project-management-office" className="block px-5 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">Project Management Office</a>
                <a href="/corporate-information-security" className="block px-5 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">Corporate Information Security</a>
              </div>
            </div>
          </div>

          {/* Mobile Services */}
          <div>
            <button
              onClick={() => toggleDropdown('mobile-services')}
              className="font-sans w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 flex justify-between items-center"
            >
              <span>Services</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div className={`${openDropdown === 'mobile-services' ? '' : 'hidden'} mt-1 pl-4`}>
              <a href="/services" className="block px-3 py-2 rounded-md text-sm font-semibold text-primary-blue hover:bg-gray-50 border-b border-gray-200 mb-1">View All Services</a>
              <a href="/technology-planning" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Technology Investment & Governance</a>
              <a href="/technology-planning" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Business Engagement & Intake</a>
              <a href="/technology-planning" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Vendor & Contract Management</a>
              <a href="/technology-planning" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">IT Asset Management</a>
              <a href="/business-solutions" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Application Development & Support</a>
              <a href="/integrated-technology-solutions" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Technology Infrastructure Operations</a>
              <a href="/integrated-technology-solutions" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Network & Data Center Operations</a>
              <a href="/integrated-technology-solutions" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Voice, Mobility, & IoT</a>
              <a href="/integrated-technology-solutions" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Desktop & End-User Support</a>
              <a href="/integrated-technology-solutions" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Service Management & Monitoring</a>
              <a href="/project-management-office" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Project Management Services</a>
              <a href="/corporate-information-security" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Cybersecurity & Risk Management</a>
              <a href="/corporate-information-security" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Identity & Access Management</a>
              <a href="/business-solutions" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Artificial Intelligence</a>
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
              <a href="/policies" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Policies, Directives, & Procedures</a>
              <a href="/branch-templates" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Branch Templates</a>
              <a href="/technology-strategies" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Technology Strategies</a>
              <a href="/budget" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Budget & Spend</a>
              <a href="/org-chart" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">OCT Org Chart</a>
              <a href="/dashboards" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Dashboards</a>
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
  );
}
