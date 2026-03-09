'use client';

import { useEffect } from 'react';

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Admin error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <span
            className="material-symbols-outlined text-red-500"
            style={{ fontSize: '4rem' }}
          >
            admin_panel_settings
          </span>
        </div>
        <h2 className="font-sans text-2xl font-bold text-gray-900 mb-3">
          Admin Error
        </h2>
        <p className="font-serif text-gray-600 mb-8">
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
          <a
            href="/admin"
            className="px-6 py-2.5 border-2 border-gray-300 text-gray-700 font-sans font-semibold rounded-lg hover:border-primary-blue hover:text-primary-blue transition-colors"
          >
            Admin Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
