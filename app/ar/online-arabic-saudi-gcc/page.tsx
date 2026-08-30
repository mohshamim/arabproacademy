import type { Metadata } from "next"
import { SeoLanding } from "@/components/seo-landing"
import { buildPageMetadata } from "@/lib/seo"

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("onlineGcc", "ar")
}

export default function OnlineArabicGccArPage() {
  return <SeoLanding slug="online-arabic-saudi-gcc" locale="ar" />
}
