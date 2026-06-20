import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const runtime = "edge";
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column",
          justifyContent: "center", padding: "80px",
          background: "linear-gradient(135deg, #070a12 0%, #0d1830 45%, #102a26 100%)",
          color: "#eef1f7", fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 6, color: "#56d4c4", textTransform: "uppercase" }}>
          {site.role}
        </div>
        <div style={{ display: "flex", fontSize: 110, fontWeight: 700, marginTop: 16, lineHeight: 1 }}>
          S. Nithiesh
        </div>
        <div style={{ display: "flex", fontSize: 30, marginTop: 28, color: "#8b93a7", maxWidth: 900 }}>
          Building intelligent, data-driven systems — Gen AI · ML · RAG.
        </div>
        <div style={{ display: "flex", marginTop: 50, fontSize: 22, color: "#56d4c4" }}>
          github.com/SNithiesh
        </div>
      </div>
    ),
    { ...size }
  );
}
