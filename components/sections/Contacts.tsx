import { Phone, MapPin, Clock, ExternalLink } from "lucide-react";
import { InstagramIcon, TelegramIcon } from "@/components/ui/BrandIcons";
import type { Dict } from "@/lib/content";
import { locations, mapEmbedUrl, phones, social, type Locale } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { LeadForm } from "./LeadForm";

export function Contacts({ t, locale }: { t: Dict; locale: Locale }) {
  return (
    <section
      id="contacts"
      className="relative overflow-hidden bg-bone-100 py-20 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow={t.contacts.eyebrow}
          title={t.contacts.title}
          lead={t.contacts.lead}
          align="center"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          {/* Contact details */}
          <div className="space-y-8">
            <Reveal>
              <div className="rounded-[var(--radius-lg)] border border-wine-800/12 bg-white p-7 shadow-[var(--shadow-soft)]">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-600">
                  {t.contacts.phonesTitle}
                </h3>
                <ul className="mt-5 space-y-4">
                  {phones.map((p) => (
                    <li key={p.tel}>
                      <a
                        href={`tel:${p.tel}`}
                        className="group flex items-center gap-4"
                      >
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-wine-800 text-gold-300 transition-transform duration-300 group-hover:scale-110">
                          <Phone size={19} strokeWidth={1.9} aria-hidden />
                        </span>
                        <span>
                          <span className="block font-display text-lg text-wine-900 transition-colors group-hover:text-wine-700">
                            {p.label}
                          </span>
                          <span className="text-xs text-ink-500">
                            {t.contacts.roles[p.role] ?? p.role}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal i={1}>
              <div className="rounded-[var(--radius-lg)] border border-wine-800/12 bg-white p-7 shadow-[var(--shadow-soft)]">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-600">
                  {t.contacts.locationsTitle}
                </h3>
                <ul className="mt-5 space-y-6">
                  {locations.map((loc) => (
                    <li key={loc.id} className="flex gap-4">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-wine-800/20 text-wine-800">
                        <MapPin size={19} strokeWidth={1.9} aria-hidden />
                      </span>
                      <div className="min-w-0">
                        <p className="font-display text-base text-wine-900">
                          {loc.title[locale]}
                        </p>
                        <p className="mt-1 text-sm text-ink-500">
                          {loc.city[locale]}, {loc.street[locale]}
                        </p>
                        <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-500">
                          <Clock size={13} aria-hidden />
                          <span className="sr-only">
                            {t.contacts.hoursLabel}:
                          </span>
                          {loc.hours}
                        </p>
                        <a
                          href={loc.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1.5 inline-flex items-center gap-1.5 py-2 text-xs font-semibold text-wine-700 underline-offset-4 transition-colors hover:text-gold-600 hover:underline"
                        >
                          {t.contacts.mapLink}
                          <ExternalLink size={12} aria-hidden />
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Keyless Google Maps embed — no API key needed. */}
                <div className="mt-6 overflow-hidden rounded-[var(--radius-md)] border border-wine-800/12">
                  <iframe
                    src={mapEmbedUrl(locations[0].geo, locale)}
                    title={t.contacts.mapTitle}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="block h-64 w-full border-0 sm:h-72"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal i={2}>
              <div className="rounded-[var(--radius-lg)] border border-wine-800/12 bg-white p-7 shadow-[var(--shadow-soft)]">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-600">
                  {t.contacts.socialTitle}
                </h3>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Social href={social.telegram} label="Telegram">
                    <TelegramIcon size={17} />
                    Telegram
                  </Social>
                  <Social href={social.instagram} label="Instagram">
                    <InstagramIcon size={17} />
                    Instagram
                  </Social>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Lead form */}
          <Reveal i={1}>
            <LeadForm t={t} locale={locale} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Social({
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
      className="inline-flex items-center gap-2.5 rounded-[var(--radius-sm)] border border-wine-800/20 px-4 py-2.5 text-sm font-semibold text-wine-800 transition-all duration-200 hover:-translate-y-0.5 hover:border-wine-800 hover:bg-wine-800 hover:text-bone-50"
    >
      {children}
    </a>
  );
}
