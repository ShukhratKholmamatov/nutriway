import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

/**
 * Shared social-card layout. Drawn from brand tokens — the site ships no
 * photography, so every preview image is generated.
 */
export function renderOgCard({
  eyebrow,
  title,
  subtitle,
  footer,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  footer?: string;
}) {
  // Long article titles need to step down a size to stay on the card.
  const titleSize = title.length > 70 ? 54 : title.length > 45 ? 66 : 82;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 76px",
          background:
            "radial-gradient(120% 80% at 78% 8%, #6a2540 0%, #240a10 58%)",
          color: "#fdfbf7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 21,
              letterSpacing: 9,
              color: "#c1904a",
              fontWeight: 700,
            }}
          >
            {eyebrow.toUpperCase()}
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 30,
              fontSize: titleSize,
              fontWeight: 800,
              lineHeight: 1.08,
              maxWidth: 1040,
            }}
          >
            {title}
          </div>

          {subtitle ? (
            <div
              style={{
                display: "flex",
                marginTop: 26,
                fontSize: 27,
                lineHeight: 1.4,
                color: "rgba(253,251,247,0.72)",
                maxWidth: 960,
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid rgba(193,144,74,0.45)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: 6 }}>
              NUTRIWAY
            </span>
            <span
              style={{
                fontSize: 15,
                letterSpacing: 7,
                color: "#c1904a",
                marginTop: 5,
              }}
            >
              NATURAL
            </span>
          </div>
          {footer ? (
            <span style={{ fontSize: 22, color: "rgba(253,251,247,0.6)" }}>
              {footer}
            </span>
          ) : null}
        </div>
      </div>
    ),
    OG_SIZE
  );
}
