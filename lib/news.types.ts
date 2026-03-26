export type NewsCategory = "Strategy" | "Infrastructure" | "Community" | "Spotlight";

export interface NewsPost {
  slug: string;
  title: string;
  date: string;
  category: NewsCategory;
  description: string;
  image: string;
  featured: boolean;
  author: string;
  content: string;
}
