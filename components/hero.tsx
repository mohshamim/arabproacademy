import Image from "next/image"
import { ChevronDown, MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { LOGO_SRC, STATS } from "@/lib/content"
import { getCopy } from "@/lib/copy"
import type { Locale } from "@/lib/locale"
import { localizedPath } from "@/lib/paths"
import { cn } from "@/lib/utils"

export function Hero({
  stats = STATS,
  whatsappUrl,
  locale = "en",
}: {
  stats?: readonly { value: string; label: string }[]
  whatsappUrl: string
  locale?: Locale
}) {
  const t = getCopy(locale)
  const ar = locale === "ar"

  return (
    <section className="theme-panel arabic-pattern relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-navy">
      <div className="absolute top-0 right-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/2 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/3 translate-y-1/2 rounded-full bg-teal/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-24 pb-28 text-center sm:px-6 sm:pt-28 sm:pb-20 lg:px-8">
        <div className="animate-fade-up mb-5 flex justify-center sm:mb-8">
          <Image
            src={LOGO_SRC}
            alt="Arab Pro Academy logo — spoken Arabic school in Riyadh for non-native speakers"
            width={160}
            height={160}
            className="h-28 w-28 rounded-full object-contain shadow-2xl shadow-gold/20 sm:h-40 sm:w-40"
            priority
          />
        </div>

        <div className="animate-fade-up delay-100 mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-gold/30 bg-gold/15 px-3 py-1.5 text-[11px] font-semibold text-gold-light sm:mb-6 sm:px-4 sm:py-2 sm:text-xs">
          <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-teal" />
          <span className="truncate">{t.hero.badge}</span>
        </div>

        <h1
          className={cn(
            "animate-fade-up delay-200 mb-4 text-[1.7rem] leading-[1.15] font-black text-white sm:mb-6 sm:text-5xl lg:text-7xl",
            ar ? "font-kufi" : "font-display",
          )}
        >
          {t.hero.titleLead}{" "}
          <span className="text-gold-gradient">{t.hero.titleGold}</span>
          <br />
          <span className="text-xl font-semibold text-gray-300 sm:text-4xl lg:text-5xl">
            {t.hero.titleRest}
          </span>
        </h1>

        <p className="animate-fade-up delay-300 mx-auto mb-4 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-xl">
          {t.hero.body}
        </p>

        {!ar ? (
          <p
            className="font-arabic animate-fade-up delay-300 mb-8 text-xl font-medium tracking-wider text-gold sm:mb-10 sm:text-2xl"
            dir="rtl"
          >
            {t.hero.tagline}
          </p>
        ) : (
          <div className="mb-8 sm:mb-10" />
        )}

        <div className="animate-fade-up delay-400 mb-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mb-12 sm:flex-row sm:items-center sm:gap-4">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a href="#pricing">{t.hero.ctaPricing}</a>
          </Button>
          <Button asChild variant="whatsapp" size="lg" className="w-full sm:w-auto">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={18} />
              {t.hero.ctaWhatsapp}
            </a>
          </Button>
        </div>
        <a
          href={localizedPath("/placement", locale)}
          className="animate-fade-up delay-400 mb-8 inline-flex min-h-11 items-center text-sm font-semibold text-gold-light underline-offset-4 hover:underline sm:mb-10"
        >
          {t.hero.placement}
        </a>

        <div className="animate-fade-up delay-500 mx-auto grid max-w-lg grid-cols-2 gap-x-4 gap-y-5 sm:flex sm:max-w-none sm:flex-wrap sm:items-center sm:justify-center sm:gap-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div
                className={cn(
                  "text-xl font-black text-gold sm:text-2xl",
                  ar ? "font-kufi" : "font-display",
                )}
              >
                {stat.value}
              </div>
              <div className="text-[11px] text-gray-500 sm:text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#why"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-bounce text-gray-600 transition-colors hover:text-gold sm:block"
        aria-label="Scroll to about"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  )
}
