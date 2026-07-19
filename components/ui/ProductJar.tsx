import { cn } from "@/lib/cn";

/**
 * Vector rendering of the NATURFLEX pack. Drawn rather than photographed so
 * every label is real, selectable, crisp text at any size.
 */
export function ProductJar({
  className,
  capsules = "90",
  capsulesLabel,
}: {
  className?: string;
  capsules?: string;
  capsulesLabel?: string;
}) {
  return (
    <svg
      viewBox="0 0 300 420"
      role="img"
      aria-label="NATURFLEX COLLAGEN — NUTRIWAY NATURAL"
      className={cn("h-auto w-full", className)}
    >
      <defs>
        <linearGradient id="jarBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3a1019" />
          <stop offset="18%" stopColor="#6a2540" />
          <stop offset="50%" stopColor="#83324c" />
          <stop offset="82%" stopColor="#491522" />
          <stop offset="100%" stopColor="#240a10" />
        </linearGradient>

        <linearGradient id="jarCap" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7f5a2f" />
          <stop offset="20%" stopColor="#e3c286" />
          <stop offset="45%" stopColor="#f8efdc" />
          <stop offset="70%" stopColor="#d4a95f" />
          <stop offset="100%" stopColor="#a3743a" />
        </linearGradient>

        <linearGradient id="glassSheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fdfbf7" stopOpacity="0.32" />
          <stop offset="35%" stopColor="#fdfbf7" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#fdfbf7" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="goldRule" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c1904a" stopOpacity="0" />
          <stop offset="50%" stopColor="#e3c286" />
          <stop offset="100%" stopColor="#c1904a" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Shadow pooled under the pack */}
      <ellipse cx="150" cy="404" rx="96" ry="12" fill="#240a10" opacity="0.28" />

      {/* Cap */}
      <rect x="62" y="16" width="176" height="34" rx="8" fill="url(#jarCap)" />
      <rect x="62" y="44" width="176" height="9" rx="3" fill="#7f5a2f" opacity="0.55" />

      {/* Body */}
      <rect x="54" y="53" width="192" height="332" rx="14" fill="url(#jarBody)" />

      {/* Glass highlight */}
      <rect x="54" y="53" width="52" height="332" rx="14" fill="url(#glassSheen)" />

      {/* Logo mark */}
      <g transform="translate(150 96)" fill="none" stroke="#e3c286" strokeWidth="2.4">
        <path d="M-15 8 L0 -10 L15 8 Z" strokeLinejoin="round" />
        <path d="M0 -10 L0 12" strokeLinecap="round" />
      </g>

      {/* Wordmark */}
      <text
        x="150"
        y="132"
        textAnchor="middle"
        fill="#fdfbf7"
        fontSize="19"
        letterSpacing="3.6"
        fontFamily="var(--font-display), Georgia, serif"
      >
        NUTRIWAY
      </text>
      <text
        x="150"
        y="148"
        textAnchor="middle"
        fill="#c1904a"
        fontSize="8"
        letterSpacing="4.6"
        fontFamily="var(--font-sans), sans-serif"
      >
        NATURAL
      </text>

      <rect x="86" y="164" width="128" height="1" fill="url(#goldRule)" />

      {/* Product name */}
      <text
        x="150"
        y="204"
        textAnchor="middle"
        fill="#fdfbf7"
        fontSize="27"
        letterSpacing="1.4"
        fontFamily="var(--font-display), Georgia, serif"
      >
        NATURFLEX
      </text>
      <text
        x="150"
        y="230"
        textAnchor="middle"
        fill="#efdcb4"
        fontSize="19"
        letterSpacing="6.2"
        fontFamily="var(--font-sans), sans-serif"
      >
        COLLAGEN
      </text>

      {/* Quality badge */}
      <rect
        x="76"
        y="250"
        width="148"
        height="26"
        rx="13"
        fill="none"
        stroke="#c1904a"
        strokeWidth="1.2"
      />
      <text
        x="150"
        y="267"
        textAnchor="middle"
        fill="#e3c286"
        fontSize="9.5"
        letterSpacing="2.6"
        fontFamily="var(--font-sans), sans-serif"
      >
        PREMIUM QUALITY
      </text>

      {/* Capsule count seal */}
      <circle cx="150" cy="322" r="33" fill="none" stroke="#c1904a" strokeWidth="1.2" opacity="0.75" />
      <text
        x="150"
        y="318"
        textAnchor="middle"
        fill="#fdfbf7"
        fontSize="26"
        fontFamily="var(--font-display), Georgia, serif"
      >
        {capsules}
      </text>
      <text
        x="150"
        y="335"
        textAnchor="middle"
        fill="#efdcb4"
        fontSize="7.5"
        letterSpacing="1.8"
        fontFamily="var(--font-sans), sans-serif"
      >
        {(capsulesLabel ?? "CAPSULES").toUpperCase()}
      </text>
    </svg>
  );
}
