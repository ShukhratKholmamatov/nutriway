import { getDict } from "@/lib/content";
import { locales, type Locale } from "@/lib/site";

/** Stable identity of an article, independent of its localised slug. */
export const articleKeys = ["science", "usage", "mistakes", "foods"] as const;
export type ArticleKey = (typeof articleKeys)[number];

export type Article = {
  key: ArticleKey;
  slug: string;
  title: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  keywords: readonly string[];
  minutes: number;
  href: string;
};

export function getArticle(locale: Locale, key: ArticleKey): Article {
  const item = getDict(locale).articles.items[key];
  return { key, ...item, href: `/${locale}/blog/${item.slug}` };
}

export function getArticles(locale: Locale): Article[] {
  return articleKeys.map((key) => getArticle(locale, key));
}

/** Resolve a localised slug back to its stable key. */
export function findArticleKey(
  locale: Locale,
  slug: string
): ArticleKey | undefined {
  return articleKeys.find(
    (key) => getDict(locale).articles.items[key].slug === slug
  );
}

/**
 * Slugs differ per locale, so hreflang alternates need the key-based lookup
 * rather than a naive path swap.
 */
export function articleAlternates(key: ArticleKey): Record<Locale, string> {
  return Object.fromEntries(
    locales.map((locale) => [
      locale,
      `/${locale}/blog/${getDict(locale).articles.items[key].slug}`,
    ])
  ) as Record<Locale, string>;
}

/** Reading-time label, e.g. "4 daqiqalik o'qish". */
export function readingTime(locale: Locale, minutes: number): string {
  return getDict(locale).articles.readingTime.replace("{n}", String(minutes));
}
