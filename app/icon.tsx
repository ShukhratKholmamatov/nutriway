import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

/** Favicon / PWA icon: the brand mark on the wine field. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#491522",
        }}
      >
        <svg width="330" height="330" viewBox="0 0 100 100" fill="none">
          <path
            d="M20 68 L50 20 L80 68 Z"
            stroke="#c1904a"
            strokeWidth="8"
            strokeLinejoin="round"
          />
          <path
            d="M50 20 L50 84"
            stroke="#c1904a"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    size
  );
}
