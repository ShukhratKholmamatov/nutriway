import Image from "next/image";
import { Check, Droplets, Sparkles, Bone } from "lucide-react";
import type { Dict } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

const SUPPORT_ICONS = [Droplets, Sparkles, Bone];

export function Product({ t }: { t: Dict }) {
  return (
    <section id="product" className="relative bg-bone-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16">
          {/* Product photography */}
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <div className="overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-lift)] ring-1 ring-wine-800/10">
                <Image
                  src="/product/collagen.jpg"
                  alt={`${t.product.title} — ${t.product.specs[0].value}, ${t.product.specs[2].value}`}
                  width={1024}
                  height={1280}
                  sizes="(max-width: 1024px) 92vw, 46vw"
                  className="h-auto w-full object-cover"
                />
              </div>
            </Reveal>

            {/* Spec table sits directly under the pack */}
            <Reveal i={1}>
              <div className="mt-8">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-600">
                  {t.product.specsTitle}
                </h3>
                <dl className="mt-5 divide-y divide-wine-800/10 border-y border-wine-800/10">
                  {t.product.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex flex-wrap items-baseline justify-between gap-2 py-3.5"
                    >
                      <dt className="text-sm text-ink-500">{spec.label}</dt>
                      <dd className="text-right text-sm font-semibold text-wine-900">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>

          {/* Product copy */}
          <div>
            <SectionHeading
              eyebrow={t.product.eyebrow}
              title={t.product.title}
              lead={t.product.lead}
            />

            <ul className="mt-10 grid gap-3 sm:grid-cols-3">
              {t.product.supports.map((s, i) => {
                const Icon = SUPPORT_ICONS[i] ?? Sparkles;
                return (
                  <Reveal as="li" key={s.title} i={i}>
                    <div className="h-full rounded-[var(--radius-lg)] border border-wine-800/12 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-[var(--shadow-lift)]">
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-wine-800 text-gold-300">
                        <Icon size={20} strokeWidth={1.8} aria-hidden />
                      </span>
                      <h3 className="mt-4 font-display text-base text-wine-900">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                        {s.text}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </ul>

            <Reveal i={1}>
              <div className="mt-10 rounded-[var(--radius-lg)] bg-wine-800 p-7 text-bone-100 shadow-[var(--shadow-lift)] sm:p-8">
                <h3 className="font-display text-2xl text-bone-50">
                  {t.product.whyTitle}
                </h3>
                <ul className="mt-6 space-y-4">
                  {t.product.why.map((item) => (
                    <li key={item} className="flex items-start gap-3.5">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-gold-500/60 text-gold-400">
                        <Check size={13} strokeWidth={3} aria-hidden />
                      </span>
                      <span className="text-sm leading-relaxed text-bone-100/90">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <ButtonLink
                  href="#lead-form"
                  variant="gold"
                  size="lg"
                  className="mt-8 w-full sm:w-auto"
                >
                  {t.product.cta}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
