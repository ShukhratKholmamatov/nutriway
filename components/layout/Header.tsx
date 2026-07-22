"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Phone } from "lucide-react";
import type { Dict } from "@/lib/content";
import { articleAlternates, findArticleKey } from "@/lib/articles";
import { brand, primaryPhone, type Locale } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Article slugs are localised, so switching language on a post cannot be a
 * simple prefix swap — that would 404. Map through the article key instead.
 */
function swapLocale(pathname: string, from: Locale, to: Locale) {
  const match = pathname.match(/^\/(?:uz|ru)\/blog\/([^/]+)\/?$/);
  if (match) {
    const key = findArticleKey(from, match[1]);
    if (key) return articleAlternates(key)[to];
  }
  return pathname.replace(new RegExp(`^/${from}`), `/${to}`) || `/${to}`;
}

/**
 * Anchors are absolute (`/uz#product`) so the same header works on article
 * pages, where those sections do not exist.
 */
function buildNav(locale: Locale, t: Dict) {
  return [
    { label: t.nav.product, href: `/${locale}#product` },
    { label: t.nav.benefits, href: `/${locale}#benefits` },
    { label: t.articles.indexTitle, href: `/${locale}/blog` },
    { label: t.nav.faq, href: `/${locale}#faq` },
    { label: t.nav.contacts, href: `/${locale}#contacts` },
  ];
}

/**
 * Which pages open with a dark hero behind the header. The landing page does,
 * and every article starts with a dark title block — but the blog index is
 * light, so an inverted header would be unreadable there.
 */
function hasDarkHero(pathname: string) {
  return (
    /^\/(?:uz|ru)\/?$/.test(pathname) ||
    /^\/(?:uz|ru)\/blog\/[^/]+\/?$/.test(pathname)
  );
}

export function Header({ locale, t }: { locale: Locale; t: Dict }) {
  const nav = buildNav(locale, t);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Solid (glass surface, dark text) whenever we're scrolled or the page top
  // is light. Otherwise the header sits over a dark hero and inverts.
  const solid = scrolled || !hasDarkHero(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const otherLocale: Locale = locale === "uz" ? "ru" : "uz";

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          solid
            ? "glass border-b border-wine-800/10 py-2 shadow-[var(--shadow-soft)]"
            : "border-b border-transparent py-4"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
          <Link
            href={`/${locale}`}
            onClick={() => setOpen(false)}
            className="flex shrink-0 items-center gap-3"
            aria-label={brand.legalName}
          >
            <Image
              src={brand.logo}
              alt=""
              width={44}
              height={44}
              priority
              className="rounded-[var(--radius-sm)] shadow-[var(--shadow-soft)]"
            />
            <span className="hidden leading-none sm:block">
              <span
                className={cn(
                  "block font-display text-lg font-semibold tracking-[0.14em] transition-colors",
                  solid ? "text-wine-800" : "text-bone-50"
                )}
              >
                {brand.name}
              </span>
              <span
                className={cn(
                  "mt-0.5 block text-[9px] font-semibold tracking-[0.32em] transition-colors",
                  solid ? "text-gold-600" : "text-gold-400"
                )}
              >
                NATURAL
              </span>
            </span>
          </Link>

          <nav
            aria-label={t.nav.menu}
            className="hidden items-center gap-1 xl:flex"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "whitespace-nowrap rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium transition-colors",
                  solid
                    ? "text-ink-700 hover:bg-wine-800/8 hover:text-wine-800"
                    : "text-bone-100/85 hover:bg-bone-50/12 hover:text-bone-50"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LocaleSwitch
              locale={locale}
              other={otherLocale}
              t={t}
              solid={solid}
              onNavigate={() => setOpen(false)}
            />

            <a
              href={`tel:${primaryPhone.tel}`}
              className={cn(
                "hidden items-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] px-3 py-2 text-[13px] font-semibold transition-colors 2xl:inline-flex",
                solid
                  ? "text-wine-800 hover:bg-wine-800/8"
                  : "text-bone-100 hover:bg-bone-50/12"
              )}
            >
              <Phone size={15} strokeWidth={2.2} aria-hidden />
              {primaryPhone.label}
            </a>

            <a
              href={`/${locale}#lead-form`}
              className={cn(
                "hidden h-11 items-center whitespace-nowrap rounded-[var(--radius-md)] px-5 text-sm font-semibold shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] sm:inline-flex",
                solid
                  ? "bg-wine-800 text-bone-50 hover:bg-wine-700"
                  : "bg-gold-500 text-wine-950 hover:bg-gold-400"
              )}
            >
              {t.nav.cta}
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? t.nav.close : t.nav.menu}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className={cn(
                "grid h-11 w-11 place-items-center rounded-[var(--radius-sm)] transition-colors xl:hidden",
                // The open drawer is dark, so the button stays light over it.
                solid && !open
                  ? "text-wine-800 hover:bg-wine-800/8"
                  : "text-bone-50 hover:bg-bone-50/12"
              )}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-wine-950/95 pt-24 backdrop-blur-lg xl:hidden"
          >
            <nav
              aria-label={t.nav.menu}
              className="mx-auto flex max-w-lg flex-col gap-1 px-6"
            >
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.045 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-bone-50/10 py-4 font-display text-2xl text-bone-100 transition-colors hover:text-gold-300"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.a
                href={`/${locale}#lead-form`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mt-6 grid h-14 place-items-center rounded-[var(--radius-md)] bg-gold-500 font-semibold text-wine-950"
              >
                {t.nav.cta}
              </motion.a>

              <motion.a
                href={`tel:${primaryPhone.tel}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-3 flex items-center justify-center gap-2 py-3 text-bone-200"
              >
                <Phone size={16} aria-hidden />
                {primaryPhone.label}
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LocaleSwitch({
  locale,
  other,
  t,
  solid,
  onNavigate,
}: {
  locale: Locale;
  other: Locale;
  t: Dict;
  solid: boolean;
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const target = swapLocale(pathname, locale, other);

  return (
    <div
      className={cn(
        "flex items-center rounded-[var(--radius-sm)] border p-0.5 transition-colors",
        solid ? "border-wine-800/15" : "border-bone-50/25"
      )}
      role="group"
      aria-label={t.common.langLabel}
    >
      <span
        aria-current="true"
        className={cn(
          "rounded-[6px] px-2.5 py-1.5 text-xs font-bold uppercase transition-colors",
          solid
            ? "bg-wine-800 text-bone-50"
            : "bg-gold-500 text-wine-950"
        )}
      >
        {locale}
      </span>
      <Link
        href={target}
        hrefLang={other}
        onClick={onNavigate}
        aria-label={other === "uz" ? t.common.uz : t.common.ru}
        className={cn(
          "rounded-[6px] px-2.5 py-1.5 text-xs font-bold uppercase transition-colors",
          solid
            ? "text-ink-500 hover:bg-wine-800/8 hover:text-wine-800"
            : "text-bone-100/80 hover:bg-bone-50/12 hover:text-bone-50"
        )}
      >
        {other}
      </Link>
    </div>
  );
}
