import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NUTRIWAY NATURAL — NATURFLEX COLLAGEN",
    short_name: "NUTRIWAY",
    description:
      "NATURFLEX COLLAGEN — gidrolizlangan dengiz kollageni / гидролизованный морской коллаген.",
    start_url: "/",
    display: "standalone",
    background_color: "#fdfbf7",
    theme_color: "#491522",
    lang: "uz",
    categories: ["health", "shopping", "lifestyle"],
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
