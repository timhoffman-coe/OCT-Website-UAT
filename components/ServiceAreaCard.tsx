'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ServiceAreaCardProps {
  title: string;
  icon?: string;
  shortDescription: string;
  link?: string;
  onClick: () => void;
}

export default function ServiceAreaCard({
  title,
  icon,
  shortDescription,
  link,
  onClick,
}: ServiceAreaCardProps) {
  const cardContent = (
    <>
      {/* Icon */}
      {icon && (
        <div className="mb-4">
          <Image
            src={icon}
            alt={title}
            width={60}
            height={60}
            sizes="60px"
            className="rounded-lg"
          />
        </div>
      )}

      {/* Title */}
      <h3 className="font-sans text-xl font-bold text-[#212529] mb-3 group-hover:text-primary-blue transition-colors">
        {title}
      </h3>

      {/* Short Description */}
      <p className="font-sans text-sm text-[#495057] mb-4 line-clamp-3">
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
    </>
  );

  const cardClassName = "group relative bg-[#D3ECEF] rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 text-left w-full hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:ring-offset-2";

  // If link is provided, render as Link, otherwise render as button
  if (link) {
    return (
      <Link href={link} className={cardClassName}>
        {cardContent}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={cardClassName}>
      {cardContent}
    </button>
  );
}
