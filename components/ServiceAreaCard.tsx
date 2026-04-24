'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ServiceAreaCardProps {
  title: string;
  icon?: string;
  shortDescription: string;
  link?: string;
  isPublished?: boolean;
  onClick: () => void;
}

export default function ServiceAreaCard({
  title,
  icon,
  shortDescription,
  link,
  isPublished = true,
  onClick,
}: ServiceAreaCardProps) {
  const cardContent = (
    <>
      {/* Icon & Draft Badge */}
      <div className="flex items-start justify-between mb-4">
        {icon ? (
          <Image
            src={icon}
            alt={title}
            width={60}
            height={60}
            sizes="60px"
            className="rounded-lg"
          />
        ) : <div />}
        {!isPublished && (
          <span className="text-xs font-sans font-semibold px-2 py-1 rounded bg-complement-sunrise/20 text-complement-sunrise">
            DRAFT
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="font-sans text-xl font-bold text-white mb-3 group-hover:text-process-blue transition-colors">
        {title}
      </h3>

      {/* Short Description */}
      <p className="font-sans text-sm text-white/80 mb-4 line-clamp-3">
        {shortDescription}
      </p>

      {/* Learn More Link */}
      {isPublished ? (
        <div className="flex items-center text-process-blue font-sans text-sm font-semibold">
          <span>Learn More</span>
          <svg
            aria-hidden="true"
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
      ) : (
        <span className="font-sans text-white/70 font-semibold text-sm">
          Coming Soon
        </span>
      )}
    </>
  );

  const baseClassName = "group relative bg-dark-blue rounded-lg shadow-md transition-all duration-300 p-6 text-left w-full focus:outline-none focus:ring-2 focus:ring-process-blue focus:ring-offset-2";
  const cardClassName = isPublished
    ? `${baseClassName} hover:shadow-lg hover:-translate-y-1`
    : `${baseClassName} opacity-60`;

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
