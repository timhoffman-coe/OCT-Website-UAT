'use client';

import { useEffect, useState } from 'react';

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: 'sections', label: 'Sections' },
  { id: 'who-we-are', label: 'Who We Are' },
  { id: 'guiding-principles', label: 'Guiding Principles' },
  { id: 'budget', label: 'Budget & Spend' },
  { id: 'initiatives', label: 'Key Initiatives' },
];

export default function ScrollSpyNav() {
  const [activeSection, setActiveSection] = useState<string>('sections');

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = navItems[0].id; // Default to first section

      // Check if we're at the bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;

      if (isAtBottom) {
        // If at bottom, highlight the last section
        currentSection = navItems[navItems.length - 1].id;
      } else {
        // Loop forward through all sections
        navItems.forEach(item => {
          const element = document.getElementById(item.id);
          if (element) {
            // Use getBoundingClientRect for accurate position calculation
            const rect = element.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY;

            // If we've scrolled past this section's start (accounting for header)
            if (window.scrollY >= (sectionTop - 300)) {
              currentSection = item.id; // Keep updating as we pass each section
            }
          }
        });
      }

      setActiveSection(currentSection);
    };

    // Wait for page to render before initial calculation
    const timeout = setTimeout(handleScroll, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 100; // Account for header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 z-40">
      <div className="relative">
        {/* Vertical line connecting dots */}
        <div className="absolute right-[5px] top-0 bottom-0 w-0.5 bg-gray-200" />

        <ul className="relative space-y-4">
          {navItems.map((item) => (
            <li key={item.id} className="relative flex justify-end">
              <button
                onClick={() => scrollToSection(item.id)}
                className="group flex items-center justify-end transition-all duration-300"
                aria-label={`Navigate to ${item.label}`}
              >
                {/* Label (appears on hover or when active) */}
                <span
                  className={`mr-4 font-sans text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    activeSection === item.id
                      ? 'opacity-100 text-primary-blue'
                      : 'opacity-0 group-hover:opacity-100 text-gray-600 group-hover:text-primary-blue'
                  }`}
                >
                  {item.label}
                </span>

                {/* Dot indicator */}
                <span
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-300 relative z-10 ${
                    activeSection === item.id
                      ? 'bg-primary-blue border-primary-blue scale-125'
                      : 'bg-white border-gray-400 group-hover:border-primary-blue group-hover:scale-110'
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
