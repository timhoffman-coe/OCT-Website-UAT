'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionLink {
  label: string;
  href: string;
}

interface AccordionItem {
  id: string;
  title: string;
  links: AccordionLink[];
}

interface AccordionSectionProps {
  items: AccordionItem[];
}

export default function AccordionSection({ items }: AccordionSectionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="border-t border-structural-gray-blue">
      {items.map((item) => {
        const isOpen = openItems.has(item.id);
        return (
          <div key={item.id} className="border-b border-structural-gray-blue">
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full text-left px-4 py-5 flex justify-between items-center font-sans text-lg font-semibold text-text-dark hover:bg-structural-light-gray transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-process-blue focus-visible:ring-offset-2"
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
            >
              <span>{item.title}</span>
              <ChevronDown
                className={`w-5 h-5 text-text-secondary transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>
            <div
              id={`accordion-content-${item.id}`}
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? 'max-h-[1000px]' : 'max-h-0'
              }`}
            >
              <ul className="bg-structural-light-gray py-4 px-8 pl-12 list-disc">
                {item.links.map((link, index) => (
                  <li key={index} className="mb-3 last:mb-0">
                    <a
                      href={link.href}
                      className="font-sans text-primary-blue hover:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}
