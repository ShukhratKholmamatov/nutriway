import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { getDict } from "@/lib/content";
import {
  articleAlternates,
  articleKeys,
  findArticleKey,
  getArticle,
  getArticles,
  readingTime,
} from "@/lib/articles";
import {
  CONTENT_PUBLISHED_AT,
  SITE_URL,
  isLocale,
  locales,
  type Locale,
} from "@/lib/site";
import { ArticleBody } from "@/components/articles/ArticleBody";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ArticleJsonLd } from "@/components/seo/JsonLd";
import { HelixMotif } from "@/components/ui/Motifs";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    articleKeys.map((key) => ({
      locale,
      slug: getDict(locale).articles.items[key].slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const key = findArticleKey(locale, slug);
  if (!key) return {};

  const article = getArticle(locale, key);
  const alt = articleAlternates(key);

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: [...article.keywords],
    alternates: {
      canonical: `${SITE_URL}${article.href}`,
      languages: {
        uz: `${SITE_URL}${alt.uz}`,
        ru: `${SITE_URL}${alt.ru}`,
        "x-default": `${SITE_URL}${alt.uz}`,
      },
    },
    openGraph: {
      type: "article",
      url: `${SITE_URL}${article.href}`,
      siteName: "NUTRIWAY NATURAL",
      locale: getDict(locale).meta.locale,
      title: article.metaTitle,
      description: article.metaDescription,
      publishedTime: CONTENT_PUBLISHED_AT,
      modifiedTime: CONTENT_PUBLISHED_AT,
      authors: ["NUTRIWAY NATURAL"],
    },
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle,
      description: article.metaDescription,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale: Locale = locale;
  const key = findArticleKey(typedLocale, slug);
  if (!key) notFound();

  const t = getDict(typedLocale);
  const article = getArticle(typedLocale, key);
  const related = getArticles(typedLocale).filter((a) => a.key !== key);

  return (
    <article className="bg-bone-50">
      {/* Article header */}
      <header className="grain relative overflow-hidden bg-wine-950 pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(110% 70% at 80% 5%, rgba(193,144,74,0.2) 0%, transparent 55%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 top-0 h-full opacity-30"
        >
          <HelixMotif />
        </div>

        <div className="relative mx-auto max-w-3xl px-5 lg:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-bone-200/60">
              <li>
                <Link
                  href={`/${typedLocale}`}
                  className="inline-block py-1.5 hover:text-gold-300"
                >
                  {t.articles.home}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link
                  href={`/${typedLocale}/blog`}
                  className="inline-block py-1.5 hover:text-gold-300"
                >
                  {t.articles.indexTitle}
                </Link>
              </li>
            </ol>
          </nav>

          <h1 className="mt-7 font-display text-3xl leading-[1.15] text-bone-50 sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-bone-200/80">
            {article.excerpt}
          </p>

          <p className="mt-8 flex items-center gap-2 text-xs text-bone-200/60">
            <Clock size={14} aria-hidden />
            {readingTime(typedLocale, article.minutes)}
          </p>
        </div>
      </header>

      {/* Article body */}
      <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-20">
        <ArticleBody articleKey={key} t={t} />

        {/* Product CTA */}
        <aside className="mt-16 rounded-[var(--radius-xl)] bg-wine-800 p-8 shadow-[var(--shadow-lift)] sm:p-10">
          <h2 className="font-display text-2xl text-bone-50 sm:text-3xl">
            {t.articles.ctaTitle}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-bone-200/80">
            {t.articles.ctaText}
          </p>
          <ButtonLink
            href={`/${typedLocale}#lead-form`}
            variant="gold"
            size="lg"
            className="mt-7 w-full sm:w-auto"
          >
            {t.articles.ctaButton}
          </ButtonLink>
        </aside>

        <Link
          href={`/${typedLocale}/blog`}
          className="mt-12 inline-flex items-center gap-2 py-2 text-sm font-semibold text-wine-800 transition-colors hover:text-gold-600"
        >
          <ArrowLeft size={16} aria-hidden />
          {t.articles.backToList}
        </Link>
      </div>

      {/* Related */}
      <section className="border-t border-wine-800/10 bg-bone-100 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="font-display text-2xl text-wine-900 sm:text-3xl">
            {t.articles.relatedTitle}
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a, i) => (
              <Reveal as="li" key={a.key} i={i}>
                <ArticleCard article={a} locale={typedLocale} t={t} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ArticleJsonLd locale={typedLocale} articleKey={key} />
    </article>
  );
}
