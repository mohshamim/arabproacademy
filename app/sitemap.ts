import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/seo"

const pages = ["/", "/placement", "/privacy", "/terms"]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return pages.map((path) => {
    const en = path === "/" ? SITE_URL : `${SITE_URL}${path}`
    const ar = path === "/" ? `${SITE_URL}/ar` : `${SITE_URL}/ar${path}`
    return {
      url: en,
      lastModified,
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority: path === "/" ? 1 : 0.7,
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
