"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Menu, Phone, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { LanguageSwitch } from "@/components/language-switch"
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/content"
import { getCopy } from "@/lib/copy"
import type { Locale } from "@/lib/locale"
import { cn } from "@/lib/utils"

export function Navbar({
  phoneDisplay = PHONE_DISPLAY,
  phoneHref = PHONE_HREF,
  locale = "en",
}: {
  phoneDisplay?: string
  phoneHref?: string
  locale?: Locale
}) {
  const t = getCopy(locale)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const links = [
    { label: t.nav.about, href: "#why" },
    { label: t.nav.courses, href: "#courses" },
    { label: t.nav.online, href: "#online" },
    { label: t.nav.pricing, href: "#pricing" },
    { label: t.nav.placement, href: "/placement" },
    { label: t.nav.faq, href: "#faq" },
    { label: t.nav.contact, href: "#contact" },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-navy py-2 shadow-xl" : "bg-transparent py-4",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <a href="/" className="group flex min-w-0 items-center gap-3">
          <Image
            src="/logo.svg"
            alt={t.brand}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover ring-2 ring-gold ring-offset-1 ring-offset-transparent"
            priority
          />
          <div className="hidden min-w-0 sm:block">
            <span
              className={cn(
                "block text-lg font-bold leading-tight text-white",
                locale === "ar" ? "font-kufi" : "font-display",
              )}
            >
              {t.brand}
            </span>
            <span className="block text-xs tracking-widest text-gold uppercase">
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
          <LanguageSwitch locale={locale} />
          <Button asChild size="sm">
            <a href="#pricing">{t.enroll}</a>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            className="p-2 text-white"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="flex flex-col gap-4 border-t border-gold/20 bg-navy px-4 py-4 lg:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/5 py-1 text-sm font-medium text-gray-300 hover:text-gold"
            >
              {link.label}
            </a>
          ))}
          <a
            href={phoneHref}
            className="flex items-center gap-2 text-sm font-medium text-gold"
          >
            <Phone size={14} /> {phoneDisplay}
          </a>
          <Button asChild size="sm" className="w-full">
            <a href="#pricing" onClick={() => setOpen(false)}>
              {t.enroll}
            </a>
          </Button>
        </div>
      )}
    </nav>
  )
}
