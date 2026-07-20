import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin } from "lucide-react";
import { getArticles } from "@/lib/articles";
import { InstagramIcon, TelegramIcon } from "@/components/ui/BrandIcons";
import type { Dict } from "@/lib/content";
import { brand, locations, phones, social, type Locale } from "@/lib/site";

export function Footer({ locale, t }: { locale: Locale; t: Dict }) {
  const year = new Date().getFullYear();

  // Product pages plus every article, so the footer carries real internal links.
  const links = [
    { label: t.nav.product, href: `/${locale}#product` },
    { label: t.nav.benefits, href: `/${locale}#benefits` },
    ...getArticles(locale).map((a) => ({ label: a.title, href: a.href })),
    { label: t.nav.faq, href: `/${locale}#faq` },
  ];

  return (
    <footer className="relative overflow-hidden bg-wine-950 text-bone-200">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src={brand.logo}
                alt=""
                width={52}
                height={52}
                className="rounded-[var(--radius-sm)]"
              />
              <span className="leading-none">
                <span className="block font-display text-xl font-semibold tracking-[0.14em] text-bone-50">
                  {brand.name}
                </span>
                <span className="mt-1 block text-[9px] font-semibold tracking-[0.32em] text-gold-400">
                  NATURAL
                </span>
              </span>
            </div>

            <p className="mt-6 max-w-sm font-display text-2xl leading-snug text-bone-100">
              {t.footer.tagline}
            </p>

            <div className="mt-7 flex gap-3">
              <SocialLink href={social.telegram} label="Telegram">
                <TelegramIcon size={18} />
              </SocialLink>
              <SocialLink href={social.instagram} label="Instagram">
                <InstagramIcon size={18} />
              </SocialLink>
            </div>
          </div>

          <nav aria-label={t.footer.nav}>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-400">
              {t.footer.nav}
            </h3>
            <ul className="mt-6 space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block py-2 text-sm leading-snug text-bone-200/75 transition-colors hover:text-gold-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-400">
              {t.footer.contact}
            </h3>
            <ul className="mt-6 space-y-4">
              {phones.map((p) => (
                <li key={p.tel}>
                  <a
                    href={`tel:${p.tel}`}
                    className="flex items-center gap-3 py-2 text-sm text-bone-100 transition-colors hover:text-gold-300"
                  >
                    <Phone size={16} className="text-gold-500" aria-hidden />
                    {p.label}
                  </a>
                </li>
              ))}
              {locations.map((loc) => (
                <li
                  key={loc.id}
                  className="flex items-start gap-3 text-sm text-bone-200/75"
                >
                  <MapPin
                    size={16}
                    className="mt-0.5 shrink-0 text-gold-500"
                    aria-hidden
                  />
                  <span>
                    {loc.city[locale]}, {loc.street[locale]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-bone-50/10 pt-8">
          <p className="max-w-3xl text-xs leading-relaxed text-bone-200/55">
            {t.footer.disclaimer}
          </p>
          <p className="mt-4 text-xs text-bone-200/45">
            © {year} {brand.legalName}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-[var(--radius-sm)] border border-bone-50/15 text-bone-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-gold-500 hover:bg-gold-500 hover:text-wine-950"
    >
      {children}
    </a>
  );
}
