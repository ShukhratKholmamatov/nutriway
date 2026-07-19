import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Dict } from "@/lib/content";
import { getArticles } from "@/lib/articles";
import type { Locale } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArticleCard } from "@/components/articles/ArticleCard";

export function Articles({ t, locale }: { t: Dict; locale: Locale }) {
  const articles = getArticles(locale);

  return (
    <section id="articles" className="relative bg-bone-100 py-20 lg:py-28">
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
              <ArticleCard article={article} locale={locale} t={t} />
            </Reveal>
          ))}
        </ul>

        <Reveal i={2}>
          <div className="mt-12 text-center">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex h-13 items-center gap-2 rounded-[var(--radius-md)] border border-wine-800/25 px-7 font-semibold text-wine-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-wine-800 hover:bg-wine-800 hover:text-bone-50"
            >
              {t.articles.readAll}
              <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
