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
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <span
            className="material-symbols-outlined text-red-500"
            style={{ fontSize: '4rem' }}
          >
            error_outline
          </span>
        </div>
        <h2 className="font-sans text-2xl font-bold text-gray-900 mb-3">
          Something went wrong
        </h2>
        <p className="font-serif text-gray-600 mb-8">
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
