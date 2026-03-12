'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="h-10 w-10 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>
        <h2 className="font-sans text-2xl font-bold text-gray-900 mb-3">
          Something went wrong
        </h2>
        <p className="font-sans text-gray-500 mb-8 leading-relaxed">
          An unexpected error occurred. Please try again or contact support if the
          problem persists.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-6 py-2.5 bg-primary-blue text-white font-sans font-semibold rounded-lg hover:bg-dark-blue transition-colors"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 font-sans font-semibold rounded-lg hover:border-primary-blue hover:text-primary-blue transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
