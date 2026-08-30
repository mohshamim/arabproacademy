import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Arab Pro Academy — Spoken Arabic in Riyadh",
    short_name: "Arab Pro",
    description:
      "Spoken Arabic classes in Riyadh and live online for non-native speakers, Indian expats, and GCC professionals.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d1b2a",
    theme_color: "#0d1b2a",
    lang: "en",
    dir: "ltr",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png", purpose: "any" },
    ],
  }
}
