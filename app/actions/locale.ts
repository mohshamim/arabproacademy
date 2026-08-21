"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { LOCALE_COOKIE, type Locale } from "@/lib/locale"

export async function setLocale(locale: Locale, path = "/") {
  const store = await cookies()
  const next = locale === "ar" ? "ar" : "en"
  store.set(LOCALE_COOKIE, next, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  })
  revalidatePath("/", "layout")

  const clean = path.replace(/^\/ar(?=\/|$)/, "") || "/"
  const dest =
    next === "ar" ? (clean === "/" ? "/ar" : `/ar${clean}`) : clean
  redirect(dest)
}
