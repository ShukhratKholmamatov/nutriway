import type { Dict } from "@/lib/content";

export function Marquee({ t }: { t: Dict }) {
  const words = [
    t.science.quality[0],
    t.product.specs[2].value,
    t.science.quality[1],
    t.hero.badge,
    t.science.quality[2],
    t.product.specs[0].value,
  ];

  // Duplicated once so the -50% translate loops seamlessly.
  const track = [...words, ...words];

  return (
    <div
      aria-hidden
      className="overflow-hidden border-y border-wine-800/12 bg-bone-200/60 py-4"
    >
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {track.map((word, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-wine-800/70">
              {word}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
          </span>
        ))}
      </div>
    </div>
  );
}
