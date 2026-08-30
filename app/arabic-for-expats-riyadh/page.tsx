import type { Metadata } from "next"
import { SeoLanding } from "@/components/seo-landing"
import { buildPageMetadata } from "@/lib/seo"

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("expatsRiyadh", "en")
}

export default function ArabicForExpatsPage() {
  return <SeoLanding slug="arabic-for-expats-riyadh" locale="en" />
}
