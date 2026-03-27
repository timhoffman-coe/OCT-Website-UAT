import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { NewsPost, NewsCategory } from "./news.types";

const newsDirectory = path.join(process.cwd(), "content", "news");

interface GetAllPostsOptions {
  includeDrafts?: boolean;
}

export function getAllPosts(options: GetAllPostsOptions = {}): NewsPost[] {
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
      draft: data.draft === true,
      filename,
    };
  });

  const filtered = options.includeDrafts
    ? posts
    : posts.filter((post) => !post.draft);

  return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string, options: GetAllPostsOptions = {}): NewsPost | undefined {
  return getAllPosts(options).find((post) => post.slug === slug);
}

export function getFeaturedPost(): NewsPost | undefined {
  return getAllPosts().find((post) => post.featured);
}

export function getAllCategories(): NewsCategory[] {
  return ["Strategy", "Infrastructure", "Community", "Spotlight"];
}

// --- Write functions (used by CMS) ---

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function generateFilename(date: string, slug: string): string {
  return `${date}-${slug}.md`;
}

interface SavePostData {
  title: string;
  date: string;
  category: NewsCategory;
  description: string;
  image: string;
  featured: boolean;
  author: string;
  content: string;
  draft: boolean;
}

/**
 * If the given post is featured, unset featured on all other posts.
 * Call this before saving a post that has featured: true.
 */
export function clearOtherFeatured(excludeFilename: string): void {
  if (!fs.existsSync(newsDirectory)) return;

  const files = fs.readdirSync(newsDirectory).filter((f) => f.endsWith(".md") && f !== excludeFilename);
  for (const file of files) {
    const filePath = path.join(newsDirectory, file);
    const fileContents = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContents);
    if (data.featured === true) {
      data.featured = false;
      const updated = matter.stringify(content, data);
      fs.writeFileSync(filePath, updated, "utf-8");
    }
  }
}

export function savePost(filename: string, data: SavePostData): void {
  if (!fs.existsSync(newsDirectory)) {
    fs.mkdirSync(newsDirectory, { recursive: true });
  }

  const frontmatter: Record<string, unknown> = {
    title: data.title,
    date: data.date,
    category: data.category,
    description: data.description,
    image: data.image,
    featured: data.featured,
    author: data.author,
  };

  // Only include draft field if true (published posts omit it for cleanliness)
  if (data.draft) {
    frontmatter.draft = true;
  }

  const fileContent = matter.stringify(data.content, frontmatter);
  const filePath = path.join(newsDirectory, filename);
  fs.writeFileSync(filePath, fileContent, "utf-8");
}

export function deletePost(filename: string): void {
  const filePath = path.join(newsDirectory, filename);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

export function findFilenameBySlug(slug: string): string | undefined {
  if (!fs.existsSync(newsDirectory)) return undefined;
  const files = fs.readdirSync(newsDirectory).filter((f) => f.endsWith(".md"));
  return files.find((f) => {
    const fileSlug = f.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "");
    return fileSlug === slug;
  });
}
