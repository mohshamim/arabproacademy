import { prismaReady, hasDatabaseUrl } from "@/lib/prisma"
import { EMAIL, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_NUMBER } from "@/lib/content"

export type SiteContactSettings = {
  phone: string
  phoneDisplay: string
  email: string
  whatsapp: string
  location: string
  websiteUrl: string
}

export type SiteStatsSettings = {
  students: string
  successRate: string
  duration: string
  locationLabel: string
}

export const DEFAULT_CONTACT: SiteContactSettings = {
  phone: PHONE_HREF.replace("tel:", ""),
  phoneDisplay: PHONE_DISPLAY,
  email: EMAIL,
  whatsapp: WHATSAPP_NUMBER,
  location: "Riyadh, Saudi Arabia",
  websiteUrl: "",
}

export const DEFAULT_STATS: SiteStatsSettings = {
  students: "80+",
  successRate: "98%",
  duration: "3 Months",
  locationLabel: "Riyadh",
}

async function getJsonSetting<T>(key: string, fallback: T): Promise<T> {
  if (!hasDatabaseUrl()) return fallback
  try {
    const prisma = await prismaReady()
    const row = await prisma.siteSetting.findUnique({ where: { key } })
    if (!row?.value) return fallback
    return { ...fallback, ...(row.value as object) } as T
  } catch {
    return fallback
  }
}

export async function getContactSettings() {
  return getJsonSetting("contact", DEFAULT_CONTACT)
}

export async function getStatsSettings() {
  return getJsonSetting("stats", DEFAULT_STATS)
}

export async function upsertSetting(key: string, value: unknown) {
  const prisma = await prismaReady()
  const json = value as object
  await prisma.siteSetting.upsert({
    where: { key },
    update: { value: json },
    create: { key, value: json },
  })
}

export function whatsappDeepLink(waNumber: string, text?: string) {
  const digits = waNumber.replace(/\D/g, "")
  const q = text ? `?text=${encodeURIComponent(text)}` : ""
  return `https://wa.me/${digits}${q}`
}
