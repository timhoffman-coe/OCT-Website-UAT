'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from './Breadcrumb';
import GeminiSearch from './GeminiSearch';
import { CometButton } from './CometButton';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [canViewOctWebDev, setCanViewOctWebDev] = useState(false);
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<string | null>(null);
  const [aboutLevel, setAboutLevel] = useState(0);
  const [resourcesLevel, setResourcesLevel] = useState(0);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const isScrolledRef = useRef(false);

  useEffect(() => {
    fetch('/api/cms/oct-web-dev/check-access')
      .then(res => res.ok ? res.json() : { canView: false })
      .then(data => setCanViewOctWebDev(data.canView))
      .catch(() => setCanViewOctWebDev(false));
  }, []);

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

  const openDesktopMenu = (menu: string) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    if (activeDesktopMenu !== menu) {
      setAboutLevel(0);
      setResourcesLevel(0);
    }
    setActiveDesktopMenu(menu);
  };

  const closeDesktopMenu = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDesktopMenu(null);
      setAboutLevel(0);
      setResourcesLevel(0);
    }, 100);
  };

  return (
    <>
      <header className={`bg-primary-blue shadow-lg z-50 fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out ${isScrolled ? 'py-0' : ''}`}>
        <div className="w-full max-w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? 'py-2' : 'py-6'}`}>
            {/* Logo and Branch ID - hidden when scrolled on desktop */}
            <div className={`flex items-center gap-4 xl:gap-6 flex-shrink-0 transition-all duration-300 ${isScrolled ? 'lg:hidden' : ''}`}>
              {/* Edmonton Logo */}
              <Link href="/" title="City of Edmonton Home">
                <Image
                  src="/images/EDM_logo_Blue.webp"
                  alt="City of Edmonton Logo"
                  width={56}
                  height={56}
                  sizes="56px"
                  className="h-14 w-14"
                  priority
                />
              </Link>

              {/* Branch & Dept Name */}
              <div>
                <span className="font-sans text-lg xl:text-xl font-bold text-white whitespace-nowrap block">Open City & Technology</span>
                <span className="font-sans text-xs xl:text-sm font-light text-gray-200 whitespace-nowrap block" style={{ letterSpacing: '0.5px' }}>FINANCIAL AND CORPORATE SERVICES</span>
              </div>
            </div>

            {/* Compact brand shown when scrolled on desktop */}
            {isScrolled && (
              <div className="hidden lg:flex items-center space-x-4">
                <Link href="/" className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors">
                  <Image
                    src="/images/EDM_logo_Blue.webp"
                    alt="City of Edmonton Logo"
                    width={32}
                    height={32}
                    sizes="32px"
                    className="h-8 w-8"
                  />
                  <span className="font-sans text-sm font-semibold">OCT</span>
                </Link>

                {/* Assistant Bubble */}
                <CometButton
                  onClick={() => setChatOpen(true)}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border-0" // remove border, component handles it.
                  title="Ask OCT Assistant"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-300" aria-hidden="true">
                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-gray-100">Ask OCT...</span>
                </CometButton>
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-200 hover:text-white"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-3 xl:gap-6" aria-label="Main navigation">
              <Link href="/" className="font-sans text-sm xl:text-base font-medium text-white hover:text-gray-300">Home</Link>

              {/* About Us Dropdown */}
              <div className="relative" onMouseEnter={() => openDesktopMenu('about')} onMouseLeave={closeDesktopMenu} onFocusCapture={() => openDesktopMenu('about')} onBlurCapture={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) closeDesktopMenu(); }}>
                <Link href="/about" className="font-sans text-sm xl:text-base font-medium text-white hover:text-gray-300 flex items-center space-x-1 py-2" aria-haspopup="true" aria-expanded={activeDesktopMenu === 'about'} onKeyDown={(e) => { if (e.key === 'ArrowDown') { e.preventDefault(); openDesktopMenu('about'); } if (e.key === 'Escape') { setActiveDesktopMenu(null); } }}>
                  <span>About Us</span>
                  <svg className="h-4 w-4 xl:h-5 xl:w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                {activeDesktopMenu === 'about' && (
                  <div className="absolute z-10 top-full w-72 bg-white rounded-md shadow-lg overflow-hidden" role="menu" aria-label="About Us">
                    <div className="relative overflow-hidden">
                      {/* Level 0: Main */}
                      <div
                        className={`transition-transform duration-200 ease-in-out py-1 ${aboutLevel !== 0 ? 'absolute inset-x-0 top-0 pointer-events-none' : ''}`}
                        style={{ transform: aboutLevel === 0 ? 'none' : 'translateX(-100%)' }}
                      >
                        <Link href="/about" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Branch Overview</Link>
                        <Link href="/leadership" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Our Leadership</Link>
                        <Link href="/roadmap" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Technology Roadmap</Link>
                        <Link href="/about/how-oct-works" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">How OCT Works</Link>
                        <div className="border-t border-gray-200 my-1" role="separator"></div>
                        <button
                          onClick={() => setAboutLevel(1)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between"
                          role="menuitem"
                          aria-haspopup="true"
                        >
                          <span>Sections</span>
                          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <Link href="/services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">View All Teams</Link>
                      </div>
                      {/* Level 1: Sections */}
                      <div
                        className={`transition-transform duration-200 ease-in-out py-1 ${aboutLevel !== 1 ? 'absolute inset-x-0 top-0 pointer-events-none' : ''}`}
                        style={{ transform: aboutLevel < 1 ? 'translateX(100%)' : aboutLevel === 1 ? 'none' : 'translateX(-100%)' }}
                      >
                        <button
                          onClick={() => setAboutLevel(0)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 flex items-center gap-1 border-b border-gray-200"
                          role="menuitem"
                          aria-label="Back to About Us menu"
                        >
                          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>Back</span>
                        </button>
                        <Link href="/services" className="block px-4 py-2 text-sm font-semibold text-primary-blue hover:bg-gray-100" role="menuitem">View All Sections</Link>
                        <Link href="/technology-planning" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100" role="menuitem">Technology Planning</Link>
                        <Link href="/application-technology-services" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100" role="menuitem">Application Technology Services</Link>
                        <button
                          onClick={() => setAboutLevel(2)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 flex items-center justify-between"
                          role="menuitem"
                          aria-haspopup="true"
                        >
                          <span>Integrated Technology Solutions</span>
                          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <Link href="/project-management-office" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100" role="menuitem">Project Management Office</Link>
                        <Link href="/corporate-information-security" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100" role="menuitem">Corporate Information Security</Link>
                      </div>
                      {/* Level 2: ITS Teams */}
                      <div
                        className={`transition-transform duration-200 ease-in-out py-1 ${aboutLevel !== 2 ? 'absolute inset-x-0 top-0 pointer-events-none' : ''}`}
                        style={{ transform: aboutLevel < 2 ? 'translateX(100%)' : 'none' }}
                      >
                        <button
                          onClick={() => setAboutLevel(1)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 flex items-center gap-1 border-b border-gray-200"
                          role="menuitem"
                          aria-label="Back to Sections menu"
                        >
                          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>Sections</span>
                        </button>
                        <Link href="/integrated-technology-solutions" className="block px-4 py-2 text-sm font-semibold text-primary-blue hover:bg-gray-100 border-b border-gray-200" role="menuitem">View All ITS Teams</Link>
                        <Link href="/technology-infrastructure-operations" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100" role="menuitem">Technology Infrastructure Operations</Link>
                        <Link href="/data-technology" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100" role="menuitem">Data Technology</Link>
                        <Link href="/partner-experience" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100" role="menuitem">Partner Experience</Link>
                        <Link href="/service-delivery" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100" role="menuitem">Service Delivery and Analytics</Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Resources Dropdown */}
              <div className="relative" onMouseEnter={() => openDesktopMenu('resources')} onMouseLeave={closeDesktopMenu} onFocusCapture={() => openDesktopMenu('resources')} onBlurCapture={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) closeDesktopMenu(); }}>
                <button type="button" className="font-sans text-sm xl:text-base font-medium text-white hover:text-gray-300 flex items-center space-x-1 py-2 bg-transparent border-none cursor-pointer" aria-haspopup="true" aria-expanded={activeDesktopMenu === 'resources'} onKeyDown={(e) => { if (e.key === 'ArrowDown') { e.preventDefault(); openDesktopMenu('resources'); } if (e.key === 'Escape') { setActiveDesktopMenu(null); } }}>
                  <span>Resources</span>
                  <svg className="h-4 w-4 xl:h-5 xl:w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                {activeDesktopMenu === 'resources' && (
                  <div className="absolute z-10 right-0 top-full w-72 bg-white rounded-md shadow-lg overflow-hidden" role="menu" aria-label="Resources">
                    <div className="relative overflow-hidden">
                      {/* Level 0: Main */}
                      <div
                        className={`transition-transform duration-200 ease-in-out py-1 ${resourcesLevel !== 0 ? 'absolute inset-x-0 top-0 pointer-events-none' : ''}`}
                        style={{ transform: resourcesLevel === 0 ? 'none' : 'translateX(-100%)' }}
                      >
                        <button
                          onClick={() => setResourcesLevel(1)}
                          className="w-full text-left px-4 py-2 text-sm font-bold text-primary-blue hover:bg-gray-100 flex items-center justify-between"
                          role="menuitem"
                          aria-haspopup="true"
                        >
                          <span>Dashboards</span>
                          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <div className="border-t border-gray-200 my-1" role="separator"></div>
                        <Link href="/resources/app-library" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">App Library</Link>
                        <Link href="/technology-strategies" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Technology Strategies</Link>
                        <Link href="/policies" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Policies & Procedures</Link>
                        <Link href="/org-chart" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">OCT Org Chart</Link>
                        <Link href="/ai-resources" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">AI Resources</Link>
                        <Link href="/links" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Links</Link>
                        {canViewOctWebDev && (
                          <>
                            <div className="border-b border-gray-200 my-1" />
                            <Link href="/resources/oct-web-dev" className="block px-4 py-2 text-sm font-semibold text-[#005087] hover:bg-[#005087]/10">OCT Web Development</Link>
                          </>
                        )}
                      </div>
                      {/* Level 1: Dashboards */}
                      <div
                        className={`transition-transform duration-200 ease-in-out py-1 ${resourcesLevel !== 1 ? 'absolute inset-x-0 top-0 pointer-events-none' : ''}`}
                        style={{ transform: resourcesLevel === 1 ? 'none' : 'translateX(100%)' }}
                      >
                        <button
                          onClick={() => setResourcesLevel(0)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 flex items-center gap-1 border-b border-gray-200"
                          role="menuitem"
                          aria-label="Back to Resources menu"
                        >
                          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>Back</span>
                        </button>
                        <Link href="/dashboards" className="block px-4 py-2 text-sm font-semibold text-primary-blue hover:bg-gray-100 border-b border-gray-200" role="menuitem">View All Dashboards</Link>
                        <Link href="/service-health" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Service & Infrastructure Health</Link>
                        <Link href="/budget" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Budget & Financial</Link>
                        <Link href="/people-management" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">People Management</Link>
                        <Link href="/asset-management" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Asset Management</Link>
                        <Link href="/incident-management" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Incident & Service Management</Link>
                        <Link href="/vendor-command-center" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Vendor Command Center</Link>
                        <Link href="/cio-dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Leadership</Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* News Link */}
              <Link href="/news" className="font-sans text-sm xl:text-base font-medium text-white hover:text-gray-300">News</Link>

              {/* Contact Link */}
              <Link href="/contact" className="font-sans text-sm xl:text-base font-medium text-white hover:text-gray-300">Contact</Link>

              {/* Service Health Button */}
              <Link
                href="/service-health"
                className="font-sans text-sm xl:text-base font-semibold bg-white text-primary-blue px-3 xl:px-4 py-1.5 xl:py-2 rounded-md hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                Service Health
              </Link>

            </nav>
          </div>

          {/* Breadcrumb and Search Bar Section - hidden when scrolled on desktop */}
          <div className={`border-t border-white/20 py-2 transition-all duration-300 overflow-hidden ${isScrolled ? 'lg:max-h-0 lg:py-0 lg:border-t-0' : 'max-h-20'}`}>
            <div className="flex items-center justify-between">
              {/* Breadcrumb - Left (hidden on mobile) */}
              <Breadcrumb />

              {/* Search - Right (full width on mobile) */}
              <GeminiSearch isOpen={chatOpen} onOpenChange={setChatOpen} />
            </div>
          </div>
        </div>

        {/* Mobile Menu (Dropdown) */}
        <div className={`lg:hidden ${mobileMenuOpen ? '' : 'hidden'} absolute top-full left-0 right-0 bg-white shadow-lg`} role="navigation" aria-label="Mobile navigation">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="font-sans block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Home</Link>

            {/* Mobile About Us */}
            <div>
              <button
                onClick={() => toggleDropdown('mobile-about')}
                className="font-sans w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 flex justify-between items-center"
                aria-expanded={openDropdown === 'mobile-about'}
              >
                <span>About Us</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className={`${openDropdown === 'mobile-about' ? '' : 'hidden'} mt-1 pl-4`}>
                <Link href="/about" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Branch Overview</Link>
                <Link href="/leadership" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Our Leadership</Link>
                <Link href="/roadmap" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Technology Roadmap</Link>
                <Link href="/about/how-oct-works" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">How OCT Works</Link>
                <div className="border-t border-gray-200 my-2"></div>
                <button
                  onClick={() => toggleDropdown('mobile-sections')}
                  className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center justify-between"
                  aria-expanded={openDropdown === 'mobile-sections'}
                >
                  <span>Sections</span>
                  <svg className={`h-4 w-4 transition-transform ${openDropdown === 'mobile-sections' ? 'rotate-90' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className={`${openDropdown === 'mobile-sections' ? '' : 'hidden'} bg-gray-50 rounded-md mt-1`}>
                  <Link href="/technology-planning" className="block px-5 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">Technology Planning</Link>
                  <Link href="/application-technology-services" className="block px-5 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">Application Technology Services</Link>
                  <button
                    onClick={() => toggleDropdown('mobile-its')}
                    className="w-full text-left px-5 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 flex items-center justify-between"
                    aria-expanded={openDropdown === 'mobile-its'}
                  >
                    <span>Integrated Technology Solutions</span>
                    <svg className={`h-4 w-4 transition-transform ${openDropdown === 'mobile-its' ? 'rotate-90' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className={`${openDropdown === 'mobile-its' ? '' : 'hidden'} bg-gray-100 rounded-md ml-4 mt-1`}>
                    <Link href="/integrated-technology-solutions" className="block px-5 py-2 rounded-md text-sm font-semibold text-primary-blue hover:bg-gray-200">View All ITS Teams</Link>
                    <Link href="/technology-infrastructure-operations" className="block px-5 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-200">Technology Infrastructure Operations</Link>
                    <Link href="/data-technology" className="block px-5 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-200">Data Technology</Link>
                    <Link href="/partner-experience" className="block px-5 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-200">Partner Experience</Link>
                    <Link href="/service-delivery" className="block px-5 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-200">Service Delivery and Analytics</Link>
                  </div>
                  <Link href="/project-management-office" className="block px-5 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">Project Management Office</Link>
                  <Link href="/corporate-information-security" className="block px-5 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">Corporate Information Security</Link>
                </div>
                <Link href="/services" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">View All Teams</Link>
              </div>
            </div>

            {/* Mobile Resources */}
            <div>
              <button
                onClick={() => toggleDropdown('mobile-resources')}
                className="font-sans w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 flex justify-between items-center"
                aria-expanded={openDropdown === 'mobile-resources'}
              >
                <span>Resources</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              <div className={`${openDropdown === 'mobile-resources' ? '' : 'hidden'} mt-1 pl-4`}>
                {/* Dashboards sub-section */}
                <button
                  onClick={() => toggleDropdown('mobile-dashboards')}
                  className="w-full text-left px-3 py-2 rounded-md text-sm font-bold text-primary-blue hover:bg-gray-50 flex items-center justify-between"
                  aria-expanded={openDropdown === 'mobile-dashboards'}
                >
                  <span>Dashboards</span>
                  <svg className={`h-4 w-4 transition-transform ${openDropdown === 'mobile-dashboards' ? 'rotate-90' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className={`${openDropdown === 'mobile-dashboards' ? '' : 'hidden'} bg-gray-50 rounded-md mt-1 mb-2`}>
                  <Link href="/dashboards" className="block px-5 py-2 rounded-md text-sm font-semibold text-primary-blue hover:bg-gray-100">View All Dashboards</Link>
                  <Link href="/service-health" className="block px-5 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">Service & Infrastructure Health</Link>
                  <Link href="/budget" className="block px-5 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">Budget & Financial</Link>
                  <Link href="/people-management" className="block px-5 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">People Management</Link>
                  <Link href="/asset-management" className="block px-5 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">Asset Management</Link>
                  <Link href="/incident-management" className="block px-5 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">Incident & Service Management</Link>
                  <Link href="/vendor-command-center" className="block px-5 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">Vendor Command Center</Link>
                  <Link href="/cio-dashboard" className="block px-5 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100">Leadership</Link>
                </div>
                <div className="border-t border-gray-200 my-1"></div>
                <Link href="/resources/app-library" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">App Library</Link>
                <Link href="/technology-strategies" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Technology Strategies</Link>
                <Link href="/policies" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Policies & Procedures</Link>
                <Link href="/org-chart" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">OCT Org Chart</Link>
                <Link href="/ai-resources" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">AI Resources</Link>
                <Link href="/links" className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50">Links</Link>
                {canViewOctWebDev && (
                  <>
                    <div className="border-b border-gray-200 my-1" />
                    <Link href="/resources/oct-web-dev" className="block px-3 py-2 rounded-md text-sm font-semibold text-[#005087] hover:bg-[#005087]/10">OCT Web Development</Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile News */}
            <Link href="/news" className="font-sans block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">News</Link>

            {/* Mobile Contact */}
            <Link href="/contact" className="font-sans block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Contact</Link>

            {/* Mobile Service Health Button */}
            <Link
              href="/service-health"
              className="font-sans block mx-3 my-2 text-center bg-primary-blue text-white px-4 py-2 rounded-md hover:bg-complement-empire-blue transition-colors font-semibold"
            >
              Service Health
            </Link>

          </div>
        </div>
      </header>
      {/* Spacer to prevent content from being hidden behind fixed header */}
      <div className={`transition-all duration-300 ${isScrolled ? 'h-16' : 'h-32 lg:h-36'}`} />
    </>
  );
}
