import { getDict } from "@/lib/content";
import { isLocale, locales } from "@/lib/site";
import { OG_SIZE, renderOgCard } from "@/components/seo/ogCard";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "NUTRIWAY";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function BlogOgImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getDict(isLocale(locale) ? locale : "uz");

  return renderOgCard({
    eyebrow: t.articles.eyebrow,
    title: t.articles.title,
    subtitle: t.articles.lead,
  });
}
