import { ImageResponse } from "next/og";
import { getContent, type Locale } from "@/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = getContent(locale as Locale);
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0b0f19",
          color: "#e5e7eb",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700 }}>{c.hero.name}</div>
        <div style={{ fontSize: 36, marginTop: 12 }}>{c.hero.title}</div>
        <div style={{ fontSize: 28, marginTop: 24, color: "#94a3b8" }}>{c.hero.tagline}</div>
      </div>
    ),
    size
  );
}
