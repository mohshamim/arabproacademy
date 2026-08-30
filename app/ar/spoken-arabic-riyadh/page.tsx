import type { Metadata } from "next"
import { SeoLanding } from "@/components/seo-landing"
import { buildPageMetadata } from "@/lib/seo"

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("spokenArabicRiyadh", "ar")
}

export default function ArabicSpokenArabicRiyadhPage() {
  return <SeoLanding slug="spoken-arabic-riyadh" locale="ar" />
}
