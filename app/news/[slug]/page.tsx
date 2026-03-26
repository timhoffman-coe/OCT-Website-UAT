import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleRenderer from "@/components/news/ArticleRenderer";
import { getAllPosts, getPostBySlug } from "@/lib/news";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const post = getPostBySlug(slug);
    if (!post) return { title: "Not Found" };
    return {
      title: `${post.title} | OCT News`,
      description: post.description,
    };
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto pt-8 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/news"
          className="inline-flex items-center gap-1 text-process-blue hover:text-primary-blue font-medium text-sm mb-8 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to News
        </Link>

        {/* Hero Image */}
        <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-10">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/60 via-transparent to-transparent" />
        </div>

        {/* Article Header */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-process-blue text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm">
              {post.category}
            </span>
            <span className="text-text-secondary text-sm">{formattedDate}</span>
            <span className="text-text-secondary text-sm">·</span>
            <span className="text-text-secondary text-sm">{post.author}</span>
          </div>
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-dark-blue leading-tight">
            {post.title}
          </h1>
        </div>

        {/* Article Content */}
        <ArticleRenderer content={post.content} />

        {/* Bottom Back Link */}
        <div className="max-w-3xl mx-auto mt-16 pt-8 border-t border-structural-gray-blue">
          <Link
            href="/news"
            className="inline-flex items-center gap-1 text-process-blue hover:text-primary-blue font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to all news
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
