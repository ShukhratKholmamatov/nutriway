import { getDict } from "@/lib/content";
import {
  articleKeys,
  findArticleKey,
  getArticle,
  readingTime,
} from "@/lib/articles";
import { isLocale, locales } from "@/lib/site";
import { OG_SIZE, renderOgCard } from "@/components/seo/ogCard";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "NUTRIWAY";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    articleKeys.map((key) => ({
      locale,
      slug: getDict(locale).articles.items[key].slug,
    }))
  );
}

/** Per-article social card, so each post previews with its own headline. */
export default async function ArticleOgImage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const typedLocale = isLocale(locale) ? locale : "uz";
  const t = getDict(typedLocale);

  const key = findArticleKey(typedLocale, slug);
  if (!key) {
    return renderOgCard({
      eyebrow: t.articles.eyebrow,
      title: t.articles.title,
    });
  }

  const article = getArticle(typedLocale, key);
  return renderOgCard({
    eyebrow: t.articles.eyebrow,
    title: article.title,
    subtitle: article.excerpt,
    footer: readingTime(typedLocale, article.minutes),
  });
}
