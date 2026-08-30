import type { Locale } from "@/lib/locale"

export function localizedPath(path: string, locale: Locale) {
  if (
    !path ||
    path.startsWith("#") ||
    path.startsWith("http") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:")
  ) {
    return path
  }
  const clean = path.startsWith("/") ? path : `/${path}`
  if (locale !== "ar") return clean
  if (clean === "/") return "/ar"
  return `/ar${clean}`
}

/** Section hash that still works from inner pages (`/#pricing`, `/ar#pricing`). */
export function homeHash(hash: string, locale: Locale) {
  const id = hash.startsWith("#") ? hash : `#${hash}`
  return `${localizedPath("/", locale)}${id}`
}
