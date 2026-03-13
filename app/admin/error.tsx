'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { reportError } from '@/lib/report-client-error';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportError(error, { module: 'admin-error-boundary', digest: error.digest });
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 bg-gray-50">
      <div className="max-w-lg w-full text-center">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-amber-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="h-10 w-10 text-amber-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.049.58.025 1.193-.14 1.743"
            />
          </svg>
        </div>
        <h2 className="font-sans text-2xl font-bold text-gray-900 mb-3">
          Admin Error
        </h2>
        <p className="font-sans text-gray-500 mb-8 leading-relaxed">
          Something went wrong in the admin panel. Your changes may not have been
          saved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-6 py-2.5 bg-primary-blue text-white font-sans font-semibold rounded-lg hover:bg-dark-blue transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/admin"
            className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 font-sans font-semibold rounded-lg hover:border-primary-blue hover:text-primary-blue transition-colors"
          >
            Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
