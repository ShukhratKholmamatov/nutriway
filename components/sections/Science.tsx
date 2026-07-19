import { Waves, Zap, Gem, FlaskConical, BadgeCheck, Anchor } from "lucide-react";
import type { Dict } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { WaveMotif, HelixMotif } from "@/components/ui/Motifs";

const CARD_ICONS = [Waves, Zap, Gem, FlaskConical];
const QUALITY_ICONS = [FlaskConical, BadgeCheck, Anchor];

export function Science({ t }: { t: Dict }) {
  return (
    <section
      id="science"
      className="relative overflow-hidden bg-bone-100 py-20 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 opacity-40"
      >
        <WaveMotif />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow={t.science.eyebrow}
          title={t.science.title}
          lead={t.science.lead}
          align="center"
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.science.cards.map((card, i) => {
            const Icon = CARD_ICONS[i] ?? Waves;
            return (
              <Reveal key={card.title} i={i}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] bg-white p-7 shadow-[var(--shadow-soft)] transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]">
                  {/* Oversized index, purely decorative */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-2 -top-4 font-display text-8xl text-wine-800/[0.05] transition-colors duration-400 group-hover:text-gold-500/15"
                  >
                    {i + 1}
                  </span>

                  <span className="relative grid h-14 w-14 place-items-center rounded-full bg-wine-800 text-gold-300 transition-transform duration-300 group-hover:scale-110">
                    <Icon size={24} strokeWidth={1.7} aria-hidden />
                  </span>

                  <h3 className="relative mt-6 font-display text-xl leading-snug text-wine-900">
                    {card.title}
                  </h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-ink-500">
                    {card.text}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Quality criteria */}
        <Reveal i={1}>
          <div className="relative mt-14 overflow-hidden rounded-[var(--radius-xl)] bg-wine-800 p-8 shadow-[var(--shadow-lift)] sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-4 top-0 h-full opacity-35"
            >
              <HelixMotif />
            </div>

            <h3 className="relative font-display text-2xl text-bone-50 sm:text-3xl">
              {t.science.qualityTitle}
            </h3>

            <ul className="relative mt-9 grid gap-5 sm:grid-cols-3">
              {t.science.quality.map((q, i) => {
                const Icon = QUALITY_ICONS[i] ?? BadgeCheck;
                return (
                  <li
                    key={q}
                    className="flex items-center gap-4 rounded-[var(--radius-md)] border border-bone-50/12 bg-bone-50/[0.05] p-5"
                  >
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold-500/45 text-gold-400">
                      <Icon size={21} strokeWidth={1.7} aria-hidden />
                    </span>
                    <span className="text-sm font-semibold uppercase leading-snug tracking-[0.1em] text-bone-100">
                      {q}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
