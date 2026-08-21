"use client"

import { Moon, Sun } from "lucide-react"
import { useTransition } from "react"
import { setTheme } from "@/app/actions/theme"
import type { Theme } from "@/lib/theme"
import { cn } from "@/lib/utils"

export function ThemeToggle({
  theme,
  locale = "en",
  variant = "header",
}: {
  theme: Theme
  locale?: "en" | "ar"
  variant?: "header" | "float"
}) {
  const [pending, start] = useTransition()
  const ar = locale === "ar"

  function choose(next: Theme) {
    if (next === theme || pending) return
    start(() => setTheme(next))
  }

  if (variant === "float") {
    const next = theme === "dark" ? "light" : "dark"
    const label =
      theme === "dark"
        ? ar
          ? "التبديل إلى الوضع الفاتح"
          : "Switch to light mode"
        : ar
          ? "التبديل إلى الوضع الداكن"
          : "Switch to dark mode"
    return (
      <button
        type="button"
        onClick={() => choose(next)}
        disabled={pending}
        aria-label={label}
        className="group float-safe-stack fixed start-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-navy/95 text-gold shadow-xl shadow-navy/40 backdrop-blur-md transition hover:scale-105 hover:bg-gold hover:text-navy lg:hidden"
      >
        {theme === "dark" ? (
          <Sun size={18} className="transition-transform duration-300 group-hover:rotate-45" />
        ) : (
          <Moon size={18} className="transition-transform duration-300 group-hover:-rotate-12" />
        )}
      </button>
    )
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-gold/40 p-0.5 shadow-inner shadow-black/20",
        theme === "light" ? "bg-navy/5" : "bg-white/5",
      )}
      role="group"
      aria-label={ar ? "تغيير المظهر" : "Switch color theme"}
    >
      <button
        type="button"
        onClick={() => choose("light")}
        disabled={pending}
        aria-label={ar ? "الوضع الفاتح" : "Light mode"}
        aria-pressed={theme === "light"}
        title="Light"
        className={cn(
          "rounded-full p-2 transition sm:p-1.5",
          theme === "light"
            ? "bg-gold text-navy shadow-sm"
            : "text-white/70 hover:text-gold",
        )}
      >
        <Sun size={15} strokeWidth={2.25} />
      </button>
      <button
        type="button"
        onClick={() => choose("dark")}
        disabled={pending}
        aria-label={ar ? "الوضع الداكن" : "Dark mode"}
        aria-pressed={theme === "dark"}
        title="Dark"
        className={cn(
          "rounded-full p-2 transition sm:p-1.5",
          theme === "dark"
            ? "bg-gold text-navy shadow-sm"
            : "text-navy/50 hover:text-gold",
        )}
      >
        <Moon size={15} strokeWidth={2.25} />
      </button>
    </div>
  )
}
