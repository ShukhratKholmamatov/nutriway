import Link from "next/link";
import { ArrowRight, Clock, Waves, CalendarCheck, TriangleAlert, Salad } from "lucide-react";
import type { Article } from "@/lib/articles";
import { readingTime } from "@/lib/articles";
import type { Dict } from "@/lib/content";
import type { Locale } from "@/lib/site";

const ICONS = {
  science: Waves,
  usage: CalendarCheck,
  mistakes: TriangleAlert,
  foods: Salad,
} as const;

export function ArticleCard({
  article,
  locale,
  t,
}: {
  article: Article;
  locale: Locale;
  t: Dict;
}) {
  const Icon = ICONS[article.key];

  return (
    <article className="group h-full">
      <Link
        href={article.href}
        className="flex h-full flex-col rounded-[var(--radius-lg)] border border-wine-800/12 bg-white p-7 shadow-[var(--shadow-soft)] transition-all duration-400 hover:-translate-y-1.5 hover:border-gold-500/50 hover:shadow-[var(--shadow-lift)]"
      >
        <span className="grid h-14 w-14 place-items-center rounded-full bg-wine-800 text-gold-300 transition-transform duration-300 group-hover:scale-110">
          <Icon size={24} strokeWidth={1.7} aria-hidden />
        </span>

        <h3 className="mt-6 font-display text-xl leading-snug text-wine-900">
          {article.title}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-500">
          {article.excerpt}
        </p>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-wine-800/10 pt-5">
          <span className="flex items-center gap-1.5 text-xs text-ink-500">
            <Clock size={13} aria-hidden />
            {readingTime(locale, article.minutes)}
          </span>
          <span className="flex items-center gap-1.5 text-sm font-semibold text-wine-800 transition-colors group-hover:text-gold-600">
            {t.articles.readMore}
            <ArrowRight
              size={15}
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
