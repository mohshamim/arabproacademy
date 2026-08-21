import { cookies, headers } from "next/headers"

export type Locale = "en" | "ar"

export const LOCALE_COOKIE = "apa_locale"
export const LOCALE_HEADER = "x-apa-locale"

function localeFromPath(path: string): Locale | null {
  const pathname = path.split("?")[0] || "/"
  if (pathname === "/ar" || pathname.startsWith("/ar/")) return "ar"
  return null
}

export async function getLocale(): Promise<Locale> {
  const h = await headers()
  const fromHeader = h.get(LOCALE_HEADER) || h.get("x-locale")
  if (fromHeader === "ar" || fromHeader === "en") return fromHeader

  const fromPath =
    localeFromPath(h.get("x-apa-path") || "") ||
    localeFromPath(h.get("x-invoke-path") || "") ||
    localeFromPath(h.get("next-url") || "") ||
    localeFromPath(h.get("x-url") || "")
  if (fromPath) return fromPath

  const store = await cookies()
  const value = store.get(LOCALE_COOKIE)?.value
  return value === "ar" ? "ar" : "en"
}

export function isRtl(locale: Locale) {
  return locale === "ar"
}
