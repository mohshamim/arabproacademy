import { cookies } from "next/headers"

export type Theme = "dark" | "light"

export const THEME_COOKIE = "apa_theme"

export async function getTheme(): Promise<Theme> {
  const store = await cookies()
  const value = store.get(THEME_COOKIE)?.value
  return value === "light" ? "light" : "dark"
}
