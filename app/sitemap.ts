import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"

const pages = [
  "/",
  "/spoken-arabic-riyadh",
  "/arabic-crash-course-riyadh",
  "/learn-arabic-fast",
  "/arabic-for-expats-riyadh",
  "/online-arabic-saudi-gcc",
  "/placement",
  "/privacy",
  "/terms",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return pages.map((path) => {
    const en = path === "/" ? SITE_URL : `${SITE_URL}${path}`
    const ar = path === "/" ? `${SITE_URL}/ar` : `${SITE_URL}/ar${path}`
    return {
      url: en,
      lastModified,
      changeFrequency: path === "/" ? "weekly" : path.startsWith("/p") ? "monthly" : "weekly",
      priority:
        path === "/"
          ? 1
          : path === "/privacy" || path === "/terms"
            ? 0.3
            : path === "/placement"
              ? 0.7
              : 0.85,
      alternates: {
        languages: {
          en: en,
          "en-SA": en,
          "en-IN": en,
          ar: ar,
        },
      },
    }
  })
}
