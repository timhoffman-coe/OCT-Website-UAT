"use client";

import { NewsCategory } from "@/lib/news.types";

interface CategoryFilterProps {
  categories: NewsCategory[];
  activeCategory: string | null;
  onFilterChange: (category: string | null) => void;
}

export default function CategoryFilter({ categories, activeCategory, onFilterChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 pb-2 flex-wrap">
      <button
        onClick={() => onFilterChange(null)}
        className={`px-4 py-2 font-medium rounded-md transition-colors ${
          activeCategory === null
            ? "bg-structural-light-gray text-dark-blue"
            : "text-text-secondary hover:text-dark-blue"
        }`}
      >
        All Stories
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onFilterChange(category)}
          className={`px-4 py-2 font-medium rounded-md transition-colors ${
            activeCategory === category
              ? "bg-structural-light-gray text-dark-blue"
              : "text-text-secondary hover:text-dark-blue"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
