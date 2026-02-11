'use client';

import { resolveIcon } from '@/lib/icon-resolver';

interface PortfolioCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
}

export default function PortfolioCard({ icon, title, description, href }: PortfolioCardProps) {
  const Icon = resolveIcon(icon);
  return (
    <div className="bg-[#D3ECEF] rounded-lg overflow-hidden shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="p-6 flex flex-col flex-grow">
        <Icon className="w-10 h-10 text-primary-blue mb-4" aria-hidden="true" />
        <h3 className="font-sans text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="font-sans text-sm text-gray-600 flex-grow mb-4">{description}</p>
        <a
          href={href}
          className="font-sans text-primary-blue font-semibold hover:underline inline-flex items-center"
        >
          View Services &rarr;
        </a>
      </div>
    </div>
  );
}
