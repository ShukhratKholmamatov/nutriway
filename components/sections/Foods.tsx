import { Fish, Citrus, Egg, Beef, Nut, GlassWater } from "lucide-react";
import type { Dict } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const ICONS = [Fish, Citrus, Egg, Beef, Nut, GlassWater];

export function Foods({ t }: { t: Dict }) {
  return (
    <section id="foods" className="relative bg-bone-100 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow={t.foods.eyebrow}
          title={t.foods.title}
          lead={t.foods.lead}
          align="center"
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.foods.items.map((item, i) => {
            const Icon = ICONS[i] ?? Fish;
            return (
              <Reveal as="li" key={item.title} i={i}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] bg-white p-7 shadow-[var(--shadow-soft)] transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]">
                  {/* Gold wash that fills in on hover */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-gold-500 to-gold-300 transition-transform duration-400 group-hover:scale-x-100"
                  />

                  <span className="grid h-14 w-14 place-items-center rounded-full bg-wine-800 text-gold-300 transition-transform duration-300 group-hover:scale-110">
                    <Icon size={24} strokeWidth={1.7} aria-hidden />
                  </span>

                  <h3 className="mt-6 font-display text-xl text-wine-900">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-semibold text-gold-600">
                    {item.subtitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500">
                    {item.text}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
