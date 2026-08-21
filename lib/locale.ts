import { cookies } from "next/headers"

export type Locale = "en" | "ar"

export const LOCALE_COOKIE = "apa_locale"

export async function getLocale(): Promise<Locale> {
  const store = await cookies()
  const value = store.get(LOCALE_COOKIE)?.value
  return value === "ar" ? "ar" : "en"
}

export function isRtl(locale: Locale) {
  return locale === "ar"
}
