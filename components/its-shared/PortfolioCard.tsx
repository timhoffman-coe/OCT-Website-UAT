'use client';

import Link from 'next/link';
import { resolveIcon } from '@/lib/icon-resolver';

interface PortfolioCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
  isPublished?: boolean;
}

export default function PortfolioCard({ icon, title, description, href, isPublished = true }: PortfolioCardProps) {
  const Icon = resolveIcon(icon);
  return (
    <div className={`bg-[#D3ECEF] rounded-lg overflow-hidden shadow-md flex flex-col${isPublished ? ' hover:shadow-lg hover:-translate-y-1' : ' opacity-60'} transition-all duration-300`}>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-4">
          {/* eslint-disable-next-line react-hooks/static-components -- resolveIcon returns a stable reference from a static map */}
          <Icon className="w-10 h-10 text-primary-blue" aria-hidden="true" />
          {!isPublished && (
            <span className="text-xs font-sans font-semibold px-2 py-1 rounded bg-yellow-200 text-yellow-800">
              DRAFT
            </span>
          )}
        </div>
        <h3 className="font-sans text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="font-sans text-sm text-gray-600 flex-grow mb-4">{description}</p>
        {isPublished ? (
          <Link
            href={href}
            className="font-sans text-primary-blue font-semibold hover:underline inline-flex items-center"
          >
            View Services &rarr;
          </Link>
        ) : (
          <span className="font-sans text-gray-400 font-semibold inline-flex items-center">
            Coming Soon
          </span>
        )}
      </div>
    </div>
  );
}
