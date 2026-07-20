/**
 * Central business configuration.
 * TODO(nutriway): replace the placeholder contact details below with the real ones.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://nutriway.uz";

export const locales = ["uz", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "uz";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Publication date reported for the articles in structured data.
 * TODO(nutriway): bump this whenever the article copy is meaningfully revised —
 * it is what Google shows as the article date.
 */
export const CONTENT_PUBLISHED_AT = "2026-07-19";

export const brand = {
  name: "NUTRIWAY",
  legalName: "NUTRIWAY NATURAL",
  product: "NATURFLEX COLLAGEN",
  logo: "/brand/nutriway.jpg",
} as const;

/** Phone numbers — E.164 in `tel`, pretty form in `label`. */
export const phones = [
  { tel: "+998953931818", label: "+998 (95) 393-18-18", role: "sales" },
] as const;

export const social = {
  telegram: "https://t.me/nutriwaycollagen",
  instagram: "https://www.instagram.com/nutriway.collagen.official/",
} as const;

/** Physical locations. `geo` is used for LocalBusiness structured data. */
export const locations = [
  {
    id: "tashkent-yashnobod",
    geo: { lat: 41.305503, lng: 69.326934 },
    mapUrl: "https://maps.app.goo.gl/CF4L5PF1jch2RxBp9",
    hours: "Mo-Sa 09:00-19:00",
    street: {
      uz: "Mahtumquli ko'chasi, 99v-uy",
      ru: "улица Махтумкули, дом 99в",
    },
    city: {
      uz: "Toshkent shahri, Yashnobod tumani",
      ru: "город Ташкент, Яшнободский район",
    },
    title: {
      uz: "Ofis va ombor",
      ru: "Офис и склад",
    },
  },
] as const;

/**
 * Google Maps embed for a location. Uses the keyless `output=embed` form, so
 * no API key or billing account is required.
 */
export function mapEmbedUrl(
  geo: { lat: number; lng: number },
  locale: Locale
) {
  const params = new URLSearchParams({
    q: `${geo.lat},${geo.lng}`,
    z: "16",
    hl: locale,
    output: "embed",
  });
  return `https://maps.google.com/maps?${params.toString()}`;
}
