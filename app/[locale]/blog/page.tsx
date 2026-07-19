import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict } from "@/lib/content";
import { getArticles } from "@/lib/articles";
import { SITE_URL, isLocale, locales, type Locale } from "@/lib/site";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { BlogIndexJsonLd } from "@/components/seo/JsonLd";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDict(locale);

  return {
    title: t.articles.indexMetaTitle,
    description: t.articles.indexMetaDescription,
    // Union of the article keywords rather than the product page's.
    keywords: [...new Set(getArticles(locale).flatMap((a) => a.keywords))],
    alternates: {
      canonical: `${SITE_URL}/${locale}/blog`,
      languages: {
        uz: `${SITE_URL}/uz/blog`,
        ru: `${SITE_URL}/ru/blog`,
        "x-default": `${SITE_URL}/uz/blog`,
      },
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/${locale}/blog`,
      siteName: "NUTRIWAY NATURAL",
      locale: t.meta.locale,
      title: t.articles.indexMetaTitle,
      description: t.articles.indexMetaDescription,
    },
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale: Locale = locale;
  const t = getDict(typedLocale);
  const articles = getArticles(typedLocale);

  return (
    <div className="bg-bone-50 pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow={t.articles.eyebrow}
          title={t.articles.title}
          lead={t.articles.lead}
          align="center"
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((article, i) => (
            <Reveal as="li" key={article.key} i={i}>
              <ArticleCard article={article} locale={typedLocale} t={t} />
            </Reveal>
          ))}
        </ul>
      </div>

      <BlogIndexJsonLd locale={typedLocale} />
    </div>
  );
}
