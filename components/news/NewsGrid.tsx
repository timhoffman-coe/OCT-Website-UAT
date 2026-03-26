"use client";

import { useState } from "react";
import { NewsPost, NewsCategory } from "@/lib/news.types";
import CategoryFilter from "./CategoryFilter";
import NewsCard from "./NewsCard";

interface NewsGridProps {
  posts: NewsPost[];
  categories: NewsCategory[];
}

export default function NewsGrid({ posts, categories }: NewsGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPosts = activeCategory
    ? posts.filter((post) => post.category === activeCategory)
    : posts;

  return (
    <>
      {/* Hero Header */}
      <header className="mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-sans text-xs font-bold tracking-widest text-process-blue uppercase mb-2 block">
              The OCT Bulletin
            </span>
            <h1 className="font-sans text-5xl md:text-6xl font-extrabold text-dark-blue tracking-tight leading-none">
              Open City &amp; <br />
              <span className="text-process-blue">Technology Updates.</span>
            </h1>
          </div>
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onFilterChange={setActiveCategory}
          />
        </div>
      </header>

      {/* Card Grid */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-10">
          <h3 className="font-sans text-2xl font-bold text-dark-blue whitespace-nowrap">Latest Branch Insights</h3>
          <div className="h-[2px] flex-grow mx-8 bg-structural-gray-blue" />
        </div>
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPosts.map((post) => (
              <NewsCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-text-secondary text-center py-12">No stories found in this category.</p>
        )}
      </section>
    </>
  );
}
