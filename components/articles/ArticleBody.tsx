import {
  Waves,
  Zap,
  Gem,
  FlaskConical,
  BadgeCheck,
  Anchor,
  Check,
  X,
  Info,
  Fish,
  Citrus,
  Egg,
  Beef,
  Nut,
  GlassWater,
} from "lucide-react";
import type { Dict } from "@/lib/content";
import type { ArticleKey } from "@/lib/articles";
import { CourseGrid } from "@/components/ui/CourseGrid";

/* ---------- shared prose primitives ---------- */

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-14 font-display text-2xl leading-snug text-wine-900 sm:text-3xl">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-[17px] leading-[1.75] text-ink-700">{children}</p>
  );
}

function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-lg leading-[1.7] text-ink-500 sm:text-xl">{children}</p>
  );
}

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-5 inline-grid h-12 w-12 place-items-center rounded-full bg-wine-800 text-gold-300">
      {children}
    </span>
  );
}

function Callout({
  tone = "gold",
  children,
}: {
  tone?: "gold" | "note";
  children: React.ReactNode;
}) {
  const gold = tone === "gold";
  return (
    <div
      className={
        gold
          ? "mt-6 flex items-start gap-3.5 rounded-[var(--radius-md)] border border-gold-500/40 bg-gold-100/60 p-5"
          : "mt-10 flex items-start gap-3.5 rounded-[var(--radius-md)] border border-wine-800/15 bg-bone-100 p-5"
      }
    >
      <span
        className={
          gold
            ? "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold-500 text-wine-950"
            : "mt-0.5 shrink-0 text-ink-500"
        }
      >
        {gold ? <Check size={15} strokeWidth={3} aria-hidden /> : <Info size={19} aria-hidden />}
      </span>
      <p
        className={
          gold
            ? "text-[15px] font-semibold leading-relaxed text-wine-900"
            : "text-[13px] leading-relaxed text-ink-500"
        }
      >
        {children}
      </p>
    </div>
  );
}

/* ---------- bodies ---------- */

const SCIENCE_ICONS = [Waves, Zap, Gem, FlaskConical];
const QUALITY_ICONS = [FlaskConical, BadgeCheck, Anchor];

function ScienceBody({ t }: { t: Dict }) {
  return (
    <>
      <Lead>{t.science.lead}</Lead>

      {t.science.cards.map((card, i) => {
        const Icon = SCIENCE_ICONS[i] ?? Waves;
        return (
          <section key={card.title}>
            <H2>{card.title}</H2>
            <div className="mt-5">
              <IconBadge>
                <Icon size={22} strokeWidth={1.7} aria-hidden />
              </IconBadge>
            </div>
            <P>{card.text}</P>
          </section>
        );
      })}

      <section>
        <H2>{t.science.qualityTitle}</H2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {t.science.quality.map((q, i) => {
            const Icon = QUALITY_ICONS[i] ?? BadgeCheck;
            return (
              <li
                key={q}
                className="flex items-center gap-3.5 rounded-[var(--radius-md)] border border-wine-800/12 bg-white p-4"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-wine-800 text-gold-300">
                  <Icon size={18} strokeWidth={1.8} aria-hidden />
                </span>
                <span className="text-sm font-semibold leading-snug text-wine-900">
                  {q}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

function UsageBody({ t }: { t: Dict }) {
  return (
    <>
      <Lead>{t.usage.lead}</Lead>

      <div className="mt-10 overflow-hidden rounded-[var(--radius-xl)] bg-wine-900 p-8">
        <CourseGrid t={t} />
      </div>

      {t.usage.steps.map((step) => (
        <section key={step.step}>
          <H2>
            <span className="mr-3 text-gold-600">{step.step}</span>
            {step.title}
          </H2>
          <P>{step.text}</P>
        </section>
      ))}

      <Callout tone="note">{t.usage.note}</Callout>
    </>
  );
}

function MistakesBody({ t }: { t: Dict }) {
  return (
    <>
      <Lead>{t.mistakes.lead}</Lead>

      {t.mistakes.items.map((item) => (
        <section key={item.n}>
          <H2>
            <span className="mr-3 inline-grid h-8 w-8 translate-y-1 place-items-center rounded-full bg-wine-800 text-sm text-bone-50">
              <X size={15} strokeWidth={3} aria-hidden />
            </span>
            {t.mistakes.label} № {item.n}: {item.title}
          </H2>
          <P>{item.text}</P>
          <Callout>{item.fix}</Callout>
        </section>
      ))}
    </>
  );
}

const FOOD_ICONS = [Fish, Citrus, Egg, Beef, Nut, GlassWater];

function FoodsBody({ t }: { t: Dict }) {
  return (
    <>
      <Lead>{t.foods.lead}</Lead>

      {t.foods.items.map((item, i) => {
        const Icon = FOOD_ICONS[i] ?? Fish;
        return (
          <section key={item.title}>
            <H2>{item.title}</H2>
            <div className="mt-5">
              <IconBadge>
                <Icon size={22} strokeWidth={1.7} aria-hidden />
              </IconBadge>
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-gold-600">
              {item.subtitle}
            </p>
            <P>{item.text}</P>
          </section>
        );
      })}
    </>
  );
}

export function ArticleBody({ articleKey, t }: { articleKey: ArticleKey; t: Dict }) {
  switch (articleKey) {
    case "science":
      return <ScienceBody t={t} />;
    case "usage":
      return <UsageBody t={t} />;
    case "mistakes":
      return <MistakesBody t={t} />;
    case "foods":
      return <FoodsBody t={t} />;
  }
}
