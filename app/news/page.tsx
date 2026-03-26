import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeaturedStory from "@/components/news/FeaturedStory";
import NewsGrid from "@/components/news/NewsGrid";
import { getAllPosts, getFeaturedPost, getAllCategories } from "@/lib/news";

export const metadata = {
  title: "News | Open City & Technology",
  description: "The latest news, updates, and insights from the Open City & Technology branch at the City of Edmonton.",
};

export default function NewsPage() {
  const allPosts = getAllPosts();
  const featuredPost = getFeaturedPost();
  const categories = getAllCategories();

  const nonFeaturedPosts = allPosts.filter((post) => !post.featured);

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        {featuredPost && <FeaturedStory post={featuredPost} />}
        <NewsGrid posts={nonFeaturedPosts} categories={categories} />
      </main>

      <Footer />
    </div>
  );
}
