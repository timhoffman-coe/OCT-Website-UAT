'use client';

import { ExternalLink } from 'lucide-react';

interface WorkTrackingCardProps {
  title: string;
  description: string;
  href: string;
}

export default function WorkTrackingCard({ title, description, href }: WorkTrackingCardProps) {
  return (
    <div className="bg-white border-2 border-[#DDE3E6] rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="p-6 flex flex-col flex-grow">
        <ExternalLink className="w-10 h-10 text-gray-500 mb-4" aria-hidden="true" />
        <h3 className="font-sans text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="font-sans text-sm text-gray-600 flex-grow mb-4">{description}</p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-primary-blue font-semibold hover:underline inline-flex items-center"
        >
          Open Board &rarr;
        </a>
      </div>
    </div>
  );
}
