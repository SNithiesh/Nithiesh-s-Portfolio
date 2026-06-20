import { ImageResponse } from "next/og";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";
export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center",
        background: "#070a12", color: "#56d4c4", fontSize: 40, fontFamily: "serif", borderRadius: 14 }}>
        N
      </div>
    ), { ...size }
  );
}
