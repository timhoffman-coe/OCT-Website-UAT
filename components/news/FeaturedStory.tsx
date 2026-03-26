import Link from "next/link";
import { NewsPost } from "@/lib/news.types";

interface FeaturedStoryProps {
  post: NewsPost;
}

export default function FeaturedStory({ post }: FeaturedStoryProps) {
  return (
    <section className="mb-20">
      <Link href={`/news/${post.slug}`} className="group">
        <div className="relative overflow-hidden rounded-xl bg-primary-blue text-white flex flex-col lg:flex-row min-h-[500px] border border-structural-gray-blue/10">
          {/* Image Side */}
          <div className="lg:w-3/5 relative h-64 lg:h-auto overflow-hidden">
            <img
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={post.image}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary-blue/80 via-transparent to-transparent" />
          </div>

          {/* Content Side */}
          <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center items-start">
            <span className="inline-block px-3 py-1 bg-process-blue text-[10px] font-bold tracking-wider uppercase rounded-sm mb-6">
              {post.category}
            </span>
            <h2 className="font-sans text-3xl lg:text-4xl font-bold leading-tight mb-4">
              {post.title}
            </h2>
            <p className="text-blue-100/80 text-lg mb-8 leading-relaxed">
              {post.description}
            </p>
            <span className="inline-flex items-center gap-2 font-semibold text-peaceful-light-blue group-hover:text-white transition-colors">
              Read the full story
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
