'use client';

import React from 'react';
import { Category } from '@/app/oct-assistant/types';

interface CategorySelectionProps {
  categories: Category[];
  onSelectCategory: (category: Category) => void;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({
  categories,
  onSelectCategory,
}) => {
  return (
    <div className="max-w-5xl w-full text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-dark-blue tracking-tight">
          OCT Service Assistant
        </h1>
        <p className="text-xl text-complement-grey-flannel max-w-2xl mx-auto">
          How can we help you today? Please select a topic to access the relevant knowledge base.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 px-4 md:px-0">
        {categories.map((category) => {
          const isHighlighted = category === 'IT Service Desk';
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`group relative flex flex-col items-center p-8 bg-white rounded-lg transition-all duration-300 border-t-4
                ${
                  isHighlighted
                    ? 'border-primary-blue shadow-xl md:scale-105 z-10'
                    : 'border-transparent shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-process-blue opacity-90 hover:opacity-100'
                }`}
            >
              {isHighlighted && (
                <span className="absolute -top-3 bg-complement-sunrise text-dark-blue text-xs font-bold px-3 py-1 rounded-full shadow-sm tracking-wide uppercase">
                  Suggested
                </span>
              )}

              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors duration-300
                ${
                  isHighlighted
                    ? 'bg-primary-blue text-white shadow-md'
                    : 'bg-dark-blue/10 text-primary-blue group-hover:bg-primary-blue group-hover:text-white'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3
                className={`text-lg font-bold mb-2 ${
                  isHighlighted ? 'text-primary-blue text-xl' : 'text-dark-blue'
                }`}
              >
                {category}
              </h3>
              <p className="text-sm text-complement-grey-flannel">
                Access documents and support for {category.toLowerCase()}.
              </p>

              <div
                className={`mt-6 flex items-center font-bold text-sm transition-opacity duration-300
                ${
                  isHighlighted
                    ? 'text-primary-blue opacity-100'
                    : 'text-process-blue opacity-0 group-hover:opacity-100'
                }`}
              >
                Start Chat <span className="ml-2">&rarr;</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySelection;
