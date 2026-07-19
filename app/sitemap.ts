import type { MetadataRoute } from "next";
import { SITE_URL, locales } from "@/lib/site";
import { articleAlternates, articleKeys, getArticle } from "@/lib/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const home: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified,
    changeFrequency: "weekly",
    priority: locale === "uz" ? 1 : 0.9,
    alternates: {
      languages: { uz: `${SITE_URL}/uz`, ru: `${SITE_URL}/ru` },
    },
  }));

  const blogIndex: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${SITE_URL}/${locale}/blog`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.7,
    alternates: {
      languages: { uz: `${SITE_URL}/uz/blog`, ru: `${SITE_URL}/ru/blog` },
    },
  }));

  // Slugs differ per locale, so alternates come from the key-based lookup.
  const posts: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    articleKeys.map((key) => {
      const alt = articleAlternates(key);
      return {
        url: `${SITE_URL}${getArticle(locale, key).href}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: {
          languages: {
            uz: `${SITE_URL}${alt.uz}`,
            ru: `${SITE_URL}${alt.ru}`,
          },
        },
      };
    })
  );

  return [...home, ...blogIndex, ...posts];
}
