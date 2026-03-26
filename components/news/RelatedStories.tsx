import Link from "next/link";
import { NewsPost } from "@/lib/news.types";

interface RelatedStoriesProps {
  posts: NewsPost[];
}

export default function RelatedStories({ posts }: RelatedStoriesProps) {
  return (
    <section className="mt-32 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex items-center justify-between mb-12">
        <h3 className="font-sans text-2xl font-black text-dark-blue uppercase tracking-tight">Related Stories</h3>
        <Link href="/news" className="text-sm font-bold text-process-blue hover:underline flex items-center gap-1">
          View Newsroom
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link key={post.slug} href={`/news/${post.slug}`} className="group cursor-pointer">
            <div className="aspect-[16/10] bg-structural-gray-blue mb-6 overflow-hidden rounded-md">
              <img
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src={post.image}
              />
            </div>
            <p className="text-[0.6875rem] font-bold text-process-blue uppercase tracking-widest mb-2">{post.category}</p>
            <h4 className="font-sans text-xl font-bold leading-tight text-dark-blue group-hover:text-process-blue transition-colors">
              {post.title}
            </h4>
          </Link>
        ))}
      </div>
    </section>
  );
}
