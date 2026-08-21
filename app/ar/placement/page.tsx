import type { Metadata } from "next"
import { PlacementScreen } from "@/components/placement-screen"
import { buildPageMetadata } from "@/lib/seo"

export const dynamic = "force-dynamic"

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("placement", "ar")
}

export default async function ArabicPlacementPage({
  searchParams,
}: {
  searchParams?: Promise<{
    score?: string
    total?: string
    level?: string
    name?: string
    error?: string
  }>
}) {
  return <PlacementScreen locale="ar" searchParams={searchParams} />
}
