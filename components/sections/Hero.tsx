"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowDown, ShieldCheck, Sparkles } from "lucide-react";
import type { Dict } from "@/lib/content";
import { RingsMotif } from "@/components/ui/Motifs";

export function Hero({ t }: { t: Dict }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Gentle parallax: the pack drifts slower than the copy.
  const artY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "16%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-8%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.15]);

  return (
    <section
      ref={ref}
      className="grain relative isolate overflow-hidden bg-wine-950 pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-28"
    >
      {/* Ambient light */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 75% 10%, rgba(193,144,74,0.22) 0%, transparent 55%), radial-gradient(90% 70% at 10% 90%, rgba(160,71,99,0.28) 0%, transparent 60%)",
        }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:px-8">
        <motion.div style={{ y: copyY, opacity: fade }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-[11px] font-bold uppercase tracking-[0.42em] text-gold-400"
          >
            {t.hero.eyebrow}
          </motion.p>

          <h1 className="mt-6 font-display text-[clamp(2.8rem,9vw,5.5rem)] leading-[0.92] text-bone-50">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {t.hero.title}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="text-gold-gradient block"
            >
              {t.hero.titleAccent}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-bone-200/80 sm:mt-7 sm:text-lg"
          >
            {t.hero.lead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row"
          >
            <a
              href="#lead-form"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-gold-500 px-8 font-semibold text-wine-950 shadow-[var(--shadow-lift)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-gold-400 active:translate-y-0"
            >
              <Sparkles size={18} aria-hidden />
              {t.hero.ctaPrimary}
            </a>
            <a
              href="#product"
              className="inline-flex h-14 items-center justify-center rounded-[var(--radius-md)] border border-bone-50/25 px-8 font-semibold text-bone-100 transition-all duration-200 hover:-translate-y-0.5 hover:border-bone-50/60 hover:bg-bone-50/8 active:translate-y-0"
            >
              {t.hero.ctaSecondary}
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-9 grid max-w-lg grid-cols-3 gap-4 border-t border-bone-50/15 pt-7 sm:mt-12 sm:gap-6 sm:pt-8"
          >
            {t.hero.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-3xl text-gold-300 sm:text-4xl">
                    {s.value}
                  </span>
                  <span className="mt-1.5 block text-xs leading-snug text-bone-200/65">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Product photography, floating over the vector motifs */}
        <motion.div style={{ y: artY }} className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 grid place-items-center">
            <RingsMotif className="w-[130%] max-w-none opacity-70" />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/15 blur-3xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            // Narrower than the column so the floating cards sit clear of it.
            className="relative mx-auto max-w-[22rem]"
          >
            <div className="animate-float-slow">
              <Image
                src="/product/pill.png"
                alt={`${t.product.title} — ${t.product.specs[0].value}, ${t.product.specs[2].value}`}
                width={433}
                height={577}
                priority
                sizes="(max-width: 1024px) 80vw, 22rem"
                className="h-auto w-full drop-shadow-[0_28px_40px_rgba(36,10,16,0.55)]"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              // Centred beneath the pack so it never crosses the label.
              className="glass-dark absolute -bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-[var(--radius-md)] border border-gold-500/35 px-4 py-3 shadow-[var(--shadow-lift)]"
            >
              <ShieldCheck size={22} className="text-gold-400" aria-hidden />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-bone-50">
                {t.hero.badge}
              </span>
            </motion.div>

          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#benefits"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="mx-auto mt-16 hidden w-fit flex-col items-center gap-2 text-bone-200/50 transition-colors hover:text-gold-300 lg:flex"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em]">
          {t.hero.scroll}
        </span>
        <motion.span
          animate={reduce ? undefined : { y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={18} aria-hidden />
        </motion.span>
      </motion.a>
    </section>
  );
}
