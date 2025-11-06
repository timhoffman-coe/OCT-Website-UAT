'use client';

import Image from 'next/image';

interface ServiceAreaCardProps {
  title: string;
  icon?: string;
  shortDescription: string;
  onClick: () => void;
}

export default function ServiceAreaCard({
  title,
  icon,
  shortDescription,
  onClick,
}: ServiceAreaCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-left w-full hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2"
    >
      {/* Icon */}
      {icon && (
        <div className="mb-4">
          <Image
            src={icon}
            alt={title}
            width={60}
            height={60}
            className="rounded-lg"
          />
        </div>
      )}

      {/* Title */}
      <h3 className="font-sans text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-blue transition-colors">
        {title}
      </h3>

      {/* Short Description */}
      <p className="font-serif text-sm text-gray-600 mb-4 line-clamp-3">
        {shortDescription}
      </p>

      {/* Learn More Link */}
      <div className="flex items-center text-primary-blue font-sans text-sm font-semibold">
        <span>Learn More</span>
        <svg
          className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </button>
  );
}
