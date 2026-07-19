import { ImageResponse } from "next/og";
import { getDict } from "@/lib/content";
import { isLocale } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "NATURFLEX COLLAGEN — NUTRIWAY NATURAL";

/** Social preview, drawn from brand tokens rather than a photograph. */
export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getDict(isLocale(locale) ? locale : "uz");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 80px",
          background:
            "radial-gradient(120% 80% at 78% 8%, #6a2540 0%, #240a10 58%)",
          color: "#fdfbf7",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 10,
            color: "#c1904a",
            fontWeight: 700,
          }}
        >
          NUTRIWAY NATURAL
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 96,
            fontWeight: 800,
            lineHeight: 1,
          }}
        >
          NATURFLEX
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 8,
            fontSize: 78,
            fontWeight: 700,
            letterSpacing: 14,
            color: "#e3c286",
          }}
        >
          COLLAGEN
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 34,
            width: 180,
            height: 4,
            background: "#c1904a",
          }}
        />

        <div
          style={{
            display: "flex",
            marginTop: 34,
            fontSize: 30,
            color: "rgba(253,251,247,0.78)",
            maxWidth: 900,
            lineHeight: 1.35,
          }}
        >
          {t.hero.lead}
        </div>

        <div style={{ display: "flex", marginTop: 44, gap: 56 }}>
          {t.hero.stats.map((s) => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 52, fontWeight: 800, color: "#e3c286" }}>
                {s.value}
              </span>
              <span
                style={{
                  fontSize: 21,
                  color: "rgba(253,251,247,0.6)",
                  marginTop: 6,
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
