import { Smile, Sparkles, Scissors, Bone } from "lucide-react";
import type { Dict } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { HelixMotif } from "@/components/ui/Motifs";

const ICONS = [Sparkles, Smile, Scissors, Bone];

export function Benefits({ t }: { t: Dict }) {
  return (
    <section
      id="benefits"
      className="grain relative overflow-hidden bg-wine-900 py-20 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/4 h-[30rem] w-[30rem] rounded-full bg-gold-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow={t.framework.eyebrow}
              title={t.framework.title}
              lead={t.framework.lead}
              tone="dark"
            />

            <ul className="mt-12 space-y-3">
              {t.framework.items.map((item, i) => {
                const Icon = ICONS[i] ?? Sparkles;
                return (
                  <Reveal as="li" key={item.title} i={i}>
                    <div className="group flex items-start gap-5 rounded-[var(--radius-lg)] border border-bone-50/10 bg-bone-50/[0.04] p-5 transition-all duration-300 hover:border-gold-500/40 hover:bg-bone-50/[0.07]">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold-500/40 text-gold-400 transition-transform duration-300 group-hover:scale-110">
                        <Icon size={22} strokeWidth={1.7} aria-hidden />
                      </span>
                      <span>
                        <span className="block font-display text-lg text-bone-50">
                          {item.title}
                        </span>
                        <span className="mt-1.5 block text-sm leading-relaxed text-bone-200/70">
                          {item.text}
                        </span>
                      </span>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          </div>

          {/* Typographic focal panel in place of a photograph */}
          <Reveal i={2} className="relative">
            <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-gold-500/20 bg-gradient-to-br from-wine-950 via-wine-900 to-wine-950 p-10 shadow-[var(--shadow-deep)] sm:p-14">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-6 top-0 h-full opacity-45"
              >
                <HelixMotif />
              </div>

              <p className="relative text-[11px] font-bold uppercase tracking-[0.32em] text-gold-400">
                {t.product.specs[0].label}
              </p>
              <p className="relative mt-6 font-display text-3xl leading-tight text-bone-50 sm:text-4xl">
                {t.product.specs[0].value}
              </p>
              <div aria-hidden className="rule-gold relative mt-8 h-px w-28" />

              <dl className="relative mt-10 grid grid-cols-2 gap-x-6 gap-y-8">
                {t.hero.stats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <span className="block font-display text-4xl text-gold-300">
                        {s.value}
                      </span>
                      <span className="mt-2 block text-xs leading-snug text-bone-200/65">
                        {s.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
