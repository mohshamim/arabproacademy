import type { Metadata } from "next"
import { HomePage } from "@/components/home-page"
import { buildPageMetadata } from "@/lib/seo"

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("home", "ar")
}

export default function ArabicHome() {
  return <HomePage locale="ar" />
}
