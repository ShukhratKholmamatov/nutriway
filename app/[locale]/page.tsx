import { notFound } from "next/navigation";
import { getDict } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/site";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Benefits } from "@/components/sections/Benefits";
import { Product } from "@/components/sections/Product";
import { Articles } from "@/components/sections/Articles";
import { Faq } from "@/components/sections/Faq";
import { Contacts } from "@/components/sections/Contacts";
import { ProductJsonLd } from "@/components/seo/JsonLd";

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const typedLocale: Locale = locale;
  const t = getDict(typedLocale);

  return (
    <>
      <Hero t={t} />
      <Marquee t={t} />
      <Benefits t={t} />
      <Product t={t} />
      {/* The four long-form topics now live at /[locale]/blog/... */}
      <Articles t={t} locale={typedLocale} />
      <Faq t={t} />
      <Contacts t={t} locale={typedLocale} />

      <ProductJsonLd locale={typedLocale} />
    </>
  );
}
