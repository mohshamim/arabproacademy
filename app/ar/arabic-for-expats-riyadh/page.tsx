import type { Metadata } from "next"
import { SeoLanding } from "@/components/seo-landing"
import { buildPageMetadata } from "@/lib/seo"

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("expatsRiyadh", "ar")
}

export default function ArabicForExpatsArPage() {
  return <SeoLanding slug="arabic-for-expats-riyadh" locale="ar" />
}
