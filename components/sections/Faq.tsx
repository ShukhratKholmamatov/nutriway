"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import type { Dict } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

export function Faq({ t }: { t: Dict }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-bone-50 py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-5 lg:px-8">
        <SectionHeading
          eyebrow={t.faq.eyebrow}
          title={t.faq.title}
          lead={t.faq.lead}
          align="center"
        />

        <div className="mt-14 divide-y divide-wine-800/12 border-y border-wine-800/12">
          {t.faq.items.map((item, i) => {
            const expanded = open === i;
            return (
              <Reveal key={item.q} i={Math.min(i, 4)}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`faq-answer-${i}`}
                    onClick={() => setOpen(expanded ? null : i)}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-wine-700"
                  >
                    <span
                      className={cn(
                        "font-display text-lg leading-snug transition-colors sm:text-xl",
                        expanded ? "text-wine-800" : "text-wine-900"
                      )}
                    >
                      {item.q}
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300",
                        expanded
                          ? "rotate-45 border-gold-500 bg-gold-500 text-wine-950"
                          : "border-wine-800/25 text-wine-800"
                      )}
                    >
                      <Plus size={17} strokeWidth={2.4} aria-hidden />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {expanded && (
                    <motion.div
                      id={`faq-answer-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 pr-14 text-[15px] leading-relaxed text-ink-500">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
