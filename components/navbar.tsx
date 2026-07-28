"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Menu, Phone, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { NAV_LINKS, PHONE_DISPLAY, PHONE_HREF } from "@/lib/content"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

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
        scrolled ? "bg-navy py-2 shadow-xl" : "bg-transparent py-4"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="group flex items-center gap-3">
          <Image
            src="/arab-academy-logo.jpg"
            alt="Arab Pro Academy"
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover ring-2 ring-gold ring-offset-1 ring-offset-transparent"
            priority
          />
          <div className="hidden sm:block">
            <span className="block font-display text-lg font-bold leading-tight text-white">
              Arab Pro Academy
            </span>
            <span className="block text-xs uppercase tracking-widest text-gold">
              Riyadh
            </span>
          </div>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide text-gray-300 transition-colors duration-200 hover:text-gold"
            >
              {link.label}
            </a>
          ))}
          <Button asChild size="sm">
            <a href="#pricing">Enroll Now</a>
          </Button>
        </div>

        <button
          className="p-2 text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-4 border-t border-gold/20 bg-navy px-4 py-4 md:hidden">
          {NAV_LINKS.map((link) => (
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
            href={PHONE_HREF}
            className="flex items-center gap-2 text-sm font-medium text-gold"
          >
            <Phone size={14} /> {PHONE_DISPLAY}
          </a>
          <Button asChild size="sm" className="w-full">
            <a href="#pricing" onClick={() => setOpen(false)}>
              Enroll Now
            </a>
          </Button>
        </div>
      )}
    </nav>
  )
}
