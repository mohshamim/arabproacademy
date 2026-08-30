import type { Metadata } from "next"
import { SeoLanding } from "@/components/seo-landing"
import { buildPageMetadata } from "@/lib/seo"

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("learnFast", "ar")
}

export default function LearnArabicFastArPage() {
  return <SeoLanding slug="learn-arabic-fast" locale="ar" />
}
