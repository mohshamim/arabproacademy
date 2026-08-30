"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Menu, Phone, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { LanguageSwitch } from "@/components/language-switch"
import { ThemeToggle } from "@/components/theme-toggle"
import { LOGO_SRC, PHONE_DISPLAY, PHONE_HREF } from "@/lib/content"
import { getCopy } from "@/lib/copy"
import type { Locale } from "@/lib/locale"
import type { Theme } from "@/lib/theme"
import { homeHash, localizedPath } from "@/lib/paths"
import { cn } from "@/lib/utils"

export function Navbar({
  phoneDisplay = PHONE_DISPLAY,
  phoneHref = PHONE_HREF,
  locale = "en",
  theme = "dark",
  inner = false,
}: {
  phoneDisplay?: string
  phoneHref?: string
  locale?: Locale
  theme?: Theme
  inner?: boolean
}) {
  const t = getCopy(locale)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const section = (hash: string) => (inner ? homeHash(hash, locale) : hash)

  const links = [
    { label: t.nav.about, href: section("#why") },
    { label: t.nav.courses, href: section("#courses") },
    { label: t.nav.online, href: section("#online") },
    { label: t.nav.pricing, href: section("#pricing") },
    { label: t.nav.placement, href: localizedPath("/placement", locale) },
    { label: t.nav.faq, href: section("#faq") },
    { label: t.nav.contact, href: section("#contact") },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full pt-[env(safe-area-inset-top,0px)] transition-all duration-300",
        scrolled || open
          ? "theme-panel bg-navy py-2 shadow-xl"
          : "bg-transparent py-3 sm:py-4",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 sm:gap-3 sm:px-6 lg:px-8">
        <a href={localizedPath("/", locale)} className="group flex min-w-0 items-center gap-2 sm:gap-3">
          <Image
            src={LOGO_SRC}
            alt="Arab Pro Academy — spoken Arabic classes in Riyadh for expats"
            width={56}
            height={56}
            className="h-11 w-11 shrink-0 rounded-full object-contain sm:h-14 sm:w-14"
            priority
          />
          <div className="min-w-0">
            <span
              className={cn(
                "block truncate text-sm leading-tight font-bold text-white sm:text-lg",
                locale === "ar" ? "font-kufi" : "font-display",
              )}
            >
              {t.brand}
            </span>
            <span className="hidden text-xs tracking-widest text-gold uppercase sm:block">
              {t.city}
            </span>
          </div>
        </a>

        <div className="hidden items-center gap-5 lg:flex xl:gap-7">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide text-gray-300 transition-colors duration-200 hover:text-gold"
            >
              {link.label}
            </a>
          ))}
          <LanguageSwitch locale={locale} theme={theme} />
          <ThemeToggle theme={theme} locale={locale} />
          <Button asChild size="sm">
            <a href={section("#pricing")}>{t.enroll}</a>
          </Button>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 lg:hidden">
          <ThemeToggle theme={theme} locale={locale} />
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="theme-panel max-h-[min(80dvh,32rem)] overflow-y-auto border-t border-gold/20 bg-navy px-4 py-3 lg:hidden">
          <div className="mb-3 flex justify-center sm:hidden">
            <LanguageSwitch locale={locale} theme={theme} />
          </div>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block border-b border-white/5 py-3 text-base font-medium text-gray-300 hover:text-gold"
            >
              {link.label}
            </a>
          ))}
          <a
            href={phoneHref}
            className="mt-1 flex min-h-11 items-center gap-2 py-3 text-sm font-medium text-gold"
          >
            <Phone size={16} /> {phoneDisplay}
          </a>
          <Button asChild size="sm" className="mt-1 mb-2 w-full">
            <a href={section("#pricing")} onClick={() => setOpen(false)}>
              {t.enroll}
            </a>
          </Button>
        </div>
      )}
    </nav>
  )
}
