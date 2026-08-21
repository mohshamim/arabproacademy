import NextAuth from "next-auth"
import { NextResponse } from "next/server"
import { authConfig } from "./auth.config"

const { auth } = NextAuth(authConfig)
const LOCALE_COOKIE = "apa_locale"

export default auth((req) => {
  const { pathname } = req.nextUrl

  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next")
  ) {
    return
  }

  const isAr = pathname === "/ar" || pathname.startsWith("/ar/")
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set("x-locale", isAr ? "ar" : "en")

  if (isAr) {
    const url = req.nextUrl.clone()
    url.pathname = pathname.replace(/^\/ar/, "") || "/"
    const res = NextResponse.rewrite(url, {
      request: { headers: requestHeaders },
    })
    res.cookies.set(LOCALE_COOKIE, "ar", {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    })
    return res
  }

  return NextResponse.next({
    request: { headers: requestHeaders },
  })
})

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt)$).*)",
  ],
}
