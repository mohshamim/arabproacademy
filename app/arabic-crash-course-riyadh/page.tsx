import type { Metadata } from "next"
import { SeoLanding } from "@/components/seo-landing"
import { buildPageMetadata } from "@/lib/seo"

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("crashCourse", "en")
}

export default function ArabicCrashCoursePage() {
  return <SeoLanding slug="arabic-crash-course-riyadh" locale="en" />
}
