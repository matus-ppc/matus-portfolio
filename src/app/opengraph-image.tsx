import { ImageResponse } from "next/og";

export const alt = "Matúš Baranec – PPC Špecialista";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            fontSize: 120,
            fontFamily: "serif",
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          MATÚŠ.
        </div>
        <div
          style={{
            fontSize: 28,
            fontFamily: "sans-serif",
            fontWeight: 600,
            color: "#888888",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          PPC Špecialista
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
