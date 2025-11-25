'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface DiagramLink {
  label: string;
  href: string;
}

interface TabContent {
  id: string;
  label: string;
  videoTitle: string;
  videoDescription: string;
  videoUrl: string;
  diagramsTitle: string;
  diagramsDescription: string;
  diagramLinks: DiagramLink[];
}

interface TeamTabsProps {
  tabs: TabContent[];
}

export default function TeamTabs({ tabs }: TeamTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');

  const activeContent = tabs.find((tab) => tab.id === activeTab);

  return (
    <div>
      {/* Tab List */}
      <div className="flex flex-wrap border-b-2 border-[#DDE3E6] mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`font-sans font-semibold text-base px-6 py-3 border-b-3 -mb-[2px] transition-all duration-300 ${
              activeTab === tab.id
                ? 'text-primary-blue border-primary-blue'
                : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-[#F4F2F1]'
            }`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tab-panel-${tab.id}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panel */}
      {activeContent && (
        <div
          key={activeContent.id}
          id={`tab-panel-${activeContent.id}`}
          role="tabpanel"
          aria-labelledby={activeContent.id}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-fadeIn"
        >
          {/* Video Section */}
          <div>
            <h3 className="font-sans text-2xl font-bold text-primary-blue mb-2">
              {activeContent.videoTitle}
            </h3>
            <p className="font-sans text-sm text-gray-600 mb-4">
              {activeContent.videoDescription}
            </p>
            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg bg-black">
              <iframe
                className="absolute top-0 left-0 w-full h-full border-0"
                src={activeContent.videoUrl}
                title={activeContent.videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          {/* Diagram Links Section */}
          <div>
            <h3 className="font-sans text-2xl font-bold text-primary-blue mb-2">
              {activeContent.diagramsTitle}
            </h3>
            <p className="font-sans text-sm text-gray-600 mb-6">
              {activeContent.diagramsDescription}
            </p>
            <ul className="space-y-3">
              {activeContent.diagramLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="flex justify-between items-center bg-[#F4F2F1] border-2 border-[#DDE3E6] p-4 rounded font-sans font-semibold text-gray-900 hover:bg-[#DDE3E6] hover:translate-x-1 transition-all duration-300"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-5 h-5 text-primary-blue" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
