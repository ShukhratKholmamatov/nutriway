import { cn } from "@/lib/cn";

/**
 * Decorative vector motifs used in place of photography. All are aria-hidden —
 * they carry no information, only texture.
 */

/** Triple-helix strand, echoing collagen's structure. */
export function HelixMotif({ className }: { className?: string }) {
  const strand = (offset: number) =>
    Array.from({ length: 9 }, (_, i) => {
      const y = i * 46;
      return `${i === 0 ? "M" : "S"} ${offset + (i % 2 === 0 ? 46 : -46)} ${
        y + 23
      } ${offset} ${y + 46}`;
    }).join(" ");

  return (
    <svg
      viewBox="0 0 220 414"
      aria-hidden
      className={cn("h-full w-auto", className)}
      fill="none"
    >
      <path d={`M 60 0 ${strand(60)}`} stroke="#c1904a" strokeWidth="1.6" opacity="0.55" />
      <path d={`M 110 0 ${strand(110)}`} stroke="#c1904a" strokeWidth="1.6" opacity="0.35" />
      <path d={`M 160 0 ${strand(160)}`} stroke="#c1904a" strokeWidth="1.6" opacity="0.2" />
      {Array.from({ length: 9 }, (_, i) => (
        <circle key={i} cx={110} cy={i * 46 + 12} r="2.6" fill="#e3c286" opacity="0.5" />
      ))}
    </svg>
  );
}

/** Concentric rings — used as a soft focal point behind headings. */
export function RingsMotif({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" aria-hidden className={cn("h-auto w-full", className)} fill="none">
      {[190, 152, 114, 76, 38].map((r, i) => (
        <circle
          key={r}
          cx="200"
          cy="200"
          r={r}
          stroke="#c1904a"
          strokeWidth="1"
          opacity={0.06 + i * 0.045}
        />
      ))}
    </svg>
  );
}

/**
 * A two-piece gelatin capsule. The caller sets the width — no `w-full`
 * default, which would win the cascade over a passed-in width utility.
 */
export function CapsuleMotif({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 26" aria-hidden className={cn("h-auto", className)}>
      <defs>
        {/* Body half — lighter */}
        <linearGradient id="capsuleBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8efdc" />
          <stop offset="45%" stopColor="#e3c286" />
          <stop offset="100%" stopColor="#a3743a" />
        </linearGradient>
        {/* Cap half — deeper, so the joint is legible */}
        <linearGradient id="capsuleCap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e3c286" />
          <stop offset="45%" stopColor="#c1904a" />
          <stop offset="100%" stopColor="#7f5a2f" />
        </linearGradient>
      </defs>

      {/* Body (left) */}
      <path
        d="M13 1 H36 V25 H13 A12 12 0 0 1 13 1 Z"
        fill="url(#capsuleBody)"
      />
      {/* Cap (right), slightly taller where it sleeves over the body */}
      <path
        d="M34 0.4 H51 A12.6 12.6 0 0 1 51 25.6 H34 Z"
        fill="url(#capsuleCap)"
      />
      {/* Joint shadow */}
      <rect x="33.4" y="0.4" width="1.6" height="25.2" fill="#7f5a2f" opacity="0.45" />
      {/* Specular highlight along the top */}
      <path
        d="M15 6 H49"
        stroke="#fdfbf7"
        strokeWidth="2.6"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

/** Wave lines, referencing the marine origin. */
export function WaveMotif({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 120" aria-hidden className={cn("h-auto w-full", className)} fill="none">
      {[0, 26, 52, 78].map((y, i) => (
        <path
          key={y}
          d={`M0 ${20 + y} C 60 ${4 + y}, 110 ${36 + y}, 170 ${20 + y} S 280 ${4 + y}, 340 ${20 + y} S 400 ${28 + y}, 400 ${20 + y}`}
          stroke="#c1904a"
          strokeWidth="1.4"
          opacity={0.5 - i * 0.1}
        />
      ))}
    </svg>
  );
}
