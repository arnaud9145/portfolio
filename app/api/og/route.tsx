import { ImageResponse } from "next/og";

export const contentType = "image/png";

// Served at /api/og — excluded from the next-intl middleware matcher (api|_next|
// _vercel|*.*), so social scrapers get a direct 200 with no /fr locale redirect.
// One shared branded card for both locales.
export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: "#0a0a0b",
          color: "#ece6d8",
        }}
      >
        <div style={{ width: 68, height: 4, background: "#c9a227", marginBottom: 40 }} />
        <div style={{ fontSize: 78, fontWeight: 700, color: "#f5efe0", letterSpacing: -1 }}>
          Arnaud Dufour
        </div>
        <div style={{ fontSize: 40, marginTop: 16, color: "#e6c866" }}>
          Senior React Native Engineer
        </div>
        <div style={{ fontSize: 28, marginTop: 30, color: "#9a948a" }}>
          React Native since 2018 · Ex-CTO &amp; co-founder · AI-Native
        </div>
        <div style={{ fontSize: 24, marginTop: 44, color: "#6b6560" }}>arnaud.dufour.build</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
