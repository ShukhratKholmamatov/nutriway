"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Check } from "lucide-react";
import type { Dict } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HelixMotif } from "@/components/ui/Motifs";
import { cn } from "@/lib/cn";

export function Mistakes({ t }: { t: Dict }) {
  const [active, setActive] = useState(0);
  const items = t.mistakes.items;
  const current = items[active];

  return (
    <section
      id="mistakes"
      className="grain relative overflow-hidden bg-wine-950 py-20 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-0 h-[34rem] w-[34rem] rounded-full bg-wine-500/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow={t.mistakes.eyebrow}
          title={t.mistakes.title}
          lead={t.mistakes.lead}
          tone="dark"
          align="center"
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[auto_1fr] lg:gap-12">
          {/* Tab list */}
          <div
            role="tablist"
            aria-label={t.mistakes.title}
            className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {items.map((item, i) => {
              const selected = i === active;
              return (
                <button
                  key={item.n}
                  role="tab"
                  id={`mistake-tab-${i}`}
                  aria-selected={selected}
                  aria-controls={`mistake-panel-${i}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                      e.preventDefault();
                      const next = (i + 1) % items.length;
                      setActive(next);
                      document.getElementById(`mistake-tab-${next}`)?.focus();
                    }
                    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                      e.preventDefault();
                      const prev = (i - 1 + items.length) % items.length;
                      setActive(prev);
                      document.getElementById(`mistake-tab-${prev}`)?.focus();
                    }
                  }}
                  className={cn(
                    "group relative flex shrink-0 items-center gap-3.5 rounded-[var(--radius-md)] border px-5 py-4 text-left transition-all duration-300 lg:w-72",
                    selected
                      ? "border-gold-500/60 bg-bone-50/10 text-bone-50"
                      : "border-bone-50/12 text-bone-200/60 hover:border-bone-50/30 hover:text-bone-100"
                  )}
                >
                  <span
                    className={cn(
                      "grid h-9 w-9 shrink-0 place-items-center rounded-full font-display text-sm transition-colors duration-300",
                      selected
                        ? "bg-gold-500 text-wine-950"
                        : "bg-bone-50/10 text-bone-200/70"
                    )}
                  >
                    {item.n}
                  </span>
                  <span className="text-sm font-semibold leading-snug">
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              role="tabpanel"
              id={`mistake-panel-${active}`}
              aria-labelledby={`mistake-tab-${active}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-[var(--radius-xl)] border border-bone-50/12 bg-bone-50/[0.04] p-7 shadow-[var(--shadow-deep)] sm:p-10"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-6 top-0 h-full opacity-30"
              >
                <HelixMotif />
              </div>

              {/* Oversized index */}
              <span
                aria-hidden
                className="pointer-events-none absolute -bottom-10 right-6 font-display text-[11rem] leading-none text-bone-50/[0.04]"
              >
                {current.n}
              </span>

              <span className="relative inline-flex items-center gap-2.5 rounded-full bg-wine-500/25 px-3.5 py-1.5">
                <X size={14} className="text-wine-200" strokeWidth={3} aria-hidden />
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-wine-100">
                  {t.mistakes.label} № {current.n}
                </span>
              </span>

              <h3 className="relative mt-5 max-w-xl font-display text-2xl leading-tight text-bone-50 sm:text-4xl">
                {current.title}
              </h3>

              <p className="relative mt-5 max-w-xl text-[15px] leading-relaxed text-bone-200/80">
                {current.text}
              </p>

              <div className="relative mt-9 flex max-w-xl items-start gap-3.5 rounded-[var(--radius-md)] border border-gold-500/35 bg-gold-500/10 p-5">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold-500 text-wine-950">
                  <Check size={15} strokeWidth={3} aria-hidden />
                </span>
                <p className="text-sm font-semibold leading-relaxed text-gold-200">
                  {current.fix}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
