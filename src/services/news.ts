import { newsPosts, type NewsPost } from '../content/news';

export type { NewsPost };

export function getPublishedNews(): NewsPost[] {
  return newsPosts
    .filter((post) => post.published)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getNewsBySlug(slug: string): NewsPost | null {
  const post = newsPosts.find((p) => p.slug === slug);
  if (!post || !post.published) return null;
  return post;
}

export function getPublishedSlugs(): string[] {
  return getPublishedNews().map((post) => post.slug);
}
