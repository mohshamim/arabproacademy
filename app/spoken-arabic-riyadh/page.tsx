import type { Metadata } from "next"
import { SeoLanding } from "@/components/seo-landing"
import { buildPageMetadata } from "@/lib/seo"

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("spokenArabicRiyadh", "en")
}

export default function SpokenArabicRiyadhPage() {
  return <SeoLanding slug="spoken-arabic-riyadh" locale="en" />
}
