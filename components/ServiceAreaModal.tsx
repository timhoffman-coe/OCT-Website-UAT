'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useFocusTrap } from '@/hooks/useFocusTrap';

interface ServiceAreaModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon?: string;
  fullDescription: string;
  features: string[];
}

export default function ServiceAreaModal({
  isOpen,
  onClose,
  title,
  icon,
  fullDescription,
  features,
}: ServiceAreaModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  useFocusTrap(dialogRef, isOpen);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="servicearea-modal-title"
          className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full p-8 md:p-12"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
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
          <div className="mt-4">
            {icon && (
              <div className="mb-6">
                <Image
                  src={icon}
                  alt={title}
                  width={80}
                  height={80}
                  sizes="80px"
                  className="rounded-lg"
                />
              </div>
            )}

            <h2 id="servicearea-modal-title" className="font-sans text-3xl font-bold text-gray-900 mb-4">
              {title}
            </h2>

            <p className="font-serif text-lg text-gray-700 mb-6 whitespace-pre-line">
              {fullDescription}
            </p>

            {features.length > 0 && (
              <div>
                <h3 className="font-sans text-xl font-semibold text-gray-900 mb-3">
                  Key Services
                </h3>
                <ul className="space-y-2">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="h-6 w-6 text-primary-blue mr-2 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="font-sans text-base text-gray-700">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
