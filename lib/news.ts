import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NewsPost, NewsCategory } from "./news.types";

const newsDirectory = path.join(process.cwd(), "content", "news");

export function getAllPosts(): NewsPost[] {
  if (!fs.existsSync(newsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(newsDirectory).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const filePath = path.join(newsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContents);

    // Strip date prefix from filename for slug: 2026-03-10-my-post.md -> my-post
    const slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "");

    return {
      slug,
      title: data.title ?? "",
      date: data.date ?? "",
      category: data.category as NewsCategory,
      description: data.description ?? "",
      image: data.image ?? "",
      featured: data.featured === true,
      author: data.author ?? "",
      content,
    };
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): NewsPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getFeaturedPost(): NewsPost | undefined {
  return getAllPosts().find((post) => post.featured);
}

export function getAllCategories(): NewsCategory[] {
  return ["Strategy", "Infrastructure", "Community", "Spotlight"];
}
