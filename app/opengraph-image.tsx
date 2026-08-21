import { ImageResponse } from "next/og"

export const alt =
  "Arab Pro Academy — Spoken Arabic classes in Riyadh for expats and non-native speakers"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "#0d1b2a",
          padding: "72px 80px",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#c4962a",
            fontSize: 22,
            letterSpacing: 3,
            fontWeight: 700,
          }}
        >
          RIYADH · SAUDI ARABIA · ONLINE ACROSS GCC & INDIA
        </div>
        <div
          style={{
            display: "flex",
            color: "#ffffff",
            fontSize: 62,
            fontWeight: 800,
            lineHeight: 1.1,
            marginTop: 24,
            maxWidth: 980,
          }}
        >
          Spoken Arabic for non-native speakers
        </div>
        <div
          style={{
            display: "flex",
            color: "#e8c66b",
            fontSize: 32,
            marginTop: 20,
          }}
        >
          Master conversation in 3 months
        </div>
        <div
          style={{
            display: "flex",
            color: "#9ca3af",
            fontSize: 22,
            marginTop: 36,
          }}
        >
          In-person in Riyadh · Live online for Indian & GCC expats
        </div>
      </div>
    ),
    { ...size },
  )
}
