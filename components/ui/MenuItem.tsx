import { ReactNode } from 'react';
import Link from 'next/link';

interface MenuItemProps {
  href: string;
  children: ReactNode;
  variant?: 'dropdown' | 'mobile' | 'mobile-sub';
  className?: string;
  external?: boolean;
}

/**
 * Reusable menu item component for consistent navigation styling
 */
export function MenuItem({
  href,
  children,
  variant = 'dropdown',
  className = '',
  external = false
}: MenuItemProps) {
  const baseClasses = {
    dropdown: 'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100',
    mobile: 'block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50',
    'mobile-sub': 'block px-5 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100',
  };

  const combinedClasses = `${baseClasses[variant]} ${className}`.trim();

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClasses}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={combinedClasses}>
      {children}
    </Link>
  );
}

interface MenuButtonProps {
  onClick: () => void;
  children: ReactNode;
  variant?: 'mobile' | 'mobile-sub';
  className?: string;
  isExpanded?: boolean;
}

/**
 * Reusable menu button for expandable sections
 */
export function MenuButton({
  onClick,
  children,
  variant = 'mobile',
  className = '',
  isExpanded = false
}: MenuButtonProps) {
  const baseClasses = {
    mobile: 'font-sans w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 flex justify-between items-center',
    'mobile-sub': 'w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 flex items-center justify-between',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses[variant]} ${className}`.trim()}
    >
      <span>{children}</span>
      <svg
        className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}
