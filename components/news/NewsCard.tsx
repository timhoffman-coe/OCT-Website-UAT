import Link from "next/link";
import { NewsPost } from "@/lib/news.types";

interface NewsCardProps {
  post: NewsPost;
}

export default function NewsCard({ post }: NewsCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="flex flex-col group">
      <Link href={`/news/${post.slug}`}>
        <div className="aspect-[16/10] overflow-hidden rounded-lg mb-6 relative">
          <img
            alt={post.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            src={post.image}
          />
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur text-dark-blue px-2 py-1 text-[10px] font-bold uppercase tracking-tight rounded-sm">
              {post.category}
            </span>
          </div>
        </div>
        <p className="text-text-secondary text-xs mb-2">{formattedDate}</p>
        <h4 className="font-sans text-xl font-bold text-dark-blue mb-3 leading-snug group-hover:text-process-blue transition-colors">
          {post.title}
        </h4>
        <p className="text-text-secondary leading-relaxed mb-4 text-sm">
          {post.description}
        </p>
        <span className="text-process-blue font-bold text-sm inline-flex items-center gap-1">
          Learn more
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </Link>
    </article>
  );
}
