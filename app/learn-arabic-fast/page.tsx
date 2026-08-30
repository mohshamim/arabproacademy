import type { Metadata } from "next"
import { SeoLanding } from "@/components/seo-landing"
import { buildPageMetadata } from "@/lib/seo"

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("learnFast", "en")
}

export default function LearnArabicFastPage() {
  return <SeoLanding slug="learn-arabic-fast" locale="en" />
}
