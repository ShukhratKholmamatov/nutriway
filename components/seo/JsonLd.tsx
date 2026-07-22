import { getDict } from "@/lib/content";
import {
  articleAlternates,
  getArticle,
  getArticles,
  type ArticleKey,
} from "@/lib/articles";
import {
  CONTENT_PUBLISHED_AT,
  SITE_URL,
  brand,
  locations,
  allPhones,
  primaryPhone,
  social,
  type Locale,
} from "@/lib/site";

function Script({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is generated from trusted local config only.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Organization + WebSite + LocalBusiness, rendered once per page in the layout. */
export function OrganizationJsonLd({ locale }: { locale: Locale }) {
  const t = getDict(locale);

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: brand.legalName,
    alternateName: brand.name,
    url: SITE_URL,
    logo: `${SITE_URL}${brand.logo}`,
    image: `${SITE_URL}/${locale}/opengraph-image`,
    description: t.meta.description,
    telephone: allPhones.map((p) => p.tel),
    sameAs: [social.telegram, social.instagram],
    areaServed: { "@type": "Country", name: "Uzbekistan" },
    contactPoint: allPhones.map((p) => ({
      "@type": "ContactPoint",
      telephone: p.tel,
      contactType: p.role,
      availableLanguage: ["uz", "ru"],
      areaServed: "UZ",
    })),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: brand.legalName,
    description: t.meta.description,
    inLanguage: t.meta.locale,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  const businesses = locations.map((loc) => ({
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "@id": `${SITE_URL}/#${loc.id}`,
    name: `${brand.legalName} — ${loc.title[locale]}`,
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    image: `${SITE_URL}${brand.logo}`,
    url: `${SITE_URL}/${locale}`,
    telephone: primaryPhone.tel,
    priceRange: "$$",
    openingHours: loc.hours,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.street[locale],
      addressLocality: loc.city[locale],
      addressCountry: "UZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: loc.geo.lat,
      longitude: loc.geo.lng,
    },
  }));

  return (
    <>
      <Script data={organization} />
      <Script data={website} />
      {businesses.map((b) => (
        <Script key={b["@id"]} data={b} />
      ))}
    </>
  );
}

/** Product + FAQPage + Breadcrumb, rendered on the landing page. */
export function ProductJsonLd({ locale }: { locale: Locale }) {
  const t = getDict(locale);

  const product = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/${locale}#product`,
    name: brand.product,
    image: [`${SITE_URL}/${locale}/opengraph-image`],
    description: t.product.lead,
    brand: { "@type": "Brand", name: brand.legalName },
    manufacturer: { "@id": `${SITE_URL}/#organization` },
    category: t.product.specs[3].value,
    additionalProperty: t.product.specs.map((spec) => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value,
    })),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "UZS",
      url: `${SITE_URL}/${locale}#lead-form`,
      seller: { "@id": `${SITE_URL}/#organization` },
      areaServed: { "@type": "Country", name: "Uzbekistan" },
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/${locale}#faq`,
    inLanguage: t.meta.locale,
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: brand.name,
        item: `${SITE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: brand.product,
        item: `${SITE_URL}/${locale}#product`,
      },
    ],
  };

  return (
    <>
      <Script data={product} />
      <Script data={faq} />
      <Script data={breadcrumb} />
    </>
  );
}

/** Article + Breadcrumb for a single blog post. */
export function ArticleJsonLd({
  locale,
  articleKey,
}: {
  locale: Locale;
  articleKey: ArticleKey;
}) {
  const t = getDict(locale);
  const article = getArticle(locale, articleKey);
  const alt = articleAlternates(articleKey);

  const post = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}${article.href}#article`,
    headline: article.title,
    description: article.metaDescription,
    inLanguage: t.meta.locale,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${article.href}` },
    image: `${SITE_URL}${article.href}/opengraph-image`,
    datePublished: CONTENT_PUBLISHED_AT,
    dateModified: CONTENT_PUBLISHED_AT,
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    about: { "@id": `${SITE_URL}/${locale}#product` },
    articleSection: t.articles.indexTitle,
    keywords: article.keywords.join(", "),
    timeRequired: `PT${article.minutes}M`,
    isAccessibleForFree: true,
    // Slugs differ per locale, so list the counterpart explicitly.
    workTranslation: Object.entries(alt)
      .filter(([code]) => code !== locale)
      .map(([, href]) => `${SITE_URL}${href}`),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t.articles.home,
        item: `${SITE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t.articles.indexTitle,
        item: `${SITE_URL}/${locale}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${SITE_URL}${article.href}`,
      },
    ],
  };

  return (
    <>
      <Script data={post} />
      <Script data={breadcrumb} />
    </>
  );
}

/** ItemList of every article, for the blog index. */
export function BlogIndexJsonLd({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const articles = getArticles(locale);

  const list = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/${locale}/blog#collection`,
    name: t.articles.indexMetaTitle,
    description: t.articles.indexMetaDescription,
    inLanguage: t.meta.locale,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((a, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: a.title,
        url: `${SITE_URL}${a.href}`,
      })),
    },
  };

  return <Script data={list} />;
}
