import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArticleRenderer from "@/components/news/ArticleRenderer";
import RelatedStories from "@/components/news/RelatedStories";
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

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const readTime = estimateReadTime(post.content);

  return (
    <div className="bg-structural-light-gray min-h-screen">
      <Header />

      <main id="main-content" className="pt-8 pb-20">
        {/* Article Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8">
            <Link href="/news" className="text-[0.6875rem] uppercase tracking-widest text-process-blue font-bold hover:underline">
              News
            </Link>
            <svg aria-hidden="true" className="w-4 h-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[0.6875rem] uppercase tracking-widest text-text-secondary">{post.category}</span>
          </nav>

          {/* Title */}
          <h1 className="font-sans text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.1] font-extrabold tracking-tight text-dark-blue mb-8">
            {post.title}
          </h1>

          {/* Author & Meta */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-l-4 border-primary-blue pl-6 py-2">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-structural-gray-blue flex items-center justify-center text-dark-blue font-bold text-lg">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-text-dark">{post.author}</p>
                <p className="text-[0.6875rem] uppercase tracking-wider text-text-secondary">{formattedDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs font-semibold">{readTime} min read</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-16">
          <div className="aspect-[21/9] w-full bg-structural-gray-blue rounded-lg overflow-hidden relative group">
            <img
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src={post.image}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/40 to-transparent" />
          </div>
        </div>

        {/* Article Content with Sidebar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Share Widget (Desktop) */}
          <aside className="hidden lg:block lg:col-span-1 sticky top-32 h-fit">
            <div className="flex flex-col gap-4">
              <button className="w-10 h-10 rounded-full bg-white hover:bg-structural-gray-blue transition-colors flex items-center justify-center text-dark-blue" title="Print Article" aria-label="Print Article">
                <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18.75 12h.008v.008h-.008V12zm-2.25 0h.008v.008H16.5V12z" />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full bg-white hover:bg-structural-gray-blue transition-colors flex items-center justify-center text-dark-blue" title="Bookmark" aria-label="Bookmark">
                <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>
              </button>
            </div>
          </aside>

          {/* Main Text */}
          <article className="lg:col-span-8 lg:col-start-3">
            <ArticleRenderer content={post.content} />
          </article>
        </div>

        {/* Related Stories */}
        {relatedPosts.length > 0 && (
          <RelatedStories posts={relatedPosts} />
        )}

        {/* Bottom Back Link */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-16 pt-8 border-t border-structural-gray-blue">
          <Link
            href="/news"
            className="inline-flex items-center gap-1 text-process-blue hover:text-primary-blue font-medium transition-colors"
          >
            <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
