import type { Dict } from "@/lib/content";
import { CapsuleMotif } from "@/components/ui/Motifs";

/**
 * A 28-day course, one cell per day. The gold builds across the grid to
 * mirror the copy: collagen works cumulatively, not overnight.
 */
export function CourseGrid({ t }: { t: Dict }) {
  return (
    <>
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
    </>
  );
}
