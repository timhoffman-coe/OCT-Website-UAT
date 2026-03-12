/**
 * Convert a string to a URL-safe slug.
 * e.g. "Network Services" → "network-services"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
