import { Info } from "lucide-react";
import type { Dict } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CapsuleMotif } from "@/components/ui/Motifs";

export function Usage({ t }: { t: Dict }) {
  return (
    <section id="usage" className="relative overflow-hidden bg-bone-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow={t.usage.eyebrow}
              title={t.usage.title}
              lead={t.usage.lead}
            />

            {/* A 28-day course, one cell per day. The gold builds up across
                the grid to mirror the copy: collagen works cumulatively. */}
            <Reveal i={2}>
              <div className="relative mt-9 overflow-hidden rounded-[var(--radius-xl)] bg-wine-900 p-8 shadow-[var(--shadow-lift)] sm:p-9">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-display text-2xl leading-tight text-bone-50">
                    {t.usage.courseTitle}
                  </p>
                  <CapsuleMotif className="w-12 shrink-0 rotate-[-14deg]" />
                </div>

                <div aria-hidden className="mt-8 grid grid-cols-7 gap-1.5">
                  {Array.from({ length: 28 }, (_, i) => {
                    const filled = 0.16 + (i / 27) * 0.84;
                    return (
                      <span
                        key={i}
                        className="aspect-square rounded-[5px] border border-gold-500/25"
                        style={{
                          backgroundColor: `rgba(193, 144, 74, ${filled.toFixed(2)})`,
                        }}
                      />
                    );
                  })}
                </div>

                <div className="mt-6 flex items-baseline justify-between gap-4 border-t border-bone-50/12 pt-5">
                  <span className="font-display text-3xl text-gold-300">28</span>
                  <p className="text-right text-xs leading-relaxed text-bone-200/70">
                    {t.usage.courseNote}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Numbered timeline */}
          <ol className="relative space-y-4 lg:pl-4">
            <span
              aria-hidden
              className="absolute left-[38px] top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-gold-500/60 via-wine-800/20 to-transparent lg:block"
            />
            {t.usage.steps.map((step, i) => (
              <Reveal as="li" key={step.step} i={i}>
                <div className="group relative flex gap-5 rounded-[var(--radius-lg)] border border-wine-800/10 bg-white p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-[var(--shadow-lift)] sm:p-7">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-wine-800 font-display text-xl text-gold-300 transition-transform duration-300 group-hover:scale-105">
                    {step.step}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-xl text-wine-900">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">
                      {step.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal as="li" i={4}>
              <div className="mt-2 flex items-start gap-3.5 rounded-[var(--radius-md)] border border-gold-500/35 bg-gold-100/50 p-5">
                <Info
                  size={19}
                  className="mt-0.5 shrink-0 text-gold-700"
                  aria-hidden
                />
                <p className="text-[13px] leading-relaxed text-ink-700">
                  {t.usage.note}
                </p>
              </div>
            </Reveal>
          </ol>
        </div>
      </div>
    </section>
  );
}
