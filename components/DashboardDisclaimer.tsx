'use client';

import { useState, useEffect } from 'react';

interface DashboardDisclaimerProps {
  dashboardName: string;
  title?: string;
  message?: React.ReactNode;
}

export default function DashboardDisclaimer({
  dashboardName,
  title = 'Not Yet Live',
  message,
}: DashboardDisclaimerProps) {
  const [isOpen, setIsOpen] = useState(true);

  // Handle ESC key and body scroll
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Content */}
          <div className="text-center">
            {/* Warning Icon */}
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-complement-sunrise/20 mb-4">
              <svg
                className="h-8 w-8 text-complement-sunrise"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <h2 className="font-sans text-2xl font-bold text-gray-900 mb-4">
              {title}
            </h2>

            <p className="font-serif text-lg text-gray-700 mb-6">
              {message ?? (
                <>
                  <span className="font-bold">{dashboardName}</span> is not yet live and the data represented is not accurate.
                </>
              )}
            </p>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full bg-primary-blue hover:bg-dark-blue text-white font-sans font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
