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
  { tel: "+998900000000", label: "+998 (90) 000-00-00", role: "sales" },
  { tel: "+998710000000", label: "+998 (71) 000-00-00", role: "office" },
] as const;

export const social = {
  telegram: "https://t.me/nutriway_uz",
  instagram: "https://instagram.com/nutriway.uz",
  email: "info@nutriway.uz",
} as const;

/** Physical locations. `geo` is used for LocalBusiness structured data. */
export const locations = [
  {
    id: "tashkent-office",
    geo: { lat: 41.311081, lng: 69.240562 },
    mapUrl: "https://maps.google.com/?q=41.311081,69.240562",
    hours: "Mo-Sa 09:00-19:00",
    street: {
      uz: "Amir Temur ko'chasi, 1-uy",
      ru: "улица Амира Темура, 1",
    },
    city: { uz: "Toshkent", ru: "Ташкент" },
    title: {
      uz: "Bosh ofis va ombor",
      ru: "Главный офис и склад",
    },
  },
  {
    id: "samarkand-point",
    geo: { lat: 39.654722, lng: 66.959722 },
    mapUrl: "https://maps.google.com/?q=39.654722,66.959722",
    hours: "Mo-Sa 09:00-18:00",
    street: {
      uz: "Registon ko'chasi, 10-uy",
      ru: "улица Регистан, 10",
    },
    city: { uz: "Samarqand", ru: "Самарканд" },
    title: {
      uz: "Savdo nuqtasi",
      ru: "Торговая точка",
    },
  },
] as const;
