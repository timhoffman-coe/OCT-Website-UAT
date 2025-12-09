'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function KeyInitiatives() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Regional Smart Fare Solution',
      description: 'Enabling passengers in Edmonton and neighbouring communities to use a smart card to \'tap on and tap off\' on public transit.',
      image: 'https://placehold.co/1200x600/2F63AD/FFFFFF?text=Smart+Fare',
      alt: 'Smart Fare Initiative',
    },
    {
      title: 'eServices Program',
      description: 'Implementing digital services that allow the online submission and payment of permit applications, making it easier to do business with the City.',
      image: 'https://placehold.co/1200x600/109D7E/FFFFFF?text=eServices',
      alt: 'eServices Program',
    },
    {
      title: 'Smart City Framework',
      description: 'Using data and connected technology to manage assets, improve services, and create a more livable and resilient Edmonton.',
      image: 'https://placehold.co/1200x600/839899/FFFFFF?text=Smart+City',
      alt: 'Smart City Framework',
    },
  ];

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
    <section id="initiatives" className="bg-white py-16 sm:py-20">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
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
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  width={1200}
                  height={600}
                  className="w-full h-96 object-cover opacity-30"
                />
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Carousel Controls: Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/40'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
