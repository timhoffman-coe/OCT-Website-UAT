'use client';

import { useState, useEffect, useRef } from 'react';
import { useFocusTrap } from '@/hooks/useFocusTrap';

const STORAGE_KEY = 'coe-disclaimer-dismissed-date';

export default function DevelopmentDisclaimer() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(dialogRef, isOpen);

  // Check localStorage on mount to see if we should show the modal
  useEffect(() => {
    const lastDismissed = localStorage.getItem(STORAGE_KEY);
    const today = new Date().toDateString();

    // Show modal if never dismissed or dismissed on a different day
    if (lastDismissed !== today) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reading localStorage on mount to determine initial UI state
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, new Date().toDateString());
    setIsOpen(false);
  };

  // Handle ESC key and body scroll
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
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
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="dev-disclaimer-title"
          className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
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
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <h2 id="dev-disclaimer-title" className="font-sans text-2xl font-bold text-gray-900 mb-4">
              Under Development
            </h2>

            <p className="font-serif text-lg text-gray-700 mb-6">
              This site is under development. Data is not reflective of actual production numbers.
            </p>

            <button
              onClick={handleClose}
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
