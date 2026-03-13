'use client';

import { useState } from 'react';
import Image from 'next/image';

interface KeyInitiativeSlide {
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt: string;
}

export default function KeyInitiativesWidget({ slides }: { slides: KeyInitiativeSlide[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (slides.length === 0) return null;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-sans text-3xl font-bold text-center text-gray-900 mb-12">
          Key Initiatives Spotlight
        </h2>

        <div className="relative max-w-4xl mx-auto overflow-hidden rounded-lg shadow-xl bg-gray-900">
          {/* Carousel Track */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="carousel-slide relative w-full flex-shrink-0">
                {slide.imageUrl ? (
                  <Image
                    src={slide.imageUrl}
                    alt={slide.imageAlt}
                    width={1200}
                    height={600}
                    sizes="(max-width: 1024px) 100vw, 896px"
                    className="w-full h-96 object-cover opacity-30"
                  />
                ) : (
                  <div className="w-full h-96 bg-gradient-to-br from-primary-blue to-dark-blue opacity-60" />
                )}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                  <h3 className="font-sans text-3xl font-bold text-white">
                    {slide.title}
                  </h3>
                  <p className="font-serif text-lg text-gray-200 mt-3 max-w-2xl">
                    {slide.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls: Prev/Next Buttons */}
          {slides.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition disabled:opacity-50"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                disabled={currentSlide === slides.length - 1}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition disabled:opacity-50"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Carousel Controls: Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/40'}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
