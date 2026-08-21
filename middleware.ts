import NextAuth from "next-auth"
import { NextResponse } from "next/server"
import { authConfig } from "./auth.config"

const { auth } = NextAuth(authConfig)
const LOCALE_COOKIE = "apa_locale"

function withLocaleCookie(headerValue: string | null, locale: "en" | "ar") {
  const parts = (headerValue || "")
    .split(";")
    .map((part) => part.trim())
    .filter((part) => part && !part.startsWith(`${LOCALE_COOKIE}=`))
  parts.push(`${LOCALE_COOKIE}=${locale}`)
  return parts.join("; ")
}

export default auth((req) => {
  const { pathname } = req.nextUrl

  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next")
  ) {
    return
  }

  const locale = pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "en"
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set("x-apa-locale", locale)
  requestHeaders.set("x-locale", locale)
  requestHeaders.set("x-apa-path", pathname)
  requestHeaders.set("cookie", withLocaleCookie(req.headers.get("cookie"), locale))

  const res = NextResponse.next({
    request: { headers: requestHeaders },
  })
  res.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  })
  return res
})

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt)$).*)",
  ],
}
