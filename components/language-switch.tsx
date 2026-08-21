"use client"

import { usePathname } from "next/navigation"
import { useTransition } from "react"
import { setLocale } from "@/app/actions/locale"
import type { Locale } from "@/lib/locale"
import type { Theme } from "@/lib/theme"
import { cn } from "@/lib/utils"

export function LanguageSwitch({
  locale,
  theme = "dark",
  variant = "header",
}: {
  locale: Locale
  theme?: Theme
  variant?: "header" | "float"
}) {
  const [pending, start] = useTransition()
  const pathname = usePathname() || "/"

  function choose(next: Locale) {
    if (next === locale || pending) return
    start(() => setLocale(next, pathname))
  }

  if (variant === "float") {
    return (
      <div
        className="float-safe fixed start-4 z-50 flex lg:hidden"
        role="group"
        aria-label={locale === "ar" ? "تغيير اللغة" : "Switch language"}
      >
        <div className="flex overflow-hidden rounded-full border border-gold/50 bg-navy/95 shadow-xl shadow-navy/40 backdrop-blur-md">
          <button
            type="button"
            onClick={() => choose("en")}
            className={cn(
              "px-3.5 py-2.5 text-xs font-bold tracking-wide",
              locale === "en" ? "bg-gold text-navy" : "text-white/70",
            )}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => choose("ar")}
            className={cn(
              "font-kufi px-3.5 py-2.5 text-sm font-bold",
              locale === "ar" ? "bg-gold text-navy" : "text-white/70",
            )}
          >
            ع
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-gold/40 p-0.5 shadow-inner shadow-black/20",
        theme === "light" ? "bg-navy/5" : "bg-white/5",
      )}
      role="group"
      aria-label={locale === "ar" ? "تغيير اللغة" : "Switch language"}
    >
      <button
        type="button"
        onClick={() => choose("en")}
        disabled={pending}
        className={cn(
          "rounded-full px-3 py-1.5 text-[11px] font-bold tracking-wider transition",
          locale === "en"
            ? "bg-gold text-navy shadow-sm"
            : theme === "light"
              ? "text-navy/55 hover:text-gold"
              : "text-white/70 hover:text-gold",
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => choose("ar")}
        disabled={pending}
        className={cn(
          "font-kufi rounded-full px-3 py-1.5 text-xs font-bold transition",
          locale === "ar"
            ? "bg-gold text-navy shadow-sm"
            : theme === "light"
              ? "text-navy/55 hover:text-gold"
              : "text-white/70 hover:text-gold",
        )}
      >
        العربية
      </button>
    </div>
  )
}
